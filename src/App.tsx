import './App.css'
import Keyvalue from './components/Keyvalue';
import useWebSocket from './hooks/useWebsocket';

function App() {
  const { socket, messages } = useWebSocket();

  
  return (
    <>
      <div>hi there</div>
      <Keyvalue/>
      {messages.map((message, index) => (
          <div key={index} >
            <p>Key: {message.key}</p>
            <p>Value: {message.value}</p>
          </div>
        ))}
    </>
  )
}

export default App
