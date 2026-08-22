import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ContactToggle from "./components/ui/ContactToggle";
import PageLoader from "./components/ui/PageLoader";
import ScrollProgress from "./components/ui/ScrollProgress";

function App() {
  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip bg-foam">
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main className="w-full max-w-full flex-grow overflow-x-clip">
        <Home />
      </main>
      <Footer />
      <ContactToggle />
    </div>
  );
}

export default App;
