// static/script.js



function changeButton() {
    var button = document.getElementById('myButton');
    if (button.innerHTML === '按我') {
        button.innerHTML = '已按下';
        button.style.backgroundColor = '#28a745'; // 改變背景顏色
    } else {
        button.innerHTML = '按我';
        button.style.backgroundColor = '#007bff'; // 恢復原始背景顏色
    }
}