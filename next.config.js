module.exports = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
        disableStaticImages: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};