import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // Sprawdzamy, czy token nie wygasł
      if (decodedToken.exp * 1000 > Date.now()) {
        isAuthenticated = true;  // Token jest ważny
      } else {
        localStorage.removeItem("token");  // Usuwamy wygasły token
      }
    } catch (error) {
      localStorage.removeItem("token");  // Jeśli nie udało się odczytać tokenu
    }
  }

  if (!isAuthenticated) {
    // Jeśli nie jest autoryzowany, przekierowujemy na stronę logowania
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
