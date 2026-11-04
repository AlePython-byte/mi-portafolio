import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Personal from "./sections/Personal";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import Footer from "./sections/Footer";

export default function FlatPortfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Personal />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
