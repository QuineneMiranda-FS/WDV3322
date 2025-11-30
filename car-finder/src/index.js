// Imports your SCSS stylesheet
import "./styles/index.scss";

//Data for dropdowns
document.addEventListener("DOMContentLoaded", () => {
  const firstDropdown = document.getElementById("firstDropdown");
  const secondDropdown = document.getElementById("secondDropdown");
  const thirdDropdown = document.getElementById("thirdDropdown");
  let jsonData = {}; // To store the loaded JSON data

  fetch("your_data.json") // Replace with your JSON file path or API endpoint
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
      // Populate first dropdown
      jsonData.categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        firstDropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));

  firstDropdown.addEventListener("change", () => {
    const selectedCategoryName = firstDropdown.value;
    secondDropdown.innerHTML = '<option value="">Select an option</option>'; // Clear
    thirdDropdown.innerHTML = '<option value="">Select an option</option>'; // Clear
    secondDropdown.disabled = true;
    thirdDropdown.disabled = true;

    if (selectedCategoryName) {
      const selectedCategory = jsonData.categories.find(
        (cat) => cat.name === selectedCategoryName
      );
      if (selectedCategory && selectedCategory.items) {
        selectedCategory.items.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.name;
          option.textContent = item.name;
          secondDropdown.appendChild(option);
        });
        secondDropdown.disabled = false;
      }
    }
  });

  secondDropdown.addEventListener("change", () => {
    const selectedCategoryName = firstDropdown.value;
    const selectedItemName = secondDropdown.value;
    thirdDropdown.innerHTML = '<option value="">Select an option</option>'; // Clear
    thirdDropdown.disabled = true;

    if (selectedCategoryName && selectedItemName) {
      const selectedCategory = jsonData.categories.find(
        (cat) => cat.name === selectedCategoryName
      );
      if (selectedCategory && selectedCategory.items) {
        const selectedItem = selectedCategory.items.find(
          (item) => item.name === selectedItemName
        );
        if (selectedItem && selectedItem.subItems) {
          selectedItem.subItems.forEach((subItem) => {
            const option = document.createElement("option");
            option.value = subItem;
            option.textContent = subItem;
            thirdDropdown.appendChild(option);
          });
          thirdDropdown.disabled = false;
        }
      }
    }
  });
});
