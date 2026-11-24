import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    // reducedMotion="user" → animasi transform dimatikan otomatis bila OS meminta "reduce motion"
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MotionConfig>
  );
}
