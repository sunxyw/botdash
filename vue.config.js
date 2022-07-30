module.exports = {
  runtimeCompiler: true,

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "BotDash - 机器人管理面板";
      return args;
    });
  },
};
