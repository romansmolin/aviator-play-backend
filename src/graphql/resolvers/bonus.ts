'use strict';

import {
    getAllBonuses,
    getBonusesByType,
    getBonusById,
    getAllBonusesWithoutPagination,
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
    },
};
