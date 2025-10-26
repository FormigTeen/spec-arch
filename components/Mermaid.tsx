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
          primaryBorderColor: '#F8FAFC',
          primaryTextColor: '#F8FAFC',
          secondaryColor: 'rgba(148,163,184,0.10)',
          secondaryBorderColor: '#F8FAFC',
          tertiaryColor: 'rgba(59,130,246,0.08)',
          lineColor: '#F8FAFC',
          textColor: '#F8FAFC',
          nodeTextColor: '#F8FAFC',
          nodeBorder: '#F8FAFC',
          clusterBkg: 'transparent',
          clusterBorder: '#E2E8F0',
          edgeLabelBackground: '#0f172a',
        },
        themeCSS: `
          .node rect, .node path { stroke-width: 2.5px; }
          .cluster rect { stroke-width: 2px; }
          .edgePath path { stroke-width: 2.5px; }
          .label, .node text, .edgeLabel { fill: #F8FAFC; color: #F8FAFC; }
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
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            try {
              const preferNatural = containerRef.current.classList.contains('mermaid-natural');
              const fitHeight = containerRef.current.classList.contains('mermaid-fit-height');
              svgEl.style.display = 'block';
              svgEl.style.margin = '0 auto';
              if (fitHeight) {
                // Scale SVG to fit container height, keeping aspect ratio.
                svgEl.removeAttribute('width');
                svgEl.removeAttribute('height');
                svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                svgEl.style.maxHeight = '100%';
                svgEl.style.height = '100%';
                svgEl.style.width = 'auto';
                svgEl.style.maxWidth = '100%';
              } else if (preferNatural) {
                // Keep natural SVG sizing: remove explicit width/height to respect viewBox
                svgEl.removeAttribute('width');
                svgEl.removeAttribute('height');
                svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                svgEl.style.width = 'auto';
                svgEl.style.maxWidth = '100%';
                svgEl.style.height = 'auto';
              } else {
                // Default: responsive fill of container width
                svgEl.style.width = '100%';
                svgEl.style.maxWidth = '100%';
                svgEl.style.height = 'auto';
              }
            } catch {}
          }
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
