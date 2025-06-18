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
          "frame-src": [ "self", "sandbox.embed.apollographql.com" ],
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
        process.env.FRONTEND_URL || 'https://your-frontend-domain.com',
        // Add more production domains here
        'https://www.your-frontend-domain.com',
        // If using multiple domains or subdomains, list them here
      ],
      expose: [
        'WWW-Authenticate',
        'Server-Authorization'
      ],
      maxAge: 31536000,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'X-Requested-With',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers'
      ],
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