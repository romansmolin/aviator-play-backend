const resolversConfig = {
    // Bonus resolvers
    'Query.getAllBonuses': {
        auth: false,
    },
    'Query.getBonusesByType': {
        auth: false,
    },
    'Query.getBonusById': {
        auth: false,
    },
    'Query.getAllBonusesWithoutPagination': {
        auth: false,
    },
    'Query.getBonusBySlug': {
        auth: false,
    },
    'Query.getBonusSeoInfoBySlug': {
        auth: false,
    },
    'Query.getBonusCategoryBySlug': {
        auth: false,
    },
    'Query.getAllBonusCategories': {
        auth: false,
    },

    // Casino resolvers
    'Query.getCasinoByUUID': {
        auth: false,
    },
    'Query.getCasinosByType': {
        auth: false,
    },
    'Query.getCasinoBySlug': {
        auth: false,
    },
    'Query.getAllCasinosWithoutPagination': {
        auth: false,
    },

    'Query.getCasinoSeoInfoBySlug': {
        auth: false,
    },
    'Query.getCasinoCategoryBySlug': {
        auth: false,
    },
    'Query.getAllCasinosCategories': {
        auth: false,
    },

    // Newsletter resolvers
    'Mutation.signUpOnNewsletter': {
        auth: false,
    },

    // Nodemailer resolvers
    'Mutation.sendEmail': {
        auth: false,
    },

    // Page resolvers
    'Query.getPageContentBySlug': {
        auth: false,
    },
    'Query.getPageSeoInfoBySlug': {
        auth: false,
    },
    'Query.getAllPages': {
        auth: false,
    },

    // Search resolvers
    'Query.globalSearch': {
        auth: false,
    },

    // Top resolvers
    'Query.getTopByCountryName': {
        auth: false,
    },
    'Query.getTopPageBySlug': {
        auth: false,
    },
    'Query.getAllTops': {
        auth: false,
    },

    // Mneu resolvers
    'Query.getMenu': {
        auth: false,
    },
};

export default resolversConfig;
