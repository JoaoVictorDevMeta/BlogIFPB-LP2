import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Students.css'

const Students = () => {
    const [students, setStudents] = useState([])

    async function fetchStudents() {
        const response = await fetch('http://localhost:3000/user/all')
        const data = await response.json()
        console.log(data)
        setStudents(data)
    }

    useEffect(() => {
        fetchStudents()
    }, [])

  return (
    <div>
        <div className='container-xxl bg-white p-5 mb-5'>
            <h1>Alunos</h1>
            <p className='fs-5'>Listagem de todos os alunos cadastrados</p>
            <hr />
            <ul className='students-container'>
                {students?.length && students?.map((student, i) => {
                    return <li key={i} className='pb-1 mb-4'>
                        <Link to={`/profile/${student?.id}`} className='fs-4'>{student?.name}</Link>
                        <p>{student?.email}</p>
                    </li>
                })}
                {students?.length === 0 ? <p>Nenhum aluno cadastrado</p> : null}
            </ul>
        </div>
    </div>
  )
}

export default Students