document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const heroSection = document.getElementById('hero');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Variables para controlar el scroll
    let lastScrollTop = 0;
    let isHeaderVisible = true;
    
    // Función para manejar el scroll
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Detectar si es dispositivo móvil
        const isMobile = window.innerWidth <= 768;
        
        // Si es móvil, no ocultar el header
        if (isMobile) {
            header.classList.remove('header-hidden');
            return;
        }
        
        // Obtener la posición del Hero Section
        const heroTop = heroSection.offsetTop;
        const heroBottom = heroTop + heroSection.offsetHeight;
        
        // Verificar si el Hero Section está visible
        const isHeroVisible = scrollTop + window.innerHeight > heroTop && scrollTop < heroBottom;
        
        // Ocultar el header si:
        // 1. El usuario hace scroll hacia abajo Y el Hero Section no está completamente visible
        // 2. O el Hero Section no está visible en absoluto
        if ((scrollTop > lastScrollTop && !isHeroVisible) || !isHeroVisible) {
            header.classList.add('header-hidden');
            isHeaderVisible = false;
        }
        
        // Mostrar el header solo si el Hero Section está visible
        if (isHeroVisible) {
            header.classList.remove('header-hidden');
            isHeaderVisible = true;
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Toggle del menú móvil
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Cambiar el ícono del botón
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Smooth scroll para enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animación de aparición para las tarjetas de servicios
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas de servicio
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Forzar una verificación inicial
    handleScroll();
});