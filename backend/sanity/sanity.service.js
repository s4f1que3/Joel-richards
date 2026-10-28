"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanityServiceWithoutPublished = exports.sanityService = void 0;
require("dotenv/config");
const client_1 = require("@sanity/client");
exports.sanityService = (0, client_1.createClient)({
    projectId: 'e1j7g6w9',
    dataset: 'production',
    useCdn: false,
    perspective: 'published',
    token: process.env.EDITOR_TOKEN,
    apiVersion: '2026-03-01'
});
exports.sanityServiceWithoutPublished = (0, client_1.createClient)({
    projectId: 'e1j7g6w9',
    dataset: 'production',
    useCdn: false,
    token: process.env.EDITOR_TOKEN,
    apiVersion: '2026-03-01'
});
//# sourceMappingURL=sanity.service.js.map