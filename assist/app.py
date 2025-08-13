from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='static', template_folder='templates')

def interpret_command(user_command):
    user_command = user_command.lower()
    if "on" in user_command and "light" in user_command:
        return "💡 Lights turned ON!"
    elif "off" in user_command and "light" in user_command:
        return "🔌 Lights turned OFF!"
    elif "weather" in user_command:
        return "🌤 It's sunny and 27°C"
    elif "remind" in user_command:
        return "🔔 Reminder set!"
    else:
        return "🤖 Sorry, I didn't understand that command."

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/command', methods=['POST'])
def handle_command():
    data = request.get_json()
    user_command = data.get("command", "")
    response = interpret_command(user_command)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)