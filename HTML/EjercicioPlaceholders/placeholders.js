function download1(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => modifyList(data));

}

function modifyList(data){
    const titleList = document.getElementById('titleList');
    titleList.innerHTML = '';


    data.slice(0,10).forEach(todo=> {
        const li = document.createElement('li');
        li.textContent = todo.title;
        titleList.appendChild(li);
    });


}