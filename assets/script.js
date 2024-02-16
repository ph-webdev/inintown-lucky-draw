"use strict";

(() => {

  // initialise wheel

  function initWheel() {
    if (!$("#input-division").val()) return;

    const name = $("#input-name").val();
    const division = $("#input-division").val()

    $("h1").addClass("in-game");
    $("#input-wrapper").addClass("d-none");
    $("#wheel-wrapper").removeClass("d-none");

    let wheelItems;
    if (division === "CWB") {
      wheelItems = [
        { label: "HKD 1,000", weight: 30 },
        { label: "HKD 500", weight: 14 },
        { label: "HKD 200", weight: 14 },
        { label: "HKD 100", weight: 14 },
        { label: "圖書", weight: 14 },
        { label: "文具", weight: 14 },
      ];
    } else {
      wheelItems = [
        { label: "HKD 1,000", weight: 10 },
        { label: "HKD 500", weight: 18 },
        { label: "HKD 200", weight: 18 },
        { label: "HKD 100", weight: 18 },
        { label: "圖書", weight: 18 },
        { label: "文具", weight: 18 },
      ];
    }

    const wheel = new spinWheel.Wheel(document.querySelector("#wheel-wrapper"), {
      items: wheelItems,
      itemLabelColors: ["#664620"],
      itemLabelStrokeColor: "#664620",
      itemLabelStrokeWidth: 0.5,
      itemLabelRadius: 0.8,
      itemLabelRadiusMax: 0.2,
      itemBackgroundColors: ["#eb3f1f", "#ffffff"],
      lineWidth: 0,
      overlayImage: "assets/images/wheel-overlay.svg",
      rotationSpeedMax: 600,
      rotationResistance: -60,
      onRest: function (ev) {
        $("#result-modal .division-indicator").text(division);
        $("#result-modal .modal-title").text(`Congratulations${name ? ", " + name : ""}!`);
        $("#result-modal .prize-message").text(wheelItems[ev.currentIndex].label);
        $("#result-modal").modal("show");
      },
    });
  }

  $("#btn-start").on("click", initWheel);
  $("#btn-reload").on("click", location.reload.bind(location));

})();