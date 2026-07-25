import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ContactToggle from "./components/ui/ContactToggle";
import PageLoader from "./components/ui/PageLoader";
import ScrollProgress from "./components/ui/ScrollProgress";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-foam">
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
      <ContactToggle />
    </div>
  );
}

export default App;
