import { Global, Module } from '@nestjs/common';
import { supabaseService } from './supabase.service';

@Global()
@Module({
  providers: [supabaseService],
  exports: [supabaseService],
})
export class SupabaseModule {}