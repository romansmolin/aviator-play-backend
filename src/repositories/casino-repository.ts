//'Bonus'

export const findCasinoByUuid = async (uuid: string, locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: ['logo', 'faq.fact1', 'mainBonus', 'mainBonus.bonus', 'affiliateLink'],
        filters: { uuid },
        locale,
    });
};

export const findCasinoBySlug = async (slug: string, locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: ['logo', 'faq.fact1', 'mainBonus', 'mainBonus.bonus', 'affiliateLink'],
        filters: { slug },
        locale,
    });
};

// "Promos",
// "Promos.Promo",
// "Promos.Promo.bonus_img",

export const findCasinosByLocale = async (locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: ['logo', 'faq.fact1', 'mainBonus', 'localizations', 'affiliateLink'],
        locale,
    });
};

export const findCasinosBySlug = async (locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: ['logo', 'faq.fact1', 'mainBonus', 'localizations', 'affiliateLink'],
        locale,
    });
};

export const findAllCasinosByLocale = async (locale: string) => {
    return await strapi.service('api::casino.casino').find({
        locale,
        populate: [
            'logo',
            'Promos',
            'Promos.Promo',
            'Promos.Promo.bonus_img',
            'faq.fact1',
            'mainBonus',
            'localizations',
            'affiliateLink',
        ],
    });
};

export const findCasinoSeoDataBySlug = async (locale: string, slug: string) => {
    return await strapi.service('api::casino.casino').find({
        locale,
        populate: ['seo'],
    });
};

export const findCasinoCategoryBySlug = async (slug: string, locale?: string) => {
    const query: any = {
        filters: { slug },
        populate: ['casinoCategoryType', 'seo'],
    };

    if (locale) {
        query.locale = locale;
    }

    return await strapi.service('api::casinos-category.casinos-category').find(query);
};
