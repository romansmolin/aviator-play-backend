const casinoMapper = casino => {
    const gameProviders =
        casino.gameProviders?.map(provider => ({
            providerLogo: provider.logo?.url || '',
            name: provider.name,
        })) || [];

    const paymentProviders =
        casino.paymentProviders?.map(paymentProvider => ({
            paymentLogo: paymentProvider.logo?.url || '',
            name: paymentProvider.name,
        })) || [];

    const result = {
        id: casino.id,
        name: casino.name,
        bonusTitle: casino.bonus_title,
        logoUrl: casino.logo[0].url,
        features: casino.features,
        rating: casino.rating,
        review: casino.review,
        faq: casino.faq?.fact1,
        mainBonus: casino.mainBonus,
        casinoType: casino.casinoType,
        uuid: casino.uuid,
        slug: casino.slug,
        affiliateLink: casino.affiliateLink,
        gameProviders,
        paymentProviders,
    };

    return result;
};

export { casinoMapper };
