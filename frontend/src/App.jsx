import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Main/Home.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';

export default function App() {
  return (
    <div className="m-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home activeCard="Searcher" />} />
          <Route path="/sell" element={<Home activeCard="Seller" />} />
          <Route path="/messages" element={<Home activeCard="Messages" />} />
          <Route path="/signup/:action" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
