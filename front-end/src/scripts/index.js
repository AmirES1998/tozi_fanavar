import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.rtl.css";

import { html, render } from "lit-html";

window.addEventListener("DOMContentLoaded", () => {
  const ItemTemplate = (
    FromNameFa,
    ToNameFa,
    departureTime,
    arrivalTime,
    departureDate,
    arrivalDate,
    price,
    capacity
  ) => html`
    <a href="#" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 d-flex">
          <div class="d-flex flex-column">
            <span>${FromNameFa}</span>
            <span class="fs-6 mt-1">${departureTime}</span>
          </div>
          <ion-icon
            name="airplane-outline"
            class="fs-3 lh-1 mx-4"
            style="transform:rotate(180deg)"
          ></ion-icon>
          <div class="d-flex flex-column">
            <span>${ToNameFa}</span>
            <span class="fs-6 mt-1">${arrivalTime}</span>
          </div>
        </h5>
        <small class="text-muted">${price}</small>
      </div>
      <p class="mt-1 mb-0 fs-6">حرکت: ${departureDate}</p>
      <p class="mb-1 fs-6">بازگشت: ${arrivalDate}</p>
      <small class="text-muted">ظرفیت باقی مانده: ${capacity} نفر</small>
    </a>
  `;
  const listTemplate = document.querySelector("#list");

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

      document.querySelector("#search-btn").addEventListener("click", () => {
        const origin = document.querySelector("#origin").value;
        const destination = document.querySelector("#destination").value;
        const departureDate =
          document.querySelector('input[type="date"]').value;

        window
          .fetch("http://localhost:3000/api/v1/reserve/flightList", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: origin,
              to: destination,
              departureDate: departureDate,
              currency: "IRR",
              type: "fast",
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            render(
              data.map((item) =>
                ItemTemplate(
                  item["fromFa"],
                  item["toFa"],
                  item["departureTime"],
                  item["arrivalTime"],
                  item["departureDateJalali"]["weekday"] +
                    " " +
                    item["departureDateJalali"]["mday"] +
                    " " +
                    item["departureDateJalali"]["month"],
                  item["arrivalDateM"],
                  item["adultPrice"].toLocaleString("fa-IR") +
                    " " +
                    item["currencyTitle"],
                  item["capacity"]
                )
              ),
              listTemplate
            );
          })
          .catch((error) => {
            console.error(error);
          });
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
