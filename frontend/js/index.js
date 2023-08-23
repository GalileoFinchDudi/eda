var isDebug = location.href.indexOf("localhost") !== -1;
var queue = new createjs.LoadQueue(false);

function loader() {
  var $progress = $("#progress");
  queue.on("complete", function () {
    $progress.text("100%");
    $("#loading").remove();
    layout.init();
  });
  queue.on("progress", function (event) {
    var percent = Math.ceil(event.loaded * 100);
    $progress.text(percent + "%");
  });
  var pics = ["p1_bg.png"];

  $.each(pics, function (index, item) {
    queue.loadFile({ id: item, src: "./images/" + item });
  });
}

var layout = {
  index: -1,
  initAni: function ($el) {
    var $animates = $el.find(".animated");
    $.each($animates, function (index, el) {
      var delay = $(el).data("delay");
      var duration = $(el).data("duration");
      if (delay) {
        $(el).css({ "-webkit-animation-delay": delay + "s" });
      }
      if (duration) {
        $(el).css({ "-webkit-animation-duration": duration + "s" });
      }
    });
  },
  init: function () {
    this.$el = $("#scrollBox").show();
    this.bind();
  },
  bind: function () {
    this.initAni(this.$el);
    this.bindScroll();
  },
  bindScroll: function () {
    var startScroll = function () {
      var scroller = scrollama();

      function handleStepEnter(res) {
        res.element.classList.add("is-active");
        console.log(res.index);
        switch (res.index) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            break;
        }
      }

      function handleStepExit(res) {
        // remove color from current step
        // res.element.classList.remove('is-active');
      }

      // 1. setup the scroller with the bare-bones options
      // this will also initialize trigger observations
      // 3. bind scrollama event handlers (this can be chained like below)
      scroller
        .setup({
          step: ".area",
          // progress: true,
          debug: false,
          offset: 0.6,
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);
      window.addEventListener("resize", scroller.resize);
    };
    startScroll();
  },
};

var mySwiper = new Swiper(".swiper", {
  // loop: true, // 循环模式选项

  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination",
  },
});

loader();
