import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { articlesService } from "./articles.service";

@Injectable()
export class slugValidationPipe implements PipeTransform{
    constructor(private readonly article: articlesService){}
    
    async transform(value: any) {
        const article = await this.article.findBySlug(value)

        if(!article) {
            throw new BadRequestException ("Article not found")
        }

        return value
    }
}