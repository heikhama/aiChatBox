"""
Routes and views for the flask application.
"""

from datetime import datetime
import subprocess
from flask import jsonify, render_template, request
from aiChatBox import app
from aiChatBox.ollamachat import OllamaChat

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'aitool.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/aichat')
def aichat():
    """Renders the aichat page."""
    return render_template(
        'aichat.html',
        title='aichat',
        year=datetime.now().year,
        message='Your aichat page.'
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )

# Initialize the OllamaChat instance with DeepSeek-R1 (14B)
chatbot = OllamaChat(model="deepseek-r1:14b")

# Chat route to interact with DeepSeek-R1 via Ollama
# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.json
#     prompt = data.get('prompt', '')

#     if not prompt:
#         return jsonify({"error": "Prompt is empty"}), 400

#     # Run DeepSeek-R1 model via Ollama
#     response = subprocess.run(["ollama", "run", "deepseek-r1:14b", prompt], capture_output=True, text=True)

#     # Get the model's output
#     reply = response.stdout.strip()

#     return jsonify({"reply": reply})
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({"error": "Prompt is empty"}), 400

    # Use the OllamaChat class to send a message
    response = chatbot.send_message(prompt)

    return jsonify({"reply": response})