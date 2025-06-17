import { findAllTops, findTopByCountryName, findTopPageBySlug } from '../repositories/top-repository';

const getTopByCountryName = async (country: string, locale: string) => {
    if (!country) throw new Error('Country parameter is required');
    if (!locale) throw new Error('Locale parameter is required');

    try {
        const top = await findTopByCountryName(country, locale);

        if (!top || top.results.length === 0) return null;

        if (!top.results[0].MainTop || !Array.isArray(top.results[0].MainTop)) {
            return {
                country: top.results[0].country || country,
                id: top.results[0].id || null,
                topList: [],
            };
        }

        const newMainTop = top.results[0].MainTop.map((casino: any) => {
            return {
                ...casino,
                slug: casino?.casino?.slug,
                logo: casino?.casino?.logo[0]?.url,
                rating: casino?.casino?.rating,
                title: casino?.casino?.name,
                mainBonusTitle: casino?.casino?.bonus_title,
            };
        }).filter(casino => casino.casino !== null); // Filter out casinos without valid UUID

        return {
            country: top.results[0].country || country,
            id: top.results[0].id || null,
            topList: newMainTop,
        };
    } catch (error) {
        console.error('Error fetching top by country name:', error);
        throw new Error(`Failed to fetch top list: ${error.message}`);
    }
};

const getTopPageBySlug = async (slug: string, locale: string) => {
    try {
        if (!slug) throw new Error('Slug is required');
        if (!locale) throw new Error('Locale is required');

        const topPage = await findTopPageBySlug(slug, locale);

        if (!topPage || topPage.results.length === 0) {
            throw new Error('No top page found for the given slug');
        }

        const pageData = topPage.results[0];

        // Process the top data if it exists
        let processedTop = null;
        if (pageData.top) {
            if (!pageData.top.MainTop || !Array.isArray(pageData.top.MainTop)) {
                processedTop = {
                    country: pageData.top.country || null,
                    id: pageData.top.id || null,
                    topList: [],
                };
            } else {
                const newMainTop = pageData.top.MainTop.map((casino: any) => {
                    return {
                        ...casino,
                        slug: casino?.casino?.slug,
                        logo: casino?.casino?.logo[0]?.url,
                        rating: casino?.casino?.rating,
                        title: casino?.casino?.name,
                        mainBonusTitle: casino?.casino?.bonus_title,
                    };
                }).filter(casino => casino.casino !== null);

                processedTop = {
                    country: pageData.top.country || null,
                    id: pageData.top.id || null,
                    topList: newMainTop,
                };
            }
        }

        return {
            id: pageData.id,
            pageTitle: pageData.pageTitle,
            slug: pageData.slug,
            top: processedTop,
        };
    } catch (error) {
        console.error('Error in getTopPageBySlug: ', error);
        throw new Error(`Failed to fetch top page: ${error.message}`);
    }
};

const getAllTops = async (locale: string) => {
    try {
        if (!locale) throw Error('Locale is required for getAllTops method');

        const tops = await findAllTops(locale);
        console.log('TOPS: ', tops);
        if (!tops || tops.results.length === 0) throw Error('No top is found');

        const preparedData = tops.results.map(top => ({
            slug: top.slug,
        }));

        return preparedData;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export { getTopByCountryName, getTopPageBySlug, getAllTops };
