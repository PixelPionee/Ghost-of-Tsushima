import { useEffect, useRef } from 'react';
import { useSectionContext } from '../contexts/SectionContext';
import { useTsushimaData } from '../hooks/useTsushimaData';
import './MainPage.css';

export function MainPage() {
  const { data, loading } = useTsushimaData();
  const { setSection, resetSection } = useSectionContext();
  
  const charactersRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const stancesRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (ref: React.RefObject<HTMLElement>, sectionId: string) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (sectionId === 'ryuzo-duel' && data) {
                const ryuzoChapter = data.story.chapters.find(ch => ch.id === 'ryuzo-duel');
                if (ryuzoChapter?.cursorEffect) {
                  setSection('ryuzo-duel', ryuzoChapter.cursorEffect);
                }
              } else {
                resetSection();
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(ref.current);
      observers.push(observer);
    };

    createObserver(storyRef, 'ryuzo-duel');

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [data, setSection, resetSection]);

  if (loading) {
    return (
      <div className="main-page__loading">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="main-page__error">
        <h2>Erro ao carregar dados</h2>
        <p>Não foi possível carregar os dados do jogo. Por favor, tente novamente mais tarde.</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '1rem' }}>
          Verifique o console do navegador para mais detalhes.
        </p>
      </div>
    );
  }

  return (
    <div className="main-page">
      <nav className="main-nav">
        <button onClick={() => scrollToSection(charactersRef)} className="main-nav__link">
          PERSONAGENS
        </button>
        <button onClick={() => scrollToSection(storyRef)} className="main-nav__link">
          HISTÓRIA
        </button>
        <button onClick={() => scrollToSection(stancesRef)} className="main-nav__link">
          POSTURAS
        </button>
      </nav>

      <section ref={charactersRef} className="section section--characters" id="personagens">
        <h2 className="section__title">Personagens</h2>
        
        <div className="characters-grid">
          {data.characters.map((character) => (
            <div key={character.id} className="character-card">
              <h3 className="character-card__name">{character.name}</h3>
              <p className="character-card__title">{character.title}</p>
              <p className="character-card__essence">{character.essence}</p>
              <p className="character-card__description">{character.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={storyRef} className="section section--story" id="historia">
        <h2 className="section__title">História</h2>
        
        <div className="story-content">
          {data.story.chapters.map((chapter) => (
            <div 
              key={chapter.id} 
              className={`story-chapter ${chapter.isClimax ? 'story-chapter--climax' : ''}`}
            >
              <h3 className="story-chapter__title">{chapter.title}</h3>
              
              {chapter.subtitle && (
                <p className="story-chapter__subtitle">{chapter.subtitle}</p>
              )}
              
              {chapter.quote && (
                <blockquote className="story-chapter__quote">
                  "{chapter.quote}"
                </blockquote>
              )}
              
              {chapter.hasImage && chapter.imagePath && (
                <div className="story-chapter__image-container">
                  <div className="story-chapter__image" style={{
                    backgroundImage: `url(${chapter.imagePath})`
                  }}>
                    <div className="story-chapter__image-overlay" />
                  </div>
                </div>
              )}
              
              <p className="story-chapter__content">{chapter.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={stancesRef} className="section section--stances" id="posturas">
        <h2 className="section__title">Posturas</h2>
        
        <div className="stances-grid">
          {data.stances.map((stance) => (
            <div 
              key={stance.id} 
              className="stance-card"
              onMouseEnter={() => setSection(stance.id as any, stance.cursorEffect)}
              onMouseLeave={() => resetSection()}
            >
              <p className="stance-card__kanji">{stance.kanji}</p>
              <h3 className="stance-card__name">{stance.name}</h3>
              <p className="stance-card__essence">{stance.essence}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="main-footer">
        <p>Desenvolvido por Caio LighSpeed</p>
      </footer>
    </div>
  );
}
