import './App.css';
import { Route } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import CreateDog from './components/CreateDog'
import DogDetail from './components/DogDetail'
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <Route
        path='/'
        render={()=> <Nav/> }
      />
      <Route
        exact path='/'
        render={() => <Landing/>}
      />
      <Route
        path='/home'
        render={() => <Home/>}
      />
      <Route
        path='/dogs/:id'
        render={() => <DogDetail/>}
      />
      <Route
        path='/dog/create'
        render={() => <CreateDog/>}
      />
    </div>
  );
}

export default App;