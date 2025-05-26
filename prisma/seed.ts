import { Prisma, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new Prisma();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: await hash('123456', 10),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
