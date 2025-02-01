import { Routes, Route } from "react-router-dom";

// Páginas do Projeto
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile"
import Blog from "./pages/blog/Blog"
import Search from "./pages/search/Search";
import Students from "./pages/students/Students";
import Navbar from "./ui/partials/Navbar"
import NewPost from "./pages/newPost/NewPost";
import EditPost from "./pages/editPost/EditPost";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import RedefinePassword from "./pages/redefinePassword/redefinePassword";
import EditImage from "./pages/editProfile/EditProfile";

import PrivateRoute from './data/hooks/auth/PrivateRoute'

function App() {
  return (
    <>
      <Navbar/>
      <main className="">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/redefine-password" element={<RedefinePassword/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/students' element={<Students/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/edit-profile" element={<EditImage/>}/>
            <Route path="/editblog/:blogId" element={<EditPost/>}/>
            <Route path="/newpost" element={<NewPost/>}/>
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
