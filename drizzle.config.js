/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://AI-Interview-Mocker_owner:nq2IemKZlt3w@ep-polished-band-a1m2lbzo.ap-southeast-1.aws.neon.tech/AI-Interview-Mocker?sslmode=require',
    }
  };