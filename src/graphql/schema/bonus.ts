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
    }
`;
