import './App.css';
import TodoApp from './components/TodoApp'
import { TodoContext } from './store/TodoProvider'
import { useContext } from 'react';

function App() {
  const context = useContext(TodoContext)
  return (
    <div className="App">
      <TodoApp context={context} />
    </div>
  );
}

export default App;
