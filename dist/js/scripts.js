const modules_flsModules = {};

//Слайдер каталог главная
if (document.querySelector('.cards-slider') && typeof Swiper !== 'undefined') {
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

// Корзина
const cartContainer = document.querySelector('.header-cart');
if (cartContainer) {
    const cartButton = document.querySelector('.header-cart__button');
    const cartClose = document.querySelector('.header-cart__close');
    const cartContent = document.querySelector('.header-cart__content');

    function openCart() {
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
        document.documentElement.classList.add('cart-open');
    }

    function closeCart() {
        document.documentElement.classList.remove('cart-open');
    }

    if (cartButton) {
        cartButton.addEventListener('click', function (e) {
            e.stopPropagation();
            openCart();
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeCart();
        });
    }

    document.addEventListener('click', function (e) {
        if (document.documentElement.classList.contains('cart-open')) {
            if (!cartContent.contains(e.target) && !cartButton.contains(e.target)) {
                closeCart();
            }
        }
    });

    if (cartContent) {
        cartContent.addEventListener('click', function (e) {
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
        if (document.documentElement.classList.contains('cart-open')) {
            document.documentElement.classList.remove('cart-open');
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

    function closeDropdown2Only() {
        document.documentElement.classList.remove('menu-open-nav2');
        navItems.forEach(item => {
            item.classList.remove('nav-item-active2');
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

        if (dropdown2.classList.contains('active')) {
            closeDropdown2Only();
        } else {
            const activeNavItem = document.querySelector('.nav-item-active');
            if (!activeNavItem) {
                const someNavItem = document.querySelector('.nav-item');
                if (someNavItem) {
                    openMenu(someNavItem);
                }
            }
            closeDropdown2Only();
            document.documentElement.classList.add('menu-open-nav2');
            parentNavItem.classList.add('nav-item-active2');
            dropdown2.classList.add('active');
        }
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

    document.querySelectorAll('.nav-item__dropdown:not(.dropdown2)').forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            if (!isDesktop()) return;

            const isClickOnInteractive = e.target.closest('li, a, button, ul') &&
                this.contains(e.target.closest('li, a, button, ul'));

            if (!isClickOnInteractive) {
                e.stopPropagation();
                closeAllMenus();
            } else {
                e.stopPropagation();
            }
        });
    });

    document.querySelectorAll('.dropdown2').forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            if (!isDesktop()) return;

            const isClickOnInteractive = e.target.closest('li, a, button, ul, .nav-item__title') &&
                this.contains(e.target.closest('li, a, button, ul, .nav-item__title'));

            if (!isClickOnInteractive) {
                e.stopPropagation();
                closeDropdown2Only();
            } else {
                e.stopPropagation();
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (!isDesktop()) return;

        const activeDropdown2 = document.querySelector('.dropdown2.active');

        if (activeDropdown2) {
            const isInsideDropdown = activeDropdown2.contains(e.target);
            const isOnCampaignLink = e.target.closest('.nav-link-click2');

            if (isInsideDropdown || isOnCampaignLink) {
                return;
            }

            closeDropdown2Only();
            return;
        }

        const activeNavItem = document.querySelector('.nav-item-active');
        if (activeNavItem && !document.documentElement.classList.contains('menu-open-nav2')) {
            const isInsideNavItem = activeNavItem.contains(e.target);
            const isOnNavLink = e.target.closest('.nav-link-click');

            if (!isInsideNavItem && !isOnNavLink) {
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
const campaignLink = document.querySelector('.accordion-link-click');
const dropdown = document.querySelector('.accordion-dropdown');
const accordion = document.querySelector('.accordion');
if (campaignLink && dropdown && accordion) {
    campaignLink.addEventListener('click', function (e) {
        e.preventDefault();

        dropdown.classList.add('active');
        accordion.classList.add('hide');
    });

    document.addEventListener('click', function (e) {
        const isOnTitle = e.target.closest('.nav-item__title');
        const isOnLi = e.target.closest('.accordion-dropdown li');

        if (isOnTitle || isOnLi) {
            return;
        }

        const isOnDropdownBackground = dropdown === e.target || dropdown.contains(e.target) && !isOnTitle && !isOnLi;

        if (isOnDropdownBackground || (!dropdown.contains(e.target) && e.target !== campaignLink && !campaignLink.contains(e.target))) {
            dropdown.classList.remove('active');
            accordion.classList.remove('hide');
        }
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

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
    document.body.addEventListener("focusin", function (e) {
        const targetElement = e.target;
        if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
            if (!targetElement.hasAttribute('data-no-focus-classes')) {
                targetElement.classList.add('_form-focus');
                targetElement.parentElement.classList.add('_form-focus');
            }
            formValidate.removeError(targetElement);
            targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
        }
    });
    document.body.addEventListener("focusout", function (e) {
        const targetElement = e.target;
        if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
            if (!targetElement.hasAttribute('data-no-focus-classes')) {
                targetElement.classList.remove('_form-focus');
                targetElement.parentElement.classList.remove('_form-focus');
            }
            if (targetElement.value.trim()) {
                targetElement.parentElement.classList.add('filled');
            } else {
                targetElement.parentElement.classList.remove('filled');
            }
            targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
        }
    });
    if (options.viewPass) {
        document.addEventListener("click", function (e) {
            const targetElement = e.target;
            if (targetElement.closest('.form__viewpass')) {
                const viewpassBlock = targetElement.closest('.form__viewpass');
                const input = viewpassBlock.closest('.form__input').querySelector('input');

                if (input) {
                    const isActive = viewpassBlock.classList.contains('_viewpass-active');
                    input.setAttribute("type", isActive ? "password" : "text");
                    viewpassBlock.classList.toggle('_viewpass-active');
                } else {
                    console.error('Input не найден!');
                }
            }
        });
    }
    if (options.autoHeight) {
        const textareas = document.querySelectorAll('textarea[data-autoheight]');
        if (textareas.length) {
            textareas.forEach(textarea => {
                const startHeight = textarea.hasAttribute('data-autoheight-min') ?
                    Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
                const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
                    Number(textarea.dataset.autoheightMax) : Infinity;
                setHeight(textarea, Math.min(startHeight, maxHeight))
                textarea.addEventListener('input', () => {
                    if (textarea.scrollHeight > startHeight) {
                        textarea.style.height = `auto`;
                        setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                    }
                });
            });
            function setHeight(textarea, height) {
                textarea.style.height = `${height}px`;
            }
        }
    }
}
formFieldsInit({
    viewPass: true,
    autoHeight: false
});
let formValidate = {
    getErrors(form) {
        let error = 0;
        let formRequiredItems = form.querySelectorAll('*[data-required]');
        if (formRequiredItems.length) {
            formRequiredItems.forEach(formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
                    error += this.validateInput(formRequiredItem);
                }
            });
        }
        return error;
    },
    validateInput(formRequiredItem) {
        let error = 0;

        if (formRequiredItem.dataset.required === "email") {
            formRequiredItem.value = formRequiredItem.value.replace(" ", "");
            if (this.emailTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
            }
        } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
            this.addError(formRequiredItem);
            this.removeSuccess(formRequiredItem);
            error++;
        } else if (formRequiredItem.dataset.validate === "password-confirm") {
            const passwordInput = document.getElementById('password');
            if (!passwordInput) return error;

            if (formRequiredItem.value !== passwordInput.value) {
                this.addError(formRequiredItem);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
            }
        } else {
            if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
            }
        }

        return error;
    },
    addError(formRequiredItem) {
        formRequiredItem.classList.add('_form-error');
        formRequiredItem.parentElement.classList.add('_form-error');
        let inputError = formRequiredItem.parentElement.querySelector('.form__error');
        if (inputError) formRequiredItem.parentElement.removeChild(inputError);
        if (formRequiredItem.dataset.error) {
            formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        }
        formRequiredItem.parentElement.classList.remove('filled');
    },
    removeError(formRequiredItem) {
        formRequiredItem.classList.remove('_form-error');
        formRequiredItem.parentElement.classList.remove('_form-error');
        if (formRequiredItem.parentElement.querySelector('.form__error')) {
            formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
        }
    },
    addSuccess(formRequiredItem) {
        formRequiredItem.classList.add('_form-success');
        formRequiredItem.parentElement.classList.add('_form-success');
        if (formRequiredItem.value.trim()) {
            formRequiredItem.parentElement.classList.add('filled');
        }
    },
    removeSuccess(formRequiredItem) {
        formRequiredItem.classList.remove('_form-success');
        formRequiredItem.parentElement.classList.remove('_form-success');
        formRequiredItem.parentElement.classList.remove('filled');
    },
    formClean(form) {
        form.reset();
        setTimeout(() => {
            let inputs = form.querySelectorAll('input,textarea');
            for (let index = 0; index < inputs.length; index++) {
                const el = inputs[index];
                el.parentElement.classList.remove('_form-focus');
                el.classList.remove('_form-focus');

                el.classList.remove('_form-success');
                el.parentElement.classList.remove('_form-success');

                el.parentElement.classList.remove('filled');

                formValidate.removeError(el);

                if (el.classList.contains('telephone') && el.clearFilled) {
                    el.clearFilled();
                }
            }

            let checkboxes = form.querySelectorAll('.checkbox__input');
            if (checkboxes.length > 0) {
                for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                    checkbox.classList.remove('_form-success');
                    checkbox.closest('.checkbox')?.classList.remove('_form-success');
                }
            }

            if (modules_flsModules.select) {
                let selects = form.querySelectorAll('div.select');
                if (selects.length) {
                    for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector('select');
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }
        }, 0);
    },
    emailTest(formRequiredItem) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
    }
};
function formSubmit() {
    const forms = document.forms;
    if (forms.length) {
        for (const form of forms) {
            form.addEventListener('submit', function (e) {
                const form = e.target;
                formSubmitAction(form, e);
            });
            form.addEventListener('reset', function (e) {
                const form = e.target;
                formValidate.formClean(form);
            });
        }
    }
    async function formSubmitAction(form, e) {
        const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
        if (error === 0) {
            const ajax = form.hasAttribute('data-ajax');
            if (ajax) {
                e.preventDefault();
                const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
                const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
                const formData = new FormData(form);

                form.classList.add('_sending');
                const response = await fetch(formAction, {
                    method: formMethod,
                    body: formData
                });
                if (response.ok) {
                    let responseResult = await response.json();
                    form.classList.remove('_sending');
                    formSent(form, responseResult);
                } else {
                    alert("Помилка");
                    form.classList.remove('_sending');
                }
            } else if (form.hasAttribute('data-dev')) {
                e.preventDefault();
                formSent(form);
            }
        } else {
            e.preventDefault();
            if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
                const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
                gotoBlock(formGoToErrorClass, true, 1000);
            }
        }
    }
    function formSent(form, responseResult = ``) {
        document.dispatchEvent(new CustomEvent("formSent", {
            detail: {
                form: form
            }
        }));

        const telephoneInputs = form.querySelectorAll('.telephone');
        telephoneInputs.forEach(input => {
            const parent = input.closest('.form__input');
            if (parent) {
                parent.classList.remove('filled');
            }
        });

        setTimeout(() => {
            if (modules_flsModules.popup) {
                const popup = form.dataset.popupMessage;
                popup ? modules_flsModules.popup.open(popup) : null;
            }
        }, 0);

        formValidate.formClean(form);
    }
}
formSubmit();

//Количество
function formQuantity() {
    function getMinValue(quantityElement, currentValue) {
        if (quantityElement.dataset.quantityMin !== undefined) {
            return +quantityElement.dataset.quantityMin;
        }

        const valueInput = quantityElement.querySelector('[data-quantity-value]');
        if (valueInput && valueInput.hasAttribute('min')) {
            return +valueInput.getAttribute('min');
        }

        return 0;
    }

    function updateButtonsState(quantityElement) {
        const valueElement = quantityElement.querySelector('[data-quantity-value]');
        const plusButton = quantityElement.querySelector('[data-quantity-plus]');
        const minusButton = quantityElement.querySelector('[data-quantity-minus]');

        if (!valueElement) return;

        let value = parseInt(valueElement.value) || 0;

        let min = 0;
        if (quantityElement.dataset.quantityMin !== undefined) {
            min = +quantityElement.dataset.quantityMin;
        } else if (valueElement.hasAttribute('min')) {
            min = +valueElement.getAttribute('min');
        }

        let max = null;
        if (quantityElement.dataset.quantityMax !== undefined) {
            max = +quantityElement.dataset.quantityMax;
        } else if (valueElement.hasAttribute('max')) {
            max = +valueElement.getAttribute('max');
        }

        if (value < min) {
            value = min;
            valueElement.value = min;
        }
        if (max !== null && value > max) {
            value = max;
            valueElement.value = max;
        }

        if (value <= min) {
            minusButton?.classList.add('disabled');
        } else {
            minusButton?.classList.remove('disabled');
        }

        if (max !== null && value >= max) {
            plusButton?.classList.add('disabled');
        } else {
            plusButton?.classList.remove('disabled');
        }
    }

    function handleQuantityChange(quantityElement) {
        const valueElement = quantityElement.querySelector('[data-quantity-value]');
        if (!valueElement) return;

        let value = parseInt(valueElement.value) || 0;

        let min = 0;
        if (quantityElement.dataset.quantityMin !== undefined) {
            min = +quantityElement.dataset.quantityMin;
        } else if (valueElement.hasAttribute('min')) {
            min = +valueElement.getAttribute('min');
        }

        let max = null;
        if (quantityElement.dataset.quantityMax !== undefined) {
            max = +quantityElement.dataset.quantityMax;
        } else if (valueElement.hasAttribute('max')) {
            max = +valueElement.getAttribute('max');
        }

        if (value < min) value = min;
        if (max !== null && value > max) value = max;

        if (valueElement.value != value) {
            valueElement.value = value;
        }

        updateButtonsState(quantityElement);
    }

    function initQuantity(quantityElement) {
        updateButtonsState(quantityElement);

        const plusBtn = quantityElement.querySelector('[data-quantity-plus]');
        const minusBtn = quantityElement.querySelector('[data-quantity-minus]');
        const valueInput = quantityElement.querySelector('[data-quantity-value]');

        if (quantityElement._handlers) {
            if (quantityElement._handlers.plus) plusBtn?.removeEventListener('click', quantityElement._handlers.plus);
            if (quantityElement._handlers.minus) minusBtn?.removeEventListener('click', quantityElement._handlers.minus);
            if (quantityElement._handlers.input) valueInput?.removeEventListener('input', quantityElement._handlers.input);
            if (quantityElement._handlers.change) valueInput?.removeEventListener('change', quantityElement._handlers.change);
        }

        quantityElement._handlers = {};

        if (plusBtn) {
            const plusHandler = function (e) {
                e.preventDefault();
                if (plusBtn.classList.contains('disabled')) return;

                const valueElement = quantityElement.querySelector('[data-quantity-value]');
                let value = parseInt(valueElement.value) || 0;
                value++;

                let max = null;
                if (quantityElement.dataset.quantityMax !== undefined) {
                    max = +quantityElement.dataset.quantityMax;
                } else if (valueElement.hasAttribute('max')) {
                    max = +valueElement.getAttribute('max');
                }

                if (max !== null && value > max) {
                    value = max;
                }

                valueElement.value = value;
                handleQuantityChange(quantityElement);

                valueElement.dispatchEvent(new Event('change', { bubbles: true }));
            };
            plusBtn.addEventListener('click', plusHandler);
            quantityElement._handlers.plus = plusHandler;
        }

        if (minusBtn) {
            const minusHandler = function (e) {
                e.preventDefault();
                if (minusBtn.classList.contains('disabled')) return;

                const valueElement = quantityElement.querySelector('[data-quantity-value]');
                let value = parseInt(valueElement.value) || 0;
                value--;

                let min = 0;
                if (quantityElement.dataset.quantityMin !== undefined) {
                    min = +quantityElement.dataset.quantityMin;
                } else if (valueElement.hasAttribute('min')) {
                    min = +valueElement.getAttribute('min');
                }

                if (value < min) {
                    value = min;
                }

                valueElement.value = value;
                handleQuantityChange(quantityElement);

                valueElement.dispatchEvent(new Event('change', { bubbles: true }));
            };
            minusBtn.addEventListener('click', minusHandler);
            quantityElement._handlers.minus = minusHandler;
        }

        if (valueInput) {
            const inputHandler = function () {
                handleQuantityChange(quantityElement);
            };
            valueInput.addEventListener('input', inputHandler);
            quantityElement._handlers.input = inputHandler;

            const changeHandler = function () {
                handleQuantityChange(quantityElement);
            };
            valueInput.addEventListener('change', changeHandler);
            quantityElement._handlers.change = changeHandler;
        }
    }

    function initAllQuantity() {
        document.querySelectorAll('[data-quantity]').forEach(quantityElement => {
            initQuantity(quantityElement);
        });
    }

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) {
                    if (node.hasAttribute && node.hasAttribute('data-quantity')) {
                        initQuantity(node);
                    }
                    if (node.querySelectorAll) {
                        node.querySelectorAll('[data-quantity]').forEach(quantityElement => {
                            initQuantity(quantityElement);
                        });
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllQuantity);
    } else {
        initAllQuantity();
    }
}
formQuantity();
