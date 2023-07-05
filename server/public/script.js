const buttonWrapper = document.querySelector(".button-wrapper");
const checkEdit = document.querySelector('input[type="checkbox"]');
//const submitEdit = document.querySelector(".submit-edit");
let buttonsData;
let numButtons;

function createButtons() {
  const buttonWidth = 130;
  const buttonHeight = 80;
  const margin = 10;
  const maxButtonsPerRow = 8;
  const maxWidth = (buttonWidth + margin) * maxButtonsPerRow + margin;
  const maxButtons = maxButtonsPerRow * Math.floor(window.innerHeight / (buttonHeight + margin));

  let numButtonsPerRow;

  if (window.innerWidth < maxWidth) {
    numButtonsPerRow = Math.floor((window.innerWidth - margin * 2) / (buttonWidth + margin));
  } else {
    numButtonsPerRow = maxButtonsPerRow;
  }

  numButtons = Math.min(Math.floor(window.innerHeight / (buttonHeight + margin)) * numButtonsPerRow, maxButtons);

  const buttonArray = new Array(numButtons).fill(null);

  // Gera os botões dinamicamente
  buttonWrapper.innerHTML = buttonArray
    .map((_, index) => {
      const buttonId = index;
      return `
        <div class='button' id='button-${buttonId}'>
          <span class='button-label'>vazio ${buttonId}</span>
        </div>
      `;
    })
    .join("");

  loadButtonsData().then(() => {
    updateButtonsData();
  });
}

function loadButtonsData() {
  return fetch('src/buttons.json')
    .then(response => response.json())
    .then(data => {
      buttonsData = data;
    });
}

function updateButtonsData() {
  buttonsData.slice(0, numButtons).forEach(botao => {
    if (botao.id !== undefined && botao.id <= numButtons) {
      const buttonLabel = document.querySelector(`#button-${botao.id} .button-label`);
      if (botao.labelButton) {
        buttonLabel.innerText = botao.labelButton;
      } else {
        buttonLabel.innerText = "";
      }
      const sound = new Audio(`http://localhost:3000${botao.path}`);
      const buttonPath = document.querySelector(`#button-${botao.id}`);

      buttonPath.onclick = function () {
        let check = checkEdit;
        if (check.checked) {
          openPopup();
        } else {
          sound.play();
        }
      };
    }
  });
}

function editaJson() {
  console.log(buttonsData);//test
}

function handleWindowResize() {
  createButtons();
  if (buttonsData) {
    buttonsData.slice(0, numButtons).forEach(botao => {
      if (botao.id !== undefined && botao.id < numButtons) {
        const buttonLabel = document.querySelector(`#button-${botao.id} .button-label`);
        if (botao.labelButton) {
          buttonLabel.innerText = botao.labelButton;
        } else {
          buttonLabel.innerText = "";
        }
      }
    });
  }
}


function openPopup() {
  const popupHTML = `
    <div class="popup-container">
      <form class="popup-form">
        <label for="field1">Field 1:</label>
        <input type="text" id="field1" required>
        <label for="field2">Field 2:</label>
        <input type="text" id="field2" required>
        <label for="field3">Field 3:</label>
        <input type="text" id="field3" required>
        <button type="submit" class="popup-submit">Submit</button>
        <button type="button" class="popup-close">Fechar</button>
      </form>
    </div>
  `;

  // Create the popup container element
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");
  popupContainer.innerHTML = popupHTML;

  // Disable main window buttons
  const mainButtons = document.querySelectorAll(".button");
  mainButtons.forEach(button => {
    button.style.pointerEvents = "none";
  });

  // Append popup to the body
  document.body.appendChild(popupContainer);

  // Handle form submission
  const popupForm = document.querySelector(".popup-form");
  popupForm.addEventListener("submit", handleSubmit);

  // Close the popup and re-enable main window buttons
  function closePopup() {
    popupContainer.remove();
    mainButtons.forEach(button => {
      button.style.pointerEvents = "auto";
    });
  }

  // Close the popup on button click
  const closeButton = document.querySelector(".popup-close");
  closeButton.addEventListener("click", closePopup);

  // Close the popup on Escape key press
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closePopup();
    }
  });

  function handleSubmit(event) {
    event.preventDefault();

    // Retrieve field values
    const field1Value = document.querySelector("#field1").value;
    const field2Value = document.querySelector("#field2").value;
    const field3Value = document.querySelector("#field3").value;

    // Perform desired actions with the field values
    // ...

    // Close the popup
    closePopup();
  }
}







createButtons();

window.addEventListener("resize", handleWindowResize);
