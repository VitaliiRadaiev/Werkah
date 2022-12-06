{
    let textSections = document.querySelectorAll('[data-text-section]');
    if(textSections.length) {
        textSections.forEach(textSection => {
            let hideText = textSection.querySelector('.text-section__hide-text');
            let btnMore = textSection.querySelector('.text-section__btn-more');

            if(hideText && btnMore) {
                // init 
                if(hideText.children.length) btnMore.classList.remove('!hidden');

                btnMore.addEventListener('click', () => {
                    if(hideText.classList.contains('is-open')) {
                        this.utils.slideUp(hideText);
                        hideText.classList.remove('is-open');
                        btnMore.classList.remove('text-is-open');
                    } else {
                        this.utils.slideDown(hideText);
                        hideText.classList.add('is-open');
                        btnMore.classList.add('text-is-open');
                    }
                })
            }
        })
    }
}