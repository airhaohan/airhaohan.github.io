import profilePic from "../data/profile.jpg";

/**
 * Global site configuration
 * Frutiger Aero Classic Revival — Edit this file to update all site info
 */

// TAG: Site Config
export const siteConfig = {
  name: "airhaohan",
  fullName: "Yongsheng Yan(严永升)",
  title: "PhD Student | Researcher",
  affiliation: "BZ Lab & Swift Lab",
  university: "Fudan University",
  status: "🔬 Actively Researching",
  avatar: profilePic,
  bio: "AI Infra / ML System 方向的研究学者，主要关注移动设备上的推理系统优化。致力于让大模型在边缘设备上高效运行，探索软硬件协同优化的新范式。",
  address: "Fudan University, Shanghai, China",
  address1: "Duke Kunshan University, Suzhou, China",
  email: "ysyan24@m.fudan.edu.cn",
  bilibiliId: "bili_73334196959",
  bilibiliUid: "365866880",
  bilibiliName: "我是小小升",
  highlightName: "Yongsheng Yan",
  social: {
    github: "https://github.com/airhaohan",
    bilibili: "https://space.bilibili.com/365866880",
    googleScholar: "",
    twitter: "",
    linkedin: "",
    zhihu: "",
  },
  research: {
    interests: [
      "Mobile LLM Inference",
      "On-device AI Systems",
      "Neural Network Compression",
      "Hardware-Software Co-design",
      "Edge Computing",
    ],
  },
};

export type SiteConfig = typeof siteConfig;
