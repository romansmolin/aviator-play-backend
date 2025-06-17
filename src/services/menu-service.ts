import { findMenu } from '../repositories/menu-repository';

const getMenu = async (locale?: string) => {
    try {
        const data = await findMenu(locale);

        if (!data) throw new Error('Menu not found');

        const mappedSections =
            data.section?.map((section: any) => ({
                title: section.title,
                isActive: section.isActive,
                menuLink: section.menuLink
                    ?.map((link: any) => {
                        // Extract slug from the appropriate relation based on what's connected
                        let slug = null;

                        if (link.bonusCategory?.slug) {
                            slug = link.bonusCategory.slug;
                        } else if (link.casinosCategory?.slug) {
                            slug = link.casinosCategory.slug;
                        } else if (link.page?.slug) {
                            slug = link.page.slug;
                        } else if (link.casinoTopPage?.slug) {
                            slug = link.casinoTopPage.slug;
                        } else if (link.externalUrl) {
                            slug = link.externalUrl; // For external links, use the URL as slug
                        }

                        return {
                            title: link.title,
                            slug: slug,
                            type: link.type,
                        };
                    })
                    .filter((link: any) => link.slug), // Only return links that have a slug
            })) || [];

        return {
            sections: mappedSections,
        };
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw new Error('Failed to fetch menu data');
    }
};

export { getMenu };
