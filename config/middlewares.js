module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com',                 
          'aff-site-demo-bucket.s3.eu-north-1.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
            'aff-site-demo-bucket.s3.eu-north-1.amazonaws.com',
          ],
          "frame-src": [ "http://localhost:*", "self", "sandbox.embed.apollographql.com" ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',
        'http://localhost:3001', 
        'https://usw4owgscwcgoo0k0o0k44k0.kiwi-animatori.com', // Replace with your actual frontend domain
        // Add more frontend domains as needed
      ]
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'global::affiliate-redirect',
    config: {},
  },
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
