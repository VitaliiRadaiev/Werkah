
let mobileMenu = document.querySelector('[data-mobile-menu]'); 
if (mobileMenu) {
    let menuItemHasChildren = mobileMenu.querySelectorAll('.mobile-menu__nav .menu-item-has-children');
    if (menuItemHasChildren.length) {
        menuItemHasChildren.forEach(item => {
            let subMenu = item.querySelector('.sub-menu');
            let link = item.querySelector('.mobile-menu__nav-link');

            link.addEventListener('click', (e) => {
                if (document.documentElement.clientWidth < 992) {
                    e.preventDefault();
                    link.classList.toggle('active');
                    this.utils.slideToggle(subMenu, 400);

                    menuItemHasChildren.forEach(i => {
                        if (i === item) return;

                        let subMenu = i.querySelector('.sub-menu');
                        let link = i.querySelector('.mobile-menu__nav-link');

                        link.classList.remove('active');
                        this.utils.slideUp(subMenu, 400);
                    })
                }
            })
        })
    }


    let btnOpenMobMenu = document.querySelector('[data-action="open-mobile-menu"]');
    let btnCloseMobMenu = document.querySelector('[data-action="close-mobile-menu"]');

    if(btnOpenMobMenu) {
        btnOpenMobMenu.addEventListener('click', () => {
            mobileMenu.classList.add('mobile-menu--open');
            document.body.classList.add('overflow-hidden');
        })
    }

    if(btnCloseMobMenu) {
        btnCloseMobMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile-menu--open');
            document.body.classList.remove('overflow-hidden');
        })
    }
}
