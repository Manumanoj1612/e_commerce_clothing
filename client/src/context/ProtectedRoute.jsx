// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role) {
    // If role is an array → check if user.role is in array
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) {
        return <Navigate to="/" />;
      }
    } else {
      // If role is a string → simple compare
      if (user.role !== role) {
        return <Navigate to="/" />;
      }
    }
  }

  // Authorized
  return children;
}
