import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Navigation } from './components/Navigation';
function App() {
  return (
    < Router >
      <Navigation />
      <div className='w-5/6 float-right'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
