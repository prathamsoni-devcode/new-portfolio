// Upload Pratham's resume to Supabase Storage and create database record
// Run with: node scripts/upload-resume.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadResume() {
  try {
    // Read the resume PDF from the read-only context
    const resumePath = path.join(__dirname, '../user_read_only_context/text_attachments/PrathamSoni_Resume-wqiEN.pdf');
    
    console.log('[v0] Reading resume from:', resumePath);
    
    if (!fs.existsSync(resumePath)) {
      console.error('Resume file not found at:', resumePath);
      console.log('Expected location: user_read_only_context/text_attachments/PrathamSoni_Resume-wqiEN.pdf');
      process.exit(1);
    }

    const fileBuffer = fs.readFileSync(resumePath);
    const fileName = 'PrathamSoni_Resume.pdf';
    const storagePath = `resumes/${Date.now()}-${fileName}`;
    const fileSize = Math.ceil(fileBuffer.length / 1024); // Convert to KB

    console.log(`[v0] Uploading ${fileName} (${fileSize}KB) to Supabase Storage...`);

    // Create bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const resumeBucketExists = buckets?.some(b => b.name === 'resumes');
    
    if (!resumeBucketExists) {
      console.log('[v0] Creating resumes bucket...');
      await supabase.storage.createBucket('resumes', { public: true });
    }

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('[v0] Upload failed:', uploadError);
      process.exit(1);
    }

    console.log('[v0] Resume uploaded successfully:', uploadData.path);

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(storagePath);

    console.log('[v0] Public URL:', publicUrl);

    // Insert resume record into database
    const { data: insertData, error: insertError } = await supabase
      .from('resumes')
      .insert([
        {
          file_name: fileName,
          storage_path: storagePath,
          storage_url: publicUrl,
          file_size_kb: fileSize,
          is_active: true,
          version: 1,
        },
      ])
      .select();

    if (insertError) {
      console.error('[v0] Database insert failed:', insertError);
      process.exit(1);
    }

    console.log('[v0] Resume record created in database:', insertData[0].id);
    console.log('\n✓ Resume successfully uploaded and recorded!');
    console.log('Resume Details:');
    console.log(`  - File: ${fileName}`);
    console.log(`  - Size: ${fileSize}KB`);
    console.log(`  - Storage Path: ${storagePath}`);
    console.log(`  - Public URL: ${publicUrl}`);
    console.log(`  - Database ID: ${insertData[0].id}`);

    process.exit(0);
  } catch (error) {
    console.error('[v0] Error:', error);
    process.exit(1);
  }
}

uploadResume();
