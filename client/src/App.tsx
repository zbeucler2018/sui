import React, { useState, useEffect } from 'react';
import { AppProps } from './AppProps/AppProps';
import useWebSocket from 'react-use-websocket';

import './App.css'

const WS_URL = 'ws://127.0.0.1:4100';





function App() {


  useEffect(() => {
    // send GET request for props
    let idk = 0;
  }, [])


  const { sendJsonMessage, sendMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('opened client socket');
    },
    onMessage: (event) => {
      console.log('got message', event.data);
    },
    retryOnError: true,
    shouldReconnect: () => true,
    share: true
  })







  return (
    <>
      <h2>Hello SUI</h2>
    </>
  )
}

export default App;
