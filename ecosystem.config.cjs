module.exports = {
  apps: [{ name: "news-explorer-backend", script: "npm start" }],
  // Deployment Configuration
  deploy: {
    production: {
      user: "sevkinozan",
      host: ["34.168.61.220"],
      ref: "origin/stage-backend",
      repo: "https://github.com/ozansevkin/news-explorer-backend.git",
      path: "/home/sevkinozan/news-explorer/backend",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.cjs",
    },
  },
};
