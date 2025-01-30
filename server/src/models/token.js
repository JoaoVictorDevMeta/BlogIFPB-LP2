import prisma from "../db/database.js";

async function readByUserId(userId) {
    return await prisma.token.findUnique({
        where: {
        userId,
        },
    });
}

async function create(userId, token) {
    return await prisma.token.create({
        data: {
            userId,
            token,
            expiration: new Date(Date.now() + 3600000), // 1 hour, can be more
        },
    });
}

async function deleteOne(id) {
    return await prisma.token.delete({
        where: {
            id,
        },
    });
}

async function deleteByUserId(userId) {
    return await prisma.token.delete({
        where: {
            userId,
        },
    });
}

export default { readByUserId, create, deleteOne, deleteByUserId };