
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-transparent pointer-events-none">
      <Link to="/" className="pointer-events-auto flex items-center space-x-3 group">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-black text-xl transition-transform duration-500 group-hover:rotate-180">
          M
        </div>
        <span className="font-bold text-xl tracking-tighter uppercase hidden sm:inline">MotionShower</span>
      </Link>

      <div className="flex items-center space-x-8 pointer-events-auto">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors mono text-xs uppercase"
        >
          [ Open Source ]
        </a>
        <div className="hidden md:flex items-center space-x-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="mono text-[10px] text-white/40 uppercase tracking-widest">System Operational v2.4</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
