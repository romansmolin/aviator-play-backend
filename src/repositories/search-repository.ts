export const searchCasinosByName = async (query: string, locale: string) => {
    return await strapi.service('api::casino.casino').find({
        filters: { name: { $containsi: query } },
        locale,
    });
};

export const searchBonusesByCasinoName = async (query: string, locale: string) => {
    return await strapi.service('api::bonus.bonus').find({
        locale,
        filters: { casinoName: { $containsi: query } },
    });
};
