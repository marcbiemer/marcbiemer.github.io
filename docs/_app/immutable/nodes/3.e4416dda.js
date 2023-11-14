import{H as ye}from"../chunks/control.f5b05b5f.js";import{p as J,e as L,T as Ee,L as je,F as Ie}from"../chunks/data.86e921bd.js";import{s as le,r as Y,v as Z,o as $e,n as x,z as ee}from"../chunks/scheduler.be5b98fe.js";import{S as ne,i as re,g as k,s as A,m as K,h as y,j as $,c as C,f as d,n as Q,k as c,a as D,x as g,o as W,d as z,p as se,b as ie,t as B,B as ce,r as U,u as V,v as M,w as q,H as Te,D as ze,C as Pe,e as te}from"../chunks/index.afe5b5ca.js";function Ae(r,e){return new ye(r,e)}new TextEncoder;function Ce({params:r}){for(let e=0;e<J.length;e++)if(r.slug===J[e].info.path)return{info:J[e].info,preview:J[e].preview,content:J[e].content,id:e};throw Ae(404,"Not found")}const We=Object.freeze(Object.defineProperty({__proto__:null,load:Ce},Symbol.toStringTag,{value:"Module"}));function pe(r,e,s){const t=r.slice();return t[4]=e[s],t}function me(r){let e,s;return e=new Ee({props:{label:r[4]}}),{c(){U(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,l){M(e,t,l),s=!0},p(t,l){const o={};l&4&&(o.label=t[4]),e.$set(o)},i(t){s||(z(e.$$.fragment,t),s=!0)},o(t){B(e.$$.fragment,t),s=!1},d(t){q(e,t)}}}function Be(r){let e,s,t,l,o,i,n,a,_,j,T,E,P=r[3].imgAlt+"",h,p,f,v,I,H,R,G,X,ae,O,N,S=L(r[2]),b=[];for(let u=0;u<S.length;u+=1)b[u]=me(pe(r,S,u));const ke=u=>B(b[u],1,1,()=>{b[u]=null});return{c(){e=k("header"),s=k("figure"),t=k("picture"),l=k("source"),i=A(),n=k("img"),T=A(),E=k("figcaption"),h=K(P),p=A(),f=k("div"),v=A(),I=k("p"),H=K(r[1]),R=A(),G=k("h1"),X=K(r[0]),ae=A(),O=k("div");for(let u=0;u<b.length;u+=1)b[u].c();this.h()},l(u){e=y(u,"HEADER",{class:!0});var m=$(e);s=y(m,"FIGURE",{class:!0});var w=$(s);t=y(w,"PICTURE",{class:!0});var F=$(t);l=y(F,"SOURCE",{type:!0,srcset:!0,class:!0}),i=C(F),n=y(F,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),F.forEach(d),T=C(w),E=y(w,"FIGCAPTION",{class:!0});var fe=$(E);h=Q(fe,P),fe.forEach(d),w.forEach(d),p=C(m),f=y(m,"DIV",{class:!0}),$(f).forEach(d),v=C(m),I=y(m,"P",{class:!0});var ue=$(I);H=Q(ue,r[1]),ue.forEach(d),R=C(m),G=y(m,"H1",{class:!0});var ge=$(G);X=Q(ge,r[0]),ge.forEach(d),ae=C(m),O=y(m,"DIV",{class:!0});var _e=$(O);for(let oe=0;oe<b.length;oe+=1)b[oe].l(_e);_e.forEach(d),m.forEach(d),this.h()},h(){c(l,"type","image/webp"),Y(l,o=`
                    `+r[3].url+`360.webp 360w, 
                    `+r[3].url+`576.webp 576w, 
                    `+r[3].url+`720.webp 720w,
                    `+r[3].url+`1440.webp 1440w,
                    `+r[3].url+`2880.webp 2880w,
                `)||c(l,"srcset",o),c(l,"class","svelte-sblkxr"),c(n,"role","presentation"),c(n,"decoding","async"),c(n,"loading","lazy"),c(n,"sizes",`
                    (max-width: 749px) calc(100vw), 
                    (max-width: 1520px) calc(100vw - 80px), 
                    1440px
                `),Y(n,a=`
                    `+r[3].url+`360.jpg 360w, 
                    `+r[3].url+`576.jpg 576w, 
                    `+r[3].url+`720.jpg 720w,
                    `+r[3].url+`1440.jpg 1440w,
                    `+r[3].url+`2880.jpg 2880w,
                `)||c(n,"srcset",a),Z(n.src,_=r[3].url+"360.jpg")||c(n,"src",_),c(n,"alt",j=r[3].imgAlt),c(n,"class","svelte-sblkxr"),c(t,"class","svelte-sblkxr"),c(E,"class","screenreader-only svelte-sblkxr"),c(s,"class","header-img-wrapper svelte-sblkxr"),c(f,"class","overlay svelte-sblkxr"),c(I,"class","txt-c-2 svelte-sblkxr"),c(G,"class","txt-d svelte-sblkxr"),c(O,"class","tag-wrapper svelte-sblkxr"),c(e,"class","svelte-sblkxr")},m(u,m){D(u,e,m),g(e,s),g(s,t),g(t,l),g(t,i),g(t,n),g(s,T),g(s,E),g(E,h),g(e,p),g(e,f),g(e,v),g(e,I),g(I,H),g(e,R),g(e,G),g(G,X),g(e,ae),g(e,O);for(let w=0;w<b.length;w+=1)b[w]&&b[w].m(O,null);N=!0},p(u,[m]){if((!N||m&8&&o!==(o=`
                    `+u[3].url+`360.webp 360w, 
                    `+u[3].url+`576.webp 576w, 
                    `+u[3].url+`720.webp 720w,
                    `+u[3].url+`1440.webp 1440w,
                    `+u[3].url+`2880.webp 2880w,
                `))&&c(l,"srcset",o),(!N||m&8&&a!==(a=`
                    `+u[3].url+`360.jpg 360w, 
                    `+u[3].url+`576.jpg 576w, 
                    `+u[3].url+`720.jpg 720w,
                    `+u[3].url+`1440.jpg 1440w,
                    `+u[3].url+`2880.jpg 2880w,
                `))&&c(n,"srcset",a),(!N||m&8&&!Z(n.src,_=u[3].url+"360.jpg"))&&c(n,"src",_),(!N||m&8&&j!==(j=u[3].imgAlt))&&c(n,"alt",j),(!N||m&8)&&P!==(P=u[3].imgAlt+"")&&W(h,P),(!N||m&2)&&W(H,u[1]),(!N||m&1)&&W(X,u[0]),m&4){S=L(u[2]);let w;for(w=0;w<S.length;w+=1){const F=pe(u,S,w);b[w]?(b[w].p(F,m),z(b[w],1)):(b[w]=me(F),b[w].c(),z(b[w],1),b[w].m(O,null))}for(se(),w=S.length;w<b.length;w+=1)ke(w);ie()}},i(u){if(!N){for(let m=0;m<S.length;m+=1)z(b[m]);N=!0}},o(u){b=b.filter(Boolean);for(let m=0;m<b.length;m+=1)B(b[m]);N=!1},d(u){u&&d(e),ce(b,u)}}}function He(r,e,s){let{title:t}=e,{year:l}=e,{contributions:o}=e,{i}=e;return $e(()=>{"ontouchstart"in window?document.documentElement.style.setProperty("--doc-height",`${window.innerHeight}px`):document.documentElement.style.setProperty("--doc-height","100vh")}),r.$$set=n=>{"title"in n&&s(0,t=n.title),"year"in n&&s(1,l=n.year),"contributions"in n&&s(2,o=n.contributions),"i"in n&&s(3,i=n.i)},[t,l,o,i]}class Ne extends ne{constructor(e){super(),re(this,e,He,Be,le,{title:0,year:1,contributions:2,i:3})}}function Re(r){let e,s,t,l,o,i,n;return{c(){e=k("div"),s=k("section"),t=k("h2"),l=K(r[0]),o=A(),i=k("p"),n=new Te(!1),this.h()},l(a){e=y(a,"DIV",{});var _=$(e);s=y(_,"SECTION",{class:!0});var j=$(s);t=y(j,"H2",{class:!0});var T=$(t);l=Q(T,r[0]),T.forEach(d),o=C(j),i=y(j,"P",{class:!0});var E=$(i);n=ze(E,!1),E.forEach(d),j.forEach(d),_.forEach(d),this.h()},h(){c(t,"class","txt-h svelte-17m1nc"),n.a=null,c(i,"class","txt-b svelte-17m1nc"),c(s,"class","svelte-17m1nc")},m(a,_){D(a,e,_),g(e,s),g(s,t),g(t,l),g(s,o),g(s,i),n.m(r[1],i)},p(a,[_]){_&1&&W(l,a[0]),_&2&&n.p(a[1])},i:x,o:x,d(a){a&&d(e)}}}function De(r,e,s){let{title:t}=e,{body:l}=e;return r.$$set=o=>{"title"in o&&s(0,t=o.title),"body"in o&&s(1,l=o.body)},[t,l]}class Oe extends ne{constructor(e){super(),re(this,e,De,Re,le,{title:0,body:1})}}function he(r,e,s){const t=r.slice();return t[4]=e[s],t}function de(r){let e,s,t,l,o,i,n,a,_,j,T,E=r[4].alt+"",P,h,p;return{c(){e=k("figure"),s=k("picture"),t=k("source"),o=A(),i=k("img"),j=A(),T=k("figcaption"),P=K(E),h=A(),this.h()},l(f){e=y(f,"FIGURE",{class:!0});var v=$(e);s=y(v,"PICTURE",{});var I=$(s);t=y(I,"SOURCE",{type:!0,srcset:!0}),o=C(I),i=y(I,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),I.forEach(d),j=C(v),T=y(v,"FIGCAPTION",{class:!0});var H=$(T);P=Q(H,E),H.forEach(d),h=C(v),v.forEach(d),this.h()},h(){c(t,"type","image/webp"),Y(t,l=`
                        `+r[4].src+`360.webp 360w, 
                        `+r[4].src+`576.webp 576w, 
                        `+r[4].src+`720.webp 720w,
                        `+r[4].src+`1440.webp 1440w,
                        `+r[4].src+`2880.webp 2880w,
                    `)||c(t,"srcset",l),c(i,"role","presentation"),c(i,"decoding","async"),c(i,"loading","lazy"),c(i,"sizes",`
                        (max-width: 749px) calc(100vw * `+r[3]+`), 
                        (max-width: 1520px) calc((100vw * `+r[3]+`) - 80px), 
                        1440px
                    `),Y(i,n=`
                        `+r[4].src+`360.jpg 360w, 
                        `+r[4].src+`576.jpg 576w, 
                        `+r[4].src+`720.jpg 720w,
                        `+r[4].src+`1440.jpg 1440w,
                        `+r[4].src+`2880.jpg 2880w,
                    `)||c(i,"srcset",n),Z(i.src,a=r[4].src+"360.jpg")||c(i,"src",a),c(i,"alt",_=r[4].alt),c(i,"class","svelte-ztmn4v"),c(T,"class","screenreader-only"),c(e,"class",p=ee(r[0]=="c"?"img-center "+r[2]:"")+" svelte-ztmn4v")},m(f,v){D(f,e,v),g(e,s),g(s,t),g(s,o),g(s,i),g(e,j),g(e,T),g(T,P),g(e,h)},p(f,v){v&2&&l!==(l=`
                        `+f[4].src+`360.webp 360w, 
                        `+f[4].src+`576.webp 576w, 
                        `+f[4].src+`720.webp 720w,
                        `+f[4].src+`1440.webp 1440w,
                        `+f[4].src+`2880.webp 2880w,
                    `)&&c(t,"srcset",l),v&2&&n!==(n=`
                        `+f[4].src+`360.jpg 360w, 
                        `+f[4].src+`576.jpg 576w, 
                        `+f[4].src+`720.jpg 720w,
                        `+f[4].src+`1440.jpg 1440w,
                        `+f[4].src+`2880.jpg 2880w,
                    `)&&c(i,"srcset",n),v&2&&!Z(i.src,a=f[4].src+"360.jpg")&&c(i,"src",a),v&2&&_!==(_=f[4].alt)&&c(i,"alt",_),v&2&&E!==(E=f[4].alt+"")&&W(P,E),v&5&&p!==(p=ee(f[0]=="c"?"img-center "+f[2]:"")+" svelte-ztmn4v")&&c(e,"class",p)},d(f){f&&d(e)}}}function Se(r){let e,s,t=L(r[1]),l=[];for(let o=0;o<t.length;o+=1)l[o]=de(he(r,t,o));return{c(){e=k("div");for(let o=0;o<l.length;o+=1)l[o].c();this.h()},l(o){e=y(o,"DIV",{class:!0});var i=$(e);for(let n=0;n<l.length;n+=1)l[n].l(i);i.forEach(d),this.h()},h(){c(e,"class",s=ee(r[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")},m(o,i){D(o,e,i);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null)},p(o,[i]){if(i&15){t=L(o[1]);let n;for(n=0;n<t.length;n+=1){const a=he(o,t,n);l[n]?l[n].p(a,i):(l[n]=de(a),l[n].c(),l[n].m(e,null))}for(;n<l.length;n+=1)l[n].d(1);l.length=t.length}i&1&&s!==(s=ee(o[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")&&c(e,"class",s)},i:x,o:x,d(o){o&&d(e),ce(l,o)}}}function Fe(r,e,s){let{type:t}=e,{img:l}=e,{pd:o=""}=e,i=t==="s"?.5:1;return r.$$set=n=>{"type"in n&&s(0,t=n.type),"img"in n&&s(1,l=n.img),"pd"in n&&s(2,o=n.pd)},[t,l,o,i]}class Ge extends ne{constructor(e){super(),re(this,e,Fe,Se,le,{type:0,img:1,pd:2})}}function ve(r,e,s){const t=r.slice();return t[1]=e[s],t}function we(r){let e,s,t=L(r[0].content),l=[];for(let i=0;i<t.length;i+=1)l[i]=be(ve(r,t,i));const o=i=>B(l[i],1,1,()=>{l[i]=null});return{c(){for(let i=0;i<l.length;i+=1)l[i].c();e=te()},l(i){for(let n=0;n<l.length;n+=1)l[n].l(i);e=te()},m(i,n){for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(i,n);D(i,e,n),s=!0},p(i,n){if(n&1){t=L(i[0].content);let a;for(a=0;a<t.length;a+=1){const _=ve(i,t,a);l[a]?(l[a].p(_,n),z(l[a],1)):(l[a]=be(_),l[a].c(),z(l[a],1),l[a].m(e.parentNode,e))}for(se(),a=t.length;a<l.length;a+=1)o(a);ie()}},i(i){if(!s){for(let n=0;n<t.length;n+=1)z(l[n]);s=!0}},o(i){l=l.filter(Boolean);for(let n=0;n<l.length;n+=1)B(l[n]);s=!1},d(i){i&&d(e),ce(l,i)}}}function Ue(r){let e,s;return e=new Ge({props:{type:r[1].type,pd:r[1].pd,img:r[1].img}}),{c(){U(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,l){M(e,t,l),s=!0},p(t,l){const o={};l&1&&(o.type=t[1].type),l&1&&(o.pd=t[1].pd),l&1&&(o.img=t[1].img),e.$set(o)},i(t){s||(z(e.$$.fragment,t),s=!0)},o(t){B(e.$$.fragment,t),s=!1},d(t){q(e,t)}}}function Ve(r){let e,s;return e=new Oe({props:{title:r[1].title,body:r[1].body}}),{c(){U(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,l){M(e,t,l),s=!0},p(t,l){const o={};l&1&&(o.title=t[1].title),l&1&&(o.body=t[1].body),e.$set(o)},i(t){s||(z(e.$$.fragment,t),s=!0)},o(t){B(e.$$.fragment,t),s=!1},d(t){q(e,t)}}}function be(r){let e,s,t,l;const o=[Ve,Ue],i=[];function n(a,_){return a[1].block=="txt"?0:a[1].block=="img"?1:-1}return~(e=n(r))&&(s=i[e]=o[e](r)),{c(){s&&s.c(),t=te()},l(a){s&&s.l(a),t=te()},m(a,_){~e&&i[e].m(a,_),D(a,t,_),l=!0},p(a,_){let j=e;e=n(a),e===j?~e&&i[e].p(a,_):(s&&(se(),B(i[j],1,1,()=>{i[j]=null}),ie()),~e?(s=i[e],s?s.p(a,_):(s=i[e]=o[e](a),s.c()),z(s,1),s.m(t.parentNode,t)):s=null)},i(a){l||(z(s),l=!0)},o(a){B(s),l=!1},d(a){a&&d(t),~e&&i[e].d(a)}}}function Me(r){let e,s,t,l,o,i,n,a,_,j,T,E,P;document.title=e=r[0]?r[0].info.title:"Project not found",o=new je({props:{link:"/#proj-"+r[0].id}}),_=new Ne({props:{title:r[0].info.title,year:r[0].info.year,contributions:r[0].info.con,i:r[0].preview}});let h=r[0].content&&we(r);return E=new Ie({}),{c(){s=A(),t=k("div"),l=k("nav"),U(o.$$.fragment),i=A(),n=k("article"),a=k("main"),U(_.$$.fragment),j=A(),h&&h.c(),T=A(),U(E.$$.fragment),this.h()},l(p){Pe("svelte-1jt70ms",document.head).forEach(d),s=C(p),t=y(p,"DIV",{class:!0});var v=$(t);l=y(v,"NAV",{class:!0});var I=$(l);V(o.$$.fragment,I),I.forEach(d),i=C(v),n=y(v,"ARTICLE",{class:!0});var H=$(n);a=y(H,"MAIN",{class:!0});var R=$(a);V(_.$$.fragment,R),j=C(R),h&&h.l(R),R.forEach(d),T=C(H),V(E.$$.fragment,H),H.forEach(d),v.forEach(d),this.h()},h(){c(l,"class","svelte-1ryd7sc"),c(a,"class","svelte-1ryd7sc"),c(n,"class","svelte-1ryd7sc"),c(t,"class","post-wrapper svelte-1ryd7sc")},m(p,f){D(p,s,f),D(p,t,f),g(t,l),M(o,l,null),g(t,i),g(t,n),g(n,a),M(_,a,null),g(a,j),h&&h.m(a,null),g(n,T),M(E,n,null),P=!0},p(p,[f]){(!P||f&1)&&e!==(e=p[0]?p[0].info.title:"Project not found")&&(document.title=e);const v={};f&1&&(v.link="/#proj-"+p[0].id),o.$set(v);const I={};f&1&&(I.title=p[0].info.title),f&1&&(I.year=p[0].info.year),f&1&&(I.contributions=p[0].info.con),f&1&&(I.i=p[0].preview),_.$set(I),p[0].content?h?(h.p(p,f),f&1&&z(h,1)):(h=we(p),h.c(),z(h,1),h.m(a,null)):h&&(se(),B(h,1,1,()=>{h=null}),ie())},i(p){P||(z(o.$$.fragment,p),z(_.$$.fragment,p),z(h),z(E.$$.fragment,p),P=!0)},o(p){B(o.$$.fragment,p),B(_.$$.fragment,p),B(h),B(E.$$.fragment,p),P=!1},d(p){p&&(d(s),d(t)),q(o),q(_),h&&h.d(),q(E)}}}function qe(r,e,s){let{data:t}=e;return r.$$set=l=>{"data"in l&&s(0,t=l.data)},[t]}class Xe extends ne{constructor(e){super(),re(this,e,qe,Me,le,{data:0})}}export{Xe as component,We as universal};