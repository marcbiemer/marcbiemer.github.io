import{H as Re}from"../chunks/control.f5b05b5f.js";import{p as M,e as re,T as Ue,F as Me}from"../chunks/data.4cd4c1d6.js";import{s as ne,n as J,A as he,r as pe,v as ge,y as De,w as _e,o as Fe}from"../chunks/scheduler.29c4cb82.js";import{S as se,i as ie,g as d,m as X,h as b,j as $,n as W,f as m,k as c,a as V,y as p,s as N,c as O,l as fe,D as ue,o as le,d as H,p as ve,b as me,t as B,B as be,r as Q,u as Y,v as Z,w as x,H as Ve,E as Le,x as ke,C as qe,e as de}from"../chunks/index.217c91ce.js";const Ge=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Xe(l,e){return new Re(l,e)}new TextEncoder;function We({params:l}){for(let e=0;e<M.length;e++)if(l.slug===M[e].info.path){let n=e===0?M.length-1:e-1,t=e===M.length-1?0:e+1,r=t===M.length-1?0:t+1;return{info:M[e].info,preview:M[e].preview,content:M[e].content,id:e,previews:[{id:n,info:M[n].info,preview:M[n].preview},{id:t,info:M[t].info,preview:M[t].preview},{id:r,info:M[r].info,preview:M[r].preview}]}}throw Xe(404,"Not found")}const kt=Object.freeze(Object.defineProperty({__proto__:null,load:We},Symbol.toStringTag,{value:"Module"}));function Je(l){let e,n,t,r;return{c(){e=d("button"),n=d("a"),t=X("← Home"),this.h()},l(a){e=b(a,"BUTTON",{class:!0});var i=$(e);n=b(i,"A",{href:!0,class:!0});var s=$(n);t=W(s,"← Home"),s.forEach(m),i.forEach(m),this.h()},h(){c(n,"href",r=l[0]?"/#proj-"+l[0]:"/"),c(n,"class","txt-c-2 svelte-1wu53n7"),c(e,"class","svelte-1wu53n7")},m(a,i){V(a,e,i),p(e,n),p(n,t)},p(a,[i]){i&1&&r!==(r=a[0]?"/#proj-"+a[0]:"/")&&c(n,"href",r)},i:J,o:J,d(a){a&&m(e)}}}function Ke(l,e,n){let{id:t}=e;return l.$$set=r=>{"id"in r&&n(0,t=r.id)},[t]}class Qe extends se{constructor(e){super(),ie(this,e,Ke,Je,ne,{id:0})}}function Pe(l,e,n){const t=l.slice();return t[8]=e[n],t}function ze(l){let e,n;return e=new Ue({props:{label:l[8]}}),{c(){Q(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,r){Z(e,t,r),n=!0},p(t,r){const a={};r&4&&(a.label=t[8]),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function Ye(l){let e=!1,n=()=>{e=!1},t,r,a,i,s,o,v,f,u,g,y,S,P,j=l[3].imgAlt+"",w,h=`scale(${ce(l[4],.1*l[5],.5*l[5],.8,1)}) translateY(${ce(l[4],0,.5*l[5],0,25)}%)`,C,k,D,G,q,U,ee,K,F,R,te,z;he(l[6]),he(l[7]);let A=re(l[2]),T=[];for(let _=0;_<A.length;_+=1)T[_]=ze(Pe(l,A,_));const ae=_=>B(T[_],1,1,()=>{T[_]=null});return{c(){r=d("header"),a=d("figure"),i=d("picture"),s=d("source"),v=N(),f=d("img"),S=N(),P=d("figcaption"),w=X(j),C=N(),k=d("div"),D=d("p"),G=X(l[1]),q=N(),U=d("h1"),ee=X(l[0]),K=N(),F=d("div");for(let _=0;_<T.length;_+=1)T[_].c();this.h()},l(_){r=b(_,"HEADER",{class:!0});var E=$(r);a=b(E,"FIGURE",{class:!0});var I=$(a);i=b(I,"PICTURE",{});var L=$(i);s=b(L,"SOURCE",{type:!0,srcset:!0}),v=O(L),f=b(L,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),L.forEach(m),S=O(I),P=b(I,"FIGCAPTION",{class:!0});var $e=$(P);w=W($e,j),$e.forEach(m),I.forEach(m),C=O(E),k=b(E,"DIV",{class:!0});var oe=$(k);D=b(oe,"P",{class:!0});var Ee=$(D);G=W(Ee,l[1]),Ee.forEach(m),q=O(oe),U=b(oe,"H1",{class:!0});var Te=$(U);ee=W(Te,l[0]),Te.forEach(m),K=O(oe),F=b(oe,"DIV",{class:!0});var Ie=$(F);for(let je=0;je<T.length;je+=1)T[je].l(Ie);Ie.forEach(m),oe.forEach(m),E.forEach(m),this.h()},h(){c(s,"type","image/webp"),pe(s,o=`
                    `+l[3].url+`360.webp 360w, 
                    `+l[3].url+`576.webp 576w, 
                    `+l[3].url+`720.webp 720w,
                    `+l[3].url+`1440.webp 1440w,
                    `+l[3].url+`2880.webp 2880w,
                `)||c(s,"srcset",o),c(f,"role","presentation"),c(f,"decoding","async"),c(f,"loading","lazy"),c(f,"sizes",`
                    (max-width: 749px) calc(100vw), 
                    (max-width: 1520px) calc(100vw - 80px), 
                    1440px
                `),pe(f,u=`
                    `+l[3].url+`360.jpg 360w, 
                    `+l[3].url+`576.jpg 576w, 
                    `+l[3].url+`720.jpg 720w,
                    `+l[3].url+`1440.jpg 1440w,
                    `+l[3].url+`2880.jpg 2880w,
                `)||c(f,"srcset",u),ge(f.src,g=l[3].url+"360.jpg")||c(f,"src",g),c(f,"alt",y=l[3].imgAlt),c(f,"class","svelte-ob8ec7"),c(P,"class","screenreader-only"),c(a,"class","header-img-wrapper svelte-ob8ec7"),fe(a,"opacity",ce(l[4],.1*l[5],.5*l[5],1,.66)),fe(a,"transform",h),c(D,"class","txt-c-2"),c(U,"class","txt-d svelte-ob8ec7"),c(F,"class","tag-wrapper svelte-ob8ec7"),c(k,"class","title-wrapper svelte-ob8ec7"),c(r,"class","svelte-ob8ec7")},m(_,E){V(_,r,E),p(r,a),p(a,i),p(i,s),p(i,v),p(i,f),p(a,S),p(a,P),p(P,w),p(r,C),p(r,k),p(k,D),p(D,G),p(k,q),p(k,U),p(U,ee),p(k,K),p(k,F);for(let I=0;I<T.length;I+=1)T[I]&&T[I].m(F,null);R=!0,te||(z=[ue(window,"scroll",()=>{e=!0,clearTimeout(t),t=setTimeout(n,100),l[6]()}),ue(window,"resize",l[7])],te=!0)},p(_,[E]){if(E&16&&!e&&(e=!0,clearTimeout(t),scrollTo(window.pageXOffset,_[4]),t=setTimeout(n,100)),(!R||E&8&&o!==(o=`
                    `+_[3].url+`360.webp 360w, 
                    `+_[3].url+`576.webp 576w, 
                    `+_[3].url+`720.webp 720w,
                    `+_[3].url+`1440.webp 1440w,
                    `+_[3].url+`2880.webp 2880w,
                `))&&c(s,"srcset",o),(!R||E&8&&u!==(u=`
                    `+_[3].url+`360.jpg 360w, 
                    `+_[3].url+`576.jpg 576w, 
                    `+_[3].url+`720.jpg 720w,
                    `+_[3].url+`1440.jpg 1440w,
                    `+_[3].url+`2880.jpg 2880w,
                `))&&c(f,"srcset",u),(!R||E&8&&!ge(f.src,g=_[3].url+"360.jpg"))&&c(f,"src",g),(!R||E&8&&y!==(y=_[3].imgAlt))&&c(f,"alt",y),(!R||E&8)&&j!==(j=_[3].imgAlt+"")&&le(w,j),E&48&&fe(a,"opacity",ce(_[4],.1*_[5],.5*_[5],1,.66)),E&48&&h!==(h=`scale(${ce(_[4],.1*_[5],.5*_[5],.8,1)}) translateY(${ce(_[4],0,.5*_[5],0,25)}%)`)&&fe(a,"transform",h),(!R||E&2)&&le(G,_[1]),(!R||E&1)&&le(ee,_[0]),E&4){A=re(_[2]);let I;for(I=0;I<A.length;I+=1){const L=Pe(_,A,I);T[I]?(T[I].p(L,E),H(T[I],1)):(T[I]=ze(L),T[I].c(),H(T[I],1),T[I].m(F,null))}for(ve(),I=A.length;I<T.length;I+=1)ae(I);me()}},i(_){if(!R){for(let E=0;E<A.length;E+=1)H(T[E]);R=!0}},o(_){T=T.filter(Boolean);for(let E=0;E<T.length;E+=1)B(T[E]);R=!1},d(_){_&&m(r),be(T,_),te=!1,De(z)}}}function ce(l,e,n,t,r){const a=n-e,i=r-t;if(l<e)return t;if(e<=l&&l<=n){const s=(l-e)/a;return t+i*s}else if(n<l)return r}function Ze(l,e,n){let{title:t}=e,{year:r}=e,{contributions:a}=e,{i}=e,s=0,o;function v(){n(4,s=window.pageYOffset)}function f(){n(5,o=window.innerHeight)}return l.$$set=u=>{"title"in u&&n(0,t=u.title),"year"in u&&n(1,r=u.year),"contributions"in u&&n(2,a=u.contributions),"i"in u&&n(3,i=u.i)},[t,r,a,i,s,o,v,f]}class xe extends se{constructor(e){super(),ie(this,e,Ze,Ye,ne,{title:0,year:1,contributions:2,i:3})}}function et(l){let e,n,t,r,a,i,s,o,v,f;return he(l[3]),{c(){e=d("div"),n=d("section"),t=d("h2"),r=X(l[0]),a=N(),i=d("p"),s=new Ve(!1),this.h()},l(u){e=b(u,"DIV",{});var g=$(e);n=b(g,"SECTION",{class:!0});var y=$(n);t=b(y,"H2",{class:!0});var S=$(t);r=W(S,l[0]),S.forEach(m),a=O(y),i=b(y,"P",{class:!0});var P=$(i);s=Le(P,!1),P.forEach(m),y.forEach(m),g.forEach(m),this.h()},h(){c(t,"class","txt-c-2 svelte-ppmkmv"),s.a=null,c(i,"class",o=_e(l[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv"),c(n,"class","svelte-ppmkmv")},m(u,g){V(u,e,g),p(e,n),p(n,t),p(t,r),p(n,a),p(n,i),s.m(l[1],i),v||(f=ue(window,"resize",l[3]),v=!0)},p(u,[g]){g&1&&le(r,u[0]),g&2&&s.p(u[1]),g&4&&o!==(o=_e(u[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv")&&c(i,"class",o)},i:J,o:J,d(u){u&&m(e),v=!1,f()}}}function tt(l,e,n){let{title:t}=e,{body:r}=e,a;function i(){n(2,a=window.innerWidth)}return l.$$set=s=>{"title"in s&&n(0,t=s.title),"body"in s&&n(1,r=s.body)},[t,r,a,i]}class lt extends se{constructor(e){super(),ie(this,e,tt,et,ne,{title:0,body:1})}}function Ae(l,e,n){const t=l.slice();return t[4]=e[n],t}function Ce(l){let e,n,t,r,a,i,s,o,v,f,u,g=l[4].alt+"",y,S,P;return{c(){e=d("figure"),n=d("picture"),t=d("source"),a=N(),i=d("img"),f=N(),u=d("figcaption"),y=X(g),S=N(),this.h()},l(j){e=b(j,"FIGURE",{class:!0});var w=$(e);n=b(w,"PICTURE",{});var h=$(n);t=b(h,"SOURCE",{type:!0,srcset:!0}),a=O(h),i=b(h,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),h.forEach(m),f=O(w),u=b(w,"FIGCAPTION",{class:!0});var C=$(u);y=W(C,g),C.forEach(m),S=O(w),w.forEach(m),this.h()},h(){c(t,"type","image/webp"),pe(t,r=`
                        `+l[4].src+`360.webp 360w, 
                        `+l[4].src+`576.webp 576w, 
                        `+l[4].src+`720.webp 720w,
                        `+l[4].src+`1440.webp 1440w,
                        `+l[4].src+`2880.webp 2880w,
                    `)||c(t,"srcset",r),c(i,"role","presentation"),c(i,"decoding","async"),c(i,"loading","lazy"),c(i,"sizes",`
                        (max-width: 749px) calc(100vw * `+l[3]+`), 
                        (max-width: 1520px) calc((100vw * `+l[3]+`) - 80px), 
                        1440px
                    `),pe(i,s=`
                        `+l[4].src+`360.jpg 360w, 
                        `+l[4].src+`576.jpg 576w, 
                        `+l[4].src+`720.jpg 720w,
                        `+l[4].src+`1440.jpg 1440w,
                        `+l[4].src+`2880.jpg 2880w,
                    `)||c(i,"srcset",s),ge(i.src,o=l[4].src+"360.jpg")||c(i,"src",o),c(i,"alt",v=l[4].alt),c(i,"class","svelte-ztmn4v"),c(u,"class","screenreader-only"),c(e,"class",P=_e(l[0]=="c"?"img-center "+l[2]:"")+" svelte-ztmn4v")},m(j,w){V(j,e,w),p(e,n),p(n,t),p(n,a),p(n,i),p(e,f),p(e,u),p(u,y),p(e,S)},p(j,w){w&2&&r!==(r=`
                        `+j[4].src+`360.webp 360w, 
                        `+j[4].src+`576.webp 576w, 
                        `+j[4].src+`720.webp 720w,
                        `+j[4].src+`1440.webp 1440w,
                        `+j[4].src+`2880.webp 2880w,
                    `)&&c(t,"srcset",r),w&2&&s!==(s=`
                        `+j[4].src+`360.jpg 360w, 
                        `+j[4].src+`576.jpg 576w, 
                        `+j[4].src+`720.jpg 720w,
                        `+j[4].src+`1440.jpg 1440w,
                        `+j[4].src+`2880.jpg 2880w,
                    `)&&c(i,"srcset",s),w&2&&!ge(i.src,o=j[4].src+"360.jpg")&&c(i,"src",o),w&2&&v!==(v=j[4].alt)&&c(i,"alt",v),w&2&&g!==(g=j[4].alt+"")&&le(y,g),w&5&&P!==(P=_e(j[0]=="c"?"img-center "+j[2]:"")+" svelte-ztmn4v")&&c(e,"class",P)},d(j){j&&m(e)}}}function rt(l){let e,n,t=re(l[1]),r=[];for(let a=0;a<t.length;a+=1)r[a]=Ce(Ae(l,t,a));return{c(){e=d("div");for(let a=0;a<r.length;a+=1)r[a].c();this.h()},l(a){e=b(a,"DIV",{class:!0});var i=$(e);for(let s=0;s<r.length;s+=1)r[s].l(i);i.forEach(m),this.h()},h(){c(e,"class",n=_e(l[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")},m(a,i){V(a,e,i);for(let s=0;s<r.length;s+=1)r[s]&&r[s].m(e,null)},p(a,[i]){if(i&15){t=re(a[1]);let s;for(s=0;s<t.length;s+=1){const o=Ae(a,t,s);r[s]?r[s].p(o,i):(r[s]=Ce(o),r[s].c(),r[s].m(e,null))}for(;s<r.length;s+=1)r[s].d(1);r.length=t.length}i&1&&n!==(n=_e(a[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")&&c(e,"class",n)},i:J,o:J,d(a){a&&m(e),be(r,a)}}}function nt(l,e,n){let{type:t}=e,{img:r}=e,{pd:a=""}=e,i=t==="s"?.5:1;return l.$$set=s=>{"type"in s&&n(0,t=s.type),"img"in s&&n(1,r=s.img),"pd"in s&&n(2,a=s.pd)},[t,r,a,i]}class st extends se{constructor(e){super(),ie(this,e,nt,rt,ne,{type:0,img:1,pd:2})}}function it(l){let e,n,t,r,a,i,s,o,v,f,u,g,y,S=l[0].info.year+"",P,j,w=l[0].info.title+"",h,C,k,D='<span class="arrow txt-b svelte-1a44y23">↓</span>',G,q,U,ee,K=l[0].id+1+"",F,R,te;return{c(){e=d("a"),n=d("figure"),t=d("picture"),r=d("source"),i=N(),s=d("img"),u=N(),g=d("figcaption"),y=d("span"),P=X(S),j=N(),h=X(w),C=N(),k=d("div"),k.innerHTML=D,G=N(),q=d("div"),U=d("span"),ee=X("00—"),F=X(K),this.h()},l(z){e=b(z,"A",{href:!0,class:!0,"aria-label":!0});var A=$(e);n=b(A,"FIGURE",{class:!0});var T=$(n);t=b(T,"PICTURE",{class:!0});var ae=$(t);r=b(ae,"SOURCE",{type:!0,srcset:!0}),i=O(ae),s=b(ae,"IMG",{decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),ae.forEach(m),u=O(T),g=b(T,"FIGCAPTION",{class:!0});var _=$(g);y=b(_,"SPAN",{class:!0});var E=$(y);P=W(E,S),E.forEach(m),j=O(_),h=W(_,w),_.forEach(m),T.forEach(m),C=O(A),k=b(A,"DIV",{class:!0,"data-svelte-h":!0}),ke(k)!=="svelte-129culz"&&(k.innerHTML=D),G=O(A),q=b(A,"DIV",{class:!0});var I=$(q);U=b(I,"SPAN",{class:!0});var L=$(U);ee=W(L,"00—"),F=W(L,K),L.forEach(m),I.forEach(m),A.forEach(m),this.h()},h(){c(r,"type","image/webp"),pe(r,a=`
                    `+l[0].preview.url+`360.webp 360w, 
                    `+l[0].preview.url+`576.webp 576w, 
                    `+l[0].preview.url+`720.webp 720w,
                    `+l[0].preview.url+`1440.webp 1440w,
                    `+l[0].preview.url+`2880.webp 2880w
                `)||c(r,"srcset",a),c(s,"decoding","async"),c(s,"loading","lazy"),c(s,"sizes",`
                    (max-width: 749px) 100vw, 
                    (max-width: 1239px) 50vw,
                    (max-width: 1520px) 30vw, 
                    295px
                `),pe(s,o=`
                    `+l[0].preview.url+`360.jpg 360w, 
                    `+l[0].preview.url+`576.jpg 576w, 
                    `+l[0].preview.url+`720.jpg 720w,
                    `+l[0].preview.url+`1440.jpg 1440w,
                    `+l[0].preview.url+`2880.jpg 2880w
                `)||c(s,"srcset",o),ge(s.src,v=l[0].preview.url+"360.jpg")||c(s,"src",v),c(s,"alt",f=l[0].preview.imgAlt),c(s,"class","svelte-1a44y23"),c(t,"class","svelte-1a44y23"),c(y,"class","txt-c-1 svelte-1a44y23"),c(g,"class","txt-h svelte-1a44y23"),c(n,"class","svelte-1a44y23"),c(k,"class","arrow-wrapper glass svelte-1a44y23"),c(U,"class","txt-c-2 id"),c(q,"class","id-wrapper glass svelte-1a44y23"),c(e,"href",R="/projects/"+l[0].info.path),c(e,"class","project-tile-wrapper svelte-1a44y23"),c(e,"aria-label",te=l[0].info.title)},m(z,A){V(z,e,A),p(e,n),p(n,t),p(t,r),p(t,i),p(t,s),p(n,u),p(n,g),p(g,y),p(y,P),p(g,j),p(g,h),p(e,C),p(e,k),p(e,G),p(e,q),p(q,U),p(U,ee),p(U,F)},p(z,[A]){A&1&&a!==(a=`
                    `+z[0].preview.url+`360.webp 360w, 
                    `+z[0].preview.url+`576.webp 576w, 
                    `+z[0].preview.url+`720.webp 720w,
                    `+z[0].preview.url+`1440.webp 1440w,
                    `+z[0].preview.url+`2880.webp 2880w
                `)&&c(r,"srcset",a),A&1&&o!==(o=`
                    `+z[0].preview.url+`360.jpg 360w, 
                    `+z[0].preview.url+`576.jpg 576w, 
                    `+z[0].preview.url+`720.jpg 720w,
                    `+z[0].preview.url+`1440.jpg 1440w,
                    `+z[0].preview.url+`2880.jpg 2880w
                `)&&c(s,"srcset",o),A&1&&!ge(s.src,v=z[0].preview.url+"360.jpg")&&c(s,"src",v),A&1&&f!==(f=z[0].preview.imgAlt)&&c(s,"alt",f),A&1&&S!==(S=z[0].info.year+"")&&le(P,S),A&1&&w!==(w=z[0].info.title+"")&&le(h,w),A&1&&K!==(K=z[0].id+1+"")&&le(F,K),A&1&&R!==(R="/projects/"+z[0].info.path)&&c(e,"href",R),A&1&&te!==(te=z[0].info.title)&&c(e,"aria-label",te)},i:J,o:J,d(z){z&&m(e)}}}function at(l,e,n){let{p:t}=e;return l.$$set=r=>{"p"in r&&n(0,t=r.p)},[t]}class ot extends se{constructor(e){super(),ie(this,e,at,it,ne,{p:0})}}function He(l,e,n){const t=l.slice();return t[1]=e[n],t}function Ne(l){let e,n;return e=new ot({props:{p:l[1]}}),{c(){Q(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,r){Z(e,t,r),n=!0},p(t,r){const a={};r&1&&(a.p=t[1]),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function ct(l){let e,n,t='<h1 class="txt-d">Explore more</h1> <p class="txt-b svelte-y3xkyu">Like what you see?</p>',r,a,i,s=re(l[0]),o=[];for(let f=0;f<s.length;f+=1)o[f]=Ne(He(l,s,f));const v=f=>B(o[f],1,1,()=>{o[f]=null});return{c(){e=d("div"),n=d("div"),n.innerHTML=t,r=N(),a=d("div");for(let f=0;f<o.length;f+=1)o[f].c();this.h()},l(f){e=b(f,"DIV",{class:!0});var u=$(e);n=b(u,"DIV",{class:!0,"data-svelte-h":!0}),ke(n)!=="svelte-1jwhza7"&&(n.innerHTML=t),r=O(u),a=b(u,"DIV",{class:!0});var g=$(a);for(let y=0;y<o.length;y+=1)o[y].l(g);g.forEach(m),u.forEach(m),this.h()},h(){c(n,"class","title-wrapper svelte-y3xkyu"),c(a,"class","stories-wrapper svelte-y3xkyu"),c(e,"class","post-nav-wrapper svelte-y3xkyu")},m(f,u){V(f,e,u),p(e,n),p(e,r),p(e,a);for(let g=0;g<o.length;g+=1)o[g]&&o[g].m(a,null);i=!0},p(f,[u]){if(u&1){s=re(f[0]);let g;for(g=0;g<s.length;g+=1){const y=He(f,s,g);o[g]?(o[g].p(y,u),H(o[g],1)):(o[g]=Ne(y),o[g].c(),H(o[g],1),o[g].m(a,null))}for(ve(),g=s.length;g<o.length;g+=1)v(g);me()}},i(f){if(!i){for(let u=0;u<s.length;u+=1)H(o[u]);i=!0}},o(f){o=o.filter(Boolean);for(let u=0;u<o.length;u+=1)B(o[u]);i=!1},d(f){f&&m(e),be(o,f)}}}function ft(l,e,n){let{previews:t}=e;return l.$$set=r=>{"previews"in r&&n(0,t=r.previews)},[t]}class ut extends se{constructor(e){super(),ie(this,e,ft,ct,ne,{previews:0})}}const{window:we}=Ge;function pt(l){let e=!1,n=()=>{e=!1},t,r,a,i="↓",s,o;return he(l[2]),he(l[3]),{c(){r=d("button"),a=d("span"),a.textContent=i,this.h()},l(v){r=b(v,"BUTTON",{class:!0,style:!0});var f=$(r);a=b(f,"SPAN",{class:!0,"data-svelte-h":!0}),ke(a)!=="svelte-tdokpq"&&(a.textContent=i),f.forEach(m),this.h()},h(){c(a,"class","arrow txt-b svelte-j2w6gy"),c(r,"class","arrow-wrapper glass svelte-j2w6gy"),fe(r,"display",l[0]>l[1]?"flex":"none")},m(v,f){V(v,r,f),p(r,a),s||(o=[ue(we,"scroll",()=>{e=!0,clearTimeout(t),t=setTimeout(n,100),l[2]()}),ue(we,"resize",l[3]),ue(r,"click",l[4])],s=!0)},p(v,[f]){f&1&&!e&&(e=!0,clearTimeout(t),scrollTo(we.pageXOffset,v[0]),t=setTimeout(n,100)),f&3&&fe(r,"display",v[0]>v[1]?"flex":"none")},i:J,o:J,d(v){v&&m(r),s=!1,De(o)}}}function gt(l,e,n){let t=0,r=1e3;function a(){n(0,t=we.pageYOffset)}function i(){n(1,r=we.innerHeight)}return[t,r,a,i,()=>{window.scrollTo({top:0,behavior:"smooth"})}]}class _t extends se{constructor(e){super(),ie(this,e,gt,pt,ne,{})}}const{document:ye}=Ge;function Oe(l,e,n){const t=l.slice();return t[1]=e[n],t}function Se(l){let e,n,t=re(l[0].content),r=[];for(let i=0;i<t.length;i+=1)r[i]=Be(Oe(l,t,i));const a=i=>B(r[i],1,1,()=>{r[i]=null});return{c(){for(let i=0;i<r.length;i+=1)r[i].c();e=de()},l(i){for(let s=0;s<r.length;s+=1)r[s].l(i);e=de()},m(i,s){for(let o=0;o<r.length;o+=1)r[o]&&r[o].m(i,s);V(i,e,s),n=!0},p(i,s){if(s&1){t=re(i[0].content);let o;for(o=0;o<t.length;o+=1){const v=Oe(i,t,o);r[o]?(r[o].p(v,s),H(r[o],1)):(r[o]=Be(v),r[o].c(),H(r[o],1),r[o].m(e.parentNode,e))}for(ve(),o=t.length;o<r.length;o+=1)a(o);me()}},i(i){if(!n){for(let s=0;s<t.length;s+=1)H(r[s]);n=!0}},o(i){r=r.filter(Boolean);for(let s=0;s<r.length;s+=1)B(r[s]);n=!1},d(i){i&&m(e),be(r,i)}}}function wt(l){let e,n;return e=new st({props:{type:l[1].type,pd:l[1].pd,img:l[1].img}}),{c(){Q(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,r){Z(e,t,r),n=!0},p(t,r){const a={};r&1&&(a.type=t[1].type),r&1&&(a.pd=t[1].pd),r&1&&(a.img=t[1].img),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function ht(l){let e,n;return e=new lt({props:{title:l[1].title,body:l[1].body}}),{c(){Q(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,r){Z(e,t,r),n=!0},p(t,r){const a={};r&1&&(a.title=t[1].title),r&1&&(a.body=t[1].body),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function Be(l){let e,n,t,r;const a=[ht,wt],i=[];function s(o,v){return o[1].block=="txt"?0:o[1].block=="img"?1:-1}return~(e=s(l))&&(n=i[e]=a[e](l)),{c(){n&&n.c(),t=de()},l(o){n&&n.l(o),t=de()},m(o,v){~e&&i[e].m(o,v),V(o,t,v),r=!0},p(o,v){let f=e;e=s(o),e===f?~e&&i[e].p(o,v):(n&&(ve(),B(i[f],1,1,()=>{i[f]=null}),me()),~e?(n=i[e],n?n.p(o,v):(n=i[e]=a[e](o),n.c()),H(n,1),n.m(t.parentNode,t)):n=null)},i(o){r||(H(n),r=!0)},o(o){B(n),r=!1},d(o){o&&m(t),~e&&i[e].d(o)}}}function vt(l){let e,n,t,r,a,i,s,o,v,f,u,g,y,S,P,j;ye.title=e=l[0]?l[0].info.title:"Project not found",r=new Qe({props:{id:l[0].id}}),o=new xe({props:{title:l[0].info.title,year:l[0].info.year,contributions:l[0].info.con,i:l[0].preview}});let w=l[0].content&&Se(l);return u=new ut({props:{previews:l[0].previews}}),y=new Me({}),P=new _t({}),{c(){n=N(),t=d("div"),Q(r.$$.fragment),a=N(),i=d("article"),s=d("main"),Q(o.$$.fragment),v=N(),w&&w.c(),f=N(),Q(u.$$.fragment),g=N(),Q(y.$$.fragment),S=N(),Q(P.$$.fragment),this.h()},l(h){qe("svelte-1jt70ms",ye.head).forEach(m),n=O(h),t=b(h,"DIV",{});var k=$(t);Y(r.$$.fragment,k),a=O(k),i=b(k,"ARTICLE",{class:!0});var D=$(i);s=b(D,"MAIN",{class:!0});var G=$(s);Y(o.$$.fragment,G),v=O(G),w&&w.l(G),G.forEach(m),D.forEach(m),f=O(k),Y(u.$$.fragment,k),g=O(k),Y(y.$$.fragment,k),S=O(k),Y(P.$$.fragment,k),k.forEach(m),this.h()},h(){c(s,"class","svelte-1cu11pj"),c(i,"class","post-wrapper svelte-1cu11pj")},m(h,C){V(h,n,C),V(h,t,C),Z(r,t,null),p(t,a),p(t,i),p(i,s),Z(o,s,null),p(s,v),w&&w.m(s,null),p(t,f),Z(u,t,null),p(t,g),Z(y,t,null),p(t,S),Z(P,t,null),j=!0},p(h,[C]){(!j||C&1)&&e!==(e=h[0]?h[0].info.title:"Project not found")&&(ye.title=e);const k={};C&1&&(k.id=h[0].id),r.$set(k);const D={};C&1&&(D.title=h[0].info.title),C&1&&(D.year=h[0].info.year),C&1&&(D.contributions=h[0].info.con),C&1&&(D.i=h[0].preview),o.$set(D),h[0].content?w?(w.p(h,C),C&1&&H(w,1)):(w=Se(h),w.c(),H(w,1),w.m(s,null)):w&&(ve(),B(w,1,1,()=>{w=null}),me());const G={};C&1&&(G.previews=h[0].previews),u.$set(G)},i(h){j||(H(r.$$.fragment,h),H(o.$$.fragment,h),H(w),H(u.$$.fragment,h),H(y.$$.fragment,h),H(P.$$.fragment,h),j=!0)},o(h){B(r.$$.fragment,h),B(o.$$.fragment,h),B(w),B(u.$$.fragment,h),B(y.$$.fragment,h),B(P.$$.fragment,h),j=!1},d(h){h&&(m(n),m(t)),x(r),x(o),w&&w.d(),x(u),x(y),x(P)}}}function mt(l,e,n){let{data:t}=e;return Fe(()=>{"ontouchstart"in window?document.documentElement.style.setProperty("--doc-height",`${window.innerHeight}px`):document.documentElement.style.setProperty("--doc-height","100vh")}),l.$$set=r=>{"data"in r&&n(0,t=r.data)},[t]}class $t extends se{constructor(e){super(),ie(this,e,mt,vt,ne,{data:0})}}export{$t as component,kt as universal};