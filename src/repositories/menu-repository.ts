export const findMenu = async (locale?: string) => {
    const query: any = {
        populate: ['section', 'section.menuLink', 'section.menuLink.bonusCategory', 'section.menuLink.casinosCategory'],
    };

    // menu doesn't have i18n enabled, so we don't use locale
    // if (locale) {
    //     query.locale = locale;
    // }

    return await strapi.service('api::menu.menu').find(query);
};
