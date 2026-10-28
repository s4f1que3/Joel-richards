import { contactService } from "./contact.service";
import { createContactDTO, createNewContactDTO } from "./contact.dto";
export declare class contactController {
    private readonly contact;
    constructor(contact: contactService);
    findAll(): Promise<any>;
    createContact(dto: createContactDTO): Promise<void>;
    updateContact(dto: createNewContactDTO): Promise<void>;
    deleteContactFields(option: string): Promise<void>;
    deleteContact(): Promise<void>;
}
