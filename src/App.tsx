import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Create from './pages/create/create';
import NotFound from './pages/not-found/not-found';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<Create />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
