module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
      ],
    });
    return config;
  },
  env: {
    SERVER_BASE_URL: 'http://localhost:8000',
    COOKIE_USERID_SECRET:'$2a$15$DUYwi/wK4I29HVVzHRuT2uIfqJ.gAj/xjKd4p/fj17BsIbW486irO',
    COINBASE_API:'xZ4JnQvnUURQ1DC1'
  }
};