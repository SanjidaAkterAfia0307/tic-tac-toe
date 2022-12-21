import React, { useState } from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import Game from './Game';

const Opponent = () => {
    const [opponentEmail, setOpponentEmail] = useState("")

    const { client } = useChatContext();
    const [channel, setChannel] = useState(null);
    const [error, setError] = useState('');
    const createChannel = async () => {
        const response = await client.queryUsers({ email: { $eq: opponentEmail } });
        console.log(response)

        if (response.users.length === 0) {
            setError("User Not Found")
            return;
        }


        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
            Opponent: response.users[0].name
        });

        await newChannel.watch();
        setChannel(newChannel);

        // console.log(channel)
    };
    return (
        <>
            {channel ?

                <Channel channel={channel}>

                    {/* <h1>Get Started</h1> */}
                    <Game channel={channel} ></Game>
                </Channel>
                :

                <div>
                    <div className='px-6  mb-10'>
                        <h4 className='font-bold text-sm mb-2'>Start a new game</h4>
                        <h2 className='font-bold text-2xl leading-8'>Whom do you want <br /> to play with?</h2>
                    </div>

                    <div className='px-6'>

                        <label htmlFor="opponentEmail" className='text-sm font-bold '>Email</label>
                        <input onChange={e => {
                            setError("")
                            setOpponentEmail(e.target.value)
                        }} type="email" name="opponentEmail" placeholder='Type their email here' className='block w-full ' />



                    </div>

                    {
                        error &&
                        <div className='flex justify-center items-center'>
                            <div className={error ? `bg-[#EB5757] flex font-normal justify-center items-center rounded-lg sub-btn  ` : ` hidden`}>
                                <button className='text-white font-bold'>{error}</button>
                            </div>
                        </div>
                    }

                    <div className='flex justify-center items-center absolute bottom-3'>
                        <div onClick={createChannel} className={error ? `bg-[#E0E0E0] flex justify-center items-center rounded-lg dis-sub-btn` : `bg-[#F2C94C] flex justify-center items-center rounded-lg sub-btn`}>
                            <button className='text-white font-bold'>Start game</button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
};

export default Opponent;