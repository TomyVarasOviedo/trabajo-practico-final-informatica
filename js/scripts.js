
let HistoriaLinks = document.querySelectorAll('.timeline-image')
let unidades = document.querySelectorAll('.unidades')
let unidadesVistas = []
let submit = document.getElementById('submitButton')
window.addEventListener('DOMContentLoaded', event => {
    
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    HistoriaLinks.forEach(Link => {
        Link.addEventListener('click', e=>{
            Swal.fire({
                title: Link.getAttribute('data-titulo'),
                html: Link.getAttribute('data-text'),
                imageUrl: e.target.getAttribute('src'),
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Custom image',
                })
        })
    });
    unidades.forEach(img=>{
        button = img.querySelector('button')
        button.addEventListener('click', (e)=>{
            text = img.querySelector('img').getAttribute('data-text')
            titulo = img.querySelector('img').getAttribute('data-titulo')
            Swal.fire({
                title: titulo,
                imageUrl: img.querySelector('img').getAttribute('src'),
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Custom image',
                text: text,
            })
        })
    })
    submit.addEventListener('click', ()=>{
        let envio = FormData(document.getElementById('contactForm'))
        fetch('https://trabajo-final-ub.000webhostapp.com/assets/mail/index.php',
            {method:"POST",
            body: envio})
        .then(res=>res.json())
        .then(respuesta=>{
            if (respuesta) {
                Swal.fire({
                    title: 'Mensaje Enviado',
                    icon:'success'
                })
            }
        })
    })
});