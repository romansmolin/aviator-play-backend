'use strict';

import {
    bonusSchema,
    casinoSchema,
    menuSchema,
    newsletterSchema,
    nodemailerSchema,
    pageSchema,
    searchSchema,
    topSchema,
} from './schema';

import resolversIndex from './resolvers';
import resolversConfig from './config';

const mergeResolvers = (resolversObj: any) => {
    const merged: any = {};

    Object.values(resolversObj).forEach((resolverGroup: any) => {
        Object.keys(resolverGroup).forEach((type: string) => {
            if (!merged[type]) {
                merged[type] = {};
            }
            Object.assign(merged[type], resolverGroup[type]);
        });
    });

    return merged;
};

export default (strapi: any) => {
    const extensionService = strapi.plugin('graphql').service('extension');

    const allResolvers = resolversIndex(strapi);
    const mergedResolvers = mergeResolvers(allResolvers);

    const extension = {
        typeDefs: [
            bonusSchema,
            casinoSchema,
            menuSchema,
            newsletterSchema,
            nodemailerSchema,
            pageSchema,
            searchSchema,
            topSchema,
        ].join('\n'),
        resolvers: mergedResolvers,
        resolversConfig,
    };

    extensionService.use(extension);
};
