import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class optionValidationPipe implements PipeTransform{
    transform(value: string) {
        if(value === "instagram" || value === "linkedin" || value === "phone" || value === "email") {
            return value
        } else {
            throw new BadRequestException ("Not an option in the contact fields")
        }
    }
}