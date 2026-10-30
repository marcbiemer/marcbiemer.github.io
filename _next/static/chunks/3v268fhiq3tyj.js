(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[18733,e=>{var t=e.i(89975),i=e.i(80830),s=e.i(84351),a=e.i(49765),l=e.i(7083),n=e.i(73772),r=e.i(93092),c=e.i(14408);function o({header:e,img:i}){return(0,t.jsx)(l.f,{pad:"spacious",theme:"default",children:(0,t.jsxs)(s.f,{rowGap:"spacious",children:[e.sectionTitle&&(0,t.jsx)(a.f,{base:"1 / -1",md:"2 / span 1",className:c.default.sectionTitle,children:(0,t.jsx)("span",{children:(0,t.jsx)(r.f,{text:e.sectionTitle,className:c.default.titleAlt})})}),(0,t.jsx)(a.f,{base:"1 / -1",md:"3 / span 2",lg:"4 / span 1",className:c.default.imgWrapper,children:(0,t.jsx)(n.f,{section:"about",project:"portrait",img:i,sizes:"(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw",loading:"eager"})}),e.title&&(0,t.jsx)(a.f,{md:"2 / span 1",className:c.default.title,children:(0,t.jsx)("h1",{children:(0,t.jsx)(r.f,{text:e.title,className:c.default.titleAlt})})}),e.subTitle&&(0,t.jsx)(a.f,{md:"3 / span 1",className:c.default.subTitle,children:(0,t.jsx)("h2",{children:(0,t.jsx)(r.f,{text:e.subTitle,className:c.default.titleAlt})})}),(0,t.jsx)(a.f,{md:"4 / span 1",className:c.default.body,children:e.body?.blocks.map(e=>(0,t.jsx)("p",{children:(0,t.jsx)(r.f,{text:e,className:c.default.bodyAlt})},e))})]})})}var d=e.i(79746),u=e.i(35974);let h=({href:e,children:i})=>e?(0,t.jsx)(u.f,{href:e,newTab:!0,hasUnderline:!0,children:i}):i,f={professionalExperience:e=>(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("span",{children:e.title})}),selectedWork:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.type,", "]}),(0,t.jsx)(h,{href:e.link,children:e.title})]}),education:e=>(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("span",{children:e.title})}),talks:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.type,", "]}),(0,t.jsx)("span",{children:e.title})]}),lectures:e=>(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("span",{children:e.title})}),professionalService:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.type,", "]}),(0,t.jsx)(h,{href:e.link,children:e.title})]}),collaborations:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.type,", "]}),(0,t.jsx)(h,{href:e.link,children:e.title})]})},p={professionalExperience:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.institution,", "]}),(0,t.jsx)("span",{children:e.location})]}),selectedWork:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.institution,", "]}),(0,t.jsx)("span",{children:e.location})]}),education:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.institution,", "]}),(0,t.jsx)("span",{children:e.location})]}),talks:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(h,{href:e.event?.link,children:e.event?.title}),(0,t.jsxs)("span",{children:[", ",e.location," "]}),e.recording&&(0,t.jsxs)("span",{children:["| ",(0,t.jsx)(h,{href:e.recording,children:"Recording"})]})]}),lectures:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.institution,", "]}),(0,t.jsx)("span",{children:e.location}),e.detail&&(0,t.jsx)("span",{children:` | ${e.detail}`})]}),professionalService:e=>(0,t.jsxs)(t.Fragment,{children:[e.institution&&(0,t.jsxs)("span",{children:[e.institution,", "]}),(0,t.jsx)("span",{children:e.location})]}),collaborations:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:[e.institution,", "]}),(0,t.jsx)("span",{children:e.location})]})};var m=e.i(25679);function x({segments:e}){return(0,t.jsx)(t.Fragment,{children:e.map(e=>(0,d.createElement)(j,{...e,key:e.id}))})}function j({type:e,id:i,label:n,content:r}){return(0,t.jsx)(l.f,{padStart:"condensed",padEnd:"spacious",id:i,gap:"spacious",theme:"default",children:(0,t.jsxs)(s.f,{rowGap:"normal",children:[(0,t.jsx)(a.f,{md:"1 / span 1",className:m.default.labelWrapper,children:(0,t.jsx)("h2",{className:m.default.label,children:n})}),(0,t.jsx)("ul",{className:m.default.list,children:r.map((i,s)=>(0,t.jsx)(g,{item:i,type:e},`${i.title}--${s.toString()}`))})]})})}function g({type:e,item:i}){let s=f[e],l=p[e];return(0,t.jsxs)("li",{className:m.default.item,children:[(0,t.jsx)(a.f,{md:"1 / span 1",children:(0,t.jsx)("span",{className:m.default.year,children:i.year})}),(0,t.jsxs)(a.f,{md:"2 / span 2",className:m.default.textStack,children:[(0,t.jsx)("h3",{className:m.default.itemTitle,children:s(i)}),(0,t.jsx)("p",{className:m.default.itemSubTitle,children:l(i)})]})]})}e.s(["default",0,function({cv:e}){return(0,t.jsxs)("article",{children:[(0,t.jsx)(o,{...e}),(0,t.jsx)(x,{...e}),(0,t.jsx)(i.f,{})]})}],18733)},73772,98820,e=>{var t=e.i(89975);let i=[640,1080,1920,2560];function s({section:e="work",project:t,filename:i,size:a}){let l=i.replace(/\.(jpg|jpeg|png|webp)$/i,".webp");return`/media/${e}/${t}/images/${a}/${l}`}e.s(["g",0,function(e,t="work"){let a=window.innerWidth,l=i.find(e=>a<=e)??2560,[n,r]=e.split("/");return s({section:t,project:n,filename:r,size:l})},"b",0,s],98820);var a=e.i(44927);e.s(["f",0,function({section:e="work",project:l,img:n,sizes:r="100vw",loading:c="lazy"}){let o=n.src,d=i.map(t=>`${s({section:e,project:l,filename:o,size:t})} ${t}w`).join(", "),u=s({section:e,project:l,filename:o,size:1920});return(0,t.jsxs)("figure",{className:a.default.figure,children:[(0,t.jsx)("div",{className:a.default.imgWrapper,"data-aspect-ratio":n.aspect??"ignore",children:(0,t.jsx)("img",{className:a.default.image,src:u,srcSet:d,sizes:r,alt:n.alt,loading:c,decoding:"async",style:{objectPosition:`${n.focusX} ${n.focusY}`}})}),(n.caption||n.credits)&&(0,t.jsxs)("figcaption",{children:[n.caption&&(0,t.jsx)("span",{className:a.default.caption,children:n.caption}),n.credits&&(0,t.jsx)("span",{className:a.default.credits,children:n.credits})]})]})}],73772)},67815,e=>{var t=e.i(89975),i=e.i(38168),s=e.i(68610),a=e.i(13056);let l={small:"small",medium:"small",large:"medium"};e.s(["f",0,e=>{let{label:n,variant:r="primary",size:c="medium",icon:o,iconPos:d,disabled:u=!1}=e,h="icon-only"===d,f=[a.default.btn,h?a.default.btn_icon_only:"",u?a.default.btn_disabled:""].filter(Boolean).join(" "),p=o?(0,t.jsx)("div",{className:a.default.iconWrapper,children:(0,t.jsx)(i.f,{...o,size:l[c]})}):null,m=(0,t.jsxs)(t.Fragment,{children:[("start"===d||h)&&p,!h&&(0,t.jsx)("span",{className:`label-${c}`,children:n}),"end"===d&&p]}),x={className:f,"data-variant":r,"data-size":c,"aria-label":h?n:void 0};if(void 0!==e.href){let{href:i,newTab:a,onClick:l}=e;return(0,t.jsx)(s.f,{...x,href:i,newTab:a,"aria-disabled":u||void 0,tabIndex:u?-1:void 0,onClick:e=>{u?e.preventDefault():l?.(e)},children:m})}return(0,t.jsx)("button",{...x,onClick:e.onClick,type:e.type??"button",disabled:u,children:m})}])},93092,e=>{var t=e.i(89975),i=e.i(35974);let s=/(\[.*?\]|\{br\}|\{link:[^}]*\}.*?\{\/link\})/g,a=/^\{link:([^}]*)\}([\s\S]*)\{\/link\}$/;e.s(["f",0,function({text:e,className:l,linkClassName:n,linkArrow:r=!1,linkHasUnderline:c=!1}){let o=e.split(s);return(0,t.jsx)(t.Fragment,{children:o.map((e,s)=>{if("{br}"===e)return(0,t.jsx)("br",{},`${e}-${s.toString()}`);if(e.startsWith("[")&&e.endsWith("]"))return(0,t.jsx)("span",{className:l,children:e.slice(1,-1)},`${e}-${s.toString()}`);let o=e.match(a);if(o){let[,a,l]=o;return(0,t.jsx)(i.f,{href:a,className:n,arrow:r,hasUnderline:c,children:l},`${e}-${s.toString()}`)}return e})})}])},80830,e=>{var t=e.i(89975),i=e.i(46282),s=e.i(20023),a=e.i(87976),l=e.i(79746),n=e.i(63733),r=e.i(41124),c=e.i(88177);let o=`
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
`,u=(0,n.f)({u_time:0,u_bgColor:new c.Es("#0a0620"),u_highlightColor:new c.Es("#3a1fe0"),u_aspect:1,u_gridDensity:24},d,o);function h({bgColor:e,highlightColor:i,gridDensity:n}){let r=(0,l.useRef)(null),{viewport:c}=(0,a.f)();(0,l.useEffect)(()=>{let t=r.current;t&&(e&&t.uniforms.u_bgColor.value.set(e),i&&t.uniforms.u_highlightColor.value.set(i),n&&(t.uniforms.u_gridDensity.value=n))},[e,i,n]);let o=(0,l.useRef)(0);return(0,s.f)((e,t)=>{o.current+=t;let i=r.current;i&&(i.uniforms.u_time.value=o.current,i.uniforms.u_aspect.value=c.width/c.height)}),(0,t.jsxs)("mesh",{scale:[c.width,c.height,1],children:[(0,t.jsx)("planeGeometry",{}),(0,t.jsx)("halftoneMatrixMaterial",{ref:r})]})}function f({bgColor:e,highlightColor:s,gridDensity:a}){return(0,t.jsx)("div",{style:{position:"absolute",inset:0,width:"100%",height:"100%"},children:(0,t.jsx)(i.f,{children:(0,t.jsx)(h,{bgColor:e,highlightColor:s,gridDensity:a})})})}(0,r.f)({HalftoneMatrixMaterial:u});var p=e.i(84351),m=e.i(49765),x=e.i(7083),j=e.i(67815),g=e.i(93092);let v=e.i(54812).default;var b=e.i(5709);e.s(["f",0,function(){return(0,t.jsxs)(x.f,{pad:"spacious",id:"contact",valign:"center",theme:"default",children:[(0,t.jsx)(x.f.Background,{color:"accent",children:(0,t.jsx)(f,{bgColor:"#FEFBFE",highlightColor:"#4332FF",gridDensity:50})}),(0,t.jsx)(p.f,{children:(0,t.jsxs)(m.f,{className:b.default.content,md:"2 / span 2",children:[(0,t.jsxs)("div",{className:b.default.textStack,children:[v.teaser.supTitle&&(0,t.jsx)("span",{className:b.default.supTitle,children:(0,t.jsx)(g.f,{text:v.teaser.supTitle,className:b.default.titleAlt})}),v.teaser.title&&(0,t.jsx)("h2",{className:b.default.title,children:(0,t.jsx)(g.f,{text:v.teaser.title,className:b.default.titleAlt})}),v.teaser.subTitle&&(0,t.jsx)("p",{className:b.default.subTitle,children:(0,t.jsx)(g.f,{text:v.teaser.subTitle,className:b.default.titleAlt})})]}),(0,t.jsxs)("div",{className:b.default.ctaWrapper,children:[(0,t.jsx)(j.f,{variant:"primary",label:"Book a call",href:"https://calendar.app.google/s4ZFtdqrwTnP8w1E9",size:"medium"}),(0,t.jsx)(j.f,{variant:"secondary",label:"Get In Touch",href:"/contact",size:"medium"})]})]})})]})}],80830)}],54812,(e,t,i)=>{t.exports={header:{sectionTitle:"Get In Touch",title:"The most unexpected collaborations {br}[start with a simple conversation]",titleLimit:!1,titleScale:"small"},contactForm:{inputs:[{type:"text",id:"name",label:"Name",placeholder:"Bart Simpson"},{type:"email",id:"email",label:"Email",placeholder:"ay.caramba@email.com"},{type:"textarea",id:"message",label:"Message",placeholder:"Whether it’s a commission, a collaboration, or simply a question — send a message and we’ll take it from there."}],cta:{default:"Send",inProgress:"Sending ..."},messages:{error:"Something went wrong. Please try again.",success:"Your message was sent successfully. {br}We will be in touch shortly."}},teaser:{title:"Ready to create {br}something together?",subTitle:"Whether it’s a commission, a collaboration, or simply a question — don’t hesitate to reach out. Book a call for a direct conversation, or send a message and we’ll take it from there."}}},44927,e=>{e.v({caption:"O_ok9q_caption",credits:"O_ok9q_credits",figure:"O_ok9q_figure",image:"O_ok9q_image",imgWrapper:"O_ok9q_imgWrapper"})},13056,e=>{e.v({btn:"xmyNjG_btn",btn_icon_only:"xmyNjG_btn_icon_only",iconWrapper:"xmyNjG_iconWrapper"})},5709,e=>{e.v({content:"vZC9IW_content",ctaWrapper:"vZC9IW_ctaWrapper",supTitle:"vZC9IW_supTitle",textStack:"vZC9IW_textStack",title:"vZC9IW_title",titleAlt:"vZC9IW_titleAlt"})},14408,e=>{e.v({body:"HCkUIa_body",bodyAlt:"HCkUIa_bodyAlt",imgWrapper:"HCkUIa_imgWrapper",sectionTitle:"HCkUIa_sectionTitle",subTitle:"HCkUIa_subTitle",title:"HCkUIa_title",titleAlt:"HCkUIa_titleAlt"})},25679,e=>{e.v({item:"ufnDjG_item",itemSubTitle:"ufnDjG_itemSubTitle",itemTitle:"ufnDjG_itemTitle",label:"ufnDjG_label",labelWrapper:"ufnDjG_labelWrapper",list:"ufnDjG_list",textStack:"ufnDjG_textStack",year:"ufnDjG_year"})}]);