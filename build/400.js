"use strict";(globalThis.webpackChunkpacExports=globalThis.webpackChunkpacExports||[]).push([[400],{9649:(e,t,a)=>{a.d(t,{A:()=>i});var n=a(1609),o=(a(7723),a(2619));function i(){return(0,n.createElement)(n.Fragment,null,(0,o.applyFilters)("pac_license_activation_placeholder",null))}},4400:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.r(t),a.d(t,{default:()=>h});var o=a(1609),i=a(7723),l=a(2505),c=a.n(l),s=a(4721),r=a(9501),p=a(8356),d=a(9234),m=a(9649);const b=(0,o.lazy)((()=>(0,p.A)((()=>a.e(364).then(a.bind(a,364)))))),_=(0,o.lazy)((()=>(0,p.A)((()=>Promise.all([a.e(838),a.e(794)]).then(a.bind(a,27)))))),g=(0,o.lazy)((()=>(0,p.A)((()=>a.e(134).then(a.bind(a,6134)))))),u=[{label:(0,i.__)("General","pop-and-convert"),content:_,icon:(0,o.createElement)(r.Icon,{icon:"setting"})},{label:(0,i.__)("Customization","pop-and-convert"),content:b,icon:(0,o.createElement)(r.Icon,{icon:"puzzel"})}];pacpAdminData.admin&&u.push({label:(0,i.__)("Role Management","pop-and-convert"),content:g,icon:(0,o.createElement)(r.Icon,{icon:"management"})}),pacpAdminData.pro_activated&&u.push({label:(0,i.__)("License Activation","pop-and-convert"),content:m.A,icon:(0,o.createElement)(r.Icon,{icon:"key"})});const y={trigger:"onpageload",delay:"30sec",dismiss:"1hour",desk_title_size:"22px",desk_desc_size:"16px",mob_title_size:"20px",mob_desc_size:"16px",tab_title_size:"20px",tab_desc_size:"16px",btn_bg_color:"#253b80",btn_text_color:"#ffffff",btn_border_rad:"5px",img_border_rad:"100%",imageSizeType:"default",affiliateLink:"",img_width:"",img_height:"",box_border_rad:"5px",desktop_visibility:!0,tablet_visibility:!0,mobile_visibility:!0,displayCredits:!1,userRoles:["Administrator"]},f=await(0,d.o)(),x=0===f.length?y:f;function h(){const[e,t]=(0,o.useState)(0),a=u[e].content,[n,l]=(0,o.useState)(x);return(0,o.createElement)("div",{className:"container pb-6 pl-7 pr-6 2xl:pl-0 2xl:pr-0"},(0,o.createElement)("h2",{className:"mt-6 font-bold text-2xl"},"Settings"),(0,o.createElement)("div",{className:"flex gap-6 mt-6 flex-col lg:flex-row"},(0,o.createElement)("aside",{className:"bg-white box-shadow rounded py-6 lg:w-1/4"},(0,o.createElement)("nav",{className:"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 lg:sticky lg:top-12"},u.map((({label:a,icon:n},i)=>(0,o.createElement)("button",{onClick:()=>function(e){t(e)}(i),className:`text-base py-2 px-4 text-left inline-flex items-center gap-3 hover:text-primary-color ${e===i&&"border-l-4 border-primary-color text-primary-color font-semibold"}`,key:i,type:"button"},n,a))))),(0,o.createElement)("div",{className:"flex-1"},(0,o.createElement)(o.Suspense,{fallback:(0,o.createElement)(r.Loading,null)},(0,o.createElement)(a,{notificationSetting:n,handleChange:e=>t=>{if("object"!=typeof t||Array.isArray(t))("string"==typeof t||Number.isInteger(t)||Array.isArray(t))&&l({...n,[e]:t});else{const{value:a,type:o,checked:i}=t.target;l({...n,[e]:"checkbox"===o?i:a})}},handleSave:()=>{s.o.promise((async e=>{const t=`${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-settings/`;try{return c().post(t,e,{headers:{"Content-Type":"application/json","X-WP-NONCE":pacpAdminData.nonce}})}catch(e){throw e}})(n),{loading:(0,i.__)("Saving global settings","pop-and-convert"),success:(0,i.__)("Global settings saved successfully.","pop-and-convert"),error:(0,i.__)("Failed to save gloabl settings","pop-and-convert")})}})))))}n()}catch(v){n(v)}}),1)},9234:(e,t,a)=>{a.d(t,{o:()=>i});var n=a(2505),o=a.n(n);async function i(){const e=`${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-settings`;let t=await o().get(e).then((e=>e.data));return t||(t=[]),t}}}]);