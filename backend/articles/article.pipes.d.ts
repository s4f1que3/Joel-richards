import { PipeTransform } from "@nestjs/common";
import { articlesService } from "./articles.service";
export declare class slugValidationPipe implements PipeTransform {
    private readonly article;
    constructor(article: articlesService);
    transform(value: any): Promise<any>;
}
