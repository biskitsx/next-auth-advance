import { PrismaClient } from "@prisma/client";
// ประกาศแบบนี้เนื่องจาก hot reload ของ nextjs ทำให้สร้าง prismaclient ขึ้นมาใหม่ๆเรื่อย
// ทำให้เกิดปัญหาว่ามีการเชื่อมต่อฐานข้อมูลซ้ำๆ
// เซฟเป็น global จะไม่เกิดปัญหานี้
declare global {
    var prisma: PrismaClient;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}