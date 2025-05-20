import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProjectsPage from './components/pages/ProjectsPage';
import NewsPage from './components/pages/NewsPage';
import Attivita from './components/sections/Attivita';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import PrenotaServizio from './components/sections/PrenotaServizio';
import Support from './components/sections/Support';
import Transparency from './components/sections/Transparency';
import Contact from './components/sections/Contact';
import Projects from './components/sections/Projects';
import News from './components/sections/News';
// ...altri import

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
  };

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <>
            <Navbar />
            <main className="min-h-[80vh]"> {/* o la classe che preferisci */}
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route
                            path="/"
                            element={
                                <motion.div {...pageTransition}>
                                    <section id="home">
                                        <Hero />
                                    </section>
                                    <section id="chi-siamo">
                                        <Stats />
                                    </section>
                                    <section id="corsi">
                                        <Projects />
                                    </section>
                                    <section id="attivita">
                                        <Attivita />
                                    </section>
                                    <section id="prenota-servizio">
                                        <PrenotaServizio />
                                    </section>
                                    <section id="news">
                                        <News />
                                    </section>
                                    <section id='supporto'>
                                        <Support />
                                    </section>
                                    <section id="documenti">
                                        <Transparency />
                                    </section>
                                    <section id="contatti">
                                        <Contact />
                                    </section>
                                </motion.div>
                            }
                        />
                        <Route
                            path="/news"
                            element={
                                <motion.div {...pageTransition}>
                                    <NewsPage />
                                </motion.div>
                            }
                        />
                        <Route
                            path="/progetti"
                            element={
                                <motion.div {...pageTransition}>
                                    <ProjectsPage />
                                </motion.div>
                            }
                        />

                        {/* ...altre pagine */}
                        <Route
                            path="*"
                            element={
                                <motion.div {...pageTransition}>
                                    <div>Pagina non trovata</div>
                                </motion.div>
                            }
                        />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}

export default AnimatedRoutes;