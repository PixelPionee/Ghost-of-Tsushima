import type { TsushimaData, Character, Stance, SectionContext, StoryChapter } from '../types/tsushima.types';

let cachedData: TsushimaData | null = null;

/**
 * Busca os dados minimalistas de Tsushima
 */
export const fetchTsushimaData = async (): Promise<TsushimaData> => {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch('/api/tsushima-data.json');
    
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

/**
 * Busca um personagem específico por ID
 */
export const getCharacterById = async (id: string): Promise<Character | undefined> => {
  const data = await fetchTsushimaData();
  return data.characters.find(char => char.id === id);
};

/**
 * Busca uma postura específica por ID
 */
export const getStanceById = async (id: string): Promise<Stance | undefined> => {
  const data = await fetchTsushimaData();
  return data.stances.find(stance => stance.id === id);
};

/**
 * Busca um capítulo da história por ID
 */
export const getChapterById = async (id: string): Promise<StoryChapter | undefined> => {
  const data = await fetchTsushimaData();
  return data.story.chapters.find(chapter => chapter.id === id);
};

/**
 * Retorna o capítulo do Duelo de Ryuzo (ponto climático)
 */
export const getRyuzoDuel = async (): Promise<StoryChapter | undefined> => {
  return getChapterById('ryuzo-duel');
};

/**
 * Retorna o efeito de cursor baseado no contexto da seção
 */
export const getCursorEffectForSection = async (section: SectionContext) => {
  const data = await fetchTsushimaData();
  
  // Verifica se é um capítulo da história
  const chapter = data.story.chapters.find(ch => ch.id === section);
  if (chapter && chapter.cursorEffect) {
    return chapter.cursorEffect;
  }
  
  // Verifica se é uma postura
  const stance = data.stances.find(s => s.id === section);
  if (stance) {
    return stance.cursorEffect;
  }
  
  return null;
};

/**
 * Limpa o cache (útil para desenvolvimento)
 */
export const clearCache = () => {
  cachedData = null;
};
