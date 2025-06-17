export const findTopByCountryName = async (country: string, locale: string) => {
    return await strapi.service('api::top.top').find({
        locale: locale,
        populate: ['MainTop', 'MainTop.logo', 'MainTop.casino', 'MainTop.casino.logo'],
        filters: { country },
    });
};

export const findTopPageBySlug = async (slug: string, locale: string) => {
    return await strapi.service('api::casino-top-page.casino-top-page').find({
        locale,
        populate: ['seo', 'top', 'top.MainTop', 'top.MainTop.casino', 'top.MainTop.casino.logo'],
        filters: { slug },
    });
};

export const findAllTops = async (locale: string) => {
    console.log('locale: ', locale);
    return await strapi.service('api::casino-top-page.casino-top-page').find({
        locale,
    });
};
