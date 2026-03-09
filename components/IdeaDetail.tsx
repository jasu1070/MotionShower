
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LANDING_IDEAS } from '../constants';
import { analyzeAnimationIdea } from '../services/geminiService';
import { LandingPageIdea, GeminiAnalysis } from '../types';
import { LivePreview } from './LivePreview';

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idea = LANDING_IDEAS.find(i => i.id === id);
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!idea) {
      navigate('/');
      return;
    }

    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const result = await analyzeAnimationIdea(idea);
        setAnalysis(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id, idea, navigate]);

  if (!idea) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <LivePreview id={idea.id} primaryColor={idea.primaryColor} />
            <button 
              onClick={() => setFullscreen(false)}
              className="fixed top-8 right-8 z-[110] p-4 rounded-full glass hover:bg-white/10 transition-colors"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => navigate('/')}
        className="mb-12 flex items-center space-x-2 text-white/50 hover:text-white transition-colors group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        <span className="mono uppercase text-xs tracking-widest">Back to Gallery</span>
      </motion.button>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4 mb-6">
             <i className={`fa-solid ${idea.icon} text-4xl`} style={{ color: idea.primaryColor }}></i>
             <h1 className="text-6xl font-black tracking-tighter uppercase">{idea.title}</h1>
          </div>
          
          <p className="text-2xl text-white/60 mb-8 font-light italic">
            "{idea.tagline}"
          </p>

          <div className="p-8 rounded-3xl glass border-white/10 mb-12">
            <h3 className="mono text-xs uppercase tracking-widest text-white/30 mb-4">The Concept</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              {idea.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            {idea.techStack.map(tech => (
              <div key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3">
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: idea.primaryColor }}></div>
                 <span className="mono text-xs text-white/70 uppercase">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Gemini Analysis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-4 -right-4 px-4 py-2 bg-purple-600 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 shadow-xl">
             Engineering Specs
          </div>
          
          <div className="rounded-3xl glass overflow-hidden border-white/10">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
               <span className="mono text-xs text-white/40 uppercase tracking-widest">Architecture Analysis</span>
               <i className="fa-solid fa-microchip text-purple-400"></i>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="space-y-6">
                   <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
                   <div className="h-4 bg-white/5 rounded-full w-1/2 animate-pulse"></div>
                   <div className="mt-12 h-40 bg-white/5 rounded-2xl animate-pulse"></div>
                </div>
              ) : (
                <div className="space-y-10">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center">
                       <i className="fa-solid fa-list-check mr-3 text-white/40"></i>
                       Development Workflow
                    </h4>
                    <ul className="space-y-4">
                      {analysis?.implementationSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start space-x-4">
                          <span className="mono text-[10px] text-white/30 pt-1">0{idx + 1}</span>
                          <span className="text-white/70 text-sm leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center">
                       <i className="fa-solid fa-bolt mr-3 text-white/40"></i>
                       Animation Core
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed italic">
                      "{analysis?.motionPrinciples}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real Animation Experience */}
      <section className="mt-32">
        <h2 className="text-4xl font-bold mb-12 flex items-center">
          <span className="mr-6 h-[1px] flex-1 bg-white/10"></span>
          Interactive Landing Preview
          <span className="ml-6 h-[1px] flex-1 bg-white/10"></span>
        </h2>
        
        <div className="relative h-[650px] rounded-[3rem] overflow-hidden group shadow-2xl">
           <div className="absolute inset-0 bg-neutral-900 border border-white/5">
             <LivePreview id={idea.id} primaryColor={idea.primaryColor} />
           </div>

           <div className="absolute top-12 right-12 z-20">
              <button 
                onClick={() => setFullscreen(true)}
                className="p-5 rounded-2xl glass hover:bg-white/10 transition-all duration-300 group/btn active:scale-95"
              >
                <i className="fa-solid fa-expand text-xl group-hover/btn:scale-110 transition-transform"></i>
              </button>
           </div>

           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <span className="mono text-[10px] uppercase tracking-widest text-white/40 mb-4 px-4 py-1 glass rounded-full">
                Interactive Environment v1.0
              </span>
           </div>
        </div>
      </section>
    </div>
  );
};

export default IdeaDetail;
