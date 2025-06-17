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
        slug: String
        type: ENUM_MENU_LINK_TYPE
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
