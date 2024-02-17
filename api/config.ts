const config = {
  authorityHost: process.env.M365_AUTHORITY_HOST,
  tenantId: process.env.M365_TENANT_ID,
  clientId: process.env.M365_CLIENT_ID,
  clientSecret: process.env.M365_CLIENT_SECRET,
  sqlEndpoint: process.env.SQL_ENDPOINT,
  sqlDatabaseName: process.env.SQL_DATABASE_NAME,
  sqlUserName: process.env.SQL_USER_NAME,
  sqlPassword: process.env.SQL_PASSWORD,
};

export default config;
