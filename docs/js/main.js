!function(t){var e={};function n(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(a,i,function(e){return t[e]}.bind(null,i));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);var a,i={},r={},o=!1;function c(t){var e;e=0==t?"https://nit.tron.net.ua/api/product/list":"https://nit.tron.net.ua/api/product/list/category/"+t,$.getJSON(e,function(t){t;var e="";for(var n in t){var a=t[n].id;e+='<div class="goods-list">';var r=t[n].name;e+='<div class="goods-img-container">',e+='<img class="goods-img" src="'+t[n].image_url+'" alt="'+r+'">',e+="</div>",e+='<span class="goods-name show-good-info" data-art="'+a+'">'+r+"</span>";var c=t[n].price,d=t[n].special_price;null!=d?(e+='<span class="old-price">'+c+" грн</span>",e+='<span class="new-price">'+d+" грн</span>"):e+='<span class="price">'+c+" грн</span>",e+='<button class="add-to-cart" data-id="'+a+'" data-obj="'+n+'">Add to cart</button>',e+="</div>"}$("#goods-container").html(e),$("button.add-to-cart").on("click",function(){var e=parseInt($(this).attr("data-obj")),n=$(this).attr("data-id");null!=i[n-1]?i[n-1].quantity++:(i[n-1]={},i[n-1].name=t[e].name,i[n-1].quantity=1,null!=t[e].special_price?i[n-1].price=t[e].special_price:i[n-1].price=t[e].price),localStorage.setItem("cart",JSON.stringify(i)),o?p():(l(),p())}),$(".show-good-info").on("click",function(){s($(this).attr("data-art"))})})}function s(t){var e="https://nit.tron.net.ua/api/product/"+t;$.getJSON(e,function(t){var e="";e+='<div id="id01" class="modal">',e+='<div class="modal-content animate">',e+='<div class="imgcontainer">',e+='<span class="close" title="Close Preview">&times;</span>',e+='<img class="avatar" src="'+t.image_url+'" alt="Goods image">',e+="</div>",e+='<div class="container">',e+='<p class="preview-goods-name">'+t.name+"</p>",e+='<span style="font-style: italic">Description:</span>',e+='<p class="preview-description">'+t.description+"</p>",e+="</div>",e+='<div class="container preview-price-container">',e+='<p style="text-transform: uppercase; margin: 5px 10px;">Price</p>',null===t.special_price?e+='<p class="price">'+t.price+" грн. </p>":(e+='<p class="old-price">'+t.price+" грн. </p>",e+='<p class="new-price">'+t.special_price+" грн. </p>"),e+="</div>",e+='<div class="container button-container" style="background-color:#f1f1f1">',e+='<button class="cancel-prev-btn" type="button">Cancel</button>',e+='<button class="add-button" data-art="'+t.id+'"> Add to cart </button>',e+="</div>",e+="</div>",e+="</div>",$("#preview-frame").html(e),document.getElementById("id01").style.display="block",$(".cancel-prev-btn").on("click",function(){document.getElementById("id01").style.display="none"}),$(".close").on("click",function(){document.getElementById("id01").style.display="none"});var n=document.getElementById("id01");window.onclick=function(t){t.target==n&&(n.style.display="none")},$(".add-button").on("click",function(){var e=$(this).attr("data-art");null!=i[e]?i[e].quantity++:(i[e]={},i[e].name=t.name,i[e].quantity=1,null!=t.special_price?i[e].price=t.special_price:i[e].price=t.price),localStorage.setItem("cart",JSON.stringify(i)),o?p():($("#dropdown").addClass("drop"),$(".dd").addClass("dd-active"),o=!0,p()),n.style.display="none",l()})})}function l(){p(),document.getElementById("mySidebar").style.width="317px",document.getElementById("header").style.marginRight="317px",o=!0}function d(){document.getElementById("mySidebar").style.width="0",document.getElementById("header").style.marginRight="0",o=!1}function p(){if(function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return JSON.stringify(t)===JSON.stringify({})}(i)){e="<p>Cart is empty</p>";$(".cart-content").html(e)}else{var t=0,e="";for(var n in i)e+='<div class="cart-items">',e+='<img class="cross-img" src="img/cross.png" data-art = "'+n+'" >',e+='<div class="cart-name">',e+='<span class="show-good-info" data-art = "'+n+'">'+i[n].name+"</span></div>",e+='<div class="cart-item-quantity">',e+='<img class="operations-img plus" src="img/plus.png"  data-art="'+n+'">',e+="<span>"+i[n].quantity+"</span>",e+='<img class="operations-img minus" src="img/minus.png" data-art="'+n+'">',e+="</div>",t+=i[n].quantity*parseFloat(i[n].price),e+="</div>";e+='<div class="cart-item-cost-buy">',e+='<span class="cart-item-cost">Total: '+t+" UAH</span>",e+='<button class="cart-btn">Order</button>',e+="</div>",$(".cart-content").html(e),$(".cart-btn").on("click",function(){d(),function(t){var e="";for(var n in e+='<div id="id01" class="modal">',e+='<div class="modal-content animate">',e+='<span class="close" title="Close Preview">&times;</span>',e+='<p class="order-title"">Your order</p>',e+='<div class="container bordered">',i)e+='<p class="order-item">'+i[n].name+" ("+i[n].quantity+")</p>";e+="</div>",e+='<p class="total-price">Total: '+t+" UAH</p>",e+='<div style="margin-bottom:10px;background-color: #7a7a7a; border: 3px solid #000;">',e+='<form name="FIHORShop_ORDER" action="" method="post">',e+="<p>Full name</p>",e+='<input name="name" id="nl" type="text"  placeholder="Your name" required>',e+="<p>Phone number</p>",e+='<input name="phone" id="p1" placeholder="Your phone number" type="tel" required>',e+="<p>E-mail</p>",e+='<input name="email" id="e1" type="email" placeholder="Your e-mail" required>',e+="</form>",e+="</div>",e+='<button class="cancel-prev-btn" type="button" style="margin-right: 30px">Cancel</button>',e+='<button class="send-button" id="send">Order</button>',e+="</div>",e+="</div>",$("#preview-frame").html(e),document.getElementById("id01").style.display="block",$(".cancel-prev-btn").on("click",function(){document.getElementById("id01").style.display="none"}),$(".close").on("click",function(){document.getElementById("id01").style.display="none"}),$(".send-button").on("click",function(){var t,e=new FormData(document.forms.FIHORShop_ORDER);for(var a in console.log("Ordered:"),console.log(i),i)t=parseInt(a)+1,e.append("products["+t+"]",i[n].quantity);e.append("token","BP_2UiDNH4wAmOlxM5Sd");var r=new XMLHttpRequest;r.open("POST","https://nit.tron.net.ua/api/order/add"),r.onreadystatechange=function(){if(4===r.readyState&&200===r.status)if(r.responseText.indexOf("error")>0)alert("There's some issues with your order. Please check data of your input");else{for(var t in i)delete i[t];$("#preview-frame").html("<p>Ordered succesfully!!!</p>"),localStorage.setItem("cart",JSON.stringify(i))}},r.send(e)})}(t)}),$("span.show-good-info").on("click",function(){var t=$(this).attr("data-art");d(),s(t)}),$(".minus").on("click",function(){var t=$(this).attr("data-art");i[t].quantity>1?i[t].quantity--:i[t].quantity>0&&delete i[t],localStorage.setItem("cart",JSON.stringify(i)),p()}),$(".plus").on("click",function(){var t=$(this).attr("data-art");i[t].quantity++,localStorage.setItem("cart",JSON.stringify(i)),p()}),$(".cross-img").on("click",function(){var t=$(this).attr("data-art");i[t].quantity=0,delete i[t],p(),localStorage.setItem("cart",JSON.stringify(i))})}}$("document").ready(function(){$.getJSON("https://nit.tron.net.ua/api/category/list",function(t){var e,n="";for(var i in n+='<li class="category-item current" data-id="1" title="All goods">All devices</li>',r[1]="All devices",a=1,$("#goods-content-header").html(r[a]),t)e=t[i].id,n+='<li class="category-item" data-id="'+e+'">'+t[i].name+"</li>",r[e]=t[i].description;console.log(r),$("#categories-list ul").html(n),$("li.category-item").on("click",function(){var t=$(this).attr("data-id");a!==t&&(c(t),$("#goods-content-header").html(r[t]),$(".current").removeClass("current"),$(this).addClass("current"),a=t)})}),c(1),null!=localStorage.getItem("cart")&&(i=JSON.parse(localStorage.getItem("cart"))),console.log(i),$(".openbtn").on("click",function(){l()}),$(".closebtn").on("click",function(){d()})})},function(t,e,n){}]);