(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,54812,(e,t,l)=>{t.exports={header:{sectionTitle:"Get In Touch",title:"The most unexpected collaborations {br}[start with a simple conversation]",titleLimit:!1,titleScale:"small"},contactForm:{inputs:[{type:"text",id:"name",label:"Name",placeholder:"Bart Simpson"},{type:"email",id:"email",label:"Email",placeholder:"ay.caramba@email.com"},{type:"textarea",id:"message",label:"Message",placeholder:"Whether it’s a commission, a collaboration, or simply a question — send a message and we’ll take it from there."}],cta:{default:"Send",inProgress:"Sending ..."},messages:{error:"Something went wrong. Please try again.",success:"Your message was sent successfully. {br}We will be in touch shortly."}},teaser:{title:"Ready to create {br}something together?",subTitle:"Whether it’s a commission, a collaboration, or simply a question — don’t hesitate to reach out. Book a call for a direct conversation, or send a message and we’ll take it from there."}}},5709,e=>{e.v({content:"styles-module__vZC9IW__content",ctaWrapper:"styles-module__vZC9IW__ctaWrapper",supTitle:"styles-module__vZC9IW__supTitle",textStack:"styles-module__vZC9IW__textStack",title:"styles-module__vZC9IW__title",titleAlt:"styles-module__vZC9IW__titleAlt"})},73772,98820,80830,e=>{"use strict";var t=e.i(43476);let l=[640,1080,1920,2560];function s({section:e="work",project:t,filename:l,size:a}){let i=l.replace(/\.(jpg|jpeg|png|webp)$/i,".webp");return`/media/${e}/${t}/images/${a}/${i}`}e.s(["getOptimisedSrc",0,function(e,t="work"){let a=window.innerWidth,i=l.find(e=>a<=e)??2560,[r,o]=e.split("/");return s({section:t,project:r,filename:o,size:i})},"mediaPath",0,s],98820);var a=e.i(44927);e.s(["default",0,function({section:e="work",project:i,img:r,sizes:o="100vw",loading:n="lazy"}){let d=r.src,c=l.map(t=>`${s({section:e,project:i,filename:d,size:t})} ${t}w`).join(", "),u=s({section:e,project:i,filename:d,size:1920});return(0,t.jsxs)("figure",{className:a.default.figure,children:[(0,t.jsx)("div",{className:a.default.imgWrapper,"data-aspect-ratio":r.aspect??"ignore",children:(0,t.jsx)("img",{className:a.default.image,src:u,srcSet:c,sizes:o,alt:r.alt,loading:n,decoding:"async",style:{objectPosition:`${r.focusX} ${r.focusY}`}})}),(r.caption||r.credits)&&(0,t.jsxs)("figcaption",{children:[r.caption&&(0,t.jsx)("span",{className:a.default.caption,children:r.caption}),r.credits&&(0,t.jsx)("span",{className:a.default.credits,children:r.credits})]})]})}],73772);let i=e.i(54812).default;var r=e.i(5709),o=e.i(7083),n=e.i(84351),d=e.i(49765),c=e.i(67815),u=e.i(93092),m=e.i(75056),_=e.i(94800),h=e.i(48546),p=e.i(71645),f=e.i(35517),g=e.i(69096),x=e.i(90072);let v=`
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,y=`
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
`,j=(0,f.shaderMaterial)({u_time:0,u_bgColor:new x.Color("#0a0620"),u_highlightColor:new x.Color("#3a1fe0"),u_aspect:1,u_gridDensity:24},v,y);function b({bgColor:e,highlightColor:l,gridDensity:s}){let a=(0,p.useRef)(null),{viewport:i}=(0,h.useThree)();return(0,p.useEffect)(()=>{let t=a.current;t&&(e&&t.uniforms.u_bgColor.value.set(e),l&&t.uniforms.u_highlightColor.value.set(l),s&&(t.uniforms.u_gridDensity.value=s))},[e,l,s]),(0,_.useFrame)(({clock:e})=>{let t=a.current;t&&(t.uniforms.u_time.value=e.elapsedTime,t.uniforms.u_aspect.value=i.width/i.height)}),(0,t.jsxs)("mesh",{scale:[i.width,i.height,1],children:[(0,t.jsx)("planeGeometry",{}),(0,t.jsx)("halftoneMatrixMaterial",{ref:a})]})}function k({bgColor:e,highlightColor:l,gridDensity:s}){return(0,t.jsx)("div",{style:{position:"absolute",inset:0,width:"100%",height:"100%"},children:(0,t.jsx)(m.Canvas,{children:(0,t.jsx)(b,{bgColor:e,highlightColor:l,gridDensity:s})})})}(0,g.extend)({HalftoneMatrixMaterial:j}),e.s(["default",0,function(){return(0,t.jsxs)(o.default,{pad:"spacious",id:"contact",valign:"center",theme:"default",children:[(0,t.jsx)(o.default.Background,{color:"accent",children:(0,t.jsx)(k,{bgColor:"#FEFBFE",highlightColor:"#4332FF",gridDensity:50})}),(0,t.jsx)(n.default,{children:(0,t.jsxs)(d.default,{className:r.default.content,md:"2 / span 2",children:[(0,t.jsxs)("div",{className:r.default.textStack,children:[i.teaser.supTitle&&(0,t.jsx)("span",{className:r.default.supTitle,children:(0,t.jsx)(u.default,{text:i.teaser.supTitle,className:r.default.titleAlt})}),i.teaser.title&&(0,t.jsx)("h2",{className:r.default.title,children:(0,t.jsx)(u.default,{text:i.teaser.title,className:r.default.titleAlt})}),i.teaser.subTitle&&(0,t.jsx)("p",{className:r.default.subTitle,children:(0,t.jsx)(u.default,{text:i.teaser.subTitle,className:r.default.titleAlt})})]}),(0,t.jsxs)("div",{className:r.default.ctaWrapper,children:[(0,t.jsx)(c.Button,{variant:"primary",label:"Book a call",href:"https://calendar.app.google/s4ZFtdqrwTnP8w1E9",size:"medium"}),(0,t.jsx)(c.Button,{variant:"secondary",label:"Get In Touch",href:"/contact",size:"medium"})]})]})})]})}],80830)},44927,e=>{e.v({caption:"styles-module__O_ok9q__caption",credits:"styles-module__O_ok9q__credits",figure:"styles-module__O_ok9q__figure",image:"styles-module__O_ok9q__image",imgWrapper:"styles-module__O_ok9q__imgWrapper"})},67815,e=>{"use strict";var t=e.i(43476),l=e.i(13056),s=e.i(68610),a=e.i(38168);let i={small:"small",medium:"small",large:"medium"};e.s(["Button",0,e=>{let{label:r,variant:o="primary",size:n="medium",icon:d,iconPos:c,disabled:u=!1}=e,m="icon-only"===c,_=[l.default.btn,m?l.default.btn_icon_only:"",u?l.default.btn_disabled:""].filter(Boolean).join(" "),h=d?(0,t.jsx)("div",{className:l.default.iconWrapper,children:(0,t.jsx)(a.Icon,{...d,size:i[n]})}):null,p=(0,t.jsxs)(t.Fragment,{children:[("start"===c||m)&&h,!m&&(0,t.jsx)("span",{className:`label-${n}`,children:r}),"end"===c&&h]}),f={className:_,"data-variant":o,"data-size":n,"aria-label":m?r:void 0};if(void 0!==e.href){let{href:l,newTab:a,onClick:i}=e;return(0,t.jsx)(s.AppLink,{...f,href:l,newTab:a,"aria-disabled":u||void 0,tabIndex:u?-1:void 0,onClick:e=>{u?e.preventDefault():i?.(e)},children:p})}return(0,t.jsx)("button",{...f,onClick:e.onClick,type:e.type??"button",disabled:u,children:p})}])},13056,e=>{e.v({btn:"styles-module__xmyNjG__btn",btn_icon_only:"styles-module__xmyNjG__btn_icon_only",iconWrapper:"styles-module__xmyNjG__iconWrapper"})},93092,e=>{"use strict";var t=e.i(43476),l=e.i(89579);let s=/(\[.*?\]|\{br\}|\{link:[^}]*\}.*?\{\/link\})/g,a=/^\{link:([^}]*)\}([\s\S]*)\{\/link\}$/;e.s(["default",0,function({text:e,className:i,linkClassName:r,linkArrow:o=!1,linkHasUnderline:n=!1}){let d=e.split(s);return(0,t.jsx)(t.Fragment,{children:d.map((e,s)=>{if("{br}"===e)return(0,t.jsx)("br",{},s);if(e.startsWith("[")&&e.endsWith("]"))return(0,t.jsx)("span",{className:i,children:e.slice(1,-1)},s);let d=e.match(a);if(d){let[,e,a]=d;return(0,t.jsx)(l.TextLink,{href:e,className:r,arrow:o,hasUnderline:n,children:a},s)}return e})})}])},13465,e=>{"use strict";var t=e.i(43476),l=e.i(64271),s=e.i(84351),a=e.i(49765),i=e.i(93092);let r=[["1 / span 2","1 / span 3"],["2 / span 3","2 / span 3"],["3 / span 2","3 / span 2"],["1 / -1","1 / -1"]];e.s(["default",0,function({layout:e="col",hasMarker:o=!1,sectionTitle:n,supTitle:d,title:c,titleLimit:u=!1,titleShift:m=0,titleScale:_="medium",indentFirstLine:h=!1,subTitle:p,body:f,className:g}){let x=n||o;return(0,t.jsxs)(s.default,{rowGap:"normal",className:g,children:[x&&(0,t.jsxs)(a.default,{className:l.default.sectionTitleStack,md:0!=m?"1 / span 1":"1 / -1",children:[o&&(0,t.jsx)("span",{className:l.default.marker}),n&&(0,t.jsx)("h1",{className:l.default.sectionTitle,children:n})]}),(0,t.jsxs)(a.default,{md:r[m][0],lg:r[m][1],className:l.default.titleStack,children:[d&&(0,t.jsx)("span",{className:l.default.supTitle,children:d}),c&&(0,t.jsx)("h2",{className:l.default.title,"data-width-limit":u,"data-title-scale":_,"data-title-indent":h,children:(0,t.jsx)(i.default,{text:c,className:l.default.titleAlt})}),p&&(0,t.jsx)("span",{className:l.default.subTitle,children:p})]}),f&&f.blocks&&(0,t.jsx)(a.default,{className:l.default.bodyStack,md:"row"===e?"4 / span 1":"1 / span 2",children:f.blocks.map((e,s)=>(0,t.jsx)("p",{className:l.default.body,children:(0,t.jsx)(i.default,{text:e,className:`${f.className} ${l.default.bodyAlt}`})},s))})]})}])},64271,e=>{e.v({body:"styles-module__78MRIW__body",bodyAlt:"styles-module__78MRIW__bodyAlt",bodyStack:"styles-module__78MRIW__bodyStack",marker:"styles-module__78MRIW__marker",sectionTitle:"styles-module__78MRIW__sectionTitle",sectionTitleStack:"styles-module__78MRIW__sectionTitleStack",subTitle:"styles-module__78MRIW__subTitle",supTitle:"styles-module__78MRIW__supTitle",title:"styles-module__78MRIW__title",titleAlt:"styles-module__78MRIW__titleAlt",titleStack:"styles-module__78MRIW__titleStack"})},24514,e=>{"use strict";var t=e.i(43476),l=e.i(12846),s=e.i(71645),a=e.i(84351),i=e.i(49765),r=e.i(73772),o=e.i(68610);e.s(["default",0,function({projects:e,showImage:n=!1,minHeight:d=!1}){let[c,u]=(0,s.useState)(0),m=(0,s.useMemo)(()=>e.map(e=>(function(e){let t=0;for(let l=0;l<e.length;l++)t=(t<<5)-t+e.charCodeAt(l)|0;return 1+Math.abs(t)%1e3/1e3*.2})(e.slug)),[e]);return(0,t.jsx)("div",{"data-min-height":d,children:(0,t.jsxs)(a.default,{className:l.default.grid,children:[(0,t.jsx)(i.default,{children:(0,t.jsx)("ul",{className:l.default.projects,children:e.map((e,s)=>(0,t.jsx)("li",{className:l.default.projectItemWrapper,onMouseEnter:()=>u(s),children:(0,t.jsx)(o.AppLink,{className:l.default.projectItem,href:`/work/${e.slug}`,children:(0,t.jsxs)("div",{className:l.default.textStack,children:[(0,t.jsx)("span",{className:l.default.id,children:`0${s+1}`}),(0,t.jsx)("span",{className:l.default.title,children:e.title}),(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{className:l.default.tags,children:e.tags.join(", ")}),(0,t.jsx)("span",{className:l.default.year,children:e.year})]})]})})},e.slug))})}),n&&(0,t.jsx)("div",{className:l.default.imageStack,children:e.map((s,a)=>{let i=a-c,o=Math.min(Math.abs(i),7),n=0===i,d=Math.sign(-1*i),u=26+34*o+6*Math.pow(o,1.4),_=(n?1:1-.025*o)*m[a],h=n?e.length+1:e.length-o;return(0,t.jsx)("div",{className:`${l.default.stackItem} ${n?l.default.stackItemActive:""}`,style:{transform:`translate3d(0, ${n?16:-d*u}px, ${n?60:-(90*o)}px) scale(${_})`,opacity:1,zIndex:h},children:(0,t.jsx)(r.default,{project:s.slug,img:s.images[0],sizes:"40vw"})},s.slug)})})]})})}])},12846,e=>{e.v({grid:"styles-module__PEYVDq__grid",id:"styles-module__PEYVDq__id",imageStack:"styles-module__PEYVDq__imageStack",projectItem:"styles-module__PEYVDq__projectItem",projectItemWrapper:"styles-module__PEYVDq__projectItemWrapper",projects:"styles-module__PEYVDq__projects",stackItem:"styles-module__PEYVDq__stackItem",stackItemActive:"styles-module__PEYVDq__stackItemActive",tags:"styles-module__PEYVDq__tags",textStack:"styles-module__PEYVDq__textStack",title:"styles-module__PEYVDq__title",year:"styles-module__PEYVDq__year"})}]);