document.addEventListener('DOMContentLoaded', function () {
  headerEventHandler();
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazyload',
  });
  phInputEventHandler();
});

function onToggleHeaderSearch() {
  $('.main-header-btn--search').toggleClass('active');
  const search = document.querySelector('.js-search-container');
  search.classList.toggle('main-header-search-wrapper--show');
}
const onToogleBasket = () => {
  if (isMobile()) {
    window.location.href = '/basket-page.html';
    return;
  }
  $('.main-header-btn--basket').toggleClass('active');
  const basket = document.querySelector('#basketPopup');
  const overlay = document.querySelector('.js-basket-overlay');
  basket.classList.toggle('basket-popup--show');
  overlay.classList.toggle('basket-overlay--show');
};

const onChangeTabs = (tabBtn) => {
  const tabType = tabBtn.getAttribute('data-tab-type');
  const tabId = tabBtn.getAttribute('data-tab-id');
  const tabEl = document.querySelector(`#${tabId}[data-tab-type="${tabType}"]`);
  const tabActive = document.querySelector(
    `.active[data-tab-type="${tabType}"]`
  );
  tabActive.classList.remove('active');
  tabEl.classList.add('active');
};

const headerEventHandler = () => {
  $('.js-sub-nav-parent')
    .mouseenter(() => {
      if (!isMobile()) {
        $('.js-sub-nav').addClass('main-header-sub-nav--show');
        $('.js-sub-nav-overlay').addClass('main-header-sub-nav-overlay--show');
      }
    })
    .mouseleave(() => {
      $('.js-sub-nav').removeClass('main-header-sub-nav--show');
      $('.js-sub-nav-overlay').removeClass('main-header-sub-nav-overlay--show');
    });
  $('#headerSearch').on('input', () => {
    const value = $('#headerSearch').val();
    const container = $('#headerSearchContainer');
    if (value.length > 2 && !isMobile()) {
      container.addClass('main-header-result--show');
    } else {
      container.removeClass('main-header-result--show');
    }
  });
};

$('#bestSellersSlider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  dots: false,
  speed: 200,
  prevArrow: $('.slider-arrow-sellers--prew'),
  nextArrow: $('.slider-arrow-sellers--next'),
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        dots: true,
        arrows: false,
      },
    },
  ],
});

$('#partnersSliderMain').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  dots: false,
  asNavFor: '#partnersSliderNav',
  autoplay: true,
  autoplaySpeed: 4000,
});
$('#partnersSliderNav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  asNavFor: '#partnersSliderMain',
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
});

const initSliderPromo = () => {
  if ($.fn.slick != undefined) {
    var $slider = $('#mainPromoSlide');
    function showSliderScreen($widthScreen) {
      if ($widthScreen >= '1000') {
        if (!$slider.hasClass('slick-initialized')) {
          $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            dots: true,
            speed: 200,
            autoplay: false,
            prevArrow: $('.arrow-main-promo--prew'),
            nextArrow: $('.arrow-main-promo--next'),
            customPaging: function (slider, i) {
              return `<div class="main-promo-pagination"></div>`;
            },
          });
        }
      } else {
        if ($slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
        }
      }
    }
    var widthScreen = $(window).width();
    $(window)
      .ready(showSliderScreen(widthScreen))
      .resize(function () {
        var widthScreen = $(window).width();
        showSliderScreen(widthScreen);
      });
  }
};

var swiper = new Swiper('#productSlider', {
  navigation: {
    nextEl: '.slider-arrow-product--next',
    prevEl: '.slider-arrow-product--prew',
  },
  autoHeight: true,
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1000: {
      scrollbar: false,
    },
  },
});

$('#productCardSlider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  dots: true,
  speed: 200,
  fade: true,
  customPaging: function (slider, i) {
    const thumb = $(slider.$slides[i]).data('image');
    return `<div style="background-image: url('${thumb}');" class="product-slider-pagin"></div>`;
  },
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        dots: false,
        fade: false,
      },
    },
  ],
});
$('#sliderPromoProduct').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  dots: false,
  speed: 200,
  prevArrow: $('.promo-product--prew'),
  nextArrow: $('.promo-product--next'),
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        dots: false,
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
});

const onSubmitSubscribe = (form) => {
  const input = form.querySelector('#subscribeInput');
  if (isValidEmail(input.value)) {
  }
};

const isValidEmail = (value) => {
  var reg = /^[^\@]+@.*\.[a-z]{2,6}$/i;
  return reg.test(value);
};

const onCounterMinus = (id) => {
  let val = getCounterVal(id);
  if (val > 0) {
    --val;
  }
  setCounterVal(id, val);
};

const onCounterPlus = (id) => {
  let val = getCounterVal(id);
  ++val;
  setCounterVal(id, val);
};

const getCounterVal = (id) => {
  return document.getElementById(id).value;
};
const setCounterVal = (id, val) => {
  document.getElementById(id).value = val;
};

const onTogglePopUp = (popupId) => {
  document.getElementById(popupId).classList.toggle('popup-wrapper--show');
};
const onChangePopup = (popupId) => {
  document
    .querySelector('.popup-wrapper--show')
    .classList.remove('popup-wrapper--show');
  document.getElementById(popupId).classList.toggle('popup-wrapper--show');
};
const onToggleDropdownMobile = (el) => {
  $(el).toggleClass('active');
  $('.js-sub-nav').slideToggle(200);
};

const onToggleChildDD = (el) => {
  if (isMobile()) {
    $(el).toggleClass('active');
    $(el).siblings('.js-child-dropwdown').slideToggle(200);
  }
};
const onToggleMobileMenu = () => {
  document.querySelector('#menuMobile').classList.toggle('show');
  document.querySelector('.js-nav-mobile-overlay').classList.toggle('show');
  document.querySelector('.js-right-block').classList.toggle('hide');
};

const onToggleFooterDropDown = (btn) => {
  if (isMobile()) {
    $(btn).toggleClass('opened');
    $(btn).siblings('.js-dropdown-footer').slideToggle(200);
  }
};
const onToggleProfDropDown = (btn) => {
  if (isMobile()) {
    $(btn).toggleClass('opened');
    $(btn).siblings('.js-dropdown-prof').slideToggle(200);
  }
};
const isMobile = () => {
  if ($(window).width() <= 1000) {
    return true;
  }
  return false;
};

const onToggleProductSpoiler = (btn) => {
  $(btn).toggleClass('tabs-title-item-text--opened');
  $(btn).siblings('.js-product-tab').slideToggle(200);
};

const phInputEventHandler = () => {
  $('input.input-ph').on('input', function () {
    const input = $(this);
    setPhInputClass(input, 'hav-val');
  });
};

const setPhInputClass = (inputSelector, className) => {
  if (inputSelector.val()) {
    inputSelector.addClass(className);
  } else {
    inputSelector.removeClass(className);
  }
};
