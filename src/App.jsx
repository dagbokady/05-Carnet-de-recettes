import {Footer, Navbar} from "./components/Global.jsx";
import {useState} from "react";
import RecetteForm from "./components/RecetteForm.jsx";
import Recettes from "./components/Recettes.jsx";


function App() {
const [active, setActive] = useState(false);

  return (
    <>
        <Navbar setActive={setActive}/>
        <RecetteForm active={active} setActive={setActive}/>
        <Recettes/>
        <Footer/>
    </>
  )
}

export default App
