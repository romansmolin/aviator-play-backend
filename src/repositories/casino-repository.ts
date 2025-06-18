//'Bonus'

export const findCasinoByUuid = async (uuid: string, locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: [
            'logo',
            'faq.fact1',
            'mainBonus',
            'mainBonus.bonus',
            'affiliateLink',
            'gameProviders',
            'gameProviders.logo',
            'paymentProviders',
            'paymentProviders.logo',
        ],
        filters: { uuid },
        locale,
    });
};

export const findCasinoBySlug = async (slug: string, locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: [
            'logo',
            'faq.fact1',
            'mainBonus',
            'mainBonus.bonus',
            'affiliateLink',
            'gameProviders',
            'gameProviders.logo',
            'paymentProviders',
            'paymentProviders.logo',
        ],
        filters: { slug },
        locale,
    });
};

// "Promos",
// "Promos.Promo",
// "Promos.Promo.bonus_img",

export const findCasinosByLocale = async (locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: [
            'logo',
            'faq.fact1',
            'mainBonus',
            'localizations',
            'affiliateLink',
            'gameProviders',
            'gameProviders.logo',
            'paymentProviders',
            'paymentProviders.logo',
        ],
        locale,
    });
};

export const findCasinosBySlug = async (locale: string) => {
    return await strapi.service('api::casino.casino').find({
        populate: [
            'logo',
            'faq.fact1',
            'mainBonus',
            'localizations',
            'affiliateLink',
            'gameProviders',
            'gameProviders.logo',
            'paymentProviders',
            'paymentProviders.logo',
        ],
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
            'gameProviders',
            'gameProviders.logo',
            'paymentProviders',
            'paymentProviders.logo',
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

    // Now casinos-category has i18n enabled, so we can properly use locale
    if (locale) {
        query.locale = locale;
    }

    return await strapi.service('api::casinos-category.casinos-category').find(query);
};

export const findAllCasinosCategories = async (locale?: string) => {
    const query: any = {
        populate: ['coverImage'],
    };
    // Now casinos-category has i18n enabled, so we can properly use locale
    if (locale) query.locale = locale;
    return await strapi.service('api::casinos-category.casinos-category').find(query);
};
