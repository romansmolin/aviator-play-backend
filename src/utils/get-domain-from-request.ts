export const getDomainFromRequest = context => {
    const req = context.koaContext || context.ctx;

    const forwardedHost = req.headers['x-forwarded-host'];
    const forwardedProto = req.headers['x-forwarded-proto'];

    // Get protocol - check forwarded first, then request
    const protocol = forwardedProto || req.protocol || (req.secure ? 'https' : 'http');

    // Get hostname - check forwarded first, then hostname, then host
    const hostname = forwardedHost || req.hostname || req.host;

    // Clean hostname (remove port if present for display)
    const cleanHostname = hostname?.split(':')[0] || 'unknown';

    // Determine environment
    const isLocalhost = cleanHostname === 'localhost' || cleanHostname === '127.0.0.1';

    // Get the actual port from the request
    const actualPort =
        req.socket?.localPort || req.connection?.localPort || process.env.PORT || (protocol === 'https' ? 443 : 80);

    console.log('🔍 Port debugging:', {
        actualPort,
        socketPort: req.socket?.localPort,
        connectionPort: req.connection?.localPort,
        envPort: process.env.PORT,
        hostname,
        cleanHostname,
        isLocalhost,
    });

    // For localhost, ensure port is included
    let finalHostname = hostname;
    if (isLocalhost) {
        // For localhost, always include the actual port
        finalHostname = `${cleanHostname}:${actualPort}`;
    }

    // Full domain with protocol
    const fullDomain = `${protocol}://${finalHostname}`;

    return fullDomain;
};
