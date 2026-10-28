import { createBioDTO } from "./create.bio.dto";
import { UpdateBioDTO } from "./createnewbio.dto";
export declare class bioService {
    createBio(dto: createBioDTO): Promise<void>;
    getBio(): Promise<any>;
    updateBio(newdto: UpdateBioDTO): Promise<void>;
    deleteBio(): Promise<void>;
}
