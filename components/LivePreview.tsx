
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface PreviewProps {
  id: string;
  primaryColor: string;
}

const NeuralNexus = ({ color }: { color: string }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden flex items-center justify-center"
         onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}>
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white"
            animate={{
              x: [Math.random() * 1000, Math.random() * 1000],
              y: [Math.random() * 800, Math.random() * 800],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
          />
        ))}
      </div>
      <motion.div 
        animate={{ x: (mouse.x - window.innerWidth/2) * 0.05, y: (mouse.y - window.innerHeight/2) * 0.05 }}
        className="z-10 text-center"
      >
        <h1 className="text-8xl font-black tracking-tighter" style={{ color }}>NEURAL<br/>NEXUS</h1>
        <p className="mono text-xs mt-4 tracking-[0.5em] text-white/40 uppercase">AI Orchestration Layer v4.0</p>
      </motion.div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <motion.circle 
          cx={mouse.x} cy={mouse.y} r="100" fill="none" stroke={color} strokeWidth="1" 
          animate={{ r: [100, 120, 100] }} transition={{ repeat: Infinity, duration: 2 }}
        />
      </svg>
    </div>
  );
};

const BentoFluid = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full p-12 bg-neutral-950 grid grid-cols-4 grid-rows-3 gap-4">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 0.98, borderRadius: '40px' }}
          className={`glass rounded-2xl flex items-center justify-center border-white/5 ${
            i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'col-span-2' : ''
          }`}
        >
          <div className="text-center">
            <div className="w-8 h-8 rounded-full mb-3 mx-auto" style={{ backgroundColor: color }}></div>
            <div className="h-2 w-16 bg-white/10 rounded-full mx-auto"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const TerminalVelocity = ({ color }: { color: string }) => {
  const [text, setText] = useState('');
  const fullText = "SYSTEM_INITIALIZE --VERBOSE\nDEPLOYING NEURAL ASSETS...\nOPTIMIZING EDGE NODES...\nSTATUS: ACTIVE\nREADY FOR COMMAND_";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-black p-12 mono text-sm flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="flex space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
        </div>
        <motion.div 
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ repeat: Infinity, duration: 0.1 }}
          style={{ color }} className="leading-relaxed whitespace-pre"
        >
          {text}
          <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1"></span>
        </motion.div>
      </div>
    </div>
  );
};

const BrutalistMono = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center group overflow-hidden">
      <motion.div 
        initial={{ x: -100 }}
        whileInView={{ x: 0 }}
        className="absolute inset-0 bg-black mix-blend-difference pointer-events-none group-hover:scale-110 transition-transform duration-1000"
      />
      <h1 className="text-[20vw] font-black leading-none text-black select-none tracking-tighter">
        BOLD.
      </h1>
      <div className="absolute bottom-12 right-12 text-black mono font-bold text-xl uppercase tracking-widest">
        Identity // 2025
      </div>
    </div>
  );
};

const LiquidGold = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] blur-[150px] opacity-30"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] blur-[150px] opacity-20"
        style={{ background: `radial-gradient(circle, #ffffff 0%, transparent 70%)`, top: '20%', right: '10%' }}
      />
      <div className="relative z-10 text-center">
        <h2 className="text-7xl font-light tracking-[0.2em] text-white">LIQUID</h2>
        <div className="h-px w-64 bg-white/20 my-8 mx-auto"></div>
        <p className="mono text-xs text-white/40 uppercase tracking-[0.5em]">Refined Premium FinTech</p>
      </div>
    </div>
  );
};

const InfiniteCanvas = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full bg-[#f0f0f0] cursor-grab active:cursor-grabbing relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <motion.div 
        drag
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        className="absolute top-1/4 left-1/4 w-64 h-80 bg-white shadow-2xl rounded-lg p-4 flex flex-col justify-between"
      >
        <div className="h-40 bg-neutral-100 rounded mb-4 overflow-hidden">
          <img src="https://picsum.photos/seed/design/400/300" className="w-full h-full object-cover" />
        </div>
        <div className="h-2 w-full bg-neutral-100 rounded"></div>
        <div className="h-2 w-2/3 bg-neutral-100 rounded"></div>
      </motion.div>
      <motion.div 
        drag
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full shadow-2xl flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: color }}
      >
        DRAG ME
      </motion.div>
    </div>
  );
};

const GhostGlass = ({ color }: { color: string }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative flex items-center justify-center"
         onMouseMove={(e) => {
           const rect = e.currentTarget.getBoundingClientRect();
           setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
         }}>
      <div className="text-center opacity-5">
        <h1 className="text-9xl font-black">HIDDEN</h1>
        <p className="text-2xl mono">REVEAL ON HOVER</p>
      </div>
      <motion.div 
        className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
        style={{
          clipPath: `circle(150px at ${mouse.x}px ${mouse.y}px)`,
          backdropFilter: 'blur(0px)',
          background: 'rgba(255,255,255,0.05)'
        }}
      >
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <div className="text-center">
            <h1 className="text-9xl font-black" style={{ color }}>GHOST</h1>
            <p className="text-2xl mono text-white">PRECISION DETAIL</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const KineticType = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center overflow-hidden">
      {["KINETIC", "MOTION", "SYSTEMS"].map((word, idx) => (
        <motion.div
          key={word}
          initial={{ x: idx % 2 === 0 ? -200 : 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: idx * 0.1, ease: "circOut" }}
          className="flex space-x-4"
        >
          {word.split('').map((char, cidx) => (
            <motion.span 
              key={cidx}
              whileHover={{ rotateY: 180, color }}
              className="text-8xl font-black text-white/20 cursor-default transition-colors duration-500"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const OrganicMesh = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
      <motion.svg viewBox="0 0 200 200" className="w-[80%] h-[80%]">
        <motion.path
          animate={{
            d: [
              "M45,-62C58.1,-52.1,68.2,-37.4,72.4,-21.5C76.6,-5.6,74.9,11.5,67.3,25.6C59.7,39.7,46.1,50.8,31.4,59.2C16.6,67.6,0.7,73.3,-15.1,70.9C-30.8,68.4,-46.4,57.7,-57.1,43.5C-67.8,29.3,-73.6,11.5,-71.4,-5.2C-69.2,-21.8,-59,-37.3,-45.9,-47.2C-32.8,-57.1,-16.4,-61.4,0.4,-61.9C17.2,-62.4,34.4,-59.1,45,-62Z",
              "M39.7,-55.8C52.1,-46.8,63.1,-36.1,68.1,-23.1C73.1,-10,72.1,5.3,66.9,19.8C61.7,34.4,52.3,48.2,39.4,56.7C26.5,65.2,10.2,68.4,-5,66.2C-20.1,64,-34,56.5,-45.7,46.5C-57.5,36.5,-67.1,24.1,-70.5,10.2C-73.9,-3.6,-71.1,-18.9,-63.3,-31.2C-55.5,-43.5,-42.7,-52.8,-29.6,-61.4C-16.5,-70,-3.2,-77.9,8.5,-75.4C20.3,-72.9,31.1,-64.8,39.7,-55.8Z",
              "M45,-62C58.1,-52.1,68.2,-37.4,72.4,-21.5C76.6,-5.6,74.9,11.5,67.3,25.6C59.7,39.7,46.1,50.8,31.4,59.2C16.6,67.6,0.7,73.3,-15.1,70.9C-30.8,68.4,-46.4,57.7,-57.1,43.5C-67.8,29.3,-73.6,11.5,-71.4,-5.2C-69.2,-21.8,-59,-37.3,-45.9,-47.2C-32.8,-57.1,-16.4,-61.4,0.4,-61.9C17.2,-62.4,34.4,-59.1,45,-62Z"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          transform="translate(100 100)"
          fill={color}
          className="opacity-10"
        />
      </motion.svg>
      <div className="absolute z-10 text-center">
        <h1 className="text-6xl font-black text-black tracking-tight">BIO_LOGIC</h1>
        <p className="mono text-black/40 text-xs mt-4">NATURE INSPIRED COMPUTING</p>
      </div>
    </div>
  );
};

const ParallaxScrub = ({ color }: { color: string }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <div className="w-full h-full bg-[#111] overflow-hidden relative"
         onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}>
      {[0.1, 0.2, 0.4, 0.6, 0.8].map((depth, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{
            x: (mouse.x - window.innerWidth/2) * depth,
            y: (mouse.y - window.innerHeight/2) * depth,
          }}
        >
          {i === 2 ? (
            <h1 className="text-9xl font-black text-white" style={{ opacity: 1 - depth }}>SCENE</h1>
          ) : (
            <div 
              className="border border-white/10 rounded-full" 
              style={{ 
                width: `${(i + 1) * 300}px`, 
                height: `${(i + 1) * 300}px`,
                borderColor: i === 4 ? color : 'rgba(255,255,255,0.1)'
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export const LivePreview: React.FC<PreviewProps> = ({ id, primaryColor }) => {
  const components: Record<string, React.ReactNode> = {
    'neural-nexus': <NeuralNexus color={primaryColor} />,
    'bento-fluid': <BentoFluid color={primaryColor} />,
    'terminal-velocity': <TerminalVelocity color={primaryColor} />,
    'brutalist-mono': <BrutalistMono color={primaryColor} />,
    'liquid-gold': <LiquidGold color={primaryColor} />,
    'infinite-canvas': <InfiniteCanvas color={primaryColor} />,
    'ghost-glass': <GhostGlass color={primaryColor} />,
    'kinetic-type': <KineticType color={primaryColor} />,
    'organic-mesh': <OrganicMesh color={primaryColor} />,
    'parallax-scrub': <ParallaxScrub color={primaryColor} />,
  };

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {components[id] || <div className="flex items-center justify-center h-full text-white/20">Component implementation coming soon...</div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
