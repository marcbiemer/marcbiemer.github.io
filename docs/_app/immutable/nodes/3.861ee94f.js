import{H as Ee}from"../chunks/control.f5b05b5f.js";import{p as J,e as L,T as ye,L as je,F as Ie}from"../chunks/data.72706010.js";import{s as le,r as Z,v as x,o as ze,z as Te,A as W,n as ee}from"../chunks/scheduler.1fedfaae.js";import{S as ne,i as re,g as y,s as A,m as K,h as j,j as T,c as C,f as v,n as Q,k as c,a as D,x as _,o as X,d as P,p as se,b as ae,t as B,B as ce,r as U,u as V,v as M,w as q,H as $e,D as Pe,E as Ae,C as Ce,e as te}from"../chunks/index.8b0e1c08.js";function Be(r,e){return new Ee(r,e)}new TextEncoder;function He({params:r}){for(let e=0;e<J.length;e++)if(r.slug===J[e].info.path)return{info:J[e].info,preview:J[e].preview,content:J[e].content,id:e};throw Be(404,"Not found")}const Ye=Object.freeze(Object.defineProperty({__proto__:null,load:He},Symbol.toStringTag,{value:"Module"}));function pe(r,e,s){const t=r.slice();return t[4]=e[s],t}function me(r){let e,s;return e=new ye({props:{label:r[4]}}),{c(){U(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,n){M(e,t,n),s=!0},p(t,n){const i={};n&4&&(i.label=t[4]),e.$set(i)},i(t){s||(P(e.$$.fragment,t),s=!0)},o(t){B(e.$$.fragment,t),s=!1},d(t){q(e,t)}}}function Ne(r){let e,s,t,n,i,a,l,o,p,$,k,d,I=r[3].imgAlt+"",m,f,u,w,z,H,R,G,Y,ie,O,N,S=L(r[2]),E=[];for(let g=0;g<S.length;g+=1)E[g]=me(pe(r,S,g));const ke=g=>B(E[g],1,1,()=>{E[g]=null});return{c(){e=y("header"),s=y("figure"),t=y("picture"),n=y("source"),a=A(),l=y("img"),k=A(),d=y("figcaption"),m=K(I),f=A(),u=y("div"),w=A(),z=y("p"),H=K(r[1]),R=A(),G=y("h1"),Y=K(r[0]),ie=A(),O=y("div");for(let g=0;g<E.length;g+=1)E[g].c();this.h()},l(g){e=j(g,"HEADER",{class:!0});var h=T(e);s=j(h,"FIGURE",{class:!0});var b=T(s);t=j(b,"PICTURE",{class:!0});var F=T(t);n=j(F,"SOURCE",{type:!0,srcset:!0,class:!0}),a=C(F),l=j(F,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),F.forEach(v),k=C(b),d=j(b,"FIGCAPTION",{class:!0});var ue=T(d);m=Q(ue,I),ue.forEach(v),b.forEach(v),f=C(h),u=j(h,"DIV",{class:!0}),T(u).forEach(v),w=C(h),z=j(h,"P",{class:!0});var fe=T(z);H=Q(fe,r[1]),fe.forEach(v),R=C(h),G=j(h,"H1",{class:!0});var ge=T(G);Y=Q(ge,r[0]),ge.forEach(v),ie=C(h),O=j(h,"DIV",{class:!0});var _e=T(O);for(let oe=0;oe<E.length;oe+=1)E[oe].l(_e);_e.forEach(v),h.forEach(v),this.h()},h(){c(n,"type","image/webp"),Z(n,i=`
                    `+r[3].url+`360.webp 360w, 
                    `+r[3].url+`576.webp 576w, 
                    `+r[3].url+`720.webp 720w,
                    `+r[3].url+`1440.webp 1440w,
                    `+r[3].url+`2880.webp 2880w,
                `)||c(n,"srcset",i),c(n,"class","svelte-1k6akur"),c(l,"role","presentation"),c(l,"decoding","async"),c(l,"loading","lazy"),c(l,"sizes",`
                    (max-width: 749px) calc(100vw), 
                    (max-width: 1520px) calc(100vw - 80px), 
                    1440px
                `),Z(l,o=`
                    `+r[3].url+`360.jpg 360w, 
                    `+r[3].url+`576.jpg 576w, 
                    `+r[3].url+`720.jpg 720w,
                    `+r[3].url+`1440.jpg 1440w,
                    `+r[3].url+`2880.jpg 2880w,
                `)||c(l,"srcset",o),x(l.src,p=r[3].url+"360.jpg")||c(l,"src",p),c(l,"alt",$=r[3].imgAlt),c(l,"class","svelte-1k6akur"),c(t,"class","svelte-1k6akur"),c(d,"class","screenreader-only svelte-1k6akur"),c(s,"class","header-img-wrapper svelte-1k6akur"),c(u,"class","overlay svelte-1k6akur"),c(z,"class","txt-c-2 svelte-1k6akur"),c(G,"class","txt-d svelte-1k6akur"),c(O,"class","tag-wrapper svelte-1k6akur"),c(e,"class","svelte-1k6akur")},m(g,h){D(g,e,h),_(e,s),_(s,t),_(t,n),_(t,a),_(t,l),_(s,k),_(s,d),_(d,m),_(e,f),_(e,u),_(e,w),_(e,z),_(z,H),_(e,R),_(e,G),_(G,Y),_(e,ie),_(e,O);for(let b=0;b<E.length;b+=1)E[b]&&E[b].m(O,null);N=!0},p(g,[h]){if((!N||h&8&&i!==(i=`
                    `+g[3].url+`360.webp 360w, 
                    `+g[3].url+`576.webp 576w, 
                    `+g[3].url+`720.webp 720w,
                    `+g[3].url+`1440.webp 1440w,
                    `+g[3].url+`2880.webp 2880w,
                `))&&c(n,"srcset",i),(!N||h&8&&o!==(o=`
                    `+g[3].url+`360.jpg 360w, 
                    `+g[3].url+`576.jpg 576w, 
                    `+g[3].url+`720.jpg 720w,
                    `+g[3].url+`1440.jpg 1440w,
                    `+g[3].url+`2880.jpg 2880w,
                `))&&c(l,"srcset",o),(!N||h&8&&!x(l.src,p=g[3].url+"360.jpg"))&&c(l,"src",p),(!N||h&8&&$!==($=g[3].imgAlt))&&c(l,"alt",$),(!N||h&8)&&I!==(I=g[3].imgAlt+"")&&X(m,I),(!N||h&2)&&X(H,g[1]),(!N||h&1)&&X(Y,g[0]),h&4){S=L(g[2]);let b;for(b=0;b<S.length;b+=1){const F=pe(g,S,b);E[b]?(E[b].p(F,h),P(E[b],1)):(E[b]=me(F),E[b].c(),P(E[b],1),E[b].m(O,null))}for(se(),b=S.length;b<E.length;b+=1)ke(b);ae()}},i(g){if(!N){for(let h=0;h<S.length;h+=1)P(E[h]);N=!0}},o(g){E=E.filter(Boolean);for(let h=0;h<E.length;h+=1)B(E[h]);N=!1},d(g){g&&v(e),ce(E,g)}}}function Re(r,e,s){let{title:t}=e,{year:n}=e,{contributions:i}=e,{i:a}=e;return ze(()=>{"ontouchstart"in window?document.documentElement.style.setProperty("--doc-height",`${window.innerHeight}px`):document.documentElement.style.setProperty("--doc-height","100vh")}),r.$$set=l=>{"title"in l&&s(0,t=l.title),"year"in l&&s(1,n=l.year),"contributions"in l&&s(2,i=l.contributions),"i"in l&&s(3,a=l.i)},[t,n,i,a]}class De extends ne{constructor(e){super(),re(this,e,Re,Ne,le,{title:0,year:1,contributions:2,i:3})}}function Oe(r){let e,s,t,n,i,a,l,o,p,$;return Te(r[3]),{c(){e=y("div"),s=y("section"),t=y("h2"),n=K(r[0]),i=A(),a=y("p"),l=new $e(!1),this.h()},l(k){e=j(k,"DIV",{});var d=T(e);s=j(d,"SECTION",{class:!0});var I=T(s);t=j(I,"H2",{class:!0});var m=T(t);n=Q(m,r[0]),m.forEach(v),i=C(I),a=j(I,"P",{class:!0});var f=T(a);l=Pe(f,!1),f.forEach(v),I.forEach(v),d.forEach(v),this.h()},h(){c(t,"class","txt-c-2 svelte-ppmkmv"),l.a=null,c(a,"class",o=W(r[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv"),c(s,"class","svelte-ppmkmv")},m(k,d){D(k,e,d),_(e,s),_(s,t),_(t,n),_(s,i),_(s,a),l.m(r[1],a),p||($=Ae(window,"resize",r[3]),p=!0)},p(k,[d]){d&1&&X(n,k[0]),d&2&&l.p(k[1]),d&4&&o!==(o=W(k[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv")&&c(a,"class",o)},i:ee,o:ee,d(k){k&&v(e),p=!1,$()}}}function Se(r,e,s){let{title:t}=e,{body:n}=e,i;function a(){s(2,i=window.innerWidth)}return r.$$set=l=>{"title"in l&&s(0,t=l.title),"body"in l&&s(1,n=l.body)},[t,n,i,a]}class Fe extends ne{constructor(e){super(),re(this,e,Se,Oe,le,{title:0,body:1})}}function he(r,e,s){const t=r.slice();return t[4]=e[s],t}function de(r){let e,s,t,n,i,a,l,o,p,$,k,d=r[4].alt+"",I,m,f;return{c(){e=y("figure"),s=y("picture"),t=y("source"),i=A(),a=y("img"),$=A(),k=y("figcaption"),I=K(d),m=A(),this.h()},l(u){e=j(u,"FIGURE",{class:!0});var w=T(e);s=j(w,"PICTURE",{});var z=T(s);t=j(z,"SOURCE",{type:!0,srcset:!0}),i=C(z),a=j(z,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),z.forEach(v),$=C(w),k=j(w,"FIGCAPTION",{class:!0});var H=T(k);I=Q(H,d),H.forEach(v),m=C(w),w.forEach(v),this.h()},h(){c(t,"type","image/webp"),Z(t,n=`
                        `+r[4].src+`360.webp 360w, 
                        `+r[4].src+`576.webp 576w, 
                        `+r[4].src+`720.webp 720w,
                        `+r[4].src+`1440.webp 1440w,
                        `+r[4].src+`2880.webp 2880w,
                    `)||c(t,"srcset",n),c(a,"role","presentation"),c(a,"decoding","async"),c(a,"loading","lazy"),c(a,"sizes",`
                        (max-width: 749px) calc(100vw * `+r[3]+`), 
                        (max-width: 1520px) calc((100vw * `+r[3]+`) - 80px), 
                        1440px
                    `),Z(a,l=`
                        `+r[4].src+`360.jpg 360w, 
                        `+r[4].src+`576.jpg 576w, 
                        `+r[4].src+`720.jpg 720w,
                        `+r[4].src+`1440.jpg 1440w,
                        `+r[4].src+`2880.jpg 2880w,
                    `)||c(a,"srcset",l),x(a.src,o=r[4].src+"360.jpg")||c(a,"src",o),c(a,"alt",p=r[4].alt),c(a,"class","svelte-ztmn4v"),c(k,"class","screenreader-only"),c(e,"class",f=W(r[0]=="c"?"img-center "+r[2]:"")+" svelte-ztmn4v")},m(u,w){D(u,e,w),_(e,s),_(s,t),_(s,i),_(s,a),_(e,$),_(e,k),_(k,I),_(e,m)},p(u,w){w&2&&n!==(n=`
                        `+u[4].src+`360.webp 360w, 
                        `+u[4].src+`576.webp 576w, 
                        `+u[4].src+`720.webp 720w,
                        `+u[4].src+`1440.webp 1440w,
                        `+u[4].src+`2880.webp 2880w,
                    `)&&c(t,"srcset",n),w&2&&l!==(l=`
                        `+u[4].src+`360.jpg 360w, 
                        `+u[4].src+`576.jpg 576w, 
                        `+u[4].src+`720.jpg 720w,
                        `+u[4].src+`1440.jpg 1440w,
                        `+u[4].src+`2880.jpg 2880w,
                    `)&&c(a,"srcset",l),w&2&&!x(a.src,o=u[4].src+"360.jpg")&&c(a,"src",o),w&2&&p!==(p=u[4].alt)&&c(a,"alt",p),w&2&&d!==(d=u[4].alt+"")&&X(I,d),w&5&&f!==(f=W(u[0]=="c"?"img-center "+u[2]:"")+" svelte-ztmn4v")&&c(e,"class",f)},d(u){u&&v(e)}}}function Ge(r){let e,s,t=L(r[1]),n=[];for(let i=0;i<t.length;i+=1)n[i]=de(he(r,t,i));return{c(){e=y("div");for(let i=0;i<n.length;i+=1)n[i].c();this.h()},l(i){e=j(i,"DIV",{class:!0});var a=T(e);for(let l=0;l<n.length;l+=1)n[l].l(a);a.forEach(v),this.h()},h(){c(e,"class",s=W(r[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")},m(i,a){D(i,e,a);for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(e,null)},p(i,[a]){if(a&15){t=L(i[1]);let l;for(l=0;l<t.length;l+=1){const o=he(i,t,l);n[l]?n[l].p(o,a):(n[l]=de(o),n[l].c(),n[l].m(e,null))}for(;l<n.length;l+=1)n[l].d(1);n.length=t.length}a&1&&s!==(s=W(i[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")&&c(e,"class",s)},i:ee,o:ee,d(i){i&&v(e),ce(n,i)}}}function Ue(r,e,s){let{type:t}=e,{img:n}=e,{pd:i=""}=e,a=t==="s"?.5:1;return r.$$set=l=>{"type"in l&&s(0,t=l.type),"img"in l&&s(1,n=l.img),"pd"in l&&s(2,i=l.pd)},[t,n,i,a]}class Ve extends ne{constructor(e){super(),re(this,e,Ue,Ge,le,{type:0,img:1,pd:2})}}function ve(r,e,s){const t=r.slice();return t[1]=e[s],t}function we(r){let e,s,t=L(r[0].content),n=[];for(let a=0;a<t.length;a+=1)n[a]=be(ve(r,t,a));const i=a=>B(n[a],1,1,()=>{n[a]=null});return{c(){for(let a=0;a<n.length;a+=1)n[a].c();e=te()},l(a){for(let l=0;l<n.length;l+=1)n[l].l(a);e=te()},m(a,l){for(let o=0;o<n.length;o+=1)n[o]&&n[o].m(a,l);D(a,e,l),s=!0},p(a,l){if(l&1){t=L(a[0].content);let o;for(o=0;o<t.length;o+=1){const p=ve(a,t,o);n[o]?(n[o].p(p,l),P(n[o],1)):(n[o]=be(p),n[o].c(),P(n[o],1),n[o].m(e.parentNode,e))}for(se(),o=t.length;o<n.length;o+=1)i(o);ae()}},i(a){if(!s){for(let l=0;l<t.length;l+=1)P(n[l]);s=!0}},o(a){n=n.filter(Boolean);for(let l=0;l<n.length;l+=1)B(n[l]);s=!1},d(a){a&&v(e),ce(n,a)}}}function Me(r){let e,s;return e=new Ve({props:{type:r[1].type,pd:r[1].pd,img:r[1].img}}),{c(){U(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,n){M(e,t,n),s=!0},p(t,n){const i={};n&1&&(i.type=t[1].type),n&1&&(i.pd=t[1].pd),n&1&&(i.img=t[1].img),e.$set(i)},i(t){s||(P(e.$$.fragment,t),s=!0)},o(t){B(e.$$.fragment,t),s=!1},d(t){q(e,t)}}}function qe(r){let e,s;return e=new Fe({props:{title:r[1].title,body:r[1].body}}),{c(){U(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,n){M(e,t,n),s=!0},p(t,n){const i={};n&1&&(i.title=t[1].title),n&1&&(i.body=t[1].body),e.$set(i)},i(t){s||(P(e.$$.fragment,t),s=!0)},o(t){B(e.$$.fragment,t),s=!1},d(t){q(e,t)}}}function be(r){let e,s,t,n;const i=[qe,Me],a=[];function l(o,p){return o[1].block=="txt"?0:o[1].block=="img"?1:-1}return~(e=l(r))&&(s=a[e]=i[e](r)),{c(){s&&s.c(),t=te()},l(o){s&&s.l(o),t=te()},m(o,p){~e&&a[e].m(o,p),D(o,t,p),n=!0},p(o,p){let $=e;e=l(o),e===$?~e&&a[e].p(o,p):(s&&(se(),B(a[$],1,1,()=>{a[$]=null}),ae()),~e?(s=a[e],s?s.p(o,p):(s=a[e]=i[e](o),s.c()),P(s,1),s.m(t.parentNode,t)):s=null)},i(o){n||(P(s),n=!0)},o(o){B(s),n=!1},d(o){o&&v(t),~e&&a[e].d(o)}}}function Le(r){let e,s,t,n,i,a,l,o,p,$,k,d,I;document.title=e=r[0]?r[0].info.title:"Project not found",i=new je({props:{link:"/#proj-"+r[0].id}}),p=new De({props:{title:r[0].info.title,year:r[0].info.year,contributions:r[0].info.con,i:r[0].preview}});let m=r[0].content&&we(r);return d=new Ie({}),{c(){s=A(),t=y("div"),n=y("nav"),U(i.$$.fragment),a=A(),l=y("article"),o=y("main"),U(p.$$.fragment),$=A(),m&&m.c(),k=A(),U(d.$$.fragment),this.h()},l(f){Ce("svelte-1jt70ms",document.head).forEach(v),s=C(f),t=j(f,"DIV",{class:!0});var w=T(t);n=j(w,"NAV",{class:!0});var z=T(n);V(i.$$.fragment,z),z.forEach(v),a=C(w),l=j(w,"ARTICLE",{class:!0});var H=T(l);o=j(H,"MAIN",{class:!0});var R=T(o);V(p.$$.fragment,R),$=C(R),m&&m.l(R),R.forEach(v),k=C(H),V(d.$$.fragment,H),H.forEach(v),w.forEach(v),this.h()},h(){c(n,"class","svelte-1ryd7sc"),c(o,"class","svelte-1ryd7sc"),c(l,"class","svelte-1ryd7sc"),c(t,"class","post-wrapper svelte-1ryd7sc")},m(f,u){D(f,s,u),D(f,t,u),_(t,n),M(i,n,null),_(t,a),_(t,l),_(l,o),M(p,o,null),_(o,$),m&&m.m(o,null),_(l,k),M(d,l,null),I=!0},p(f,[u]){(!I||u&1)&&e!==(e=f[0]?f[0].info.title:"Project not found")&&(document.title=e);const w={};u&1&&(w.link="/#proj-"+f[0].id),i.$set(w);const z={};u&1&&(z.title=f[0].info.title),u&1&&(z.year=f[0].info.year),u&1&&(z.contributions=f[0].info.con),u&1&&(z.i=f[0].preview),p.$set(z),f[0].content?m?(m.p(f,u),u&1&&P(m,1)):(m=we(f),m.c(),P(m,1),m.m(o,null)):m&&(se(),B(m,1,1,()=>{m=null}),ae())},i(f){I||(P(i.$$.fragment,f),P(p.$$.fragment,f),P(m),P(d.$$.fragment,f),I=!0)},o(f){B(i.$$.fragment,f),B(p.$$.fragment,f),B(m),B(d.$$.fragment,f),I=!1},d(f){f&&(v(s),v(t)),q(i),q(p),m&&m.d(),q(d)}}}function We(r,e,s){let{data:t}=e;return r.$$set=n=>{"data"in n&&s(0,t=n.data)},[t]}class Ze extends ne{constructor(e){super(),re(this,e,We,Le,le,{data:0})}}export{Ze as component,Ye as universal};