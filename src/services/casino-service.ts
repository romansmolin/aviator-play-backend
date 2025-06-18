import { casinoMapper } from '../mappers/casino-mappers';
import { paginate } from './paginate';
import { withAffiliateLinks } from '../utils/add-affiliate-links';
import {
    findCasinoByUuid,
    findCasinosByLocale,
    findAllCasinosByLocale,
    findCasinoBySlug,
    findCasinoSeoDataBySlug,
    findCasinoCategoryBySlug,
    findAllCasinosCategories,
} from '../repositories/casino-repository';

const getCasinoByUUID = async (uuid: string, locale: string, fullDomain?: string) => {
    try {
        const data = await findCasinoByUuid(uuid, locale);
        if (!data || data.results.length === 0) throw new Error('Casino not found');

        const casino = {
            id: data.results[0].id,
            name: data.results[0].name,
            bonusTitle: data.results[0].bonus_title,
            logoUrl: data.results[0].logo[0].url,
            features: data.results[0].features,
            rating: data.results[0].rating,
            review: data.results[0].review,
            faq: data.results[0].faq?.fact1,
            mainBonus: data.results[0].mainBonus,
            casinoType: data.results[0].casinoType,
            uuid: data.results[0].uuid,
            allowedCountries: data.results[0].allowedCountries || [],
            allowedCurrencies: data.results[0].allowedCurrencies || [],
            slug: data.results[0].slug,
            affiliateLink: data.results[0].affiliateLink,
        };

        // Add affiliate link if domain is provided
        return fullDomain ? withAffiliateLinks(casino, fullDomain) : casino;
    } catch (error) {
        console.error('Error fetching casino data:', error);
        throw new Error('Failed to fetch casino data');
    }
};

const getCasinosByType = async (args: any, fullDomain?: string) => {
    try {
        const casinos = await findCasinosByLocale(args.locale);
        const { page, number, casinoType } = args;

        const filteredCasinos = casinos.results.filter((casino: any) =>
            casino.casinoType.some((type: string) => type === casinoType.trim())
        );

        console.log('filteredCasinos: ', filteredCasinos);

        if (!casinos) {
            return {
                casinos: [],
                error: 'Nothing found!',
            };
        }

        const mappedCasinos = filteredCasinos.map((casino: any) => casinoMapper(casino));

        const { items: casinoItems, totalPages } = paginate(mappedCasinos, page, number);

        const response = {
            casinos: casinoItems || [],
            totalPages,
        };

        console.log('casinos: ', casinoItems);

        return fullDomain ? withAffiliateLinks(response, fullDomain) : response;
    } catch (error) {
        console.error('Error fetching casino data:', error);
        return {
            casinos: [],
            error,
        };
    }
};

const getAllCasinosWithoutPagination = async (args: any, fullDomain?: string) => {
    try {
        const { locale } = args;

        const casinos = await findAllCasinosByLocale(locale);

        const mappedCasinos = casinos.results.map((casino: any) => casinoMapper(casino));

        const response = {
            casinos: mappedCasinos,
        };

        // Add affiliate links if domain is provided
        return fullDomain ? withAffiliateLinks(response, fullDomain) : response;
    } catch (error) {
        return {
            casinos: [],
        };
    }
};

const getCasinosBySlug = async (slug: string, locale: string, fullDomain?: string) => {
    try {
        const data = await findCasinoBySlug(slug, locale);

        if (!data || data.results.length === 0) throw new Error('Casino not found');

        const casinoEntity = data.results[0];

        const gameProviders = casinoEntity.gameProviders.map(provider => ({
            providerLogo: provider.logo.url || '',
            name: provider.name,
        }));

        const paymentProviders = casinoEntity.paymentProviders.map(paymentProvider => ({
            paymentLogo: paymentProvider.logo.url || '',
            name: paymentProvider.name,
        }));

        const casino = {
            id: data.results[0].id,
            name: data.results[0].name,
            bonusTitle: data.results[0].bonus_title,
            logoUrl: data.results[0].logo[0].url,
            features: data.results[0].features,
            rating: data.results[0].rating,
            review: data.results[0].review,
            faq: data.results[0].faq?.fact1,
            mainBonus: data.results[0].mainBonus,
            casinoType: data.results[0].casinoType,
            uuid: data.results[0].uuid,
            allowedCountries: data.results[0].allowedCountries || [],
            allowedCurrencies: data.results[0].allowedCurrencies || [],
            slug: data.results[0].slug,
            affiliateLink: data.results[0].affiliateLink,
            gameProviders,
            paymentProviders,
        };

        // Add affiliate link if domain is provided
        return fullDomain ? withAffiliateLinks(casino, fullDomain) : casino;
    } catch (error) {
        console.error('Error fetching casino data:', error);
        throw new Error('Failed to fetch casino data');
    }
};

const getCasinoSeoInfoBySlug = async (slug: string, locale: string) => {
    try {
        const data = await findCasinoSeoDataBySlug(locale, slug);
        if (!data || data.results.length === 0) throw new Error('Casino not found');
        return {
            title: data.results[0].seo.title,
            description: data.results[0].seo.description,
            keywords: data.results[0].seo.keywords,
        };
    } catch (error) {
        console.error('Error fetching casino SEO data:', error);
        throw new Error('Failed to fetch casino data');
    }
};

const getCasinoCategoryBySlug = async (slug: string, locale?: string) => {
    try {
        const data = await findCasinoCategoryBySlug(slug, locale);

        if (!data || data.results.length === 0) throw new Error('Casino category not found');

        const categoryData = data.results[0];

        return {
            slug: categoryData.slug,
            casinoCategoryType: categoryData.casinoCategoryType,
            pageTitle: categoryData.title,
            seo: categoryData.seo,
        };
    } catch (error) {
        console.error('Error fetching casino category by slug:', error);
        throw new Error('Failed to fetch casino category data');
    }
};

const getAllCasinosCategories = async (locale: string) => {
    try {
        const data = await findAllCasinosCategories(locale);
        if (!data || data.results.length === 0) return [];

        const preparedData = data.results.map(category => ({
            slug: category.slug,
            coverImage: category.coverImage.url,
            title: category.title,
        }));

        return preparedData;
    } catch (error) {
        console.error('Error fetching all casinos categories:', error);
        throw new Error('Failed to fetch all casinos categories');
    }
};

export {
    getCasinoByUUID,
    getCasinosByType,
    getAllCasinosWithoutPagination,
    getCasinosBySlug,
    getCasinoSeoInfoBySlug,
    getCasinoCategoryBySlug,
    getAllCasinosCategories,
};
