import './App.css';
import GameBoard from './components/GameBoard';
import boardData from './components/boards.json';

function App() {
    const nonogramIndex = Math.floor(Math.random() * boardData.data.length);
    return <GameBoard {...boardData.data[nonogramIndex]} />;
}

export default App;
