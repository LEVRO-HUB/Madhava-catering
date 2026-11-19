import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MenuSelectionProvider } from './context/MenuSelectionContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MadhavaExperience from './components/MadhavaExperience.jsx';
import CateringReels from './components/CateringReels.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';
import PredefinedMenuList from './components/PredefinedMenuList.jsx';
import PredefinedMenuDetails from './components/PredefinedMenuDetails.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogArticlePage from './pages/BlogArticlePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ScrollToHash from './components/ScrollToHash.jsx';
import Seo from './components/Seo.jsx';
import { SITE_URL, BUSINESS_NAME, BUSINESS_LOGO, BUSINESS_PHONES } from './data/businessConfig.js';

// NOTE: the interactive dish builder (OurMenu.jsx category grid,
// MenuBuilder.jsx, BananaLeafPreview.jsx and their data/CSS) is
// intentionally no longer rendered here — the business wants a
// showcase-only site for now. The components, dish data and leaf
// position-mapping logic are untouched and left in place for a future
// phase; only the homepage wiring that rendered them was removed.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'Caterer'],
  name: BUSINESS_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${BUSINESS_LOGO}`,
  telephone: BUSINESS_PHONES,
  // No address, opening hours, ratings or review count: not yet verified
  // with the business. Add them here only once confirmed — see PART 7 of
  // the SEO brief and businessConfig.js.
};

function HomePage() {
  return (
    <>
      <Seo
        title="Madhava Catering Services | Wedding & Event Catering"
        description="Traditional South Indian catering for weddings, receptions, Seemantham, housewarming and family celebrations. Explore our menus and catering services."
        path="/"
        jsonLd={organizationJsonLd}
      />
      <Hero />
      <MadhavaExperience />
      <CateringReels />
      <Testimonials />
    </>
  );
}

export default function App() {
  return (
    <MenuSelectionProvider>
      <Navbar />
      <ScrollToHash />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/menus" element={<PredefinedMenuList />} />
          <Route path="/menus/:slug" element={<PredefinedMenuDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </MenuSelectionProvider>
  );
}
