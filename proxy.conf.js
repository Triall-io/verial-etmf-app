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
        "target": "http://factomd.testnet.sphereon.com",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/factomd": ""
        }
    },
    "/walletd": {
        "target": "http://walletd.testnet.sphereon.com",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/walletd": ""
        }
    }
};
