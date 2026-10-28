import { Controller, Get, Post, Patch, Delete, Body, UseGuards } from "@nestjs/common";
import { bioService } from "./bio.service";
import { createBioDTO } from "./create.bio.dto";
import { UpdateBioDTO } from "./createnewbio.dto";
import { AuthGuard } from "auth/auth.guard";


@Controller('bio')
export class bioController {
    constructor(private readonly bio: bioService){}

    @Get()
    async findAll(): Promise<any> {
        return this.bio.getBio()
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async createBio(@Body() createBioDTO: createBioDTO) {
        return this.bio.createBio(createBioDTO)
    }

    @Patch('update/:id')
    @UseGuards(AuthGuard)
    async updateBio(@Body() UpdateBioDTO: UpdateBioDTO, id: string) {
        return this.bio.updateBio(UpdateBioDTO)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    async deleteBio(id: string) {
        return this.bio.deleteBio()
    }

}