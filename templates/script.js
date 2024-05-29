// static/script.js

document.addEventListener('DOMContentLoaded', function() {
    // 首頁
    if (document.body.classList.contains('index-page')) {
        // 在這裡添加首頁的 JavaScript 代碼
        console.log('This is the index page');
    }

    // 關於頁面
    if (document.body.classList.contains('about-page')) {
        // 在這裡添加關於頁面的 JavaScript 代碼
        console.log('This is the about page');
    }

    // 獲取 "Submit" 按鈕元素
    var submitBtn = document.querySelector('input[type="submit"]');

    // 當按鈕被點擊時，顯示一個警告框
    submitBtn.addEventListener('click', function(event) {
        alert('Form submitted!');
    });
});
