import prisma from "../db/database.js";

async function readAll() {
  return await prisma.user.findMany({
    include: {
      Perfil: true,
    },
  });
}

async function readOne(id) {
  return await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Perfil: true,
      Diplomas: true,
    },
  });
}

async function readPosts(id) {
  return await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Blog: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function readByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      Perfil: true,
    },
  });
}

async function create({
  name,
  email,
  password,
  course,
  imageUrl = "",
  grade = "",
  description = "",
  bannerUrl = "",
  diplomas = [],
}) {
  const data = {
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
      },
    },
  };

  if (diplomas.length > 0) {
    data.Diplomas = {
      create: diplomas,
    };
  }

  return await prisma.user.create({ data });
}

async function updateUser(id, { email, password }) {
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      email: email,
      password: password,
    },
  });
}

async function updatePerfil(
  id,
  { name, course, imageUrl = "", grade = "", bannerUrl = "" }
) {
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      Perfil: {
        update: {
          imageUrl,
          name,
          course,
          grade,
          bannerUrl,
        },
      },
    },
    include: {
      Perfil: true, 
    },
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function updatePassword(newPassword, id) {
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      password: newPassword,
    },
  });
}

export default {
  create,
  readAll,
  updatePerfil,
  readOne,
  deleteUser,
  updateUser,
  readByEmail,
  readPosts,
  updatePassword,
};
