export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    serviceName: process.env.DB_SERVICE_NAME,
  },
  jwt: {
    jwks_uri: process.env.JWKS_URI,
    jwks_audience: process.env.JWKS_AUDIENCE,
    jwks_issuer: process.env.JWKS_ISSUER,
  },
});
