const rest = "http://"+location.hostname;
const banner = "/items/banner";


$(document).ready(function() {
    getBannerProducts(rest+banner);
})

function getBannerProducts(path, method="get") {
    $.ajax({
        type: method,
        url: path,
        contentType: 'application/json',
        success: function(data, status, xhr) {
            printBanner(data);
        },
        error: function(xhr, status, error) {

        }
    })
}

function printBanner(data) {
    $(".col-lg-12").append(`<div class="active-banner-slider owl-carousel"></div>`);
    
    data.forEach(item => {
        $('.active-banner-slider').append(`
        <div class="row single-slide align-items-center d-flex">
            <div class="col-lg-5 col-md-6">
                <div class="banner-content">
                    <h1>`+item.user+` New <br>`+item.name+`</h1>
                    <p>`+ item.brief +`</p>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="banner-img">
                    <a href="/item?itemid=`+item.id+`"><img class="img-fluid" style="max-height: 600px" src="`+rest+item.itemImgDtoList[0].imgUrl+`" alt=""></a>
                </div>
            </div>
        </div>`);
    })

    $(".active-banner-slider").owlCarousel({
        items:1,
        autoplay:true,
        autoplayTimeout: 5000,
        loop:true,
        nav:false,
        dots:false,
    });
}