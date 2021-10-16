const socket = new WebSocket("ws://localhost:9000");

socket.onopen = () => {
  console.log("CLIENT: connected to server")
}

socket.onmessage = (message) => {
  console.log("CLIENT: message received", JSON.parse(message.data));
}

const App = () => {

  const register = (name) => {
    socket.send(JSON.stringify({ type: "REGISTER", name }));
  }

  const startGame = () => {
    socket.send(JSON.stringify({ type: "START_GAME" }));
  }

  return (
    <div className="App">
      <button onClick={() => register("Roman")}>START Roman</button>
      <button onClick={() => register("Eugene")}>START Eugene</button>
      <button onClick={startGame}>START GAME</button>
    </div>
  );
}

export default App;
