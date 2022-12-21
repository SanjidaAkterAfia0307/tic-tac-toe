
import './App.css';
import SignIn from './Components/Authentication/SignIn';
import LogIn from './Components/Authentication/LogIn';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import { useState } from 'react';
import { Chat } from 'stream-chat-react';
import Opponent from './Components/Game/Opponent';

function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const api_key = "3pmzbsccz3f3";
  const client = StreamChat.getInstance(api_key);
  const [isSign, setIsSign] = useState(false)

  const logOut = () => {
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
        console.log(user)
      });
  }




  return (
    <div >
      {
        isSign ?
          <Chat client={client}>
            <Opponent></Opponent>

            <button onClick={logOut}> Log Out</button>
          </Chat>
          :
          <>
            <SignIn isSign={isSign} setIsSign={setIsSign}></SignIn>
            <LogIn isSign={isSign} setIsSign={setIsSign}></LogIn>
          </>

      }
    </div>
  );
}

export default App;
