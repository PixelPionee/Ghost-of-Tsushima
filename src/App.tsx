import { WindCursor } from './components/Cursor';
import { SectionProvider } from './contexts/SectionContext';
import { MainPage } from './pages/MainPage';
import './styles/global.css';
import './styles/animations.css';

function App() {
  return (
    <SectionProvider>
      {/* Cursor de Vento - Reage ao contexto da seção */}
      <WindCursor 
        enabled={true}
        showCursor={false}
      />

      {/* Página Principal One-Page Scroll */}
      <MainPage />
    </SectionProvider>
  );
}

export default App;
