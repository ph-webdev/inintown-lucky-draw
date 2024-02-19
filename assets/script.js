"use strict";

$(document).ready(function () {

  // set wheel items

  const wheelItems = [
    { label: "98折" },
    { label: "95折" },
    { label: "90折" },
    { label: "80折" },
    { label: "文件夾" },
    { label: "間尺" },
  ];

  // if already drawn, stop from drawing again

  if (localStorage.getItem("inintown-lucky-draw-result")) {
    const { name, phone, division, prizeIndex } = JSON.parse(localStorage.getItem("inintown-lucky-draw-result"));
    $("#result-modal .identity-indicator").text(`${phone} (${division})`);
    $("#result-modal .modal-title").text(`Congratulations, ${name}!`);
    $("#result-modal .prize-message").text(wheelItems[prizeIndex].label);
    $("#result-modal").modal("show");
  }

  // initialise wheel

  function initWheel() {
    // return if input is invalid
    if (!$("#input-form")[0].reportValidity()) {
      $("#reject-modal .reject-message").text("請輸入你的個人資料");
      $("#reject-modal").modal("show");
      return;
    }

    // record inputs
    const name = $("#input-name").val();
    const phone = $("#input-phone").val();
    const division = $("#input-division").val();

    // predetermine prize
    let prizeIndex;
    if (division === "CWB") {
      const random = Math.random();
      if (random < 0.05) { prizeIndex = 0; }
      else if (random < 0.15) { prizeIndex = 1; }
      else if (random < 0.45) { prizeIndex = 2; }
      else if (random < 0.95) { prizeIndex = 3; }
      else if (random < 0.97) { prizeIndex = 4; }
      else { prizeIndex = 5; }
    } else {
      const random = Math.random();
      if (random < 0.50) { prizeIndex = 0; }
      else if (random < 0.80) { prizeIndex = 1; }
      else if (random < 0.90) { prizeIndex = 2; }
      else if (random < 0.95) { prizeIndex = 3; }
      else if (random < 0.97) { prizeIndex = 4; }
      else { prizeIndex = 5; }
    }

    // show wheel
    $("h1").addClass("in-game");
    $("#input-form").addClass("d-none");
    $("#wheel-wrapper").removeClass("d-none");
    const wheel = new spinWheel.Wheel(document.querySelector("#wheel"), {
      items: wheelItems,
      itemLabelColors: ["#664620"],
      itemLabelStrokeColor: "#664620",
      itemLabelStrokeWidth: 0.5,
      itemLabelRadius: 0.8,
      itemLabelRadiusMax: 0.2,
      itemBackgroundColors: ["#eb3f1f", "#ffffff"],
      lineWidth: 0,
      overlayImage: "assets/images/wheel-overlay.svg",
      isInteractive: false,
      onRest: function () {
        $("#result-modal .identity-indicator").text(`${phone} (${division})`);
        $("#result-modal .modal-title").text(`Congratulations, ${name}!`);
        $("#result-modal .prize-message").text(wheelItems[prizeIndex].label);
        $("#result-modal").modal("show");
      },
    });
    $("#btn-spin").on("click", function () {
      if (wheel.rotationSpeed === 0) {
        wheel.spinToItem(prizeIndex, 6000, false, 12);
        localStorage.setItem("inintown-lucky-draw-result", JSON.stringify({
          name: name,
          phone: phone,
          division: division,
          prizeIndex: prizeIndex,
        }));
      }
    });
  }

  // add event listeners to buttons

  $("#btn-start").on("click", initWheel);
  $(".btn-reload").on("click", location.reload.bind(location));

});