import { bonusMapper, bonusMapperWithExtras } from '../mappers/bonus-mappers';
import { paginate } from './paginate';
import {
    findAllBonuses,
    findAllBonusesByLocale,
    findBonusesByTypeAndLocale,
    findBonusByUuid,
    findBonusBySlug,
    findBonusSeoDataBySlug,
} from '../repositories/bonus-repository';

const getAllBonuses = async (args: any) => {
    try {
        const data = await findAllBonuses();

        const mappedBonuses = data.results.map((item: any) => bonusMapper(item));
        const { page, number } = args;
        const { items: bonuses, totalPages } = paginate(mappedBonuses, page, number);

        return {
            bonuses,
            totalPages,
        };
    } catch (err) {
        console.log('Error fetching GetAllBonuses: ', err);
        return {
            bonuses: [],
        };
    }
};

const getAllBonusesWithoutPagination = async (args: any) => {
    try {
        const data = await findAllBonusesByLocale(args.locale);

        const mappedBonuses = data.results.map((item: any) => bonusMapper(item));

        console.log('mappedBonuses: ', mappedBonuses);

        return {
            bonuses: mappedBonuses,
        };
    } catch (err) {
        console.log('Error fetching GetAllBonusesWithoutPagination: ', err);
        return {
            bonuses: [],
        };
    }
};

const getBonusesByType = async (args: any) => {
    try {
        const data = await findBonusesByTypeAndLocale(args.locale);

        const { page, number, type } = args;
        const filteredBonuses = data.results.filter((bonus: any) => bonus.bonusInfo.bonusType.includes(type));

        const filteredProcessedBonuses = filteredBonuses.map((item: any) => bonusMapper(item));
        const { items: bonuses, totalPages } = paginate(filteredProcessedBonuses, page, number);

        return {
            bonuses,
            totalPages,
        };
    } catch (err) {
        console.log('Error while fetching bonuses by type: ', err);
        return {
            bonuses: [],
        };
    }
};

const getBonusById = async (uuid: string, locale: string) => {
    try {
        const data = await findBonusByUuid(uuid, locale);

        if (!data || !data.results.length) throw new Error('Bonus not found');

        const bonusData = data.results[0];

        const bonus = bonusMapperWithExtras(bonusData);

        return {
            bonus,
        };
    } catch (err) {
        console.error('Error fetching Bonus by UUID:', err);
        throw new Error('Error fetching Bonus');
    }
};

const getBonusBySlug = async (slug: string, locale: string) => {
    try {
        const data = await findBonusBySlug(slug, locale);

        if (!data || data.results.length === 0) throw new Error('Bonus not found');

        const bonusData = data.results[0];
        const bonus = bonusMapperWithExtras(bonusData);

        return {
            bonus,
        };
    } catch (error) {
        console.error('Error fetching bonus by slug:', error);
        throw new Error('Failed to fetch bonus data');
    }
};

const getBonusSeoInfoBySlug = async (slug: string, locale: string) => {
    try {
        const data = await findBonusSeoDataBySlug(locale, slug);

        if (!data || data.results.length === 0) throw new Error('Bonus not found');

        return {
            title: data.results[0].seo?.title,
            description: data.results[0].seo?.description,
            keywords: data.results[0].seo?.keywords,
        };
    } catch (error) {
        console.error('Error fetching bonus SEO data:', error);
        throw new Error('Failed to fetch bonus SEO data');
    }
};

export {
    getAllBonuses,
    getBonusesByType,
    getBonusById,
    getAllBonusesWithoutPagination,
    getBonusBySlug,
    getBonusSeoInfoBySlug,
};
