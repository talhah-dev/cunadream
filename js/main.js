document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderChars = document.querySelectorAll('.loader-char');

    if (loader && loaderChars.length) {
        document.body.style.overflow = 'hidden';

        const charDelay = 120;
        const startDelay = 400;
        const totalLetterTime = startDelay + (loaderChars.length * charDelay) + 400;

        loaderChars.forEach((char, i) => {
            setTimeout(() => {
                char.classList.add('fade-out');
            }, startDelay + (i * charDelay));
        });

        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                document.body.style.overflow = '';
                loader.style.display = 'none';
            }, 600);
        }, totalLetterTime);
    }

    const lenis = new Lenis({
        autoRaf: true,
    });
    
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic'
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuInner = document.getElementById('mobile-menu-inner');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');

    function openMobileMenu() {
        mobileMenu.classList.remove('invisible', 'opacity-0');
        mobileMenuInner.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('opacity-0');
        mobileMenuInner.classList.add('translate-x-full');
        setTimeout(() => {
            mobileMenu.classList.add('invisible');
        }, 300);
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn && mobileMenu && mobileMenuCloseBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
        const mobileLinks = mobileMenu.querySelectorAll('a:not(.lang-option)');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    const langContainers = document.querySelectorAll('.lang-dropdown-container');
    
    langContainers.forEach(container => {
        const btn = container.querySelector('.lang-btn');
        const dropdown = container.querySelector('.lang-dropdown');
        const chevron = container.querySelector('.lang-chevron');
        const options = container.querySelectorAll('.lang-option');
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            langContainers.forEach(other => {
                if (other !== container) {
                    closeDropdown(other);
                }
            });
            const isOpen = !dropdown.classList.contains('invisible');
            if (isOpen) {
                closeDropdown(container);
            } else {
                openDropdown(container);
            }
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = option.getAttribute('data-lang');
                const newLangFull = option.getAttribute('data-full');
                updateAllLanguages(newLang, newLangFull);
                closeDropdown(container);
            });
        });
    });

    document.addEventListener('click', () => {
        langContainers.forEach(container => closeDropdown(container));
    });

    function openDropdown(container) {
        const dropdown = container.querySelector('.lang-dropdown');
        const chevron = container.querySelector('.lang-chevron');
        dropdown.classList.remove('invisible', 'opacity-0', 'translate-y-2');
        chevron.classList.add('rotate-180');
    }

    function closeDropdown(container) {
        const dropdown = container.querySelector('.lang-dropdown');
        const chevron = container.querySelector('.lang-chevron');
        dropdown.classList.add('opacity-0', 'translate-y-2');
        chevron.classList.remove('rotate-180');
        setTimeout(() => {
            dropdown.classList.add('invisible');
        }, 300);
    }

    function updateAllLanguages(shortLang, fullLang) {
        document.querySelectorAll('.current-lang-text').forEach(el => {
            el.textContent = shortLang;
        });
        document.querySelectorAll('.current-lang-text-full').forEach(el => {
            el.textContent = fullLang;
        });
    }
});
