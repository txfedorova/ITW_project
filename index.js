$(document).ready(function () {
    const NUM_PHOTOS = 8;
    const images = new Array(NUM_PHOTOS).fill(0).map((_, idx) => `assets/brunik/${idx + 1}.jpg`);

    const $container = $('.carousel-images');
    const $carousel = $('.carousel');
    let current = 0;

    const SELECTED_IMAGES_LENGTH = 3
    const selectedImages = (current) => [
        images[current - 1 < 0 ? images.length - 1 : current - 1],
        images[current],
        images[current + 1 >= images.length ? 0 : current + 1]
    ]

    const loadImages = () => {
        $container.empty();
        // create a variable visible images, which contains the selected image in the centre
        // if there is only one image in images, the image is gonna be repeated
        selectedImages(0).forEach((src, index) => {
            $('<img>', {
                src: src,
                alt: `Image ${index + 1}`,
                css: {
                    transform: 'scale(0.4)',
                    opacity: 0
                }
            }).appendTo($container).on('load', function () {
                $(this).animate({ opacity: 1 }, 100);
            });
        });
    }

    const updateCarousel = () => {
        $container.empty();
        console.log('current in update carousel', current)
        selectedImages(current).forEach((src, index) => {
            const $img = $('<img>', {
                src: src,
                alt: `Image ${index + 1}`,
                css: {
                    transform: index === SELECTED_IMAGES_LENGTH >> 1 ? 'scale(1)' : 'scale(0.4)', // Adjust scale based on position
                }
            }).on('load', function () {
                // If you want to animate on load, you can do it here
                $(this).animate({ opacity: 1 }, 1000);
            });

            $img.wrap('<div class="carousel-image-wrapper"></div>').parent().appendTo($container);
        });
    }

    $carousel.children('.control.left').on('click', () => {
        current = (current - 1 + NUM_PHOTOS) % NUM_PHOTOS;
        updateCarousel();
    });

    $carousel.children('.control.right').on('click', function () {
        current = (current + 1) % NUM_PHOTOS;
        updateCarousel();
    });

    loadImages();
    updateCarousel();
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const progressBar = document.getElementById('progressBar');

    window.onscroll = function () {
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        let currentScroll = (window.scrollY / maxScroll) * 100;

        progressBar.style.width = `${currentScroll}%`;

        const shouldDisplayScrollTopBtn = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
        if (shouldDisplayScrollTopBtn) {
            scrollTopBtn.style.opacity = "1";
            scrollTopBtn.style.visibility = "visible";
        } else {
            scrollTopBtn.style.opacity = "0";
            scrollTopBtn.style.visibility = "hidden";
        }
    };

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
