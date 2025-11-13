// prisma/config.ts  (or prisma/config.mjs / prisma/config.js if using JS)
import dotenv from "dotenv";
dotenv.config(); // <-- load .env into process.env BEFORE calling env()

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // now env("DATABASE_URL") will find the value loaded from .env
    url: env("DATABASE_URL"),
  },
});
