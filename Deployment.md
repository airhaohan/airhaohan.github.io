# 个人主页部署与启动指南

**项目：** airhaohan Personal Homepage（Frutiger Aero 风格）  
**技术栈：** React 19 + Vite 7 + Tailwind CSS 4 + Wouter  
**包管理器：** pnpm

---

## 目录

1. [环境准备](#1-环境准备)
2. [本地开发启动](#2-本地开发启动)
3. [个性化配置](#3-个性化配置)
4. [构建生产版本](#4-构建生产版本)
5. [部署方案 A：GitHub Pages（推荐）](#5-部署方案-a-github-pages推荐)
6. [部署方案 B：Vercel / Netlify](#6-部署方案-b-vercel--netlify)
7. [部署方案 C：自托管服务器](#7-部署方案-c-自托管服务器)
8. [更新内容的日常工作流](#8-更新内容的日常工作流)
9. [常见问题排查](#9-常见问题排查)

---

## 1. 环境准备

在开始之前，请确保您的系统已安装以下工具：

| 工具 | 最低版本 | 安装方式 |
|---|---|---|
| Node.js | 18.x 或更高 | https://nodejs.org |
| pnpm | 8.x 或更高 | `npm install -g pnpm` |
| Git | 任意版本 | https://git-scm.com |

验证安装是否成功：

```bash
node --version   # 应输出 v18.x.x 或更高
pnpm --version   # 应输出 8.x.x 或更高
git --version    # 应输出 git version x.x.x
```

---

## 2. 本地开发启动

### 第一步：解压代码库

将下载的 `personal-homepage-source.zip` 解压到您希望存放项目的目录：

```bash
unzip personal-homepage-source.zip
cd personal-homepage
```

### 第二步：安装依赖

```bash
pnpm install
```

首次安装约需 1-2 分钟，pnpm 会自动读取 `pnpm-lock.yaml` 安装精确版本的依赖。

### 第三步：启动开发服务器

```bash
pnpm dev
```

启动成功后，终端会显示：

```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

在浏览器中打开 `http://localhost:3000` 即可看到网站。开发服务器支持**热更新（HMR）**，修改代码后页面会自动刷新。

---

## 3. 个性化配置

在部署之前，您需要将示例内容替换为您自己的真实信息。

### 3.1 修改全局个人信息

编辑 `client/src/lib/siteConfig.ts`，这是整个网站的**唯一配置入口**：

```typescript
export const siteConfig = {
  // ── 基本信息 ──────────────────────────────────────
  name: "airhaohan",           // 用于导航栏 logo 和 URL
  fullName: "Haohan",          // 显示全名
  title: "PhD Researcher",     // 职称/身份
  status: "Actively Researching",
  statusEmoji: "🔬",

  // ── 所属机构 ──────────────────────────────────────
  affiliation: "AI Infra / ML Systems Lab",
  address: "Room 404, CS Building, University of Technology",

  // ── 联系方式 ──────────────────────────────────────
  email: "airhaohan@example.edu",   // 替换为真实邮箱

  // ── 头像 ──────────────────────────────────────────
  // 建议上传到图床（如 GitHub Issues、Cloudinary）后填写 URL
  avatar: "https://your-avatar-url.com/avatar.jpg",

  // ── 社交链接 ──────────────────────────────────────
  social: {
    github: "https://github.com/airhaohan",
    googleScholar: "https://scholar.google.com/citations?user=YOUR_ID",
    bilibili: "https://space.bilibili.com/73334196959",
  },

  // ── 论文作者高亮 ──────────────────────────────────
  // 填写您在论文中的署名（用于自动加粗）
  highlightName: "Haohan",

  // ── Bilibili 信息 ─────────────────────────────────
  bilibiliUid: "73334196959",
  bilibiliName: "我是小小升",

  // ── 研究兴趣标签 ──────────────────────────────────
  researchInterests: [
    "Mobile ML Inference",
    "On-device AI Systems",
    // 按需增删...
  ],
};
```

### 3.2 修改首页内容

编辑 `client/src/data/homeContent.ts`，更新 About Me 段落、教育经历时间轴和最新动态。

### 3.3 添加博客文章

在 `client/src/data/blogPosts.ts` 中追加新条目。文章内容支持完整 Markdown 语法，数学公式使用 KaTeX 语法：

- 行内公式：`$E = mc^2$`
- 独立公式块：`$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$`

### 3.4 添加论文

在 `client/src/pages/Publications.tsx` 文件顶部的 `bibContent` 字符串中，追加 BibTeX 格式的论文条目：

```bibtex
@inproceedings{yourkey2025,
  title     = {Your Paper Title},
  author    = {Haohan and Coauthor, Name},
  booktitle = {Conference Name (CONF 2025)},
  year      = {2025},
  venue     = {CONF 2025},
  url       = {https://arxiv.org/abs/xxxx.xxxxx},
  abstract  = {Abstract text here.}
}
```

### 3.5 更新 Bilibili 视频列表

**方式一（手动）：** 直接编辑 `client/src/data/videos.json`，按照已有格式填写视频信息。

**方式二（自动脚本）：** 安装 `requests` 库后运行脚本：

```bash
pip3 install requests
python3 scripts/fetch_bilibili.py
```

> **注意：** Bilibili API 存在风控，若脚本报错，请在浏览器登录 Bilibili 后，从 DevTools（F12）→ Application → Cookies → `bilibili.com` 中复制 `SESSDATA` 的值，填入脚本顶部的 `COOKIES` 字典。

---

## 4. 构建生产版本

```bash
pnpm build
```

构建产物位于 `dist/public/` 目录，包含所有静态文件（HTML、CSS、JS），可直接部署到任何静态托管服务。

构建完成后，可在本地预览生产版本：

```bash
pnpm preview
# 访问 http://localhost:4173
```

---

## 5. 部署方案 A：GitHub Pages（推荐）

这是最适合学术个人主页的方案，完全免费，与 Git 工作流深度集成。

### 第一步：创建 GitHub 仓库

在 GitHub 上创建一个新的**公开仓库**（例如 `personal-homepage` 或 `airhaohan.github.io`）。

### 第二步：推送代码

```bash
cd personal-homepage
git init
git add .
git commit -m "feat: initial Frutiger Aero personal homepage"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 进入仓库 **Settings → Pages**。
2. 在 **Source** 下选择 **GitHub Actions**。
3. 保存设置。

### 第四步：触发部署

项目中已包含 `.github/workflows/deploy.yml`，推送到 `main` 分支会**自动触发部署**。查看部署进度：

- 进入仓库 **Actions** 标签页，查看 `Deploy to GitHub Pages` 工作流。
- 部署成功后，网站地址为 `https://YOUR_USERNAME.github.io/YOUR_REPO/`。

### 第五步（可选）：配置自定义域名

若您希望使用自定义域名（如 `airhaohan.dev`）：

1. 在仓库根目录创建 `client/public/CNAME` 文件，内容为您的域名（不含 `https://`）：
   ```
   airhaohan.dev
   ```
2. 在您的域名 DNS 服务商处，添加 CNAME 记录指向 `YOUR_USERNAME.github.io`。
3. 在 GitHub Pages 设置中填写自定义域名并开启 HTTPS。

> **子目录部署注意事项：** 若仓库名不是 `username.github.io`（即部署在子路径下），需在 `vite.config.ts` 中添加：
> ```typescript
> export default defineConfig({
>   base: "/YOUR_REPO_NAME/",
>   // ...
> });
> ```

---

## 6. 部署方案 B：Vercel / Netlify

这两个平台提供更快的全球 CDN 和更简单的配置，适合希望零运维的用户。

### Vercel

1. 访问 [vercel.com](https://vercel.com) 并使用 GitHub 账号登录。
2. 点击 **Add New → Project**，导入您的 GitHub 仓库。
3. 在配置页面填写：
   - **Framework Preset：** `Vite`
   - **Root Directory：** `./`（保持默认）
   - **Build Command：** `pnpm build`
   - **Output Directory：** `dist/public`
4. 点击 **Deploy**，约 1 分钟后部署完成。

### Netlify

1. 访问 [netlify.com](https://netlify.com) 并登录。
2. 点击 **Add new site → Import an existing project**，连接 GitHub 仓库。
3. 配置构建参数：
   - **Build command：** `pnpm build`
   - **Publish directory：** `dist/public`
4. 点击 **Deploy site**。

---

## 7. 部署方案 C：自托管服务器

若您有自己的 VPS 或服务器，可使用 Nginx 托管静态文件。

### 构建并上传

```bash
# 本地构建
pnpm build

# 将 dist/public/ 目录上传到服务器
scp -r dist/public/ user@your-server:/var/www/homepage/
```

### Nginx 配置

在 `/etc/nginx/sites-available/homepage` 中创建配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/homepage;
    index index.html;

    # 支持 React Router 的客户端路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用配置并重启 Nginx：

```bash
sudo ln -s /etc/nginx/sites-available/homepage /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 8. 更新内容的日常工作流

部署完成后，日常更新内容只需以下步骤：

```bash
# 1. 修改内容文件（blogPosts.ts / videos.json / homeContent.ts 等）

# 2. 在本地预览确认效果
pnpm dev

# 3. 提交并推送（GitHub Actions 会自动重新部署）
git add .
git commit -m "content: add new blog post about XXX"
git push
```

---

## 9. 常见问题排查

| 问题 | 原因 | 解决方案 |
|---|---|---|
| `pnpm install` 失败 | Node.js 版本过低 | 升级到 Node.js 18+ |
| 页面空白，控制台报错 | 构建缓存问题 | 删除 `node_modules/.vite` 后重新 `pnpm dev` |
| GitHub Pages 部署后页面 404 | 子路径未配置 `base` | 在 `vite.config.ts` 中添加 `base: "/repo-name/"` |
| 数学公式不渲染 | KaTeX CDN 加载失败 | 检查网络，或将 KaTeX 改为本地依赖 |
| Bilibili 视频无法嵌入 | 浏览器拦截 iframe | 确保网站使用 HTTPS；部分视频可能禁止外链 |
| 论文作者名未高亮 | `highlightName` 与 BibTeX 中的拼写不一致 | 确保 `siteConfig.ts` 中的 `highlightName` 与 BibTeX author 字段完全匹配 |

---

*如有其他问题，欢迎在 GitHub Issues 中反馈。*
