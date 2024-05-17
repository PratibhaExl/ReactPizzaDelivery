import React from 'react'
import { isLoggedIn } from '../services/AuthService'
import { Navigate } from 'react-router-dom';

export default function RouteProtect({children,redirectTo}) {
    const loggedIn=isLoggedIn();
     return loggedIn? children : <Navigate to={redirectTo} />
}
