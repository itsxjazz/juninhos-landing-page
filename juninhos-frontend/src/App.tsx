import { useCallback, useEffect, useRef } from 'react';
import { About } from './components/About/About';
import { Benefits } from './components/Benefits/Benefits';
import { Classes } from './components/Classes/Classes';
import { Community } from './components/Community/Community';
import { Contribute } from './components/Contribute/Contribute';
import { Ecosystem } from './components/Ecosystem/Ecosystem';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { InstructorModal } from './components/InstructorModal/InstructorModal';
import { LoadingOverlay } from './components/LoadingOverlay/LoadingOverlay';
import { ProjectDetailsModal } from './components/ProjectDetailsModal/ProjectDetailsModal';
import { Projects } from './components/Projects/Projects';
import { WaitlistModal } from './components/WaitlistModal/WaitlistModal';
import { useLoading } from './context/LoadingContext';
import { Animations } from './lib/animations';

export function App() {
  const { loading } = useLoading();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    Animations.initAll();
  }, []);

  const refreshCards = useCallback(() => {
    Animations.refreshCards();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Ecosystem />
        <Projects onCardsRendered={refreshCards} />
        <Classes onCardsRendered={refreshCards} />
        <Community />
        <Benefits />
        <Contribute />
      </main>
      <Footer />

      <WaitlistModal />
      <InstructorModal />
      <ProjectDetailsModal />
      <LoadingOverlay visible={loading} />
    </>
  );
}
