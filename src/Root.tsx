import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./user/HomePage";
import { AuthPage } from "./user/AuthPage";
import { RegisterPage } from "./user/RegisterPage";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import "./firebase";
import { AccountPage } from "./user/AccountPage";
import { WinePage } from "./user/WinePage";
import { WineDetailsPage } from "./user/WineDetailsPage";
import { WineryPage } from "./user/WineryPage";
import { AboutPage } from "./user/AboutPage";
import { ContactsPage } from "./user/ContactsPage";
import { PrivacyPolicyPage } from "./user/PrivacyPolicyPage";
import { HelpPage } from "./user/HelpPage";
import { PurchasePage } from "./user/PurchasePage";
import { AdminLayout } from "./admin/AdminLayout";
import { AdminProductsPage } from "./admin/AdminProductsPage";
import { AdminDashboard } from "./admin/AdminDashboard";
import { useEffect } from "react";
import { setUser, removeUser } from "./store/slices/userSlice";
import { CreateWinePage } from "./admin/CreateWinePage";
import { PaymentSuccessPage } from "./user/PaymentSuccessPage";
import { ScrollToTop } from "./utils/ScrollToTop";
import { PaymentCancelPage } from "./user/PaymentCancelPage";
import { AdminAccountPage } from "./admin/AdminAccount";

function AppWithUserInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch(setUser(user));
    } else {
      dispatch(removeUser());
    }
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route
            path="/polityka-konfidentsiynosti"
            element={<PrivacyPolicyPage />}
          />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/order" element={<PurchasePage />} />
          <Route path="/wine" element={<WinePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/winery" element={<WineryPage />} />
          <Route path="/payments/success" element={<PaymentSuccessPage />} />
          <Route path="/payments/cancel" element={<PaymentCancelPage />} />
          <Route path="/wine/:id" element={<WineDetailsPage />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="account" element={<AdminAccountPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<CreateWinePage />} />
          <Route path="products/:id/edit" element={<CreateWinePage />} />
        </Route>
      </Routes>
    </>
  );
}

export const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppWithUserInit />
    </BrowserRouter>
  </Provider>
);
