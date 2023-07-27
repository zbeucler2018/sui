import React, { useState, useEffect } from 'react';

import useWebSocket from 'react-use-websocket';

import './App.css'

const WS_URL = 'ws://127.0.0.1:4101';


function App() {
  const [msg, setMsg] = useState();



  const { sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('opened client socket');
    },
    onMessage: (event) => {
      console.log('got message', event.data);
      setMsg(event.data);
    },
    retryOnError: true,
    shouldReconnect: () => true,
    share: true
  })







  return (
    <>
      <h1>Hello SUI</h1>
      <button
        onClick={() => sendJsonMessage({ whom: "client" })}
      >
        Send msg
      </button>

      <p>{ JSON.stringify(msg) }</p>
    </>
  )
}

export default App;
