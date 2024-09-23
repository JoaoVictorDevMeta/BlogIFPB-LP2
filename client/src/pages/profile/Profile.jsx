import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Profile = () => {
  const mediaList = [
    <FaGithub />,
    <FaFacebook/>,
    <FaInstagram />,
  ]
  const [user, setUser] = useState({})
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
  }, [])

  //console.log(user)

  return (
    <section className="container-xxl mt-5">
      <div className='account d-flex flex-wrap gap-5'>
        <div className='imageac'>
          <img src='https://th.bing.com/th/id/R.b30698316012f1c7dbc8c28b122409d9?rik=WPBt56IYS7tDxg&pid=ImgRaw&r=0'/>
        </div>
        <div className=' text'>
          <h2 className='fw-bolder'>{user?.Perfil?.name || 'USUARIO NAO EXISTE'}</h2>
          <p className='fs-5'>{user?.email || ''}</p>
          <ul className='social-media d-flex gap-4 ps-0'>
            {mediaList.map((media, index) => (
              <li key={index}>
                <a href="#" className="fs-4 link-body-emphasis link-offset-2 link-underline-opacity-0">{media}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='background mt-4'>
        <h4>Sobre</h4>
        <p></p>
      </div>
      <div className='postages'>
        <h2><b>Postagens realizadas</b></h2>
        <div className='d-flex flex-wrap gap-5'>
        
        </div>
      </div>
    </section>
  )
}

export default Profile