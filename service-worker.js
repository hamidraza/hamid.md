if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const r=e=>n(e,l),c={module:{uri:l},exports:o,require:r};s[l]=Promise.all(t.map((e=>c[e]||r(e)))).then((e=>(i(...e),o)))}}define(["./workbox-48c70e51"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/bundle.2a8656c23116608d49c9.css",revision:null},{url:"/bundle.2a8656c23116608d49c9.js",revision:null},{url:"/bundle.2a8656c23116608d49c9.js.LICENSE.txt",revision:"8472610b04ebbe71d66d54555e68cbb6"},{url:"/index.html",revision:"4153d088c99514ae6f7e14b241d08b8b"}],{}),e.registerRoute(/\.(?:png|jpg|jpeg|svg)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/^\/[^\/]+\.html$/,new e.NetworkFirst({cacheName:"html",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/^https:\/\/storage\.googleapis\.com\/tfhub-tfjs-modules\//,new e.CacheFirst({cacheName:"tfjs",plugins:[new e.ExpirationPlugin({maxEntries:100})]}),"GET"),e.registerRoute(/^https:\/\/tfhub\.dev\/tensorflow\/tfjs-model\//,new e.CacheFirst({cacheName:"tfjs-302",plugins:[new e.ExpirationPlugin({maxEntries:100})]}),"GET")}));
