import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,logout} from '../Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <>
        <header>
            <Link to = '/'>
               <button> hello</button>
            </Link>
            <div id = 'nav-pages'>
                {user && <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>}
                {!user && <Link to="/login" >login</Link>}
            </div>
        </header>
        </>
    );    
}

export default Navbar