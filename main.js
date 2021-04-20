const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    console.log("Your Browser supports speech Recognition");
    searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
    searchForm.insertAdjacentHTML("beforeend",'<h5>Comandos de voz: Detener microfono, buscar, limpiar cuadro, busqueda multiple, busqueda + sitio, salir del sitio</h5>');
    searchForm.insertAdjacentHTML("beforeend",'<h5>Para mas ayuda, active el comando de voz: Ayuda del sitio</h5>');
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
        const currentResultIndex = event.resultIndex;
        const transcript = event.results[currentResultIndex][0].transcript;

        if(transcript.toLowerCase().trim()==="detener micrófono"){//detener por voz
            recognition.stop();
        }else if(!searchFormInput.value){
            searchFormInput.value = transcript;
        }else{
            if(transcript.toLowerCase().trim()==="buscar"){//busca
                searchForm.submit();
            }else if(transcript.toLowerCase().trim()==="limpiar cuadro"){
                searchFormInput.value="";
            }else if(transcript.toLowerCase().trim()==="ayuda del sitio"){
                window.open('ayuda.html');
            }else if(transcript.toLowerCase().trim()==="salir del sitio"){
                var opcion = confirm("Se a iniciado el comando 'Salir del sitio', desea continuar?");
     
                 if (opcion == true) { 
                    window.close();     
                } else {
                    mensaje = "No";
                }
                
            }else if(transcript.toLowerCase().trim()==="búsqueda múltiple"){
                window.open('https://www5.jkanime.video/search.html?q='+searchFormInput.value);
                window.open('https://www.twitch.tv/search?term='+searchFormInput.value);
                window.open('https://buscador.rincondelvago.com/'+searchFormInput.value);
                window.open('https://search.cisco.com/search?query='+searchFormInput.value);
                window.open('https://consumer.huawei.com/mx/search/?keyword='+searchFormInput.value);
            }else if(transcript.toLowerCase().trim()==="j k anime"){
                window.open('https://www5.jkanime.video/search.html?q='+searchFormInput.value);
            }else if(transcript.toLowerCase().trim()==="twitch"){
                window.open('https://www.twitch.tv/search?term='+searchFormInput.value);
            }else if(transcript.toLowerCase().trim()==="rincón"){
                window.open('https://buscador.rincondelvago.com/'+searchFormInput.value);
            }else if(transcript.toLowerCase().trim()==="cisco"){
                window.open('https://search.cisco.com/search?query='+searchFormInput.value);
            }else if(transcript.toLowerCase().trim()==="huawei"){
                window.open('https://consumer.huawei.com/mx/search/?keyword='+searchFormInput.value);
            }else{
                searchFormInput.value = transcript;
            }
        }
    }

}else{
    console.log("Your Browser des not support speech Recognition");
}