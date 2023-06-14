const buttonWrapper = document.querySelector(".button-wrapper");
const checkEdit = document.querySelector('input[type="checkbox"]');


let buttonsData;

function createButtons() {
  const buttonWidth = 130;
  const buttonHeight = 80;
  const margin = 10;
  const maxButtonsPerRow = 8;
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

  // gera os botões dinamicamente
  buttonWrapper.innerHTML = buttonArray.map((_, index) => {
    return `
      <div class='button' id='button-${index}'>
        <span class='button-label'>vazio ${index}</span>
        
      </div>
    `;
  }).join("");

  // carrega o arquivo JSON e altera os labels dos botões
  fetch('buttons.json')
  .then(response => response.json())
  .then(data => {
    buttonsData = data;
    buttonLabel = buttonsData.slice(0, numButtons)
    buttonLabel.forEach((botao, index) => {
      // altera o label do botão
      const buttonLabel = document.querySelector(`#button-${index} .button-label`);
      if(botao.labelButton){
        buttonLabel.innerText = botao.labelButton;
      }else{
        buttonLabel.innerText = "";
      }
    })
  })
  .then(() => {
    const buttonPath = new Array(numButtons).fill(null);
    buttonPath.forEach((_, index) => {
      //Adiciona o som ao evento onclick do botão
      const sound = new Audio(`http://localhost:5500/src/sounds/${index}.mp3`);
      const buttonPath = document.querySelector(`#button-${index}`);

      buttonPath.onclick = function() {
        let check = checkEdit;
        if(check.checked){
          const editaJson = () => {
              


            //alert("test");
            console.log(buttonsData);
          }
          editaJson();
          
        }else{
        sound.play();
      }
      }
    })
  });
  
}

createButtons();

window.addEventListener("resize", () => {
  createButtons();
  // utiliza a variável buttonsData para alterar os labels dos botões após a geração
  if (buttonsData) {
    buttonsData.forEach((botao, index) => {
      const buttonLabel = document.querySelector(`#button-${index} .button-label`);
      if(botao.labelButton){
        buttonLabel.innerText = botao.labelButton;
      }else{
        buttonLabel.innerText = "";
      }
    });
  }
  
});
