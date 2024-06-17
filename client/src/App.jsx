import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import View from './pages/View';
import Write from './pages/Write';
import Edit from './pages/Edit';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/view/:idx" element={<View />} />
      <Route path="/write" element={<Write />} />
      <Route path="/edit/:idx" element={<Edit />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
