from wiseSerial import WISENode
from flask import Flask, request, send_from_directory
import threading
import sys
import os

# Add the parent directory of 'tests' to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from utils.argument_parser import parse_arguments
from utils.file_handler import check_static_folder, check_baudrate, modify_web_utility_param_js
from utils.wisedata_handler import process_binary_request

# Create a Flask web server application
app = Flask(__name__, static_folder='../WebUtility/WISE-4x71/config')
# Create a global lock to ensure single-threaded access when handling REST commands
request_lock = threading.Lock()

# Serve the index page when accessing the root URL
@app.route('/index.html')
@app.route('/config')
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.before_request
def log_request_info():
    print(f"Before Request - Path: {request.path}, Method: {request.method}, URL: {request.url}")

# Catch all other paths to serve files directly or process requests
@app.route('/<path:path>', methods=['GET', 'POST', 'PATCH', 'PUT'])
def catch_get_all(path):
    print(f"Request path: {path}")
    print(f"Request method: {request.method}")
    with request_lock:  # Use lock to ensure only one request is processed at a time, with a timeout to prevent deadlocks
        segments = path.split('/')
        file_path = '/'.join(segments[1:])  # Extract the file path from the segments
        json_data = request.get_data().decode('utf-8')  # Get request data in UTF-8 format

        try:
            # Try serving the file directly from the directory
            print(f"Serving file: {file_path}")
            return send_from_directory(app.static_folder, file_path)
        except Exception as e:
            # If the file cannot be served, handle it as a binary REST command
            print(f"This is REST Command: {path}")
            tmp = process_binary_request(wiseNode, path, json_data)
            return tmp

############# Main #############
# Parse command line arguments
args = parse_arguments()

# Set the static folder of the web server
staticFolder = check_static_folder(args.model)
app.static_folder = "../WebUtility/" + staticFolder + "/config"
print(f"Static folder: {app.static_folder}")

# Check if the static folder exists and is a directory
if not os.path.exists(app.static_folder) or not os.path.isdir(app.static_folder):
    print(f"Static folder {app.static_folder} does not exist or is not a directory.")
    sys.exit()

# Check if the serial port is valid
if not args.serial_port:
    print("Serial port is required.")
    sys.exit()

# Get the baudrate for the specified model
baudrate = check_baudrate(args.model)
print(f"Baudrate for model {args.model}: {baudrate}")

# Create WISE node instance for communication
wiseNode = WISENode(args.serial_port, args.model)
fw_region_ver = wiseNode.send_rest("GET", "sys_info", "")["content"]["Id"]
modify_web_utility_param_js(app.static_folder, fw_region_ver)

# Run the web server on the specified port
app.run(host='0.0.0.0', port=args.net_port, debug=True if args.verbose else False)
