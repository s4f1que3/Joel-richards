import { Module } from "@nestjs/common";
import { bioService } from "./bio.service";
import { bioController } from "./bio.controller";

@Module({
    controllers: [bioController],
    providers: [bioService],
    exports: [bioService]
})

export class bioModule {}