export default {
  apps: [
    {
      name: "app",
      script: "./app.js",
      instances: 2,
      exec_Mode: "cluster",
    },
  ],
};
