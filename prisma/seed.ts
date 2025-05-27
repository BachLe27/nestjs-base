import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const role = await prisma.role.upsert({
    where: {
      name: 'admin',
    },
    update: {},
    create: {
      name: 'admin',
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@gmail.com',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      password: await bcrypt.hash('123456', saltRounds),
      roleId: role.id,
    },
  });

  console.log('create admin user', user);
}

main()
  .catch(console.error)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
