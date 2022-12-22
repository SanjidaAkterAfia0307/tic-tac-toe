import React, { createContext } from 'react';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import { useState } from 'react';
import { Chat } from 'stream-chat-react';

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const cookies = new Cookies();
    const token = cookies.get("token");
    const api_key = process.env.REACT_APP_apiKey;
    const client = StreamChat.getInstance(api_key);
    const [isSign, setIsSign] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    if (token) {
        client
          .connectUser(
            {
              id: cookies.get("userId"),
              name: cookies.get("username"),
              fullName: cookies.get("fullName"),
              email: cookies.get("email"),
              hashedPassword: cookies.get("hashedPassword"),
            },
            token
          )
          .then((user) => {
            setIsSign(true);
            setIsLoading(false);
            console.log(user)
          });
      }
      const logOut = () => {
        // console.log("LOG OUT")
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("fullName");
        cookies.remove("email");
        cookies.remove("hashedPassword");
        cookies.remove("channelName");
        cookies.remove("username");
        client.disconnectUser();
        setIsSign(false);

      };

      const authInfo={isSign,setIsSign,logOut,isLoading,setIsLoading,client}
    
    return (
        <Context.Provider value={authInfo}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;