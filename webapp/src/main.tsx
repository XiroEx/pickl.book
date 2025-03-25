import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";
import App from './App';
import './index.css';

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  console.error("Failed to find the root element");
}