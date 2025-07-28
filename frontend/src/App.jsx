import { Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import { useThemeStore } from './store/useThemeStore';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import Navbar from './components/Navbar';


function App() {
  const {isCheckingAuth, checkAuth, authUser} = useAuthStore()
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if(isCheckingAuth && !authUser){
    return (
     <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App;
