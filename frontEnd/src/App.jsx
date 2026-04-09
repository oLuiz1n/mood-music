import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";

function App() {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/PlaylistPage" element={<PlaylistPage/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;