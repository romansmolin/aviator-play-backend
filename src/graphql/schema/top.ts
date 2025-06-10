export default `
    type GetTopByCountryName {
      id: String
      country: String
      topList: [MainTopEntry]
    }
  
    type MainTopEntry {
      rating: Float
      title: String
      main_bonus_title: String
      hasRegularOffers: Boolean
      hasLiveCasino: Boolean
      hasVIPProgram: Boolean
      hasLiveChat: Boolean
      logo: String
      casino: String
    }

    extend type Query {
        getTopByCountryName(country: String!, locale: String!): GetTopByCountryName
    }
`;
