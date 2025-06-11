import { findMenu } from '../repositories/menu-repository';

const getMenu = async (locale?: string) => {
    try {
        const data = await findMenu(locale);

        if (!data) throw new Error('Menu not found');

        return {
            sections: data.section || [],
        };
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw new Error('Failed to fetch menu data');
    }
};

export { getMenu };
