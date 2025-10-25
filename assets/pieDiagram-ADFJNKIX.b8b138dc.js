import{aG as x,aH as F,aI as H,F as J,o as Z,p as q,s as K,g as Q,c as X,b as Y,_ as g,l as G,v as ee,d as te,G as ae,aE as re,aJ as ne,k as ie}from"./index.fe9e75aa.js";import{p as se}from"./chunk-4BX2VUAB.2ba4a5f8.js";import{p as le}from"./mermaid-parser.core.4086cd04.js";import{d as L}from"./arc.fad65368.js";import{o as oe}from"./ordinal.d6400369.js";import"./_baseUniq.48926655.js";import"./_basePickBy.c407a95d.js";import"./clone.ae902852.js";import"./init.0b4a962a.js";function ce(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ue(e){return e}function pe(){var e=ue,a=ce,m=null,y=x(0),s=x(F),o=x(0);function l(t){var n,c=(t=H(t)).length,u,S,v=0,p=new Array(c),i=new Array(c),f=+y.apply(this,arguments),w=Math.min(F,Math.max(-F,s.apply(this,arguments)-f)),h,$=Math.min(Math.abs(w)/c,o.apply(this,arguments)),T=$*(w<0?-1:1),d;for(n=0;n<c;++n)(d=i[p[n]=n]=+e(t[n],n,t))>0&&(v+=d);for(a!=null?p.sort(function(D,C){return a(i[D],i[C])}):m!=null&&p.sort(function(D,C){return m(t[D],t[C])}),n=0,S=v?(w-c*T)/v:0;n<c;++n,f=h)u=p[n],d=i[u],h=f+(d>0?d*S:0)+T,i[u]={data:t[u],index:n,value:d,startAngle:f,endAngle:h,padAngle:$};return i}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:x(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,m=null,l):a},l.sort=function(t){return arguments.length?(m=t,a=null,l):m},l.startAngle=function(t){return arguments.length?(y=typeof t=="function"?t:x(+t),l):y},l.endAngle=function(t){return arguments.length?(s=typeof t=="function"?t:x(+t),l):s},l.padAngle=function(t){return arguments.length?(o=typeof t=="function"?t:x(+t),l):o},l}var W=J.pie,z={sections:new Map,showData:!1,config:W},E=z.sections,N=z.showData,ge=structuredClone(W),de=g(()=>structuredClone(ge),"getConfig"),fe=g(()=>{E=new Map,N=z.showData,ee()},"clear"),me=g(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);E.has(e)||(E.set(e,a),G.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=g(()=>E,"getSections"),ve=g(e=>{N=e},"setShowData"),xe=g(()=>N,"getShowData"),_={getConfig:de,clear:fe,setDiagramTitle:Z,getDiagramTitle:q,setAccTitle:K,getAccTitle:Q,setAccDescription:X,getAccDescription:Y,addSection:me,getSections:he,setShowData:ve,getShowData:xe},ye=g((e,a)=>{se(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),Se={parse:g(async e=>{const a=await le("pie",e);G.debug(a),ye(a,_)},"parse")},we=g(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),Ae=we,De=g(e=>{const a=[...e.values()].reduce((s,o)=>s+o,0),m=[...e.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return pe().value(s=>s.value)(m)},"createPieArcs"),Ce=g((e,a,m,y)=>{G.debug(`rendering pie chart
`+e);const s=y.db,o=te(),l=ae(s.getConfig(),o.pie),t=40,n=18,c=4,u=450,S=u,v=re(a),p=v.append("g");p.attr("transform","translate("+S/2+","+u/2+")");const{themeVariables:i}=o;let[f]=ne(i.pieOuterStrokeWidth);f!=null||(f=2);const w=l.textPosition,h=Math.min(S,u)/2-t,$=L().innerRadius(0).outerRadius(h),T=L().innerRadius(h*w).outerRadius(h*w);p.append("circle").attr("cx",0).attr("cy",0).attr("r",h+f/2).attr("class","pieOuterCircle");const d=s.getSections(),D=De(d),C=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let b=0;d.forEach(r=>{b+=r});const I=D.filter(r=>(r.data.value/b*100).toFixed(0)!=="0"),k=oe(C);p.selectAll("mySlices").data(I).enter().append("path").attr("d",$).attr("fill",r=>k(r.data.label)).attr("class","pieCircle"),p.selectAll("mySlices").data(I).enter().append("text").text(r=>(r.data.value/b*100).toFixed(0)+"%").attr("transform",r=>"translate("+T.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-(u-50)/2).attr("class","pieTitleText");const O=[...d.entries()].map(([r,A])=>({label:r,value:A})),M=p.selectAll(".legend").data(O).enter().append("g").attr("class","legend").attr("transform",(r,A)=>{const R=n+c,V=R*O.length/2,U=12*n,j=A*R-V;return"translate("+U+","+j+")"});M.append("rect").attr("width",n).attr("height",n).style("fill",r=>k(r.label)).style("stroke",r=>k(r.label)),M.append("text").attr("x",n+c).attr("y",n-c).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const B=Math.max(...M.selectAll("text").nodes().map(r=>{var A;return(A=r==null?void 0:r.getBoundingClientRect().width)!=null?A:0})),P=S+t+n+c+B;v.attr("viewBox",`0 0 ${P} ${u}`),ie(v,u,P,l.useMaxWidth)},"draw"),$e={draw:Ce},Ie={parser:Se,db:_,renderer:$e,styles:Ae};export{Ie as diagram};
