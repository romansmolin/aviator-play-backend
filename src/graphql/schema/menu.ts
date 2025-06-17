export default `
    type GetMenu {
        sections: [MenuSection]
    }

    type MenuSection {
        title: String
        isActive: Boolean
        menuLink: [MenuLink]
    }

    type MenuLink {
        title: String
        type: ENUM_MENU_LINK_TYPE
        bonusCategory: BonusCategory
        casinosCategory: CasinosCategory
        topSlug: String
        externalUrl: String
    }

    type BonusCategory {
        slug: String
    }

    type CasinosCategory {
        slug: String
    }

    enum ENUM_MENU_LINK_TYPE {
        casino
        bonus
        static
        external
        top
    }

    extend type Query {
        getMenu(locale: String): GetMenu
    }
`;
