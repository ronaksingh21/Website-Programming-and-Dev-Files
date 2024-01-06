(function () {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    let userMessage = null; // Variable to store user's message
    const inputInitHeight = chatInput.scrollHeight;
    
    const createChatLi = (message, className) => {
        // Create a chat <li> element with passed message and className
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi; // return chat <li> element
    }

    // Collects and outputs the TravelGPT AI response
    // Uses the OpenAI API to train and make the bot to be useful to the app
    const generateResponse = (chatElement) => {
        // Link for method to fetch response
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = chatElement.querySelector("p");
    
        // Creates constraints for the OpenAI bot
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Hid OpenAI key, following good computer science convention
                "Authorization": `Bearer ${getApiKey()}`
            },
            body: JSON.stringify({
                // Specific model we are using
                model: "gpt-3.5-turbo-1106",
                // Trains the AI that it is the More Travel AI assistant
                messages: [
                    { role: "system", content: "You are an AI assistant for More Travel, providing information about job opportunities, travel destinations, and more. In the website in which you are implemented in there is a variety of information from diversity in more travel, culture, hiring tips, testimonials, job-openings, an application, internship opportunities, benefits, and flexible work. Users can ask you about any information regarding these topics and you need to help them out. If you think it would be better to give the creators of the websites emails because we have better responses, Ritvik Bansal: ritvikbansal08@gmail.com, Ronak Singh: singhronak2008@gmail.com, Sai Lalith Kanumuri: sailalithkanumuri@gmail.com. Make sure you don't provide the email to every single person and only provide it if the user asks or if you truely believe you didn't answer the question effectively." },
                    { role: "user", content: userMessage }
                ]
            })
        };
    
        fetch(API_URL, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('API Response:', data);
                if (data.error) {
                    throw new Error(`OpenAI API Error: ${data.error.message}`);
                }
    
                const responseContent = data.choices[0]?.message?.content || "";
                messageElement.textContent = responseContent.trim();
            })
            .catch(error => {
                console.error('Error fetching or processing API response:', error);
                messageElement.textContent = "Oops! Something went wrong. Please try again.";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }


    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return;
        // Clear the input textarea and set its height to default
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

    function getApiKey() {
        // Replace "YOUR_ACTUAL_API_KEY" with your OpenAI API key
        return "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";
    }
})();