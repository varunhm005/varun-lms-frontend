module.exports = {
  client: {
    includes: ['./src/*/**/*.gql'],
    tagName: 'graphql',
    service: {
      name: 'lms-staging',
      url: 'http://localhost:7500/api/graphql',
      skipSSLValidation: true,
    },
  },
};
