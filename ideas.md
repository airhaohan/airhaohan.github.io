# 个人主页设计构思 — Frutiger Aero 美学

## 设计方向探索

<response>
<idea>
**Design Movement**: Frutiger Aero Classic Revival — 2006年巅峰期的Windows Vista / Mac OS X Leopard 混合美学

**Core Principles**:
1. 玻璃拟态（Glassmorphism）：所有卡片使用半透明毛玻璃效果，背景透过模糊层隐约可见
2. 自然与科技融合：深邃的蓝绿色天空渐变背景，漂浮的半透明气泡装饰
3. 光泽感（Gloss）：按钮和卡片顶部使用白色高光渐变，模拟玻璃反光
4. 有机曲线：圆角半径极大（24px+），元素边缘柔和

**Color Philosophy**:
- 主色：深天蓝 #0A4F8C → 青绿 #0B8C6E（渐变背景）
- 玻璃层：rgba(255,255,255,0.15) 带 backdrop-filter: blur(16px)
- 高光：rgba(255,255,255,0.6) 顶部线性渐变
- 文字：深色背景上使用白色/浅蓝色

**Layout Paradigm**:
- 左侧固定 Profile 侧边栏（280px），右侧主内容区
- 顶部固定导航栏带玻璃效果
- 内容区域使用卡片式布局，卡片间有微妙的景深层次

**Signature Elements**:
1. 漂浮气泡动画（CSS keyframes，多个不同大小的半透明圆形缓慢上升）
2. 卡片玻璃边框（1px solid rgba(255,255,255,0.3)）
3. 背景使用深蓝绿色径向渐变，模拟水下/天空光线

**Interaction Philosophy**:
- hover 时卡片轻微上浮（translateY -4px）并增强背景模糊
- 导航链接有下划线光泽动画
- 页面进入时卡片从下方淡入

**Animation**:
- 气泡：从底部缓慢漂浮至顶部，透明度 0.3-0.6，持续 8-15s
- 卡片进入：opacity 0→1，translateY 20px→0，stagger 0.1s
- hover 状态：transition 0.3s ease，轻微 scale(1.02)

**Typography System**:
- 标题：Nunito（圆润感，Frutiger 精神继承者）Bold/ExtraBold
- 正文：Source Sans 3（清晰可读）Regular
- 代码：JetBrains Mono
</idea>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement**: Aqua Morphism — 苹果 Mac OS X Aqua 界面的现代诠释

**Core Principles**:
1. 液态光泽：元素表面模拟水滴/液体的光学特性
2. 深度分层：z轴上明显的层次感，阴影从柔和到浓重
3. 饱和色彩：鲜艳的蓝色和绿色，避免灰色调
4. 精细细节：1px 边框，微妙的内阴影

**Color Philosophy**:
- 背景：纯白到浅蓝灰的渐变
- 强调色：鲜艳的水蓝 #00AAFF
- 次要色：草绿 #44CC44
- 阴影：蓝色调阴影而非黑色

**Layout Paradigm**:
- 居中内容区域，最大宽度 1200px
- 顶部大 Hero 区域带动态背景
- 内容以时间线形式排列

**Signature Elements**:
1. Aqua 风格按钮（椭圆形，顶部高光）
2. 水滴形状的装饰元素
3. 彩虹色光晕效果

**Interaction Philosophy**:
- 点击时有涟漪效果
- 滚动时视差背景

**Animation**:
- 水波纹动画
- 彩虹光泽扫过效果

**Typography System**:
- 标题：Rounded Mplus 1c
- 正文：Noto Sans SC
</idea>
<probability>0.06</probability>
</response>

<response>
<idea>
**Design Movement**: Neo-Aero Holographic — Frutiger Aero 与全息投影美学的融合

**Core Principles**:
1. 全息渐变：使用彩虹色调的微妙渐变，模拟全息箔纸效果
2. 深色玻璃：深色半透明背景（不同于传统 FA 的浅色），更具科技感
3. 发光边框：元素边缘有微弱的蓝绿色发光效果
4. 自然纹理：背景融入云彩、水面、叶片等自然元素

**Color Philosophy**:
- 背景：深蓝黑 #020B18
- 玻璃层：rgba(0,180,255,0.08) 带发光边框
- 高光：青色 #00E5FF 和 绿色 #00FF88 的渐变
- 文字：白色和浅青色

**Layout Paradigm**:
- 全屏背景，内容悬浮其上
- 不对称网格布局
- 侧边栏半透明悬浮

**Signature Elements**:
1. 发光气泡（box-shadow 外发光）
2. 全息渐变文字效果
3. 扫描线纹理叠加

**Interaction Philosophy**:
- 鼠标跟随的光晕效果
- 元素出现时有扫描线动画

**Animation**:
- 全息闪烁效果
- 粒子飘散

**Typography System**:
- 标题：Orbitron（科技感）
- 正文：Exo 2
</idea>
<probability>0.07</probability>
</response>

---

## 选定方案

**选择方案一：Frutiger Aero Classic Revival**

理由：最忠实于 Frutiger Aero 美学的核心精神——自然与科技的和谐共存，玻璃质感与有机曲线的完美结合。这种风格既有学术主页的专业感，又有独特的视觉个性。
