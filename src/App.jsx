import {Footer, Navbar} from "./components/Global.jsx";
import {useState} from "react";
import RecetteForm from "./components/RecetteForm.jsx";


function App() {
const [active, setActive] = useState(true);

  return (
    <>
        <Navbar setActive={setActive}/>
        <RecetteForm active={active} setActive={setActive}/>
        <Footer/>
    </>
  )
}

export default App
