import { defineType, defineField } from "sanity";

export const bioType = defineType({
    name: 'bio',
    title: 'Biography',
    type: 'document',preview: {
        select: {},
        prepare: () => ({ title: 'Biography' })
    },
    fields: [
        defineField({
            name: 'content',
            title: 'Content',
            type: 'string',
            validation: (Rule) => Rule.required()
        })
    ]
})