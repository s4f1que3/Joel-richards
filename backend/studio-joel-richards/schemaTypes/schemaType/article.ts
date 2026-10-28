import { defineType, defineField } from "sanity";

export const articleType = defineType({
    name: 'article',
    title: 'article',
    type: 'document',
    fields: [
        defineField({
            name: 'Title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'pinned',
            title: 'Pin',
            type: 'boolean'
        }),
        defineField({
            name:'thumbnail',
            title: 'Thumbnail',
            type: 'image'
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'Title',
                maxLength: 96
            }
        }),
        defineField({
            name: 'images',
            title: 'images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        },
                        {
                            name: 'alt',
                            title: 'Alt',
                            type: 'string',
                        }
                    ],
                }
            ],
            validation: (Rule) => Rule.max(5)
        }),
        defineField({
            name: 'Files',
            title: 'Files',
            type: 'array',
            of: [
                {
                    type: 'file',
                    options: {
                        hotspot: true
                    },
                }
            ]
        })
    ]
})