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

import PrivateRoute from './data/hooks/auth/PrivateRoute'

function App() {
  return (
    <>
      <Navbar/>
      <main className="">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/students' element={<Students/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/newpost" element={<NewPost/>}/>
          <Route path="/editblog/:blogId" element={<EditPost/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path=":id" element={<Profile/>}/>
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
