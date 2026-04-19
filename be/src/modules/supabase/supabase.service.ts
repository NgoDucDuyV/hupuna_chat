import { ObjectLiteral } from 'typeorm'; // To avoid TS issues
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') || '';
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY') || '';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Tiện ích upload file lên Supabase Storage (dành cho Avatar/Media của Zalo Chat)
  async uploadFile(bucket: string, path: string, file: Buffer, mimeType: string) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType: mimeType,
      });

    if (error) {
      throw new Error(error.message);
    }
    
    // Trả về public url 
    const { data: publicUrlData } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrlData.publicUrl;
  }
}
