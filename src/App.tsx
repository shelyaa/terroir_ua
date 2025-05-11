import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Footer } from './components/Footer';
import Header from "./components/Header";
import Home from "./pages/Home";
import { Auth } from './pages/Auth';


export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Auth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
