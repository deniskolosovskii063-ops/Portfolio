/**
 * Asset Storage Module
 * Manages uploading and serving portfolio images in Supabase Storage.
 * Bucket: make-de62407f-assets (public)
 */

import { createClient } from "npm:@supabase/supabase-js@2";

const BUCKET_NAME = "make-de62407f-assets";
const VIDEOS_BUCKET = "make-de62407f-videos";

function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

/** Idempotently create the public bucket on startup */
export async function ensureBucket() {
  const supabase = getSupabaseAdmin();
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.log("ensureBucket: failed to list buckets:", listErr.message);
    return;
  }
  const exists = buckets?.some((b) => b.name === BUCKET_NAME);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 52428800, // 50 MB per file
    });
    if (error) {
      console.log("ensureBucket: failed to create bucket:", error.message);
    } else {
      console.log(`ensureBucket: created bucket "${BUCKET_NAME}"`);
    }
  }
}

/** Idempotently create a public videos bucket (larger file size limit) */
export async function ensureVideosBucket() {
  const supabase = getSupabaseAdmin();
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.log("ensureVideosBucket: failed to list buckets:", listErr.message);
    return;
  }
  const exists = buckets?.some((b) => b.name === VIDEOS_BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(VIDEOS_BUCKET, {
      public: true,
      fileSizeLimit: 209715200, // 200 MB
    });
    if (error) {
      console.log("ensureVideosBucket: failed to create bucket:", error.message);
    } else {
      console.log(`ensureVideosBucket: created bucket "${VIDEOS_BUCKET}"`);
    }
  }
}

/** Upload a video from a remote URL to the videos bucket */
export async function uploadVideo(
  filename: string,
  sourceUrl: string,
): Promise<{ publicUrl: string } | { error: string }> {
  const supabase = getSupabaseAdmin();

  // Check if already uploaded
  const { data: listed } = await supabase.storage
    .from(VIDEOS_BUCKET)
    .list("", { search: filename });
  if (listed && listed.length > 0) {
    const { data: urlData } = supabase.storage
      .from(VIDEOS_BUCKET)
      .getPublicUrl(filename);
    console.log(`uploadVideo: "${filename}" already exists, returning cached URL`);
    return { publicUrl: urlData.publicUrl };
  }

  let response: Response;
  try {
    response = await fetch(sourceUrl, { redirect: "follow" });
    if (!response.ok) {
      return { error: `Fetch failed: ${response.status} ${response.statusText} for ${sourceUrl.slice(0, 80)}` };
    }
  } catch (e) {
    return { error: `Fetch error for ${filename}: ${String(e)}` };
  }

  const contentType = response.headers.get("content-type") || "video/mp4";
  const arrayBuffer = await response.arrayBuffer();
  console.log(`uploadVideo: "${filename}" fetched ${Math.round(arrayBuffer.byteLength / 1024 / 1024)}MB`);

  const { error: uploadError } = await supabase.storage
    .from(VIDEOS_BUCKET)
    .upload(filename, arrayBuffer, {
      contentType,
      upsert: true,
      cacheControl: "31536000",
    });

  if (uploadError) {
    return { error: `Upload failed for ${filename}: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage
    .from(VIDEOS_BUCKET)
    .getPublicUrl(filename);

  console.log(`uploadVideo: "${filename}" uploaded successfully`);
  return { publicUrl: urlData.publicUrl };
}

/** Build public URL for a given filename in the videos bucket */
export function getVideoPublicUrl(filename: string): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  return `${supabaseUrl}/storage/v1/object/public/${VIDEOS_BUCKET}/${filename}`;
}

/** Upload a single image from a remote URL to Storage */
export async function uploadAsset(
  filename: string,
  sourceUrl: string,
): Promise<{ publicUrl: string } | { error: string }> {
  const supabase = getSupabaseAdmin();

  // Check if already uploaded (avoid re-uploading)
  const { data: existing } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);
  if (existing?.publicUrl) {
    // Verify it actually exists by doing a HEAD-like check via list
    const { data: listed } = await supabase.storage
      .from(BUCKET_NAME)
      .list("", { search: filename });
    if (listed && listed.length > 0) {
      return { publicUrl: existing.publicUrl };
    }
  }

  // Fetch the image from the source URL
  let response: Response;
  try {
    response = await fetch(sourceUrl);
    if (!response.ok) {
      return { error: `Fetch failed: ${response.status} ${response.statusText} for ${sourceUrl}` };
    }
  } catch (e) {
    return { error: `Fetch error for ${filename}: ${String(e)}` };
  }

  const contentType = response.headers.get("content-type") || "image/png";
  const arrayBuffer = await response.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, arrayBuffer, {
      contentType,
      upsert: true,
      cacheControl: "31536000", // 1 year CDN cache
    });

  if (uploadError) {
    return { error: `Upload failed for ${filename}: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);

  return { publicUrl: urlData.publicUrl };
}

/** Upload a single image from raw base64 bytes (sent from browser) */
export async function uploadAssetFromBytes(
  filename: string,
  base64data: string,
  mimeType: string = "image/png",
): Promise<{ publicUrl: string } | { error: string }> {
  const supabase = getSupabaseAdmin();

  // Decode base64 → Uint8Array
  let bytes: Uint8Array;
  try {
    const binary = atob(base64data);
    bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
  } catch (e) {
    return { error: `Base64 decode failed for ${filename}: ${String(e)}` };
  }

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, bytes, {
      contentType: mimeType,
      upsert: true,
      cacheControl: "31536000",
    });

  if (uploadError) {
    return { error: `Upload failed for ${filename}: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);

  return { publicUrl: urlData.publicUrl };
}

/** Get list of all already-uploaded assets */
export async function listUploadedAssets(): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  const allFiles: string[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list("", { limit, offset });
    if (error || !data) break;
    allFiles.push(...data.map((f) => f.name));
    if (data.length < limit) break;
    offset += limit;
  }
  return allFiles;
}

/** Build public URL for a given filename */
export function getPublicUrl(filename: string): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${filename}`;
}