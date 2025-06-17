export default `
    type GetTopByCountryName {
      id: String
      country: String
      topList: [MainTopEntry]
    }
  
    type MainTopEntry {
      rating: Float
      title: String
      mainBonusTitle: String
      hasRegularOffers: Boolean
      hasLiveCasino: Boolean
      hasVIPProgram: Boolean
      hasLiveChat: Boolean
      logo: String
      slug: String
    }

    type TopPageSeo {
      title: String
      description: String
      keywords: String
    }

    type TopPage {
      id: String
      pageTitle: String
      slug: String
      top: GetTopByCountryName
    }

    extend type Query {
        getTopByCountryName(country: String!, locale: String!): GetTopByCountryName
        getTopPageBySlug(slug: String!, locale: String!): TopPage
    }
`;
