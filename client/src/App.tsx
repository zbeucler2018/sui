import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import './App.css'

import Tab from '@mui/base/Tab';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tabs, { tabsClasses } from '@mui/base/Tabs';


const WS_URL = 'ws://127.0.0.1:4100';





function App() {
  const [tabs, setTabs] = useState([{}]);
  const [appName, setAppName] = useState("Sample SUI App");

  useEffect(() => {
    // send GET request for props
    fetch("http://localhost:4100/bms/props")
      .then(res => res.json())
      .then(props => {
        console.log("Got props", props);

        setAppName(props.appName);
        setTabs(props.tabs);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [])


  // const { sendJsonMessage, sendMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
  //   onOpen: () => {
  //     console.log('opened client socket');
  //   },
  //   onMessage: (event) => {
  //     console.log('got message', event.data);
  //   },
  //   retryOnError: true,
  //   shouldReconnect: () => true,
  //   share: true
  // })

  







  return (
    <>
      <h2>{ appName }</h2>
      <Tabs>
        <TabsList>
          {
            tabs.map( t => {
              return <Tab>{t.title}</Tab>
            })
          }
        </TabsList>
          {
            tabs.map( t => {
              return (
                <TabPanel>
                  {JSON.stringify(t)}
                </TabPanel>
              )
            })
          }



      </Tabs>
    </>
  )
}

export default App;
