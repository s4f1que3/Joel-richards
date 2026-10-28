import 'dotenv/config';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GeneralLimiter } from '../rate-limit/general.limiter';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../articles/article.module';
import { bioModule } from '../bio/bio.module';
import { ResumeModule } from 'resume/resume.module';
import { contactModule } from 'contact/contact.module';
import { SupabaseModule } from '../supabase/supabase.module';


// vercel cron jobs deployment for when you buy pro

@Module({
  imports: [
    AuthModule,
    ArticleModule,
    bioModule,
    ResumeModule,
    contactModule,
    SupabaseModule
  ],

  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GeneralLimiter,
    },
  ],
})
export class AppModule {}