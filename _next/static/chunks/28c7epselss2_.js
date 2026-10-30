(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[79670,e=>{var t=e.i(89975),i=e.i(79746),a=e.i(84351),s=e.i(49765),l=e.i(7083),r=e.i(67815),n=e.i(80830),c=e.i(73772),o=e.i(68610),d=e.i(12955);function u({project:e}){return(0,t.jsxs)(o.f,{href:`/work/${e.slug}`,className:d.default.tile,"data-tile":!0,children:[(0,t.jsx)("div",{className:d.default.imgWrapper,children:(0,t.jsx)(c.f,{project:e.slug,img:e.images[0],sizes:"(max-width: 768px) 100vw, 50vw"})}),(0,t.jsxs)("div",{className:d.default.textStack,children:[(0,t.jsx)("h2",{className:d.default.title,children:e.title}),(0,t.jsxs)("p",{className:d.default.subTitle,children:[e.year," | ",e.tags.join(", ")]})]})]})}var m=e.i(31777);function f({projects:e}){return(0,t.jsx)(a.f,{className:m.default.projectGrid,rowGap:"condensed",colGap:"condensed",children:e.map(e=>(0,t.jsx)(s.f,{md:"span 2",children:(0,t.jsx)(u,{project:e})},e.slug))})}var h=e.i(24514),p=e.i(43305);e.s(["default",0,function({header:e,projects:c}){let[o,d]=(0,i.useState)("grid");return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(l.f,{pad:"spacious",gap:"normal",vh:!0,className:p.default.section,theme:"default",children:[(0,t.jsxs)(a.f,{rowGap:"normal",children:[(0,t.jsx)(s.f,{md:"1 / span 2",className:p.default.title,children:(0,t.jsx)("h1",{children:e.title})}),(0,t.jsxs)(s.f,{md:"3 / span 2",className:p.default.toggle,children:[(0,t.jsx)(r.f,{label:"Grid",size:"medium",variant:"secondary",icon:{iconName:"grid_view"},iconPos:"start",onClick:()=>d("grid"),disabled:"grid"===o}),(0,t.jsx)(r.f,{label:"List",size:"medium",variant:"secondary",icon:{iconName:"menu"},iconPos:"start",onClick:()=>d("list"),disabled:"list"===o})]})]}),"grid"===o?(0,t.jsx)(f,{projects:c}):(0,t.jsx)(h.f,{projects:c,showImage:!0})]}),(0,t.jsx)(n.f,{})]})}],79670)},73772,98820,e=>{var t=e.i(89975);let i=[640,1080,1920,2560];function a({section:e="work",project:t,filename:i,size:s}){let l=i.replace(/\.(jpg|jpeg|png|webp)$/i,".webp");return`/media/${e}/${t}/images/${s}/${l}`}e.s(["g",0,function(e,t="work"){let s=window.innerWidth,l=i.find(e=>s<=e)??2560,[r,n]=e.split("/");return a({section:t,project:r,filename:n,size:l})},"b",0,a],98820);var s=e.i(44927);e.s(["f",0,function({section:e="work",project:l,img:r,sizes:n="100vw",loading:c="lazy"}){let o=r.src,d=i.map(t=>`${a({section:e,project:l,filename:o,size:t})} ${t}w`).join(", "),u=a({section:e,project:l,filename:o,size:1920});return(0,t.jsxs)("figure",{className:s.default.figure,children:[(0,t.jsx)("div",{className:s.default.imgWrapper,"data-aspect-ratio":r.aspect??"ignore",children:(0,t.jsx)("img",{className:s.default.image,src:u,srcSet:d,sizes:n,alt:r.alt,loading:c,decoding:"async",style:{objectPosition:`${r.focusX} ${r.focusY}`}})}),(r.caption||r.credits)&&(0,t.jsxs)("figcaption",{children:[r.caption&&(0,t.jsx)("span",{className:s.default.caption,children:r.caption}),r.credits&&(0,t.jsx)("span",{className:s.default.credits,children:r.credits})]})]})}],73772)},67815,e=>{var t=e.i(89975),i=e.i(38168),a=e.i(68610),s=e.i(13056);let l={small:"small",medium:"small",large:"medium"};e.s(["f",0,e=>{let{label:r,variant:n="primary",size:c="medium",icon:o,iconPos:d,disabled:u=!1}=e,m="icon-only"===d,f=[s.default.btn,m?s.default.btn_icon_only:"",u?s.default.btn_disabled:""].filter(Boolean).join(" "),h=o?(0,t.jsx)("div",{className:s.default.iconWrapper,children:(0,t.jsx)(i.f,{...o,size:l[c]})}):null,p=(0,t.jsxs)(t.Fragment,{children:[("start"===d||m)&&h,!m&&(0,t.jsx)("span",{className:`label-${c}`,children:r}),"end"===d&&h]}),g={className:f,"data-variant":n,"data-size":c,"aria-label":m?r:void 0};if(void 0!==e.href){let{href:i,newTab:s,onClick:l}=e;return(0,t.jsx)(a.f,{...g,href:i,newTab:s,"aria-disabled":u||void 0,tabIndex:u?-1:void 0,onClick:e=>{u?e.preventDefault():l?.(e)},children:p})}return(0,t.jsx)("button",{...g,onClick:e.onClick,type:e.type??"button",disabled:u,children:p})}])},93092,e=>{var t=e.i(89975),i=e.i(35974);let a=/(\[.*?\]|\{br\}|\{link:[^}]*\}.*?\{\/link\})/g,s=/^\{link:([^}]*)\}([\s\S]*)\{\/link\}$/;e.s(["f",0,function({text:e,className:l,linkClassName:r,linkArrow:n=!1,linkHasUnderline:c=!1}){let o=e.split(a);return(0,t.jsx)(t.Fragment,{children:o.map((e,a)=>{if("{br}"===e)return(0,t.jsx)("br",{},`${e}-${a.toString()}`);if(e.startsWith("[")&&e.endsWith("]"))return(0,t.jsx)("span",{className:l,children:e.slice(1,-1)},`${e}-${a.toString()}`);let o=e.match(s);if(o){let[,s,l]=o;return(0,t.jsx)(i.f,{href:s,className:r,arrow:n,hasUnderline:c,children:l},`${e}-${a.toString()}`)}return e})})}])},80830,e=>{var t=e.i(89975),i=e.i(46282),a=e.i(20023),s=e.i(87976),l=e.i(79746),r=e.i(63733),n=e.i(41124),c=e.i(88177);let o=`
    uniform float u_time;
    uniform vec3 u_bgColor;
    uniform vec3 u_highlightColor;
    uniform float u_aspect;
    uniform float u_gridDensity; // dots per unit — higher = smaller/more dots
    varying vec2 vUv;

    float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }

    float valueNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f); // smoothstep interpolation

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
            value += amplitude * valueNoise(p);
            p *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        vec2 uv = vUv;
        uv.x *= u_aspect;

        vec2 grid = uv * u_gridDensity;
        vec2 cellId = floor(grid);
        vec2 cellUv = fract(grid) - 0.5; // centered -0.5 to 0.5 within each cell

        // Slowly drifting noise field — the time offset is what makes dots
        // grow/shrink and the pattern reorganize gradually rather than being static
        float brightness = fbm(cellId * 0.2 + vec2(u_time * 0.5, u_time * 0.2));
        brightness = pow(brightness, 1.4); // push contrast so dark areas stay darker

        float dotRadius = brightness * 0.48; // max radius stays inside the cell
        float dist = length(cellUv);

        float dot = 1.0 - smoothstep(dotRadius - 0.06, dotRadius, dist);
        float glow = (1.0 - smoothstep(dotRadius, dotRadius + 0.35, dist)) * brightness * 0.4;

        vec3 color = mix(u_bgColor, u_highlightColor, dot);
        color += u_highlightColor * glow;

        gl_FragColor = vec4(color, 1.0);
    }
`,d=`
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,u=(0,r.f)({u_time:0,u_bgColor:new c.Es("#0a0620"),u_highlightColor:new c.Es("#3a1fe0"),u_aspect:1,u_gridDensity:24},d,o);function m({bgColor:e,highlightColor:i,gridDensity:r}){let n=(0,l.useRef)(null),{viewport:c}=(0,s.f)();(0,l.useEffect)(()=>{let t=n.current;t&&(e&&t.uniforms.u_bgColor.value.set(e),i&&t.uniforms.u_highlightColor.value.set(i),r&&(t.uniforms.u_gridDensity.value=r))},[e,i,r]);let o=(0,l.useRef)(0);return(0,a.f)((e,t)=>{o.current+=t;let i=n.current;i&&(i.uniforms.u_time.value=o.current,i.uniforms.u_aspect.value=c.width/c.height)}),(0,t.jsxs)("mesh",{scale:[c.width,c.height,1],children:[(0,t.jsx)("planeGeometry",{}),(0,t.jsx)("halftoneMatrixMaterial",{ref:n})]})}function f({bgColor:e,highlightColor:a,gridDensity:s}){return(0,t.jsx)("div",{style:{position:"absolute",inset:0,width:"100%",height:"100%"},children:(0,t.jsx)(i.f,{children:(0,t.jsx)(m,{bgColor:e,highlightColor:a,gridDensity:s})})})}(0,n.f)({HalftoneMatrixMaterial:u});var h=e.i(84351),p=e.i(49765),g=e.i(7083),v=e.i(67815),x=e.i(93092);let j=e.i(54812).default;var _=e.i(5709);e.s(["f",0,function(){return(0,t.jsxs)(g.f,{pad:"spacious",id:"contact",valign:"center",theme:"default",children:[(0,t.jsx)(g.f.Background,{color:"accent",children:(0,t.jsx)(f,{bgColor:"#FEFBFE",highlightColor:"#4332FF",gridDensity:50})}),(0,t.jsx)(h.f,{children:(0,t.jsxs)(p.f,{className:_.default.content,md:"2 / span 2",children:[(0,t.jsxs)("div",{className:_.default.textStack,children:[j.teaser.supTitle&&(0,t.jsx)("span",{className:_.default.supTitle,children:(0,t.jsx)(x.f,{text:j.teaser.supTitle,className:_.default.titleAlt})}),j.teaser.title&&(0,t.jsx)("h2",{className:_.default.title,children:(0,t.jsx)(x.f,{text:j.teaser.title,className:_.default.titleAlt})}),j.teaser.subTitle&&(0,t.jsx)("p",{className:_.default.subTitle,children:(0,t.jsx)(x.f,{text:j.teaser.subTitle,className:_.default.titleAlt})})]}),(0,t.jsxs)("div",{className:_.default.ctaWrapper,children:[(0,t.jsx)(v.f,{variant:"primary",label:"Book a call",href:"https://calendar.app.google/s4ZFtdqrwTnP8w1E9",size:"medium"}),(0,t.jsx)(v.f,{variant:"secondary",label:"Get In Touch",href:"/contact",size:"medium"})]})]})})]})}],80830)},24514,e=>{var t=e.i(89975),i=e.i(79746),a=e.i(84351),s=e.i(49765),l=e.i(73772),r=e.i(68610),n=e.i(12846);e.s(["f",0,function({projects:e,showImage:c=!1,minHeight:o=!1}){let[d,u]=(0,i.useState)(0),m=(0,i.useMemo)(()=>e.map(e=>(function(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i)|0;return 1+Math.abs(t)%1e3/1e3*.2})(e.slug)),[e]);return(0,t.jsx)("div",{"data-min-height":o,children:(0,t.jsxs)(a.f,{className:n.default.grid,children:[(0,t.jsx)(s.f,{children:(0,t.jsx)("ul",{className:n.default.projects,children:e.map((e,i)=>(0,t.jsx)("li",{className:n.default.projectItemWrapper,onMouseEnter:()=>u(i),children:(0,t.jsx)(r.f,{className:n.default.projectItem,href:`/work/${e.slug}`,children:(0,t.jsxs)("div",{className:n.default.textStack,children:[(0,t.jsx)("span",{className:n.default.id,children:`0${i+1}`}),(0,t.jsx)("span",{className:n.default.title,children:e.title}),(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{className:n.default.tags,children:e.tags.join(", ")}),(0,t.jsx)("span",{className:n.default.year,children:e.year})]})]})})},e.slug))})}),c&&(0,t.jsx)("div",{className:n.default.imageStack,children:e.map((i,a)=>{let s=a-d,r=Math.min(Math.abs(s),7),c=0===s,o=Math.sign(-1*s),u=(c?1:1-.025*r)*m[a],f=c?e.length+1:e.length-r;return(0,t.jsx)("div",{className:`${n.default.stackItem} ${c?n.default.stackItemActive:""}`,style:{transform:`translate3d(0, ${c?16:-o*(26+34*r+r**1.4*6)}px, ${c?60:-(90*r)}px) scale(${u})`,opacity:1,zIndex:f},children:(0,t.jsx)(l.f,{project:i.slug,img:i.images[0],sizes:"40vw"})},i.slug)})})]})})}])}],54812,(e,t,i)=>{t.exports={header:{sectionTitle:"Get In Touch",title:"The most unexpected collaborations {br}[start with a simple conversation]",titleLimit:!1,titleScale:"small"},contactForm:{inputs:[{type:"text",id:"name",label:"Name",placeholder:"Bart Simpson"},{type:"email",id:"email",label:"Email",placeholder:"ay.caramba@email.com"},{type:"textarea",id:"message",label:"Message",placeholder:"Whether it’s a commission, a collaboration, or simply a question — send a message and we’ll take it from there."}],cta:{default:"Send",inProgress:"Sending ..."},messages:{error:"Something went wrong. Please try again.",success:"Your message was sent successfully. {br}We will be in touch shortly."}},teaser:{title:"Ready to create {br}something together?",subTitle:"Whether it’s a commission, a collaboration, or simply a question — don’t hesitate to reach out. Book a call for a direct conversation, or send a message and we’ll take it from there."}}},43305,e=>{e.v({section:"t-ObYq_section",title:"t-ObYq_title",toggle:"t-ObYq_toggle"})},44927,e=>{e.v({caption:"O_ok9q_caption",credits:"O_ok9q_credits",figure:"O_ok9q_figure",image:"O_ok9q_image",imgWrapper:"O_ok9q_imgWrapper"})},13056,e=>{e.v({btn:"xmyNjG_btn",btn_icon_only:"xmyNjG_btn_icon_only",iconWrapper:"xmyNjG_iconWrapper"})},12955,e=>{e.v({imgWrapper:"_5DX0cq_imgWrapper",subTitle:"_5DX0cq_subTitle",textStack:"_5DX0cq_textStack",tile:"_5DX0cq_tile",title:"_5DX0cq_title"})},5709,e=>{e.v({content:"vZC9IW_content",ctaWrapper:"vZC9IW_ctaWrapper",supTitle:"vZC9IW_supTitle",textStack:"vZC9IW_textStack",title:"vZC9IW_title",titleAlt:"vZC9IW_titleAlt"})},31777,e=>{e.v({projectGrid:"NBgEpa_projectGrid"})},12846,e=>{e.v({grid:"PEYVDq_grid",id:"PEYVDq_id",imageStack:"PEYVDq_imageStack",projectItem:"PEYVDq_projectItem",projectItemWrapper:"PEYVDq_projectItemWrapper",projects:"PEYVDq_projects",stackItem:"PEYVDq_stackItem",stackItemActive:"PEYVDq_stackItemActive",tags:"PEYVDq_tags",textStack:"PEYVDq_textStack",title:"PEYVDq_title",year:"PEYVDq_year"})}]);