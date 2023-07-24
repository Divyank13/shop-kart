import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/authContext";

import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { HomePage } from "./pages/HomePage/HomePage";
import { Header } from "./components/header/header";
import { SearchPage } from "./pages/searchPage/searchPage";
import { CategoryPage } from "./pages/categoryPage/categoryPage";
import { Login } from "./pages/login/login";
import { SignupPage } from "./pages/signup/signupPage";
import { ProfilePage } from "./pages/profilePage/profilePage";
import { RequiresAuth } from "./requiresAuth/requiresAuth";
import { WishListPage } from "./pages/wishListPage/wishListPage";
import { CartPage } from "./pages/cartPage/cartPage";
import { CheckoutPage } from "./pages/checkoutPage/checkoutPage";
import { AllProductsPage } from "./pages/allProductsPage/allProductsPage";
import { ProductPage } from "./pages/ProductPage";
import { ToastContainer } from "react-toastify";

function App() {

  const { isLoggedIn } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Header />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productID" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={isLoggedIn
          ? (location?.state !== null)
            ? <Navigate to={location?.state?.from?.pathname} />
            : <Navigate to="/" />
          : <Login />} />
        <Route path="/sign-up" element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path="/wishlist" element={<RequiresAuth><WishListPage /></RequiresAuth>} />
        <Route path="/cart" element={<RequiresAuth><CartPage /></RequiresAuth>} />
        <Route path="/checkout" element={<RequiresAuth><CheckoutPage /></RequiresAuth>} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
