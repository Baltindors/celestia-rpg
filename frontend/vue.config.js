// frontend/vue.config.js
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    try {
      config.module.rules.delete("eslint");
    } catch {}
  },
};
