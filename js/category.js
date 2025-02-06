const rest = "http://"+location.hostname;
const categoryRouter = "/items/category";

$(document).ready(function() {
    getPageItems(rest+categoryRouter+parseUrl());
    getCategory(rest+"/category");

    const {category, page, size, sort} = getQuery();
    changeBox(size, sort);

    $(".num-box").on("change", function() {
        const size = $(this).val();

        const query = "?category="+category+"&page="+
        0+"&size="+size+"&sort="+sort;
        location.href = location.origin+categoryRouter+query;
    })

    $(".sort-box").on("change", function() {
        const sort = $(this).val();

        const query = "?category="+category+"&page="+
        0+"&size="+size+"&sort="+sort;
        location.href = location.origin+categoryRouter+query;
    })
});

function getPageItems(path, method='GET') {
    $.ajax({
        type : method,
        url : path,
        contentType:'application/json',
        success : function(data, status, xhr) {
            printItems(data);
            changePage(data);
        },
        error : function(xhr, status, error) {
            alert("error : "+xhr.status+"  "+xhr.responseText );
        }
    })
}

function getCategory(path, method='GET') {
    $.ajax({
        type : method,
        url : path,
        contentType:'application/json',
        success : function(data, status, xhr) {
            changeCategory(data);
        },
        error : function(xhr, status, error) {
            alert("error : "+xhr.status+"  "+xhr.responseText);
        }
    })
}

function parseUrl() {
    let url = location.href;
    return url.substring(url.indexOf("category")).replace('category','');
}

function printItems(result) {
    result.content.forEach(res => {
        create($("#product-wrapper"), res);
    });
}

function create(jq, res) {
    let singleProduct = 
    `<div class="col-lg-4 col-md-6">
        <div class="single-product">
            <a href="/item?itemid=`+res.id+`">
                <img class="img-fluid" src=`+'"'+rest+res.itemImgDtoList[0].imgUrl+'"'+`alt="">
            </a>
            <div class="product-details">
                <a href="/item?itemid=`+res.id+`">
                    <h6>`+res.name+`</h6>
                </a>
                <div class="price">
                    <h6> `+res.price+` 원</h6>
                    <h6 class="l-through">`+res.user+`</h6>
                </div>
            </div>
        </div>
    </div>`
    jq.append(singleProduct);
}

function changeCategory(res) {
    const { RUNNING = 0, SLIPPERS = 0, LOAFERS = 0, SNEAKERS = 0,
        T_SHIRT = 0, CASUAL = 0, SHIRT = 0, SPORTSWEAR = 0, BLOUSE = 0, SWEATER = 0,
        PANTS = 0, JEANS = 0, SLACKS = 0, SWEATPANTS = 0,
        PADDING = 0, COAT = 0, CARDIGAN = 0, SUIT = 0, OUTERWEAR = 0,
        INNERWEAR = 0, SOCKS = 0, CAP = 0, BAG = 0, total = 0 } = res;

    const total_num = total;
    const total_shoes_num = RUNNING+SLIPPERS+LOAFERS+SNEAKERS;
    const total_top_num = T_SHIRT+CASUAL+SHIRT+BLOUSE+SWEATER;
    const total_pants_num = PANTS+JEANS+SLACKS+SWEATPANTS;
    const total_outer_num = PADDING+COAT+CARDIGAN+SUIT+OUTERWEAR;
    const total_sportswear_num = SPORTSWEAR;
    const total_cap_num = CAP;
    const total_innerwerar_num = INNERWEAR+SOCKS;
    const total_bag_num = BAG;

    const runningTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=RUNNING"+`">런닝<span class="number">` + "(" + RUNNING + ")" + `</span></a></li>`;
    const slippersTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SLIPPERS"+`">슬리퍼<span class="number">` + "(" + SLIPPERS + ")" + `</span></a></li>`;
    const loafersTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=LOAFERS"+`">로퍼<span class="number">` + "(" + LOAFERS + ")" + `</span></a></li>`;
    const sneakersTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SNEAKERS"+`">스니커즈<span class="number">` + "(" + SNEAKERS + ")" + `</span></a></li>`;
    
    const tShirtTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=T_SHIRT"+`">티셔츠<span class="number">` + "(" + T_SHIRT + ")" + `</span></a></li>`;
    const casualTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=CASUAL"+`">캐주얼<span class="number">` + "(" + CASUAL + ")" + `</span></a></li>`;
    const shirtTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SHIRT"+`">셔츠<span class="number">` + "(" + SHIRT + ")" + `</span></a></li>`;
    const sportswearTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SPORTSWEAR"+`">스포츠웨어<span class="number">` + "(" + SPORTSWEAR + ")" + `</span></a></li>`;
    const blouseTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=BLOUSE"+`">블라우스<span class="number">` + "(" + BLOUSE + ")" + `</span></a></li>`;
    const sweaterTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SWEATER"+`">스웨터<span class="number">` + "(" + SWEATER + ")" + `</span></a></li>`;
    
    const pantsTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=PANTS"+`">팬츠<span class="number">` + "(" + PANTS + ")" + `</span></a></li>`;
    const jeansTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=JEANS"+`">진<span class="number">` + "(" + JEANS + ")" + `</span></a></li>`;
    const slacksTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SLACKS"+`">슬랙스<span class="number">` + "(" + SLACKS + ")" + `</span></a></li>`;
    const sweatpantsTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SWEATPANTS"+`">스웨트팬츠<span class="number">` + "(" + SWEATPANTS + ")" + `</span></a></li>`;
    
    const paddingTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=PADDING"+`">패딩<span class="number">` + "(" + PADDING + ")" + `</span></a></li>`;
    const coatTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=COAT"+`">코트<span class="number">` + "(" + COAT + ")" + `</span></a></li>`;
    const cardiganTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=CARDIGAN"+`">가디건<span class="number">` + "(" + CARDIGAN + ")" + `</span></a></li>`;
    const suitTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SUIT"+`">정장<span class="number">` + "(" + SUIT + ")" + `</span></a></li>`;
    const outerwearTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=OUTERWEAR"+`">아우터<span class="number">` + "(" + OUTERWEAR + ")" + `</span></a></li>`;

    const innerwearTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=INNERWEAR"+`">이너웨어<span class="number">` + "(" + INNERWEAR + ")" + `</span></a></li>`;

    const socksTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=SOCKS"+`">양말<span class="number">` + "(" + SOCKS + ")" + `</span></a></li>`;

    const capTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=CAP"+`">모자<span class="number">` + "(" + CAP + ")" + `</span></a></li>`;

    const bagTag = `<li class="main-nav-list child"><a href="`+"/items/category?category=BAG"+`">가방<span class="number">` + "(" + BAG + ")" + `</span></a></li>`;

    $('#total_num').text("("+total_num+")");
    $('#total_shoes_num').text("("+total_shoes_num+")");
    $('#total_top_num').text("("+total_top_num+")")
    $('#total_pants_num').text("("+total_pants_num+")")
    $('#total_outer_num').text("("+total_outer_num+")")
    $('#total_sportswear_num').text("("+total_sportswear_num+")");
    $('#total_cap_num').text("("+total_cap_num+")")
    $('#total_innerwerar_num').text("("+total_innerwerar_num+")");
    $('#total_bag_num').text("("+total_bag_num+")")

    $('#shoes').append(runningTag);
    $('#shoes').append(slippersTag);
    $('#shoes').append(loafersTag);
    $('#shoes').append(sneakersTag);

    $('#top').append(tShirtTag);
    $('#top').append(casualTag);
    $('#top').append(shirtTag);
    $('#top').append(blouseTag);
    $('#top').append(sweaterTag);

    $('#pants').append(pantsTag);
    $('#pants').append(jeansTag);
    $('#pants').append(slacksTag);
    $('#pants').append(sweatpantsTag);

    $('#outer').append(paddingTag);
    $('#outer').append(coatTag);
    $('#outer').append(cardiganTag);
    $('#outer').append(suitTag);
    $('#outer').append(outerwearTag);

    $('#sportswear').append(sportswearTag);

    $('#cap').append(capTag);

    $('#innerwerar').append(innerwearTag);
    $('#innerwerar').append(socksTag);

    $('#bag').append(bagTag);

}

function changeBox(size, sort) {
    if (size.length===0) {
        $('.num-box').val("6").niceSelect('update');
    } else {
        $('.num-box').val(size).niceSelect('update');
    }

    if (sort.length===0) {
        $('.sort-box').val("createdAt,desc").niceSelect('update');
    } else {
        $('.sort-box').val(sort).niceSelect('update');
    }
    
}

function changePage(result) {
    const max = result.totalPages;
    const totalElements = result.totalElements;
    const totalPages = result.totalPages;
    const pageSize = result.size;
    const current = result.pageable.pageNumber;
    const elements = result.numberOfElements
    const offset = result.pageable.offset;
    const query = getQuery();

    if (offset != 0 ) {
        const path = updatePageurl(current-1, query);
        $('.pagination').append(`<a href="`+path+`" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>`);
    } 

    for(let p=0; p < totalPages; p++ ) {
        if (current-2 <= p && p <= current+2) {
            const path = updatePageurl(p, query);
            if(current === p) {
                $('.pagination').append(`<a href="`+path+`" class="active">`+(p+1)+`</a>`);
            } else {
                $('.pagination').append(`<a href="`+path+`" >`+(p+1)+`</a>`);
            }
        }
    }

    if (offset + pageSize < totalElements ) {
        const path = updatePageurl(current+1, query);
        $('.pagination').append(`<a href="`+path+`" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>`);
    }
}

function updatePageurl(page_, query) {
    const {category, page, size, sort} = query;
    const qp = "?category="+category+"&page="+page_+"&size="+size+"&sort="+sort;

    return location.origin+"/items/category"+qp;
}


function getQuery() {
    const parameters = {};
    let query = location.search;
    if (query.indexOf('?')!== -1) {
        query = query.replace('?','');
    }
    query.split('&')
    .forEach(res => parameters[res.split('=')[0]]=res.split('=')[1]);

    const category = parameters.category ?? "";
    const page = parameters.page ?? "";
    const size = parameters.size ?? "";
    const sort = parameters.sort ?? "";

    return {category, page, size, sort};
}