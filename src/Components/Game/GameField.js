import React, { useEffect, useState } from 'react';
import Square from './Square';
import circle from '../../assests/Ellipse 1.png';
import cross from '../../assests/Property 1=x.png';
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Patterns } from './Patterns';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GameField = ({ result, setResult ,id}) => {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    // const [submit, setSubmit] = useState(false);
    const [player, setPlayer] = useState("X");
    const [winPlayer, setWinPlayer] = useState("");
    const [turn, setTurn] = useState("X");
    const [won, setWon] = useState("");
    const [winner, setWinner] = useState("");
    const [tie, setTie] = useState("");
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();
    let win;
    console.log(channel)

    console.log(client.user)

    useEffect(() => {
        checkIfTie();
        checkWin();
    }, [board,winner]);
    const setSquare = async (square) => {
        console.log(player)
        console.log(turn)
        console.log(square)
        console.log(board[square])
        if (turn === player && board[square] === "") {
            setTurn(player === "X" ? "O" : "X");
            console.log(turn)
            await channel.sendEvent({
                type: "game-move",
                data: { square, player },
            });
            setBoard(
                board.map((val, idx) => {
                    if (idx === square && val === "") {
                        return player;
                    }
                    return val;
                })
            );
        }
    }

    const checkWin = () => {
        Patterns.forEach((currPattern) => {
            const firstPlayer = board[currPattern[0]];
            if (firstPlayer === "") return;
            let foundWinningPattern = true;
            currPattern.forEach((idx) => {
                if (board[idx] !== firstPlayer) {
                    foundWinningPattern = false;
                }
            });

            if (foundWinningPattern) {
                setWon("won")
                setWinner(board[currPattern[0]])
                setResult({ winner: board[currPattern[0]], state: "won" });
               
                console.log(player)
                console.log(winner)
                if(winner === player){
                     win=`You win`
                     setWinPlayer("You")
                }
                else{
                    win=`${channel._data.Opponent} win`
                    setWinPlayer(channel._data.Opponent)
                }
                //  const win=   winner === player ? `You win` : `${channel._data.Opponent} win`
                
              axios.put(`http://localhost:3001/games/${id}`,{win,winPlayer})
              .then(res=>console.log(res.data))

            }
        });
    };

    const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
            if (square === "") {
                filled = false;
            }
        });

        if (filled) {
            setTie("tie")
            win="It's a Draw"
            console.log(tie,won)
            axios.put(`http://localhost:3001/games/${id}`,{win})
            .then(res=>console.log(res.data))
            setResult({ winner: "none", state: "tie" });

        }
    };

    channel.on((event) => {

        console.log(event)
        if (event.type === "game-move" && event.user.id !== client.userID) {
            const currentPlayer = event.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(
                board.map((val, idx) => {
                    if (idx === event.data.square && val === "") {
                        return event.data.player;
                    }
                    return val;
                })
            );
        }
    });




    return (
        <div>
            <div className='px-6'>
                <h1 className='font-bold text-3xl mb-2'>Game with {channel._data.Opponent}</h1>
                <p className='text-sm '>Your piece</p>
                <div className='my-2'>
                    <img className='w-16 h-16' src={player === "X" ? `${cross}` : `${circle}`} alt="" />
                </div>
            </div>

            <div className='bg-[#FFE79E] mx-4'>
                <div>
                    
                    {
                        
                        !tie && !won &&
                        <div className='flex justify-center items-center h-12 text-lg text-[#212121]'>
                            {
                                turn === player ? `Your move` : `Their move`
                            }

                        </div>
                    }
                    {
                        tie && !won &&
                        <div className='flex justify-center items-center h-12 text-lg text-[#212121]'>
                            It's a Draw!

                        </div>
                    }
                    {
                        !tie && won &&
                        <div className='flex justify-center items-center h-12 text-lg text-[#212121]'>
                            {winner === player ? `You win` : `${channel._data.Opponent} win`}

                        </div>
                    }
                </div>

                <div className='grid grid-cols-3 gap-1' >
                    <Square
                        cls="mb-1"
                        val={board[0]}
                        setSquare={() => { setSquare(0) }}
                    />
                    <Square
                        cls="mb-1"
                        val={board[1]}
                        setSquare={() => { setSquare(1) }}
                    />
                    <Square
                        cls="mb-1"
                        val={board[2]}
                        setSquare={() => { setSquare(2) }}
                    />
                </div>
                <div className='grid grid-cols-3 gap-1' >
                    <Square
                        cls="mb-1"
                        val={board[3]}
                        setSquare={() => { setSquare(3) }}
                    />
                    <Square

                        cls="mb-1"
                        val={board[4]}
                        setSquare={() => { setSquare(4) }}
                    />
                    <Square
                        cls="mb-1"
                        val={board[5]}
                        setSquare={() => { setSquare(5) }}
                    />
                </div>
                <div className='grid grid-cols-3 gap-1' >
                    <Square
                        val={board[6]}
                        setSquare={() => { setSquare(6) }}
                    />
                    <Square
                        val={board[7]}
                        setSquare={() => { setSquare(7) }}
                    />
                    <Square
                        val={board[8]}
                        setSquare={() => { setSquare(8) }}
                    />
                </div>
            </div>
            <div>
                {
                    !tie && !won &&

                    <div className='flex justify-center items-center'>
                        <div className={turn === player ? `bg-[#F2C94C] flex justify-center items-center rounded-lg sub-btn` : `bg-[#E0E0E0] flex justify-center items-center rounded-lg sub-btn`}>
                            <button className='text-white font-bold'>{
                                turn === player ? `Submit` : `Waiting for ${channel._data.Opponent}`
                            }</button>
                        </div>
                    </div>
                }
                { (tie || won) &&
                    <div className='flex justify-center items-center'>
                    <Link to="/" className={`bg-[#F2C94C] flex justify-center items-center rounded-lg sub-btn`}>
                        <button className='text-white font-bold'>Start another game</button>
                    </Link>
                </div>
                }
            </div>
        </div>
    );
};

export default GameField;