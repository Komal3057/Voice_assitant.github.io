# Personalized Voice Assistant (Text Classification)

**Team Members:** Arvind Kumar, Komal Dabber, Krishna Abrol, Abhinav Ranjan

---

## 1. Project Title
**Personalized Voice Assistant** – A web-based voice assistant that classifies user commands into predefined categories for smart home control and task automation.

---

## 2. Objective
The objective of this project is to build a personalized voice assistant capable of classifying user commands into predefined categories such as:

- Turning on/off lights  
- Checking the weather  
- Sending reminders  

The assistant interprets spoken language converted to text, then classifies the intent using a pre-trained machine learning model. This hands-free solution enhances smart home interactions, task automation, and contextual communication.

---

## 3. Tools and Technologies Used

### 3.1. Python (Flask)
Flask is a lightweight web framework in Python used to create the backend server. It handles:

- Serving HTML/CSS/JS files  
- Hosting static assets (model files: `model.json`, `weights.bin`)  
- Managing routes and APIs for future updates  

Ideal for rapid prototyping of AI interfaces.

### 3.2. HTML, CSS, JavaScript
These frontend technologies provide the user interface:

- **HTML:** Structures content (buttons, labels, display areas)  
- **CSS:** Styles layout, colors, fonts, and responsiveness  
- **JavaScript:** Handles dynamic behavior, captures microphone input, runs the ML model, and updates UI elements in real-time

### 3.3. TensorFlow.js
A JavaScript library that allows ML models to run directly in the browser. It:

- Loads the pre-trained text classification model (`model.json`, `weights.bin`)  
- Processes user commands locally for fast and private predictions  

### 3.4. Pretrained Machine Learning Model
The model recognizes various command patterns. Files used:

- `model.json` – Model architecture  
- `metadata.json` – Labels and word mappings  
- `weights.bin` – Model weights  

These are loaded in TensorFlow.js for browser-based predictions.

### 3.5. Web Speech API
Used to capture audio from the microphone and convert speech to text. This forms the core functionality of the assistant, converting human speech into actionable intent.

### 3.6. Web Browser
The browser hosts the app, capturing user input, displaying the interface, and running the ML model—making it universally accessible without additional installations.

---

## 4. Features and Functionality

### 4.1. Text Classification of Voice Commands
- Converts spoken commands into text  
- Classifies text into categories like `lights_on`, `weather_query`, `set_reminder`  
- Enables hands-free interaction with smart home devices

### 4.2. Real-Time Feedback
- Displays recognized intent immediately on the interface  
- Example: `✅ Detected Intent: lights_off`

### 4.3. Fully Browser-Based Execution
- All inference happens locally using TensorFlow.js  
- No data sent to external servers  
- Fast, private, and works offline after initial load

### 4.4. Simple UI with Microphone Control
- User-friendly interface  
- Microphone button to start voice input  
- Displays transcripts and predicted intents  

### 4.5. Extendable Intent Classes
- Easily add new categories like `play_music`  
- Fine-tune model for new user patterns  
- Integrate with APIs for smart devices or external services  

---

## 5. Working Description

### 5.1. Capturing Voice Input
- Click microphone button → Web Speech API converts speech to text  
- Example: `"Turn off the lights"` → `"turn off the lights"`

### 5.2. Text Processing and Classification
- Pre-trained model in TensorFlow.js classifies text into intents  
- Example: `"turn off the lights"` → `lights_off`

### 5.3. Displaying Results
- Real-time feedback on the UI: `🔍 Recognized Intent: lights_off`

### 5.4. Ready for Integration
- Can trigger actions via APIs (smart lights, weather, reminders)  
- Acts as a foundation for full automation

### 5.5. Client-Side Processing
- All processing happens in the browser  
- Ensures privacy, speed, and offline capability  

---

## 6. Screenshots
<img width="1379" height="776" alt="Picture1" src="https://github.com/user-attachments/assets/3be752e7-251b-4cd3-a40d-1319ce36b872" />


---

## 7. Conclusion
This project demonstrates a functional prototype of a Personalized Voice Assistant that:

- Classifies natural language commands using ML  
- Runs entirely in the browser using TensorFlow.js and Web Speech API  
- Ensures privacy and fast interaction without backend dependency  

With further development, it can integrate with IoT devices, scheduling systems, and conversational agents for full smart home automation.

---

