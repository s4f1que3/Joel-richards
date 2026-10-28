import { Controller, Body, Post, Delete, Get, Query, UseGuards, UseInterceptors, Param, UploadedFiles, Patch} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "auth/auth.guard";
import { uploadArticleDTO, uploadNewArticleDTO } from "./uploadArticle.dto";
import { uploadArticleService } from "./uploadArticle.service";

@Controller('upload-article')
export class uploadedArticleController{
    constructor(
        private readonly article: uploadArticleService,
    ){}

    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'article', maxCount: 1},
        {name: 'thumbnail', maxCount: 1},
        {name: 'images', maxCount: 5},
        {name: 'files', maxCount: 5}
    ]))
    async createArticle(@Body() dto: uploadArticleDTO, @UploadedFiles() UploadedFiles: {images?: Express.Multer.File[], files?: Express.Multer.File[], article: Express.Multer.File[], thumbnail?: Express.Multer.File[]}) {
        return this.article.createArticle(dto, UploadedFiles)
    }

    @Patch('update/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'article', maxCount: 1},
        {name: 'thumbnail', maxCount: 1},
        {name: 'images', maxCount: 5},
        {name: 'files', maxCount: 5}
    ]))
    async updateArticle(
        @Body() dto: uploadNewArticleDTO,
        @UploadedFiles() UploadedFiles: {images?: Express.Multer.File[], files?: Express.Multer.File[], article: Express.Multer.File[], thumbnail?: Express.Multer.File[]},
        @Param('id') id: string
    ) {
        return this.article.updateArticle(id, dto, UploadedFiles, )
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAll() {
        return this.article.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(@Param('id') id: string) {
        return this.article.findById(id);
    }

    @Patch('pin/:id')
    @UseGuards(AuthGuard)
    async pin(@Param('id') id: string) {
        return this.article.pin(id);
    }

    @Patch('unpin/:id')
    @UseGuards(AuthGuard)
    async unpin(@Param('id') id: string) {
        return this.article.unpin(id);
    }

    @Delete()
    @UseGuards(AuthGuard)
    async deleteArticle(@Query('id') id: string) {
        return this.article.deleteArticle(id)
    }
}