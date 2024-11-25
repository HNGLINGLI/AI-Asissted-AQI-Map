# <img src="img/logo2.png" alt="Logo" width="50" style="vertical-align: middle; margin-right: 10px;"> AI Assisted AQI Map

The AI-Assisted AQI Map is an innovative platform that blends environmental awareness with user engagement through cutting-edge technology. By integrating Generative AI and real-time data, this web-based application enables interactive exploration of Taiwan’s landmarks, provides access to Air Quality Index (AQI) and weather data, and features bilingual AI-powered chat functionality for seamless interaction in English and Traditional Chinese. This project aims to raise public awareness of air quality, aiding informed health decisions and supporting future environmental and public health improvements.

## Features

### 🌍 Interactive Map
- **Landmark Pins**: Explore destinations with images, descriptions, and direct Google Maps links.
- **Foldable Pins**: Each pin opens a foldable pop-up section containing:
  - A picture of the location.
  - A description of the destination.
  - A link to view the location on Google Maps.
- **Categorized Legend**: Quickly identify cultural, natural, and recreational landmarks.

### 🤖 AI Chat Interface
- **Gemini AI Integration**: Intelligent responses with typo recognition.
- **Speech-to-Text**: Convert voice input into text for effortless communication.
- **Bilingual Support**: Automatically detects and processes queries in English or Traditional Chinese.
- **Language Recognition**: Automatically sorts queries in English and Chinese, enhancing user interaction and comprehension.

### 🌿 Environmental Layers
- **AQI Overlay**: A switchable layer displaying real-time air quality data.
- **Weather Forecasts**: Provides up to 4-day predictions using the OpenWeatherMap API.

### 📱 Accessibility and Usability
- **User-Friendly Design**: Ensures optimal functionality across all devices.
- **Support for Multiple Languages**: Text input supports all languages; speech input automatically detects Pinyin and converts it to Traditional Chinese.

## Technologies Used

- **HTML**: Provides the structure for the web application.
- **CSS**: Styles the map and chatbox user interface.
- **JavaScript**: Adds interactivity and functionality to the application.
- **Python**: Utilized in Google Colab for developing and creating the map's features.
- **Visual Studio Code**: Employed for editing and managing project files efficiently.
  
## **API Documentation**  

![API Documentation Table](img/API%20documentation%20table.jpg)

## **System Architecture Overview**  

![System Architecture](img/system%20architecture%20of%20aqi%20map.png)  

The interactive map application is designed to integrate real-time pollution data and AI-driven user interactions. The architecture is divided into several key modules, each responsible for specific functionalities:

1. **User Interface**:
   - **Map Interface**: Provides an interactive map allowing users to explore different locations.
   - **Foldable Chat Box**: Enables users to interact with the system through a collapsible chat interface.

2. **Map Module**:
   - **Python-based Interactive Map**: The core functionality of the map, developed using Python.
   - **Toggleable Landmark Markers**: Allows users to toggle markers representing various landmarks on the map.
   - **Pollution Data Display**: Displays real-time pollution data directly on the map.
  
3. **Data Module**:
   - **Pollution Data Repository**: A database storing pollution data.
   - **Real-time Data Fetching & Updating**: Continuously fetches and updates real-time data to keep the map current.

4. **Backend Processing**:
   - **Data Integration & Processing**: Integrates and processes data from various sources.
   - **Database Communication**: Communicates with the database via an API to retrieve and store data.
  
5. **AI Module**:
   - **Gemini AI Chat System**: Provides AI-driven chat functionality for user interaction.
   - **Google Cloud Speech-to-Text Conversion**: Converts spoken queries into text for processing.
   - **Natural Language Processing (NLP) for Text Input**: Processes text input from users for intelligent responses.
  
## **AMITAC 2024 Innovation Competition**  
This project proudly represents the **AMITAC 2024 Innovation Competition**, showcasing Generative AI as a transformative tool for environmental awareness and public health.  

<img src="img/黃伶俐%20AMITAC%202024%20海報.png" alt="AMITAC Poster" style="width:100%; max-width:700px; margin-top:20px;">  

# <img src="img/logo.png" alt="Logo" width="50" style="margin-right: 10px;"> **Installation and Demo**  

### **Installation**  
1. Clone the repository to your local machine:  
   ```bash  
   git clone https://github.com/hnglingli/AI-Asissted-AQI-Map.git  
   ```  
2. Open the project files in your preferred code editor (e.g., Visual Studio Code).  
3. Set up your own API keys and dependencies at the JavaScript files on the chatbox files.  

### Demo

Explore this project at [hnglingli.com](http://www.hnglingli.com).
 
