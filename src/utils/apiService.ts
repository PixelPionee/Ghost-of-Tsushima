import type { TsushimaData, Character, Stance, SectionContext, StoryChapter } from '../types/tsushima.types';

let cachedData: TsushimaData | null = null;

export const fetchTsushimaData = async (): Promise<TsushimaData> => {
  if (cachedData) {
    return cachedData;
  }

  try {
    // Get base URL from Vite env or fallback to current path
    const baseUrl = import.meta.env.BASE_URL || '/Ghost-of-Tsushima/';
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const apiUrl = `${normalizedBase}api/tsushima-data.json`;
    
    console.log('🔍 Fetching API from:', apiUrl);
    console.log('📍 BASE_URL:', import.meta.env.BASE_URL);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TsushimaData = await response.json();
    cachedData = data;
    
    return data;
  } catch (error) {
    console.error('Error fetching Tsushima data:', error);
    throw error;
  }
};

export const getCharacterById = async (id: string): Promise<Character | undefined> => {
  const data = await fetchTsushimaData();
  return data.characters.find(char => char.id === id);
};

export const getStanceById = async (id: string): Promise<Stance | undefined> => {
  const data = await fetchTsushimaData();
  return data.stances.find(stance => stance.id === id);
};

export const getChapterById = async (id: string): Promise<StoryChapter | undefined> => {
  const data = await fetchTsushimaData();
  return data.story.chapters.find(chapter => chapter.id === id);
};

export const getRyuzoDuel = async (): Promise<StoryChapter | undefined> => {
  return getChapterById('ryuzo-duel');
};

export const getCursorEffectForSection = async (section: SectionContext) => {
  const data = await fetchTsushimaData();
  
  // Verifica se é um capítulo da história
  const chapter = data.story.chapters.find(ch => ch.id === section);
  if (chapter && chapter.cursorEffect) {
    return chapter.cursorEffect;
  }
  
  const stance = data.stances.find(s => s.id === section);
  if (stance) {
    return stance.cursorEffect;
  }
  
  return null;
};

export const clearCache = () => {
  cachedData = null;
};
