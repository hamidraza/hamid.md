if(!self.define){let e,n={};const s=(s,t)=>(s=new URL(s+".js",t).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,i)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(n[l])return;let r={};const o=e=>s(e,l),c={module:{uri:l},exports:r,require:o};n[l]=Promise.all(t.map((e=>c[e]||o(e)))).then((e=>(i(...e),r)))}}define(["./workbox-48c70e51"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/bundle.fb94148e1f08fbcd7094.css",revision:null},{url:"/bundle.fb94148e1f08fbcd7094.js",revision:null},{url:"/bundle.fb94148e1f08fbcd7094.js.LICENSE.txt",revision:"8472610b04ebbe71d66d54555e68cbb6"},{url:"/index.html",revision:"069a5b2aebc434731940ce43a0f938da"}],{}),e.registerRoute(/\.(?:png|jpg|jpeg|svg)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/^\/[^\/]+\.html$/,new e.NetworkFirst({cacheName:"html",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/^\/[^\/]+\dot$/,new e.NetworkFirst({cacheName:"dot",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/\bfeature-flag\b/,new e.NetworkFirst({cacheName:"feature-flag",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/^https:\/\/storage\.googleapis\.com\/tfhub-tfjs-modules\//,new e.CacheFirst({cacheName:"tfjs",plugins:[new e.ExpirationPlugin({maxEntries:100})]}),"GET"),e.registerRoute(/^https:\/\/tfhub\.dev\/tensorflow\/tfjs-model\//,new e.CacheFirst({cacheName:"tfjs-302",plugins:[new e.ExpirationPlugin({maxEntries:100})]}),"GET")}));
