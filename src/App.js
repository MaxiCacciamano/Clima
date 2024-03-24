import './assets/css/App.css';
import {Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import WatherApp from './components/WatherApp';
import WeatherPanel from './components/WeatherPanel';


function App() {
  return (
    <div className="App">
      <NavBar />
      <WeatherPanel/>
      <WatherApp/>
      <Routes>
         <Route exact path="/home" element={<WatherApp/>}/>
      </Routes>
    </div>
  );
}

export default App;
