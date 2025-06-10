export default (strapi: any) => ({
    Query: {
        getTopByCountryName: {
            resolve: async (parent: any, args: any) => {
                try {
                    // Validate required arguments
                    if (!args.country) {
                        throw new Error('Country parameter is required');
                    }

                    if (!args.locale) {
                        throw new Error('Locale parameter is required');
                    }

                    const res = await strapi.service('api::top.top').find({
                        locale: args.locale,
                        populate: ['MainTop', 'MainTop.logo', 'MainTop.casino'],
                    });

                    // Check if results exist
                    if (!res || !res.results || !Array.isArray(res.results)) throw new Error('No top data found');

                    const targetTop = res.results.filter((top: any) => top?.country === args.country);

                    // Check if country-specific top exists
                    if (!targetTop || targetTop.length === 0) {
                        return {
                            country: args.country,
                            id: null,
                            topList: null,
                        };
                    }

                    const topData = targetTop[0];

                    // Check if MainTop exists and is an array
                    if (!topData.MainTop || !Array.isArray(topData.MainTop)) {
                        return {
                            country: topData.country || args.country,
                            id: topData.id || null,
                            topList: [],
                        };
                    }

                    const newMainTop = topData.MainTop.map((casino: any) => {
                        // Safe access to nested properties
                        const casinoUuid = casino?.casino?.uuid || null;
                        const logoUrl =
                            casino?.logo && Array.isArray(casino.logo) && casino.logo.length > 0
                                ? casino.logo[0].url
                                : null;

                        return {
                            ...casino,
                            casino: casinoUuid,
                            logo: logoUrl,
                        };
                    }).filter(casino => casino.casino !== null); // Filter out casinos without valid UUID

                    return {
                        country: topData.country || args.country,
                        id: topData.id || null,
                        topList: newMainTop,
                    };
                } catch (error) {
                    // Log the error for debugging
                    console.error('Error in getTopByCountryName resolver:', error);

                    // Re-throw with a user-friendly message
                    throw new Error(`Failed to fetch top data: ${error.message}`);
                }
            },
        },
    },
});
