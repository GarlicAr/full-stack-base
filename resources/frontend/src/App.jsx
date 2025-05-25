import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import lv from './languages/lv.json';
import './App.css';
import Register from './public/pages/Auth/Register.jsx';
import Login from './public/pages/Auth/Login.jsx';
import Router from './public/components/Router/index.jsx';

function App() {
  return (
    <IntlProvider locale="lv" messages={lv} defaultLocale="lv">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
        <Router />
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
