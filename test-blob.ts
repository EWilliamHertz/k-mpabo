import { list } from '@vercel/blob';

const BLOB_TOKEN = "vercel_blob_rw_ibO7DTrQovSUQAqf_nAplEvAUSw1p2JrKeKwnFVhfkUKs8t";

async function run() {
  const { blobs } = await list({ token: BLOB_TOKEN });
  console.log("Found", blobs.length, "blobs");
  console.log(blobs.slice(0, 5));
}
run();
