import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

const Root = () => (
  <Router>
    <App />
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement)
  .render(<Root />);