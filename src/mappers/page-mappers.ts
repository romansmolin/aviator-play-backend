const processImage = image => ({
    url: image?.url || '',
});

const processFAQ = faqBlock =>
    faqBlock?.fact1?.map(fact => ({
        label: fact.label,
        text: fact.text,
    })) || [];

const pageContentSectionMapper = contentBlock => ({
    type: 'contentSection',
    image: contentBlock?.image ? processImage(contentBlock.image) : null,
    content: contentBlock?.text || [],
    position: contentBlock?.position || '',
    imageBackgroundColor: contentBlock?.imageBackgroundColor?.[0] || '',
    badge: contentBlock?.badge || null,
    actionButton: {
        title: contentBlock?.actionButton?.title || '',
        link: contentBlock?.actionButton?.link || '',
    },
});

const pageFaqSectionMapper = faqBlock => ({
    type: 'faq',
    image: null,
    content: [
        {
            faqs: processFAQ(faqBlock),
        },
    ],
});

export { pageContentSectionMapper, pageFaqSectionMapper };
