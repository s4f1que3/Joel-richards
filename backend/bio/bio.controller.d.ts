import { bioService } from "./bio.service";
import { createBioDTO } from "./create.bio.dto";
import { UpdateBioDTO } from "./createnewbio.dto";
export declare class bioController {
    private readonly bio;
    constructor(bio: bioService);
    findAll(): Promise<any>;
    createBio(createBioDTO: createBioDTO): Promise<void>;
    updateBio(UpdateBioDTO: UpdateBioDTO, id: string): Promise<void>;
    deleteBio(id: string): Promise<void>;
}
