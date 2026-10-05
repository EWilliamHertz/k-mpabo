"use server";

import { cookies } from 'next/headers';
import { put, del } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = "kampabo_admin_session";

export async function loginAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    (await cookies()).set(COOKIE_NAME, "authenticated", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return { success: true };
  }
  return { success: false, error: "Fel lösenord" };
}

export async function logoutAdmin() {
  (await cookies()).delete(COOKIE_NAME);
  return { success: true };
}

export async function checkAdmin() {
  const c = (await cookies()).get(COOKIE_NAME);
  return c?.value === "authenticated";
}

export async function uploadSiteImage(formData: FormData) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  
  const file = formData.get("file") as File;
  const category = formData.get("category") as string;
  const altSv = formData.get("altSv") as string;
  const altEn = formData.get("altEn") as string;
  const altDe = formData.get("altDe") as string;

  if (!file || !category) throw new Error("File and category are required");

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN saknas i miljön. Lägg till den i Vercel.");
  }

  const blob = await put(file.name, file, { access: 'public' });

  await prisma.siteImage.create({
    data: {
      url: blob.url,
      category,
      altSv: altSv || null,
      altEn: altEn || null,
      altDe: altDe || null,
    }
  });

  return { success: true };
}

export async function getSiteImages() {
  return prisma.siteImage.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function deleteSiteImage(id: string, url: string) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  
  await del(url);
  await prisma.siteImage.delete({ where: { id } });
  
  return { success: true };
}

export async function getAllAdminImages() {
  const dynamicImages = await prisma.siteImage.findMany({ orderBy: { createdAt: 'desc' } });
  
  const allImages = {
    utomhus: dynamicImages.filter(img => img.category === 'utomhus').map(img => ({ ...img, isDynamic: true })),
    uppe: dynamicImages.filter(img => img.category === 'uppe').map(img => ({ ...img, isDynamic: true })),
    nere: dynamicImages.filter(img => img.category === 'nere').map(img => ({ ...img, isDynamic: true })),
    annan: dynamicImages.filter(img => img.category === 'annan').map(img => ({ ...img, isDynamic: true }))
  };
  
  return allImages;
}
