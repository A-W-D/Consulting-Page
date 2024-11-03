(function ($) {
    "use strict";

    // Spinner Removal
    const spinner = () => {
        setTimeout(() => {
            $("#spinner").removeClass("show");
        }, 1);
    };
    if ($("#spinner").length > 0) {
        spinner();
    }

    // Initialize WOW.js for animations
    if (typeof WOW === "function") {
        new WOW().init();
    }

    // Back to Top Button
    $(window).scroll(() => {
        $(".back-to-top").toggle($(window).scrollTop() > 300);
    });

    $(".back-to-top").on("click", (e) => {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    });

    // Team Carousel Initialization
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        margin: 50,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>',
        ],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 },
        },
    });

    // Testimonial Carousel Initialization
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 },
        },
    });

    // Counter Animation with Interaction
    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const increment = target / 100;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 50);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    document.querySelectorAll(".counter-value").forEach(animateCounter);

    // Interactive Elements for Contact Form Submission
    $(".contact-form form").on("submit", function (e) {
        e.preventDefault();
        const form = $(this);
        const formData = form.serialize();

        // AJAX request to handle form submission
        $.ajax({
            type: "POST",
            url: "contact.php",
            data: formData,
            success: function (response) {
                alert("Your message has been sent successfully!");
                form[0].reset(); // Reset the form after successful submission
            },
            error: function () {
                alert(
                    "There was an error sending your message. Please try again later."
                );
            },
        });
    });

    // Scroll to Section Animation for Internal Links
    $("a[href^='#']").on("click", function (e) {
        e.preventDefault();
        const target = this.hash;
        $("html, body").animate(
            {
                scrollTop: $(target).offset().top,
            },
            800,
            "easeInOutExpo"
        );
    });

    // Language Toggle - Simple Toggle between English and Arabic
    const toggleLanguage = () => {
        $(".en").toggle(); // Show/Hide English content
        $(".ar").toggle(); // Show/Hide Arabic content
    };

    $("#language-toggle").on("click", function () {
        toggleLanguage();
    });
})(jQuery);
