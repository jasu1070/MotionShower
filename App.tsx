
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import IdeaCard from './components/IdeaCard';
import IdeaDetail from './components/IdeaDetail';
import { LANDING_IDEAS } from './constants';

const Home: React.FC = () => {
  return (
    <div className="pt-40 pb-32 px-6">
      <header className="max-w-7xl mx-auto mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none uppercase">
            Motion<br /><span className="text-white/20 hover:text-white/40 transition-colors">Shower</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed font-light">
            An curated collection of 10 high-performance landing page blueprints designed for engineers who demand extreme UI fluidity and visual depth.
          </p>
        </motion.div>

        <motion.div 
          className="mt-16 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
           <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-neutral-800">
                  <img src={`https://picsum.photos/seed/${i + 20}/100/100`} alt="Avatar" />
               </div>
             ))}
           </div>
           <div className="text-left text-[11px] mono uppercase tracking-widest text-white/40 py-1">
             Trusted by<br /><span className="text-white/80">3,400+ Web Engineers</span>
           </div>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LANDING_IDEAS.map((idea, index) => (
          <IdeaCard key={idea.id} idea={idea} index={index} />
        ))}
      </div>

      <footer className="mt-40 max-w-7xl mx-auto border-t border-white/5 pt-20 flex flex-col md:flex-row justify-between items-center text-white/20 mono text-xs uppercase tracking-[0.2em]">
        <div>© 2025 MotionShower Labs</div>
        <div className="flex space-x-12 mt-8 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen selection:bg-white selection:text-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idea/:id" element={<IdeaDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
