const buttonWrapper = document.querySelector(".button-wrapper");

function createButtons() {
  const buttonWidth = 130;
  const buttonHeight = 80;
  const margin = 10;
  const maxButtonsPerRow = 8  ;
  const maxWidth = (buttonWidth + margin) * maxButtonsPerRow + margin;
  const maxButtons = maxButtonsPerRow * Math.floor(window.innerHeight / (buttonHeight + margin));

  let numButtonsPerRow;
  let numButtons;

  if (window.innerWidth < maxWidth) {
    numButtonsPerRow = Math.floor((window.innerWidth - margin * 2) / (buttonWidth + margin));
  } else {
    numButtonsPerRow = maxButtonsPerRow;
  }

  numButtons = Math.min(Math.floor(window.innerHeight / (buttonHeight + margin)) * numButtonsPerRow, maxButtons);

  const buttonArray = new Array(numButtons).fill(null);

  buttonWrapper.innerHTML = buttonArray.map((_, index) => {
    return `
      <div class='button' id='${index}'>
        Button
        <span class='button-label'>Label ${index}</span>
      </div>
    `;
  }).join("");
}

createButtons();





function testButton(){
  const botao = document.getElementById(0);
  botao.innerHTML = "Teste";
}
testButton();
window.addEventListener("resize", createButtons);