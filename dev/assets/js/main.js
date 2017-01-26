$(document).ready(function() {
  window.onload = function() {
    console.log("hello")
    // DOM selectors
    var $body = $("body");
    var $menuButton = $("#menu-button");
    var $menu = $("#menu");
    var $hamburgerInner = $(".hamburger-inner")
    var $navlink = $(".navlink");
    var $navlinkContainers = $(".navlink-container");
    var $sectionLink = $(".section-link");
    var $revealProject = $(".reveal-project");
    var $project = $(".project");

    // Timeline animations
    var menuLinkSlideIn = new TimelineMax({paused: true});
    menuLinkSlideIn.staggerFromTo($navlinkContainers, 0.1, {opacity: 0, x: "-50%"}, {opacity: 1, x: "0%"}, 0.05);

    // Event listeners
    $menuButton.click(function() {
      toggleMenu();
      toggleMenuButtonActive($menuButton);
      // toggleBodyScroll();
    });

    $navlink.click(function(event) {
      event.preventDefault();
      var $navClicked = $($(this).attr("href"));
      toggleMenu();
      toggleMenuButtonActive($menuButton);
      scrollToContent($navClicked);
    });

    $sectionLink.click(function(event) {
      event.preventDefault();
      var $navClicked = $($(this).attr("href"));
      scrollToContent($navClicked);
    });

    $revealProject.click(function(event) {
      event.preventDefault();
      $project.slideToggle();
    });

    // Function defs
    function scrollToContent($section) {
      var sectionOffset = $section.offset().top;
      $body.stop().animate({scrollTop: sectionOffset}, 250);
    }

    function toggleMenu() {
      $menu.fadeToggle("fast");
      animateMenuLinks();
    }

    function toggleInverted($elem) {
      $elem.toggleClass("inverted");
    }

    function toggleMenuButtonActive($elem) {
      $elem.toggleClass("is-active");
    }

    function toggleBodyScroll() {
      $body.toggleClass("disable-scroll");
    }

    function animateMenuLinks() {
      menuLinkSlideIn.restart();
    }
  }
});
