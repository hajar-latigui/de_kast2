import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    setPersistence,
    browserSessionPersistence,
  } from "firebase/auth";
  import {
    getFirestore,
    addDoc,
    collection,
    setDoc,
    doc
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      setPersistence(auth, browserSessionPersistence);
      console.log(email);
      console.log(password);
      await signInWithEmailAndPassword(auth, email, password).session;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, phone,active, password, addendum, type,) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email,phone,active, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        phone,
        active,
        authProvider: "local",
        email,
      });
      await setDoc(doc(db,"subscription", user.uid),{
        active : active,
        visits : 0,
        type : type,
        addendum : addendum,
      });
      logout();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logout = () => {
    signOut(auth);
    auth.signOut();
  };

  export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };