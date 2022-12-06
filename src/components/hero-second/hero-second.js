{
    let heroSecondContainer = document.querySelector('[data-hero-second]');
    if(heroSecondContainer) {
        let img = heroSecondContainer.querySelector('.hero-second__bg-decor');
        if(img) {
            setInterval(() => {
                if(document.documentElement.clientWidth > 991.98) {
                    heroSecondContainer.style.minHeight = `${img.clientHeight}px`;
                } else {
                    heroSecondContainer.removeAttribute('style');
                }
            },100)
        }
    }
}