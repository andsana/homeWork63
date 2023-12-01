import Toolbar from './components/Toolbar/Toolbar';
import PostForm from './components/PostForm/PostForm';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';

function App() {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={(
            <Home/>
          )}/>
          <Route path="/new-post" element={(
            <PostForm/>
          )}/>
        </Routes>

      </main>
    </>
  );
}

export default App;
