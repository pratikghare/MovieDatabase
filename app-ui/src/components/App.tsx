import { Outlet } from "react-router"
import { Header } from "./Header"
import '../styles/components.scss';
import Footer from "./Footer";

function App() {

  return (
    <div className="app">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App;

