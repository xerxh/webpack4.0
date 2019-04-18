function number () {
    if(document.getElementById('number')){
        document.body.removeChild(document.getElementById('number'))
    }
    var div = document.createElement('div')
    div.innerHTML = 3100
    div.setAttribute('id', 'number')
    div.onclick = function () {
        div.innerHTML = parseInt(div.innerHTML, 10) + 1
    }
    document.body.appendChild(div)
}


export default number;