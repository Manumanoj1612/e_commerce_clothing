// src/App.js
import { useAuth } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './context/ProtectedRoute';

import NavBar from './components/NavBar';
import NavBarAdmin from './pages/admin/NavBarAdmin';
import NotFound from './pages/NotFound';

import HomePage from './pages/shop/HomePage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import MenPage from './pages/shop/Men';
import WomenPage from './pages/shop/Women';
import Product from './pages/shop/Product';
import ProductDetails from './pages/shop/ProductDetails';

import AdminProduct from './pages/admin/AdminProduct';
import Order from './pages/admin/Order';
import Profile from './pages/shop/Profile';
import Orders from './pages/shop/Orders';
import Cart from './pages/shop/Cart';

function App() {
  const { user } = useAuth();

  const renderNavbar = () => {
    if (!user) return <NavBar />;
    return user.role === 'admin' ? <NavBarAdmin /> : <NavBar />;
  };

  return (
    <div>
      {renderNavbar()}

      <Routes>
        {/* Common Routes */}
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer Routes */}
        <Route
          path="/men"
          element={
            <ProtectedRoute role="customer">
              <MenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/women"
          element={
            <ProtectedRoute role="customer">
              <WomenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute role="customer">
              <Product />
            </ProtectedRoute>
          }
        />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute role="customer">
                <ProductDetails />
              </ProtectedRoute>
            }
          />  
          <Route
            path="/Orders"
            element={
              <ProtectedRoute role="customer">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute role="customer">
                <Cart />
              </ProtectedRoute>
            }
          />      
        {/* Admin Routes */}
        <Route
          path="/Adminproduct"
          element={
            <ProtectedRoute role="admin">
              <AdminProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Order"
          element={
            <ProtectedRoute role="admin">
              <Order />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role={['admin', 'customer']}>
              <Profile/>
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
