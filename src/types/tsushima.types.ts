export interface CursorEffect {
  particleSpeed: 'slow' | 'medium' | 'fast' | 'variable';
  particleSize: 'small' | 'medium' | 'large';
  particleFrequency: 'low' | 'medium' | 'high' | 'rhythmic';
  color: string;
  flow?: string;
  movement?: string;
  pattern?: string;
  intensity?: string;
  emotion?: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  subtitle?: string;
  quote?: string;
  content: string;
  isClimax?: boolean;
  hasImage?: boolean;
  imagePath?: string;
  cursorEffect: CursorEffect | null;
}

export interface Story {
  title: string;
  chapters: StoryChapter[];
  keyLocations: string[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  essence: string;
  description: string;
  conflict: string;
}

export type StanceId = 'stone-stance' | 'water-stance' | 'wind-stance' | 'moon-stance';

export interface Stance {
  id: StanceId;
  name: string;
  kanji: string;
  essence: string;
  description: string;
  rhythm: string;
  cursorEffect: CursorEffect;
  philosophy: string;
}

export interface Themes {
  primary: string;
  secondary: string[];
}

export interface TsushimaData {
  story: Story;
  characters: Character[];
  stances: Stance[];
  themes: Themes;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'leaf';
  color?: string; // Para efeitos especiais (Ryuzo, posturas)
}

export interface MousePosition {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
}

export type SectionContext = 
  | 'default'
  | 'invasion'
  | 'ryuzo-duel'
  | 'transformation'
  | 'final-choice'
  | 'stone-stance'
  | 'water-stance'
  | 'wind-stance'
  | 'moon-stance';

export interface SectionState {
  currentSection: SectionContext;
  cursorEffect: CursorEffect | null;
}
