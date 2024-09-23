import prisma from '../db/database.js'

async function create({name, email, password, course, imageUrl = '', grade = '', description = ''}){
    return await prisma.user.create({
        data: {
            email,
            password,
            Perfil: {
                create: {
                    imageUrl,
                    name,
                    course,
                    grade,
                    description,
                }
            }
        }
    })
}

async function readAll(){
    return await prisma.user.findMany({
        include: {
            Perfil: true,
        }
    })
}


export default { create, readAll }