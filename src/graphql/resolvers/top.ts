import { resolve } from 'path';
import { getAllTops, getTopByCountryName, getTopPageBySlug } from '../../services/top-service';

export default (strapi: any) => ({
    Query: {
        getTopByCountryName: {
            resolve: async (parent: any, args: any) => {
                return getTopByCountryName(args.country, args.locale);
            },
        },
        getTopPageBySlug: {
            resolve: async (parent: any, args: any) => {
                return getTopPageBySlug(args.slug, args.locale);
            },
        },
        getAllTops: {
            resolve: async (parent: any, args: any) => {
                return getAllTops(args.locale);
            },
        },
    },
});
