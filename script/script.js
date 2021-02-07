document.addEventListener("DOMContentLoaded", () => {
    const btnOpenModal = document.getElementById("btnOpenModal");
    const modal = document.getElementById("modalBlock");
    const closeModal = document.getElementById("closeModal");
    const questionTitle = document.getElementById("question");
    const formAnswers = document.getElementById("formAnswers");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const send=document.getElementById("send");

    
    const firebaseConfig = {
        apiKey: "AIzaSyCb7hiC5A2mfOBIWdmozJYWSiTAQsz5ekc",
        authDomain: "quiz-ac067.firebaseapp.com",
        databaseURL: "https://quiz-ac067-default-rtdb.firebaseio.com",
        projectId: "quiz-ac067",
        storageBucket: "quiz-ac067.appspot.com",
        messagingSenderId: "393636322304",
        appId: "1:393636322304:web:c099341261d39694d6cce5",
        measurementId: "G-9R0W2WCZCZ"
      };
      firebase.initializeApp(firebaseConfig);
    const getData=()=>{
       formAnswers.textContent='LOAD'
       next.classList.add("d-none")
       prev.classList.add("d-none")
       firebase.database().ref().child('questions').once('value')
       .then(snap=>playTest(snap.val()))
    }
    
    btnOpenModal.addEventListener("click", () => {
        modal.classList.add("d-block");
        getData();
        
    });
    closeModal.addEventListener("click", () => {
        modal.classList.remove("d-block");
    });
    const playTest=(questions)=>{
        let numberQuestion=0
        const finalAnswers=[]
        const renderAnswers=(index)=>{
            questions[index].answers.forEach((answer)=>{
                const answerItem=document.createElement('div')
                answerItem.classList.add('answers-item','d-flex', 'justify-content-center')
                answerItem.innerHTML=`
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `
                formAnswers.appendChild(answerItem)
            })
        }
        
        const renderQuestions=(indexQuestion)=>{
            formAnswers.innerHTML='';
            switch (true) {
                case (numberQuestion === 0):
                  questionTitle.textContent=`${questions[indexQuestion].question}`
                  prev.classList.add("d-none")
                  next.classList.remove("d-none")
                  send.classList.add("d-none")
                  renderAnswers(indexQuestion)
                  break
                
                case (numberQuestion >= 0 && numberQuestion <= questions.length-1):
                  questionTitle.textContent=`${questions[indexQuestion].question}`
                  prev.classList.remove("d-none")
                  next.classList.remove("d-none")
                  send.classList.add("d-none")
                  renderAnswers(indexQuestion)
                  break
                
                case (numberQuestion == questions.length):
                  next.classList.add("d-none")
                  prev.classList.add("d-none")
                  send.classList.remove("d-none")
                  formAnswers.innerHTML=`
                    <div class="form-group">
                    <label for="numberPhone"> Enter your number</label>
                    <input type="phone" class="form-control" id="numberPhone" placeholder="Номер телефона:">
                    </div>
                    `
                  break
                
                case (numberQuestion == questions.length + 1):
                  send.classList.add("d-none");
                  formAnswers.textContent='Спасибо за пройденный тест!'
                  
                  setTimeout(() => {
                    modal.classList.remove("d-block");
                  }, 2000);
                  break;
              }
            
        }
        renderQuestions(numberQuestion);   

        checkAnswer=()=>{
            const obj={}
            const inputs=[...formAnswers.elements].filter((input)=>input.checked || input.id==='numberPhone')
            inputs.forEach((input, index)=>{
                if(numberQuestion >= 0 && numberQuestion <= questions.length - 1){
                    obj[`${index}_${questions[numberQuestion].question}`]=input.value
                }

                if(numberQuestion===question.length){
                    obj['Номер телефона']=input.value
                }
            })

            finalAnswers.push(obj)
        }
        next.onclick=()=>{
            checkAnswer()
            numberQuestion++
            renderQuestions(numberQuestion)
            
        }
        prev.onclick=()=>{
            numberQuestion--
            renderQuestions(numberQuestion)
        }
        
        send.onclick=()=>{
            checkAnswer()
            numberQuestion++
            renderQuestions(numberQuestion)
            firebase
            .database()
            .ref()
            .child('contacts')
            .push(finalAnswers)
        }
    }
})