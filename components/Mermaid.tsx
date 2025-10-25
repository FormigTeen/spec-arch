import React, { useEffect, useMemo, useRef } from 'react';
import mermaid from 'mermaid';

type MermaidProps = {
  chart: string;
  config?: Parameters<typeof mermaid.initialize>[0];
  className?: string;
  style?: React.CSSProperties;
};

let inited = false;
let idCounter = 0;

export const Mermaid: React.FC<MermaidProps> = ({ chart, config, className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useMemo(() => `mermaid-${++idCounter}`, []);

  useEffect(() => {
    if (!inited) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base',
        themeVariables: {
          background: 'transparent',
          primaryColor: 'rgba(56,189,248,0.08)',
          primaryBorderColor: '#e5e7eb',
          primaryTextColor: '#e5e7eb',
          secondaryColor: 'rgba(148,163,184,0.10)',
          secondaryBorderColor: '#e5e7eb',
          tertiaryColor: 'rgba(59,130,246,0.08)',
          lineColor: '#e5e7eb',
          textColor: '#e5e7eb',
          nodeTextColor: '#e5e7eb',
          nodeBorder: '#e5e7eb',
          clusterBkg: 'transparent',
          clusterBorder: '#94a3b8',
          edgeLabelBackground: '#0f172a',
        },
        themeCSS: `
          .node rect, .node path { stroke-width: 2.5px; }
          .cluster rect { stroke-width: 2px; }
          .edgePath path { stroke-width: 2.5px; }
          .label, .node text, .edgeLabel { fill: #e5e7eb; color: #e5e7eb; }
        `,
        flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' },
        ...config,
      });
      inited = true;
    }

    let cancelled = false;
    (async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (e) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre style=\"color:#ef4444\">Mermaid error: ${String(e)}</pre>`;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, config, id]);

  return <div ref={containerRef} className={className} style={style} />;
};
