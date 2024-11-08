import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Main/Home.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';

export default function App() {
  return (
    <div className="m-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup/:action" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
