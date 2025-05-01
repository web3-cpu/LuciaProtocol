import { Navbar, Main, Product, Footer } from "../components";
import lucia from "../lucia";

function Home() {
  lucia.pageView("Home");
  return (
    <>
      <Navbar />
      <Main />
      <Product />
      <Footer />
    </>
  )
}

export default Home