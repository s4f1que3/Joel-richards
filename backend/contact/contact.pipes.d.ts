import { PipeTransform } from "@nestjs/common";
export declare class optionValidationPipe implements PipeTransform {
    transform(value: string): "email" | "instagram" | "linkedin" | "phone";
}
