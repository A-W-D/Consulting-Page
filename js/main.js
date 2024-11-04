(function ($) {
    "use strict";

    // Spinner Removal Function
    const removeSpinner = () => {
        setTimeout(() => {
            $("#spinner").removeClass("show");
        }, 1);
    };
    // Check if the spinner element exists and call removeSpinner
    if ($("#spinner").length > 0) {
        removeSpinner();
    }

    // Initialize WOW.js for Animations
    if (typeof WOW === "function") {
        new WOW().init();
    }

    // Back to Top Button
    $(window).scroll(() => {
        $(".back-to-top").toggle($(window).scrollTop() > 300);
    });

    // Smooth Scroll to Top on Button Click
    $(".back-to-top").on("click", (e) => {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    });

    // Team Carousel Initialization using Owl Carousel
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

    // Testimonial Carousel Initialization using Owl Carousel
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

    // Counter Animation Function
    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target"); // Target number to count up to
        const increment = target / 100; // Increment value

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 50); // Update every 50ms
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Apply Counter Animation to Each Counter Element
    document.querySelectorAll(".counter-value").forEach(animateCounter);

    // Contact Form Submission with AJAX
    $(".contact-form form").on("submit", function (e) {
        e.preventDefault();
        const form = $(this);
        const formData = form.serialize(); // Serialize form data

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
                alert("There was an error sending your message. Please try again later.");
            },
        });
    });

    // Smooth Scroll for Internal Links
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

    // Language Toggle - Toggle between English and Arabic content
    const toggleLanguage = () => {
        $(".en").toggle(); // Show/Hide English content
        $(".ar").toggle(); // Show/Hide Arabic content
    };

    // Language Toggle Button Event
    $("#language-toggle").on("click", function () {
        toggleLanguage();
    });
})(jQuery);

// Project Items Animation using Intersection Observer
document.addEventListener("DOMContentLoaded", function() {
    const projectItems = document.querySelectorAll(".project-item");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2 // Trigger animation when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 150); // Delay animation for each item for a staggered effect
            }
        });
    }, observerOptions);

    // Observe each project item for visibility
    projectItems.forEach((item) => {
        observer.observe(item);
    });
});

const showSpinner = () => $("#spinner").addClass("show");
const hideSpinner = () => $("#spinner").removeClass("show");

$.ajax({
    url: "data.php",
    beforeSend: showSpinner,
    complete: hideSpinner,
    success: function(data) {
        console.log("Data loaded:", data);
    },
    error: function() {
        console.error("Error loading data");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll(".counter-value");

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const increment = target / 100; // زيادة تدريجية

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20); // تحديث كل 20 مللي ثانية
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
});

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    var formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        subject: document.querySelector('input[name="subject"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    fetch("https://script.google.com/macros/s/AKfycbzPS9jOknEk6lEJwPfWyJAaDKeC3x4eQFlbVrp_V3rlv3yFpZyEoVctzItbczih5bEGuA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(function() {
        alert("Message sent successfully!");
    })
    .catch(function(error) {
        alert("There was an error sending the message.");
        console.error("Error:", error);
    });
});
