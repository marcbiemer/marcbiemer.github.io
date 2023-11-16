import{H as Ge}from"../chunks/control.f5b05b5f.js";import{p as U,e as te,T as Re,F as Ue}from"../chunks/data.4cd4c1d6.js";import{s as le,n as W,A as we,r as fe,v as pe,y as Be,w as ge,o as Me}from"../chunks/scheduler.29c4cb82.js";import{S as re,i as ne,g as b,m as L,h as j,j as I,n as q,f as m,k as c,a as M,y as f,s as N,c as O,l as ce,D as ue,o as ee,d as H,p as he,b as ve,t as S,B as je,r as J,u as K,v as Q,w as Z,H as Fe,E as Ve,x as Ee,C as Le,e as be}from"../chunks/index.217c91ce.js";const De=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function qe(l,e){return new Ge(l,e)}new TextEncoder;function We({params:l}){for(let e=0;e<U.length;e++)if(l.slug===U[e].info.path){let n=e===0?U.length-1:e-1,t=e===U.length-1?0:e+1,r=t===U.length-1?0:t+1;return{info:U[e].info,preview:U[e].preview,content:U[e].content,id:e,previews:[{id:n,info:U[n].info,preview:U[n].preview},{id:t,info:U[t].info,preview:U[t].preview},{id:r,info:U[r].info,preview:U[r].preview}]}}throw qe(404,"Not found")}const yt=Object.freeze(Object.defineProperty({__proto__:null,load:We},Symbol.toStringTag,{value:"Module"}));function Xe(l){let e,n,t,r;return{c(){e=b("button"),n=b("a"),t=L("← Home"),this.h()},l(a){e=j(a,"BUTTON",{class:!0});var i=I(e);n=j(i,"A",{href:!0,class:!0});var s=I(n);t=q(s,"← Home"),s.forEach(m),i.forEach(m),this.h()},h(){c(n,"href",r=l[0]?"/#proj-"+l[0]:"/"),c(n,"class","txt-c-2 svelte-1wu53n7"),c(e,"class","svelte-1wu53n7")},m(a,i){M(a,e,i),f(e,n),f(n,t)},p(a,[i]){i&1&&r!==(r=a[0]?"/#proj-"+a[0]:"/")&&c(n,"href",r)},i:W,o:W,d(a){a&&m(e)}}}function Je(l,e,n){let{id:t}=e;return l.$$set=r=>{"id"in r&&n(0,t=r.id)},[t]}class Ke extends re{constructor(e){super(),ne(this,e,Je,Xe,le,{id:0})}}function Ie(l,e,n){const t=l.slice();return t[9]=e[n],t}function Pe(l){let e,n;return e=new Re({props:{label:l[9]}}),{c(){J(e.$$.fragment)},l(t){K(e.$$.fragment,t)},m(t,r){Q(e,t,r),n=!0},p(t,r){const a={};r&4&&(a.label=t[9]),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function Qe(l){let e=!1,n=()=>{e=!1},t,r,a,i,s,o,w,p,g,u,E,z,A,y,h,v,k,C,B,D,F,R,X=l[3].imgAlt+"",V,G,Y,se;we(l[7]),we(l[8]);let T=te(l[2]),d=[];for(let _=0;_<T.length;_+=1)d[_]=Pe(Ie(l,T,_));const ie=_=>S(d[_],1,1,()=>{d[_]=null});return{c(){r=b("header"),a=b("div"),i=b("p"),s=L(l[1]),o=N(),w=b("h1"),p=L(l[0]),g=N(),u=b("div");for(let _=0;_<d.length;_+=1)d[_].c();E=N(),z=b("figure"),A=b("picture"),y=b("source"),v=N(),k=b("img"),F=N(),R=b("figcaption"),V=L(X),this.h()},l(_){r=j(_,"HEADER",{class:!0});var $=I(r);a=j($,"DIV",{class:!0});var P=I(a);i=j(P,"P",{class:!0});var x=I(i);s=q(x,l[1]),x.forEach(m),o=O(P),w=j(P,"H1",{class:!0});var ae=I(w);p=q(ae,l[0]),ae.forEach(m),g=O(P),u=j(P,"DIV",{class:!0});var $e=I(u);for(let ye=0;ye<d.length;ye+=1)d[ye].l($e);$e.forEach(m),P.forEach(m),E=O($),z=j($,"FIGURE",{class:!0});var me=I(z);A=j(me,"PICTURE",{});var de=I(A);y=j(de,"SOURCE",{type:!0,srcset:!0}),v=O(de),k=j(de,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),de.forEach(m),F=O(me),R=j(me,"FIGCAPTION",{class:!0});var Te=I(R);V=q(Te,X),Te.forEach(m),me.forEach(m),$.forEach(m),this.h()},h(){c(i,"class","txt-c-2"),c(w,"class","txt-d svelte-1i11vou"),c(u,"class","tag-wrapper svelte-1i11vou"),c(a,"class","title-wrapper svelte-1i11vou"),c(y,"type","image/webp"),fe(y,h=`
                    `+l[3].url+`360.webp 360w, 
                    `+l[3].url+`576.webp 576w, 
                    `+l[3].url+`720.webp 720w,
                    `+l[3].url+`1440.webp 1440w,
                    `+l[3].url+`2880.webp 2880w,
                `)||c(y,"srcset",h),c(k,"role","presentation"),c(k,"decoding","async"),c(k,"loading","lazy"),c(k,"sizes",`
                    (max-width: 749px) calc(100vw), 
                    (max-width: 1520px) calc(100vw - 80px), 
                    1440px
                `),fe(k,C=`
                    `+l[3].url+`360.jpg 360w, 
                    `+l[3].url+`576.jpg 576w, 
                    `+l[3].url+`720.jpg 720w,
                    `+l[3].url+`1440.jpg 1440w,
                    `+l[3].url+`2880.jpg 2880w,
                `)||c(k,"srcset",C),pe(k.src,B=l[3].url+"360.jpg")||c(k,"src",B),c(k,"alt",D=l[3].imgAlt),c(k,"class","svelte-1i11vou"),c(R,"class","screenreader-only"),c(z,"class","header-img-wrapper svelte-1i11vou"),ce(z,"opacity",oe(l[4],.1*l[5],.66*l[5],1,.7)),ce(z,"transform",l[6]>750?"scale("+oe(l[4],0,.2*l[5],.8,1)+")":"scale("+oe(l[4],0,.2*l[5],.95,1)+")"),c(r,"class","svelte-1i11vou")},m(_,$){M(_,r,$),f(r,a),f(a,i),f(i,s),f(a,o),f(a,w),f(w,p),f(a,g),f(a,u);for(let P=0;P<d.length;P+=1)d[P]&&d[P].m(u,null);f(r,E),f(r,z),f(z,A),f(A,y),f(A,v),f(A,k),f(z,F),f(z,R),f(R,V),G=!0,Y||(se=[ue(window,"scroll",()=>{e=!0,clearTimeout(t),t=setTimeout(n,100),l[7]()}),ue(window,"resize",l[8])],Y=!0)},p(_,[$]){if($&16&&!e&&(e=!0,clearTimeout(t),scrollTo(window.pageXOffset,_[4]),t=setTimeout(n,100)),(!G||$&2)&&ee(s,_[1]),(!G||$&1)&&ee(p,_[0]),$&4){T=te(_[2]);let P;for(P=0;P<T.length;P+=1){const x=Ie(_,T,P);d[P]?(d[P].p(x,$),H(d[P],1)):(d[P]=Pe(x),d[P].c(),H(d[P],1),d[P].m(u,null))}for(he(),P=T.length;P<d.length;P+=1)ie(P);ve()}(!G||$&8&&h!==(h=`
                    `+_[3].url+`360.webp 360w, 
                    `+_[3].url+`576.webp 576w, 
                    `+_[3].url+`720.webp 720w,
                    `+_[3].url+`1440.webp 1440w,
                    `+_[3].url+`2880.webp 2880w,
                `))&&c(y,"srcset",h),(!G||$&8&&C!==(C=`
                    `+_[3].url+`360.jpg 360w, 
                    `+_[3].url+`576.jpg 576w, 
                    `+_[3].url+`720.jpg 720w,
                    `+_[3].url+`1440.jpg 1440w,
                    `+_[3].url+`2880.jpg 2880w,
                `))&&c(k,"srcset",C),(!G||$&8&&!pe(k.src,B=_[3].url+"360.jpg"))&&c(k,"src",B),(!G||$&8&&D!==(D=_[3].imgAlt))&&c(k,"alt",D),(!G||$&8)&&X!==(X=_[3].imgAlt+"")&&ee(V,X),$&48&&ce(z,"opacity",oe(_[4],.1*_[5],.66*_[5],1,.7)),$&112&&ce(z,"transform",_[6]>750?"scale("+oe(_[4],0,.2*_[5],.8,1)+")":"scale("+oe(_[4],0,.2*_[5],.95,1)+")")},i(_){if(!G){for(let $=0;$<T.length;$+=1)H(d[$]);G=!0}},o(_){d=d.filter(Boolean);for(let $=0;$<d.length;$+=1)S(d[$]);G=!1},d(_){_&&m(r),je(d,_),Y=!1,Be(se)}}}function oe(l,e,n,t,r){const a=n-e,i=r-t;if(l<e)return t;if(e<=l&&l<=n){const s=(l-e)/a;return t+i*s}else if(n<l)return r}function Ze(l,e,n){let{title:t}=e,{year:r}=e,{contributions:a}=e,{i}=e,s=0,o,w;function p(){n(4,s=window.pageYOffset)}function g(){n(5,o=window.innerHeight),n(6,w=window.innerWidth)}return l.$$set=u=>{"title"in u&&n(0,t=u.title),"year"in u&&n(1,r=u.year),"contributions"in u&&n(2,a=u.contributions),"i"in u&&n(3,i=u.i)},[t,r,a,i,s,o,w,p,g]}class Ye extends re{constructor(e){super(),ne(this,e,Ze,Qe,le,{title:0,year:1,contributions:2,i:3})}}function xe(l){let e,n,t,r,a,i,s,o,w,p;return we(l[3]),{c(){e=b("div"),n=b("section"),t=b("h2"),r=L(l[0]),a=N(),i=b("p"),s=new Fe(!1),this.h()},l(g){e=j(g,"DIV",{});var u=I(e);n=j(u,"SECTION",{class:!0});var E=I(n);t=j(E,"H2",{class:!0});var z=I(t);r=q(z,l[0]),z.forEach(m),a=O(E),i=j(E,"P",{class:!0});var A=I(i);s=Ve(A,!1),A.forEach(m),E.forEach(m),u.forEach(m),this.h()},h(){c(t,"class","txt-c-2 svelte-ppmkmv"),s.a=null,c(i,"class",o=ge(l[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv"),c(n,"class","svelte-ppmkmv")},m(g,u){M(g,e,u),f(e,n),f(n,t),f(t,r),f(n,a),f(n,i),s.m(l[1],i),w||(p=ue(window,"resize",l[3]),w=!0)},p(g,[u]){u&1&&ee(r,g[0]),u&2&&s.p(g[1]),u&4&&o!==(o=ge(g[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv")&&c(i,"class",o)},i:W,o:W,d(g){g&&m(e),w=!1,p()}}}function et(l,e,n){let{title:t}=e,{body:r}=e,a;function i(){n(2,a=window.innerWidth)}return l.$$set=s=>{"title"in s&&n(0,t=s.title),"body"in s&&n(1,r=s.body)},[t,r,a,i]}class tt extends re{constructor(e){super(),ne(this,e,et,xe,le,{title:0,body:1})}}function ze(l,e,n){const t=l.slice();return t[4]=e[n],t}function Ae(l){let e,n,t,r,a,i,s,o,w,p,g,u=l[4].alt+"",E,z,A;return{c(){e=b("figure"),n=b("picture"),t=b("source"),a=N(),i=b("img"),p=N(),g=b("figcaption"),E=L(u),z=N(),this.h()},l(y){e=j(y,"FIGURE",{class:!0});var h=I(e);n=j(h,"PICTURE",{});var v=I(n);t=j(v,"SOURCE",{type:!0,srcset:!0}),a=O(v),i=j(v,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),v.forEach(m),p=O(h),g=j(h,"FIGCAPTION",{class:!0});var k=I(g);E=q(k,u),k.forEach(m),z=O(h),h.forEach(m),this.h()},h(){c(t,"type","image/webp"),fe(t,r=`
                        `+l[4].src+`360.webp 360w, 
                        `+l[4].src+`576.webp 576w, 
                        `+l[4].src+`720.webp 720w,
                        `+l[4].src+`1440.webp 1440w,
                        `+l[4].src+`2880.webp 2880w,
                    `)||c(t,"srcset",r),c(i,"role","presentation"),c(i,"decoding","async"),c(i,"loading","lazy"),c(i,"sizes",`
                        (max-width: 749px) calc(100vw * `+l[3]+`), 
                        (max-width: 1520px) calc((100vw * `+l[3]+`) - 80px), 
                        1440px
                    `),fe(i,s=`
                        `+l[4].src+`360.jpg 360w, 
                        `+l[4].src+`576.jpg 576w, 
                        `+l[4].src+`720.jpg 720w,
                        `+l[4].src+`1440.jpg 1440w,
                        `+l[4].src+`2880.jpg 2880w,
                    `)||c(i,"srcset",s),pe(i.src,o=l[4].src+"360.jpg")||c(i,"src",o),c(i,"alt",w=l[4].alt),c(i,"class","svelte-ztmn4v"),c(g,"class","screenreader-only"),c(e,"class",A=ge(l[0]=="c"?"img-center "+l[2]:"")+" svelte-ztmn4v")},m(y,h){M(y,e,h),f(e,n),f(n,t),f(n,a),f(n,i),f(e,p),f(e,g),f(g,E),f(e,z)},p(y,h){h&2&&r!==(r=`
                        `+y[4].src+`360.webp 360w, 
                        `+y[4].src+`576.webp 576w, 
                        `+y[4].src+`720.webp 720w,
                        `+y[4].src+`1440.webp 1440w,
                        `+y[4].src+`2880.webp 2880w,
                    `)&&c(t,"srcset",r),h&2&&s!==(s=`
                        `+y[4].src+`360.jpg 360w, 
                        `+y[4].src+`576.jpg 576w, 
                        `+y[4].src+`720.jpg 720w,
                        `+y[4].src+`1440.jpg 1440w,
                        `+y[4].src+`2880.jpg 2880w,
                    `)&&c(i,"srcset",s),h&2&&!pe(i.src,o=y[4].src+"360.jpg")&&c(i,"src",o),h&2&&w!==(w=y[4].alt)&&c(i,"alt",w),h&2&&u!==(u=y[4].alt+"")&&ee(E,u),h&5&&A!==(A=ge(y[0]=="c"?"img-center "+y[2]:"")+" svelte-ztmn4v")&&c(e,"class",A)},d(y){y&&m(e)}}}function lt(l){let e,n,t=te(l[1]),r=[];for(let a=0;a<t.length;a+=1)r[a]=Ae(ze(l,t,a));return{c(){e=b("div");for(let a=0;a<r.length;a+=1)r[a].c();this.h()},l(a){e=j(a,"DIV",{class:!0});var i=I(e);for(let s=0;s<r.length;s+=1)r[s].l(i);i.forEach(m),this.h()},h(){c(e,"class",n=ge(l[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")},m(a,i){M(a,e,i);for(let s=0;s<r.length;s+=1)r[s]&&r[s].m(e,null)},p(a,[i]){if(i&15){t=te(a[1]);let s;for(s=0;s<t.length;s+=1){const o=ze(a,t,s);r[s]?r[s].p(o,i):(r[s]=Ae(o),r[s].c(),r[s].m(e,null))}for(;s<r.length;s+=1)r[s].d(1);r.length=t.length}i&1&&n!==(n=ge(a[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")&&c(e,"class",n)},i:W,o:W,d(a){a&&m(e),je(r,a)}}}function rt(l,e,n){let{type:t}=e,{img:r}=e,{pd:a=""}=e,i=t==="s"?.5:1;return l.$$set=s=>{"type"in s&&n(0,t=s.type),"img"in s&&n(1,r=s.img),"pd"in s&&n(2,a=s.pd)},[t,r,a,i]}class nt extends re{constructor(e){super(),ne(this,e,rt,lt,le,{type:0,img:1,pd:2})}}function st(l){let e,n,t,r,a,i,s,o,w,p,g,u,E,z=l[0].info.year+"",A,y,h=l[0].info.title+"",v,k,C,B='<span class="arrow txt-b svelte-1a44y23">↓</span>',D,F,R,X,V=l[0].id+1+"",G,Y,se;return{c(){e=b("a"),n=b("figure"),t=b("picture"),r=b("source"),i=N(),s=b("img"),g=N(),u=b("figcaption"),E=b("span"),A=L(z),y=N(),v=L(h),k=N(),C=b("div"),C.innerHTML=B,D=N(),F=b("div"),R=b("span"),X=L("00—"),G=L(V),this.h()},l(T){e=j(T,"A",{href:!0,class:!0,"aria-label":!0});var d=I(e);n=j(d,"FIGURE",{class:!0});var ie=I(n);t=j(ie,"PICTURE",{class:!0});var _=I(t);r=j(_,"SOURCE",{type:!0,srcset:!0}),i=O(_),s=j(_,"IMG",{decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),_.forEach(m),g=O(ie),u=j(ie,"FIGCAPTION",{class:!0});var $=I(u);E=j($,"SPAN",{class:!0});var P=I(E);A=q(P,z),P.forEach(m),y=O($),v=q($,h),$.forEach(m),ie.forEach(m),k=O(d),C=j(d,"DIV",{class:!0,"data-svelte-h":!0}),Ee(C)!=="svelte-129culz"&&(C.innerHTML=B),D=O(d),F=j(d,"DIV",{class:!0});var x=I(F);R=j(x,"SPAN",{class:!0});var ae=I(R);X=q(ae,"00—"),G=q(ae,V),ae.forEach(m),x.forEach(m),d.forEach(m),this.h()},h(){c(r,"type","image/webp"),fe(r,a=`
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
                `),fe(s,o=`
                    `+l[0].preview.url+`360.jpg 360w, 
                    `+l[0].preview.url+`576.jpg 576w, 
                    `+l[0].preview.url+`720.jpg 720w,
                    `+l[0].preview.url+`1440.jpg 1440w,
                    `+l[0].preview.url+`2880.jpg 2880w
                `)||c(s,"srcset",o),pe(s.src,w=l[0].preview.url+"360.jpg")||c(s,"src",w),c(s,"alt",p=l[0].preview.imgAlt),c(s,"class","svelte-1a44y23"),c(t,"class","svelte-1a44y23"),c(E,"class","txt-c-1 svelte-1a44y23"),c(u,"class","txt-h svelte-1a44y23"),c(n,"class","svelte-1a44y23"),c(C,"class","arrow-wrapper glass svelte-1a44y23"),c(R,"class","txt-c-2 id"),c(F,"class","id-wrapper glass svelte-1a44y23"),c(e,"href",Y="/projects/"+l[0].info.path),c(e,"class","project-tile-wrapper svelte-1a44y23"),c(e,"aria-label",se=l[0].info.title)},m(T,d){M(T,e,d),f(e,n),f(n,t),f(t,r),f(t,i),f(t,s),f(n,g),f(n,u),f(u,E),f(E,A),f(u,y),f(u,v),f(e,k),f(e,C),f(e,D),f(e,F),f(F,R),f(R,X),f(R,G)},p(T,[d]){d&1&&a!==(a=`
                    `+T[0].preview.url+`360.webp 360w, 
                    `+T[0].preview.url+`576.webp 576w, 
                    `+T[0].preview.url+`720.webp 720w,
                    `+T[0].preview.url+`1440.webp 1440w,
                    `+T[0].preview.url+`2880.webp 2880w
                `)&&c(r,"srcset",a),d&1&&o!==(o=`
                    `+T[0].preview.url+`360.jpg 360w, 
                    `+T[0].preview.url+`576.jpg 576w, 
                    `+T[0].preview.url+`720.jpg 720w,
                    `+T[0].preview.url+`1440.jpg 1440w,
                    `+T[0].preview.url+`2880.jpg 2880w
                `)&&c(s,"srcset",o),d&1&&!pe(s.src,w=T[0].preview.url+"360.jpg")&&c(s,"src",w),d&1&&p!==(p=T[0].preview.imgAlt)&&c(s,"alt",p),d&1&&z!==(z=T[0].info.year+"")&&ee(A,z),d&1&&h!==(h=T[0].info.title+"")&&ee(v,h),d&1&&V!==(V=T[0].id+1+"")&&ee(G,V),d&1&&Y!==(Y="/projects/"+T[0].info.path)&&c(e,"href",Y),d&1&&se!==(se=T[0].info.title)&&c(e,"aria-label",se)},i:W,o:W,d(T){T&&m(e)}}}function it(l,e,n){let{p:t}=e;return l.$$set=r=>{"p"in r&&n(0,t=r.p)},[t]}class at extends re{constructor(e){super(),ne(this,e,it,st,le,{p:0})}}function Ce(l,e,n){const t=l.slice();return t[1]=e[n],t}function He(l){let e,n;return e=new at({props:{p:l[1]}}),{c(){J(e.$$.fragment)},l(t){K(e.$$.fragment,t)},m(t,r){Q(e,t,r),n=!0},p(t,r){const a={};r&1&&(a.p=t[1]),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function ot(l){let e,n,t='<h1 class="txt-d">Explore more</h1> <p class="txt-b svelte-y3xkyu">Like what you see?</p>',r,a,i,s=te(l[0]),o=[];for(let p=0;p<s.length;p+=1)o[p]=He(Ce(l,s,p));const w=p=>S(o[p],1,1,()=>{o[p]=null});return{c(){e=b("div"),n=b("div"),n.innerHTML=t,r=N(),a=b("div");for(let p=0;p<o.length;p+=1)o[p].c();this.h()},l(p){e=j(p,"DIV",{class:!0});var g=I(e);n=j(g,"DIV",{class:!0,"data-svelte-h":!0}),Ee(n)!=="svelte-1jwhza7"&&(n.innerHTML=t),r=O(g),a=j(g,"DIV",{class:!0});var u=I(a);for(let E=0;E<o.length;E+=1)o[E].l(u);u.forEach(m),g.forEach(m),this.h()},h(){c(n,"class","title-wrapper svelte-y3xkyu"),c(a,"class","stories-wrapper svelte-y3xkyu"),c(e,"class","post-nav-wrapper svelte-y3xkyu")},m(p,g){M(p,e,g),f(e,n),f(e,r),f(e,a);for(let u=0;u<o.length;u+=1)o[u]&&o[u].m(a,null);i=!0},p(p,[g]){if(g&1){s=te(p[0]);let u;for(u=0;u<s.length;u+=1){const E=Ce(p,s,u);o[u]?(o[u].p(E,g),H(o[u],1)):(o[u]=He(E),o[u].c(),H(o[u],1),o[u].m(a,null))}for(he(),u=s.length;u<o.length;u+=1)w(u);ve()}},i(p){if(!i){for(let g=0;g<s.length;g+=1)H(o[g]);i=!0}},o(p){o=o.filter(Boolean);for(let g=0;g<o.length;g+=1)S(o[g]);i=!1},d(p){p&&m(e),je(o,p)}}}function ct(l,e,n){let{previews:t}=e;return l.$$set=r=>{"previews"in r&&n(0,t=r.previews)},[t]}class ut extends re{constructor(e){super(),ne(this,e,ct,ot,le,{previews:0})}}const{window:_e}=De;function ft(l){let e=!1,n=()=>{e=!1},t,r,a,i="↓",s,o;return we(l[2]),we(l[3]),{c(){r=b("button"),a=b("span"),a.textContent=i,this.h()},l(w){r=j(w,"BUTTON",{class:!0,style:!0});var p=I(r);a=j(p,"SPAN",{class:!0,"data-svelte-h":!0}),Ee(a)!=="svelte-tdokpq"&&(a.textContent=i),p.forEach(m),this.h()},h(){c(a,"class","arrow txt-b svelte-j2w6gy"),c(r,"class","arrow-wrapper glass svelte-j2w6gy"),ce(r,"display",l[0]>l[1]?"flex":"none")},m(w,p){M(w,r,p),f(r,a),s||(o=[ue(_e,"scroll",()=>{e=!0,clearTimeout(t),t=setTimeout(n,100),l[2]()}),ue(_e,"resize",l[3]),ue(r,"click",l[4])],s=!0)},p(w,[p]){p&1&&!e&&(e=!0,clearTimeout(t),scrollTo(_e.pageXOffset,w[0]),t=setTimeout(n,100)),p&3&&ce(r,"display",w[0]>w[1]?"flex":"none")},i:W,o:W,d(w){w&&m(r),s=!1,Be(o)}}}function pt(l,e,n){let t=0,r=1e3;function a(){n(0,t=_e.pageYOffset)}function i(){n(1,r=_e.innerHeight)}return[t,r,a,i,()=>{window.scrollTo({top:0,behavior:"smooth"})}]}class gt extends re{constructor(e){super(),ne(this,e,pt,ft,le,{})}}const{document:ke}=De;function Ne(l,e,n){const t=l.slice();return t[1]=e[n],t}function Oe(l){let e,n,t=te(l[0].content),r=[];for(let i=0;i<t.length;i+=1)r[i]=Se(Ne(l,t,i));const a=i=>S(r[i],1,1,()=>{r[i]=null});return{c(){for(let i=0;i<r.length;i+=1)r[i].c();e=be()},l(i){for(let s=0;s<r.length;s+=1)r[s].l(i);e=be()},m(i,s){for(let o=0;o<r.length;o+=1)r[o]&&r[o].m(i,s);M(i,e,s),n=!0},p(i,s){if(s&1){t=te(i[0].content);let o;for(o=0;o<t.length;o+=1){const w=Ne(i,t,o);r[o]?(r[o].p(w,s),H(r[o],1)):(r[o]=Se(w),r[o].c(),H(r[o],1),r[o].m(e.parentNode,e))}for(he(),o=t.length;o<r.length;o+=1)a(o);ve()}},i(i){if(!n){for(let s=0;s<t.length;s+=1)H(r[s]);n=!0}},o(i){r=r.filter(Boolean);for(let s=0;s<r.length;s+=1)S(r[s]);n=!1},d(i){i&&m(e),je(r,i)}}}function _t(l){let e,n;return e=new nt({props:{type:l[1].type,pd:l[1].pd,img:l[1].img}}),{c(){J(e.$$.fragment)},l(t){K(e.$$.fragment,t)},m(t,r){Q(e,t,r),n=!0},p(t,r){const a={};r&1&&(a.type=t[1].type),r&1&&(a.pd=t[1].pd),r&1&&(a.img=t[1].img),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function wt(l){let e,n;return e=new tt({props:{title:l[1].title,body:l[1].body}}),{c(){J(e.$$.fragment)},l(t){K(e.$$.fragment,t)},m(t,r){Q(e,t,r),n=!0},p(t,r){const a={};r&1&&(a.title=t[1].title),r&1&&(a.body=t[1].body),e.$set(a)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function Se(l){let e,n,t,r;const a=[wt,_t],i=[];function s(o,w){return o[1].block=="txt"?0:o[1].block=="img"?1:-1}return~(e=s(l))&&(n=i[e]=a[e](l)),{c(){n&&n.c(),t=be()},l(o){n&&n.l(o),t=be()},m(o,w){~e&&i[e].m(o,w),M(o,t,w),r=!0},p(o,w){let p=e;e=s(o),e===p?~e&&i[e].p(o,w):(n&&(he(),S(i[p],1,1,()=>{i[p]=null}),ve()),~e?(n=i[e],n?n.p(o,w):(n=i[e]=a[e](o),n.c()),H(n,1),n.m(t.parentNode,t)):n=null)},i(o){r||(H(n),r=!0)},o(o){S(n),r=!1},d(o){o&&m(t),~e&&i[e].d(o)}}}function ht(l){let e,n,t,r,a,i,s,o,w,p,g,u,E,z,A,y;ke.title=e=l[0]?l[0].info.title:"Project not found",r=new Ke({props:{id:l[0].id}}),o=new Ye({props:{title:l[0].info.title,year:l[0].info.year,contributions:l[0].info.con,i:l[0].preview}});let h=l[0].content&&Oe(l);return g=new ut({props:{previews:l[0].previews}}),E=new Ue({}),A=new gt({}),{c(){n=N(),t=b("div"),J(r.$$.fragment),a=N(),i=b("article"),s=b("main"),J(o.$$.fragment),w=N(),h&&h.c(),p=N(),J(g.$$.fragment),u=N(),J(E.$$.fragment),z=N(),J(A.$$.fragment),this.h()},l(v){Le("svelte-1jt70ms",ke.head).forEach(m),n=O(v),t=j(v,"DIV",{});var C=I(t);K(r.$$.fragment,C),a=O(C),i=j(C,"ARTICLE",{class:!0});var B=I(i);s=j(B,"MAIN",{class:!0});var D=I(s);K(o.$$.fragment,D),w=O(D),h&&h.l(D),D.forEach(m),B.forEach(m),p=O(C),K(g.$$.fragment,C),u=O(C),K(E.$$.fragment,C),z=O(C),K(A.$$.fragment,C),C.forEach(m),this.h()},h(){c(s,"class","svelte-1cu11pj"),c(i,"class","post-wrapper svelte-1cu11pj")},m(v,k){M(v,n,k),M(v,t,k),Q(r,t,null),f(t,a),f(t,i),f(i,s),Q(o,s,null),f(s,w),h&&h.m(s,null),f(t,p),Q(g,t,null),f(t,u),Q(E,t,null),f(t,z),Q(A,t,null),y=!0},p(v,[k]){(!y||k&1)&&e!==(e=v[0]?v[0].info.title:"Project not found")&&(ke.title=e);const C={};k&1&&(C.id=v[0].id),r.$set(C);const B={};k&1&&(B.title=v[0].info.title),k&1&&(B.year=v[0].info.year),k&1&&(B.contributions=v[0].info.con),k&1&&(B.i=v[0].preview),o.$set(B),v[0].content?h?(h.p(v,k),k&1&&H(h,1)):(h=Oe(v),h.c(),H(h,1),h.m(s,null)):h&&(he(),S(h,1,1,()=>{h=null}),ve());const D={};k&1&&(D.previews=v[0].previews),g.$set(D)},i(v){y||(H(r.$$.fragment,v),H(o.$$.fragment,v),H(h),H(g.$$.fragment,v),H(E.$$.fragment,v),H(A.$$.fragment,v),y=!0)},o(v){S(r.$$.fragment,v),S(o.$$.fragment,v),S(h),S(g.$$.fragment,v),S(E.$$.fragment,v),S(A.$$.fragment,v),y=!1},d(v){v&&(m(n),m(t)),Z(r),Z(o),h&&h.d(),Z(g),Z(E),Z(A)}}}function vt(l,e,n){let{data:t}=e;return Me(()=>{"ontouchstart"in window?document.documentElement.style.setProperty("--doc-height",`${window.innerHeight}px`):document.documentElement.style.setProperty("--doc-height","100vh")}),l.$$set=r=>{"data"in r&&n(0,t=r.data)},[t]}class kt extends re{constructor(e){super(),ne(this,e,vt,ht,le,{data:0})}}export{kt as component,yt as universal};
