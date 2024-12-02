import argparse

def parse_arguments():
    # Create an argument parser with options for model, serial port, network port, and verbosity
    parser = argparse.ArgumentParser(description="Example of handling command line arguments.")
    
    # Add arguments
    parser.add_argument('--model', type=str, required=True, help="Specify the model name of WISE node, e.g., WISE-2410")
    parser.add_argument('--serial_port', type=str, required=True, help="Specify the serial port, e.g., /dev/tty01")
    parser.add_argument('--net_port', type=int, required=True, help="Specify the network port, e.g., 8083")
    parser.add_argument('-v', '--verbose', action='store_true', help="Enable verbose mode")

    # Parse the arguments
    args = parser.parse_args()

    # Print the arguments if verbose mode is enabled
    if args.verbose:
        print(f"Model Name: {args.model}")
        print(f"Serial Port: {args.serial_port}")
        print(f"Network Port: {args.net_port}")
        print("Verbose mode enabled")

    return args
