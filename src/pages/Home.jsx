import Hero from "../components/sections/Hero";
import DoorReveal from "../components/sections/DoorReveal";
import About from "../components/sections/About";
import Rooms from "../components/sections/Rooms";
import RoomAmenities from "../components/sections/RoomAmenities";
import Facilities from "../components/sections/Facilities";
import Experiences from "../components/sections/Experiences";
import Inauguration from "../components/sections/Inauguration";
import Gallery from "../components/sections/Gallery";
import ExploreIdukki from "../components/sections/ExploreIdukki";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <DoorReveal />
      <About />
      <Rooms />
      <RoomAmenities />
      <Facilities />
      <Experiences />
      <Inauguration />
      <Gallery />
      <ExploreIdukki />
      <Testimonials />
      <Contact />
    </>
  );
}
