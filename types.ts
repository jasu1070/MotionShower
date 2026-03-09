
export interface LandingPageIdea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  animationStyle: string;
  visualTheme: 'dark' | 'light' | 'neon' | 'brutalist' | 'glass';
  difficulty: 'Intermediate' | 'Advanced' | 'Expert';
  icon: string;
  primaryColor: string;
}

export interface GeminiAnalysis {
  implementationSteps: string[];
  recommendedLibraries: string[];
  motionPrinciples: string;
}
