import { Routes, Route } from "react-router-dom";
import Header from "./companents/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Banner from "./companents/Banner/Banner";

import Pub from "./pages/Pub/Pub";
import Darf from "./pages/Draf/Darf";
import Schet from "./pages/Schet/Schet";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="content">
       <Routes>
  <Route path="/" element={<Home />} />
  {/* Yangi post uchun */}
  <Route path="/contact" element={<Contact />} />
  {/* Eskisini tahrirlash uchun ID bilan */}
  <Route path="/contact/:id" element={<Contact />} />

  <Route path="/about" element={<About />}>
    <Route index element={<Pub />} />
    <Route path="draf" element={<Darf />} />
    <Route path="schet" element={<Schet />} />
  </Route>
</Routes>
        <Banner />
      </div>
    </div>
  );
}

export default App;
