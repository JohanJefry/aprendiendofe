//Dependencies
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    // los css q pongamos en los componentes
    // las clases se renombraran
    //name y [local] = clases y has 5 caracteres para aislar los stylos
    localIdentName: '[name]__[local]__[hash:base64:5]'// para cambiar nombre a las clases css
  }
});
