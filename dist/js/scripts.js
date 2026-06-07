const modules_flsModules = {};

//Слайдер каталог главная
if (document.querySelector('.cards-slider')) {
    const swiperCatalog = new Swiper('.cards-slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 800,
        breakpoints: {
            768: { spaceBetween: 20 }
        }
    });

}

// Поиск
const searchContainer = document.querySelector('.header-search');
if (searchContainer) {
    const searchButton = document.querySelector('.header-search__button');
    const searchClose = document.querySelector('.header-search__close');
    const searchContent = document.querySelector('.header-search__content');

    function openSearch() {
        if (document.documentElement.classList.contains('menu-open')) {
            document.documentElement.classList.remove('menu-open');
            const navbarCollapse = document.querySelector('#navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
        document.documentElement.classList.add('search-open');
    }

    function closeSearch() {
        document.documentElement.classList.remove('search-open');
    }

    if (searchButton) {
        searchButton.addEventListener('click', function (e) {
            e.stopPropagation();
            openSearch();
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeSearch();
        });
    }

    document.addEventListener('click', function (e) {
        if (document.documentElement.classList.contains('search-open')) {
            if (!searchContent.contains(e.target) && !searchButton.contains(e.target)) {
                closeSearch();
            }
        }
    });

    if (searchContent) {
        searchContent.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
}

// Бургер меню
const toggler = document.querySelector('.navbar-toggler');
if (toggler) {
    toggler.addEventListener('click', function () {
        if (document.documentElement.classList.contains('search-open')) {
            document.documentElement.classList.remove('search-open');
        }
        document.documentElement.classList.toggle('menu-open');
    });
}

//Меню десктоп
const navLinks = document.querySelectorAll('.nav-link-click');
const navLinks2 = document.querySelectorAll('.nav-link-click2');
const navItems = document.querySelectorAll('.nav-item');
if (navLinks.length || navLinks2.length) {
    function isDesktop() {
        return window.innerWidth >= 993;
    }

    function closeAllMenus() {
        document.documentElement.classList.remove('menu-open-nav', 'menu-open-nav2');
        navItems.forEach(item => {
            item.classList.remove('nav-item-active', 'nav-item-active2');
        });
        document.querySelectorAll('.dropdown2').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    function openMenu(navItem) {
        if (!isDesktop()) return;
        closeAllMenus();
        document.documentElement.classList.add('menu-open-nav');
        navItem.classList.add('nav-item-active');
    }

    function openDropdown2(clickElement) {
        if (!isDesktop()) return;

        const dataId = clickElement.getAttribute('data-id');
        if (!dataId) return;

        const dropdown2 = document.querySelector(`.dropdown2[data-id="${dataId}"]`);
        const parentNavItem = clickElement.closest('.nav-item');

        if (!dropdown2 || !parentNavItem) return;

        closeAllMenus();

        document.documentElement.classList.add('menu-open-nav2');
        parentNavItem.classList.add('nav-item-active2');
        dropdown2.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!isDesktop()) return;
            e.stopPropagation();
            const parentNavItem = this.closest('.nav-item');

            if (parentNavItem.classList.contains('nav-item-active')) {
                closeAllMenus();
            } else {
                openMenu(parentNavItem);
            }
        });
    });

    navLinks2.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!isDesktop()) return;
            e.preventDefault();
            e.stopPropagation();
            openDropdown2(this);
        });
    });

    document.addEventListener('click', function (e) {
        if (!isDesktop()) return;

        const isClickInsideNavItem = e.target.closest('.nav-item');
        const isClickInsideDropdown2 = e.target.closest('.dropdown2');
        const isClickInsideFirstDropdown = e.target.closest('.nav-item__dropdown:not(.dropdown2)');

        const isClickOnNavLink2 = e.target.closest('.nav-link-click2');

        if (isClickOnNavLink2) return;

        if (document.documentElement.classList.contains('menu-open-nav2')) {
            if (!isClickInsideDropdown2 && !isClickOnNavLink2) {
                closeAllMenus();
            }
        }
        else if (document.documentElement.classList.contains('menu-open-nav')) {
            const isClickInsideDropdownLi = e.target.closest('.nav-item__dropdown li');
            const isClickInsideNavLink = e.target.closest('.nav-link-click');

            if (!isClickInsideDropdownLi && !isClickInsideNavLink) {
                closeAllMenus();
            }
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            closeAllMenus();
        }, 250);
    });
}

//Меню мобильный
document.addEventListener('DOMContentLoaded', function () {
    const campaignLink = document.querySelector('.accordion-link-click');
    const dropdown = document.querySelector('.accordion-dropdown');
    const accordion = document.querySelector('.accordion');

    if (campaignLink && dropdown && accordion) {
        // Клик по ссылке Campaign
        campaignLink.addEventListener('click', function (e) {
            e.preventDefault();

            // Добавляем active дропдауну и hide аккордеону
            dropdown.classList.add('active');
            accordion.classList.add('hide');
        });

        // Закрытие при клике вне дропдауна И на фоне дропдауна (кроме title и li)
        document.addEventListener('click', function (e) {
            // Проверяем, был ли клик на nav-item__title или на li внутри dropdown
            const isOnTitle = e.target.closest('.nav-item__title');
            const isOnLi = e.target.closest('.accordion-dropdown li');

            // Если клик на title или на li - не закрываем
            if (isOnTitle || isOnLi) {
                return;
            }

            // Проверяем, был ли клик на фоне дропдауна (на самом dropdown, но не на его содержимом)
            const isOnDropdownBackground = dropdown === e.target || dropdown.contains(e.target) && !isOnTitle && !isOnLi;

            // Если клик на фоне дропдауна ИЛИ клик вне дропдауна и не на ссылке Campaign
            if (isOnDropdownBackground || (!dropdown.contains(e.target) && e.target !== campaignLink && !campaignLink.contains(e.target))) {
                dropdown.classList.remove('active');
                accordion.classList.remove('hide');
            }
        });
    }
});

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
    function checkScroll() {
        if (window.scrollY > 0) {
            header.classList.add('_header-scroll');
        } else {
            header.classList.remove('_header-scroll');
        }
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll);
}