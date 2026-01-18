import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WindCursor } from './components/Cursor';
import { SectionProvider } from './contexts/SectionContext';
import { Home } from './pages/Home';
import { MainPage } from './pages/MainPage';
import './styles/global.css';
import './styles/animations.css';

function App() {
  return (
    <BrowserRouter basename="/Ghost-of-Tsushima">
      <SectionProvider>
        <WindCursor 
          enabled={true}
          showCursor={false}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </SectionProvider>
    </BrowserRouter>
  );
}

export default App;
