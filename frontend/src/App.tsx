
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import EditPage from './Pages/EditPage';
import NavBar from './Pages/NavBar';
function App() {
  return (
    <>
      <div className="container pt-3">
        
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/*" element={<EditPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
