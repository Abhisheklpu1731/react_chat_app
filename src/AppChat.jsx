import React, { useState, useEffect } from 'react';
import './App.css';
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { getAuth } from "firebase/auth";

function AppChat() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });

    return () => unsubscribe();
  }, []);

  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg
    });

    setMsg('');
  };

  return (
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
          value={msg}
          placeholder='Write message here'>
        </input>
        <button onClick={sendChat}>Send</button>
      </div>
    </div>
  );
}

export default AppChat;
