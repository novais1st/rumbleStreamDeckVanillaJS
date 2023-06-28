const buttonWrapper = document.querySelector(".button-wrapper");
const checkEdit = document.querySelector('input[type="checkbox"]');

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
    buttonsData.slice(0, numButtons).forEach(botao => {
      if (botao.id !== undefined && botao.id <= numButtons) {
        const buttonLabel = document.querySelector(`#button-${botao.id} .button-label`);
        if (botao.labelButton) {
          buttonLabel.innerText = botao.labelButton;
        } else {
          buttonLabel.innerText = "";
        }
        const sound = new Audio(`http://localhost:3000${botao.path}`);
        //const sound = new Audio(`http://localhost:5500/src/sounds/${botao.id}.mp3`);
        const buttonPath = document.querySelector(`#button-${botao.id}`);

        buttonPath.onclick = function () {
          let check = checkEdit;
          if (check.checked) {
            const editaJson = () => {
              // alert("test");
              console.log(buttonsData);
            };
            editaJson();
          } else {
           // sound.addEventListener('loadeddata', function(){
           //   console.log('audio carregado');
              
           // })
            sound.play();
            
          }
        };
      }
    });
  });
}

function loadButtonsData() {
  return fetch('buttons.json')
    .then(response => response.json())
    .then(data => {
      buttonsData = data;
    });
}

createButtons();

window.addEventListener("resize", () => {
  createButtons();
  // Utiliza a variável buttonsData para alterar os labels dos botões após a geração
  if (buttonsData) {
    buttonsData.slice(0, numButtons).forEach(botao => {
      if (botao.id !== undefined && botao.id < numButtons) {
        let v = botao.id+1;
        const buttonLabel = document.querySelector(`#button-${botao.id} .button-label`);
        if (botao.labelButton) {
          buttonLabel.innerText = botao.labelButton;
        } else {
          buttonLabel.innerText = "";
        }
      }
    });
  }
});
