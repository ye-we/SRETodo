import Container from "./pages/Container";
import { TodoContextProvider } from "../context/todo-context";

function App() {
  return (
    <TodoContextProvider>
      <Container />
    </TodoContextProvider>
  );
}

export default App;
