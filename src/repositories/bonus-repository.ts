export const findAllBonuses = async () => {
  return await strapi.services["api::bonus.bonus"].find({
    populate: ["casinos", "logo", "bonus_info", "casinos.logo"],
  });
};

export const findAllBonusesByLocale = async (locale: string) => {
  return await strapi.service("api::bonus.bonus").find({
    locale,
    populate: ["casinos", "logo", "bonus_info", "casinos.logo"],
  });
};

export const findBonusesByTypeAndLocale = async (locale: string) => {
  return await strapi.service("api::bonus.bonus").find({
    populate: ["casinos", "logo", "bonus_info", "casinos.logo", "faq.fact1"],
    locale,
  });
};

export const findBonusByUuid = async (uuid: string, locale: string) => {
  return await strapi.service("api::bonus.bonus").find({
    locale,
    filters: { uuid },
    populate: [
      "casinos",
      "logo",
      "bonus_info",
      "casinos.logo",
      "faq.fact1",
      "bonusOverview",
      "localizations",
    ],
  });
};
