import 'dotenv/config';
import { createClient } from "@sanity/client";

export const sanityService = createClient({
    projectId: 'e1j7g6w9',
    dataset: 'production',
    useCdn: false,
    perspective: 'published',
    token: process.env.EDITOR_TOKEN,
    apiVersion: '2026-03-01'
})

export const sanityServiceWithoutPublished = createClient({
    projectId: 'e1j7g6w9',
    dataset: 'production',
    useCdn: false,
    token: process.env.EDITOR_TOKEN,
    apiVersion: '2026-03-01'
})