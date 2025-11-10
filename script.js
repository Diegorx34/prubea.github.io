// Cargar Header
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header-placeholder', 'header.html');
    initializeScrollAnimations();
});

// Cargar externos HTML (solo header x ahora)
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (elementId === 'header-placeholder') {
                initializeNavigation();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}






// Navegacion Funciones
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Menu del Celular alternar
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Desplazamiento suave para todos los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Header scroll efecto
    window.addEventListener('scroll', handleHeaderScroll);
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        const scrolled = window.scrollY > 100;
        if (scrolled) {
            header.style.background = 'hsla(0, 0%, 7%, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'hsla(0, 0%, 7%, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
}






// Scroll de Animaciones
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card, .data-card, .feature-card, .article-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}






//  Funciones utiles
function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadPDF(articleTitle) {
    // Crear un enlace de descarga
    const link = document.createElement('a');

    // Definir la URL real del PDF según el título
    switch(articleTitle) {
    // Artículos
        case 'Articulo 1':
            link.href = 'PDFS/FORMATO-DE-REQUISITOS.pdf';
            break;
        case 'Articulo 2':
            link.href = 'pdfs/titulo2.pdf';
            break;
        case 'Articulo 3':
            link.href = 'pdfs/titulo3.pdf';
            break;
    // Documentos
        case 'Investigacion 1':
            link.href = 'pdfs/titulo4.pdf';
            break;
        case 'Investigacion 2':
            link.href = 'pdfs/titulo5.pdf';
            break;
        case 'Investigacion 3':
            link.href = 'pdfs/titulo6.pdf';
            break;
    // Manuales
        case 'Manual 1':
            link.href = 'pdfs/titulo6.pdf';
            break;
        case 'Manual 2':
            link.href = 'pdfs/titulo6.pdf';
            break;
        case 'Manual 3':
            link.href = 'pdfs/titulo6.pdf';
            break;
    // Recmendados
        case 'feria397_01_hidroponia_una_alternativa_para_cultivo_de_plantas':
            link.href = 'pdfs/feria397_01_hidroponia_una_alternativa_para_cultivo_de_plantas.pdf';
            break;
        case 'tesis_juarez_sifuentes':
            link.href = 'pdfs/tesis_juarez_sifuentes.pdf';
            break;
        case 'Maria del Sagrario Oyervides':
            link.href = 'pdfs/Maria del Sagrario Oyervides.pdf';
            break;
        default:
            console.log('PDF no encontrado');
            return;
    }

    link.download = `${articleTitle.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mostrar notificación
    showNotification(`Iniciando descarga: ${articleTitle}`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: hsl(262, 83%, 58%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 500;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}
