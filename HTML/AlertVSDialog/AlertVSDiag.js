const button1 = document.getElementById('boton1');

button1.addEventListener('click', displayAlert);

function displayAlert() {
    alert('Has hecho clic en el botón!');
    document.body.style.backgroundColor = 'green';

    console.log('Button clicked');
}

const button2 = document.getElementById('boton2');
button2.addEventListener('click',displayDialog);

const dialog1 = document.getElementById('dialog1');


function displayDialog(){




}

