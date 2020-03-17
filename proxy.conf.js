module.exports = {
    "/alfresco": {
        "target": "http://alfresco-triall.dev.sphereon.com:8080",
        "secure": false,
        "changeOrigin": true,
        // workaround for REPO-2260
        onProxyRes: function (proxyRes, req, res) {
            const header = proxyRes.headers['www-authenticate'];
            if (header && header.startsWith('Basic')) {
                proxyRes.headers['www-authenticate'] = 'x' + header;
            }
        }
    }
};
