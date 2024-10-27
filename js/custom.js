// JavaScript Document

$(window).on('load', function () {
    "use strict";
    // Preloader fade out
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
});

$(document).ready(function () {
    "use strict";

    // AOS Initialization
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    // Stellar.js Initialization for Parallax
    if ($(window).width() > 768) {
        $(window).stellar({
            horizontalScrolling: false,
            verticalOffset: 40
        });
    }

    // Scroll Menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top, footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });

    // Slick Carousel Initialization for Project Sliders
    $('.slider').slick({
        dots: false, // Remove 1-2-3 buttons
        arrows: false, // Remove previous and next buttons
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        fade: true, // Enable fade transition
        autoplay: true, // Enable autoplay for a smoother user experience
        autoplaySpeed: 3000, // Set the duration for each slide (3 seconds)
        adaptiveHeight: true,
        cssEase: 'linear'
    });

    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });

    // Validate Contact Form
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true
            },
            phone: {
                required: false
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "This field is required",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "This field is required"
            },
            message: {
                required: "This field is required"
            }
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "process.php",
                success: function () {
                    $('#contact :input').attr('disabled', 'disabled');
                    $('#contact').fadeTo("slow", 1, function () {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('#success').fadeIn();
                    });
                },
                error: function () {
                    $('#contact').fadeTo("slow", 1, function () {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });
});
