window.addEventListener('DOMContentLoaded', () => {

    // Forms
    function forms(formSelector) {

        const forms = document.querySelectorAll(formSelector);

        const message = {
            success: 'Спасиб! Мы скоро свяжемся с Вами',
            failure: 'Что-то пошло не так...'
        };

        forms.forEach(item => {
            bindPostData(item);
        });

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });
            return await res.json();
        };

        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                    })
                    .catch(() => {
                        showThanksModal(message.failure);
                    })
                    .finally(() => {
                        form.reset();
                    });
            });
        }

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal');
            const modalContent = document.querySelector('.modal__content');
            prevModalDialog.classList.add('show');
            modalContent.textContent = `${message}`;

            setTimeout(() => {
                prevModalDialog.classList.add('hide');
                prevModalDialog.classList.remove('show');
            }, 4000);
        }
    }

    forms('form');

    // Calc 
    function calculator() {
        const range = document.querySelector('#range'),
            areaValue = document.querySelector('.area-value'),
            avgValue = document.querySelector('.avg-value'),
            totalValue = document.querySelector('.total-value'),
            rate = document.querySelectorAll('.rate');

        let areaValueRes,
            ratio = 300;

        function calcTotal() {
            areaValueRes = range.value;
            areaValue.innerHTML = `${areaValueRes} м<sup>2</sup>`;
            totalValue.textContent = `${Math.round(areaValueRes * ratio)} грн`;
            avgValue.textContent = `${Math.round(areaValueRes * ratio) / areaValueRes} грн`;
        }

        range.addEventListener('input', calcTotal);

        function getStaticInformation() {
            rate.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                    }
                    rate.forEach(item => {
                        item.classList.remove('rate-active');
                    });
                    e.target.classList.add('rate-active');

                    calcTotal();
                });
            });
        }
        getStaticInformation();
    }

    calculator();

    // Slider
    function slider({
        container,
        slide,
        nextArrow,
        prevArrow,
        totalCounter,
        currentCounter,
        wrapper,
        field
    }) {
        const slides = document.querySelectorAll(slide),
            slider = document.querySelector(container),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            total = document.querySelector(totalCounter),
            current = document.querySelector(currentCounter),
            slidesWrapper = document.querySelector(wrapper),
            slidesField = document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width;

        let slideIndex = 1;
        let offset = 0;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width;
        });

        slider.style.position = 'relative';

        const indicators = document.createElement('ol'),
            dots = [];
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }

        function deleteNotDigits(str) {
            return +str.replace(/\D/g, '');

        }
        next.addEventListener('click', () => {
            if (offset == deleteNotDigits(width) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += deleteNotDigits(width);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });

        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = deleteNotDigits(width) * (slides.length - 1);
            } else {
                offset -= deleteNotDigits(width);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;

                offset = deleteNotDigits(width) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                if (slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = '1';
            });
        });
    }

    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});