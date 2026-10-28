import { defineType, defineField } from "sanity";


export const uploadedArticlesType = defineType({
    name: 'uploaded_article',
    title: 'Uploaded Articles',
    type: 'document',
    fields: [
        defineField({
            name: "title",
            title: 'title',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'file',
            title: 'file',
            type: 'file',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug'
        }),
        defineField({
            name: 'pinned',
            title: 'Pin',
            type: 'boolean'
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image'
        }),
        defineField({
            name: 'images',
            title: 'images',
            type: 'array',
            of : [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                }
            ],
            validation: (Rule) => Rule.max(5)

        }),

        defineField({
            name: 'files',
            title: 'files',
            type: 'array',
            of : [
                {
                    type: 'file',
                }
            ],
            validation: (Rule) => Rule.max(5)
        })

    ]
})