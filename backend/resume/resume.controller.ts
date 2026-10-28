import { Controller, Get, Post, Delete, UploadedFile, UseInterceptors, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { resumeService } from "./resume.service";
import { AuthGuard } from "auth/auth.guard";

@Controller('resume')
export class resumeController {

    constructor(private readonly resume: resumeService) {}

    @Get()
    async getResume () {
        return this.resume.getResume()
    }

    @Post('upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadResume (@UploadedFile() file: Express.Multer.File) {
        return this.resume.uploadResume(file)
    }

    @Delete()
    @UseGuards(AuthGuard)
    async deleteResume () {
        return this.resume.deleteResume()
    }
}
