import './scss/main.scss';

console.log('Hello!');
console.log(`The time is ${new Date()}`);

$('document').ready(function () {
    loadCategories();
})

function loadCategories() {
    //loading categories to the list of categories
    var categoriesAPI = "https://nit.tron.net.ua/api/category/list";
    $.getJSON(categoriesAPI,function (data) {
        //console.log(data);
        var out = '';
        for (var key in data){
            out+='<li class="category-item" title="'+data[key]['description']+'">'+data[key]['name']+'</li>';
        }
        $('#categories-list ul').html(out);
    });
}