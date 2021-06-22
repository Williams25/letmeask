import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

export const useAuth = () => {
  const { singInWithGoogle, user } = useContext(AuthContext);
  return {
    singInWithGoogle,
    user
  };
};
