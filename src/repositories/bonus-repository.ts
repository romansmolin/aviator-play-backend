export const findAllBonuses = async () => {
    return await strapi.services['api::bonus.bonus'].find({
        populate: ['casinos', 'logo', 'bonusInfo', 'casinos.logo'],
    });
};

export const findAllBonusesByLocale = async (locale: string) => {
    return await strapi.service('api::bonus.bonus').find({
        locale,
        populate: ['casinos', 'logo', 'bonusInfo', 'casinos.logo'],
    });
};

export const findBonusesByTypeAndLocale = async (locale: string) => {
    return await strapi.service('api::bonus.bonus').find({
        populate: ['casinos', 'logo', 'bonusInfo', 'casinos.logo', 'faq.fact1'],
        locale,
    });
};

export const findBonusByUuid = async (uuid: string, locale: string) => {
    return await strapi.service('api::bonus.bonus').find({
        locale,
        filters: { uuid },
        populate: ['casinos', 'logo', 'bonusInfo', 'casinos.logo', 'faq.fact1', 'localizations'],
    });
};

export const findBonusBySlug = async (slug: string, locale: string) => {
    return await strapi.service('api::bonus.bonus').find({
        locale,
        filters: { slug },
        populate: ['casinos', 'logo', 'bonusInfo', 'casinos.logo', 'faq.fact1', 'seo'],
    });
};

export const findBonusSeoDataBySlug = async (locale: string, slug: string) => {
    return await strapi.service('api::bonus.bonus').find({
        locale,
        filters: { slug },
        populate: ['seo'],
    });
};
