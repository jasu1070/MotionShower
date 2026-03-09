
import React from 'react';
import { LandingPageIdea } from '../types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface IdeaCardProps {
  idea: LandingPageIdea;
  index: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/idea/${idea.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl glass aspect-[16/10] p-8 flex flex-col justify-between transition-all duration-500 hover:scale-[0.98] hover:border-white/20">
          {/* Background Decorative Element */}
          <div 
            className="absolute -top-10 -right-10 w-40 h-40 blur-[80px] opacity-20 transition-opacity duration-500 group-hover:opacity-40"
            style={{ backgroundColor: idea.primaryColor }}
          ></div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <i className={`fa-solid ${idea.icon} text-3xl opacity-80`} style={{ color: idea.primaryColor }}></i>
              <span className="mono text-[10px] uppercase tracking-widest px-2 py-1 border border-white/10 rounded-full text-white/50">
                {idea.difficulty}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2 tracking-tight group-hover:translate-x-1 transition-transform">{idea.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
              {idea.tagline}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {idea.techStack.map(tech => (
              <span key={tech} className="mono text-[9px] uppercase px-2 py-1 bg-white/5 rounded border border-white/5 text-white/60">
                {tech}
              </span>
            ))}
          </div>

          {/* Hover Arrow */}
          <div className="absolute bottom-8 right-8 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
            <i className="fa-solid fa-arrow-right text-xl"></i>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default IdeaCard;
