import { Transform } from "class-transformer";
import { IsString, MaxLength} from "class-validator";

const sanitize = ({ value }: { value: unknown }) => typeof value === 'string' ? value.replace(/<\/?[^>]+(>|$)/g, "") : value;

export class createBioDTO {

    @IsString()
    @Transform(sanitize)
    @MaxLength(3000)
    content!: string
}