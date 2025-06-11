import type { Schema, Struct } from '@strapi/strapi';

export interface BonusBonusInfo extends Struct.ComponentSchema {
    collectionName: 'components_bonus_bonus_infos';
    info: {
        description: '';
        displayName: 'BonusInfo';
        icon: 'feather';
    };
    attributes: {
        availableFor: Schema.Attribute.JSON & Schema.Attribute.Required;
        bonusStatus: Schema.Attribute.JSON &
            Schema.Attribute.Required &
            Schema.Attribute.CustomField<'plugin::multi-select.multi-select', ['Active', 'Innactive']>;
        bonusType: Schema.Attribute.Component<'bonus.bonus-type', false>;
        releaseDate: Schema.Attribute.Date & Schema.Attribute.Required;
    };
}

export interface BonusBonusType extends Struct.ComponentSchema {
    collectionName: 'components_bonus_bonus_types';
    info: {
        displayName: 'BonusType';
        icon: 'apps';
    };
    attributes: {
        bonusType: Schema.Attribute.JSON &
            Schema.Attribute.Required &
            Schema.Attribute.CustomField<
                'plugin::multi-select.multi-select',
                [
                    'No Deposit Bonus:no-deposit-bonuses',
                    'Welcome Bonus:welcome-bonuses',
                    'Cashback Bonus:cashback-bonuses',
                    'Best Of The Month:best-of-the-month',
                    'Real Money Bonuses:real-money-bonuses',
                    'Free Spins Bonuses:free-spins-bonuses',
                    '20 Free Spins:20-free-spins-bonuses',
                    '50 Free Spins:50-free-spins-bonuses',
                    '100 Free Spins:100-free-spins-bonuses',
                    'Free Spins Bonus:free-spins-bonuses',
                    'Free Cash Bonus:free-cash-bonuses',
                    '0 Wager Bonus:0-wager-bonuses',
                    'Crypto Bonus:crypto-bonuses',
                    '',
                ]
            > &
            Schema.Attribute.SetMinMax<
                {
                    min: 0;
                },
                number
            > &
            Schema.Attribute.DefaultTo<'[]'>;
    };
}

export interface BonusMainBonusInfo extends Struct.ComponentSchema {
    collectionName: 'components_bonus_main_bonus_infos';
    info: {
        description: '';
        displayName: 'MainBonusInfo';
        icon: 'bold';
    };
    attributes: {
        bonus: Schema.Attribute.Relation<'oneToOne', 'api::bonus.bonus'>;
        bonusLink: Schema.Attribute.String;
        info: Schema.Attribute.Blocks;
    };
}

export interface CardCasinoCard extends Struct.ComponentSchema {
    collectionName: 'components_card_casino_cards';
    info: {
        description: '';
        displayName: 'CasinoCard';
        icon: 'code';
    };
    attributes: {
        casino: Schema.Attribute.Relation<'oneToOne', 'api::casino.casino'>;
        hasLiveCasino: Schema.Attribute.Boolean;
        hasLiveChat: Schema.Attribute.Boolean;
        hasRegularOffers: Schema.Attribute.Boolean;
        hasVIPProgram: Schema.Attribute.Boolean;
        logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
        main_bonus_title: Schema.Attribute.String;
        rating: Schema.Attribute.Integer &
            Schema.Attribute.SetMinMax<
                {
                    max: 100;
                },
                number
            >;
        title: Schema.Attribute.String;
    };
}

export interface CardPromoCard extends Struct.ComponentSchema {
    collectionName: 'components_card_promo_cards';
    info: {
        description: '';
        displayName: 'PromoCard';
        icon: 'cube';
    };
    attributes: {
        bonus_img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
        bonus_subtitle: Schema.Attribute.String;
        bonus_title: Schema.Attribute.String;
        link: Schema.Attribute.String;
    };
}

export interface CasinoCasinoType extends Struct.ComponentSchema {
    collectionName: 'components_casino_casino_types';
    info: {
        displayName: 'CasinoType';
        icon: 'briefcase';
    };
    attributes: {
        casinoType: Schema.Attribute.JSON &
            Schema.Attribute.Required &
            Schema.Attribute.CustomField<
                'plugin::multi-select.multi-select',
                [
                    'Online Casino: online-casinos',
                    '',
                    'Mobile Casino: mobile-casinos',
                    '',
                    'Live Casino: live-casinos',
                    'New Casino: new-casinos',
                    'Fast Payout Casino: fast-payout-casinos',
                    'Crypto Casino: crypto-casinos',
                    'Pay N Play Casino: pay-n-play-casinos',
                    'High Roller Casino: high-roller-casinos',
                    'Low Wagering Casino: low-wagering-casinos',
                    'Minimum Deposit Casino: minimum-deposit-casinos',
                    'No Verification Casino: no-verification-casinos',
                    'Trusted Casino: trusted-casinos',
                    'Best Casino Sites: best-casino-sites',
                    'Real Money Casino: real-money-casinos',
                    'New No Account Casino: new-no-account-casinos',
                    'Instant Withdrawal Casino: instant-withdrawal-casinos',
                    'Sportsbook Casinos:sportsbook-casinos',
                ]
            > &
            Schema.Attribute.SetMinMax<
                {
                    max: 1;
                    min: 0;
                },
                number
            > &
            Schema.Attribute.DefaultTo<'[]'>;
    };
}

export interface ContentContentSection extends Struct.ComponentSchema {
    collectionName: 'components_content_content_sections';
    info: {
        description: '';
        displayName: 'ContentSection';
    };
    attributes: {
        image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
        imageBackgroundColor: Schema.Attribute.JSON &
            Schema.Attribute.CustomField<
                'plugin::multi-select.multi-select',
                ['Pinky Red:#dd3070', 'Orange:#DD7030', 'Blue:#3030DD', '']
            >;
        position: Schema.Attribute.Enumeration<['left', 'rigth']> & Schema.Attribute.Required;
        text: Schema.Attribute.Blocks & Schema.Attribute.Required;
    };
}

export interface FaqFaq extends Struct.ComponentSchema {
    collectionName: 'components_faq_faqs';
    info: {
        description: '';
        displayName: 'FAQ';
    };
    attributes: {
        fact1: Schema.Attribute.Component<'faq.faq-item', true>;
    };
}

export interface FaqFaqItem extends Struct.ComponentSchema {
    collectionName: 'components_faq_faq_items';
    info: {
        displayName: 'FaqItem';
    };
    attributes: {
        label: Schema.Attribute.String;
        text: Schema.Attribute.Text;
    };
}

export interface ListAvailablePromosList extends Struct.ComponentSchema {
    collectionName: 'components_list_available_promos_lists';
    info: {
        displayName: 'AvailablePromosList';
        icon: 'apps';
    };
    attributes: {
        Promo: Schema.Attribute.Component<'card.promo-card', false>;
    };
}

export interface ListCasinoTopList extends Struct.ComponentSchema {
    collectionName: 'components_list_casino_top_lists';
    info: {
        displayName: 'CasinoTopList';
        icon: 'apps';
    };
    attributes: {
        CasinoCard: Schema.Attribute.Component<'card.casino-card', true>;
    };
}

export interface MenuMenuLink extends Struct.ComponentSchema {
    collectionName: 'components_menu_menu_links';
    info: {
        displayName: 'MenuLink';
    };
    attributes: {
        bonusCategory: Schema.Attribute.Relation<'oneToOne', 'api::bonus-category.bonus-category'>;
        casinosCategory: Schema.Attribute.Relation<'oneToOne', 'api::casinos-category.casinos-category'>;
        externalUrl: Schema.Attribute.String;
        title: Schema.Attribute.String;
        type: Schema.Attribute.Enumeration<['casino', 'bonus', 'static', 'external']>;
    };
}

export interface MenuMenuSection extends Struct.ComponentSchema {
    collectionName: 'components_menu_menu_sections';
    info: {
        displayName: 'MenuSection';
    };
    attributes: {
        isActive: Schema.Attribute.Boolean;
        menuLink: Schema.Attribute.Component<'menu.menu-link', true>;
        title: Schema.Attribute.String;
    };
}

export interface SeoSeoMeta extends Struct.ComponentSchema {
    collectionName: 'components_seo_seo_metas';
    info: {
        displayName: 'Seo Meta';
        icon: 'code';
    };
    attributes: {
        description: Schema.Attribute.String & Schema.Attribute.Required;
        keywords: Schema.Attribute.JSON;
        title: Schema.Attribute.String & Schema.Attribute.Required;
    };
}

declare module '@strapi/strapi' {
    export module Public {
        export interface ComponentSchemas {
            'bonus.bonus-info': BonusBonusInfo;
            'bonus.bonus-type': BonusBonusType;
            'bonus.main-bonus-info': BonusMainBonusInfo;
            'card.casino-card': CardCasinoCard;
            'card.promo-card': CardPromoCard;
            'casino.casino-type': CasinoCasinoType;
            'content.content-section': ContentContentSection;
            'faq.faq': FaqFaq;
            'faq.faq-item': FaqFaqItem;
            'list.available-promos-list': ListAvailablePromosList;
            'list.casino-top-list': ListCasinoTopList;
            'menu.menu-link': MenuMenuLink;
            'menu.menu-section': MenuMenuSection;
            'seo.seo-meta': SeoSeoMeta;
        }
    }
}
