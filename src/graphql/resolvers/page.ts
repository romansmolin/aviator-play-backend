import { getPageContentBySlug, getSeoInfoBySlug } from '../../services/page-service';

export default {
    Query: {
        getPageContentBySlug: {
            resolve: async (parent: any, args: any) => {
                return getPageContentBySlug(args.slug, args.locale);
            },
        },
        getPageSeoInfoBySlug: {
            resolve: async (parent: any, args: any) => {
                return getSeoInfoBySlug(args.slug, args.locale);
            },
        },
    },
};
