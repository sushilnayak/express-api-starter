import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    description: process.env.APP_DESCRIPTION
  },
  basePath: '/api'
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    path.join(__dirname, '../swagger-docs/*.yml')
  ]
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
