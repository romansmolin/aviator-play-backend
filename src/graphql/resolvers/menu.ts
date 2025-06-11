import { getMenu } from '../../services/menu-service';

export default {
    Query: {
        getMenu: {
            resolve: async (parent: any, args: any) => {
                const { locale } = args;
                return getMenu(locale);
            },
        },
    },
};
