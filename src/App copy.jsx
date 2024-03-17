import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { getAuth, } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";




function App() {

  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [Msg, setMsg] = useState('');
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googlelogin=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setName(result.user.displayName)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }
  const updateHeight=()=>{
    const el= document.getElementById('chat');
      if(el){
        el.scrollTop = el.scrollHeight;
      }  
    }
  useEffect(() => {
    const unsubscribe = onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()])
      setTimeout(() => {
        updateHeight()
      },100)
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();

  }, []);
  


  const sendChat = () => {

    const chatRef = push(chatListRef); // Fixed the typo here
    set(chatRef, {
      name,
      message: Msg
    });

    // Clear the message input after sending
    setMsg('');
  }

  return (
    <>
      {name? null :
        <div className='firsttext'>        
        <button onClick={e=>{googlelogin()}}>Google SignIn</button>
        </div>}
      {name ? <div>
        <h1>User:{name}</h1>
        <div className="chat-container" id="chat">
          {chats.map((c, i) => (
            <div key={i} className={`container ${c.name === name ? 'me' : ''}`}>
              <p className='chatbox '>
                <strong>{c.name}: </strong>
                <span>{c.message}</span>
              </p>
            </div>
          ))}
        </div>
        <div className='btm'>
          <input
            type="text"
            onInput={e => setMsg(e.target.value)}
            value={Msg}
            placeholder='Write message here'>
          </input>
          <button onClick={e => sendChat()}>Send</button>
        </div>
      </div> : null}

    </>
  )
}

export default App
