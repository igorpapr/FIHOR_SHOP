!function(t){var a={};function e(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=a,e.d=function(t,a,n){e.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,a){if(1&a&&(t=e(t)),8&a)return t;if(4&a&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var r in t)e.d(n,r,function(a){return t[a]}.bind(null,r));return n},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},e.p="",e(e.s=0)}([function(t,a,e){"use strict";e.r(a);e(1);var n,r={},i={},o={},c=!1;function s(t){var a;a=0==t?"https://nit.tron.net.ua/api/product/list":"https://nit.tron.net.ua/api/product/list/category/"+t,$.getJSON(a,function(t){i=t;var a="";for(var e in t){var n=t[e].id;a+='<div class="goods-list">';var o=t[e].name;a+='<div class="goods-img-container">',a+='<img class="goods-img" src="'+t[e].image_url+'" alt="'+o+'">',a+="</div>",a+='<span class="goods-name open-descr-frame" name-art="'+n+'">'+o+"</span>";var s=t[e].price,u=t[e].special_price;null!=u?(a+='<span class="old-price">'+s+" грн</span>",a+='<span class="new-price">'+u+" грн</span>"):a+='<span class="price">'+s+" грн</span>",a+='<button class="add-to-cart" data-id="'+n+'" data-obj="'+e+'">Add to cart</button>',a+="</div>"}$("#goods-container").html(a),$("button.add-to-cart").on("click",function(){var a=parseInt($(this).attr("data-obj")),e=$(this).attr("data-id");null!=r[e-1]?r[e-1].quantity++:(r[e-1]={},r[e-1].name=t[a].name,r[e-1].quantity=1,null!=t[a].special_price?r[e-1].price=t[a].special_price:r[e-1].price=t[a].price),localStorage.setItem("cart",JSON.stringify(r)),c?d():(l(),d())})})}function l(){d(),document.getElementById("mySidebar").style.width="317px",document.getElementById("header").style.marginRight="317px",c=!0}function d(){if(function(t){for(var a in t)if(t.hasOwnProperty(a))return!1;return JSON.stringify(t)===JSON.stringify({})}(r)){a="<p>Cart is empty</p>";$(".cart-content").html(a)}else{var t=0,a="";for(var e in r)a+='<div class="cart-items">',a+='<img class="cross-img" src="img/cross.png" data-art = "'+e+'" >',a+='<div class="cart-name">',a+='<span id="show-good-info" data-art = "'+e+'">'+i[e].name+"</span></div>",a+='<div class="cart-item-quantity">',a+='<img class="operations-img plus" src="img/plus.png"  data-art="'+e+'">',a+="<span>"+r[e].quantity+"</span>",a+='<img class="operations-img minus" src="img/minus.png" data-art="'+e+'">',a+="</div>",t+=r[e].quantity*parseFloat(r[e].price),a+="</div>";a+='<div class="cart-item-cost-buy">',a+='<span class="cart-item-cost">Total: '+t+"</span>",a+='<button class="cart-btn">Order</button>',a+="</div>",$(".cart-content").html(a),$(".cross-img").on("click",function(){var t=$(this).attr("data-art");r[t].quantity=0,delete r[t],d(),localStorage.setItem("cart",JSON.stringify(r))}),$(".plus").on("click",function(){var t=$(this).attr("data-art");r[t].quantity++,localStorage.setItem("cart",JSON.stringify(r)),d()}),$(".minus").on("click",function(){var t=$(this).attr("data-art");r[t].quantity>1?r[t].quantity--:r[t].quantity>0&&delete r[t],localStorage.setItem("cart",JSON.stringify(r)),d()})}}$("document").ready(function(){$.getJSON("https://nit.tron.net.ua/api/category/list",function(t){var a,e="";for(var r in e+='<li class="category-item current" data-id="1" title="All goods">All devices</li>',o[1]="All devices",n=1,$("#goods-content-header").html(o[n]),t)a=t[r].id,e+='<li class="category-item" data-id="'+a+'">'+t[r].name+"</li>",o[a]=t[r].description;console.log(o),$("#categories-list ul").html(e),$("li.category-item").on("click",function(){var t=$(this).attr("data-id");n!==t&&(s(t),$("#goods-content-header").html(o[t]),$(".current").removeClass("current"),$(this).addClass("current"),n=t)})}),s(1),null!=localStorage.getItem("cart")&&(r=JSON.parse(localStorage.getItem("cart"))),$(".openbtn").on("click",function(){l()}),$(".closebtn").on("click",function(){document.getElementById("mySidebar").style.width="0",document.getElementById("header").style.marginRight="0",c=!1})})},function(t,a,e){}]);