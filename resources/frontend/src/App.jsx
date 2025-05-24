import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import lv from './languages/lv.json';
import './App.css';
import HomePage from './public/pages/home/HomePage';
import DefaultLayout from './public/components/DefaultLayout';
import Register from './public/pages/Auth/Register.jsx';
import Login from './public/pages/Auth/Login.jsx';

function App() {
  return (
    <IntlProvider locale="lv" messages={lv} defaultLocale="lv">
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
