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