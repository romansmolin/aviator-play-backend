export default `
    type GetAllBonuses {
        bonuses: [CustomBonus]
        totalPages: Int
    }

    type GetBonusesByType {
        bonuses: [CustomBonus]
        totalPages: Int
    }

    type GetBonusById {
        bonus: CustomBonus
    }
    
    type GetAllBonusesWithoutPagination {
        bonuses: [CustomBonus]
    }

    type GetBonusBySlug {
        bonus: CustomBonus
    }

    type GetBonusSeoInfoBySlug {
        title: String
        description: String
        keywords: [String]
    }

    type GetBonusCategoryBySlug {
        slug: String
        bonusCategoryType: BonusCategoryType
        seo: SeoMeta
        coverImage: String
    }

    type GetAllBonusCategories {
        slug: String
        bonusCategoryType: String
        coverImage: String
        title: String
    }

    type BonusCategoryType {
        bonusType: [String]
    }

    type SeoMeta {
        title: String
        description: String
        keywords: [String]
    }

    type CustomBonus {
        casinoName: String,
        casinoUuid: String
        casinoLogo: String
        bonusSubtitle: String
        bonusTitle: String
        info: BonusInfo
        faqInfo: [FaqItem]
        bonusReview: [BonusDetails]
        uuid: String
        primaryBonusType: ENUM_BONUS_PRIMARYBONUSTYPE
        slug: String
    }
    
    type BonusDetails {
        type: String
        children: [BonusText]
    }

    type BonusText {
        type: String
        text: String
        bold: Boolean
        url: String
        children: [ReviewTextChildren]
    }

    type ReviewTextChildren {
        text: String
        type: String
    }

    type FaqItem {
        text: String
        label: String
    }

    type BonusInfo {
        releaseDate: String,
        availableFor: [String],
        bonusType: [String],
        bonusStatus: String
    }

    extend type Query {
        getAllBonuses(page: Int!, number: Int!): GetAllBonuses  
        getBonusesByType(page: Int!, number: Int!, type: String!, locale: String!): GetBonusesByType
        getBonusById(uuid: String!, locale: String!): GetBonusById
        getAllBonusesWithoutPagination(locale: String!): GetAllBonusesWithoutPagination
        getBonusBySlug(slug: String!, locale: String!): GetBonusBySlug
        getBonusSeoInfoBySlug(slug: String!, locale: String!): GetBonusSeoInfoBySlug
        getBonusCategoryBySlug(slug: String!, locale: String): GetBonusCategoryBySlug
        getAllBonusCategories(locale: String!): [GetAllBonusCategories]
    }
`;
