import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';

// Code splitting per halaman (lazy load) → bundle awal lebih kecil.
const Home = lazy(() => import('../pages/Home.jsx'));
const Services = lazy(() => import('../pages/Services.jsx'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail.jsx'));
const Drivers = lazy(() => import('../pages/Drivers.jsx'));
const DriverDetail = lazy(() => import('../pages/DriverDetail.jsx'));
const Reviews = lazy(() => import('../pages/Reviews.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="drivers/:slug" element={<DriverDetail />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
