import{r as u}from"./index.NEDEFKed.js";var m={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h=u,S=Symbol.for("react.element"),y=Symbol.for("react.fragment"),D=Object.prototype.hasOwnProperty,E=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,g={key:!0,ref:!0,__self:!0,__source:!0};function p(e,r,t){var n,o={},s=null,_=null;t!==void 0&&(s=""+t),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(_=r.ref);for(n in r)D.call(r,n)&&!g.hasOwnProperty(n)&&(o[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps,r)o[n]===void 0&&(o[n]=r[n]);return{$$typeof:S,type:e,key:s,ref:_,props:o,_owner:E.current}}a.Fragment=y;a.jsx=p;a.jsxs=p;m.exports=a;var w=m.exports,x=["second","minute","hour","day","week","month","year"];function R(e,r){if(r===0)return["just now","right now"];var t=x[Math.floor(r/2)];return e>1&&(t+="s"),[e+" "+t+" ago","in "+e+" "+t]}var N=["秒","分钟","小时","天","周","个月","年"];function C(e,r){if(r===0)return["刚刚","片刻后"];var t=N[~~(r/2)];return[e+" "+t+"前",e+" "+t+"后"]}var l={},f=function(e,r){l[e]=r},O=function(e){return l[e]||l.en_US},c=[60,60,24,7,365/7/12,12];function v(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}function d(e,r){var t=e<0?1:0;e=Math.abs(e);for(var n=e,o=0;e>=c[o]&&o<c.length;o++)e/=c[o];return e=Math.floor(e),o*=2,e>(o===0?9:1)&&(o+=1),r(e,o,n)[t].replace("%s",e.toString())}function j(e,r){var t=r?v(r):new Date;return(+t-+v(e))/1e3}var T=function(e,r,t){var n=j(e,t&&t.relativeDate);return d(n,O(r))};f("en_US",R);f("zh_CN",C);const i=e=>{const r=new Date(e);return T(r,"zh_CN")},$=({date:e})=>{const[r,t]=u.useState("");return u.useEffect(()=>{const n=i(e);t(n),setInterval(()=>{const o=i(e);t(o)},1e3)},[]),w.jsx("span",{children:r})};export{$ as default};
