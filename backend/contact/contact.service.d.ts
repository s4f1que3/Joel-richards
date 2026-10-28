import { createContactDTO, createNewContactDTO } from "./contact.dto";
export declare class contactService {
    createContact(dto: createContactDTO): Promise<void>;
    getContact(): Promise<any>;
    updateContact(dto: createNewContactDTO): Promise<void>;
    deleteContactField(option: string): Promise<void>;
    deleteContact(): Promise<void>;
}
