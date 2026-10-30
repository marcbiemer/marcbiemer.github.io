(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34371,(e,t,r)=>{e.i(56623),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useRouterBFCache",{enumerable:!0,get:function(){return l}});let n=e.r(79746);function l(e,t,r){let[l,o]=(0,n.useState)(()=>({tree:e,renderTree:t,stateKey:r,next:null}));if(l.tree===e)return l;let a={tree:e,renderTree:t,stateKey:r,next:null},u=1,i=l,s=a;for(;null!==i&&u<1;){if(i.stateKey===r){s.next=i.next;break}{u++;let e={tree:i.tree,renderTree:i.renderTree,stateKey:i.stateKey,next:null};s.next=e,s=e}i=i.next}return o(a),a}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},42346,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0});var n={createClientParams:function(){return o.createRenderParamsFromClient},createClientSearchParams:function(){return a.createRenderSearchParamsFromClient}};for(var l in n)Object.defineProperty(r,l,{enumerable:!0,get:n[l]});let o=e.r(22991),a=e.r(13006);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},17294,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ClientPageRoot",{enumerable:!0,get:function(){return s}});let n=e.r(89975),l=e.r(88782),o=e.r(79746),a=e.r(78520),u=e.r(83041),i=e.r(42346);function s({Component:e,serverProvidedParams:t}){let r,d;if(null!==t)r=t.searchParams,d=t.params;else{let e=(0,o.use)(l.LayoutRouterContext);d=null!==e?e.parentParams:{},r=(0,a.urlSearchParamsToParsedUrlQuery)((0,o.use)(u.SearchParamsContext))}let c=(0,i.createClientSearchParams)(r),f=(0,i.createClientParams)(d);return(0,n.jsx)(e,{params:f,searchParams:c})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},53219,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ClientSegmentRoot",{enumerable:!0,get:function(){return u}});let n=e.r(89975),l=e.r(88782),o=e.r(79746),a=e.r(42346);function u({Component:e,slots:t,serverProvidedParams:r}){let i;if(null!==r)i=r.params;else{let e=(0,o.use)(l.LayoutRouterContext);i=null!==e?e.parentParams:{}}let s=(0,a.createClientParams)(i);return(0,n.jsx)(e,{...t,params:s})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},8064,(e,t,r)=>{e.i(56623),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HTTPAccessFallbackBoundary",{enumerable:!0,get:function(){return d}});let n=e.r(56421),l=e.r(89975),o=n._(e.r(79746)),a=e.r(61466),u=e.r(54584),i=e.r(88782);class s extends o.default.Component{constructor(e){super(e),this.state={triggeredStatus:void 0,previousPathname:e.pathname}}componentDidCatch(){}static getDerivedStateFromError(e){if((0,u.isHTTPAccessFallbackError)(e))return{triggeredStatus:(0,u.getAccessFallbackHTTPStatus)(e)};throw e}static getDerivedStateFromProps(e,t){return e.pathname!==t.previousPathname&&t.triggeredStatus?{triggeredStatus:void 0,previousPathname:e.pathname}:{triggeredStatus:t.triggeredStatus,previousPathname:e.pathname}}render(){let{notFound:e,forbidden:t,unauthorized:r,children:n}=this.props,{triggeredStatus:o}=this.state,a={[u.HTTPAccessErrorStatus.NOT_FOUND]:e,[u.HTTPAccessErrorStatus.FORBIDDEN]:t,[u.HTTPAccessErrorStatus.UNAUTHORIZED]:r};if(o){let i=o===u.HTTPAccessErrorStatus.NOT_FOUND&&e,s=o===u.HTTPAccessErrorStatus.FORBIDDEN&&t,d=o===u.HTTPAccessErrorStatus.UNAUTHORIZED&&r;return i||s||d?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("meta",{name:"robots",content:"noindex"}),!1,a[o]]}):n}return n}}function d({notFound:e,forbidden:t,unauthorized:r,children:n}){let u=(0,a.useUntrackedPathname)(),c=(0,o.useContext)(i.MissingSlotContext);return e||t||r?(0,l.jsx)(s,{pathname:u,notFound:e,forbidden:t,unauthorized:r,missingSlots:c,children:n}):(0,l.jsx)(l.Fragment,{children:n})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},90543,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0});var n={InstantValidationBoundaryContext:function(){return o.InstantValidationBoundaryContext},PlaceValidationBoundaryBelowThisLevel:function(){return o.PlaceValidationBoundaryBelowThisLevel},RenderValidationBoundaryAtThisLevel:function(){return o.RenderValidationBoundaryAtThisLevel},SlotMarker:function(){return o.SlotMarker}};for(var l in n)Object.defineProperty(r,l,{enumerable:!0,get:n[l]});let o=e.r(80007);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},80007,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0});var n={InstantValidationBoundaryContext:function(){return o},PlaceValidationBoundaryBelowThisLevel:function(){return a},RenderValidationBoundaryAtThisLevel:function(){return u},SlotMarker:function(){return i}};for(var l in n)Object.defineProperty(r,l,{enumerable:!0,get:n[l]});let o=null,a=null,u=null,i=null;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},28380,(e,t,r)=>{e.i(56623),Object.defineProperty(r,"__esModule",{value:!0});var n={LoadingBoundaryProvider:function(){return P},default:function(){return O}};for(var l in n)Object.defineProperty(r,l,{enumerable:!0,get:n[l]});let o=e.r(56421),a=e.r(89975),u=o._(e.r(79746)),i=e.r(88782),s=e.r(18297),d=e.r(54621),c=e.r(75976),f=e.r(96485),m=e.r(8064);e.r(90543);let p=e.r(13069),v=e.r(34371);e.r(33376);let h=e.r(83041),y=e.r(78520),g=e.r(96815);function _(e,t,r){let n=e.getClientRects();if(0===n.length)return 0;let l=1/0;for(let e=0;e<n.length;e++){let t=n[e];t.top<l&&(l=t.top)}return l>=r()&&l<=t?1:2}function b(e){let t=u.default.useRef(null);return(0,u.useLayoutEffect)(()=>{let{scrollRef:r,renderTree:n}=e,l=r.forceScroll?r.scrollRef:n.data.scrollRef;if(null===l||!l.current)return;let o=null,a=r.hashFragment;if(a){if(null===(o="top"===a?document.body:document.getElementById(a)??document.getElementsByName(a)[0]??null)){l.current=!1,r.onlyHashChange=!1,r.hashFragment=null;return}}else o=t.current;if(null===o)return;let u=!1;(0,c.disableSmoothScrollDuringRouteTransition)(()=>{let e=document.documentElement,t=null,r=null,n=null,i=()=>{var r;let l,o;return null===n&&(r=t,n=!Number.isFinite(o=Number.parseFloat(l=getComputedStyle(e).scrollPaddingTop))||o<0?0:l.endsWith("px")?o:l.endsWith("%")?o/100*r:0),n};(a||(t=e.clientHeight,0!==(r=_(o,t,i))))&&((u=!0,l.current=!1,a)?o.scrollIntoView():1!==r&&(e.scrollTop=0,2===_(o,t,i)&&o.scrollIntoView()))},{dontForceLayout:!0,onlyHashChange:r.onlyHashChange}),u&&(r.onlyHashChange=!1,r.hashFragment=null)},void 0),(0,a.jsx)(u.Fragment,{ref:t,children:e.children})}function x({children:e,renderTree:t}){let r=(0,u.useContext)(i.GlobalLayoutRouterContext);if(!r)throw Error("invariant global layout router not mounted");return(0,a.jsx)(b,{scrollRef:r.scrollRef,renderTree:t,children:e})}function j({tree:e,segmentPath:t,debugNameContext:r,renderTree:n,params:l,url:o,isActive:d}){let c,f=(0,u.useContext)(i.GlobalLayoutRouterContext);if((0,u.useContext)(h.NavigationPromisesContext),!f)throw Error("invariant global layout router not mounted");let m=null!==n.data.prefetchRsc?n.data.prefetchRsc:n.data.rsc,p=(0,u.useDeferredValue)(n.data.rsc,m);if((0,g.isDeferredRsc)(p)){let e=(0,u.use)(p);null===e&&(0,u.use)(s.unresolvedThenable),c=e}else null===p&&(0,u.use)(s.unresolvedThenable),c=p;let v=c;return(0,a.jsx)(i.LayoutRouterContext.Provider,{value:{parentTree:e,parentRenderTree:n,parentSegmentPath:t,parentParams:l,parentLoadingData:null,debugNameContext:r,url:o,isActive:d},children:v})}function P({loading:e,children:t}){let r=(0,u.use)(i.LayoutRouterContext);return null===r?t:(0,a.jsx)(i.LayoutRouterContext.Provider,{value:{parentTree:r.parentTree,parentRenderTree:r.parentRenderTree,parentSegmentPath:r.parentSegmentPath,parentParams:r.parentParams,parentLoadingData:e,debugNameContext:r.debugNameContext,url:r.url,isActive:r.isActive},children:t})}function C({name:e,loading:t,children:r}){if(null!==t){let n=t[0],l=t[1],o=t[2];return(0,a.jsx)(u.Suspense,{name:e,fallback:(0,a.jsxs)(a.Fragment,{children:[l,o,n]}),children:r})}return(0,a.jsx)(a.Fragment,{children:r})}function O({parallelRouterKey:e,error:t,errorStyles:r,errorScripts:n,templateStyles:l,templateScripts:o,template:c,notFound:h,forbidden:g,unauthorized:_,segmentViewBoundaries:b}){let P=(0,u.useContext)(i.LayoutRouterContext);if(!P)throw Error("invariant expected layout router to be mounted");let{parentTree:T,parentRenderTree:S,parentSegmentPath:M,parentParams:R,parentLoadingData:w,url:F,isActive:B,debugNameContext:A}=P,E=T[0],L=null===M?[e]:M.concat([E,e]),U=T[1][e],D=S.slots?.get(e);(void 0===U||void 0===D)&&(0,u.use)(s.unresolvedThenable);let H=U[0],N=(0,p.createSegmentKey)(H),k=(0,v.useRouterBFCache)(U,D,N),V=[];do{let e=k.tree,u=k.renderTree,s=k.stateKey,p=e[0],v=R;if(Array.isArray(p)){let e=p[0],t=p[1],r=p[2],n=(0,y.getParamValueFromCacheKey)(t,r);null!==n&&(v={...R,[e]:n})}let b=function(e){if("/"===e)return"/";if("string"==typeof e)if("(__SLOT__)"===e)return;else return e+"/";return e[1]+"/"}(p),P=b??A,O=void 0===b?void 0:A,T=(0,a.jsxs)(x,{renderTree:u,children:[(0,a.jsx)(d.ErrorBoundary,{errorComponent:t,errorStyles:r,errorScripts:n,children:(0,a.jsx)(C,{name:O,loading:w,children:(0,a.jsx)(m.HTTPAccessFallbackBoundary,{notFound:h,forbidden:g,unauthorized:_,children:(0,a.jsxs)(f.RedirectBoundary,{children:[(0,a.jsx)(j,{url:F,tree:e,params:v,renderTree:u,segmentPath:L,debugNameContext:P,isActive:B&&s===N}),null]})})})}),null]}),S=(0,a.jsxs)(i.TemplateContext.Provider,{value:T,children:[l,o,c]},s);V.push(S),k=k.next}while(null!==k)return V}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},7079,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return u}});let n=e.r(56421),l=e.r(89975),o=n._(e.r(79746)),a=e.r(88782);function u(){let e=(0,o.useContext)(a.TemplateContext);return(0,l.jsx)(l.Fragment,{children:e})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},22991,(e,t,r)=>{e.i(56623),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createRenderParamsFromClient",{enumerable:!0,get:function(){return n}});let n=e.r(86743).createRenderParamsFromClient;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},86743,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createRenderParamsFromClient",{enumerable:!0,get:function(){return l}});let n=new WeakMap;function l(e){let t=n.get(e);if(t)return t;let r=Promise.resolve(e);return r.status="fulfilled",r.value=e,n.set(e,r),r}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},13006,(e,t,r)=>{e.i(56623),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createRenderSearchParamsFromClient",{enumerable:!0,get:function(){return n}});let n=e.r(37039).createRenderSearchParamsFromClient;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},37039,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createRenderSearchParamsFromClient",{enumerable:!0,get:function(){return l}});let n=new WeakMap;function l(e){let t=n.get(e);if(t)return t;let r=Promise.resolve(e);return r.status="fulfilled",r.value=e,n.set(e,r),r}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},74357,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"IconMark",{enumerable:!0,get:function(){return l}});let n=e.r(89975),l=()=>"u">typeof window?null:(0,n.jsx)("meta",{name:"«nxt-icon»"})},75976,(e,t,r)=>{function n(e,t={}){if(t.onlyHashChange)return void e();let r=document.documentElement;if("smooth"!==r.dataset.scrollBehavior)return void e();let l=r.style.scrollBehavior;r.style.scrollBehavior="auto",t.dontForceLayout||r.getClientRects(),e(),r.style.scrollBehavior=l}e.i(56623),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"disableSmoothScrollDuringRouteTransition",{enumerable:!0,get:function(){return n}})},91908,e=>{var t=e.i(89975),r=e.i(46282),n=e.i(20023),l=e.i(87976),o=e.i(79746),a=e.i(88177),u=e.i(63733),i=e.i(41124);let s=`
    uniform float u_time;
    uniform vec3 u_darkColor;
    uniform vec3 u_midColor;
    uniform vec3 u_highlightColor;
    uniform vec2 u_mouse;
    uniform float u_swirlAmount; // 0 -> 1, eases in/out on enter/leave
    uniform float u_aspect;

    varying vec2 vUv;

    float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }

    float valueNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.55;
        for (int i = 0; i < 3; i++) {
            value += amplitude * valueNoise(p);
            p *= 2.05;
            amplitude *= 0.5;
        }
        return value;
    }

    // Soft, large-scale color field — deliberately low frequency so it reads
    // as a blurred gradient rather than visible noise texture
    vec3 getBaseColor(vec2 uv) {
        // Faster, more visible drift through the noise field
        vec2 p = uv * 1.3 + vec2(u_time * 0.15, u_time * 0.2);
        float n = fbm(p);

        // Slowly rotating diagonal bias — this is what makes the bright region
        // itself drift/rotate over time, not just the noise texture underneath it
        float angle = u_time * 0.04;
        vec2 dir = vec2(cos(angle) * 0.75 - sin(angle) * 0.65, sin(angle) * 0.75 + cos(angle) * 0.65);
        float diagonal = dot(uv - 0.5, dir) + 0.5;

        float field = mix(diagonal, n, 0.55);

        vec3 color = mix(u_darkColor, u_midColor, smoothstep(0.15, 0.55, field));
        color = mix(color, u_highlightColor, smoothstep(0.62, 0.95, field));

        return color;
    }

    void main() {
        vec2 uv = vUv;
        vec2 aspectUv = vec2(uv.x * u_aspect, uv.y);
        vec2 mouseUv = vec2(u_mouse.x * u_aspect, u_mouse.y);

        vec2 toCenter = aspectUv - mouseUv;
        float dist = length(toCenter);

        // Swirl strength falls off with distance from the cursor, and is scaled
        // by u_swirlAmount so it eases in/out smoothly on enter/leave
        float radius = 0.45;
        float falloff = exp(-(dist * dist) / (radius * radius));
        float angle = falloff * 2.4 * u_swirlAmount;

        float s = sin(angle);
        float c = cos(angle);
        vec2 rotated = vec2(
            c * toCenter.x - s * toCenter.y,
            s * toCenter.x + c * toCenter.y
        );

        vec2 swirledAspectUv = mouseUv + rotated;
        vec2 swirledUv = vec2(swirledAspectUv.x / u_aspect, swirledAspectUv.y);

        vec3 color = getBaseColor(swirledUv);

        gl_FragColor = vec4(color, 1.0);
    }
`,d=`
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,c=(0,u.f)({u_time:0,u_darkColor:new a.Es("#03060d"),u_midColor:new a.Es("#0d4fa8"),u_highlightColor:new a.Es("#bfe0ff"),u_mouse:new a.wq(.5,.5),u_swirlAmount:0,u_aspect:1},d,s);function f({darkColor:e,midColor:r,highlightColor:u}){let i=(0,o.useRef)(null),{viewport:s}=(0,l.f)(),d=(0,o.useRef)(new a.wq(.5,.5)),c=(0,o.useRef)(!1);(0,o.useEffect)(()=>{let t=i.current;t&&(e&&t.uniforms.u_darkColor.value.set(e),r&&t.uniforms.u_midColor.value.set(r),u&&t.uniforms.u_highlightColor.value.set(u))},[e,r,u]);let m=(0,o.useRef)(0);return(0,n.f)((e,t)=>{m.current+=t;let r=i.current;if(!r)return;r.uniforms.u_time.value=m.current,r.uniforms.u_aspect.value=s.width/s.height;let n=r.uniforms.u_mouse.value;n.x=a.rB.damp(n.x,d.current.x,8,t),n.y=a.rB.damp(n.y,d.current.y,8,t);let l=r.uniforms.u_swirlAmount,o=+!!c.current,u=c.current?5:3;l.value=a.rB.damp(l.value,o,u,t)}),(0,t.jsxs)("mesh",{scale:[s.width,s.height,1],onPointerMove:e=>{e.uv&&(d.current.copy(e.uv),c.current=!0)},onPointerLeave:()=>{c.current=!1},children:[(0,t.jsx)("planeGeometry",{}),(0,t.jsx)("swirlGradientMaterial",{ref:i})]})}(0,i.f)({SwirlGradientMaterial:c}),e.s(["f",0,function(e){return(0,t.jsx)("div",{style:{position:"absolute",inset:0,width:"100%",height:"100%"},children:(0,t.jsx)(r.f,{children:(0,t.jsx)(f,{...e})})})}],91908)},51188,e=>{var t=e.i(89975),r=e.i(79746);e.s(["f",0,function({location:e,timezone:n,className:l,useTimeOnly:o=!1}){let[a,u]=(0,r.useState)(()=>new Date);(0,r.useEffect)(()=>{let e=setInterval(()=>u(new Date),1e3);return()=>clearInterval(e)},[]);let i=a.toLocaleDateString("en-GB",{timeZone:n,weekday:"long",day:"numeric",month:"long",year:"numeric"}),s=a.toLocaleTimeString("en-US",{timeZone:n,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),d=a.toLocaleDateString("en-GB",{timeZone:n,timeZoneName:"shortOffset"}).split(", ")[1];return(0,t.jsxs)(t.Fragment,{children:[o&&(0,t.jsxs)("time",{dateTime:s,suppressHydrationWarning:!0,children:[" ",s]}),!o&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{className:l,children:[e,(0,t.jsxs)("time",{dateTime:s,suppressHydrationWarning:!0,children:[" ",s]})]}),(0,t.jsxs)("span",{className:l,children:[(0,t.jsx)("time",{dateTime:i,suppressHydrationWarning:!0,children:i}),` (${d})`]})]})]})}])}])})();