import json
import sys

def check_static_folder(model: str) -> str:
    """Checks and returns the static folder for the given model from wiseNodeInfo.json."""
    wiseNodeInfoFile = "config/wiseNodeInfo.json"
    wiseNodInfo = {}
    
    try:
        with open(wiseNodeInfoFile, 'r') as json_file:
            # Load model info from JSON file
            wiseNodInfo = json.load(json_file).get(model, {})
            if not wiseNodInfo:
                raise KeyError(f"Model '{model}' not found in the JSON file.")
    except FileNotFoundError:
        print(f"The file {wiseNodeInfoFile} does not exist.")
        sys.exit()
    except json.JSONDecodeError:
        print(f"Error decoding JSON from the file {wiseNodeInfoFile}.")
        sys.exit()
    except KeyError as e:
        print(str(e))
        sys.exit()

    # Get the GUI folder for the specified model
    ret = wiseNodInfo.get("guifolder", "")
    if ret == "":
        print("The model is not supported by this tool")
        sys.exit()

    return ret

def check_baudrate(model: str) -> int:
    """Checks and returns the baudrate for the given model from wiseNodeInfo.json."""
    wiseNodeInfoFile = "config/wiseNodeInfo.json"
    wiseNodInfo = {}
    
    try:
        with open(wiseNodeInfoFile, 'r') as json_file:
            # Load model info from JSON file
            wiseNodInfo = json.load(json_file).get(model, {})
            if not wiseNodInfo:
                raise KeyError(f"Model '{model}' not found in the JSON file.")
    except FileNotFoundError:
        print(f"The file {wiseNodeInfoFile} does not exist.")
        sys.exit()
    except json.JSONDecodeError:
        print(f"Error decoding JSON from the file {wiseNodeInfoFile}.")
        sys.exit()
    except KeyError as e:
        print(str(e))
        sys.exit()

    # Get the baudrate for the specified model
    ret = wiseNodInfo.get("baudrate", "")
    if ret == "":
        print("The model is not supported by this tool")
        sys.exit()

    return ret

def modify_web_utility_param_js(folder: str, region_ver: str):
    """Modifies the 'parameter.js' file in the specified folder with the given region version."""
    parameter_js_path = f"{folder}/parameter.js"
    try:
        with open(parameter_js_path, "w+") as f:
            f.write(f"var module = \"{region_ver}\";\nvar SLOT_NUMBER = 0;")
            f.truncate()
    except FileNotFoundError:
        print(f"The file {parameter_js_path} does not exist and could not be created.")
        sys.exit()
    except IOError as e:
        print(f"An I/O error occurred: {e}")
        sys.exit()
