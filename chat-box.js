// Variable to store rules globally so we don't fetch every time
let chatRules = null;

// 1. Function to Open/Close the Chatbox
function toggleChat() {
    const chatBox = document.getElementById("chat-box");
    chatBox.classList.toggle("hidden");
    
    // Load rules only once when the chat is first opened
    if (!chatRules) {
        loadRules();
    }
}

// 2. Pre-load the 100+ rules for better speed
async function loadRules() {
    try {
        const response = await fetch("rules.json");
        chatRules = await response.json();
        console.log("Rules loaded successfully");
    } catch (e) {
        console.error("Could not load rules.json", e);
    }
}

// 3. Handle sending messages
async function sendMsg() {
    const input = document.getElementById("userInput");
    const display = document.getElementById("chat-display");
    
    const rawText = input.value.trim();
    const cleanText = rawText.toLowerCase().replace(/[?.,!]/g, ""); 
    
    if (!cleanText) return;

    // Show User Message
    display.innerHTML += `<p style="text-align:right"><b>You:</b> ${rawText}</p>`;
    input.value = ""; 

    // If rules haven't loaded yet
    if (!chatRules) {
        display.innerHTML += `<p style="color:red">Bot is waking up... please wait a second.</p>`;
        await loadRules();
    }

    // Split sentence into words to handle long sentences
    const words = cleanText.split(" ");
    let botReply = "";

    // Search for a matching key in your 100+ rules
    for (let word of words) {
        if (chatRules[word]) {
            botReply = chatRules[word];
            break; 
        }
    }

    // Default response if no keyword is found
    if (!botReply) {
        botReply = chatRules["default"] || "I'm not sure I understand.try to be more meaningful, make sure you use english.";
    }

    // Show Bot Response
    display.innerHTML += `<p class="bot-msg"><b>aura Bot:</b> ${botReply}</p>`;
    
    // Auto-scroll
    display.scrollTop = display.scrollHeight; 
}
