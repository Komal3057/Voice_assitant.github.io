// Global variables
let recognizer;
let isListening = false;
const modelPath = '/model'; // Path to your model files

// DOM elements
const elements = {
    input: document.getElementById('commandInput'),
    micBtn: document.getElementById('micBtn'),
    sendBtn: document.getElementById('sendBtn'),
    response: document.getElementById('response'),
    status: document.getElementById('modelStatus')
};

// Initialize the app
async function init() {
    try {
        elements.status.textContent = "Loading voice model...";
        
        // Load the custom model
        recognizer = speechCommands.create(
            'BROWSER_FFT',
            null,
            modelPath + '/model.json',
            modelPath + '/metadata.json'
        );
        
        await recognizer.ensureModelLoaded();
        elements.status.textContent = "Model loaded!";
        console.log('Model loaded, labels:', recognizer.wordLabels());
        
        enableUI();
        
    } catch (error) {
        console.error('Model loading failed:', error);
        elements.status.textContent = "Using basic voice recognition";
        initBasicRecognition();
    }
}

// Fallback to Web Speech API
function initBasicRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        elements.status.textContent = "No voice support detected";
        return;
    }
    
    recognizer = new webkitSpeechRecognition();
    recognizer.continuous = false;
    recognizer.interimResults = false;
    recognizer.lang = 'en-US';
    
    recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        elements.input.value = transcript;
        submitCommand();
    };
    
    recognizer.onerror = (event) => {
        elements.response.textContent = `Error: ${event.error}`;
        stopListening();
    };
    
    enableUI();
}

function enableUI() {
    elements.input.disabled = false;
    elements.micBtn.disabled = false;
    elements.sendBtn.disabled = false;
    elements.response.textContent = "Ready to receive commands";
}

// Toggle microphone
elements.micBtn.addEventListener('click', () => {
    if (!isListening) {
        startListening();
    } else {
        stopListening();
    }
});

// Send button
elements.sendBtn.addEventListener('click', submitCommand);

// Enter key in input
elements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitCommand();
});

function startListening() {
    if (recognizer.listen) {
        // TensorFlow model
        recognizer.listen(result => {
            const scores = result.scores;
            const labels = recognizer.wordLabels();
            const maxScoreIndex = scores.indexOf(Math.max(...scores));
            
            if (scores[maxScoreIndex] > 0.7) {
                elements.input.value = labels[maxScoreIndex].replace(/_/g, ' ');
                submitCommand();
            }
        }, {
            includeSpectrogram: true,
            probabilityThreshold: 0.7,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.5
        });
    } else {
        // Web Speech API
        recognizer.start();
    }
    
    isListening = true;
    elements.micBtn.textContent = '🔴';
    elements.response.textContent = "Listening...";
}

function stopListening() {
    if (recognizer.stopListening) {
        recognizer.stopListening();
    } else if (recognizer.stop) {
        recognizer.stop();
    }
    
    isListening = false;
    elements.micBtn.textContent = '🎤';
    elements.response.textContent = "Microphone off";
}

// Handle button commands
function handleCommand(cmd) {
    const commands = {
        'lights_on': 'Turn on the lights',
        'lights_off': 'Turn off the lights',
        'weather': 'What is the weather?',
        'reminder': 'Set a reminder'
    };
    
    elements.input.value = commands[cmd] || cmd;
    submitCommand();
}

// Send command to server
async function submitCommand() {
    const command = elements.input.value.trim();
    
    if (!command) {
        elements.response.textContent = "Please enter a command first!";
        return;
    }
    
    try {
        elements.response.textContent = "Processing...";
        
        const response = await fetch('/api/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command })
        });
        
        const data = await response.json();
        elements.response.textContent = data.response;
        elements.input.value = '';
        
    } catch (error) {
        console.error('Error:', error);
        elements.response.textContent = "Error processing command";
    }
}

// Initialize when loaded
window.addEventListener('load', init);