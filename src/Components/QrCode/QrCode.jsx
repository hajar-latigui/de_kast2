import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';

const QrCode = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const dateTime = new Date().toLocaleString();
  
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/login");
    }, [user, loading]);


  return (
    <>
    {user && ( <>
    <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={user.uid+dateTime}
    viewBox={`0 0 256 256`}
    />
</div>
    </>)}
</>
  )
}

export default QrCode