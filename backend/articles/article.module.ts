import { Module } from "@nestjs/common";
import { articlesController } from "./articles.controller";
import { articlesService } from "./articles.service";

@Module({
    controllers: [articlesController],
    providers: [articlesService],
    exports: [articlesService]
})

export class ArticleModule{}