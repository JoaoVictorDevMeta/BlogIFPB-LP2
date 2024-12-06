import prisma from "../db/database.js";

async function create(name) {
  return await prisma.category.create({ data: { name } });
}

async function readAll() {
  return await prisma.category.findMany();
}

async function readByName(name) {
    return await prisma.category.findFirst({
        where: {
            name
        }
    })
}

async function readOne(id) {
  return await prisma.category.findUnique({
    where: {
      id
    },
  });
}

async function update(id, name) {
  return await prisma.category.update({
    where: {
      id
    },
    data: {
      name,
    },
  });
}

async function deleteOne(id) {
  return await prisma.category.delete({
    where: {
      id
    },
  });
}

export default { create, readAll, readOne, update, deleteOne, readByName };