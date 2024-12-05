import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import fs from "fs";

const prisma = new PrismaClient();
const saltRounds = Number(process.env.BCRYPT_SALT); //assumindo valor do Salt

async function main() {
  const data = JSON.parse(fs.readFileSync("prisma/seed.json", "utf-8"));

  // Criar usuários
  // cria os diplomas caso seja professor
  // cria o perfil
  // no usuario sao guardados campos de autenticação
  // no perfil o resto
  for (const user of data.users) {
    const { email, password, ...rest } = user;
    const { diplomas, ...perfil } = rest;
    const hashedPasswd = await bcrypt.hash(password, saltRounds); //senha criptografada

    const userData = await prisma.user.create({
      data: {
        email,
        password: hashedPasswd,
      },
    });

    if (diplomas && diplomas.length) {
      for (const diploma of diplomas) {
        await prisma.diplomas.create({
          data: {
            ...diploma,
            user: {
              connect: {
                id: userData.id,
              },
            },
          },
        });
      }
    }

    await prisma.perfil.create({
      data: {
        ...perfil,
        user: {
          connect: {
            id: userData.id,
          },
        },
      },
    });
  }

  // Criar categorias
  const categories = []
  for (const category of data.categories) {
    const newData = await prisma.category.create({
      data: category,
    });
    categories.push(newData);
  }

  // Criar blogs
  //console.log(categories)
  for (const blog of data.blogs) {
    const { category, author_id, references, ...rest } = blog;

    await prisma.blog.create({
      data: {
        ...rest,
        category: {
          connect: {
            id: categories.find((categ) => categ.name === category).id,
          },
        },
        referencies: {
          create: references.map((reference) => ({
            ...reference,
          })),
        },
        author: {
          connect: {
            id: author_id,
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })