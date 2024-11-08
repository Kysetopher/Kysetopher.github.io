
    $(document).ready(function() {
        // Smooth scroll for navigation links
        $(".navbar .nav-link").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;

                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 700, function() {
                    window.location.hash = hash;
                });
            }
        });

        // Function to highlight nav link based on scroll position
        function highlightNavLinkOnScroll() {
            var currentScrollPos = $(window).scrollTop();

            $('.navbar .nav-link').each(function() {
                var section = $(this.hash);
                if (section.length) {
                    var sectionTop = section.offset().top - 150; // Offset to highlight slightly before reaching
                    var sectionBottom = sectionTop + section.outerHeight();

                    // Check if current scroll position is within this section's boundaries
                    if (currentScrollPos >= sectionTop && currentScrollPos < sectionBottom) {
                        $('.navbar .nav-link').removeClass('active');
                        $(this).addClass('active');
                    }
                }
            });
        }

        // Highlight nav link when scrolling
        $(window).on('scroll', function() {
            highlightNavLinkOnScroll();
        });

        // Initial highlight when page loads
        highlightNavLinkOnScroll();
    });
