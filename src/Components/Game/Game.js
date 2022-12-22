import React, { useState } from 'react';
import GameField from './GameField';

const Game = ({channel,id}) => {
    const [players, setPlayers] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({ winner: "none", state: "none" });
    
      
      channel.on("user.watching.start", (event) => {
        setPlayers(event.watcher_count === 2);
      });
      if (!players) {
        return <div className='flex justify-center items-center h-screen text-[#F2C94C]'> Waiting for other player to join...</div>;
      }

    return (
        <div>
            <GameField  result={result} id={id}  setResult={setResult}></GameField>
        </div>
    );
};

export default Game;