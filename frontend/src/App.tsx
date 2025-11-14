import { useRef } from "react";
import Home from "./components/body/home";
import Profil from "./components/body/profil";
import Experiences from "./components/body/experience";
import Project from "./components/body/project";
import Competence from "./components/body/competence";
import Contact from "./components/body/contact";
import FooterNavs from "./components/header/FooterNavs";
import Footer from "./components/header/footer";
import Side from "./components/header/side"
import "./App.css";

function App() {
  const topRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-gray-900  text-gray-100">
      <div ref={topRef}>

        {/*Navbar incluse ici */}
        <Side />
        
        {/*Sections principales */}
        <section id="accueil" data-name="Accueil" className="scroll-mt-[350px] md:scroll-mt-[400px] lg:scroll-mt-[100px]">
          <Home />
        </section>

        <section id="profil" data-name="Profil" className=" scroll-mt-[400px] md:scroll-mt-[450px] lg:scroll-mt-[100px]">
          <Profil />
        </section>

        <section  id="experiences"  data-name="Expériences" className=" mb-40 md:mb-40 mb:40 scroll-mt-[400px] md:scroll-mt-[450px] lg:scroll-mt-[100px]">
          <Experiences />
        </section>

        <section id="competence" data-name="Compétences" className=" scroll-mt-[400px] md:scroll-mt-[450px] lg:scroll-mt-[100px]">
          <Competence />
        </section>

        <section id="project" data-name="Projets" className=" scroll-mt-[400px] md:scroll-mt-[450px] lg:scroll-mt-[100px]">
          <Project />
        </section>

        <section id="contact" data-name="Contact" className=" mb-30 scroll-mt-[400px] md:scroll-mt-[450px] lg:scroll-mt-[100px]">
          <Contact />
        </section>

        {/*  Footer */}
        <FooterNavs scrollToTop={() => topRef.current?.scrollIntoView({ behavior: "smooth" })} />
        <Footer />
      </div>
    </main>
  );
}

export default App;
