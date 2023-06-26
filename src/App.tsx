import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Create from './pages/create/create';
import NotFound from './pages/not-found/not-found';
import Modal from './components/modal/modal';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/:step" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Modal />
    </>
  );
};

export default App;
