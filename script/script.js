document.addEventListener("DOMContentLoaded", () => {
  const btnOpenModal = document.getElementById("btnOpenModal");
  const modal = document.getElementById("modalBlock");
  const closeModal = document.getElementById("closeModal");
  const questionTitle = document.getElementById("question");
  const formAnswers = document.getElementById("formAnswers");
  let burgerImg;
  let burgerName;
  let newBlock;
  btnOpenModal.addEventListener("click", () => {
    modal.classList.add("d-block");
    playTest();
    newBlock = document.createElement("p");
    newBlock.style = "text-align:center;";
    newBlock.innerText = `Фото: ${burgerImg.src} Название: ${burgerName.innerText}.`;
    document.body.append(newBlock);
  });
  closeModal.addEventListener("click", () => {
    modal.classList.remove("d-block");
  });
  const playTest = () => {
    const renderQuestions = () => {
      questionTitle.textContent = "Какого цвета бургер вы хотите?";
      formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="./image/burgerBlack.png" alt="black-burger">
                <span>Black</span>
                </label>
            </div>
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="./image/burger.png" alt="burger">
                <span>Стандарт</span>
                </label>
            </div>
            `;
      const burger = document.querySelector(".answers-item");
      burgerImg = document.querySelector(".answerImg");
      console.log(burgerImg.src);
      burgerName = burger.querySelector("span");
      console.log(burgerName.innerText);
    };
    renderQuestions();
  };
});
