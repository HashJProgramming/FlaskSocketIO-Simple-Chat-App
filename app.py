from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send/<message>')
def send(message : str):
  
    data = {'name' : 'user', 'message': message}
    socketio.emit('message', data)
    return jsonify(data)

@socketio.on('connect')
def handle_connect():
    ip_address = request.remote_addr
    print(f'{ip_address}: connected')


@socketio.on('disconnect')
def handle_disconnect():
    ip_address = request.remote_addr
    print(f'{ip_address}: connected')

# Simple Chat App - HASH-X
if __name__ == '__main__':
    socketio.run(app, debug=True)