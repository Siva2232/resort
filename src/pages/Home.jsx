import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Rooms from "../components/sections/Rooms";
import Facilities from "../components/sections/Facilities";
import Experiences from "../components/sections/Experiences";
import Gallery from "../components/sections/Gallery";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Rooms />
      <Facilities />
      <Experiences />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
