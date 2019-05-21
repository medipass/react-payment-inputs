module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'PaymentInputs',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    extractCSS: false
  }
};
