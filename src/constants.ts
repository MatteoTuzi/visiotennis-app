const baseUrl = process.env.VITE_STRAPI_URL

export const constants = {
    api: {
        strapi: {
            players: baseUrl + '/api/players',
            contentTypes: baseUrl + '/api/content-type-builder/content-types',
            baseUrl: baseUrl,
        },
    }
}
