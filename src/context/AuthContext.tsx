import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect
} from "react";
import { firebase, auth } from "services/firebase";

type AuthContextData = {
  user: User;
  singInWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children?: ReactNode;
};

type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({ avatarUrl: "", id: "", name: "" });

  const singInWithGoogle = useCallback(async (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }
      setUser({
        avatarUrl: photoURL,
        id: uid,
        name: displayName
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user) {
          const { displayName, photoURL, uid } = user;
          if (!displayName || !photoURL) {
            throw new Error("Missing information from Google Account.");
          }
          setUser({
            avatarUrl: photoURL,
            id: uid,
            name: displayName
          });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
