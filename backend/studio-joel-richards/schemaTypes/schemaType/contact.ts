import { defineType, defineField } from "sanity";

export const contactType = defineType({
    name: 'contact',
    title: 'Contact',
    type: 'document',
    preview: {
        select: {},
        prepare: () => ({ title: 'Contact' })
    },
    fields: [
        defineField({
            name: 'phone',
            title: "Phone Number",
            type: 'string'
        }),

        defineField({
            name: 'email',
            title: 'Email',
            type: 'string'
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram',
            type: 'string'
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn',
            type: 'string'
        })
    ]
})