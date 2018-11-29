import './scss/main.scss';
//stash
var cart = {};
var goods = {};//all goods

$('document').ready(function () {
    loadCategories();
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadCategories() {
    //loading categories to the list of categories
    $.getJSON("https://nit.tron.net.ua/api/category/list",function (data) {
        var out = '';
        for (var key in data){
            out+='<li class="category-item" title="'+data[key]['description']+'">'+data[key]['name']+'</li>';
        }
        $('#categories-list ul').html(out);
        var curr = $('.category-item:contains("All")').addClass('current');
        var desr = curr.attr('title');
        $('#goods-content-header').html(desr);
    });
}
function loadGoods() {
    $.getJSON("https://nit.tron.net.ua/api/product/list",function (data) {
        goods = data;
        var out = '';
        for (var key in data){
            var goodsId = data[key]['id'];
            out+='<div class="goods-list">';
            var name = data[key]['name'];
            out+='<div class="goods-img-container">';
            out+='<img class="goods-img" src="'+data[key]['image_url']+'" alt="'+ name +'">';
            out+='</div>';
            out+='<span class="goods-name">'+ name +'</span>';
            var price = data[key]['price'];
            var sprice = data[key]['special_price'];
            if (sprice!=null){
                out+='<span class="special-price">'+ sprice + '</span>';
            }
            out+='<span class="price">'+price+'</span>';
            out+='<button class="add-to-cart" data-id="'+ goodsId +'">Add to cart</button>';
            out+='</div>';
        }
        $('#goods-container').append(out);
        showMiniCart();
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart() {
    var articul = $(this).attr('data-id');
    if (cart[articul]!=undefined){
        cart[articul]++;
    }
    else{
        cart[articul] = 1;
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    console.log(cart);
    showMiniCart();
}

function checkCart() {
    //check if cart is in the local storage
    if (localStorage.getItem('cart')!=null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart(){
    //show cart

    var out = '';
    var total = 0;
        for (var x in cart){
            out += '<div class="cart-items">';
            out += '<img src="img/cross.png" class="cross-img">';
            out += '<div class="cart-name">';
            out += '<span>'+goods[x].name + '</span></div>';
            out += '<div class="cart-item-quantity">';
            out += '<img src="img/plus.png"  class="operations-img plus">';
            out += '<span>'+ cart[x]+'</span>';
            out += '<img src="img/minus.png" class="operations-img minus">';
            out += '</div>';
            total += cart[x] * goods[x]['price'];
            out+='</div>';
        }
    out += '<div class="cart-item-cost-buy">';
    out += '<span class="cart-item-cost">Total: '+ total +'</span>';
    out += '<button class="cart-btn">Order</button>';
    out += '</div>';
    $('.cart-content').html(out);
    
}
