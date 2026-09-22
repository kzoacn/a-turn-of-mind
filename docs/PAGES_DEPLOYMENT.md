**《转念之间 / A Turn of Mind》在线版**

- 游戏：[kzoacn.github.io/a-turn-of-mind](https://kzoacn.github.io/a-turn-of-mind/)
- 仓库：[kzoacn/a-turn-of-mind](https://github.com/kzoacn/a-turn-of-mind)
- 后五十关入口：[从第 51 关开始](https://kzoacn.github.io/a-turn-of-mind/#level=51)

GitHub Pages 使用公共仓库的 `main` 分支根目录。根目录的 `.nojekyll` 文件让 Pages 直接发布 HTML、CSS、JavaScript、SVG 和字体。此项目无需构建网页，也没有后端或登录服务；相对资源路径适用于仓库子目录下的站点。

更新时运行逻辑测试，提交并推送 `main`。GitHub 自动触发 Pages 部署，可在仓库的 Actions 或 Settings → Pages 查看结果。GitHub 对分支发布方式的说明见 [官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

```bash
node --test tests/native_logic.cjs
git add <本次修改的文件>
git commit -m "Describe the change"
git push origin main
gh api repos/kzoacn/a-turn-of-mind/pages --jq '{status, html_url, source}'
```

发布前的一百关完整验收包含 243 项逻辑测试和 522 项浏览器检查。此次正式定名只修改网页名称、宣传语、导出记录的显示名称和字体子集，存档键继续使用 `borrowed-moves.native.v2`，已有同来源进度可继续读取。历史 Godot 原型与构建产物保持原样。

线上进度保存在访问者自己的浏览器中。`file://`、`localhost` 与 GitHub Pages 属于不同存储来源，所以本地进度不会自动出现在在线版中。游戏内的“导出试玩记录”仍只下载本地文件。

在线验收已通过 32 项检查，包括匿名访问、九项资源与源码逐字节一致、第 1、51、100 关实际通关、窄屏布局和刷新后的存档延续。GitHub 部署成功并启用 HTTPS；这次验收的提交与运行记录见 [pages-validation.json](pages-validation.json)。

安装 README 中的 Playwright 浏览器依赖后，可运行 `node tests/pages_smoke.cjs` 重做在线验收。默认测试上面的 GitHub Pages 地址；环境变量 `TURN_OF_MIND_URL` 可改为本地或预览地址。检查会逐字节核对九项网页资源，并实际通关第 1、51、100 关，结果写入 `test-results/pages/`。
