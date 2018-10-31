module.exports = {
    "/alfresco": {
        "target": "https://triall.dev.sphereon.com",
        "secure": false,
        "changeOrigin": true,
        // workaround for REPO-2260
        onProxyRes: function (proxyRes, req, res) {
            const header = proxyRes.headers['www-authenticate'];
            if (header && header.startsWith('Basic')) {
                proxyRes.headers['www-authenticate'] = 'x' + header;
            }
        }
    },
    "/factomd": {
        "target": "http://136.144.204.97:8088",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/factomd": ""
        }
    },
    "/walletd": {
        "target": "http://136.144.204.97:8089",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/walletd": ""
        }
    }
};
