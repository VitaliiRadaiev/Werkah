{
    let vacancySingleHeroContainer = document.querySelector('[data-vacancy-single-hero]');
    if(vacancySingleHeroContainer) {
        let img = vacancySingleHeroContainer.querySelector('.vacancy-single-hero__img');
        if(img) {
            setInterval(() => {
                if(document.documentElement.clientWidth > 991.98) {
                    vacancySingleHeroContainer.style.minHeight = `calc(${img.clientHeight}px - 40px)`;
                } else {
                    vacancySingleHeroContainer.removeAttribute('style');
                }
            },100)
        }
    }
}