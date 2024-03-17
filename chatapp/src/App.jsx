import React, { useState, useEffect } from 'react';
import './App.css';
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [Msg, setMsg] = useState('');
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googlelogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setName(result.user.displayName);
      }).catch((error) => {
        console.error(error);
      });
  };

  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    const unsubscribe = onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });

    return () => unsubscribe();

  }, []);

  const sendChat = () => {
    if (Msg.trim() !== '') {
      const chatRef = push(chatListRef);
      set(chatRef, {
        name,
        message: Msg
      });
      setMsg('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && Msg.trim() !== '') {
      sendChat();
    }
  };

  return (
    <>
      {!name && (
        <div className='firsttext'>
          <img src="src\assets\chat.png" alt="Your Image" />
          <button onClick={googlelogin}>Google SignIn</button>
        </div>
      )}
      {name && (
        <div>
          <h1>User: {name}</h1>
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
              placeholder='Write message here'
              onKeyPress={handleKeyPress} // Call handleKeyPress function on keypress
            />
            <button onClick={sendChat}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
