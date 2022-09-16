import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/Firebase";
import {
  query,
  collection,
  getDocs,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import QrCode from "../QrCode/QrCode";

const Profile =() => {
  const [isShown, setIsShown] = useState(false);

  const changeState =() =>{
    setIsShown(true)
  }

  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState();
  const [subdata, setSubData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
    fetchSubscription();
  }, [user, loading]);

  
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const Data = doc.docs[0].data();
      setData(Data);
      console.log(Data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchSubscription = async () => {
    try {
      const docRef = doc(db, "subscription", user.uid);
      const docSnap = await getDoc(docRef);
      const SubData = docSnap.data();
      setSubData(SubData);
      console.log(SubData);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching subscription data");
    }
  };

  const subtype = () => {
    if (subdata.type === 0) return "You have no subscription";
    if (subdata.type === 1) return "Once a week";
    if (subdata.type === 2) return "Twice a week";
    if (subdata.type === 3) return "Unlimited";
  };

  const add = () => {
    if (subdata.addendum === "true") return "Active";
    return "Not active";
  };

  return (
    <>
      {user && data && subdata && (
        <div className="App">
          <h1>Personal information:</h1>
          <h2>Name: {data.name}</h2>
          <h2>Phone number: {data.phone}</h2>
          <h2>Subscription type: {subtype()}</h2>
          <h2>Addendum: {add()}</h2>
          {!isShown && 
          <button
          className="btn"
          onClick={changeState}
        >
          Login
        </button>}
        {isShown && <QrCode />}
        </div>
      )}
    </>
  );
}
export default Profile;
