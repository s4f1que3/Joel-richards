import { Controller } from "@nestjs/common";
import { Get, Post, Patch, Delete, Body, Param, UploadedFiles, UseInterceptors, UseGuards} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { articlesService } from "./articles.service";
import { createArticleDTO } from "./article.dto";
import { updateArticleDTO } from "./article.dto";
import { slugValidationPipe } from "./article.pipes";
import { AuthGuard } from "../auth/auth.guard";
import * as multer from "multer";

@Controller('articles')
export class articlesController {

    constructor(private readonly article: articlesService){}

    @Get()
    async findAll() {
        return this.article.findAll()
    }


    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'thumbnail', maxCount: 1},
        {name: 'images', maxCount: 5},
        {name: 'files', maxCount: 5}
    ]))
    async createArticle(@Body() dto: createArticleDTO, @UploadedFiles() UploadedFiles: {images?: Express.Multer.File[], files?: Express.Multer.File[], thumbnail?: Express.Multer.File[]}) {
        return this.article.createArticle(dto, UploadedFiles)
    }


    @Patch('update/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'thumbnail', maxCount: 1},
        {name: 'images', maxCount: 5},
        {name: 'files', maxCount: 5}
    ]))
    async updateArticle(
        @Body() dto: updateArticleDTO,
        @UploadedFiles() UploadedFiles: {images?: Express.Multer.File[], files?: Express.Multer.File[], thumbnail?: Express.Multer.File[]},
        @Param('id') id: string
    ) {
        return this.article.updateArticle(id, dto, UploadedFiles)
    }


    @Get('pinned')
    async getPinned () {
        return this.article.getPinned()
    }

    @Patch('pin/:id')
    @UseGuards(AuthGuard)
    async pinArticle (@Param('id') id: string) {
        return this.article.pinArticle(id)
    }

    @Patch('unpin/:id')
    @UseGuards(AuthGuard)
    async unpinArticle (@Param('id') id: string) {
        return this.article.unpinArticle(id)
    }


    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    async deleteArticle(@Param('id') id: string) {
        return this.article.deleteArticle(id)
    }

    @Get('by-id/:id')
    async findById (@Param('id') id: string) {
        return this.article.findById(id)
    }

    @Get(':slug')
    async findBySlug (@Param('slug', slugValidationPipe) slug: string) {
        return this.article.findBySlug(slug)
    }


}