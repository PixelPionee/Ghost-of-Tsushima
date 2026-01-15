import { InkButton } from '../components/UI';
import './Home.css';

export function Home() {
  const handleEnter = () => {
    console.log('Entrando no site...');
  };

  return (
    <div className="home">
      
      <div className="home__background" aria-hidden="true" />
      
      
      <div className="home__content">
        
        <h1 className="home__title">
          <span className="home__title-ghost">Ghost</span>
          <span className="home__title-of"> of </span>
          <span className="home__title-tsushima">Tsushima</span>
        </h1>
        
       
        <p className="home__subtitle">
          O vento guia os guerreiros
        </p>
        
        
        <div className="home__cta">
          <InkButton onClick={handleEnter} size="large">
            Entrar
          </InkButton>
        </div>
      </div>
    </div>
  );
}
