from flask import Response, request, jsonify
import json

def process_binary_request(wiseNode, path, content):
    """Processes a binary REST command and sends it to the WISE node.
    
    Args:
        path (str): The path of the request.
        content (str): The content of the request.

    Returns:
        Response: The response object containing headers and body content.
    """

    # print("reqContent")
    # print(content)

    # Send REST request to WISE node
    res_json_data = wiseNode.send_rest(request.method, path, content)
    # print("resContent")
    # print(res_json_data)

    headers = {}
    body = ""  # Initialize body as a string for consistent data type

    # Parse response headers
    for line in res_json_data["header"].split('\r\n'):
        header_line = line.strip()
        if ':' in header_line:
            key, value = header_line.split(':', 1)
            headers[key.strip()] = value.strip()

    # Set response body content if the request is GET
    if request.method == "GET":
        body = res_json_data["content"]

    # Create a response object with headers and body
    response = Response(body, content_type='application/json')
    for key, value in headers.items():
        response.headers[key] = value

    return jsonify(body)  # Return JSON response
