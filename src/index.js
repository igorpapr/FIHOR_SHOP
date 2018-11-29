import './scss/main.scss';
//stash
var cart = {};
var goods = {};//all goods
var catDeskr ={};
var currentCategory;

$('document').ready(function () {
    loadCategories();
    loadGoodsFromCategory();
    checkCart();
    showMiniCart();
});

function loadCategories() {
    //loading categories to the list of categories
    $.getJSON("https://nit.tron.net.ua/api/category/list",function (data) {
        var out = '';
        out+='<li class="category-item" data-id="0" title="All goods">All devices</li>';
        catDeskr[0] = 'All devices';
        var catID;
        for (var key in data){
            catID = data[key]['id'];
            out+='<li class="category-item" data-id="'+catID+'">' + data[key]['name'] + '</li>';
            catDeskr[catID] = data[key]['description'];
        }
        console.log(catDeskr);
        $('#categories-list ul').html(out);

        // $('li.category-item').on('click', function(){
        //     var id = $(this).attr('data-id');
        //
        //     if(currentCategory!==id){
        //         loadGoodsFromCategory(id);
        //         $('#ghead').html(categoryDescription[id-1]);
        //         $('.load:eq('+(selectedCategory-1)++')').removeClass('highlight');
        //         $('.load:eq('+(id-1)+')').addClass('highlight');
        //         selectedCategory=id;
        //         currentCategory=id;
        //     }
        // });
        //
        //  = $('.category-item:contains("All")').addClass('current');
        //var desr = curr.attr('title');
        //$('#goods-content-header').html(desr);
    });
}
function loadGoodsFromCategory() {
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
                out+='<span class="old-price">'+ price + '</span>';
                out+='<span class="price">'+sprice+'</span>';
            }
            else{
                out+='<span class="price">'+ price + '</span>';
            }
            out+='<button class="add-to-cart" data-id="'+ goodsId +'">Add to cart</button>';
            out+='</div>';
        }
        $('#goods-container').append(out);
//        showMiniCart();
        $('button.add-to-cart').on('click', function () {
            var articul = $(this).attr('data-id');
            if (cart[articul]!=undefined){
                cart[articul]++;
            }
            else{
                cart[articul] = 1;
            }
            localStorage.setItem('cart',JSON.stringify(cart))
            showMiniCart();
        });
    });
}


function showMiniCart(){
    //show cart
    var out = '';
    var total = 0;
    if ($.isEmptyObject(cart)){
        out +='Cart is empty';
        $('.cart-content').html(out);
    }
    else{
        console.log("CART: ");
        console.log(cart);
        for (var x in cart) {
                console.log(x + '---' + cart[x]);
                out += '<div class="cart-items">';
                out += '<img src="img/cross.png" class="cross-img">';
                out += '<div class="cart-name">';
                out += '<span>' + goods[x].name + '</span></div>';
                out += '<div class="cart-item-quantity">';
                out += '<img src="img/plus.png"  data-art="' + x + '" class="operations-img plus">';
                out += '<span>' + cart[x] + '</span>';
                out += '<img src="img/minus.png" data-art="' + x + '" class="operations-img minus">';
                out += '</div>';
                total += cart[x] * goods[x]['price'];
                out += '</div>';
        }
        out += '<div class="cart-item-cost-buy">';
        out += '<span class="cart-item-cost">Total: '+ total +'</span>';
        out += '<button class="cart-btn">Order</button>';
        out += '</div>';
        $('.cart-content').html(out);
//        $('.plus').on('click',plusGoods());
//        $('.minus').on('click',minusGoods());
    }
}

function plusGoods() {
    var articul = $(this).attr('data-art');
        cart[articul]++;
    saveCartToLS(); //сохраняю корзину в localStorage
    showMiniCart();
}
function minusGoods() {
    var articul = $(this).attr('data-art');
    if (cart[articul] > 1) {
        cart[articul]--;
    }
    else {
        delete cart[articul];
    }
    saveCartToLS();//сохраняю корзину в localStorage
    showMiniCart();
}

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function deleteGoods() {
    var articul = $(this).attr('data-art');
    delete cart[articul];
    saveCartToLS();//сохраняю корзину в localStorage
    showMiniCart();
}
function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}