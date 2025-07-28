import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const {authUser } = useAuthStore()
  // if(!authUser){

  // }
  return (
    <>
      {authUser ? <Outlet/> : <Navigate to="login"/>}
    </>
  );
}

export default ProtectedRoute;