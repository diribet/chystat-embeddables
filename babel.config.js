module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/env", {
            corejs: 3,
            useBuiltIns: "entry"
        }]
    ];

    return {
        presets
    };
};