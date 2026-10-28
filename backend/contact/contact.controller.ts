import { Controller } from "@nestjs/common";
import { Get, Post, Patch, Delete, Body, Query, UseGuards } from "@nestjs/common";
import { contactService } from "./contact.service";
import { createContactDTO, createNewContactDTO } from "./contact.dto";
import { optionValidationPipe } from "./contact.pipes";
import { AuthGuard } from "auth/auth.guard";

@Controller('contact')
export class contactController {
    constructor(private readonly contact: contactService){}

    @Get()
    async findAll() {
        return this.contact.getContact()
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async createContact (@Body() dto: createContactDTO) {
        return this.contact.createContact(dto)
    }

    @Patch()
    @UseGuards(AuthGuard)
    async updateContact (@Body() dto: createNewContactDTO) {
        return this.contact.updateContact(dto)
    }

    @Delete('fields')
    @UseGuards(AuthGuard)
    async deleteContactFields (@Query('option', optionValidationPipe) option: string) {
        return this.contact.deleteContactField(option)
    }

    @Delete()
    @UseGuards(AuthGuard)
    async deleteContact () {
        return this.contact.deleteContact()
    }

}