import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HostolinkHomepage from './components/page_accueil';
import AboutPage from './components/page_apropos';

import DownloadPage from './components/page_telechargement';
import FeaturesPage from './components/page_fonctionnalite';
import ContactPage from './components/page_contact';
import FAQPage from './components/faqs';
import LegalPage from './components/page_mention_legale_et_support';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HostolinkHomepage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/download" element={<DownloadPage />} />
        <Route path="/features" element={<FeaturesPage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/question" element={<FAQPage />} />
        <Route path="/page_mention_legale_et_support" element={<LegalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;