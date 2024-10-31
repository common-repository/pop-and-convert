var pacExports;(()=>{"use strict";var e={};function t(e){let t=e.match(/(\d+)(hour|min|sec)/);if(t){let e,c=parseInt(t[1]);switch(t[2].toLowerCase()){case"hour":e=3600*c;break;case"min":e=60*c;break;case"sec":e=c;break;default:return"Invalid unit"}return e}return"Invalid input"}(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e);const c=document.querySelector("#pop-and-convert-frontend");if(null!==c){const n=document.getElementById("pac_popup"),o=document.querySelector("#pop-and-convert-frontend .pac-notification"),a=document.querySelector("#pop-and-convert-frontend .popup");function i(){const e=o.getAttribute("data-id");let t=localStorage.getItem(`pacClosedTime-${e}`);if(t){let e=(new Date).getTime();const c=Math.max(0,t-e);c>=0?setTimeout((()=>{const e=document.querySelector(".pac-notification.sticky");null!==e?e.classList.remove("hide"):null!==n&&(a.classList.contains("popup-layout-3")?n.show():n.showModal()),localStorage.removeItem("pacClosedTime")}),c):localStorage.removeItem("pacClosedTime")}}const s=()=>{if(null!==a){const e=document.querySelector(".pac_popup-btn--cross"),c=document.querySelector(".pac_popup-btn--hide"),o=document.querySelector(".pac_popup__description"),s=a.getAttribute("data-id");if(null!==c){function r(){"true"===c.getAttribute("aria-expanded")?(c.setAttribute("aria-expanded",!1),o.setAttribute("aria-hidden",!0)):(c.setAttribute("aria-expanded",!0),o.setAttribute("aria-hidden",!1))}c.addEventListener("click",r)}e.addEventListener("click",(()=>{n.setAttribute("closing",""),n.addEventListener("animationend",(()=>{n.removeAttribute("closing"),n.close()}),{once:!0});const e=(new Date).getTime()+1e3*t(pacpPublicData.pacp_settings.dismiss);localStorage.setItem(`pacClosedTime-${s}`,e),i()}))}},r=()=>{null!==c&&c.addEventListener("keydown",(e=>{if("Tab"===e.key){const t=c.querySelectorAll("button, [href]"),n=t[0],o=t[t.length-1];e.shiftKey||document.activeElement!==o?e.shiftKey&&document.activeElement===n&&(e.preventDefault(),o.focus()):(e.preventDefault(),n.focus())}}))},l=()=>{const e=document.querySelector(".pac-btn a");if(null!==o&&null!==e){const c=o.getAttribute("data-id");e.addEventListener("click",(async()=>{const n=(new Date).getTime()+1e3*t(pacpPublicData.pacp_settings.dismiss);localStorage.setItem(`pacClosedTime-${c}`,n),i(),o.classList.contains("popup")?e.closest("dialog").close("close"):o.classList.contains("sticky")&&o.classList.toggle("hide")}))}},d=()=>{const e=document.querySelector(".pac-btn a"),t=`post-${pacpPublicData.postID}`;let c;if(null!==o&&null!==e){const n=o.getAttribute("data-id"),a=`${pacpPublicData.apiURL}/pop-and-convert/v1/notifications-stats/${n}`,i=async()=>{try{const e=await fetch(a),t=await e.json();return c=t.clicks?t.clicks:0,c}catch(e){return console.error("Error Fetching Clicks:",e),0}};async function s(e){try{if(t!==n){const t=await fetch(a),c={...await t.json(),clicks:e},n=new Blob([JSON.stringify(c)],{type:"application/json"});navigator.sendBeacon(a,n)}}catch(e){console.error("Error Updating Clicks",e)}}c=i(),e.addEventListener("click",(async()=>{s(c+1)}))}};(()=>{if(null!==document.querySelector("#pop-and-convert-frontend .sticky")){const e=document.querySelector(".pac-close-button.cross"),c=o.getAttribute("data-id");null!==e&&e.addEventListener("click",(()=>{o.classList.toggle("hide");const e=(new Date).getTime()+1e3*t(pacpPublicData.pacp_settings.dismiss);localStorage.setItem(`pacClosedTime-${c}`,e),i()}));const n=document.querySelector(".pac-close-button.down"),a=document.querySelector(".pac-sticky-wrapper");null!==n&&n.addEventListener("click",(()=>{a.classList.toggle("hide")}))}})(),s(),window.addEventListener("load",(()=>{i()})),l(),r(),pacpPublicData.loggedIn||d()}(pacExports=void 0===pacExports?{}:pacExports).public=e})();