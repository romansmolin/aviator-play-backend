import { pageContentSectionMapper, pageFaqSectionMapper } from '../mappers/page-mappers';
import { findPagesByLocale, getPageSeoInfoBySlug } from '../repositories/page-repository';

const processedPageContent = (content: any) =>
    content
        .map((contentItem: any) => {
            switch (contentItem.__component) {
                case 'content.content-section':
                    return pageContentSectionMapper(contentItem);
                case 'faq.faq':
                    return pageFaqSectionMapper(contentItem);
                default:
                    return null; // Handle unknown types
            }
        })
        .filter((item: any) => item !== null);

const getPageContentBySlug = async (slug: string, locale: string) => {
    try {
        const pages = await findPagesByLocale(locale);

        const page = pages.results.find((page: any) => page.slug === slug);

        if (!page) {
            return {
                pageContent: null,
            };
        }

        return {
            pageContent: processedPageContent(page.dynamicContent),
        };
    } catch (err) {
        console.error('Error fetching page content by slug:', err);
        throw new Error('Error fetching page content');
    }
};

const getSeoInfoBySlug = async (slug: string, locale: string) => {
    try {
        const data = await getPageSeoInfoBySlug(slug, locale);
        console.log('data: ', data);
        if (!data || data.results.length === 0) throw new Error('Page SEO not found');

        return {
            title: data.results[0].seo?.title,
            description: data.results[0].seo?.description,
            keywords: data.results[0].seo?.keywords,
        };
    } catch (error) {
        console.error('Error fetching page SEO data:', error);
        throw new Error('Failed to fetch page SEO data');
    }
};

export { getPageContentBySlug, getSeoInfoBySlug };
