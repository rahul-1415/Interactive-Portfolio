const path = require('path')
const withTM = require('next-transpile-modules')(['three'])

module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    domains: [
      'media.graphassets.com'
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      include: [path.resolve(__dirname, 'node_modules/three')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          babelrc: false,
          configFile: false
        }
      }
    })

    return config
  }
})
