import "./App.css";
import { useState } from "react";

import { db } from "./firebase/firebase.config";

import { collection, addDoc } from "firebase/firestore";

const key2 = "..."; // riota games api

const currentGame =
  "https://eun1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/DBsNf_Z5NLUx5TZ4JsInGkj4qZnxbO_idYre9tbinIHXt_c";

const key = currentGame + "?api_key=" + key2;

function App() {
  const [playerNames, setPlayersNames] = useState([]);

  const [secondTeam, setSecondTeam] = useState([]);

  const [gameState, setGameState] = useState();

  const usersCollecionRef = collection(db, "PlayerNames");

  function NameOfPlayers(ArrNames) {
    ArrNames.map((name) => {
      console.log(name);

      if (name.teamId === 100) {
        setPlayersNames((prev) => [...prev, name.summonerName]);
      } else {
        setSecondTeam((prev) => [...prev, name.summonerName]);
      }
    });
  }

  function startGame() {
    fetch(key)
      .then((response) => response.json())
      .then((data) => NameOfPlayers(data.participants))
      .catch((err) => {
        setGameState("game not found");
        console.log(err);
      });
  }

  async function upLoadNames() {
    if (playerNames.length === 0 && secondTeam.length === 0) {
      setGameState("game not found");
      return;
    }

    async function uploadToFirebase(prop, team) {
      await addDoc(usersCollecionRef, { name: prop, Team: team });
    }

    playerNames.map((item) => {
      uploadToFirebase(item, "team1");
    });

    secondTeam.map((item) => {
      uploadToFirebase(item, "team2");
    });
  }

  return (
    <>
      <div>
        <h1>Last game</h1>
        <button className="button-17" onClick={startGame}>
          game started
        </button>
        <button className="button-17" onClick={upLoadNames}>
          Upload names
        </button>

        <h2>{gameState}</h2>

        <h3>Your team</h3>
        {playerNames.map((Player) => {
          return (
            <div key={Math.random()}>
              <p>{Player}</p>
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
      <h3>Enemy team</h3>
      <div>
        {secondTeam.map((Player) => {
          return (
            <div key={Math.random()}>
              <p>{Player}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
