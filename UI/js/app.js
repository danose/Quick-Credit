let menu = document.querySelector('.hide-desktop .fa');
let nav = document.querySelector('#nav');
let exit = document.querySelector('#exit');


menu.addEventListener('click', (e)=>{
    nav.style.display= 'block';
    e.preventDefault();
});
exit.addEventListener('click', (e)=>{
    nav.style.display='none';
    e.preventDefault();
});


let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}



const darkMode=()=>{
    document.documentElement.setAttribute('data-theme', 'dark');
    trans();
    window.localStorage.setItem("mode", "dark")
}

const lightMode =()=>{
    document.documentElement.setAttribute('data-theme', 'light');
   trans();
    window.localStorage.setItem("mode", "light")
}

if(window.localStorage.getItem("mode")=="dark")
    darkMode();
else
    lightMode();


let checkbox = document.querySelector('input[name=theme]')   
checkbox.addEventListener('click', function(){

    if(this.checked){
        darkMode();
    } else{
        lightMode();
    }

});




let feedBack = document.querySelector('.register-btn');
feedBack.addEventListener('click', (e)=>{
    let confirm= document.querySelector('.confirm--registration');
    confirm.innerHTML= `<p>registration successful</p>`;
    confirm.style.display='block';

    setTimeout(()=>{
        confirm.style.display='none';
    },3000)

    e.preventDefault();

});