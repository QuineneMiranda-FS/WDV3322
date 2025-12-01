// Imports your SCSS stylesheet
import "./styles/index.scss";

//get data

import carData from "./car-dataset.json";

//Data for dropdowns
const yearSelect = document.getElementById("year-select");
const makeSelect = document.getElementById("make-select");
const modelSelect = document.getElementById("model-select");

function populateSelect(selectElement, items) {
  // clear all but selected
  while (selectElement.options.length > 1) {
    selectElement.remove(1);
  }

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    selectElement.appendChild(option);
  });
  selectElement.disabled = false;
}

// populate years
window.onload = () => {
  const years = [...new Set(carData.map((car) => car.year))].sort();
  populateSelect(yearSelect, years);
};

// use year selected to populate make
yearSelect.addEventListener("change", function () {
  const selectedYear = this.value;
  if (selectedYear) {
    const makes = [
      ...new Set(
        carData
          .filter((car) => car.year === parseInt(selectedYear))
          .map((car) => car.Manufacturer)
      ),
    ].sort();
    populateSelect(makeSelect, makes);
  } else {
    makeSelect.selectedIndex = 0;
    makeSelect.disabled = true;
    modelSelect.selectedIndex = 0;
    modelSelect.disabled = true;
  }
});

// use make to populate model
makeSelect.addEventListener("change", function () {
  const selectedYear = yearSelect.value;
  const selectedMake = this.value;

  if (selectedMake && selectedYear) {
    const models = [
      ...new Set(
        carData
          .filter(
            (car) =>
              car.year === parseInt(selectedYear) &&
              car.Manufacturer === selectedMake
          )
          .map((car) => car.model)
      ),
    ].sort();
    populateSelect(modelSelect, models);
  } else {
    modelSelect.selectedIndex = 0;
    modelSelect.disabled = true;
  }
});
// get car data display results
modelSelect.addEventListener("change", function () {
  const selectedYear = yearSelect.value;
  const selectedMake = makeSelect.value;
  const selectedModel = this.value;

  if (selectedYear && selectedMake && selectedModel) {
    const selectedCar = carData.find(
      (car) =>
        car.year === parseInt(selectedYear) &&
        car.Manufacturer === selectedMake &&
        car.model === selectedModel
    );

    console.log("Full Selected Car Data:", selectedCar);
  }
});
