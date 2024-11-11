import prisma from '../db/database.js'

async function create({name, email, password, course, imageUrl = '', grade = '', description = '', bannerUrl= ''}){
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
                    bannerUrl,
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
async function updateUser(id, {email, password}) {
    return await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            email: email,
            password: password,
        }
    })
}

async function updatePerfil(id, {name, course, imageUrl = '', grade = '', bannerUrl = ''}) {
    return await prisma.user.update({
        where: {
            id: parseInt(id)
        }, data: {
            Perfil: {
                update: {
                    imageUrl,
                    name,
                    course,
                    grade,
                    bannerUrl,
                }
            }}
    })
}
async function deleteUser(id) {
    return await prisma.user.delete({
        where: {
            id:parseInt(id)
        }
    })
}
async function readOne(id){
    return await prisma.user.findUnique({
        where: {
            id:parseInt(id)
        },
        include: {
            Perfil: true
        }
    })
}
async function readByEmail(email){
    return await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            Perfil: true
        }
    })
}

export default { create, readAll, updatePerfil, readOne, deleteUser, updateUser, readByEmail }