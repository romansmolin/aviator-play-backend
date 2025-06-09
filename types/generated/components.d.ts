import type { Schema, Struct } from '@strapi/strapi';

export interface BonusBonusInfo extends Struct.ComponentSchema {
    collectionName: 'components_bonus_bonus_infos';
    info: {
        description: '';
        displayName: 'BonusInfo';
        icon: 'feather';
    };
    attributes: {
        availableFor: Schema.Attribute.JSON;
        bonus_status: Schema.Attribute.JSON &
            Schema.Attribute.CustomField<'plugin::multi-select.multi-select', ['Active', 'Innactive']>;
        bonus_type: Schema.Attribute.JSON &
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
                    '',
                ]
            >;
        release_date: Schema.Attribute.Date;
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

export interface SeoSeoMeta extends Struct.ComponentSchema {
    collectionName: 'components_seo_seo_metas';
    info: {
        displayName: 'Seo Meta';
        icon: 'code';
    };
    attributes: {
        description: Schema.Attribute.String & Schema.Attribute.Required;
        title: Schema.Attribute.String & Schema.Attribute.Required;
    };
}

declare module '@strapi/strapi' {
    export module Public {
        export interface ComponentSchemas {
            'bonus.bonus-info': BonusBonusInfo;
            'bonus.main-bonus-info': BonusMainBonusInfo;
            'card.casino-card': CardCasinoCard;
            'card.promo-card': CardPromoCard;
            'content.content-section': ContentContentSection;
            'faq.faq': FaqFaq;
            'faq.faq-item': FaqFaqItem;
            'list.available-promos-list': ListAvailablePromosList;
            'list.casino-top-list': ListCasinoTopList;
            'seo.seo-meta': SeoSeoMeta;
        }
    }
}
