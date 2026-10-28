import { defineType, defineField } from "sanity";

export const fileType = defineType({
    name: 'resume',
    title: 'Resume',
    type: 'document',
    preview: {
        select: {},
        prepare: () => ({ title: 'Resume' })
    },
    fields: [
        defineField({
            name: 'file',
            title: 'file',
            type: 'file',
            validation: (Rule) => Rule.required()
        })
    ]
})