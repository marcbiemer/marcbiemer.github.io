import{H as $e}from"../chunks/control.f5b05b5f.js";import{p as G,e as se,T as ze,F as Ae}from"../chunks/data.b76d50b5.js";import{s as ie,r as _e,v as ge,z as De,A as re,n as ne,o as Le}from"../chunks/scheduler.1fedfaae.js";import{S as oe,i as ce,g as h,s as $,m as x,h as m,j as I,c as z,f as _,n as ee,k as o,a as q,y as u,o as te,d as M,p as me,b as de,t as R,B as be,r as Q,u as X,v as Y,w as Z,H as Ve,D as Me,E as Ne,x as ae,C as Be,e as he}from"../chunks/index.f7ab9af4.js";import{L as Se}from"../chunks/Logo.8e68facc.js";const Re=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Oe(l,e){return new $e(l,e)}new TextEncoder;function Fe({params:l}){for(let e=0;e<G.length;e++)if(l.slug===G[e].info.path){let s=e===G.length-1?0:e+1,t=e===0?G.length-1:e-1;return{info:G[e].info,preview:G[e].preview,content:G[e].content,id:e,nav:{prev:{title:G[t].info.title,path:G[t].info.path,preview:G[t].preview},next:{title:G[s].info.title,path:G[s].info.path,preview:G[s].preview}}}}throw Oe(404,"Not found")}const ut=Object.freeze(Object.defineProperty({__proto__:null,load:Fe},Symbol.toStringTag,{value:"Module"}));function Ee(l,e,s){const t=l.slice();return t[4]=e[s],t}function ye(l){let e,s;return e=new ze({props:{label:l[4]}}),{c(){Q(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,r){Y(e,t,r),s=!0},p(t,r){const i={};r&4&&(i.label=t[4]),e.$set(i)},i(t){s||(M(e.$$.fragment,t),s=!0)},o(t){R(e.$$.fragment,t),s=!1},d(t){Z(e,t)}}}function Ge(l){let e,s,t,r,i,a,n,c,d,T,b,k,y=l[3].imgAlt+"",D,C,w,p,f,H,L,j,A,O,B,S,F=se(l[2]),E=[];for(let v=0;v<F.length;v+=1)E[v]=ye(Ee(l,F,v));const le=v=>R(E[v],1,1,()=>{E[v]=null});return{c(){e=h("header"),s=h("figure"),t=h("picture"),r=h("source"),a=$(),n=h("img"),b=$(),k=h("figcaption"),D=x(y),C=$(),w=h("div"),p=$(),f=h("p"),H=x(l[1]),L=$(),j=h("h1"),A=x(l[0]),O=$(),B=h("div");for(let v=0;v<E.length;v+=1)E[v].c();this.h()},l(v){e=m(v,"HEADER",{class:!0});var g=I(e);s=m(g,"FIGURE",{class:!0});var P=I(s);t=m(P,"PICTURE",{class:!0});var U=I(t);r=m(U,"SOURCE",{type:!0,srcset:!0,class:!0}),a=z(U),n=m(U,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),U.forEach(_),b=z(P),k=m(P,"FIGCAPTION",{class:!0});var J=I(k);D=ee(J,y),J.forEach(_),P.forEach(_),C=z(g),w=m(g,"DIV",{class:!0}),I(w).forEach(_),p=z(g),f=m(g,"P",{class:!0});var K=I(f);H=ee(K,l[1]),K.forEach(_),L=z(g),j=m(g,"H1",{class:!0});var N=I(j);A=ee(N,l[0]),N.forEach(_),O=z(g),B=m(g,"DIV",{class:!0});var V=I(B);for(let W=0;W<E.length;W+=1)E[W].l(V);V.forEach(_),g.forEach(_),this.h()},h(){o(r,"type","image/webp"),_e(r,i=`
                    `+l[3].url+`360.webp 360w, 
                    `+l[3].url+`576.webp 576w, 
                    `+l[3].url+`720.webp 720w,
                    `+l[3].url+`1440.webp 1440w,
                    `+l[3].url+`2880.webp 2880w,
                `)||o(r,"srcset",i),o(r,"class","svelte-1k6akur"),o(n,"role","presentation"),o(n,"decoding","async"),o(n,"loading","lazy"),o(n,"sizes",`
                    (max-width: 749px) calc(100vw), 
                    (max-width: 1520px) calc(100vw - 80px), 
                    1440px
                `),_e(n,c=`
                    `+l[3].url+`360.jpg 360w, 
                    `+l[3].url+`576.jpg 576w, 
                    `+l[3].url+`720.jpg 720w,
                    `+l[3].url+`1440.jpg 1440w,
                    `+l[3].url+`2880.jpg 2880w,
                `)||o(n,"srcset",c),ge(n.src,d=l[3].url+"360.jpg")||o(n,"src",d),o(n,"alt",T=l[3].imgAlt),o(n,"class","svelte-1k6akur"),o(t,"class","svelte-1k6akur"),o(k,"class","screenreader-only svelte-1k6akur"),o(s,"class","header-img-wrapper svelte-1k6akur"),o(w,"class","overlay svelte-1k6akur"),o(f,"class","txt-c-2 svelte-1k6akur"),o(j,"class","txt-d svelte-1k6akur"),o(B,"class","tag-wrapper svelte-1k6akur"),o(e,"class","svelte-1k6akur")},m(v,g){q(v,e,g),u(e,s),u(s,t),u(t,r),u(t,a),u(t,n),u(s,b),u(s,k),u(k,D),u(e,C),u(e,w),u(e,p),u(e,f),u(f,H),u(e,L),u(e,j),u(j,A),u(e,O),u(e,B);for(let P=0;P<E.length;P+=1)E[P]&&E[P].m(B,null);S=!0},p(v,[g]){if((!S||g&8&&i!==(i=`
                    `+v[3].url+`360.webp 360w, 
                    `+v[3].url+`576.webp 576w, 
                    `+v[3].url+`720.webp 720w,
                    `+v[3].url+`1440.webp 1440w,
                    `+v[3].url+`2880.webp 2880w,
                `))&&o(r,"srcset",i),(!S||g&8&&c!==(c=`
                    `+v[3].url+`360.jpg 360w, 
                    `+v[3].url+`576.jpg 576w, 
                    `+v[3].url+`720.jpg 720w,
                    `+v[3].url+`1440.jpg 1440w,
                    `+v[3].url+`2880.jpg 2880w,
                `))&&o(n,"srcset",c),(!S||g&8&&!ge(n.src,d=v[3].url+"360.jpg"))&&o(n,"src",d),(!S||g&8&&T!==(T=v[3].imgAlt))&&o(n,"alt",T),(!S||g&8)&&y!==(y=v[3].imgAlt+"")&&te(D,y),(!S||g&2)&&te(H,v[1]),(!S||g&1)&&te(A,v[0]),g&4){F=se(v[2]);let P;for(P=0;P<F.length;P+=1){const U=Ee(v,F,P);E[P]?(E[P].p(U,g),M(E[P],1)):(E[P]=ye(U),E[P].c(),M(E[P],1),E[P].m(B,null))}for(me(),P=F.length;P<E.length;P+=1)le(P);de()}},i(v){if(!S){for(let g=0;g<F.length;g+=1)M(E[g]);S=!0}},o(v){E=E.filter(Boolean);for(let g=0;g<E.length;g+=1)R(E[g]);S=!1},d(v){v&&_(e),be(E,v)}}}function Ue(l,e,s){let{title:t}=e,{year:r}=e,{contributions:i}=e,{i:a}=e;return l.$$set=n=>{"title"in n&&s(0,t=n.title),"year"in n&&s(1,r=n.year),"contributions"in n&&s(2,i=n.contributions),"i"in n&&s(3,a=n.i)},[t,r,i,a]}class qe extends oe{constructor(e){super(),ce(this,e,Ue,Ge,ie,{title:0,year:1,contributions:2,i:3})}}function We(l){let e,s,t,r,i,a,n,c,d,T;return De(l[3]),{c(){e=h("div"),s=h("section"),t=h("h2"),r=x(l[0]),i=$(),a=h("p"),n=new Ve(!1),this.h()},l(b){e=m(b,"DIV",{});var k=I(e);s=m(k,"SECTION",{class:!0});var y=I(s);t=m(y,"H2",{class:!0});var D=I(t);r=ee(D,l[0]),D.forEach(_),i=z(y),a=m(y,"P",{class:!0});var C=I(a);n=Me(C,!1),C.forEach(_),y.forEach(_),k.forEach(_),this.h()},h(){o(t,"class","txt-c-2 svelte-ppmkmv"),n.a=null,o(a,"class",c=re(l[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv"),o(s,"class","svelte-ppmkmv")},m(b,k){q(b,e,k),u(e,s),u(s,t),u(t,r),u(s,i),u(s,a),n.m(l[1],a),d||(T=Ne(window,"resize",l[3]),d=!0)},p(b,[k]){k&1&&te(r,b[0]),k&2&&n.p(b[1]),k&4&&c!==(c=re(b[2]>750?"txt-t-3":"txt-b")+" svelte-ppmkmv")&&o(a,"class",c)},i:ne,o:ne,d(b){b&&_(e),d=!1,T()}}}function Je(l,e,s){let{title:t}=e,{body:r}=e,i;function a(){s(2,i=window.innerWidth)}return l.$$set=n=>{"title"in n&&s(0,t=n.title),"body"in n&&s(1,r=n.body)},[t,r,i,a]}class Ke extends oe{constructor(e){super(),ce(this,e,Je,We,ie,{title:0,body:1})}}function Ie(l,e,s){const t=l.slice();return t[4]=e[s],t}function Te(l){let e,s,t,r,i,a,n,c,d,T,b,k=l[4].alt+"",y,D,C;return{c(){e=h("figure"),s=h("picture"),t=h("source"),i=$(),a=h("img"),T=$(),b=h("figcaption"),y=x(k),D=$(),this.h()},l(w){e=m(w,"FIGURE",{class:!0});var p=I(e);s=m(p,"PICTURE",{});var f=I(s);t=m(f,"SOURCE",{type:!0,srcset:!0}),i=z(f),a=m(f,"IMG",{role:!0,decoding:!0,loading:!0,sizes:!0,srcset:!0,src:!0,alt:!0,class:!0}),f.forEach(_),T=z(p),b=m(p,"FIGCAPTION",{class:!0});var H=I(b);y=ee(H,k),H.forEach(_),D=z(p),p.forEach(_),this.h()},h(){o(t,"type","image/webp"),_e(t,r=`
                        `+l[4].src+`360.webp 360w, 
                        `+l[4].src+`576.webp 576w, 
                        `+l[4].src+`720.webp 720w,
                        `+l[4].src+`1440.webp 1440w,
                        `+l[4].src+`2880.webp 2880w,
                    `)||o(t,"srcset",r),o(a,"role","presentation"),o(a,"decoding","async"),o(a,"loading","lazy"),o(a,"sizes",`
                        (max-width: 749px) calc(100vw * `+l[3]+`), 
                        (max-width: 1520px) calc((100vw * `+l[3]+`) - 80px), 
                        1440px
                    `),_e(a,n=`
                        `+l[4].src+`360.jpg 360w, 
                        `+l[4].src+`576.jpg 576w, 
                        `+l[4].src+`720.jpg 720w,
                        `+l[4].src+`1440.jpg 1440w,
                        `+l[4].src+`2880.jpg 2880w,
                    `)||o(a,"srcset",n),ge(a.src,c=l[4].src+"360.jpg")||o(a,"src",c),o(a,"alt",d=l[4].alt),o(a,"class","svelte-ztmn4v"),o(b,"class","screenreader-only"),o(e,"class",C=re(l[0]=="c"?"img-center "+l[2]:"")+" svelte-ztmn4v")},m(w,p){q(w,e,p),u(e,s),u(s,t),u(s,i),u(s,a),u(e,T),u(e,b),u(b,y),u(e,D)},p(w,p){p&2&&r!==(r=`
                        `+w[4].src+`360.webp 360w, 
                        `+w[4].src+`576.webp 576w, 
                        `+w[4].src+`720.webp 720w,
                        `+w[4].src+`1440.webp 1440w,
                        `+w[4].src+`2880.webp 2880w,
                    `)&&o(t,"srcset",r),p&2&&n!==(n=`
                        `+w[4].src+`360.jpg 360w, 
                        `+w[4].src+`576.jpg 576w, 
                        `+w[4].src+`720.jpg 720w,
                        `+w[4].src+`1440.jpg 1440w,
                        `+w[4].src+`2880.jpg 2880w,
                    `)&&o(a,"srcset",n),p&2&&!ge(a.src,c=w[4].src+"360.jpg")&&o(a,"src",c),p&2&&d!==(d=w[4].alt)&&o(a,"alt",d),p&2&&k!==(k=w[4].alt+"")&&te(y,k),p&5&&C!==(C=re(w[0]=="c"?"img-center "+w[2]:"")+" svelte-ztmn4v")&&o(e,"class",C)},d(w){w&&_(e)}}}function Qe(l){let e,s,t=se(l[1]),r=[];for(let i=0;i<t.length;i+=1)r[i]=Te(Ie(l,t,i));return{c(){e=h("div");for(let i=0;i<r.length;i+=1)r[i].c();this.h()},l(i){e=m(i,"DIV",{class:!0});var a=I(e);for(let n=0;n<r.length;n+=1)r[n].l(a);a.forEach(_),this.h()},h(){o(e,"class",s=re(l[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")},m(i,a){q(i,e,a);for(let n=0;n<r.length;n+=1)r[n]&&r[n].m(e,null)},p(i,[a]){if(a&15){t=se(i[1]);let n;for(n=0;n<t.length;n+=1){const c=Ie(i,t,n);r[n]?r[n].p(c,a):(r[n]=Te(c),r[n].c(),r[n].m(e,null))}for(;n<r.length;n+=1)r[n].d(1);r.length=t.length}a&1&&s!==(s=re(i[0]=="s"?"figure-wrapper":"figure-wrapper bg")+" svelte-ztmn4v")&&o(e,"class",s)},i:ne,o:ne,d(i){i&&_(e),be(r,i)}}}function Xe(l,e,s){let{type:t}=e,{img:r}=e,{pd:i=""}=e,a=t==="s"?.5:1;return l.$$set=n=>{"type"in n&&s(0,t=n.type),"img"in n&&s(1,r=n.img),"pd"in n&&s(2,i=n.pd)},[t,r,i,a]}class Ye extends oe{constructor(e){super(),ce(this,e,Xe,Qe,ie,{type:0,img:1,pd:2})}}function Ze(l){let e,s,t='<h1 class="txt-d">Explore more</h1> <p class="txt-b svelte-827jsn">Like what you see?</p>',r,i,a,n,c,d="Previous",T,b,k=l[1].title+"",y,D,C,w='<span class="arrow txt-b svelte-827jsn">↓</span>',p,f,H,L,j,A,O,B="Next",S,F,E=l[0].title+"",le,v,g,P='<span class="arrow txt-b svelte-827jsn">↓</span>',U,J,K;return{c(){e=h("div"),s=h("div"),s.innerHTML=t,r=$(),i=h("div"),a=h("a"),n=h("div"),c=h("small"),c.textContent=d,T=$(),b=h("h3"),y=x(k),D=$(),C=h("div"),C.innerHTML=w,L=$(),j=h("a"),A=h("div"),O=h("small"),O.textContent=B,S=$(),F=h("h3"),le=x(E),v=$(),g=h("div"),g.innerHTML=P,this.h()},l(N){e=m(N,"DIV",{class:!0});var V=I(e);s=m(V,"DIV",{class:!0,"data-svelte-h":!0}),ae(s)!=="svelte-1jwhza7"&&(s.innerHTML=t),r=z(V),i=m(V,"DIV",{class:!0});var W=I(i);a=m(W,"A",{class:!0,href:!0,"aria-label":!0,style:!0});var ue=I(a);n=m(ue,"DIV",{class:!0});var fe=I(n);c=m(fe,"SMALL",{class:!0,"data-svelte-h":!0}),ae(c)!=="svelte-13o45rk"&&(c.textContent=d),T=z(fe),b=m(fe,"H3",{class:!0});var ke=I(b);y=ee(ke,k),ke.forEach(_),fe.forEach(_),D=z(ue),C=m(ue,"DIV",{class:!0,"data-svelte-h":!0}),ae(C)!=="svelte-1wn4cva"&&(C.innerHTML=w),ue.forEach(_),L=z(W),j=m(W,"A",{class:!0,href:!0,"aria-label":!0,style:!0});var pe=I(j);A=m(pe,"DIV",{class:!0});var ve=I(A);O=m(ve,"SMALL",{class:!0,"data-svelte-h":!0}),ae(O)!=="svelte-1edmpv0"&&(O.textContent=B),S=z(ve),F=m(ve,"H3",{class:!0});var je=I(F);le=ee(je,E),je.forEach(_),ve.forEach(_),v=z(pe),g=m(pe,"DIV",{class:!0,"data-svelte-h":!0}),ae(g)!=="svelte-map9iu"&&(g.innerHTML=P),pe.forEach(_),W.forEach(_),V.forEach(_),this.h()},h(){o(s,"class","title-wrapper svelte-827jsn"),o(c,"class","txt-c-1"),o(b,"class","txt-t-2"),o(n,"class","info-wrapper svelte-827jsn"),o(C,"class","arrow-wrapper arrow-prev glass svelte-827jsn"),o(a,"class","story svelte-827jsn"),o(a,"href",p=l[1].path),o(a,"aria-label",f="Previous project: "+l[1].title),o(a,"style",H='background-image: url("'+l[1].preview.url+'360.jpg");'),o(O,"class","txt-c-1"),o(F,"class","txt-t-2"),o(A,"class","info-wrapper svelte-827jsn"),o(g,"class","arrow-wrapper arrow-next glass svelte-827jsn"),o(j,"class","story svelte-827jsn"),o(j,"href",U=l[0].path),o(j,"aria-label",J="Previous project: "+l[0].title),o(j,"style",K='background-image: url("'+l[0].preview.url+'360.jpg");'),o(i,"class","stories-wrapper svelte-827jsn"),o(e,"class","post-nav-wrapper svelte-827jsn")},m(N,V){q(N,e,V),u(e,s),u(e,r),u(e,i),u(i,a),u(a,n),u(n,c),u(n,T),u(n,b),u(b,y),u(a,D),u(a,C),u(i,L),u(i,j),u(j,A),u(A,O),u(A,S),u(A,F),u(F,le),u(j,v),u(j,g)},p(N,[V]){V&2&&k!==(k=N[1].title+"")&&te(y,k),V&2&&p!==(p=N[1].path)&&o(a,"href",p),V&2&&f!==(f="Previous project: "+N[1].title)&&o(a,"aria-label",f),V&2&&H!==(H='background-image: url("'+N[1].preview.url+'360.jpg");')&&o(a,"style",H),V&1&&E!==(E=N[0].title+"")&&te(le,E),V&1&&U!==(U=N[0].path)&&o(j,"href",U),V&1&&J!==(J="Previous project: "+N[0].title)&&o(j,"aria-label",J),V&1&&K!==(K='background-image: url("'+N[0].preview.url+'360.jpg");')&&o(j,"style",K)},i:ne,o:ne,d(N){N&&_(e)}}}function xe(l,e,s){let{next:t}=e,{prev:r}=e;return l.$$set=i=>{"next"in i&&s(0,t=i.next),"prev"in i&&s(1,r=i.prev)},[t,r]}class et extends oe{constructor(e){super(),ce(this,e,xe,Ze,ie,{next:0,prev:1})}}const{document:we}=Re;function Pe(l,e,s){const t=l.slice();return t[1]=e[s],t}function Ce(l){let e,s,t=se(l[0].content),r=[];for(let a=0;a<t.length;a+=1)r[a]=He(Pe(l,t,a));const i=a=>R(r[a],1,1,()=>{r[a]=null});return{c(){for(let a=0;a<r.length;a+=1)r[a].c();e=he()},l(a){for(let n=0;n<r.length;n+=1)r[n].l(a);e=he()},m(a,n){for(let c=0;c<r.length;c+=1)r[c]&&r[c].m(a,n);q(a,e,n),s=!0},p(a,n){if(n&1){t=se(a[0].content);let c;for(c=0;c<t.length;c+=1){const d=Pe(a,t,c);r[c]?(r[c].p(d,n),M(r[c],1)):(r[c]=He(d),r[c].c(),M(r[c],1),r[c].m(e.parentNode,e))}for(me(),c=t.length;c<r.length;c+=1)i(c);de()}},i(a){if(!s){for(let n=0;n<t.length;n+=1)M(r[n]);s=!0}},o(a){r=r.filter(Boolean);for(let n=0;n<r.length;n+=1)R(r[n]);s=!1},d(a){a&&_(e),be(r,a)}}}function tt(l){let e,s;return e=new Ye({props:{type:l[1].type,pd:l[1].pd,img:l[1].img}}),{c(){Q(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,r){Y(e,t,r),s=!0},p(t,r){const i={};r&1&&(i.type=t[1].type),r&1&&(i.pd=t[1].pd),r&1&&(i.img=t[1].img),e.$set(i)},i(t){s||(M(e.$$.fragment,t),s=!0)},o(t){R(e.$$.fragment,t),s=!1},d(t){Z(e,t)}}}function lt(l){let e,s;return e=new Ke({props:{title:l[1].title,body:l[1].body}}),{c(){Q(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,r){Y(e,t,r),s=!0},p(t,r){const i={};r&1&&(i.title=t[1].title),r&1&&(i.body=t[1].body),e.$set(i)},i(t){s||(M(e.$$.fragment,t),s=!0)},o(t){R(e.$$.fragment,t),s=!1},d(t){Z(e,t)}}}function He(l){let e,s,t,r;const i=[lt,tt],a=[];function n(c,d){return c[1].block=="txt"?0:c[1].block=="img"?1:-1}return~(e=n(l))&&(s=a[e]=i[e](l)),{c(){s&&s.c(),t=he()},l(c){s&&s.l(c),t=he()},m(c,d){~e&&a[e].m(c,d),q(c,t,d),r=!0},p(c,d){let T=e;e=n(c),e===T?~e&&a[e].p(c,d):(s&&(me(),R(a[T],1,1,()=>{a[T]=null}),de()),~e?(s=a[e],s?s.p(c,d):(s=a[e]=i[e](c),s.c()),M(s,1),s.m(t.parentNode,t)):s=null)},i(c){r||(M(s),r=!0)},o(c){R(s),r=!1},d(c){c&&_(t),~e&&a[e].d(c)}}}function st(l){let e,s,t,r,i,a,n,c,d,T,b,k,y,D,C,w;we.title=e=l[0]?l[0].info.title:"Project not found",a=new Se({props:{link:"/#proj-"+l[0].id}}),T=new qe({props:{title:l[0].info.title,year:l[0].info.year,contributions:l[0].info.con,i:l[0].preview}});let p=l[0].content&&Ce(l);return y=new et({props:{prev:l[0].nav.prev,next:l[0].nav.next}}),C=new Ae({props:{dark:!0}}),{c(){s=$(),t=h("div"),r=h("div"),i=h("nav"),Q(a.$$.fragment),n=$(),c=h("article"),d=h("main"),Q(T.$$.fragment),b=$(),p&&p.c(),k=$(),Q(y.$$.fragment),D=$(),Q(C.$$.fragment),this.h()},l(f){Be("svelte-1jt70ms",we.head).forEach(_),s=z(f),t=m(f,"DIV",{});var L=I(t);r=m(L,"DIV",{class:!0});var j=I(r);i=m(j,"NAV",{class:!0});var A=I(i);X(a.$$.fragment,A),A.forEach(_),j.forEach(_),n=z(L),c=m(L,"ARTICLE",{class:!0});var O=I(c);d=m(O,"MAIN",{class:!0});var B=I(d);X(T.$$.fragment,B),b=z(B),p&&p.l(B),B.forEach(_),O.forEach(_),k=z(L),X(y.$$.fragment,L),D=z(L),X(C.$$.fragment,L),L.forEach(_),this.h()},h(){o(i,"class","svelte-1968jwy"),o(r,"class","nav-wrapper svelte-1968jwy"),o(d,"class","svelte-1968jwy"),o(c,"class","post-wrapper svelte-1968jwy")},m(f,H){q(f,s,H),q(f,t,H),u(t,r),u(r,i),Y(a,i,null),u(t,n),u(t,c),u(c,d),Y(T,d,null),u(d,b),p&&p.m(d,null),u(t,k),Y(y,t,null),u(t,D),Y(C,t,null),w=!0},p(f,[H]){(!w||H&1)&&e!==(e=f[0]?f[0].info.title:"Project not found")&&(we.title=e);const L={};H&1&&(L.link="/#proj-"+f[0].id),a.$set(L);const j={};H&1&&(j.title=f[0].info.title),H&1&&(j.year=f[0].info.year),H&1&&(j.contributions=f[0].info.con),H&1&&(j.i=f[0].preview),T.$set(j),f[0].content?p?(p.p(f,H),H&1&&M(p,1)):(p=Ce(f),p.c(),M(p,1),p.m(d,null)):p&&(me(),R(p,1,1,()=>{p=null}),de());const A={};H&1&&(A.prev=f[0].nav.prev),H&1&&(A.next=f[0].nav.next),y.$set(A)},i(f){w||(M(a.$$.fragment,f),M(T.$$.fragment,f),M(p),M(y.$$.fragment,f),M(C.$$.fragment,f),w=!0)},o(f){R(a.$$.fragment,f),R(T.$$.fragment,f),R(p),R(y.$$.fragment,f),R(C.$$.fragment,f),w=!1},d(f){f&&(_(s),_(t)),Z(a),Z(T),p&&p.d(),Z(y),Z(C)}}}function rt(l,e,s){let{data:t}=e;return Le(()=>{"ontouchstart"in window?document.documentElement.style.setProperty("--doc-height",`${window.innerHeight}px`):document.documentElement.style.setProperty("--doc-height","100vh")}),l.$$set=r=>{"data"in r&&s(0,t=r.data)},[t]}class ft extends oe{constructor(e){super(),ce(this,e,rt,st,ie,{data:0})}}export{ft as component,ut as universal};
