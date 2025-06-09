const bonusMapper = bonus => ({
    casinoName: bonus.casinoName,
    casinoUuid: bonus.casinos[0]?.uuid,
    casinoLogo: bonus.logo[0]?.url,
    bonusSubtitle: bonus.bonusSubtitle,
    bonusTitle: bonus.bonusTitle,
    info: {
        releaseDate: bonus.bonusInfo?.releaseDate,
        availableFor: bonus.bonusInfo?.availableFor,
        bonusType: bonus.bonusInfo?.bonusType,
        bonusStatus: bonus.bonusInfo?.bonusStatus[0],
    },
    uuid: bonus?.uuid,
    primaryBonusType: bonus?.primaryBonusType,
});

const bonusMapperWithExtras = bonus => ({
    ...bonusMapper(bonus),
    faqInfo: bonus.faq?.fact1,
    bonusReview: bonus?.bonusOverview,
});

export { bonusMapper, bonusMapperWithExtras };
