import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Jeśli użytkownik jest już zalogowany, przekierowujemy go na stronę główną
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
