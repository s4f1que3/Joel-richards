import { Module } from "@nestjs/common";
import { resumeController } from "./resume.controller";
import { resumeService } from "./resume.service";

@Module({
    controllers: [resumeController],
    providers: [resumeService]
})
export class ResumeModule {}
