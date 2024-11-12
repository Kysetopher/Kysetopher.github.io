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
            var currentScrollPos = $(window).scrollTop();
            var closestSection = null;
            var closestDistance = Infinity;
    
            $('.navbar .nav-link').each(function() {
                var section = $(this.hash);
                if (section.length) {
                    var sectionTop = section.offset().top;
                    var distance = Math.abs(currentScrollPos - sectionTop);
    
                    if (distance < closestDistance && distance < 200) { // Set threshold for "closeness"
                        closestSection = section;
                        closestDistance = distance;
                    }
                }
            });
    
            if (closestSection) {
                $('html, body').animate({
                    scrollTop: closestSection.offset().top
                }, 700);
            }
        }

        // Highlight nav link when scrolling
            var idleTimer;
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