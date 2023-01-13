import { PrismaClient } from '@prisma/client'
import { users, events, requests, reviews, notifications } from './data';

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  console.log('Deleted records in users table')

  await prisma.event.deleteMany()
  console.log('Deleted records in events table')

  await prisma.request.deleteMany()
  console.log('Deleted records in request table')

  await prisma.review.deleteMany()
  console.log('Deleted records in reviews table')

  await prisma.notification.deleteMany()
  console.log('Deleted records in notifications table')

  await prisma.user.createMany({
    data: users,
  });
  console.log('Created users successfully')

  await prisma.event.createMany({
    data: events,
  });
  console.log('Created events successfully')

  await prisma.request.createMany({
    data: requests,
  });
  console.log('Created requests successfully')

  await prisma.review.createMany({
    data: reviews,
  });
  console.log('Created reviews successfully')

  await prisma.notification.createMany({
    data: notifications,
  });
  console.log('Created notifications successfully')
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