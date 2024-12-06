import prisma from "../db/database.js";

async function readAll() {
  return await prisma.blog.findMany({
    include: {
      category: true,
    },
  });
}

async function readById(id) {
  return await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
}

//ainda não implementado a parte de referencias
//pequeno ajuste futuro
async function create({
  author_id,
  category_id,
  image_url,
  title,
  subTitle,
  content,
}) {
  return await prisma.blog.create({
    data: {
      author_id,
      category_id,
      image_url,
      title,
      subTitle,
      content,
    },
  });
}

//im passing data here because there can be optional fields
async function updateContent(id, data) {
  return await prisma.blog.update({
    where: {
      id,
    },
    data: data,
  });
}

async function updateCategory(id, category_id) {
  return await prisma.blog.update({
    where: {
      id,
    },
    data: {
      category_id,
    },
  });
}

async function deleteOne(id) {
  return await prisma.blog.delete({
    where: {
      id,
    },
  });
}

export default {
  readAll,
  readById,
  create,
  updateContent,
  updateCategory,
  deleteOne,
};
