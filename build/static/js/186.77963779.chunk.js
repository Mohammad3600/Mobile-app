/*! For license information please see 186.77963779.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkaiykr_private_ltd=globalThis.webpackChunkaiykr_private_ltd||[]).push([[186],{3743:(e,t,o)=>{o.d(t,{a:()=>d,c:()=>u,g:()=>l,s:()=>c});var n=o(1811);const i="ion-content",r=".ion-content-scroll-host",s=`${i}, ${r}`,a=e=>"ION-CONTENT"===e.tagName,l=async e=>a(e)?(await new Promise((t=>(0,n.c)(e,t))),e.getScrollElement()):e,d=e=>e.closest(s),c=(e,t)=>{if(a(e)){return e.scrollToTop(t)}return Promise.resolve(e.scrollTo({top:0,left:0,behavior:t>0?"smooth":"auto"}))},u=(e,t,o,n)=>{if(a(e)){return e.scrollByPoint(t,o,n)}return Promise.resolve(e.scrollBy({top:o,left:t,behavior:n>0?"smooth":"auto"}))}},1186:(e,t,o)=>{o.r(t),o.d(t,{startInputShims:()=>y});var n=o(3743),i=o(1811),r=o(6184);const s=new WeakMap,a=function(e,t,o){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];s.has(e)!==o&&(o?l(e,t,n,i):d(e,t))},l=function(e,t,o){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=t.parentNode,r=t.cloneNode(!1);r.classList.add("cloned-input"),r.tabIndex=-1,n&&(r.disabled=!0),i.appendChild(r),s.set(e,r);const a="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${a}px,${o}px,0) scale(0)`},d=(e,t)=>{const o=s.get(e);o&&(s.delete(e),o.remove()),e.style.pointerEvents="",t.style.transform=""},c="input, textarea, [no-blur], [contenteditable]",u=(e,t,o,n)=>{const i=e.top,r=e.bottom,s=t.top,a=s+15,l=Math.min(t.bottom,n-o)-50-r,d=a-i,c=Math.round(l<0?-l:d>0?-d:0),u=Math.min(c,i-s),m=Math.abs(u)/.3;return{scrollAmount:u,scrollDuration:Math.min(400,Math.max(150,m)),scrollPadding:o,inputSafeY:4-(i-a)}},m="$ionPaddingTimer",v=(e,t,o)=>{const n=e[m];n&&clearTimeout(n),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[m]=setTimeout((()=>{e.style.setProperty("--keyboard-offset","0px"),o&&o()}),120)},f=(e,t,o)=>{e.addEventListener("focusout",(()=>{t&&v(t,0,o)}),{once:!0})};let h=0;const p="data-ionic-skip-scroll-assist",w=e=>{document.activeElement!==e&&(e.setAttribute(p,"true"),e.focus())},g=async function(e,t,o,r,s,l){let d=arguments.length>6&&void 0!==arguments[6]&&arguments[6];if(!o&&!r)return;const c=((e,t,o)=>{var n;const i=null!==(n=e.closest("ion-item,[ion-item]"))&&void 0!==n?n:e;return u(i.getBoundingClientRect(),t.getBoundingClientRect(),o,e.ownerDocument.defaultView.innerHeight)})(e,o||r,s);if(o&&Math.abs(c.scrollAmount)<4)return w(t),void(l&&null!==o&&(v(o,h),f(t,o,(()=>h=0))));if(a(e,t,!0,c.inputSafeY,d),w(t),(0,i.r)((()=>e.click())),l&&o&&(h=c.scrollPadding,v(o,h)),"undefined"!==typeof window){let i;const r=async()=>{void 0!==i&&clearTimeout(i),window.removeEventListener("ionKeyboardDidShow",s),window.removeEventListener("ionKeyboardDidShow",r),o&&await(0,n.c)(o,0,c.scrollAmount,c.scrollDuration),a(e,t,!1,c.inputSafeY),w(t),l&&f(t,o,(()=>h=0))},s=()=>{window.removeEventListener("ionKeyboardDidShow",s),window.addEventListener("ionKeyboardDidShow",r)};if(o){const e=await(0,n.g)(o),a=e.scrollHeight-e.clientHeight;if(c.scrollAmount>a-e.scrollTop)return"password"===t.type?(c.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",s)):window.addEventListener("ionKeyboardDidShow",r),void(i=setTimeout(r,1e3))}r()}},y=async(e,t)=>{const o=document,s="ios"===t,l="android"===t,d=e.getNumber("keyboardHeight",290),u=e.getBoolean("scrollAssist",!0),m=e.getBoolean("hideCaretOnScroll",s),v=e.getBoolean("inputBlurring",s),f=e.getBoolean("scrollPadding",!0),h=Array.from(o.querySelectorAll("ion-input, ion-textarea")),w=new WeakMap,y=new WeakMap,b=await r.K.getResizeMode(),E=async e=>{await new Promise((t=>(0,i.c)(e,t)));const t=e.shadowRoot||e,o=t.querySelector("input")||t.querySelector("textarea"),s=(0,n.a)(e),c=s?null:e.closest("ion-footer");if(!o)return;if(s&&m&&!w.has(e)){const t=((e,t,o)=>{if(!o||!t)return()=>{};const n=o=>{var n;(n=t)===n.getRootNode().activeElement&&a(e,t,o)},r=()=>a(e,t,!1),s=()=>n(!0),l=()=>n(!1);return(0,i.a)(o,"ionScrollStart",s),(0,i.a)(o,"ionScrollEnd",l),t.addEventListener("blur",r),()=>{(0,i.b)(o,"ionScrollStart",s),(0,i.b)(o,"ionScrollEnd",l),t.removeEventListener("blur",r)}})(e,o,s);w.set(e,t)}if(!("date"===o.type||"datetime-local"===o.type)&&(s||c)&&u&&!y.has(e)){const t=function(e,t,o,n,i,s,a){let l=arguments.length>7&&void 0!==arguments[7]&&arguments[7];const d=s&&(void 0===a||a.mode===r.a.None),c=async()=>{t.hasAttribute(p)?t.removeAttribute(p):g(e,t,o,n,i,d,l)};return e.addEventListener("focusin",c,!0),()=>{e.removeEventListener("focusin",c,!0)}}(e,o,s,c,d,f,b,l);y.set(e,t)}};v&&(()=>{let e=!0,t=!1;const o=document,n=()=>{t=!0},r=()=>{e=!0},s=n=>{if(t)return void(t=!1);const i=o.activeElement;if(!i)return;if(i.matches(c))return;const r=n.target;r!==i&&(r.matches(c)||r.closest(c)||(e=!1,setTimeout((()=>{e||i.blur()}),50)))};(0,i.a)(o,"ionScrollStart",n),o.addEventListener("focusin",r,!0),o.addEventListener("touchend",s,!1)})();for(const n of h)E(n);o.addEventListener("ionInputDidLoad",(e=>{E(e.detail)})),o.addEventListener("ionInputDidUnload",(e=>{(e=>{if(m){const t=w.get(e);t&&t(),w.delete(e)}if(u){const t=y.get(e);t&&t(),y.delete(e)}})(e.detail)}))}}}]);
//# sourceMappingURL=186.77963779.chunk.js.map