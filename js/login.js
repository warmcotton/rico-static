const rest = "http://"+location.hostname;
const loginRouter = "/login";

$(document).ready(function() {
    $("#loginButton").on("click", function() {
        const email = $('#email').val();
        const password = $('#password').val();

        if (email === "" || password === "") alert("email, password 확인");
        else submitLogin(rest+loginRouter, {email:email, password:password}); 
    })
});

function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload); 
}

//쿠키 저장
// expiredays 는 일자 정수 - 365년 1년 쿠키
function setCookie(key, value, expiredays) {
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + expiredays + ";";
}

function submitLogin(path, params) {
    $.ajax({
        type: 'POST',
        url: path,
        contentType: 'application/json',
        data: JSON.stringify(params), 
        success: function(data, status, xhr) {
            const accessToken = xhr.getResponseHeader('accessToken');
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                location.href=location.search === "" ? "/views/index.html" : location.search.replace('?path=','')
            } else {
                alert("accessToken null")
            }
            
        },
        error: function(xhr, status, error) {
            alert("error : "+xhr.status+"  "+xhr.responseText );
        }
    });
}
