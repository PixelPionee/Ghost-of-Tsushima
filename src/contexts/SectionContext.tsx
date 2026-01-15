import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { SectionContext as SectionType, CursorEffect } from '../types/tsushima.types';

interface SectionContextValue {
  currentSection: SectionType;
  cursorEffect: CursorEffect | null;
  setSection: (section: SectionType, effect?: CursorEffect | null) => void;
  resetSection: () => void;
}

const SectionContext = createContext<SectionContextValue | undefined>(undefined);

interface SectionProviderProps {
  children: ReactNode;
}

export function SectionProvider({ children }: SectionProviderProps) {
  const [currentSection, setCurrentSection] = useState<SectionType>('default');
  const [cursorEffect, setCursorEffect] = useState<CursorEffect | null>(null);

  const setSection = useCallback((section: SectionType, effect?: CursorEffect | null) => {
    setCurrentSection(section);
    setCursorEffect(effect ?? null);
  }, []);

  const resetSection = useCallback(() => {
    setCurrentSection('default');
    setCursorEffect(null);
  }, []);

  return (
    <SectionContext.Provider
      value={{
        currentSection,
        cursorEffect,
        setSection,
        resetSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  const context = useContext(SectionContext);
  
  if (context === undefined) {
    throw new Error('useSectionContext must be used within a SectionProvider');
  }
  
  return context;
}
