(function ($) {
  /* Screen height */
  const mn_screenHeight = (htmlElement) => {
    $(htmlElement).height($(window).height());
  };

  /* Screen width */
  const mn_screenWidth = $(window).width();

  /* Full Page */
  function mn_fullPage() {
    if ($(window).width() > 1023) {
      $("#site-content").fullpage({
        scrollingSpeed: 600,
        verticalCentered: false,
        css3: false,
      });

      $(".js-scrollToSection").on("click", function (e) {
        const pos = $(this)
          .attr("data-link")
          .split(",")
          .map(function (v) {
            return parseInt(v.trim(), 10);
          });
        $.fn.fullpage.moveTo(pos[0], pos[1]);
        e.preventDefault();
      });
    }
  }

  
  /* Mobile Menu */
  function mn_mobMenu() {
    // build a variable to target
    const menu = $(".js-menu");
    // bind a click function to the trigger
    $(".js-menu-trigger").click(function (event) {
      $(".navMob-fixed-top").toggleClass("is-open");
      $("body").toggleClass("hideScroll");
      event.preventDefault();
    });

    $(".js-menu-close").click(function (event) {
      $(".navMob-fixed-top").removeClass("is-open");
      $("body").removeClass("hideScroll");
      event.preventDefault();
    });

    // Animate movement if section is on same page
    $("#navMobPrimary a").on("click", function () {
      $("body").removeClass("hideScroll");
      $(".navMob-fixed-top").removeClass("is-open");
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        let target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000
          );
          return false;
        }
      }
    });
  }

  function mn_mobileNav() {
    mn_screenHeight(".js-mobNavHeight");
    mn_mobMenu();
  }

  // Invoke functions
  $(document).ready(function () {
    if (mn_screenWidth < 1023) {
      mn_mobileNav();
    } else {
      mn_fullPage();
    }
  });
})(jQuery);

