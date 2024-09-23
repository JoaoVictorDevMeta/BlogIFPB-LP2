import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './Blog.css'

import Categoria from '../../ui/partials/Categoria'
import Title from '../../ui/partials/Title'
import Subtitle from '../../ui/partials/Subtitle'
import Texto from '../../ui/partials/Texto'
import Imagem from '../../ui/partials/Imagem'
import Autor from '../../ui/partials/Autor'

const Blog = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/blog/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data))
  }, [])

  console.log(blog)

  function deleteBlog() {
    fetch(`http://localhost:3000/blog/${id}`, {
      method: 'DELETE'
    }).then(() => {
      alert('Blog deletado com sucesso!')
      window.location.href = '/'
    }).catch(error => console.log(error))
  }

  return (
    <>
    <section class="container-xxl conteudo-xxl mt-5 py-5 mb-5">
        <Categoria categoria="Categoria"/>
        <Title title={blog?.title || '...'}/> 
        <Subtitle subtitle={blog?.subTitle} autor={blog?.author?.Perfil?.name} data={blog?.createdAt} atualizado={blog?.updatedAt}/>
        <Imagem alt="Imagem inicial" descricao="Descrição da imagem" autor={blog?.author?.Perfil?.name} fonte="Google" src={blog?.image_url}/>
        <Texto texto={blog?.content || '...'}/>

        <div>
          <a href={`/editblog/${blog?.id}`} className='ps-5'>Editar Blog</a>
          <button className='sample-button ms-4' onClick={() => {deleteBlog()}}>Deletar Blog</button>
        </div>
      </section>
    <Autor autor={blog?.author?.name} tipo="Aluno" area="Informática III" texto={blog?.author?.email}>
    </Autor>
    </>
  )
}

export default Blog