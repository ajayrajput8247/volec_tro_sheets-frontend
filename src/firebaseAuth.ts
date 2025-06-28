import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "./firebase";  // Import your Firebase app config here

const auth = getAuth(app);

export const firebaseLogin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const firebaseSignup = (email: string, password: string, name: string) => {
  return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    return updateProfile(userCredential.user, {
      displayName: name,
    });
  });
};

export const firebaseLogout = () => {
  return auth.signOut();
};

export { auth };
