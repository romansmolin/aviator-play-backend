const casinoMapper = (casino) => {
  const result = {
    id: casino.id,
    name: casino.name,
    bonus_title: casino.bonus_title,
    logoUrl: casino.logo[0].url,
    features: casino.features,
    rating: casino.rating,
    review: casino.review,
    faq: casino.faq?.fact1,
    mainBonus: casino.mainBonus,
    casinoType: casino.casinoType,
    uuid: casino.uuid,
  };

  return result;
};

export { casinoMapper };
