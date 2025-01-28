import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  console.log(result);
  return result;
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  console.log(result);
  return result;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log(result);
  return result;
};

export const doSignOut = () => signOut(auth);

// export const doPasswordReset = (email: string) =>
//   sendPasswordResetEmail(auth, email);

// export const doPasswordUpdate = (password: string) =>
//   updatePassword(auth.currentUser!, password);

// export const doSendEmailVerification = () =>
//   sendEmailVerification(auth.currentUser!);

// export const doSendPasswordResetEmail = (email: string) =>
//   sendPasswordResetEmail(auth, email);
