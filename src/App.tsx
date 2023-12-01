import Toolbar from './components/Toolbar/Toolbar';
import PostForm from './components/PostForm/PostForm';

function App() {

  return (
    <div>
      <header>
        <Toolbar/>
      </header>
      <main className="container">
        <PostForm/>
      </main>
    </div>
  );
}

export default App;
