{
    let promoHeaderSelect = document.querySelector('.promo-header__select select');
   // let promoHeaderBtn = document.querySelector('.promo-header__btn');
    
    if(promoHeaderSelect) {
        promoHeaderSelect.addEventListener('change', () => {
            document.location.href = promoHeaderSelect.value;
        });
    }
}