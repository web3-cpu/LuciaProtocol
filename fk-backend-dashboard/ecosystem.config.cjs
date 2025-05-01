module.exports = {
  apps: [
    {
      name: "sdk",
      script: "./src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "dev",
        NODE_PORT: 3003,
        NODE_TYPE: "sdk",
      },
      env_staging: {
        NODE_ENV: "staging",
        NODE_PORT: 3003,
        NODE_TYPE: "sdk",
      },
      env_production: {
        NODE_ENV: "production",
        NODE_PORT: 3003,
        NODE_TYPE: "sdk",
      },
    },
    {
      name: "dashboard",
      script: "./src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "dev",
        NODE_PORT: 3002,
        NODE_TYPE: "dashboard",
      },
      env_staging: {
        NODE_ENV: "staging",
        NODE_PORT: 3002,
        NODE_TYPE: "dashboard",
      },
      env_production: {
        NODE_ENV: "production",
        NODE_PORT: 3002,
        NODE_TYPE: "dashboard",
      },
    },
  ],
};
