!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);console.log("Hello!"),console.log("The time is ".concat(new Date)),$("document").ready(function(){$.getJSON("https://nit.tron.net.ua/api/category/list",function(t){var e="";for(var n in t)e+='<li class="category-item" title="'+t[n].description+'">'+t[n].name+"</li>";$("#categories-list ul").html(e);var r=$('.category-item:contains("All")').addClass("current"),o=r.attr("title");$("#goods-content-header").html(o)}),$.getJSON("https://nit.tron.net.ua/api/product/list",function(t){var e="";for(var n in t){e+='<div class="goods-list">';var r=t[n].name;e+='<img class="goods-img" src="'+t[n].image_url+'" alt="'+r+'">',e+='<span class="goods-name">'+r+"</span>";var o=t[n].price,i=t[n].special_price;null!=i&&(e+='<span style="text-decoration:line-through">'+i+"</span>"),e+='<span class="price">'+o+"</span>",e+="</div>"}$("#goods-content").append(e)})})},function(t,e,n){}]);