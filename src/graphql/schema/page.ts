export default `
    type GetPageContentBySlug {
        pageContent: [PageContent]
    }

    type GetPageSeoBySlug {
        title: String,
        description: String
        keywords: [String]
    }

    type PageInfo {
        slug: String
        pageType: ENUM_PAGE_PAGETYPE
    }

    enum ENUM_PAGE_PAGETYPE {
        bonus_category
        casino_category
        static
        casino_top
    }

    type PageContent {
        type: String
        content: [PageDetails]
        image: Image
        position: String
        imageBackgroundColor: String
    }

    type Image {
        url: String
    }

    type PageDetails {
        type: String
        children: [PageText]
        faqs: [FAQItem]
    }

    type PageText {
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

    type FAQItem {
        label: String
        text: String
    }

    extend type Query {
        getPageContentBySlug(slug: String!, locale: String!): GetPageContentBySlug 
        getPageSeoInfoBySlug(slug: String!, locale: String!): GetPageSeoBySlug
        getAllPages(locale: String!): [PageInfo]      
    }
`;
