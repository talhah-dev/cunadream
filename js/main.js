document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loader');
    const loaderContent = document.querySelector('.loader-content');

    if (loader) {
        if (!sessionStorage.getItem('loaderPlayed')) {
            document.body.style.overflow = 'hidden';
            sessionStorage.setItem('loaderPlayed', 'true');

            const textVisibleTime = 1200;   
            const fadeOutDuration = 500;   
            const wipeDuration = 800;      

            setTimeout(() => {
                if (loaderContent) {
                    loaderContent.classList.add('fade-out');
                }
            }, textVisibleTime);

            setTimeout(() => {
                loader.classList.add('loader-hidden');
            }, textVisibleTime + fadeOutDuration);

            setTimeout(() => {
                document.body.style.overflow = '';
                loader.style.display = 'none';
            }, textVisibleTime + fadeOutDuration + wipeDuration);
        } else {
            loader.style.display = 'none';
        }
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
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isOpen = content.classList.contains('grid-rows-[1fr]');
            
            faqBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('.faq-icon');
                    otherContent.classList.remove('grid-rows-[1fr]');
                    otherContent.classList.add('grid-rows-[0fr]');
                    otherIcon.classList.remove('rotate-45');
                }
            });

            if (isOpen) {
                content.classList.remove('grid-rows-[1fr]');
                content.classList.add('grid-rows-[0fr]');
                icon.classList.remove('rotate-45');
            } else {
                content.classList.remove('grid-rows-[0fr]');
                content.classList.add('grid-rows-[1fr]');
                icon.classList.add('rotate-45');
            }
        });
    });
    const modalHTML = `
        <div id="tally-modal" class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center lg:justify-end opacity-0 pointer-events-none transition-all duration-300">
            <div class="relative w-full h-full lg:h-[calc(100vh-2rem)] lg:my-4 lg:mr-4 bg-[#F7F3ED] shadow-2xl rounded-none lg:rounded-2xl flex flex-col transition-transform duration-300 translate-x-full lg:max-w-[600px] w-full overflow-hidden">
                <div class="flex items-center justify-between p-6 border-b border-charcoal/10 bg-[#F7F3ED] rounded-t-none lg:rounded-t-2xl sticky top-0 z-10">
                    <h3 class="font-serif text-2xl text-aubergine">Start a Conversation</h3>
                    <button id="close-tally-modal" class="p-2 -mr-2 text-charcoal hover:text-teal transition-colors cursor-pointer" aria-label="Close form">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="flex-1 overflow-hidden h-full">
                    <iframe src="https://tally.so/embed/81b85k?transparentBackground=1" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="Start a Conversation" class="w-full h-full"></iframe>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const tallyModal = document.getElementById('tally-modal');
    const closeTallyModal = document.getElementById('close-tally-modal');

    function openModal() {
        if (tallyModal) {
            tallyModal.classList.remove('opacity-0', 'pointer-events-none');
            const panel = tallyModal.querySelector('div');
            if (panel) {
                panel.classList.remove('translate-x-full');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (tallyModal) {
            tallyModal.classList.add('opacity-0', 'pointer-events-none');
            const panel = tallyModal.querySelector('div');
            if (panel) {
                panel.classList.add('translate-x-full');
            }
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('click', (e) => {
        const target = e.target.closest('a[href*="tally-open"], button[data-tally-open], a[href*="start-conversation"]');
        if (target) {
            e.preventDefault();
            openModal();
        }
    });

    if (closeTallyModal) {
        closeTallyModal.addEventListener('click', closeModal);
    }

    if (tallyModal) {
        tallyModal.addEventListener('click', (e) => {
            if (e.target === tallyModal) {
                closeModal();
            }
        });
    }
})
