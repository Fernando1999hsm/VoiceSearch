const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    console.log("Your Browser supports speech Recognition");
    searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
    searchForm.insertAdjacentHTML("beforeend",'<h5>Comandos de voz: Stop recording, go, reset input</h5>')
    const micBtn = searchForm.querySelector("button");
    const micIcon = micBtn.querySelector("i");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    //recognition.lang="el-GR";

    micBtn.addEventListener("click", micBtnClick);
    function micBtnClick(){
        if(micIcon.classList.contains("fa-microphone")){//inicia
            recognition.start();
        }else{//detiene
            //recognition.stop();
        }
    }

    recognition.addEventListener("start", startSpeechRecognition);
    function startSpeechRecognition(){
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
        searchFormInput.focus();
        console.log("Speech Recognition Active");
    }

    recognition.addEventListener("end", endSpeechRecognition);
    function endSpeechRecognition(){
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
        searchFormInput.focus();
        console.log("Speech Recognition Disconected");
    }

    recognition.addEventListener("result", resultOfSpeechRecognition);
    function resultOfSpeechRecognition(event){
        //console.log(event)
        const currentResultIndex = event.resultIndex
        const transcript = event.results[currentResultIndex][0].transcript;

        if(transcript.toLowerCase().trim()==="Stop recording"){//detener por voz
            recognition.stop();
        }else if(!searchFormInput.value){
            searchFormInput.value = transcript;
        }else{
            if(transcript.toLowerCase().trim()==="go"){//busca
                searchForm.submit();
            }else if(transcript.toLowerCase().trim()==="reset input"){
                searchFormInput.value="";
            }else{
                searchFormInput.value = transcript;
            }
        }

        //setTimeout(() =>{
        //    searchForm.submit();
        //}, 750);
    }

}else{
    console.log("Your Browser des not support speech Recognition");
}