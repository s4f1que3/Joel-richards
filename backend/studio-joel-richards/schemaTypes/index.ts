import { articleType } from "./schemaType/article"
import { fileType } from "./schemaType/resume"
import { uploadedArticlesType } from "./schemaType/uploaded_articles"
import { contactType } from "./schemaType/contact"
import { bioType } from "./schemaType/bio"


export const schemaTypes = [
    articleType, 
    fileType, 
    uploadedArticlesType,
    bioType,
    contactType
]
