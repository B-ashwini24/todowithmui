
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Products from './components/Products';
import Show from './components/Show';
import 'antd/dist/antd.css';
import NewTodo from './components/newTodo';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/todo" element={<Products />} />
        <Route path="/new" element={<NewTodo />} />
        <Route path="/show" element={<Show />} />
      
      </Routes>
     
    </div>
  );
}

export default App;
