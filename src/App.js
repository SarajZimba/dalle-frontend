import Login from "./Login";

function App() {
  function removeTokenFromLocalStorage() {
    localStorage.removeItem("token");
  }
  window.addEventListener("beforeunload", removeTokenFromLocalStorage);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
