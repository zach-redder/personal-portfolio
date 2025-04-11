module.exports = {
    async redirects() {
      return [
        {
          source: '/Newsletter',
          destination: '/newsletter',  // Redirect to lowercase
          permanent: true,
        },
      ];
    },
  };