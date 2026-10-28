import { Module } from "@nestjs/common";
import { uploadArticleService } from "./uploadArticle.service";
import { uploadedArticleController } from "./uploadedArticle.controller";

@Module({
    controllers: [uploadedArticleController],
    providers: [uploadArticleService],
    exports: [uploadArticleService]
})

export class uploadArticleModule{}