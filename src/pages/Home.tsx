import { InkButton } from '../components/UI';
import './Home.css';

export function Home() {
  const handleEnter = () => {
    console.log('Entrando no site...');
    // Aqui será a navegação para o menu principal
  };

  return (
    <div className="home">
      {/* Fundo Sumi-e com pinceladas de tinta */}
      <div className="home__background" aria-hidden="true" />
      
      {/* Conteúdo principal */}
      <div className="home__content">
        {/* Título em uma linha */}
        <h1 className="home__title">
          <span className="home__title-ghost">Ghost</span>
          <span className="home__title-of"> of </span>
          <span className="home__title-tsushima">Tsushima</span>
        </h1>
        
        {/* Subtítulo */}
        <p className="home__subtitle">
          O vento guia os guerreiros
        </p>
        
        {/* Botão de entrada com círculo Enso atrás */}
        <div className="home__cta">
          <InkButton onClick={handleEnter} size="large">
            Entrar
          </InkButton>
        </div>
      </div>
    </div>
  );
}
