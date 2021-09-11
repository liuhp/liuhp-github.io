/*
 * @Author: your name
 * @Date: 2021-09-11 16:44:49
 * @LastEditTime: 2021-09-11 23:33:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /liuhp.github.io/scripts/plugins.js
 */
hexo.extend.filter.register('theme_inject', function (injects) {
  // 引入 APlayer
  injects.head.file('aplayer', 'source/_data/APlayer.swig', {aplayer: hexo.theme.config.aplayer});
});