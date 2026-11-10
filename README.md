# OOXX 小小對戰室

一個使用原生 HTML、CSS 和 JavaScript 製作的雙人 OOXX 小遊戲，不需要安裝套件或建置步驟。

## 本機遊玩

直接用瀏覽器開啟 `index.html` 即可。

## 部署到 Netlify

1. 將專案推送到 GitHub repository。
2. 在 Netlify 選擇 **Add new site → Import an existing project**，連結該 GitHub repository。
3. 建置設定使用：
   - **Build command：** 留空
   - **Publish directory：** `.`
4. 按下部署。之後推送到 GitHub 的更新會自動重新部署。

這是純靜態網站，不需要 Netlify Functions、環境變數或額外的 `netlify.toml` 設定。
