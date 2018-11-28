import './scss/main.scss';

console.log('Hello!');
console.log(`The time is ${new Date()}`);

$('document').ready(function () {
    loadCategories();
    loadGoods();
})

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
        var out = '';
        for (var key in data){
            out+='<div class="goods-list">';
            var name = data[key]['name'];
            out+='<img class="goods-img" src="'+data[key]['image_url']+'" alt="'+ name +'">';
            out+='<span class="goods-name">'+ name +'</span>';
            var price = data[key]['price'];
            var sprice = data[key]['special_price'];
            if (sprice!=null){
                out+='<span style="text-decoration:line-through">'+sprice+'</span>';
            }
            out+='<span class="price">'+price+'</span>';
            out+='</div>';
        }
        $('#goods-content').append(out);
    });
}