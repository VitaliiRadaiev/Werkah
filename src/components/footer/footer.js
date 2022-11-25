{
    let footer = document.querySelector('[data-footer]');
    if(footer) {
        let menuItemHasChildren = footer.querySelectorAll('.footer__nav > li');
        if (menuItemHasChildren.length) {
            menuItemHasChildren.forEach(item => {
                let subMenu = item.querySelector('.footer__sub-menu');
                let link = item.querySelector('.footer__nav-link');

    
                link.addEventListener('click', (e) => {
                    if (document.documentElement.clientWidth < 992) {
                        e.preventDefault();
                        link.classList.toggle('active');
                        this.utils.slideToggle(subMenu, 400);
    
                        menuItemHasChildren.forEach(i => {
                            if (i === item) return;
    
                            let subMenu = i.querySelector('.footer__sub-menu');
                            let link = i.querySelector('.footer__nav-link');
    
                            link.classList.remove('active');
                            this.utils.slideUp(subMenu, 400);
                        })
                    }
                })
            })
        }
    }
}