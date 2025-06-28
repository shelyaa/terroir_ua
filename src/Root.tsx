import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Provider } from "react-redux";
import {store} from './store';
import './firebase'
import { AccountPage } from "./pages/AccountPage";
import { WinePage } from "./pages/WinePage";
import { WineDetailsPage } from "./pages/WineDetailsPage";
import { WineryPage } from "./pages/WineryPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactsPage } from "./pages/ContactsPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";

export const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/polityka-konfidentsiynosti" element={<PrivacyPolicyPage />} />
          <Route path="/wine" element={<WinePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/winery" element={<WineryPage />} />
          <Route path="/wine/:id" element={<WineDetailsPage />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
