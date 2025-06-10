'use strict';

export default `
    type GetCasinoByUUID {
      id: Int
      name: String
      bonus_title: String
      logoUrl: String
      features: [String]
      rating: Int
      review: [ReviewDetails]
      promos: [Promo]
      faq: [FaqItem]
      mainBonus: MainBonus
      casinoType: [String]
      allowedCountries: [String]
      allowedCurrencies: [String]
      slug: String
      affiliateLink: String
    }

    type GetCasinoByType {
      casinos: [CasinoItem]
      totalPages: Int
    }

    type GetAllCasinosWithoutPagination {
      casinos: [CasinoItem]
    }

    type CasinoItem {
        id: Int
        name: String
        bonus_title: String
        logoUrl: String
        features: [String]
        rating: Int
        review: [ReviewDetails]
        promos: [Promo]
        faq: [FaqItem]
        mainBonus: MainBonus
        casinoType: [String]
        uuid: String
        slug: String
        affiliateLink: String
    }

    type GetCasinoSeoInfoBySlug {
      title: String
      description: String
      keywords: [String]
    }

    type MainBonus {
      bonusLink: String
      info: [ReviewDetails]
      bonus: MainBonusDetails
    }

    type MainBonusDetails {
      uuid: String
      primaryBonusType: String
    }

    type FaqItem {
        text: String
        label: String
    }

    type Promo {
      bonus_title:  String
      bonus_subtitle: String
      bonus_link: String
      bonus_img: String
    }

    type ReviewDetails {
      type: String
      children: [ReviewText]
    }

    type ReviewText {
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

    extend type Query {
        getCasinoByUUID(uuid: String!, locale: String!): GetCasinoByUUID
        getCasinoBySlug(slug: String!, locale: String!): GetCasinoByUUID

        getCasinosByType(casinoType: String!, locale: String!, page: Int!, number: Int!): GetCasinoByType        
        getAllCasinosWithoutPagination(locale: String!): GetAllCasinosWithoutPagination
        getCasinoSeoInfoBySlug(locale: String!, slug: String!): GetCasinoSeoInfoBySlug
    }
`;
