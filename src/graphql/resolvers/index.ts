'use strict';

import bonusResolvers from './bonus';
import casinoResolvers from './casino';
import menuResolvers from './menu';
import newsletterResolvers from './newsletter';
import nodemailerResolvers from './nodemailer';
import pageResolvers from './page';
import searchResolvers from './search';
import topResolvers from './top';

export default (strapi: any) => ({
    bonusResolvers,
    casinoResolvers,
    menuResolvers,
    newsletterResolvers,
    nodemailerResolvers,
    pageResolvers,
    searchResolvers,
    topResolvers: topResolvers(strapi),
});
