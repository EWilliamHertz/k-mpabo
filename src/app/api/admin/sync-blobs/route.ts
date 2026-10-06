import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
    if (!BLOB_TOKEN) return NextResponse.json({ error: "Missing token" }, { status: 500 });
    
    const { blobs } = await list({ token: BLOB_TOKEN, limit: 100 });
    
    const inserted = [];
    
    for (const blob of blobs) {
      if (!blob.pathname.startsWith('kampabo/')) continue;
      
      const parts = blob.pathname.split('/');
      if (parts.length < 3) continue;
      
      const category = parts[1]; // 'utomhus', 'uppe', 'nere'
      const existing = await prisma.siteImage.findFirst({ where: { url: blob.url } });
      
      if (!existing) {
        await prisma.siteImage.create({
          data: {
            url: blob.url,
            category: category,
            altSv: `Synkad bild från blob (${blob.pathname})`,
          }
        });
        inserted.push(blob.pathname);
      }
    }
    
    return NextResponse.json({ success: true, count: inserted.length, inserted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
