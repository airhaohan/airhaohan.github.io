/**
 * Publications Page — Frutiger Aero Classic Revival
 * Parses BibTeX data and displays papers with author highlighting
 */

import { useMemo, useState } from "react";
import { parseBibTeX, highlightAuthor, type Paper } from "@/lib/parseBib";
import { siteConfig } from "@/lib/siteConfig";
import { FileText, ExternalLink, ChevronDown, ChevronUp, Award, BookOpen, FileCode } from "lucide-react";

// TAG: Publications
// Import raw bib content as string
// @inproceedings{haohan2025edgellm,
//   title     = {EdgeLLM: Adaptive KV Cache Management for On-Device Large Language Models},
//   author    = {Haohan and Zhang, Wei and Li, Jing and Chen, Xiaoming},
//   booktitle = {Proceedings of the 23rd Annual International Conference on Mobile Systems, Applications, and Services (MobiSys)},
//   year      = {2025},
//   venue     = {MobiSys 2025},
//   url       = {https://dl.acm.org/doi/example},
//   abstract  = {We present EdgeLLM, a system that enables efficient large language model inference on mobile devices through adaptive KV cache management. Our approach dynamically adjusts cache allocation based on available memory and inference workload, achieving up to 3.2x speedup over baseline systems.}
// }

// @inproceedings{haohan2024quantile,
//   title     = {QuanTile: Tile-based Quantization for Efficient Mobile Transformer Inference},
//   author    = {Haohan and Wang, Fei and Liu, Yang and Zhao, Rui},
//   booktitle = {Proceedings of the 7th Conference on Machine Learning and Systems (MLSys)},
//   year      = {2024},
//   venue     = {MLSys 2024},
//   url       = {https://proceedings.mlsys.org/example},
//   abstract  = {QuanTile introduces a novel tile-based quantization scheme that exploits the tiled memory access patterns of mobile NPUs to minimize quantization error while maximizing hardware utilization.}
// }

// @inproceedings{haohan2024mobilenas,
//   title     = {Hardware-Aware Neural Architecture Search for Mobile Edge Inference},
//   author    = {Haohan and Sun, Kai and Wu, Mingzhe and Peng, Jie},
//   booktitle = {Workshop on Mobile Artificial Intelligence, European Conference on Computer Vision (ECCV)},
//   year      = {2024},
//   venue     = {MobileAI @ ECCV 2024},
//   note      = {Best Paper Award},
//   url       = {https://arxiv.org/example},
//   abstract  = {We propose a hardware-aware NAS framework that jointly optimizes model accuracy and inference latency on heterogeneous mobile SoCs, considering the distinct characteristics of CPU, GPU, and NPU cores.}
// }

// @article{haohan2024heteroscheduler,
//   title     = {HeteroScheduler: Latency-Aware Operator Scheduling for Heterogeneous Mobile NPUs},
//   author    = {Haohan and Guo, Lin and Tang, Hao and Zhou, Xin},
//   journal   = {arXiv preprint arXiv:2408.XXXXX},
//   year      = {2024},
//   venue     = {arXiv 2024},
//   url       = {https://arxiv.org/abs/2408.XXXXX},
//   abstract  = {HeteroScheduler is a runtime scheduling framework that dynamically dispatches neural network operators across heterogeneous compute units in mobile SoCs, guided by fine-grained latency profiling.}
// }

// @inproceedings{haohan2023kvcompress,
//   title     = {KVCompress: Memory-Efficient KV Cache Compression for Transformer Inference on Mobile Devices},
//   author    = {Haohan and Li, Zhen and Huang, Qing and Ma, Shuai},
//   booktitle = {Proceedings of the 21st ACM International Conference on Mobile Computing and Networking (MobiCom)},
//   year      = {2023},
//   venue     = {MobiCom 2023},
//   url       = {https://dl.acm.org/doi/example2},
//   abstract  = {KVCompress reduces the memory footprint of KV caches in transformer models through a combination of selective eviction, mixed-precision storage, and lossless compression, enabling longer context windows on memory-constrained mobile devices.}
// }

// @inproceedings{haohan2023opfusion,
//   title     = {OpFusion: Automatic Operator Fusion for Neural Network Inference on Mobile NPUs},
//   author    = {Haohan and Chen, Bo and Xu, Tao and Liang, Shuai},
//   booktitle = {Proceedings of the 60th ACM/IEEE Design Automation Conference (DAC)},
//   year      = {2023},
//   venue     = {DAC 2023},
//   url       = {https://ieeexplore.ieee.org/example},
//   abstract  = {We present OpFusion, a compiler-level framework that automatically identifies and fuses operator patterns in neural networks to reduce memory bandwidth consumption and improve inference throughput on mobile NPUs.}
// }
const bibContent = `
`;

function AuthorList({ authors, highlightName }: { authors: string[]; highlightName: string }) {
  const highlighted = highlightAuthor(authors, highlightName);
  return (
    <span>
      {highlighted.map((a, i) => (
        <span key={i}>
          {i > 0 && ", "}
          {a.isHighlighted ? (
            <strong
              style={{
                color: "#7DD3FC",
                fontWeight: 700,
                textDecoration: "underline",
                textDecorationColor: "rgba(74,173,232,0.5)",
                textUnderlineOffset: "2px",
              }}
            >
              {a.name}
            </strong>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{a.name}</span>
          )}
        </span>
      ))}
    </span>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  const [showAbstract, setShowAbstract] = useState(false);

  const typeIcon = paper.type === "article"
    ? <FileCode size={14} />
    : <BookOpen size={14} />;

  const typeLabel = paper.type === "article" ? "Preprint" : "Conference";

  return (
    <div
      className="glass-card transition-all duration-300"
      style={{ padding: "1.5rem" }}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "0.6rem",
            background: "linear-gradient(135deg, rgba(74,173,232,0.3), rgba(11,140,110,0.3))",
            border: "1px solid rgba(74,173,232,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "#4AADE8",
          }}
        >
          {typeIcon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              color: "white",
              lineHeight: 1.4,
              marginBottom: "0.4rem",
            }}
          >
            {paper.title}
          </h3>

          <p style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
            <AuthorList authors={paper.authors} highlightName={siteConfig.highlightName} />
          </p>

          <div className="flex items-center flex-wrap gap-2">
            <span
              style={{
                fontSize: "0.82rem",
                color: "#86EFAC",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: "0.5rem",
                padding: "0.15rem 0.5rem",
              }}
            >
              {paper.venue}
            </span>
            <span
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
              }}
            >
              {paper.year}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "rgba(74,173,232,0.7)",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
                background: "rgba(74,173,232,0.1)",
                border: "1px solid rgba(74,173,232,0.2)",
                borderRadius: "0.5rem",
                padding: "0.1rem 0.45rem",
              }}
            >
              {typeLabel}
            </span>
            {paper.note && (
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "#FCD34D",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  background: "rgba(252,211,77,0.12)",
                  border: "1px solid rgba(252,211,77,0.3)",
                  borderRadius: "0.5rem",
                  padding: "0.1rem 0.45rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <Award size={10} />
                {paper.note}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {paper.url && (
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="aero-btn flex items-center gap-1.5 px-3 py-1.5 text-xs"
            style={{ textDecoration: "none" }}
          >
            <ExternalLink size={11} />
            Paper
          </a>
        )}

        {paper.abstract && (
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {showAbstract ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            Abstract
          </button>
        )}
      </div>

      {/* Abstract */}
      {showAbstract && paper.abstract && (
        <div
          style={{
            marginTop: "0.75rem",
            padding: "0.875rem",
            background: "rgba(10,50,100,0.4)",
            border: "1px solid rgba(74,173,232,0.2)",
            borderRadius: "0.75rem",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
          }}
        >
          {paper.abstract}
        </div>
      )}
    </div>
  );
}

export default function Publications() {
  const papers = useMemo(() => parseBibTeX(bibContent), []);

  // Group by year
  const papersByYear = useMemo(() => {
    const grouped: Record<string, Paper[]> = {};
    papers.forEach(p => {
      if (!grouped[p.year]) grouped[p.year] = [];
      grouped[p.year].push(p);
    });
    return Object.entries(grouped).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  }, [papers]);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "3rem" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Header */}
        <div className="fade-in-up" style={{ marginBottom: "2rem" }}>
          <h1 className="heading-aero" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            <FileText size={28} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
            Publications
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
            {papers.length} publications · <strong style={{ color: "#7DD3FC" }}>{siteConfig.highlightName}</strong> is highlighted in author lists.
          </p>
        </div>

        {/* Stats */}
        <div
          className="glass-card fade-in-up delay-100"
          style={{
            padding: "1.25rem",
            marginBottom: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            { label: "Total Papers", value: papers.length, color: "#4AADE8" },
            { label: "Conferences", value: papers.filter(p => p.type !== "article").length, color: "#86EFAC" },
            { label: "Preprints", value: papers.filter(p => p.type === "article").length, color: "#FCD34D" },
            { label: "Best Paper", value: papers.filter(p => p.note).length, color: "#F9A8D4" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.8rem",
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Papers by year */}
        {papersByYear.map(([year, yearPapers], yi) => (
          <div key={year} className="fade-in-up" style={{ animationDelay: `${yi * 0.1}s`, marginBottom: "2rem" }}>
            <div
              className="flex items-center gap-3 mb-3"
              style={{ paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.4rem",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {year}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 600,
                }}
              >
                {yearPapers.length} paper{yearPapers.length > 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {yearPapers.map(paper => (
                <PaperCard key={paper.key} paper={paper} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
