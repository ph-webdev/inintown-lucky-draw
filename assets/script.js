"use strict";

(() => {

  // retrieve saved name

  let name = localStorage.getItem("name") || "";
  $("#input-name").val(name);

  // initialise wheel

  function initWheel() {
    $("h1").addClass("in-game");
    $("#input-wrapper").addClass("d-none");
    $("#wheel-wrapper").removeClass("d-none");

    name = $("#input-name").val();
    localStorage.setItem("name", name);

    const wheelItems = [
      { label: "A" },
      { label: "B" },
      { label: "C" },
      { label: "D" },
      { label: "E" },
      { label: "F" },
      { label: "G" },
      { label: "H" },
      { label: "I" },
      { label: "J" },
      { label: "K" },
      { label: "L" },
      { label: "M" },
      { label: "N" },
      { label: "O" },
      { label: "P" },
    ];
    const wheel = new spinWheel.Wheel(document.querySelector("#wheel-wrapper"), {
      items: wheelItems,
      itemLabelColors: ["#664620"],
      itemLabelStrokeColor: "#664620",
      itemLabelStrokeWidth: 0.5,
      itemLabelRotation: 90,
      itemLabelAlign: "center",
      itemLabelRadius: 0.625,
      itemLabelRadiusMax: 0.45,
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