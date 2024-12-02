import serial
import json

class WISENode:
    def __init__(self, port: str, model: str) -> None:
        self.wiseNodInfo = {}
        wiseNodeInfoFile = "config/wiseNodeInfo.json"
        try:
            with open(wiseNodeInfoFile, 'r') as json_file:
                self.wiseNodInfo = json.load(json_file)[model]
        except FileNotFoundError:
            print(f"The file {wiseNodeInfoFile} does not exist.")
        except json.JSONDecodeError:
            print(f"Error decoding JSON from the file {wiseNodeInfoFile}.")
        
        self.ser = serial.Serial(port, self.wiseNodInfo["baudrate"], timeout=0.3)
    
    def __del__(self):
        self.ser.close()

    def __crc8(self, data: bytes, initial_value: int = 0xFF) -> int:
        crc = initial_value
        polynomial = 0x07  # CRC-8-CCITT polynomial

        for byte in data:
            crc ^= byte
            for _ in range(8):
                if crc & 0x80:
                    crc = ((crc << 1) ^ polynomial) & 0xFF
                else:
                    crc = (crc << 1) & 0xFF
        return crc
    
    def __package_wise_frame(self, restUrl: str, restContent: str, format: str = "REST"):
        header_data = b'\x7E'
        
        raw_data = restUrl.encode('ascii')
        if format == "ASCII":
            raw_data += b'\x0D\x0A'
        else:
            if restUrl[:3] != "GET":
                raw_data += b'\x0D\x0AContent-Length: ' + str(len(restContent)).encode('ascii')
            raw_data += b'\x0D\x0A\x0D\x0A'
        if restUrl[:3] != "GET":
            raw_data += restContent.encode('ascii')

        crc_data = self.__crc8(raw_data).to_bytes(1)

        len_val = len(raw_data) + 1
        len_data = len_val.to_bytes(length=2, byteorder='little')

        data = header_data + len_data + raw_data + crc_data
        # print(list(map(hex, data)))

        return data
    
    def _organizeRes(self, data, datatype, method):
        ret = {
            "header": "",
            "content": {}
        }
        if datatype == "seperated":
            bytes_data = b''.join(data)
            header_raw = bytes_data.split(b'~')[1]
            header = header_raw[2:header_raw[0]+header_raw[1]*256+1]
            ret["header"] = header.decode('ascii')
            if method == "GET":
                content_raw = bytes_data.split(b'~')[2]
                content = content_raw[2:content_raw[0]+content_raw[1]*256+1]
                ret["content"] = json.loads(content.decode('ascii'))
        elif datatype == "combined":
            bytes_data = b''.join(data)
            data_raw = bytes_data[3:bytes_data[1]+bytes_data[2]*256+2]
            data_str = data_raw.decode('ascii')
            # print("data_str")
            # print(data_str)
            if method == "GET":
                ret["header"] = data_str[:data_str.index("{\"")-1]
                ret["content"] = json.loads(data_str[data_str.index("{\""):])
            else:
                ret["header"] = data_str
        elif datatype == "log":
            bytes_data = b''.join(data)
            header_raw = bytes_data.split(b'~')[1]
            header = header_raw[2:header_raw[0]+header_raw[1]*256+1]
            ret["header"] = header.decode('ascii')
            content = ''
            for element in bytes_data.split(b'~')[2:]:
                content += element[2:element[0]+element[1]*256+1].decode('ascii')
            ret["content"] = json.loads(content)
            
        return ret

    def send_rest(self, restMethod: str = "GET", restUrl: str = "", restContent: str = ""):
        if 'expansion_bit' in restUrl or 'expansion_word' in restUrl:
            self.ser.timeout = 1
        elif 'file_xfer' in restUrl:
            self.ser.timeout = 5
        else:
            self.ser.timeout = 0.3
        
        restCommand = restMethod + " /" + restUrl + " HTTP/1.1"
        self.ser.write(self.__package_wise_frame(restCommand, restContent, format))
        tmp = self.ser.readlines()

        data = {
            "header": b'',
            "content": b''
        }
        if not tmp:
            return data
        
        if "logsys_message" in restUrl or "log_message" in restUrl:
            data = self._organizeRes(tmp, "log", restMethod)
            return data

        data = self._organizeRes(tmp, self.wiseNodInfo["restformat"], restMethod)
        return data

if __name__ == "__main__":
    pass