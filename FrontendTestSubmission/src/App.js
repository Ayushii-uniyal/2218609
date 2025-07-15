import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import URLForm from './components/urlForm';
import URLStats from './components/urlStats';
import Redirect from './routes/Redirect';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<URLForm />} />
      <Route path="/stats" element={<URLStats />} />
      <Route path="/:shortcode" element={<Redirect />} />
    </Routes>
  </Router>
);

export default App;
