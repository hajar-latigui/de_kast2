import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logout,
  registerWithEmailAndPassword,
} from "../Components/Firebase/Firebase";
import Calendar from "./Calendar/Calendar";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(false);
  const [addendum, setAddendum] = useState(false);
  const [type, setType] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate;
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    if (!email) alert("Please enter email");
    if (!phone) alert("Please enter phone number");
    if (!password) alert("Please enter password");
    registerWithEmailAndPassword(
      name,
      email,
      phone,
      active,
      password,
      addendum,
      type
    );
  };

  useEffect(() => {
    if (loading) return;
    if (user);
  }, [user, loading]);

  return ( <div>
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="text"
          className="register__textBox"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          type="checkbox"
          className="register__textBox"
          value={active}
          onChange={(e) => setActive(e.target.checked)}
          placeholder="Active"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <select onChange={(e) => setType(parseInt(e.target.value))}>
          <option defaultValue = {type}>
            Choose a type
          </option>
          <option value="1">1x per week</option>
          <option value="2">2x per week</option>
          <option value="3">Onbeperkt</option>
        </select>
        <input
          type="checkbox"
          className="register__textBox"
          value={addendum}
          onChange={(e) => setAddendum(e.target.checked)}
          placeholder="Addendum"
        />
        <button className="register__btn" onClick={register}>
          Add user
        </button>
      </div>
    </div>
   <Calendar/>
    </div>
  );
};
export default AddUser;
