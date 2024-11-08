
    $(document).ready(function() {
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

        $(window).on('scroll', function() {
            var currentScrollPos = $(window).scrollTop() + 100; 

            $('.navbar .nav-link').each(function() {
                var section = $(this.hash);
                if (section.length) {
                    var sectionTop = section.offset().top;
                    var sectionBottom = sectionTop + section.outerHeight();

                    if (currentScrollPos >= sectionTop && currentScrollPos < sectionBottom) {
                        $('.navbar .nav-link').removeClass('active');
                        $(this).addClass('active');
                    }
                }
            });
        });
    });
