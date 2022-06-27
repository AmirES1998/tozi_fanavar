import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.rtl.css";

window.addEventListener("DOMContentLoaded", () => {
  window
    .fetch("http://localhost:3000/api/v1/reserve/getCodes")
    .then((response) => response.json())
    .then((data) => {
      const citySelector = document.querySelectorAll(".city-select");
      for (const select of citySelector) {
        for (const city of data) {
          const opt = document.createElement("option");
          opt.value = city["iata"];
          opt.innerHTML = city["perisanName"] + " " + city["iata"];

          select.appendChild(opt);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
