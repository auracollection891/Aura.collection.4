// 1. THE BRAIN
const rawData = {
  "hello": "Hey there! I'm your AI sidekick. Ready to find some awesome earrings?",
  "hi": "Hi! Looking for something sparkly today? I'm here to help!",
  "hey": "Yo! Need a hand with your order or just browsing the drip?",
  "help": "Don't sweat it, I've got you! What’s the mission today?",
  "support": "Something glitching? Tell me what's up and we'll fix it together?",
  "order": "Easy peasy! Just pick your favorite earrings, hit the order button, and fill out the quick form. Boom—done!",
  "track": "Wanna know where your treasure is? WhatsApp i want to track order to 919814056258",
  "payment": "We keep it simple: Cash on Delivery only right now. Pay when the magic arrives!",
  "refund": "Ouch, not feeling it? Check out our policies first so we’re on the same page.",
  "cancel": "Changed your mind? No worries. Message cancel order to 919814056258",
  "shipping": "We ship everywhere! Speed depends on your location.",
  "delivery": "Patience is a virtue! Your earrings should arrive in 2 to 5 days.",
  "price": "No hidden math here! All prices are listed right on the product pages.",
  "discount": "Love a good deal? Scope out the offers section for some sweet steals!",
  "offer": "New here? Grab 10 percent off your first order! Treat yourself.",
  "login": "No passwords to remember here! We use a simple form system to keep things fast.",
  "signup": "Skip the paperwork! Just fill in your details when you're ready to buy.",
  "register": "Registration? Nah. Just fill out the form when you click Order and you're golden!",
  "account": "Your data is locked up tighter than a bank vault. You're safe with us!",
  "email": "Drop your email so we can stay in touch!",
  "mobile": "Hit me with those digits so we can confirm your delivery!",
  "otp": "Check your phone! I just sent a secret code your way.",
  "verify": "Double-check those details for me real quick. Accuracy is key!",
  "success": "Mission accomplished! Everything went through perfectly.",
  "failed": "Abort mission! Something went wrong. Give it another shot?",
  "error": "My circuits got crossed. Try again in a minute!",
  "issue": "Spill the tea. What's the problem? I'm listening.",
  "problem": "Hang tight! I'm working behind the scenes to smooth things over.",
  "contact": "Need a human? Reach out anytime, we don't bite!",
  "call": "Our support squad is just a phone call away. Check the contact page!",
  "chat": "You’re vibing with the official support bot. How can I help?",
  "agent": "Sending in the reinforcements! Connecting you to a human now.",
  "wait": "Just a sec... my brain is processing greatness.",
  "thanks": "You're the best! Thanks for choosing us for your style needs!",
  "thankyou": "We appreciate the love! Stay stylish.",
  "bye": "Catch ya later! Hope your day is as bright as our earrings.",
  "goodbye": "See you soon! Don't be a stranger.",
  "morning": "Rise and shine! Ready to add some sparkle to your day?",
  "afternoon": "Good afternoon! Time for a little midday shopping?",
  "evening": "Good evening! Looking for that perfect pair for tonight?",
  "night": "Night owl mode activated. Stay safe and stay stylish!",
  "location": "Where are we sending the goods? Drop your location!",
  "address": "Make sure that address is 100 percent correct so your earrings don't get lost!",
  "update": "Done! Your info is now fresh and updated.",
  "change": "Switch it up! You can adjust your settings whenever you want.",
  "privacy": "Your business is your business. We keep your privacy on lock.",
  "policy": "The legal stuff is all on our website. Check it out!",
  "terms": "Just the usual rules—give them a quick thumbs up to proceed!",
  "secure": "Fully encrypted and totally safe. No hackers allowed!",
  "safe": "We use the best tech to keep your shopping experience worry-free.",
  "fast": "Zoom! Our service is built for speed and reliability.",
  "product": "Go ahead, take a look! Our collection is fire.",
  "items": "We’ve got a huge variety of handmade gems waiting for you.",
  "stock": "It's here and it's hot! Grab it before it's gone.",
  "outofstock": "Ouch, too slow! This one’s gone, but check out our other heat.",
  "quality": "Handmade with love and top-tier materials. Only the best for you!",
  "warranty": "We stand by our craft. Check the product page for the details!",
  "return": "Not a match? Returns are cool within 7 days.",
  "feedback": "Tell me the truth—how are we doing? Your word is law!",
  "review": "If you love them, shout it from the rooftops or just leave a review!",
  "status": "Check your order's journey anytime online!",
  "history": "Take a trip down memory lane and see your past style picks.",
  "home": "Heading back to the main stage!",
  "owner": "The legend himself? That's rkg. He built this whole site and created me from scratch!",
  "why this website invented": "We're here to share beautiful, handmade jewellery with the world. Art you can wear!",
  "anime": "I don't have eyes to watch it, but my creator is obsessed! He loves it!",
  "useless": "Hey, give me a break! I'm still learning the ropes.",
  "trash": "My bad! Even AI has off days. Let me make it up to you.",
  "name": "my name is aura bot,i am your assistant how can i help you ?",
  "introduce": "hi, i am aura bot ,got created by rkg in 2026 ,my now running model is rk1.0.0,i designed and created to help you"
};

const aiBrain = Object.keys(rawData).map(key => ({
    keyword: key.toLowerCase(),
    response: rawData[key]
}));

// 2. STATE CONTROLLERS
let isProcessing = false; // The Master Lock
let hasGreeted = false;

// 3. VOICE ENGINE
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false; // Only one command per click

// 4. THE LOGIC (The Gatekeeper)
recognition.onresult = (event) => {
    // If we already found a match in this session, stop
    if (isProcessing) return;

    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    document.getElementById('ai-status').innerText = `I heard: "${transcript}"`;

    const match = aiBrain.find(item => transcript.includes(item.keyword));

    if (match) {
        isProcessing = true; // Lock the system immediately
        
        const speech = new SpeechSynthesisUtterance(match.response);
        speech.rate = 1.0; // Fast speed
        
        speech.onend = () => {
            isProcessing = false; // Unlock only after talking is 100% done
            cleanupUI();
        };

        window.speechSynthesis.speak(speech);
    }
};

// 5. UI RESET
function cleanupUI() {
    document.getElementById('voice-btn').classList.remove('listening');
    setTimeout(() => {
        if (!isProcessing) {
            document.getElementById('ai-status').innerText = "Standby";
        }
    }, 5000);
}

recognition.onend = () => {
    // If the mic turns off but we aren't talking, unlock the button
    if (!isProcessing) {
        cleanupUI();
    }
};

recognition.onerror = () => {
    isProcessing = false;
    cleanupUI();
};

// 6. THE TRIGGER (Anti-Spam)
document.getElementById('voice-btn').onclick = () => {
    // 1. First-time Greeting
    if (!hasGreeted) {
        const greet = new SpeechSynthesisUtterance("System Online.");
        greet.rate = 1.0;
        window.speechSynthesis.speak(greet);
        hasGreeted = true;
    }

    // 2. Anti-Spam Check
    if (isProcessing) {
        console.log("System busy. Click ignored.");
        return;
    }

    // 3. Start Listening
    try {
        recognition.start();
        document.getElementById('ai-status').innerText = "🔴 LISTENING...";
        document.getElementById('voice-btn').classList.add('listening');
    } catch (e) {
        console.log("Mic already on.");
    }
};
