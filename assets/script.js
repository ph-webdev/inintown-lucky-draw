"use strict";

(() => {

  // retrieve saved name

  let name = sessionStorage.getItem("name") || "";
  $("#input-name").val(name);

  // initialise wheel

  function initWheel() {
    $("h1").addClass("in-game");
    $("#input-wrapper").addClass("d-none");
    $("#wheel-wrapper").removeClass("d-none");

    name = $("#input-name").val();
    sessionStorage.setItem("name", name);

    const wheelItems = [
      { label: "電影門票兩張" },
      { label: "HKD 1,000" },
      { label: "HKD 500" },
      { label: "HKD 200" },
      { label: "圖書" },
      { label: "文具" },
    ];
    const wheel = new spinWheel.Wheel(document.querySelector("#wheel-wrapper"), {
      items: wheelItems,
      itemLabelColors: ["#664620"],
      itemLabelStrokeColor: "#664620",
      itemLabelStrokeWidth: 0.5,
      itemLabelRotation: 90,
      itemLabelAlign: "center",
      itemLabelRadius: 0.6,
      itemLabelRadiusMax: 0,
      itemBackgroundColors: ["#eb3f1f", "#ffffff"],
      lineWidth: 0,
      overlayImage: "assets/images/wheel-overlay.svg",
      rotation: -180 / wheelItems.length,
      rotationSpeedMax: 600,
      rotationResistance: -60,
      onRest: function (ev) {
        $("#result-modal .modal-title").text(`Congratulations${name ? ", " + name : ""}!`);
        $("#result-modal .prize-message").text(wheelItems[ev.currentIndex].label);
        $("#result-modal").modal("show");
      },
    });
  }

  $("#btn-start").on("click", initWheel);
  $("#btn-reload").on("click", location.reload.bind(location));

})();