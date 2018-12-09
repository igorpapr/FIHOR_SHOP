import './scss/main.scss';

var cart = {};//stash
var goods = {};//all goods
var catDescr ={};//for #goods-content-title
var currentCategory;
var cartOpened = false;

$('document').ready(function () {
    loadCategories();
    loadGoodsFromCategory(0);
    checkCart();
    console.log(cart);
    $('.openbtn').on('click', function(){
        openCart();
    });
    $('.closebtn').on('click', function(){
        closeCart();
    });
});

function loadCategories() {
    //loading categories to the list of categories
    $.getJSON("https://nit.tron.net.ua/api/category/list",function (data) {
        var out = '';
        out+='<li class="category-item current" data-id="1" title="All goods">All devices</li>';
        catDescr[1] = 'All devices';
        currentCategory = 1;
        $('#goods-content-header').html(catDescr[currentCategory]);
        var catID;
        for (var key in data){
            catID = data[key]['id'];
            out+='<li class="category-item" data-id="'+catID+'">' + data[key]['name'] + '</li>';
            catDescr[catID] = data[key]['description'];
        }
        console.log(catDescr);
        $('#categories-list ul').html(out);

        $('li.category-item').on('click', function(){
            var id = $(this).attr('data-id');//mb parse will be needed
            if(currentCategory!==id){
                loadGoodsFromCategory(id);////////////////////////////////////WMESTO APPEND - HTML
                $('#goods-content-header').html(catDescr[id]);
                $('.current').removeClass('current');
                $(this).addClass('current');
                currentCategory=id;
            }
        });
    });
}
function loadGoodsFromCategory(id) {
    var source;
    if (id == 0) {
        source = "https://nit.tron.net.ua/api/product/list";
    }
    else         source ='https://nit.tron.net.ua/api/product/list/category/'+id;

    $.getJSON(source,function (data) {
        goods = data;
        var out = '';
        for (var key in data){
            var goodsId = data[key]['id'];
            out+='<div class="goods-list">';
            var name = data[key]['name'];
            out+='<div class="goods-img-container">';
            out+='<img class="goods-img" src="'+data[key]['image_url']+'" alt="'+ name +'">';
            out+='</div>';
            out+='<span class="goods-name show-good-info" data-art="'+goodsId+'">'+ name +'</span>';
            var price = data[key]['price'];
            var sprice = data[key]['special_price'];
            if (sprice!=null){
                out+='<span class="old-price">'+ price +' грн'+ '</span>';
                out+='<span class="new-price">'+sprice +' грн'+'</span>';
            }
            else{
                out+='<span class="price">'+ price +' грн'+ '</span>';
            }
            out+='<button class="add-to-cart" data-id="'+ goodsId +'" data-obj="'+key+'">Add to cart</button>';
            out+='</div>';
        }
        $('#goods-container').html(out);

        $('button.add-to-cart').on('click', function () {
            var obj = parseInt($(this).attr('data-obj'));
            var id = $(this).attr('data-id');

            if (cart[id-1]!=undefined){
                cart[id-1].quantity++;
            }
            else{
                cart[id-1]={};
                cart[id-1].name=data[obj]['name'];
                cart[id-1].quantity=1;
                if(data[obj]['special_price']!=null){
                    cart[id-1].price=data[obj]['special_price'];
                }else{
                    cart[id-1].price=data[obj]['price'];
                }
            }
            localStorage.setItem('cart',JSON.stringify(cart))
            if(!cartOpened){
                openCart();
                showMiniCart();
            }
            else{
                showMiniCart();
            }
        });
        $('.show-good-info').on('click', function(){
            var id = $(this).attr('data-art');
            showPreview(id);
        });
    });
}

function showPreview(id) {
    var link = 'https://nit.tron.net.ua/api/product/' + id;
    $.getJSON(link, function (data) {
        var out = '';

        out += '<div id="id01" class="modal">';
        out += '<div class="modal-content animate">';

        out += '<div class="imgcontainer">';
        out += '<span class="close" title="Close Preview">&times;</span>';
        out += '<img class="avatar" src="' + data['image_url'] + '" alt="Goods image">';
        out += '</div>';

        out += '<div class="container">';
        out += '<p class="preview-goods-name">' + data['name'] + '</p>';
        out += '<span style="font-style: italic">Description:</span>'
        out += '<p class="preview-description">' + data['description'] + '</p>';
        out += '</div>';

        out += '<div class="container preview-price-container">';
        out += '<p class="preview-price-header" style="">Price</p>';

        if (data['special_price'] === null) {
            out += '<p class="price">' + data['price'] + ' грн. </p>';
        }
        else {
            out += '<p class="old-price medium">' + data['price'] + ' грн. </p>';
            out += '<p class="new-price larger">' + data['special_price'] + ' грн. </p>';
        }
        out += '</div>';

        out += '<div class="container button-container" style="background-color:#f1f1f1">';
        out += '<button class="cancel-prev-btn" type="button">Cancel</button>';
        out += '<button class="add-button" data-art="' + data['id'] + '"> Add to cart </button>';
        out += '</div>';

        out += '</div>';
        out += '</div>';

        $('#preview-frame').html(out);

        document.getElementById('id01').style.display = 'block';

       $('.cancel-prev-btn').on('click', function () {
           document.getElementById("id01").style.display = "none";
       });

       $('.close').on('click', function () {
           document.getElementById("id01").style.display = "none";
       });

       // Get the modal
        var modal = document.getElementById('id01');

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        $('.add-button').on('click', function(){
            var id = $(this).attr('data-art');

            if(cart[id]!=undefined){
                cart[id].quantity++;
            }
            else{
                cart[id]={};
                cart[id].name = data['name'];
                cart[id].quantity=1;
                if(data['special_price']!=null){
                    cart[id].price=data['special_price'];
                }else{
                    cart[id].price=data['price'];
                }
            }
            localStorage.setItem('cart',JSON.stringify(cart));

            if(!cartOpened){
                $('#dropdown').addClass('drop');
                $('.dd').addClass('dd-active');
                cartOpened=true;
                showMiniCart();
            }
            else{
                showMiniCart();
            }
            modal.style.display = "none";
            openCart();
        });

    });
}

function openCart() {
    showMiniCart();
    document.getElementById("mySidebar").style.width = "317px";
    document.getElementById('header').style.marginRight = "317px";
    cartOpened = true;
}
function closeCart() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById('header').style.marginRight= "0";
    cartOpened = false;
}
function isEmpty(obj) {
    for(var i in obj) {
        if(obj.hasOwnProperty(i))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}
function showMiniCart(){
    //show cart
    if (!(isEmpty(cart))){
        var total = 0;
        var out = '';
        for (var x in cart) {
            out += '<div class="cart-items">';
            out += '<img class="cross-img" src="img/cross.png" data-art = "'+x+'" >';
            out += '<div class="cart-name">';
            out += '<span class="show-good-info" data-art = "'+x+'">' + cart[x].name + '</span></div>';
            out += '<div class="cart-item-quantity">';
            out += '<img class="operations-img plus" src="img/plus.png"  data-art="'+x+'">';
            out += '<span>' + cart[x].quantity + '</span>';
            out += '<img class="operations-img minus" src="img/minus.png" data-art="'+x+'">';
            out += '</div>';
            total += cart[x].quantity * parseFloat(cart[x].price);
            out += '</div>';
        }
        out += '<div class="cart-item-cost-buy">';
        out += '<span class="cart-item-cost">Total: '+ total +' UAH</span>';
        out += '<button class="cart-btn">Order</button>';
        out += '</div>';

        $('.cart-content').html(out);

        $('.cart-btn').on('click', function(){
            closeCart();
            showCheckoutForm(total);
        });

        $('span.show-good-info').on('click', function(){
            var id = $(this).attr('data-art');
            closeCart();
            showPreview(id);
        });
        $('.minus').on('click', function(){
            var id = $(this).attr('data-art');
            if(cart[id].quantity>1){
                cart[id].quantity--;
            }
            else if (cart[id].quantity > 0) delete cart[id];
            localStorage.setItem('cart',JSON.stringify(cart));
            showMiniCart();
        });
        $('.plus').on('click', function(){
            var id = $(this).attr('data-art');
            cart[id].quantity++;
            localStorage.setItem('cart',JSON.stringify(cart));
            showMiniCart();
        });
        $('.cross-img').on('click', function(){
            var id = $(this).attr('data-art');
            cart[id].quantity=0;
            delete cart[id];
            showMiniCart();
            localStorage.setItem('cart',JSON.stringify(cart));
        });

    }else{
        var out='<p>Cart is empty</p>';
        $('.cart-content').html(out);
    }
}

function showCheckoutForm(totalValue) {
        var out = '';

        out += '<div id="id01" class="modal">';
        out += '<div class="modal-content animate">';

        out += '<div class="imgcontainer">';
        out += '<span class="close" title="Close Preview">&times;</span>';
        out += '<p class="order-title"">Your order</p>';
        out += '</div>';

        out+='<div class="container bordered">';
        for(var key in cart){
            out+='<p class="order-item">'+cart[key].name+' ('+cart[key].quantity+')</p>';
        }
        out+='</div>';

        out+='<p class="total-price">Total: ' + totalValue + ' UAH</p>';
        out+='<div class="form-input-container">';

        out+='<form class="form-position" name="FIHORShop_ORDER" action="" method="post">';
        out+='<p class="form-user-name">Full name</p>';
        out+='<input name="name" class="inputs" placeholder="Your name" type="text" required>';
        out+='<p>Phone number</p>';
        out+='<input name="phone" class="inputs" placeholder="Your phone number" type="tel" required>';
        out+='<p>E-mail</p>';
        out+='<input name="email" class="inputs" placeholder="Your e-mail" type="email"  required>';
        out+='</form>';
        out+='</div>';

        out+='<div class="container order-last">';
        out +='<button class="cancel-prev-btn" type="button" ">Cancel</button>';
        out+='<button class="send-button" id="send">Submit</button>';

        out += '</div>';
        out += '</div>';
        out += '</div>';

        $('#preview-frame').html(out);

        document.getElementById('id01').style.display = 'block';
        $('.cancel-prev-btn').on('click', function () {
            document.getElementById("id01").style.display = "none";
        });
        $('.close').on('click', function () {
            document.getElementById("id01").style.display = "none";
        });

        $('.send-button').on('click', function(){
            var formData = new FormData(document.forms.FIHORShop_ORDER);
            console.log("Ordered:");
            console.log(cart);
            var myKey;
            for(var x in cart){
                myKey = parseInt(x)+1;
                formData.append("products["+myKey+"]",cart[key].quantity);
            }

            formData.append("token", "BP_2UiDNH4wAmOlxM5Sd");


            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://nit.tron.net.ua/api/order/add");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if(xhr.responseText.indexOf('error')>0){
                            alert("There's some issues with your order. Please check data of your input");
                        }
                        else{
                            for(var y in cart){
                                delete cart[y];
                            }


                            $('#preview-frame').html('<p>Ordered succesfully!!!</p>');
                            localStorage.setItem('cart',JSON.stringify(cart));
                        }
                    }
                }
            }
            xhr.send(formData);
        });
}

function checkCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}