/**
 * Higher-Order Component function to add affiliate links to casino data
 */

interface Casino {
    id: string | number;
    affiliateLink?: {
        slug: string;
    };
    [key: string]: any;
}

interface CasinoWithAffiliateLink extends Omit<Casino, 'affiliateLink'> {
    affiliateLink: string | null;
}

/**
 * Adds affiliate link to a single casino object
 */
export const addAffiliateLink = (casino: Casino, fullDomain: string): CasinoWithAffiliateLink => {
    if (!casino.affiliateLink?.slug) {
        console.warn(`⚠️ Casino ${casino.id} missing affiliate link slug`);
        return {
            ...casino,
            affiliateLink: null,
        };
    }

    return {
        ...casino,
        affiliateLink: `${fullDomain}/go/${casino.affiliateLink.slug}`,
    };
};

/**
 * Adds affiliate links to an array of casino objects
 */
export const addAffiliateLinks = (casinos: Casino[], fullDomain: string): CasinoWithAffiliateLink[] => {
    return casinos.map(casino => addAffiliateLink(casino, fullDomain));
};

/**
 * HOC function that wraps casino service responses with affiliate links
 */
export const withAffiliateLinks = (serviceResponse: any, fullDomain: string): any => {
    // Handle single casino response
    if ('id' in serviceResponse && !('casinos' in serviceResponse)) {
        return addAffiliateLink(serviceResponse as Casino, fullDomain);
    }

    // Handle response with casinos array
    if ('casinos' in serviceResponse && Array.isArray(serviceResponse.casinos)) {
        return {
            ...serviceResponse,
            casinos: addAffiliateLinks(serviceResponse.casinos, fullDomain),
        };
    }

    console.warn('⚠️ Unknown casino response format for affiliate link processing');
    return serviceResponse;
};
