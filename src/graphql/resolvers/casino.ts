import {
    getCasinoByUUID,
    getCasinosByType,
    getAllCasinosWithoutPagination,
    getCasinosBySlug,
    getCasinoSeoInfoBySlug,
} from '../../services/casino-service';
import { getDomainFromRequest } from '../../utils/get-domain-from-request';

export default {
    Query: {
        getCasinoByUUID: {
            resolve: async (parent: any, args: any, context: any) => {
                const fullDomain = getDomainFromRequest(context);
                return getCasinoByUUID(args.uuid, args.locale, fullDomain);
            },
        },
        getCasinosByType: {
            resolve: async (parent: any, args: any, context: any) => {
                const fullDomain = getDomainFromRequest(context);
                return getCasinosByType(args, fullDomain);
            },
        },
        getAllCasinosWithoutPagination: {
            resolve: async (parent: any, args: any, context: any) => {
                const fullDomain = getDomainFromRequest(context);
                return getAllCasinosWithoutPagination(args, fullDomain);
            },
        },
        getCasinoBySlug: {
            resolve: async (parent: any, args: any, context: any) => {
                const fullDomain = getDomainFromRequest(context);
                return getCasinosBySlug(args.slug, args.locale, fullDomain);
            },
        },
        getCasinoSeoInfoBySlug: {
            resolve: async (parent: any, args: any) => {
                return getCasinoSeoInfoBySlug(args.slug, args.locale);
            },
        },
    },
};
