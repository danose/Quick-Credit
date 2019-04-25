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