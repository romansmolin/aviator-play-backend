import { pageContentSectionMapper, pageFaqSectionMapper } from '../mappers/page-mappers';
import { findPagesByLocale, getPageSeoInfoBySlug } from '../repositories/page-repository';

const processedPageContent = (content: any) => {
    if (!content || !Array.isArray(content)) {
        return [];
    }

    return content
        .map((contentItem: any) => {
            if (!contentItem || !contentItem.__component) {
                return null;
            }

            switch (contentItem.__component) {
                case 'content.content-section':
                    return pageContentSectionMapper(contentItem);
                case 'faq.faq':
                    return pageFaqSectionMapper(contentItem);
                default:
                    console.warn(`Unknown component type: ${contentItem.__component}`);
                    return null; // Handle unknown types
            }
        })
        .filter((item: any) => item !== null);
};

const getPageContentBySlug = async (slug: string, locale: string) => {
    try {
        const pages = await findPagesByLocale(locale);
        const page = pages.results.find((page: any) => page.slug === slug);

        console.log('page: ', page?.dynamicContent);
        console.log('getPageContentBySlug: ', page?.dynamicContent);

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

const getAllPages = async (locale: string) => {
    try {
        const pages = await findPagesByLocale(locale);

        if (!pages || pages.results.length === 0) {
            return [];
        }

        return pages.results.map((page: any) => ({
            slug: page.slug,
            pageType: page.pageType,
        }));
    } catch (err) {
        console.error('Error fetching all pages:', err);
        throw new Error('Error fetching all pages');
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

export { getPageContentBySlug, getAllPages, getSeoInfoBySlug };
