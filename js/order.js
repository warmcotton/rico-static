const rest = "http://"+location.hostname;
const path = location.search.replace('?orderid=','/');
const ordersRouter = "/order"
const cancelRoter = "/cancel"
$(document).ready(function() {
    getOrder(rest+ordersRouter+path);

    if($(document).find('#cancel')) {
        $(document).on('click', '#cancel', function() {
            cancel(rest+ordersRouter+path+cancelRoter);
        })
    }
})
function cancel(path, method="GET") {
    const token = localStorage.getItem("accessToken");
    if(token) {
        $.ajax({
            type: method,
            url: path,
            beforeSend : function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer "+token);
            },
            contentType: 'application/json',
            success: function(data, status, xhr) {
                location.href=location.href;
            },
            error: function(xhr, status, error) {
                alert("error : "+xhr.status+"  "+xhr.responseText );
            }
        })
    } else{
        alert("로그인이 필요합니다.");
        location.href="/views/login.html?path="+location.pathname+location.search;
    }
}

function getOrder(path, method="GET") {
    const token = localStorage.getItem("accessToken");
    if(token) {
        $.ajax({
            type: method,
            url: path,
            beforeSend : function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer "+token);
            },
            contentType: 'application/json',
            success: function(data, status, xhr) {
                printOrder(data);
            },
            error: function(xhr, status, error) {
                alert("error : "+xhr.status+"  "+xhr.responseText );
            }
        })
    } else{
        alert("로그인이 필요합니다.");
        location.href="/views/login.html?path="+location.pathname+location.search;
    }
}

function printOrder(order) {
    const parent = $('#order');
    const deliver_c = `<h3 class="title_confirmation">배송 완료되었습니다.</h3>`;
    const order_c = `<h3 class="title_confirmation">주문이 완료되었습니다. <a class="genric-btn default-border circle arrow" id="cancel" style="color: #000;">주문취소<span class="lnr lnr-arrow-right"></span></a></h3>`;
    const cancel = `<h3 class="title_confirmation">주문이 취소되었습니다.</h3>`;

    if (order.status === "CANCEL") {
        parent.append(cancel);
        return;
    }
    const order_info = `<div class="row order_d_inner"><div class="col-lg-4"><div class="details_item"><h4>주문 정보</h4> <ul class="list"><li><a href="#"><span>주문 ID</span>`+" : "+order.id+`</a></li><li><a href="#"><span>주문날짜</span>`+" : "+order.date+`</a></li><li><a href="#"><span>합계</span>`+" : "+order.price+" 원"+`</a></li><li><a href="#"><span>주문상태</span>`+" : "+order.status+`</a></li></ul></div></div></div>`;
    const table = `<div class="order_details_table"><h2>Order Details</h2><div class="table-responsive"><table class="table"></table></div></div>`;
    if(order.staus === "COMPLETE") {
        parent.append(deliver_c);
    } else {
        parent.append(order_c);
    }
    parent.append(order_info);
    parent.append(table);
    
    const thead = `<thead><tr><th scope="col">Product</th><th scope="col">Quantity</th><th scope="col">Total</th></tr></thead>`
    const tbody = `<tbody></tobody>`
    
    

    $('table').append(thead);
    $('table').append(tbody);
    printOrderItem(order.orderItemDtoList, $('tbody'));
    
}

function printOrderItem(orderItems, parent) {
    const tr = orderItems.map(orderItem => `<tr><td><p><a href="/item?itemid=`+orderItem.itemId+`">`+orderItem.itemName+`</a></p></td><td><h5>x `+orderItem.count+`</h5></td><td><p>`+orderItem.count*orderItem.price+` 원</p></td></tr>`).join('');
    const total = orderItems.map(orderItem => orderItem.count*orderItem.price).reduce((a,b) => a+b);
    const tr_total = `<tr><td><h4>Total</h4></td><td><h5></h5></td><td><p>`+total+ ` 원</p></td></tr>`
    
    parent.append(tr);
    parent.append(tr_total);
}