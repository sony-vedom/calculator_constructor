import './App.css';
import Sidebar from "./Sidebar/Sidebar";
import Canvas from "./Сanvas/Canvas";
import Toggle from "./Toggle/Toggle";

const App = () => {
    return (
        <div className="App">
            <Sidebar/>
            <Toggle/>
            <Canvas/>

        </div>
    );
}

export default App;
