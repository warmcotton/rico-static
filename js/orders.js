const rest = "http://"+location.hostname;
const ordersRouter = "/orders";

$(document).ready(function() {
    getOrders(rest+ordersRouter);
});

function getOrders(path, method='GET') {
    const token = localStorage.getItem("accessToken");
    $.ajax({
        type: method,
        url: path,
        beforeSend : function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer "+token);
        },
        contentType: 'application/json',
        success: function(data, status, xhr) {
            if(data.length >= 1) {
                printOrders(data);
                $('#order_n').remove();
            }   
        },
        error: function(xhr, status, error) {
            alert("error : "+xhr.status+"  "+xhr.responseText );
            if (xhr.responseText === "로그인이 필요합니다.") location.href="/views/login.html?path="+location.pathname+location.search;
        }
    });
}

function printOrders(data) {
    let count = 0;
    data.forEach(order => printOrder($('.progress-table'), order, count++))

}

function printOrder(parent, order, i) {
    const row = 
    `<div class="table-row">
        <div class="serial"><a href="/views/order.html?orderid=`+order.id+`">`+(i+1)+`</a></div>
        <div class="country">`+printImage(order.orderItemDtoList)+`</div>
        <div class="date">`+order.date+`</div>
        <div class="visit">`+order.price+" 원"+`</div>
        <div class="link"><a href="#">`+order.status+`</a></div>
    </div>`;
    parent.append(row);
}
function printImage(orderItem) {
    let imgtag = "";
    for (let i = 0; i<5; i++) {
        if(orderItem[i]) {
            let url;
            if(orderItem[i].itemImg.length===0) url="";
            else url = rest+orderItem[i].itemImg[0].imgUrl;
            imgtag += `<img src="`+url+`" alt=""></img>`;
        }
    }
    return imgtag;
}