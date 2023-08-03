const baseUrl = import.meta.env.VITE_STRAPI_URL

export const constants = {
    api: {
        strapi: {
            players: baseUrl + '/api/players',
            games: baseUrl + '/api/games',
            contentTypes: baseUrl + '/api/content-type-builder/content-types',
            baseUrl: baseUrl,
        },
    }
}
