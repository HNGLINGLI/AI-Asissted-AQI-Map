// API keys for different services
const GEMINI_API_KEY = "Your_API_key_here";  
const TRANSLATION_API_KEY = "Your_API_key_here";  
const WEATHER_API_KEY = 'Your_API_key_here';  

// API URLs for each service
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
const TRANSLATE_API_URL = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATION_API_KEY}`;

// Weather API logic for multiple cities in Taiwan
const cities = [
  { english: 'Taipei', chinese: '台北' },
  { english: 'Taichung', chinese: '台中' },
  { english: 'Kaohsiung', chinese: '高雄' },
  { english: 'Tainan', chinese: '台南' },
  { english: 'Keelung', chinese: '基隆' },
  { english: 'Hsinchu', chinese: '新竹' },
  { english: 'Chiayi', chinese: '嘉義' },
  { english: 'Yilan', chinese: '宜蘭' },
  { english: 'Pingtung', chinese: '屏東' },
  { english: 'Taitung', chinese: '台東' },
  { english: 'Nantou', chinese: '南投' }
];

// Function to determine the city name based on user input (English or Chinese)
const getCityName = (input) => {
  const city = cities.find(c => c.english === input || c.chinese === input);
  if (city) {
      return city.english;  // Return the English name to use in the API
  }
  return input;  // If not found, use the original input
};

// Function to fetch weather data for the city
const fetchWeatherData = async (cityInput) => {
  const cityName = getCityName(cityInput);  // Translate to English if necessary
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},TW&appid=${WEATHER_API_KEY}&lang=zh_tw`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error fetching weather data for ${cityInput}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(`Weather data for ${cityInput}:`, data);
  } catch (error) {
      console.error(error);
  }
};

// Fetch weather for all cities
const fetchAllCitiesWeather = async (userInput) => {
  const weatherPromises = cities.map(city => fetchWeatherData(city.english));
  await Promise.all(weatherPromises);
};

// Example: Fetching weather for user input (supports Chinese or English)
fetchWeatherData('台北');  // Will fetch weather for 'Taipei'
fetchWeatherData('Kaohsiung');  // Will fetch weather for 'Kaohsiung'

// Chatbot and DOM Setup
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");
const micBtn = document.getElementById("mic-btn");
const copyright = document.querySelector('.copyright');

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;
let debounceTimer = null; // Timer for debouncing

// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'zh-CN';
recognition.interimResults = false;

// Function to translate Pinyin to Traditional Chinese
const translatePinyinToChinese = async (pinyinText) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: pinyinText,
      source: "zh",
      target: "zh-TW",
      format: "text",
    }),
  };

  try {
    console.log("Translating:", pinyinText); // Log the Pinyin text being sent for translation
    const response = await fetch(TRANSLATE_API_URL, requestOptions);
    const data = await response.json();
    console.log("Translation response:", data); // Log the translation response
    if (!response.ok) throw new Error(data.error.message);
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return pinyinText; // Fallback to original Pinyin if translation fails
  }
};

// Function to generate chatbot response using Gemini API
const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
    }),
  };

  try {
    const response = await fetch(GEMINI_API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");
  } catch (error) {
    messageElement.classList.add("error");
    messageElement.textContent = error.message;
  } finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
};

// Function to create chat message elements
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" 
    ? `<p></p>` 
    : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Handle chat input
const handleChat = async () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
// alert(chatInput.value)
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  const chineseText = await translatePinyinToChinese(userMessage);
  chatbox.appendChild(createChatLi(`Heard：${chineseText}`, "incoming"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

// Debounced translation while typing
const handleInputChange = async () => {
  const inputText = chatInput.value.trim();
  if (!inputText) return;

  clearTimeout(debounceTimer);
};

// Event Listeners
chatInput.addEventListener("input", handleInputChange);
sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    await handleChat();
  }
});

micBtn.addEventListener("click", () => {
  recognition.start();
  micBtn.classList.add("listening");
});

recognition.addEventListener("result", async (event) => {
  const transcript = event.results[0][0].transcript;
  console.log("Recognized Speech:", transcript); // Log the recognized speech
  chatInput.value = transcript; // Display Pinyin initially
// alert(transcript);
  // Automatically convert Pinyin to Traditional Chinese
  try {
      const chineseText = await translatePinyinToChinese(transcript);
      chatInput.value = chineseText; // Update the chat input with the translated text
    } catch (error) {
      console.error("Translation error:", error);
    }

    recognition.stop(); // Stop recognition after processing
    micBtn.classList.remove("listening");
});

closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Adjust chatbox height dynamically
const adjustChatboxHeight = () => {
  const inputHeight = 55;
  const copyrightHeight = 30;

  chatbox.style.maxHeight = `calc(100vh - ${inputHeight + copyrightHeight + 20}px)`;
  chatbox.style.overflowY = 'auto';
};

adjustChatboxHeight();
window.addEventListener('resize', adjustChatboxHeight);

chatbox.addEventListener('scroll', () => {
  const scrollTop = chatbox.scrollTop;
  const scrollHeight = chatbox.scrollHeight;
  const clientHeight = chatbox.clientHeight;

  copyright.style.opacity = scrollTop + clientHeight >= scrollHeight - 10 ? '1' : '1';
});

    // Prevent right-click context menu
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    // Disable specific keyboard shortcuts
    document.addEventListener("keydown", function(e) {
        if (e.key === "F12") {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
            e.preventDefault();
        }
        if (e.ctrlKey && e.key.toLowerCase() === "u") {
            e.preventDefault();
        }
    });