import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Init from './pages/Init'
import Ferramentas from './pages/Ferramentas';
import Requisicoes from './pages/Requisicoes';
import StatusRequisicao from './pages/StatusRequisicao';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Init />} />
          <Route path="ferramentas" element={<Ferramentas />} />
          <Route path="requisicoes" element={<Requisicoes />} />
          <Route path="status-requisicao" element={<StatusRequisicao />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
