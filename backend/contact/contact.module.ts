import { Module } from "@nestjs/common";
import { contactService } from "./contact.service";
import { contactController } from "./contact.controller";

@Module({
    controllers: [contactController],
    providers: [contactService],
    exports: [contactService]
})

export class contactModule {}