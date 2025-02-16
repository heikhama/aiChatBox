document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') sendMessage();
    });

    async function sendMessage() {
        const prompt = userInput.value.trim();
        if (!prompt) {
            alert("Write something");
            return;
        }
        // Show the loading bar
        document.getElementById("loading-bar").classList.remove("hidden");
        // Show the loading spinner
        document.getElementById("loading-spinner").classList.remove("hidden");

        // Display user's message
        appendMessage(prompt, 'user');
        userInput.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            // Hide the loading bar once the response is received
            document.getElementById("loading-bar").classList.add("hidden");
            // Hide the loading spinner once the response is received
            document.getElementById("loading-spinner").classList.add("hidden");

            const data = await response.json();
            if (response.ok) {
                appendMessage(data.reply, 'bot');
            } else {
                appendMessage('Error: ' + data.error, 'bot');
            }
        } catch (error) {
            appendMessage('Server error. Try again later.', 'bot');
        }
    }

    function appendMessage(text, sender) {
        const message = document.createElement('div');
        message.className = `p-2 rounded-lg my-1 ${sender === 'user' ? 'bg-blue-500 text-right' : 'bg-gray-700 text-left'}`;
        message.textContent = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
