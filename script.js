document.addEventListener("DOMContentLoaded", () => {
    const btnOpenModal = document.getElementById("btnOpenModal");
    const modal = document.getElementById("modalBlock");
    const closeModal = document.getElementById("closeModal");
    const questionTitle = document.getElementById("question");
    const formAnswers = document.getElementById("formAnswers");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    let burgerImg;
    let burgerName;
    let newBlock;


    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];
    
    btnOpenModal.addEventListener("click", () => {
        modal.classList.add("d-block");
        playTest();
        newBlock=document.createElement("p");
        newBlock.style="text-align:center;"
        newBlock.innerText=`Фото: ${burgerImg.src} Название: ${burgerName.innerText}.`;
        document.body.append(newBlock);
    });
    closeModal.addEventListener("click", () => {
        modal.classList.remove("d-block");
    });
    const playTest=()=>{
        let numberQuestion=0

        const renderAnswers=(index)=>{
            questions[index].answers.forEach((answer)=>{
                const answerItem=document.createElement('div')
                answerItem.classList.add('answers-item','d-flex', 'flex-column')
                answerItem.innerHTML=`
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `
                formAnswers.appendChild(answerItem)
            })
        }
        
        const renderQuestions=(indexQuestion)=>{

            
            if(numberQuestion==0){
                prev.classList.add("d-none");
                next.classList.remove("d-none");
            }
            else if(numberQuestion >= 0 && numberQuestion < questions.length - 1){
                prev.classList.remove("d-none");
                next.classList.remove("d-none");
            }
            else if(numberQuestion == questions.length - 1)
            {
                console.log(numberQuestion)
                prev.classList.remove("d-none");
                next.classList.add("d-none");
            }
            
            formAnswers.innerHTML='';
            questionTitle.textContent=`${questions[indexQuestion].question}`
            renderAnswers(indexQuestion)
            const burger=document.querySelector(".answers-item");
            burgerImg=document.querySelector(".answerImg");
            console.log(burgerImg.src)
            burgerName=burger.querySelector("span");
            console.log(burgerName.innerText)
        }
        renderQuestions(numberQuestion);   
        next.onclick=()=>{
           
            numberQuestion++
            renderQuestions(numberQuestion)
            
        }
        prev.onclick=()=>{
            numberQuestion--
            renderQuestions(numberQuestion)
        }
        
    }
})