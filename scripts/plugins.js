/*
 * @Author: your name
 * @Date: 2021-09-11 16:44:49
 * @LastEditTime: 2021-09-11 17:04:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /liuhp.github.io/scripts/plugins.js
 */
hexo.extend.filter.register('theme_inject', function (injects) {
  // hexo.theme.config.daovoice 就是上面配置的值，我们将配置参数传递给 daovoice.swig
  // injects.head.file('daovoice', 'source/_data/DaoVoice.swig', {daovoice: hexo.theme.config.daovoice});
});