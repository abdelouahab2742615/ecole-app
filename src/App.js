import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Subject from "./pages/Subject";
import Laboratory from "./pages/Laboratory";

function App() {

  return (

    <BrowserRouter>

      <nav>

        <Link to="/subjects">Subjects</Link>

        {" | "}

        <Link to="/laboratories">Laboratories</Link>

      </nav>

      <Routes>

        <Route path="/subjects" element={<Subject />} />

        <Route path="/laboratories" element={<Laboratory />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;