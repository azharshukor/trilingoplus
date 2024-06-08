var questions = [
		"anggur",
		"anjing",
		"beruang",
		"gajah",
		"harimau",
		"ikan",
		"kaki",
		"kelapa",
		"kuda",
		"lembu",
		"mangga",
		"mata",
		"monyet",
		"pisang",
		"singa",
		"tangan",
		"tembikai",
		"arnab",
		"bantal",
		"bayi",
		"berus gigi",
		"bola",
		"buku",
		"bunga",
		"cawan",
		"daun",
		"gunting",
		"kasut",
		"kereta",
		"kipas",
		"kunci",
		"kura-kura",
		"labah-labah",
		"layang-layang",
		"mangkuk",
		"motosikal",
		"pantai",
		"pelangi",
		"pensel",
		"pinggan",
		"pokok",
		"sabun",
		"sandal",
		"tandas",
		"tong sampah",
		"topi",
		"zirafah"
	];
        
var images = [
		"anggur.jpeg",
		"anjing.jpeg",
		"beruang.jpeg",
		"gajah.jpeg",
		"harimau.jpeg",
		"ikan.jpeg",
		"kaki.jpeg",
		"kelapa.jpeg",
		"kuda.jpeg",
		"lembu.jpeg",
		"mangga.jpeg",
		"mata.jpeg",
		"monyet.jpeg",
		"pisang.jpeg",
		"singa.jpeg",
		"tangan.jpeg",
		"tembikai.jpeg",
		"arnab.jpeg",
		"bantal.jpeg",
		"bayi.jpeg",
		"berus gigi.jpeg",
		"bola.jpeg",
		"buku.jpeg",
		"bunga.jpeg",
		"cawan.jpeg",
		"daun.jpeg",
		"gunting.jpeg",
		"kasut.jpeg",
		"kereta.jpeg",
		"kipas.jpeg",
		"kunci.jpeg",
		"kura-kura.jpeg",
		"labah-labah.jpeg",
		"layang-layang.jpeg",
		"mangkuk.jpeg",
		"motosikal.jpeg",
		"pantai.jpeg",
		"pelangi.jpeg",
		"pensel.jpeg",
		"pinggan.jpeg",
		"pokok.jpeg",
		"sabun.jpeg",
		"sandal.jpeg",
		"tandas.jpeg",
		"tong sampah.jpeg",
		"topi.jpeg",
		"zirafah.jpeg"
	];
        var currentQuestionIndex = 0;
        var userAnswer = "";
        var score = 0;

        document.getElementById("startButton").addEventListener("click", startTest);
        document.getElementById("checkResult").addEventListener("click", checkResult);
        document.getElementById("next").addEventListener("click", nextQuestion);

        function startTest() {
    document.querySelector("p").style.display = "none";
    document.querySelector("h2").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    currentQuestionIndex = 0;
    
    // Shuffle questions and images
    shuffleQuestionsAndImages();
    
    // Ask the first question
    askQuestion();
}

// Function to shuffle questions and images arrays
function shuffleQuestionsAndImages() {
    // Combine questions and images into one array of objects
    var combinedArray = questions.map((q, index) => ({ question: q, image: images[index] }));
    
    // Shuffle the combined array
    for (let i = combinedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
    }
    
    // Extract questions and images back to separate arrays
    questions = combinedArray.slice(0, 5).map(obj => obj.question);
    images = combinedArray.slice(0, 5).map(obj => obj.image);
}

        function askQuestion() {
            if (currentQuestionIndex < questions.length) {
                var currentQuestion = questions[currentQuestionIndex];
                var currentImage = images[currentQuestionIndex];
                document.getElementById("question").innerHTML = `
    			<h3>Soalan ${currentQuestionIndex + 1}</h3>
    			<h4>Apa yang anda lihat dalam gambar ini?</h4>
    			<div class="question-image">
      			<img src="${currentImage}" alt="${currentQuestion}" style="width: 100%; height: auto;">	
    </div>`;
                document.getElementById("timer").innerHTML = `<h3>Masa yang tinggal:</h3><h4>5 saat</h4>`;
                document.getElementById("question").style.display = "block";
                document.getElementById("timer").style.display = "block";
                document.getElementById("recordedAnswer").style.display = "none";
                document.getElementById("checkResult").style.display = "none";
                document.getElementById("result").style.display = "none";
                startTimer();
                startListening();
            } else {
                endTest();
            }
        }

        function startTimer() {
            var seconds = 5;
            var timer = setInterval(function() {
                seconds--;
                document.getElementById("timer").innerHTML = `<h3>Masa yang tinggal:</h3><h4>${seconds} saat</h4>`;
                if (seconds === 0) {
                    clearInterval(timer);
                    document.getElementById("timer").style.display = "none";
                    if (!userAnswer) {
                        recordedAnswer = "-";
                    }
                    stopListening();
                }
            }, 1000);
        }

        function nextQuestion() {
            if (currentQuestionIndex === questions.length - 1) {
                document.body.innerHTML = `
                    <h1></h1>
    <h2>Ayuh, cakap Melayu!</h2>
    <p>Dalam permainan ini, anda harus sebutkan apa yang anda lihat dalam gambar yang akan ditunjukkan.<br><br>Tekan butang sedia untuk mula.</p>
    <button class="button" role="button" id="startButton">Sedia</button>`;
                document.getElementById("startButton").addEventListener("click", startTest);
            } else {
                currentQuestionIndex++;
                userAnswer = "";
                askQuestion();
                document.getElementById("next").style.display = "none";
            }
        }

        function showAnswer(answer) {
            document.getElementById("question").style.display = "none";
            document.getElementById("timer").style.display = "none";
            var currentQuestion = questions[currentQuestionIndex];
            var currentImage = images[currentQuestionIndex];
            var correctAnswer = questions[currentQuestionIndex];
            
            if (answer === "-") {
            
            document.getElementById("recordedAnswer").innerHTML = `
                
                <br><br>
		<div class="question-image">
                    <img src="${currentImage}" alt="${currentQuestion}" style="width: 100%; height: auto;">
                </div>
                <h3>Apa yang kami dengar:</h3>
                <h4 style="margin-bottom: 0;">${answer}<br><span style="font-size: 14pt; font-weight: 400; font-style: italic;">(Jawabpan anda kurang jelas)</span></h4>
                <br>
                <h3>Jawabpan yang betul:</h3>
                <h4>${correctAnswer}</h4>`;
          	}
            else {
            
            document.getElementById("recordedAnswer").innerHTML = `
                
                <br><br>
		<div class="question-image">
                    <img src="${currentImage}" alt="${currentQuestion}" style="width: 100%; height: auto;">
                </div>
                <h3>Apa yang kami dengar:</h3>
                <h4>${answer}</h4>
                <h3>Jawabpan yang betul:</h3>
                <h4>${correctAnswer}</h4>`;
			}

            
            var resultElement = document.getElementById("result");

           	if (answer.includes(correctAnswer)) {
    score++;
    resultElement.innerHTML = 
	    `<div style="background-color: #009B4D; border-radius: 25px; padding: 20px; font-size: 14pt; color: white; display: inline-block;">
     Syabas! Jawabpan anda betul.</div>`;
     var text = `Syabas! Jawapan anda betul. Ini adalah ${currentQuestion}.`;
speak(text);
} 			
			else {
    resultElement.innerHTML = 
	    `<div style="background-color: #D20062; border-radius: 25px; padding: 20px; font-size: 14pt; color: white; display: inline-block;">
     Anda gagal menjawab dengan betul.</div>`;
     var text = `Anda gagal menjawab dengan betul. Ini adalah ${currentQuestion}.`;
speak(text);
}

            var currentQuestionNumber = currentQuestionIndex + 1;
            var scoreDisplay = `${score}/${currentQuestionNumber}<br>`;
            var stars = score > 0 ? '⭐'.repeat(score) : '';

            if (currentQuestionIndex === questions.length - 1) {
                
                resultElement.innerHTML += `<h3>Markah penuh:</h3><h4>${scoreDisplay}<br>${stars}</h4><p>Sudah selesai! Tekan butang untuk cuba lagi.<br></p>`;
                document.getElementById("next").textContent = "Cuba lagi";
                document.getElementById("next").addEventListener("click", function() {
                    window.location.href = window.location.origin + window.location.pathname;
                });
            } else {
               
                resultElement.innerHTML += `<h3>Markah anda:</h3><h4>${scoreDisplay}<br>${stars}</h4>`;
                document.getElementById("next").textContent = "Soalan seterusnya";
            }

            document.getElementById("recordedAnswer").style.display = "block";
            resultElement.style.display = "block";
            document.getElementById("next").style.display = "block";
        }
        
 function startListening() {
    var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    if (!recognition) {
        console.error('Speech recognition not supported.');
        return;
    }

    recognition.lang = "ms-MY";
    recognition.continuous = false;
    recognition.interimResults = false;

    var hasAnswered = false; // Flag to track if showAnswer has been called

    recognition.onstart = function() {
        console.log('Speech recognition started.');
    };

    recognition.onerror = function(event) {
        if (!hasAnswered) {
            console.error('Speech recognition error:', event.error);
            recordedAnswer = "Error";
            showAnswer(recordedAnswer);
            hasAnswered = true; // Set the flag to true after calling showAnswer
        }
    };

    recognition.onresult = function(event) {
        if (!hasAnswered) {
            userAnswer = event.results[0][0].transcript.toLowerCase();
            recordedAnswer = userAnswer;
            showAnswer(recordedAnswer);
            hasAnswered = true; // Set the flag to true after calling showAnswer
        }
    };

    recognition.onend = function() {
        if (!hasAnswered) {
            recordedAnswer = "-";
            showAnswer(recordedAnswer);
            hasAnswered = true; // Set the flag to true after calling showAnswer
        }
    };

    recognition.start();

    setTimeout(function() {
        if (!hasAnswered) {
            recognition.stop(); // Stopping the recognition process will trigger the onend event
        }
    }, 5000);
}

function stopListening() {
    var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    if (recognition) {
        recognition.stop();
    }
}

        
function speak(text) {
    // API key for Google Text-to-Speech
    var apiKey = 'AIzaSyCt4pzJMVvYHs9e2-CbtWbmnkIas6Um48c';
    // Voice name for Malay (Malaysia)
    var voiceName = 'ms-MY-Standard-C';
    // Base URL for Google Text-to-Speech API
    var url = 'https://texttospeech.googleapis.com/v1/text:synthesize?key=' + apiKey;

    // Create the request body
    var requestBody = JSON.stringify({
        input: {
            text: text
        },
        voice: {
            name: voiceName,
            languageCode: 'ms-MY'
        },
        audioConfig: {
            audioEncoding: 'LINEAR16'
        }
    });

    // Send POST request to Google Text-to-Speech API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => response.json())
    .then(data => {
        // Extract audio content from the response
        var audioContent = data.audioContent;
        // Convert audio content to base64 format
        var audioData = 'data:audio/wav;base64,' + audioContent;
        // Create an audio element
        var audio = new Audio(audioData);
        // Play the audio
        audio.play();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
