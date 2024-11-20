$(document).ready(function() {
    const scrollOffset = 40; // Set the offset value to 80px
    let loadedSections = 0;
    const sectionsToLoad = 3; // Total number of sections to load

    // Smooth scroll for navigation links
    $(".navbar .nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - scrollOffset
            }, 700, function() {
                // Use history.pushState instead of window.location.hash to update the URL without triggering the browser's default scroll behavior
                if (history.pushState) {
                    history.pushState(null, null, hash);
                } else {
                    // Fallback for older browsers
                    window.location.hash = hash;
                }
            });
        }
    });

    // Load the content dynamically and count when each one is loaded
    $('#resume').load('Pages/Resume.html', onSectionLoad);
    $('#casestudies').load('Pages/CaseStudies.html', onSectionLoad);
    $('#artwork').load('Pages/Artwork.html', onSectionLoad);

    // Function called each time a section finishes loading
    function onSectionLoad() {
        loadedSections++;
        if (loadedSections === sectionsToLoad) {
            checkHashAndScroll();
        }
    }

    // Function to check the URL hash and scroll to the corresponding element
    function checkHashAndScroll() {
        const hash = window.location.hash;
        if (hash) {
            const target = $(hash);
            if (target.length) {
                // Use jQuery to scroll to the target element
                $('html, body').animate({
                    scrollTop: target.offset().top - scrollOffset
                }, 1000); // Adjust the scroll speed if needed
            }
        }
    }

    // Function to highlight nav link based on scroll position
    function highlightNavLinkOnScroll() {
        const currentScrollPos = $(window).scrollTop();
        // Resize brand image based on scroll position
        if (currentScrollPos > 0) {
            $('.brand-img').removeClass('brand-img-full');
            $('.brand-img').addClass('brand-img-small');
        } else {
            $('.brand-img').removeClass('brand-img-small');
            $('.brand-img').addClass('brand-img-full');
        }
    }

    function smoothScrollToClosestSection() {
        const currentScrollPos = $(window).scrollTop();
        let closestSection = null;
        let closestDistance = Infinity;

        $('.navbar .nav-link').each(function() {
            const section = $(this.hash);
            if (section.length) {
                const sectionTop = section.offset().top - scrollOffset;
                const distance = Math.abs(currentScrollPos - sectionTop);

                if (distance < closestDistance && distance < 200) {
                    closestSection = section;
                    closestDistance = distance;
                }
            }
        });

        if (closestSection) {
            $('html, body').animate({
                scrollTop: closestSection.offset().top - scrollOffset
            }, 700);
        }
    }

    // Highlight nav link when scrolling
    let idleTimer;
    $(window).on('scroll', function() {
        highlightNavLinkOnScroll();

        clearTimeout(idleTimer);
        idleTimer = setTimeout(function() {
            smoothScrollToClosestSection();
        }, 1000); // Trigger smooth scroll after 1 second of being idle
    });

    // Initial highlight when page loads
    highlightNavLinkOnScroll();
});