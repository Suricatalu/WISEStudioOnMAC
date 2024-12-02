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
    file = """------WebKitFormBoundary4bsjnFBal61XFvl1
Content-Disposition: form-data; name="length"

1468
------WebKitFormBoundary4bsjnFBal61XFvl1
Content-Disposition: form-data; name="type"

12
------WebKitFormBoundary4bsjnFBal61XFvl1
Content-Disposition: form-data; name="file"; filename="sf-class2-root.pem"
Content-Type: application/x-x509-ca-cert

-----BEGIN CERTIFICATE-----
MIIEDzCCAvegAwIBAgIBADANBgkqhkiG9w0BAQUFADBoMQswCQYDVQQGEwJVUzEl
MCMGA1UEChMcU3RhcmZpZWxkIFRlY2hub2xvZ2llcywgSW5jLjEyMDAGA1UECxMp
U3RhcmZpZWxkIENsYXNzIDIgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMDQw
NjI5MTczOTE2WhcNMzQwNjI5MTczOTE2WjBoMQswCQYDVQQGEwJVUzElMCMGA1UE
ChMcU3RhcmZpZWxkIFRlY2hub2xvZ2llcywgSW5jLjEyMDAGA1UECxMpU3RhcmZp
ZWxkIENsYXNzIDIgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwggEgMA0GCSqGSIb3
DQEBAQUAA4IBDQAwggEIAoIBAQC3Msj+6XGmBIWtDBFk385N78gDGIc/oav7PKaf
8MOh2tTYbitTkPskpD6E8J7oX+zlJ0T1KKY/e97gKvDIr1MvnsoFAZMej2YcOadN
+lq2cwQlZut3f+dZxkqZJRRU6ybH838Z1TBwj6+wRir/resp7defqgSHo9T5iaU0
X9tDkYI22WY8sbi5gv2cOj4QyDvvBmVmepsZGD3/cVE8MC5fvj13c7JdBmzDI1aa
K4UmkhynArPkPw2vCHmCuDY96pzTNbO8acr1zJ3o/WSNF4Azbl5KXZnJHoe0nRrA
1W4TNSNe35tfPe/W93bC6j67eA0cQmdrBNj41tpvi/JEoAGrAgEDo4HFMIHCMB0G
A1UdDgQWBBS/X7fRzt0fhvRbVazc1xDCDqmI5zCBkgYDVR0jBIGKMIGHgBS/X7fR
zt0fhvRbVazc1xDCDqmI56FspGowaDELMAkGA1UEBhMCVVMxJTAjBgNVBAoTHFN0
YXJmaWVsZCBUZWNobm9sb2dpZXMsIEluYy4xMjAwBgNVBAsTKVN0YXJmaWVsZCBD
bGFzcyAyIENlcnRpZmljYXRpb24gQXV0aG9yaXR5ggEAMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAAWdP4id0ckaVaGsafPzWdqbAYcaT1epoXkJKtv3
L7IezMdeatiDh6GX70k1PncGQVhiv45YuApnP+yz3SFmH8lU+nLMPUxA2IGvd56D
eruix/U0F47ZEUD0/CwqTRV/p2JdLiXTAAsgGh1o+Re49L2L7ShZ3U0WixeDyLJl
xy16paq8U4Zt3VekyvggQQto8PT7dL5WXXp59fkdheMtlb71cZBDzI0fmgAKhynp
VSJYACPq4xJDKVtHCN2MQWplBqjlIapBtJUhlbl90TSrE9atvNziPTnNvT51cKEY
WQPJIrSPnNVeKtelttQKbfi3QBFGmh95DmK/D5fs4C8fF5Q=
-----END CERTIFICATE-----

------WebKitFormBoundary4bsjnFBal61XFvl1--
"""
    wiseNode = WISENode("/dev/tty.SLAB_USBtoUART", "WISE-4671")
    # jsonRes = wiseNode.send_rest("GET", "logsys_output?s=1730803799584", "")
    # print("Response:")
    # print(jsonRes)
    jsonRes = wiseNode.send_rest("POST", "file_xfer", file)
    print("Response:")
    print(jsonRes)
    
    del wiseNode