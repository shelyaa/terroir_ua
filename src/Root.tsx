import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { ProfilePage } from "./pages/ProfilePage";
import { WineCatalogPage } from "./pages/WineCatalogPage";
import { WineDetailsPage } from "./pages/WineDetailsPage";
import { WineryPage } from "./pages/WineryPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { SupportPage } from "./pages/SupportPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { WineManagementPage } from "./pages/admin/WineManagementPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { useEffect } from "react";
import { setUser, removeUser } from "./store/slices/userSlice";
import { CreateWinePage } from "./pages/admin/CreateWinePage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { PaymentCancelPage } from "./pages/PaymentCancelPage";
import { AdminProfilePage } from "./pages/admin/AdminProfilePage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { AdminLayout } from "./components/layout/admin/AdminLayout";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

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
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/my-orders" element={<MyOrdersPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route
            path="/polityka-konfidentsiynosti"
            element={<PrivacyPolicyPage />}
          />
          <Route path="/help" element={<SupportPage />} />
          <Route path="/order" element={<CheckoutPage />} />
          <Route path="/wine" element={<WineCatalogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/winery" element={<WineryPage />} />
          <Route path="/payments/success" element={<PaymentSuccessPage />} />
          <Route path="/payments/cancel" element={<PaymentCancelPage />} />
          <Route path="/wine/:id" element={<WineDetailsPage />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="account" element={<AdminProfilePage />} />
          <Route path="wine" element={<WineCatalogPage />} />
          <Route path="products" element={<WineManagementPage />} />
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
