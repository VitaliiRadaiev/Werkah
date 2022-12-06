{
    let testimonialsSlider = document.querySelector('[data-testimonials] .testimonials__slider');
    if(testimonialsSlider) {
        let sliderData = new Swiper(testimonialsSlider, {
            slidesPerView: 1,
            spaceBetween: 20,
            autoHeight: true,
            speed: 800,
            navigation: {
                prevEl: testimonialsSlider.querySelector('.slider-btn.prev'),
                nextEl: testimonialsSlider.querySelector('.slider-btn.next'),
            },
        });
    }
}