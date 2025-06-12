import {
    getAllBonuses,
    getBonusesByType,
    getBonusById,
    getAllBonusesWithoutPagination,
    getBonusBySlug,
    getBonusSeoInfoBySlug,
    getBonusCategoryBySlug,
    getAllBonusCategories,
} from '../../services/bonus-service';

export default {
    Query: {
        getAllBonuses: {
            resolve: async (parent: any, args: any) => {
                return getAllBonuses(args);
            },
        },
        getBonusesByType: {
            resolve: async (parent: any, args: any) => {
                return getBonusesByType(args);
            },
        },
        getBonusById: {
            resolve: async (parent: any, args: any) => {
                const { uuid, locale } = args;
                return getBonusById(uuid, locale);
            },
        },
        getAllBonusesWithoutPagination: {
            resolve: async (parent: any, args: any) => {
                return getAllBonusesWithoutPagination(args);
            },
        },
        getBonusBySlug: {
            resolve: async (parent: any, args: any) => {
                const { slug, locale } = args;
                return getBonusBySlug(slug, locale);
            },
        },
        getBonusSeoInfoBySlug: {
            resolve: async (parent: any, args: any) => {
                const { slug, locale } = args;
                return getBonusSeoInfoBySlug(slug, locale);
            },
        },
        getBonusCategoryBySlug: {
            resolve: async (parent: any, args: any) => {
                const { slug, locale } = args;
                return getBonusCategoryBySlug(slug, locale);
            },
        },
        getAllBonusCategories: {
            resolve: async (parent: any, args: any) => {
                const { locale } = args;
                return getAllBonusCategories(locale);
            },
        },
    },
};
