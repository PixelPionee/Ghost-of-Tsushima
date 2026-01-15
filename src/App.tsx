import { WindCursor } from './components/Cursor';
import { SectionProvider } from './contexts/SectionContext';
import { MainPage } from './pages/MainPage';
import './styles/global.css';
import './styles/animations.css';

function App() {
  return (
    <SectionProvider>

      <WindCursor 
        enabled={true}
        showCursor={false}
      />

      <MainPage />
    </SectionProvider>
  );
}

export default App;
