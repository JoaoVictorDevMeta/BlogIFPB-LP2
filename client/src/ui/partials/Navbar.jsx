import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../data/context/logout";

const Navbar = () => {
  const profile = localStorage.getItem("user");
  const user = JSON.parse(profile);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-none p-4 px-5 justify-content-between gap-5">
        <ul className="navbar-nav gap-5">
          <li className="nav-item active">
            <Link to="/" className="logo navbar-brand">
              Blog <span className="text-primary-emphasis">IFPB</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/students" className="nav-link">
              Alunos
            </Link>
          </li>
        </ul>
        <div className="navbar-nav pe-5 d-flex align-center gap-4">
          <form
            action="/search"
            role="search"
            className="d-flex flex-wrap gap-5"
          >
            <input
              type="text"
              className="nav-bar-input"
              placeholder="Buscar Assunto..."
            />
            <button className="btn button-outline" type="submit">
              Buscar
            </button>
          </form>
          {user ? (
            <button className="userBtn" onClick={() => {
              setShowModal(!showModal);
            }}>
              <img
                src={
                  user.Perfil?.imageUrl ||
                  "https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"
                }
                alt="profile-image"
              />
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </nav>
      {user ? (
        <div className={`user-modal ${showModal ? 'modal-open' : ''}`}>
          <div className="user-info">
            <Link to={`/profile/${user.id}`}>{user.Perfil?.name}</Link>
            <h5>{user.Perfil.course}</h5>
            <p>{user.email}</p>
          </div>
          <Link to="/newpost">| Postar um blog</Link>
          <button className="btn button-outline" onClick={() => {logout(navigate)}}>
            Logout
          </button>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
