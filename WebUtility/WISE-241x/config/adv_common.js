var HTTP_GET = "GET";
var HTTP_PATCH = "PATCH";
var HTTP_POST = "POST";
var URL_BASE = "/";
// var URL_BASE = "http://localhost/rest.php/wise2410/";
var ABSOLUTE_PATH = '/config';
var ADVANTECH_NETWROK = "net_basic";
var ADVANTECH_PROFILE = "profile";
var ADVANTECH_SYS_INFO = 'sys_info';
var ADVANTECH_NETWROK_APP = 'net_config';
var ADVANTECH_DEVICE_CONTROL = 'control';
var ADVANTECH_WLAN_CONFIG = "wlan_config";
var URL_SYS_INFO = URL_BASE + ADVANTECH_SYS_INFO;
var URL_NETWROK = URL_BASE + ADVANTECH_NETWROK;
var URL_NETWROK_APP = URL_BASE + ADVANTECH_NETWROK_APP;
var URL_ACCESS_CTRL = URL_BASE + "accessctrl";
var URL_DATA_STREAM = URL_BASE + "datastream";
var URL_SLOT_INFO = URL_BASE + "slotinfo";
var URL_MODBUS_COIL_CONFIG = URL_BASE + "modbus_coilconfig";
var URL_MODBUS_REGISTER_CONFIG = URL_BASE + "modbus_regconfig";
var URL_MODBUS_COIL_VAL_BASE = URL_BASE + "modbus_coilbas";
var URL_MODBUS_REGISTER_VAL_BASE = URL_BASE + "modbus_regbas";
var URL_MODBUS_COIL_LENGTH = URL_BASE + "modbus_coillen";
var URL_MODBUS_REGISTER_LENGTH = URL_BASE + "modbus_reglen";
var URL_FILE_TRANSFER = URL_BASE + "file_xfer";
var URL_DI_VALUE = URL_BASE + "di_value";
var URL_DI_CONFIG = URL_BASE + "di_config";
var URL_DO_VALUE = URL_BASE + "do_value";
var URL_DO_CONFIG = URL_BASE + "do_config";
var URL_AI_GEN_CONFIG = URL_BASE + "ai_genconfig"
var URL_AI_VALUE = URL_BASE + "ai_value";
var URL_AI_CONFIG = URL_BASE + "ai_config";
var URL_AO_VALUE = URL_BASE + "ao_value";
var URL_AO_CONFIG = URL_BASE + "ao_config";
var URL_UI_CONFIG = URL_BASE + "uio_config";
var URL_WLAN_CONFIG = URL_BASE + ADVANTECH_WLAN_CONFIG;
var URL_WLAN_STATUS = URL_BASE + "wlan_value";
var URL_LPWAN_LIST = URL_BASE + "lpwan_list";
var URL_LPWAN_VALUE = URL_BASE + "lpwan_value";
var URL_LPWAN_CONFIG = URL_BASE + "lpwan_config";
var URL_LPWAN_APP = URL_BASE + "lpwan_app";
var URL_LPWAN_MODBUS = URL_BASE + "lpwan_modbus";
var URL_LPWAN_OUTPUT = URL_BASE + "lpwan_output";
var URL_LPWAN_MESSAGE = URL_BASE + "lpwan_message";
var URL_LPWAN_WRITESTATUS = URL_BASE + "lpwan_status";
var URL_LPWAN_SETTING_LIST = URL_BASE + "lpwan_settinglist";
var URL_PROFILE = URL_BASE + ADVANTECH_PROFILE;
var URL_DEVICE_CONTROL = URL_BASE + ADVANTECH_DEVICE_CONTROL;
var URL_P2P_MODE = URL_BASE + "p2p_mode";
var URL_P2P_BASIC = URL_BASE + "p2p_basic";
var URL_P2P_ADVANCED_SLOT = URL_BASE + "p2p_advanced/slot_";
var URL_LOG_DATA_OPTION = URL_BASE + "log_dataoption";
var URL_LOGSYS_DATA_OPTION = URL_BASE + "logsys_dataoption";
var URL_LOG_DATA_CONTROL = URL_BASE + "log_control";
var URL_LOG_DATA_OUTPUT = URL_BASE + "log_output";
var URL_LOGSYS_DATA_OUTPUT = URL_BASE + "logsys_output";
var URL_LOG_DATA_MESSAGE = URL_BASE + "log_message";
var URL_LOGSYS_DATA_MESSAGE = URL_BASE + "logsys_message";
var URL_LOG_PUSH_OUTPUT = URL_BASE + "push_output";
var URL_GENERAL_CONFIG = URL_BASE + "gen_config";
var URL_LOG_DATA_EVENT = URL_BASE + "log_event";
var URL_LOG_LOG_SWITCH = URL_BASE + "log_switch";
var URL_LOG_DATA_LOG_UPLOAD = URL_BASE + "log_upload";
var URL_LOG_DATA_DEV_OUTPUT = URL_BASE + "logex_output/idx_";
var URL_LOG_DATA_DEV_LIST = URL_BASE + "logex_list/idx_";
var URL_LOG_DATA_DEV_LIST = URL_BASE + "logex_list/idx_";
var URL_CLOUD_CONFIG = URL_BASE + "cloud_config";
var URL_CLOUD_STATUS = URL_BASE + "cloud_value";
var URL_WEBACCESS_CLOUD_CONFIG = URL_BASE + "wacloud_config";
var URL_SERIAL_PORT_CONFIG = URL_BASE + "serial_config";
var URL_MODBUS_SLAVE_GEN_CONFIG = URL_BASE + "modbusserver_genconfig";
var URL_MODBUS_SLAVE_CONFIG = URL_BASE + "modbusserver_config";
var URL_MODBUS_SLAVE_STATUS = URL_BASE + "modbusserver_status";
var URL_EXPANSION_BIT = URL_BASE + "expansion_bit";
var URL_EXPANSION_WORD = URL_BASE + "expansion_word";
var URL_SENSOR_CONFIG = URL_BASE + "sensor_config";
var URL_SENSOR_VALUE = URL_BASE + "sensor_value";
var URL_GENERAL_STATUS = URL_BASE + "gen_status";
var URL_SENSOR_MEASURE = URL_BASE + "sensor_measure";
var URL_SITE_SURVEY_CONFIG = URL_BASE + "lpwan_siteconfig";
var URL_SITE_SURVEY_STATUS = URL_BASE + "lpwan_sitestatus";

var Advantech = Advantech || {};
var isLoadingHtmlPage = false; //prevent too much page loading
var dataViewerWebWorker = undefined;
var sysDataViewerWebWorker = undefined;

$.extend(true, Advantech, {
    Profile: {
		VCOM_CONNECTION: false,
        Parameter:{
            POLLING_RATE:1000
        },
        WEB_ERROR_CODE:{
            "400":"Bad Request. The request could not be understood by the server due to malformed syntax. Please check parameters.",
            "403":"Forbidden. Authentication Failed. Please Re-login.",
            "404":"File Not Found",
            "405":"Method Not Allowed",
            "409":"Conflict",
            "411":"Length Required",
            "500":"Internal Server Error",
            "503":"Service Unavailable"
        },
        INVALID_VALUE:"****",
        COMMON_CONFIG_KEY:"common",
        TrendColorEmun:["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728",
                        "#9467bd", "#8c564b", "#e377c2", "#bcbd22",
                        "#17becf", "#aec7e8", "#98df8a", "#ff9896",
                        "#c5b0d5", "#c49c94", "#f7b6d2", "#dbdb8d",
                        "#9edae5", "#bd9e39", "#e7ba52", "#e7cb94",
                        "#FFFF00", "#00DD00", "#0000FF", "#7700FF",
                        "#000000", "#8B4513", "#FF0000", "#FF6347",
                        "#FFFF00", "#00DD00", "#0000FF", "#7700FF"
        ],
        DATA_LOG_STATUS:{
            "0" :"Normal",
            "1" :"Built-in logging is out of memory(No space left)",
            "2" :"Built-in memory errors",
            "4" :"Built-in logging is out of memory for System log(No space left)",
            "8" :"Cloud upload fail",
            "16":"Cloud push fail",
            "32":"Reserved",
            "64":"Reserved"
        },
        AIValueDisplayEmun:{
            "VALUE":0,
            "MIN":1,
            "MAX":2
        },
        AIRangeEmun:{
            "259":"+/- 150 mV",
            "260":"+/- 500 mV",
            "261":"0 ~ 150 mV",
            "262":"0 ~ 500 mV",
            "320":"+/- 1 V",
            "321":"+/- 2.5 V",
            "322":"+/- 5 V",
            "323":"+/- 10 V",
            "325":"0 ~ 1 V",
            "327":"0 ~ 5 V",
            "328":"0 ~ 10 V",
            "384":"4 ~ 20 mA",
            "385":"+/- 20 mA",
            "386":"0 ~ 20 mA",
            "480":"UDI",
            "65535":"****"
        },
		WISE_4012_RangeEmun:{
            "385":"+/- 20 mA",
            "259":"+/- 150 mV",
            "260":"+/- 500 mV",
            "386":"0 ~ 20 mA",
            "261":"0 ~ 150 mV",
            "262":"0 ~ 500 mV",
            "384":"4 ~ 20 mA",
            "320":"+/- 1 V",
            "322":"+/- 5 V",
            "323":"+/- 10 V",
            "325":"0 ~ 1 V",
            "327":"0 ~ 5 V",
            "328":"0 ~ 10 V",
            "480":"UDI",
            "65535":"****"
        },
        AIRangeInfoEmun:{
            "259":{min:-150, max:150, unit:"mV"},
            "260":{min:-500, max:500, unit:"mV"},
            "261":{min:0, max:150, unit:"mV"},
            "262":{min:0, max:500, unit:"mV"},
            "320":{min:-1, max:1, unit:"V"},
            "321":{min:-2.5, max:2.5, unit:"V"},
            "322":{min:-5, max:5, unit:"V"},
            "323":{min:-10, max:10, unit:"V"},
            "325":{min:0, max:1, unit:"V"},
            "327":{min:0, max:5, unit:"V"},
            "328":{min:0, max:10, unit:"V"},
            "384":{min:4, max:20, unit:"mA"},
            "385":{min:-20, max:20, unit:"mA"},
            "386":{min:0, max:20, unit:"mA"},
            "480":{min:-1, max:2, unit:""},
            "65535":{min:"****", max:"****", unit:"****"}
        },
        AISamplingSpeedEmun:{
            "0": "10 Hz/Ch",
            "1": "100 Hz/Ch",
            "2": "1000 Hz/Ch",
            "3": "1 Hz/Ch",
            "128": "10 Hz/Total"
        },
        AIBurnOutScaleModeEmun:[
            "Down scale",
            "Up scale"
        ],
        AIIntegrationModeEmun:{
            "0": "Auto(50/60Hz)",
            "1": "50 Hz",
            "2": "60 Hz",
            "255": "None"
        },
        AIAlarmModeEmun:[
            "Momentary",
            "Latch"
        ],
        DODrivedByAIModeEmun:[
            "Disabled",
            "High Alarm",
            "Low Alarm"
        ],
        AIEventStatusEmun:{
            "1":"Fail to provide AI value (UART timeout)",
            "2":"Over Range",
            "4":"Under Range",
            "8":"Open Circuit (Burnout)",
            "16":"Reserved",
            "32":"Reserved",
            "64":"Reserved",
            "128":"ADC initializing/Error",
            "256":"Reserved",
            "512":"Zero/Span Calibration Error",
            "1024":"Reserved"
        },
        AccountTypeEmun: [
            "User",
            "Admin",
            "Root"
        ],
        PasswordChangeTypeEmun: {
            L: "User",
            M: "Admin",
            H: "Root"
        },
        AccountTypeAbbrEmun: [
            "L",
            "M",
            "H"
        ],
        UpgradeTypeEmun: {
            Firmware: {
                code: 0,
                fileType: "bin"
            },
            EmbedHTML: {
                code: 1,
                fileType: "ehf"
            },
            Html: {
                code: 2,
                fileType: "html"
            },
            jQuery: {
                code: 3,
                fileType: "js"
            },
            GroupConfig: {
                code: 4,
                fileType: "cfg"
            },
            ModuleProfile: {
                code: 5,
                fileType: "xml"
            }
        },
        DataLogRecordTypeEmun: {
            DI_Event: 1,
            DO_Event: 2,
            AI_Event: 4,
            AO_Event: 8,
            WDT_Event: 16,
            Sensor_Deviation: 32,
            Sensor_Alarm: 64,
            Periodic: 128
        },
        DOModeTypeEmun: [
            "DO",
            "Pulse Output",
            "Low to High Delay",
            "High to Low Delay"
        ],
        AIWithDOModeTypeEmun: [
            "DO",
            "Pulse Output",
            "Low to High Delay",
            "High to Low Delay",
            "AI Alarm Driven"
        ],
        //Robert(2017/06/15): PM requests to restore original DI modes display
        DIModeTypeEmun: [
            "DI",
            "Counter",
            "Low to High Latch",
            "High to Low Latch",
            "Frequency",
            //"Disable"
        ],
		WISE_4012_DIModeTypeEmun: [
            "DI",
            "Counter",
            "Low to High Latch",
            "High to Low Latch"
        ],
        DataLogIOTypeEmun: [
            "Invalid",
            "DI Logic Status",
            "DI Counter Value",
            "DI Frequency Value",
            "DO Logic Status",
            "DO Absolute Pulse Output Value",
            "DO Incremental Pulse Output Value",
            "AI Value",
            "Historical Maximum AI Value",
            "Historical Minimum AI Value",
            "AI Value after Scaling",
            "AI Status Flags",
            "AI Engineering Value",
            "Historical Maximum AI Engineering Value",
            "Historical Minimum AI Engineering Value",
            "AO Value",
            "AO Value after Scaling",
            "AO Status Flags",
            "AO Engineering Value",
            "AI Physical Value",
            "AI Engineering Value (floating type)",
            "Historical Maximum AI Engineering Value (floating type)",
            "Historical Minimum AI Engineering Value (floating type)",
            "AI Physical Value (floating type)",
            "Invalid",
            "Invalid",
            "Invalid",
            "Invalid",
            "Invalid",
            "Invalid",
            "Expansion bit data",
            "Expansion bit error code",
            "Expansion word data",
            "Expansion word error code",
            "Invalid",
            "Invalid",
            "Invalid",
            "Invalid",
            "Invalid",
            "Invalid",
            "Sensor Engineering Value",
            "Sensor Maximum Engineering Value",
            "Sensor Minimum Engineering Value",
            "Sensor Status",
            "Sensor Alarm Status",
            "Velocity RMS value",
            "Acceleration Peak value",
            "Acceleration RMS value",
            "Kurtosis",
            "Creast fatocr",
            "Skewness",
            "Standard deviation",
            "Displacement"
        ],
        DataLogEventTypeEmun: [
            "",
            "Wireless connection",
            "Wireless disconnection",
            "Communication WDT",
            "Cloud upload fail",
            "Cloud push fail",
            "SNTP fail",
            "Power on/off",
            "Memory full/overwrite",
            "Remote access fail",
            "Login error",
            "FW upgrade",
            "Battery event",
            "Internal configuration error",
            "Internal flash access error",
            "RF event",
            "Reserved",
            "Reserved",
            "HW"
        ],
        ModbusTagEmun: {
            DI: "DI Status",
            CtS: "Counter Switch",
            CtClr: "Clear Counter",
            CtOv: "Clear Overflow",
            Lch: "DI Latch Status",
			Hch: "DI High Latch Status",
            DO: "DO Status",
            AIHR: "Reset Historical Maximum AI Value",
            AILR: "Reset Historical Minimum AI Value",
            AIB: "Burnout Flag",
            HAlm: "High Alarm Flag",
            LAlm: "Low Alarm Flag",
            GCtClr: "Clear GCL Counter",
            CtFq: "Counter Value",
            PsLo: "Pulse Output Low Level Width",
            PsHi: "Pulse Output High Level Width",
            PsAV: "Set Absolute Pulse",
            PsIV: "Set Incremental Pulse",
            AI: "AI Value",
            AIFl: "AI Status",
            AICd: "AI Range Code",
            HisH: "Historical Maximum AI Value",
            HisL: "Historical Minimum AI Value",
            AIF: "AI Engineering Value",
            HisHF: "Historical Maximum AI Engineering Value",
            HisLF: "Historical Minimum AI Engineering Value",
            AICh: "AI Channels Mask",
            AO: "AO Value",
            AOFl: "AO Status",
            AOCd: "AO Type Code",
            Slew: "AO Slew Rate",
            AOSu: "AO Startup Value",
            AOSe: "AO Safety Value",
            AODi: "DI Events to Trigger AO Value",
            GCLCt: "GCL Counter",
            GCLFl: "GCL Flag",
            AISc: "AI Scaling Value",
            AIPF: "AI Physical Value",
            MNm: "Module Name",
            Lg: "Data Log Status",
            ExB: "Expansion Bit",
            ExW: "Expansion Word",
            ExBE: "Expansion Bit Error Code",
            ExWE: "Expansion Word Error Code",
            LB: "Low Battery Status",
            SHR: "Reset Historical Maximum Sensor Value",
            SLR: "Reset Historical Minimum Sensor Value",
            SHAlm: "Sensor High Alarm Flag",
            SLAlm: "Sensor Low Alarm Flag",
            S: "Sensor Value",
            SHisH: "Historical Maximum Sensor Value",
            SHisL: "Historical Minimum Sensor Value",
            SF: "Sensor Engineering Value",
            SHisHF: "Historical Maximum Sensor Engineering Value",
            SHisLF: "Historical Minimum Sensor Engineering Value",
            SFl: "Sensor Status",
            SCd: "Sensor Range Code",
            HLch: "Get/Clear H2L Latch Status",
            Fq: "Frequency Value",
			MAC: "RF MAC",
			Rssi: "RSSI Status"
        },
        FCSMask: {
            "SiteSurvey": 1,
            "Proprietary": 2,
            "SystemLogger": 4,
            "onlySupportFFT": 32,
            "FeatureAverageMode": 64,
            "OaFreqSetting": 128,
            "BatteryLifeCalc": 256,
            "VibrationDetection": 512
        },
        CloudServiceVenderEmun: {
            "Disabled":0,
            "Dropbox" :1,
            "Baidu":2,
            "PrivateServer":4,
            "WebAccess":8,
            "Reserved":16,
            "EmunUsefulLength": 5
        },
        DataLoggerStatusEmun: {
            "IoDataLogger" : 0,
            "PrivateServerLog" : 1,
            "EmunUsefulLength" : 2
        },
        DataLoggerSystemEventEmun: {
            "WIRELESS_CONNECTION": 0,
            "POWER_ON_OFF" : 6,
            "MEMORY_FULL_OVERWRITE" : 7,
            "FW_UPGRADE": 10,
            "BATTERY": 11,
            "RF_EVENT" : 14,
            "HW": 17,
            "EmunUsefulLength" : 18
        },
        ComPortBaudRate:{
            "0": "1200 bps",
            "1": "2400 bps",
            "2": "4800 bps",
            "3": "9600 bps",
            "4": "19200 bps",
            "5": "38400 bps",
            "6": "57600 bps",
            "7": "115200 bps"
        },
        ComPortDataBit:{
            "0": "7 bit",
            "1": "8 bit"
        },
        ComPortParity:{
            "0": "None",
            "1": "Odd",
            "2": "Even"
        },
        ComPortStopBit:{
            "0": "1 bit",
            "1": "2 bit"
        },
        ModbusRtuChannelStatusCode:{
            "0": "No error",
            "1": "Illegal function",
            "2": "Illegal data address",
            "3": "Illegal data value",
            "4": "Server device failure",
            "5": "Acknowledge",
            "6": "Server device busy",
            "7": "Negative acknowledge",
            "8": "Memory parity error",
            "9": "Reserved",
            "10": "Gateway path unavailable",
            "11": "Gateway target device failed to respond",
            "16": "Unavailable",
            "17": "Server response timeout",
            "18": "Checksum error",
            "19": "Received data error",
            "20": "Send request fail",
            "21": "Unprocessed",
            "22": "Read Only",
            "23": "In processing"
        },
        SensorRangeEmun:{
            "4096": {name:"Temperature(°C)", unit: "°C"},
            "4097": {name:"Temperature(°F)", unit: "°F"},
            "4098": {name:"Temperature(°K)", unit: "°K"},
            "4128": {name:"Humidity", unit: "%"},
            "4160": {name:"Atmospheric Pressure", unit: "hPa"},
            "4192": {name:"Light", unit: "Lux"},
            "4224": {name:"UV", unit: ""},
            "4256": {name:"Accelerometer(g)", unit: "mm/s, g, g, um"},
            "4257": {name:"Accelerometer(m/s&sup2;)", unit: "mm/s, m/s&sup2;, m/s&sup2;, um"},
            /*"4258": {name:"Accelerometer Z", unit: "mg"}, */
            "4288": {name:"Gyroscope", unit: "dps"},
            /* "4289": {name:"Gyroscope Y", unit: "dps"},
            "4290": {name:"Gyroscope Z", unit: "dps"}, */
            "4320": {name:"Magnetometer", unit: "uT"}
        },
        TemperatureSensorRangeEmun:{
            "4096": {name:"Temperature(°C)", unit: "°C"},
            "4097": {name:"Temperature(°F)", unit: "°F"},
            "4098": {name:"Temperature(°K)", unit: "°K"},
            "4128": {name:"Humidity", unit: "%"}
        },
        TemperatureRangeEmun:{
            "4096": {name:"Temperature(°C)", unit: "°C"}/* ,
            "4097": {name:"Temperature(°F)", unit: "°F"},
            "4098": {name:"Temperature(°K)", unit: "°K"} */
        },
        HumidityRangeEmun:{
            "4128": {name:"Humidity", unit: "%"}
        },
        VibrationRangeEmun:{
            "4256": {name:"Accelerometer(g)", unit: "g,g,mm/s"},
            "4257": {name:"Accelerometer(m/s&sup2;)", unit: "m/s&sup2;,m/s&sup2;,mm/s"}
        },
        VibrationFeatureArr:[
            "Kurtosis",
            "Crest factor",
            "Skewness",
            "Standard deviation",
            "Displacement"
        ],
        WISE_2411_VibrationFeatureArr:[
            "Kurtosis",
            "Crest factor",
            "Skewness",
            "Standard deviation",
            "Peak to Peak Displacement",
        	"Clearance factor",
			"Shape factor",
			"Impulse factor"
		],
        VibrationSensorChannelDescArr:[
            "X Accelerometer",
            "Y Accelerometer",
            "Z Accelerometer",
            "Temperature"
        ],
        WISE_2411_VibrationSensorChannelDescArr:[
            "Z-Axis Vibration Parameters",
            "Acceleration RMS in Band",
            "Surface Temperature"
        ],
        SensorChannelEventEmun:{
            "0": "Normal",
            "1": "Error"
        },
        WeekDayName:{
            "0": "Sunday",
            "1": "Monday",
            "2": "Tuesday",
            "3": "Wednesday",
            "4": "Thursday",
            "5": "Friday",
            "6": "Saturday"
        },
        MonthName:[
            {"index": "1", "name":"January"},
            {"index": "2", "name":"February"},
            {"index": "3", "name":"March"},
            {"index": "4", "name":"April"},
            {"index": "5", "name":"May"},
            {"index": "6", "name":"June"},
            {"index": "7", "name":"July"},
            {"index": "8", "name":"August"},
            {"index": "9", "name":"September"},
            {"index": "10", "name":"October"},
            {"index": "11", "name":"November"},
            {"index": "12", "name":"December"}
        ],
		LoRaBatteryStatusEnum:{
			"0": "Discharging detected",
			"1": "Charge Threshold Final reached",
			"2": "Charge Threshold 1 reached",
			"3": "",
			"4": "",
			"5": "",
			"6": "",
			"7": "",
			"8": "(Fast)Charging allowed",
			"9": "Full-charged",
			"10": "Charge Suspend",
			"11": "Charge Inhibit",
			"12": "",
			"13": "",
			"14": "Over-Temperature in Discharge",
			"15": "Over-Temperature in Charge"
        },
        LoRaRfOperationMode:{
            "WISE_LINK_V1": 1,
            "LORA_WAN": 2,
            "LORA_PROPRIETARY": 5
        },
        LoRaModeEmun: {
            "1": "WISE Link v1",
            "2": "LoRaWAN",
            "3": "Reserved (MACless)",
            "4": "WISE Link v2",
            "5": "LoRa Proprietary"
        },
		LoRaDeviceClassEmun: {
            "1": "Class A",
            "2": "Class B",
			"3": "Class C"
        },
		LoRaDeviceActivationModeEmun: {
            "1": "OTAA",
            "2": "ABP"
        },
        LoRaDeviceTxStatus: {
            "253": "OTAA Join Failure",
            "254": "LoRa TX Timeout",
            "255": "Waiting for TX"
        },
        LoRaRfRegionEnum:{
            "78": "US",
            "74": "JP",
            "84": "TW",
            "90": "AU",
            "69": "EU",
            "67": "CN470",
            "82": "RU",
            "75": "KR",
            "68": "IN",
            "73": "ID",
            "76": "BR"
        },
        LoRaRfRegionIsmBandEnum: {
            "78": "US902-928MHz",
            "74": "AS923MHz",
            "84": "AS923MHz",
            "90": "AU915-928MHz",
            "69": "EU863-870MHz",
            "67": "CN470-510MHz",
            "82": "RU864-870MHz",
            "75": "KR920-923MHz",
            "68": "IN865-867MHz",
            "73": "AS923-2MHz",
            "76": "LA915MHz"
        },
        LoRaWanUsQuickFreqSet:[
            {"idx": 0, "val": 0, "Freq": "US902-0"},
            {"idx": 1, "val": 1, "Freq": "US902-1"},
            {"idx": 2, "val": 2, "Freq": "US902-2"},
            {"idx": 3, "val": 3, "Freq": "US902-3"},
            {"idx": 4, "val": 4, "Freq": "US902-4"},
            {"idx": 5, "val": 5, "Freq": "US902-5"},
            {"idx": 6, "val": 6, "Freq": "US902-6"},
            {"idx": 7, "val": 7, "Freq": "US902-7"},
            {"idx": 8, "val": 255, "Freq": "User Define"}
        ],
        LoRaWanAuQuickFreqSet:[
            {"idx": 0, "val": 0, "Freq": "AU915-0"},
            {"idx": 1, "val": 1, "Freq": "AU915-1"},
            {"idx": 2, "val": 2, "Freq": "AU915-2"},
            {"idx": 3, "val": 3, "Freq": "AU915-3"},
            {"idx": 4, "val": 4, "Freq": "AU915-4"},
            {"idx": 5, "val": 5, "Freq": "AU915-5"},
            {"idx": 6, "val": 6, "Freq": "AU915-6"},
            {"idx": 7, "val": 7, "Freq": "AU915-7"},
            {"idx": 8, "val": 255, "Freq": "User Define"}
        ],

        LoRaWanAsQuickFreqSet: [
            { "idx": 0, "val": 0, "Freq": "AS923-1", "FreqVal": [923200, 923400, 922200, 922400, 922600, 922800, 923000, 922000] },
            { "idx": 1, "val": 1, "Freq": "AS923-2", "FreqVal": [923200, 923400, 923600, 923800, 924000, 924200, 924400, 924600] },
            { "idx": 8, "val": 255, "Freq": "User Define" }
        ],

        LoRaWanAsQuickFreqSetDesc: {
            "0": "channel 0: 923.2 Mhz\nchannel 1: 923.4 Mhz\nchannel 2: 922.2 Mhz\nchannel 3: 922.4 Mhz\nchannel 4: 922.6 Mhz\nchannel 5: 922.8 Mhz\nchannel 6: 923.0 Mhz\nchannel 7: 922.0 Mhz\n",
            "1": "channel 0: 923.2 Mhz\nchannel 1: 923.4 Mhz\nchannel 2: 923.6 Mhz\nchannel 3: 923.8 Mhz\nchannel 4: 924.0 Mhz\nchannel 5: 924.2 Mhz\nchannel 6: 924.4 Mhz\nchannel 7: 924.6 Mhz\n",
            "255": "User Defined Frequency"
        },

        LoRaWanUsQuickFreqSetDesc:{
            "0": "channel 0: 902.3 Mhz\nchannel 1: 902.5 Mhz\nchannel 2: 902.7 Mhz\nchannel 3: 902.9 Mhz\nchannel 4: 903.1 Mhz\nchannel 5: 903.3 Mhz\nchannel 6: 903.5 Mhz\nchannel 7: 903.7 Mhz\nchannel std: 903.0 Mhz Bandwidth 500 KHz, SF 8",
            "1": "channel 0: 903.9 Mhz\nchannel 1: 904.1 Mhz\nchannel 2: 904.3 Mhz\nchannel 3: 904.5 Mhz\nchannel 4: 904.7 Mhz\nchannel 5: 904.9 Mhz\nchannel 6: 905.1 Mhz\nchannel 7: 905.3 Mhz\nchannel std: 904.6 Mhz Bandwidth 500 KHz, SF 8",
            "2": "channel 0: 905.5 Mhz\nchannel 1: 905.7 Mhz\nchannel 2: 905.9 Mhz\nchannel 3: 906.1 Mhz\nchannel 4: 906.3 Mhz\nchannel 5: 906.5 Mhz\nchannel 6: 906.7 Mhz\nchannel 7: 906.9 Mhz\nchannel std: 906.2 Mhz Bandwidth 500 KHz, SF 8",
            "3": "channel 0: 907.1 Mhz\nchannel 1: 907.3 Mhz\nchannel 2: 907.5 Mhz\nchannel 3: 907.7 Mhz\nchannel 4: 907.9 Mhz\nchannel 5: 908.1 Mhz\nchannel 6: 908.3 Mhz\nchannel 7: 908.5 Mhz\nchannel std: 907.8 Mhz Bandwidth 500 KHz, SF 8",
            "4": "channel 0: 908.7 Mhz\nchannel 1: 908.9 Mhz\nchannel 2: 909.1 Mhz\nchannel 3: 909.3 Mhz\nchannel 4: 909.5 Mhz\nchannel 5: 909.7 Mhz\nchannel 6: 909.9 Mhz\nchannel 7: 910.1 Mhz\nchannel std: 909.4 Mhz Bandwidth 500 KHz, SF 8",
            "5": "channel 0: 910.3 Mhz\nchannel 1: 910.5 Mhz\nchannel 2: 910.7 Mhz\nchannel 3: 910.9 Mhz\nchannel 4: 911.1 Mhz\nchannel 5: 911.3 Mhz\nchannel 6: 911.5 Mhz\nchannel 7: 911.7 Mhz\nchannel std: 911.0 Mhz Bandwidth 500 KHz, SF 8",
            "6": "channel 0: 911.9 Mhz\nchannel 1: 912.1 Mhz\nchannel 2: 912.3 Mhz\nchannel 3: 912.5 Mhz\nchannel 4: 912.7 Mhz\nchannel 5: 912.9 Mhz\nchannel 6: 913.1 Mhz\nchannel 7: 913.3 Mhz\nchannel std: 912.6 Mhz Bandwidth 500 KHz, SF 8",
            "7": "channel 0: 913.5 Mhz\nchannel 1: 913.7 Mhz\nchannel 2: 913.9 Mhz\nchannel 3: 914.1 Mhz\nchannel 4: 914.3 Mhz\nchannel 5: 914.5 Mhz\nchannel 6: 914.7 Mhz\nchannel 7: 914.9 Mhz\nchannel std: 914.2 Mhz Bandwidth 500 KHz, SF 8",
            "255": "User Defined Frequency"
        },
        LoRaWanAuQuickFreqSetDesc:{
            "0": "channel 0: 915.2 Mhz\nchannel 1: 915.4 Mhz\nchannel 2: 915.6 Mhz\nchannel 3: 915.8 Mhz\nchannel 4: 916.0 Mhz\nchannel 5: 916.2 Mhz\nchannel 6: 916.4 Mhz\nchannel 7: 916.6 Mhz\nchannel std: 915.9 Mhz Bandwidth 500 KHz, SF 8",
            "1": "channel 0: 916.8 Mhz\nchannel 1: 917.0 Mhz\nchannel 2: 917.2 Mhz\nchannel 3: 917.4 Mhz\nchannel 4: 917.6 Mhz\nchannel 5: 917.8 Mhz\nchannel 6: 918.0 Mhz\nchannel 7: 918.2 Mhz\nchannel std: 917.5 Mhz Bandwidth 500 KHz, SF 8",
            "2": "channel 0: 918.4 Mhz\nchannel 1: 918.6 Mhz\nchannel 2: 918.8 Mhz\nchannel 3: 919.0 Mhz\nchannel 4: 919.2 Mhz\nchannel 5: 919.4 Mhz\nchannel 6: 919.6 Mhz\nchannel 7: 919.8 Mhz\nchannel std: 919.1 Mhz Bandwidth 500 KHz, SF 8",
            "3": "channel 0: 920.0 Mhz\nchannel 1: 920.2 Mhz\nchannel 2: 920.4 Mhz\nchannel 3: 920.6 Mhz\nchannel 4: 920.8 Mhz\nchannel 5: 921.0 Mhz\nchannel 6: 921.2 Mhz\nchannel 7: 921.4 Mhz\nchannel std: 920.7 Mhz Bandwidth 500 KHz, SF 8",
            "4": "channel 0: 921.6 Mhz\nchannel 1: 921.8 Mhz\nchannel 2: 922.0 Mhz\nchannel 3: 922.2 Mhz\nchannel 4: 922.4 Mhz\nchannel 5: 922.6 Mhz\nchannel 6: 922.8 Mhz\nchannel 7: 923.0 Mhz\nchannel std: 922.3 Mhz Bandwidth 500 KHz, SF 8",
            "5": "channel 0: 923.2 Mhz\nchannel 1: 923.4 Mhz\nchannel 2: 923.6 Mhz\nchannel 3: 923.8 Mhz\nchannel 4: 924.0 Mhz\nchannel 5: 924.2 Mhz\nchannel 6: 924.4 Mhz\nchannel 7: 924.6 Mhz\nchannel std: 923.9 Mhz Bandwidth 500 KHz, SF 8",
            "6": "channel 0: 924.8 Mhz\nchannel 1: 925.0 Mhz\nchannel 2: 925.2 Mhz\nchannel 3: 925.4 Mhz\nchannel 4: 925.6 Mhz\nchannel 5: 925.8 Mhz\nchannel 6: 926.0 Mhz\nchannel 7: 926.2 Mhz\nchannel std: 925.5 Mhz Bandwidth 500 KHz, SF 8",
            "7": "channel 0: 926.4 Mhz\nchannel 1: 926.6 Mhz\nchannel 2: 926.8 Mhz\nchannel 3: 927.0 Mhz\nchannel 4: 927.2 Mhz\nchannel 5: 927.4 Mhz\nchannel 6: 927.6 Mhz\nchannel 7: 927.8 Mhz\nchannel std: 927.1 Mhz Bandwidth 500 KHz, SF 8",
            "255": "User Defined Frequency"
        },
        LoRaRegionUsFreqSet:{
            "0":{"BandWidth":125, "Freq":[902.3, 902.5, 902.7, 902.9, 903.1, 903.3, 903.5, 903.7]},
            "1":{"BandWidth":125, "Freq":[903.9, 904.1, 904.3, 904.5, 904.7, 904.9, 905.1, 905.3]},
            "2":{"BandWidth":125, "Freq":[905.5, 905.7, 905.9, 906.1, 906.3, 906.5, 906.7, 906.9]},
            "3":{"BandWidth":125, "Freq":[907.1, 907.3, 907.5, 907.7, 907.9, 908.1, 908.3, 908.5]},
            "4":{"BandWidth":125, "Freq":[908.7, 908.9, 909.1, 909.3, 909.5, 909.7, 909.9, 910.1]},
            "5":{"BandWidth":125, "Freq":[910.3, 910.5, 910.7, 910.9, 911.1, 911.3, 911.5, 911.7]},
            "6":{"BandWidth":125, "Freq":[911.9, 912.1, 912.3, 912.5, 912.7, 912.9, 913.1, 913.3]},
            "7":{"BandWidth":125, "Freq":[913.5, 913.7, 913.9, 914.1, 914.3, 914.5, 914.7, 914.9]},
            "8":{"BandWidth":500, "Freq":[903, 904.6, 906.2, 907.8, 909.4, 911, 912.6, 914.2]}
        },
        LoRaRegionAuFreqSet:{
            "0":{"BandWidth":125, "Freq":[915.2, 915.4, 915.6, 915.8, 916,   916.2, 916.4, 916.6]},
            "1":{"BandWidth":125, "Freq":[916.8, 917,   917.2, 917.4, 917.6, 917.8, 918,   918.2]},
            "2":{"BandWidth":125, "Freq":[918.4, 918.6, 918.8, 919,   919.2, 919.4, 919.6, 919.8]},
            "3":{"BandWidth":125, "Freq":[920,   920.2, 920.4, 920.6, 920.8, 921,   921.2, 921.4]},
            "4":{"BandWidth":125, "Freq":[921.6, 921.8, 922,   922.2, 922.4, 922.6, 922.8, 923  ]},
            "5":{"BandWidth":125, "Freq":[923.2, 923.4, 923.6, 923.8, 924,   924.2, 924.4, 924.6]},
            "6":{"BandWidth":125, "Freq":[924.8, 925,   925.2, 925.4, 925.6, 925.8, 926,   926.2]},
            "7":{"BandWidth":125, "Freq":[926.4, 926.6, 926.8, 927,   927.2, 927.4, 927.6, 927.8]},
            "8":{"BandWidth":500, "Freq":[915.9, 917.5, 919.1, 920.7, 922.3, 923.9, 925.5, 927.1]}
        },
        LoRaWanKrFreqSel:[
            {"val": 0, "Freq": "0"},
            {"val": 920900, "Freq": "920900"},
            {"val": 921100, "Freq": "921100"},
            {"val": 921300, "Freq": "921300"},
            {"val": 921500, "Freq": "921500"},
            {"val": 921700, "Freq": "921700"},
            {"val": 921900, "Freq": "921900"},
            {"val": 922100, "Freq": "922100"},
            {"val": 922300, "Freq": "922300"},
            {"val": 922500, "Freq": "922500"},
            {"val": 922700, "Freq": "922700"},
            {"val": 922900, "Freq": "922900"},
            {"val": 923100, "Freq": "923100"},
            {"val": 923300, "Freq": "923300"}
        ],
        BatteryStatusEnum:{
            "0": "No Error",
            "1": "Low Battery",
            "2": "Run Out of Battery",
            "3": "No Battery Installed",
            "4": "Can't get Battery status when USB is connected"
        }
    },
    AdvantechRestfulProxy: {
        Comman: function() {
            this.HTTP_GET = "GET";
            this.HTTP_POST = "POST";
            this.HTTP_PATCH = "PATCH";
        },
        Resource: function() {
            this.URL_BASE = "http://172.18.3.41/adam3600";
            this.URL_SYS_INFO = URL_BASE + "/sys_info";
            this.URL_NETWROK = URL_BASE + "/net_basic";
            this.URL_NETWROK_APP = URL_BASE + "/net_config";
            this.URL_ACCESS_CTRL = URL_BASE + "/accessctrl";
            this.URL_DATA_STREAM = URL_BASE + "/datastream";
            this.URL_SLOT_INFO = URL_BASE + "/slotinfo";
            this.URL_MODBUS_COIL = URL_BASE + "/modbusaddress/coil/";
            this.URL_MODBUS_REGISTER = URL_BASE + "/modbusaddress/register/";
            this.URL_DI_VALUE = URL_BASE + "/di_value";
            this.URL_DI_CONFIG = URL_BASE + "/di_config";
            this.URL_DO_VALUE = URL_BASE + "/do_value";
            this.URL_DO_CONFIG = URL_BASE + "/do_config";
            this.URL_AI_VALUE = URL_BASE + "/ai_value";
            this.URL_AI_CONFIG = URL_BASE + "/ai_config";
            this.URL_AO_VALUE = URL_BASE + "/ao_value";
            this.URL_AO_CONFIG = URL_BASE + "/ao_config";
            this.URL_PROFILE = URL_BASE + "/profile";
        },
    },
});
function multiPartTransfer(resURL, onSuccessFunc, onErrorFunc, onPorgressUpdate, file, length, type, form) {
    try {
        try{
            var ajaxHandler = null;
            var ajaxObj = {};
            ajaxObj.url = resURL;
            ajaxObj.data = new FormData(form[0]);
            ajaxObj.contentType = false;
            ajaxObj.async = true;
            ajaxObj.type = HTTP_POST;
            ajaxObj.processData = false;
            ajaxObj.statusCode = ajaxStandardErrorHandle();
            ajaxObj.xhr = function() {
                var XMLHttpRequest = $.ajaxSettings.xhr();
                if(XMLHttpRequest.upload) {
                    XMLHttpRequest.upload.onprogress = function(evt) {
                        if($.isFunction(onPorgressUpdate)) {
                            onPorgressUpdate.apply(this, [evt]);
                        }
                    }
                }else{
                    alert("Upload progress not be supported.");
                }
                return XMLHttpRequest;
            };
            ajaxObj.success = function(stream) {
                form.remove();
                onAjaxSuccessHandle(ajaxObj, HTTP_POST, onSuccessFunc, stream);
            };
            ajaxObj.error = function(xhr, ajaxOptions, thrownError) {
                form.remove();
                onAjaxErrorHandle(xhr, ajaxOptions, thrownError, onErrorFunc, file);
                ajaxHandler.abort();
            };
            ajaxHandler = $.ajax(ajaxObj);
        }
        catch(e){
            form.remove();
            onAjaxErrorHandle(xhr, ajaxOptions, thrownError, onErrorFunc, file);
        }
    }catch (e) {
        form.remove();
        if($.isFunction(onErrorFunc)) {
            onErrorFunc.apply(this, [{
                status: ''
            }, e, file]);
        }
    }
};

function ajaxStandardErrorHandle(){
    var tool = Advantech.Utility;
    var msgBox = Advantech.Form.MessageForm.getInstance();
    return {
        400: function() {
            //msgBox.showMessageBox("Error 400", "<h5>The request could not be understood by the server due to malformed syntax.</h5>");
        },
        403: function() {
            tool.serverErrorPage(403, "Authentication Failed.");
        },
        404: function() {
            tool.serverErrorPage(404, "The requested resource (URI) does not exist on the server.");
        },
        405: function() {
            //msgBox.showMessageBox("Error 405", "<h5>The request method (POST or GET) is not allowed on the requested resource.</h5>");
        },
        411: function() {
            //msgBox.showMessageBox("Error 411", "<h5>The required Content-length header is missing.</h5>");
        },
        500: function() {
            tool.serverErrorPage(500, "Internal Server Error");
        },
        501: function() {
            msgBox.showMessageBox("Error 501", "<h5>Request Not Implemented.</h5>");
        },
        503: function() {
            tool.serverErrorPage(503, "Service Unavailable");
        }
    };
};
function onAjaxErrorHandle(xhr, ajaxOptions, thrownError, resErrorCallbackFun, file){
    var status = xhr.status;
    Advantech.Utility.ErrorCounter.getInstance().addCount();
    var msg ="";
    if(ajaxOptions=='timeout'){
        msg = "Request Timeout";
    }
    else if(ajaxOptions=='format'){
        msg = "JSON Format Error";
    }
    else if(status == 0){
        msg = "Connection Failed";
    }
    else{
        msg = Advantech.Profile.WEB_ERROR_CODE[status]||"Unknow Error.";
    }

    var isErrorCodeJsonFormat = false;
    if(typeof(Advantech.Profile.DeviceEmun[module].isErrorCodeJsonFormat) != 'undefined' &&
            Advantech.Profile.DeviceEmun[module].isErrorCodeJsonFormat){
        isErrorCodeJsonFormat = true;
    }
    if($.isFunction(resErrorCallbackFun)){
        if(isErrorCodeJsonFormat){
            var jsonObj = null; //json err msg returned from server
            var apiErrorCode = "";
            var apiErrorName = "";
            try{
                jsonObj = JSON.parse(xhr.responseText);
                apiErrorCode = jsonObj.Err;
                apiErrorName = Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] || "";
            }catch (e) {
                //Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + msg , null);
                //Advantech.Utility.serverErrorPage("Something Error. Please Re-Login");
                //return;
            }
            if(file == undefined){
                if(jsonObj != null && apiErrorName != ""){
                    resErrorCallbackFun(status, msg, apiErrorCode, jsonObj.Msg);
                }else{
                    resErrorCallbackFun(status, msg);
                }
            }else{
                resErrorCallbackFun(xhr, msg, file, apiErrorCode, apiErrorName);
            }
        }else{
            if(file == undefined){
                resErrorCallbackFun(status, msg);
            }else{
                resErrorCallbackFun(xhr, msg, file);
            }
        }
    }else{
        /*var errorForm = Advantech.Form.ConnectionErrorStackForm.getInstance();
        errorForm.addError(status, msg);
        if(!errorForm.isShow()){
            errorForm.showErrorStackForm();
        }*/
        var jsonObj = null; //json err msg returned from server
        var apiErrorCode = "";
        var apiErrorName = "";
        if(isErrorCodeJsonFormat){
            try{
                jsonObj = JSON.parse(xhr.responseText);
                apiErrorCode = jsonObj.Err;
                apiErrorName = Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] || "";
                //Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + msg , null);
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error code:" + apiErrorCode, apiErrorName);
            }catch (e) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + msg , null);
                return;
            }
        }else{
            Advantech.Utility.serverErrorPage("Something Error. Please Refresh Web Page.");
        }
    }
};
function onAjaxSuccessHandle(ajaxObj, httpMethod, resCallbackFun, stream){
    var errorForm = Advantech.Form.ConnectionErrorStackForm.getInstance();
    var obj = {};
    if( httpMethod == HTTP_GET ){
        try{
            obj = JSON.parse(stream);
        }
        catch(e){
            ajaxObj.error({status:-1}, "format", "");
            return;
        }
    }
    if($.isFunction(resCallbackFun)) {
        resCallbackFun.apply(this,[obj]);
    }
    if(errorForm.isShow()){
        errorForm.hideErrorStackForm();
    }
    Advantech.Utility.ErrorCounter.getInstance().resetCount();
};
function httpGetOperation(httpMethod, resURL, resCallbackFun, resErrorCallbackFun, data, waitTime) {
    var ajaxObj = {};
    var isSuccess = true;
    var timeCounter = null;
    var ajaxHandler = null;
    var rand = new Date();  //Fix IE and Web browser can't update in HTTP Get
    if(httpMethod == "GET")
        ajaxObj.url = resURL + "?s=" + rand.getTime();
    else
        ajaxObj.url = resURL;

    if(data != undefined && data != null ) {
        ajaxObj.data = data;
    }
    ajaxObj.type = httpMethod;
    ajaxObj.async = true;
    ajaxObj.dataType = 'text';
    ajaxObj.xhr = function() {
        var XMLHttpRequest = $.ajaxSettings.xhr();
        XMLHttpRequest.onprogress = function(){
            clearTimeout(timeCounter);
            timeCounter = setTimeout(function(){ajaxObj.error({status:0}, "timeout", "timeout");}, waitTime || 30000);
        };
        return XMLHttpRequest;
    };
    timeCounter = setTimeout(function(){
         ajaxObj.error({status:0}, "timeout", "timeout");
         clearTimeout(timeCounter);
    }, waitTime || 30000);
    ajaxObj.success = function(stream) {
        clearTimeout(timeCounter);
        ajaxHandler.abort();
        onAjaxSuccessHandle(ajaxObj, httpMethod, resCallbackFun, stream);
    };
    ajaxObj.statusCode = ajaxStandardErrorHandle();

    ajaxObj.error = function(xhr, ajaxOptions, thrownError) {
        onLoadAPI = resURL;
        clearTimeout(timeCounter);
        ajaxHandler.abort();
        onAjaxErrorHandle(xhr, ajaxOptions, thrownError, resErrorCallbackFun);
    };
    ajaxHandler = $.ajax(ajaxObj);
};
var int = int || function(val) {
    return parseInt(val, 10);
};

//////////////////////////////////////////////////////
//
//      MAIN DOCUMENT READY SCRIPT OF DEVOOPS THEME
//
//      In this script main logic of theme
//
//////////////////////////////////////////////////////

//
// For free combination of base board and io board, we seperate the definition of base board and io board
//
var WiseModule = {
/*     boardFunction:{
        "SA":{
            description: "Smart Alarm",
            ao_Ch: 0,
            ai_Ch: 0,
            di_Ch: 0,
            do_Ch: 0,
            aiRangeEmun:null,
            aoRangeEmun:null,
            diModeEmun:Advantech.Profile.DIModeTypeEmun,
            doModeEmun:Advantech.Profile.DOModeTypeEmun,
            doDataModuleFactory:function(){null;},
            aoDataModuleFactory:function(){null;},
            aiDataModuleFactory:function(){null;},
            diDataModuleFactory:function(){null;},
            isErrorCodeJsonFormat: true,
            isSupportRS485: false,
            TotalCom: 1,
            isSupportSensor: true
        },
        "SP":{
            description: "Smart PHM",
            ao_Ch: 0,
            ai_Ch: 0,
            di_Ch: 0,
            do_Ch: 0,
            aiRangeEmun:Advantech.Profile.WISE_4012_RangeEmun,
            aiSamplingSpeedEmun:Advantech.Profile.AISamplingSpeedEmun,
            aiFilterSupport:true,
            aiPhysicalValueSupport: true,
            aoRangeEmun:null,
            diModeEmun:Advantech.Profile.DIModeTypeEmun,
            doModeEmun:Advantech.Profile.DOModeTypeEmun,
            doDataModuleFactory:function(){null;},
            aoDataModuleFactory:function(){null;},
            aiDataModuleFactory:function(){null;},
            diDataModuleFactory:function(){null;},
            isErrorCodeJsonFormat: true,
            isSupportRS485: false,
            TotalCom: 0,
            isSupportSensor: true
        }
    }, */
    baseBoard:{
        "WISE-2410":{
            description: "Smart Vibration Sensor(LoRa)",
            ao_Ch: 0,
            ai_Ch: 0,
            di_Ch: 0,
            do_Ch: 0,
            aiRangeEmun:null,
            aoRangeEmun:null,
            diModeEmun:Advantech.Profile.DIModeTypeEmun,
            doModeEmun:Advantech.Profile.DOModeTypeEmun,
            doDataModuleFactory:function(){null;},
            aoDataModuleFactory:function(){null;},
            aiDataModuleFactory:function(){null;},
            diDataModuleFactory:function(){null;},
            isErrorCodeJsonFormat: true,
            isSupportRS485: false,
            TotalCom: 0,
            isSupportSensor: true,
            isSupportPositioning: false,
            hasUSB:false,
            hasSD:false,
            isCoupler: false,
            isSupportP2P: false,
            isExtension:false,
            fwVersion: 'A1.11 B01'
        },
        "WISE-2411":{
            description: "Smart PHM Vibration Sensor(LoRa)",
            ao_Ch: 0,
            ai_Ch: 0,
            di_Ch: 0,
            do_Ch: 0,
            aiRangeEmun:Advantech.Profile.WISE_4012_RangeEmun,
            aiSamplingSpeedEmun:Advantech.Profile.AISamplingSpeedEmun,
            aiFilterSupport:true,
            aiPhysicalValueSupport: true,
            aoRangeEmun:null,
            diModeEmun:Advantech.Profile.DIModeTypeEmun,
            doModeEmun:Advantech.Profile.DOModeTypeEmun,
            doDataModuleFactory:function(){null;},
            aoDataModuleFactory:function(){null;},
            aiDataModuleFactory:function(){null;},
            diDataModuleFactory:function(){null;},
            isErrorCodeJsonFormat: true,
            isSupportRS485: false,
            TotalCom: 0,
            isSupportSensor: true,
            isSupportPositioning: false,
            hasUSB:false,
            hasSD:false,
            isCoupler: false,
            isSupportP2P: false,
            isExtension:false,
            fwVersion: 'A1.02 B05'
        }
    }
};

$.extend(true, Advantech, {
    Data: {
        ChartData:{
            TrendData:function(dataObj, trendCapacity){
                var _datas = (function(){
                    var data = {};
                    for( var prop in dataObj){
                        data[prop] = dataObj[prop].map(function(obj){return obj;});
                    }
                    return data;
                })();
                var getMaxPlotPoint = function(){
                    var max = -1;
                    for(prop in _datas){
                        var len = _datas[prop].length;
                        if( len > max){
                            max = len;
                        }
                    }
                    return max;
                };
                var _capacity = trendCapacity;

                var _maxOnChart = getMaxPlotPoint();
                var _pointer = _maxOnChart;

                this.recoverData = function(){
                    _datas = {};
                    for( var prop in dataObj){
                        _datas[prop] = dataObj[prop].map(function(obj){return obj;});
                    }
                    _maxOnChart = getMaxPlotPoint();
                    _pointer = _maxOnChart;
                };
                this.filterData = function(logTpye){
                    _datas = {};
                    for( var prop in dataObj){
                        _datas[prop] = dataObj[prop].filter(function(obj){
                            return logTpye == obj.logType;
                        });
                    }
                    _maxOnChart = getMaxPlotPoint();
                    _pointer = _maxOnChart;
                };
                this.getDrawData = function(){
                    var tempObj = {};
                    var minTimestamp = Number.MAX_VALUE;;
                    for(prop in _datas){
                        tempObj[prop] = [];
                        var len = _datas[prop].length
                        var start;
                        var end;
                        if(len < _maxOnChart){
                            if(len < _pointer){
                                end = len;
                            }else{
                                var temp = _pointer - _capacity;
                                end = _pointer
                            }
                            var temp = end - _capacity;
                            start = (temp < 0)?0:temp;
                        }else{
                            var temp = _pointer - _capacity;
                            end = _pointer;
                            start = (temp < 0)?0:temp;
                        }
                        tempObj[prop] = _datas[prop].slice(start, _pointer);
                    }
                    return tempObj;

                };

                this.isEndBound = function(){
                    if(_pointer == _maxOnChart){
                        return true;
                    }
                    else{
                        return false;
                    }
                };

                this.isStartBound = function(){
                    if(_pointer == 0){
                        return true;
                    }
                    else{
                        return false;
                    }
                };

                this.minusStep = function(){
                    if(_pointer > 0){
                        _pointer--;
                    }
                };
                this.addStep = function(){
                    if(_pointer < _maxOnChart){
                       _pointer++;
                    }
                };
            }
        },
        ModbusData:{
            IModbusAddressChangeSubject: function() {
                this.dataChanged = function(obj, e) {
                    throw new Error("Not Impelment baseAddressChanged Function");
                };
                this.dataErrorOccurred = function(obj, e) {
                    throw new Error("Not Impelment baseAddressChanged Function");
                };
            },
            ModbusAddressDatas: function() {
                var mObservers = []; //Must be IModbusAddressChangeSubject
                var mRangeList = {};
                var mLength = 0;
                this.getLength = function() {
                    return mLength;
                };

                this.subscribeDataChange = function(obj) {
                    if(obj.hasOwnProperty('dataChanged')){
                        mObservers.push(obj);
                    }
                    else{
                        throw new Error("Subcribe Object hadn't extend from IModbusAddressChangeSubject");
                    }
                };

                this.unsubscribe = function(obj) {
                    mObservers = mObservers.filter(
                        function(item) {
                            if(item !== obj) {
                                return item;
                            }
                        }
                    );
                };
                this.appendData = function(key, val) {
                    if(!mRangeList.hasOwnProperty(key)) {
                        mRangeList[key] = val;
                        mLength++;
                    }else{
                        throw key + " has existed."
                    }
                };
                this.removeData = function(key) {
                    if(typeof(mRangeList[key]) != 'undefined') {
                        mLength--;
                        delete mRangeList[key];
                    }
                };
                this.getData = function(key) {
                    return mRangeList[key];
                };

                this.setData = function(key, range, isCheck) {
                    if(typeof(mRangeList[key]) == 'undefined') {
                        throw new Error("The Key " + key + " has not in the hashtable");
                    }
                    var preRange, afterRange, isChange;
                    preRange = mRangeList[key];
                    if(isCheck === undefined || isCheck) {
                        if(!$.isNumeric(range.getTo()) || !$.isNumeric(range.getFrom()) || this.isOverlap(key, range)) {
                            afterRange = preRange;
                            isChange = false;
                        }
                        else {
                            mRangeList[key] = range;
                            afterRange = range;
                            isChange = true;
                        }
                    }else{
                        mRangeList[key] = range;
                        afterRange = range;
                        isChange = false;
                    }

                    var e = {
                        Key: key,
                        PreRange: preRange,
                        Range: afterRange,
                        IsChanged: isChange
                    }
                    for (var i = 0; i < mObservers.length; ++i) {
                        mObservers[i].dataChanged(this, e);
                    }
                };

                this.hasData = function(in_key) {
                    return typeof(mRangeList[in_key]) != 'undefined';
                };

                this.isOverlap = function(primalKey, rangeObj) {
                    if(rangeObj.getFrom() < 1) {
                        return true;
                    }
                    for (var i in mRangeList) {
                        if(i !== primalKey) {
                            if(rangeObj.isOverlap(mRangeList[i])) {
                                for (var j = 0; j < mObservers.length; ++j) {
                                    mObservers[j].dataErrorOccurred(this, {
                                        primalKey: primalKey,
                                        primalRange: rangeObj,
                                        targetKey: i,
                                        targetRange: mRangeList[i]
                                    });
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                };

                this.clear = function() {
                    for (var i in mRangeList) {
                        delete mRangeList[i];
                    }
                    mLength = 0;
                };
            },
        },
        IOData: {
            IOConfigBaseData: function(index, tagName) {
                this.getIndex = function() {
                    return index;
                };
            },
            /*inherited from IOConfigBaseData*/
            InternalIOConfigBaseData: function(index, tagName){
                Advantech.Data.IOData.IOConfigBaseData.apply(this, arguments);
                this.getTagName = function() {
                    return tagName;
                };
                this.setTagName = function(name) {
                    if(name.length > 21){
                        throw new Error("Tag name length excess 21 characters");
                    }else{
                        tagName = name;
                    }
                };
            },
            /*inherited from InternalIOConfigBaseData*/
            AIOConfigBaseData: function(index, tagName, range) {
                Advantech.Data.IOData.InternalIOConfigBaseData.apply(this, arguments);
                var _RangeTypeEmun = null;
                this.setModeTypeEmun = function(val){
                    _RangeTypeEmun = val;
                };
                this.getModeTypeEmun = function(){
                    if(_RangeTypeEmun == null){
                        return null;
                    }
                    else{
                        return _RangeTypeEmun;
                    }
                };
                this.getRng = function() {
                    return range;
                };
                this.setRng = function(val) {};
            },
            AIAvgMaskData:function(aiConfigObj, avgM){
                var _aiAvgMskArray = {};
                var _length = 0;
                var _Self = this;
                _Self.AVGERAGE_IS_DISABLED = -1;
                var _curRng = _Self.AVGERAGE_IS_DISABLED;
                (function(){
                    var aiCg = aiConfigObj.AICfg;
                    var len = aiCg.length;
                    _length = len;
                    var mskArray = Advantech.Utility.convertMaskToArray(avgM, len);
                    for(var i = 0; i < len; ++i){
                        var ch = aiCg[i].Ch;
                        var rng = aiCg[i].Rng;
                        if( mskArray[ch] == 1 && _curRng == _Self.AVGERAGE_IS_DISABLED){
                            _curRng = rng;
                        }
                        _aiAvgMskArray[ch] = {EnAvg: mskArray[ch],Rng:rng};
                    }
                    _Self.AVGERAGE_IS_DISABLED = -1;
                })();
                this.getCurrentRange = function(){
                    return _curRng;
                };
                this.getAvgM = function(){
                    var mskArray = [];
                    for(var prop in _aiAvgMskArray){
                        mskArray[prop] = _aiAvgMskArray[prop].EnAvg;
                    }
                    return Advantech.Utility.convertArrayToMask(mskArray);
                };
                this.setRng = function(ch, rng){
                    if(_aiAvgMskArray[ch].EnAvg == 1){
                        if(  rng != _curRng){
                            var rangeDesc = Advantech.Profile.AIRangeEmun[_curRng];
                            throw new Error("The input range of selected channels for average must be the "+rangeDesc+".");
                        }else{
                            _aiAvgMskArray[ch].Rng = rng;
                        }
                    }
                    else{
                        _aiAvgMskArray[ch].Rng = rng;
                    }
                };
                var isValidMsk = function(msk){
                    if(msk == 0){
                        return true;
                    }
                    else{
                        var tempRng = _Self.AVGERAGE_IS_DISABLED;
                        var mskArray = Advantech.Utility.convertMaskToArray(msk, _length);
                        for(var i = 0; i < _length; ++i){
                            if( mskArray[i] == 1 && _curRng == _Self.AVGERAGE_IS_DISABLED){
                                tempRng = _aiAvgMskArray[i].Rng;
                            }
                            if(mskArray[i] == 1){
                                if(_aiAvgMskArray[i].Rng != tempRng && tempRng != _Self.AVGERAGE_IS_DISABLED){
                                    return false;
                                }
                            }
                        }
                        _curRng = tempRng;
                    }

                    return true;
                };
                this.setAvgM = function(msk){
                    if(!isValidMsk(msk)){
                        var rangeDesc = Advantech.Profile.AIRangeEmun[_curRng]
                        throw new Error("The input range of selected channels for average must be the "+rangeDesc+".");
                    }
                    else{
                        if(msk == 0){
                            _curRng = _Self.AVGERAGE_IS_DISABLED;
                        }
                        var mskArray = Advantech.Utility.convertMaskToArray(msk, _length);
                        for(var i = 0; i < _length; ++i){
                            setEnAvg(i, mskArray[i]);
                        }
                    }
                };
                var setEnAvg = function(ch, isEn){
                    if(_aiAvgMskArray[ch].Rng == _curRng){
                        _aiAvgMskArray[ch].EnAvg = isEn;
                    }
                    else if(_curRng == _Self.AVGERAGE_IS_DISABLED){
                        _aiAvgMskArray[ch].EnAvg = isEn;
                        if(isEn == 1){
                            _curRng = _aiAvgMskArray[ch].Rng;
                        }
                    }
                    else{
                        if(isEn == 1){
                            var rangeDesc = Advantech.Profile.AIRangeEmun[_curRng];
                            throw new Error("The input range of selected channels for average must be the "+rangeDesc+".");
                        }else{
                            _aiAvgMskArray[ch].EnAvg = isEn;
                        }
                    }
                };
                this.getAvgMaskObj = function(){
                    return _aiAvgMskArray;
                };

            },
            AICommonData: function(EnB, BMd, AvgM, Smp, Res, aiCgObj, AiT, Inv){
                var _IntegrationEmun = Advantech.Profile.AIIntegrationModeEmun;
                var _IntegrationVal = 0;
                var _AIBurnOutScaleModeEmun = Advantech.Profile.AIBurnOutScaleModeEmun;
                var _SamplingEmun = Advantech.Profile.AISamplingSpeedEmun;
                var _avgMaskObj = new Advantech.Data.IOData.AIAvgMaskData(aiCgObj, AvgM);

                this.setIntegrationEmun = function(val){
                    _IntegrationVal = val;
                };

                this.setAIBurnOutScaleModeEmun = function(val){
                    _AIBurnOutScaleModeEmun = val;
                };

                this.setSamplingEmun = function(val){
                    _SamplingEmun = val;
                };

                this.getRes = function() {
                    return Res;
                };

                this.setRes = function(val) {
                    if((val < 1 || val > 23)){
                        throw new Error("Out of range 1~23 in Res");
                    }
                    else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in Res");
                    }else{
                        Res = val;
                    }
                };

                this.getEnB = function() {
                    return EnB;
                };

                this.setEnB = function(val){
					var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                    var bSupportAIBurnout = Advantech.Profile.DeviceEmun[module].isSupportAIBurnout;
                    if(bSupportAIBurnout != undefined && bSupportAIBurnout){
                        if(val === 1 || val === 0) {
                            EnB = val;
                        }else{
                            throw new Error("Must be 0 or 1 in EnB");
                        }
                    }else{
                        EnB = undefined;
                    }
                };

                this.getBMd = function() {
                    return BMd;
                };

                this.setBMd = function(val) {
					var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                    var bSupportAIBurnout = Advantech.Profile.DeviceEmun[module].isSupportAIBurnout;
                    if(bSupportAIBurnout != undefined && bSupportAIBurnout){
                        try {
                            var type = _AIBurnOutScaleModeEmun[val];
                            if(type == undefined){
                                throw new Error("");
                            }
                            BMd = val;
                        } catch (e) {
                            throw new Error("Must be 0 or 1 in BMd");
                        }
                    }
                    else{
                        BMd = undefined;
                    }
                };

                this.getAvgM = function() {
                    return _avgMaskObj.getAvgM();
                };

                this.setAvgM = function(val) {
                    try{
                        if(!$.isNumeric(val)) {
                            throw new Error("Must be a number in AvgM");
                        }
                        else {
                            _avgMaskObj.setAvgM(val);
                        }
                    }catch(e){
                        throw e;
                    }
                };
                this.setRng = function(ch, rng){
                    try{
                       _avgMaskObj.setRng(ch, rng);
                    }catch(e){
                        throw e;
                    }
                };
                this.getSmp = function() {
                    return Smp;
                };
                this.setSmp = function(val){
                    try {
                        var type = _SamplingEmun[val];
                        if(type == undefined || type == "Reserved"){
                            throw new Error("");
                        }
                        Smp = val;
                    } catch (e) {
                        throw new Error("Not existed this type in Smp");
                    }
                };
                this.getAiT = function() {
                    return AiT;
                };
                this.setAiT = function(val){
                    try {
                        var type = _IntegrationEmun[val];
                        if(type == undefined || type == "Reserved"){
                            throw new Error("");
                        }
                        AiT = val;
                    } catch (e) {
                        throw new Error("Not existed this type in AiT");
                    }
                };
                this.getInv = function() {
                    return Inv;
                };
                this.setInv = function(val) {
                    if((val < 1 || val > 86400)){
                        throw new Error("Out of range 1~86400 in conversion interval");
                    }
                    else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in conversion interval");
                    }else{
                        Inv = val;
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(jsonObj.EnB != undefined) {
                            this.setEnB(Number(jsonObj.EnB));
                        }
                        if(jsonObj.EnB != undefined) {
                            this.setBMd(Number(jsonObj.BMd));
                        }
                        if(jsonObj.Smp != undefined) {
                            this.setSmp(Number(jsonObj.Smp));
                        }/*else if(jsonObj.AiT != undefined) {
                            this.setAiT(Number(jsonObj.AiT));
                        }else{
                            throw new Error("Smp or AiT must exist");
                        }*/
                        if(jsonObj.Res != undefined){
                            this.setRes(Number(jsonObj.Res));
                        }
                        if(jsonObj.Inv != undefined){
                            this.setInv(Number(jsonObj.Inv));
                        }
                        this.setAvgM(Number(jsonObj.AvgM));
                    }
                    catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
					var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                    var bSupportAIBurnout = Advantech.Profile.DeviceEmun[module].isSupportAIBurnout;
                    if(bSupportAIBurnout != undefined && bSupportAIBurnout) {
                        return {
                            EnB: int(this.getEnB()),
                            BMd: int(this.getBMd()),
                            AvgM: int(this.getAvgM()),
                            Res: int(this.getRes()),
                            Smp: int(this.getSmp()),
                            AiT: int(this.getAiT()),
                            Inv: int(this.getInv())
                        };
                    }else{
                        return {
                            AvgM: int(this.getAvgM()),
                            Res: int(this.getRes()),
                            Smp: int(this.getSmp()),
                            AiT: int(this.getAiT()),
                            Inv: int(this.getInv())
                        };
                    }
                };
            },
            /*inherited from AIOConfigBaseData*/
            AIConfigBaseData: function(index, tagName, range, enCh, enLAlarm, lAlarmMd, alarmLoVal, alarmLoScVal, enHAlarm, hAlarmMd, alarmHiVal, alarmHiScVal, phyLoScVal, phyHiScVal, mappingUnit) {
                Advantech.Data.IOData.AIOConfigBaseData.apply(this, arguments);
                var _AlarmMdEmun = Advantech.Profile.AIAlarmModeEmun;
                var _Self = this;
                (function(){//initial range emun
                    _Self.setModeTypeEmun(Advantech.Profile.AIRangeEmun);
                })();
                this.setAlarmMdEmun = function(val){
                    _AlarmMdEmun = val;
                };

                this.getRng = function() {
                    return range;
                };

                this.setRng = function(val){
                    try {
                        if(val != undefined){
                            var type = _Self.getModeTypeEmun()[val];
                            if(type == undefined || type == "Reserved"){
                                throw new Error("");
                            }
                        }
                        range = val;
                    } catch (e) {
                        throw new Error("Not existed this type in Rng");
                    }
                };

                this.getEn = function() {
                    return enCh;
                };

                this.setEn = function(val) {
                    if(val === 1 || val === 0 || val == undefined) {
                        enCh = val;
                    }else{
                        throw new Error("Must be 0 or 1 in En");
                    }
                };

                this.getEnLA = function() {
                    return enLAlarm;
                };

                this.setEnLA = function(val) {
                    if(val === 1 || val === 0) {
                        enLAlarm = val;
                    }else{
                        throw new Error("Must be 0 or 1 in EnLA");
                    }
                };

                this.getEnHA = function() {
                    return enHAlarm;
                };

                this.setEnHA = function(val) {
                    if(val === 1 || val === 0) {
                        enHAlarm = val;
                    }else{
                        throw new Error("Must be 0 or 1 in EnHA");
                    }
                };

                this.getLAMd = function() {
                    return lAlarmMd;
                };

                this.setLAMd = function(val) {
                    try {
                        var type = _AlarmMdEmun[val];
                        if(type == undefined || type == "Reserved"){
                            throw new Error("");
                        }
                        lAlarmMd = val;
                    } catch (e) {
                        throw new Error("Not existed this type in LAMd");
                    }
                };

                this.getHAMd = function() {
                    return hAlarmMd;
                };

                this.setHAMd = function(val) {
                    try {
                        var type = _AlarmMdEmun[val];
                        if(type == undefined || type == "Reserved"){
                            throw new Error("");
                        }
                        hAlarmMd = val;
                    }catch(e){
                        throw new Error("Not existed this type in HAMd");
                    }
                };

                this.getLoA = function() {
                    return alarmLoVal;
                };

                this.setLoA = function(val) {
                    if((val < -2147483.647 || val > 2147483.647)){
                        throw new Error("Out of range -2147483.647~2147483.647 in LoA");
                    }else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in LoA");
                    }else{
                        alarmLoVal = val;
                    }
                };

                this.getHiA = function() {
                    return alarmHiVal;
                };

                this.setHiA = function(val) {
                    if((val < -2147483.647 || val > 2147483.647)){
                        throw new Error("Out of valid range -2147483.647~2147483.647 in HiA");
                    }else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in HiA");
                    }else{
                        alarmHiVal = val;
                    }
                };

                this.getLoS = function() {
                    return alarmLoScVal;
                };

                this.setLoS = function(val) {
                    if((val < -2147483.647 || val > 2147483.647)){
                        throw new Error("Out of valid range -2147483.647~2147483.647 in Los");
                    }else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in Los");
                    }else {
                        alarmLoScVal = val;
                    }
                };

                this.getHiS = function() {
                    return alarmHiScVal;
                };

                this.setHiS = function(val) {
                    if((val < -2147483.647 || val > 2147483.647)){
                        throw new Error("Out of valid range -2147483.647~2147483.647 in HiS");
                    }else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in HiS");
                    }else {
                        alarmHiScVal = val;
                    }
                };

                this.getLoP = function() {
                    return phyLoScVal;
                };
                this.setLoP = function(val) {
                    if(val < -2147483.647 || val > 2147483.647){
                        throw new Error("Out of valid range -2147483.647~2147483.647 in LoP");
                    }else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in LoP");
                    }else
                        phyLoScVal = val;
                };
                this.getHiP = function() {
                    return phyHiScVal;
                };
                this.setHiP = function(val) {
                    if(val < -2147483.647 || val > 2147483.647){
                        throw new Error("Out of valid range -2147483.647~2147483.647 in HiP");
                    }else if(!$.isNumeric(val)) {
                        throw new Error("Must be a number in HiP");
                    }else
                        phyHiScVal = val;
                };
                this.getUni = function() {
                    return mappingUnit;
                };
                this.setUni = function(val) {
                    mappingUnit = val;
                };

                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setRng(Number(jsonObj.Rng) || undefined);
                        //this.setEn(Number(jsonObj.En) || undefined);
                        this.setEn(jsonObj.En==undefined ? undefined : Number(jsonObj.En));
                        if(typeof(jsonObj.EnLA)!='undefined') this.setEnLA(Number(jsonObj.EnLA));
                        if(typeof(jsonObj.EnHA)!='undefined') this.setEnHA(Number(jsonObj.EnHA));
                        this.setTagName(jsonObj.Tag);
                        this.setLAMd(Number(jsonObj.LAMd) || 0);
                        this.setHAMd(Number(jsonObj.HAMd) || 0);
                        this.setLoA(parseFloat(jsonObj.LoA) || 0);
                        this.setHiA(parseFloat(jsonObj.HiA) || 0);
                        if(typeof(jsonObj.LoS)!='undefined') this.setLoS(parseFloat(jsonObj.LoS));
                        if(typeof(jsonObj.HiS)!='undefined') this.setHiS(parseFloat(jsonObj.HiS));
                        this.setLoP(parseFloat(jsonObj.LoP) || 0);
                        this.setHiP(parseFloat(jsonObj.HiP) || 0);
                        //this.setUni(jsonObj.Uni);
                    }
                    catch (e) {
                        throw e;
                    }
                };

                this.toJson = function() {
                    if(this.getRng() == undefined && this.getEn() == undefined){
                        return {
                            Ch: Number(this.getIndex()),
                            Tag: this.getTagName(),
                            EnLA: Number(this.getEnLA()),
                            EnHA: Number(this.getEnHA()),
                            LAMd: Number(this.getLAMd()),
                            HAMd: Number(this.getHAMd()),
                            LoA: this.getLoA()+"",
                            HiA: this.getHiA()+"",
                            LoS: this.getLoS()+"",
                            HiS: this.getHiS()+"",
                            LoP: this.getLoP()+"",
                            HiP: this.getHiP()+""
                            //Uni: (this.getUni() || "")+""
                        };
                    }
                    return {
                        Ch: Number(this.getIndex()),
                        Tag: this.getTagName(),
                        Rng: Number(this.getRng()),
                        En: Number(this.getEn()),
                        EnLA: Number(this.getEnLA()),
                        EnHA: Number(this.getEnHA()),
                        LAMd: Number(this.getLAMd()),
                        HAMd: Number(this.getHAMd()),
                        LoA: this.getLoA()+"",
                        HiA: this.getHiA()+"",
                        LoS: this.getLoS()+"",
                        HiS: this.getHiS()+"",
                        LoP: this.getLoP()+"",
                        HiP: this.getHiP()+""
                        //Uni: (this.getUni() || "")+""
                    };
                };
            },

            AITypeDataFactory: function() {
                this.instance = function(jsonObj, aiCfgObj) {
                    if(jsonObj.hasOwnProperty("Ch")){//channel config
                        return new Advantech.
                                Data.
                                IOData.
                                AIConfigBaseData(int(jsonObj.Ch),
                                                jsonObj.Tag,
                                                jsonObj.Rng,
                                                int(jsonObj.En),
                                                int(jsonObj.EnLA),
                                                int(jsonObj.LAMd),
                                                parseFloat(jsonObj.LoA),
                                                parseFloat(jsonObj.LoS),
                                                int(jsonObj.EnHA),
                                                int(jsonObj.HAMd),
                                                parseFloat(jsonObj.HiA),
                                                parseFloat(jsonObj.HiS),
                                                parseFloat(jsonObj.LoP),
                                                parseFloat(jsonObj.HiP),
                                                jsonObj.Uni
                                                );
                    }
                    else if(!jsonObj.hasOwnProperty("EnB")){//common config without EnB
                        return new Advantech.
                            Data.
                            IOData.
                            AICommonData(undefined,
                            undefined,
                            int(jsonObj.AvgM),
                            int(jsonObj.Smp),
                            int(jsonObj.Res),
                            aiCfgObj,
                            int(jsonObj.AiT),
                            int(jsonObj.Inv));
                    }
                    else if(jsonObj.hasOwnProperty("EnB")){//common config with EnB
                        return new Advantech.
                            Data.
                            IOData.
                            AICommonData(int(jsonObj.EnB),
                            int(jsonObj.BMd),
                            int(jsonObj.AvgM),
                            int(jsonObj.Smp),
                            int(jsonObj.Res),
                            aiCfgObj,
                            int(jsonObj.AiT),
                            int(jsonObj.Inv));
                    }
                };
            },

            /*inherited from InternalIOConfigBaseData*/
            DIOConfigBaseData: function(index, tagName, mode, En) {
                Advantech.Data.IOData.InternalIOConfigBaseData.apply(this, arguments);
                var _ModeTypeEmun = null;
                //Robert(2017/11/09): use En to check if channel is disabled
                var _chEnableDisable = En; //must set init value
                this.getEn = function() {
                    return _chEnableDisable;
                };
                this.setEn = function(val){
                   _chEnableDisable = val;
                };

                this.getMode = function() {
                    return mode;
                };
                this.setModeTypeEmun = function(val){
                   _ModeTypeEmun = val;
                };
                this.getModeTypeEmun = function(){
                    if(_ModeTypeEmun == null){
                        return null;
                    }
                    else{
                        return _ModeTypeEmun;
                    }
                };
                this.setMode = function(md) {};
            },
            /*inherited from DIOConfigBaseData*/
            DIConfigBaseData: function(index, tagName, mode, En) {
                Advantech.Data.IOData.DIOConfigBaseData.apply(this, arguments);
                var _Self = this;
                this.getMode = function() {
                    return mode;
                };
                this.setMode = function(md) {
                    try {
                        var type = this.getModeTypeEmun()[md];
                        mode = md;
                    } catch (e) {
                        throw new Error("Not existed this type in Md");
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        Tag: this.getTagName(),
                        En: int(this.getEn()),
                    };
                };
                (function(){
                    _Self.setModeTypeEmun(Advantech.Profile.DIModeTypeEmun);
                })();
            },

            IIOConfigChangeObserver: function() {
                this.dataAppended = function(obj, e) {
                    throw new Error("Not Impelment dataChanged Function");
                };
                this.dataChanged = function(obj, e) {
                    throw new Error("Not Impelment dataChanged Function");
                };
                this.dataErrorOccurred = function(obj, e) {
                    throw new Error("Not Impelment dataErrorOccurred Function");
                };
                this.dataCleared = function(obj, e) {
                    throw new Error("Not Impelment dataCleared Function");
                };
            },
            IOConfigData:function(){
                var IOConfig = [];
                this.setConfig = function(Json){
                    IOConfig = Json;
                }
                this.getConfig = function(){
                    return IOConfig;
                }
            },
            IOTypeConfigDataModule: function(dataTypeFactory, ioModeRangeEmun) {
                var mObservers = [];
                this.COMMON_CONFIG_KEY = Advantech.Profile.COMMON_CONFIG_KEY;
                var _ModeRangeTypeEmun = ioModeRangeEmun;
                var mList = {};
                var mLength = 0;
                var mDataTypeFactory = dataTypeFactory;
                this.getModeRangeTypeEmun = function(){
                    return _ModeRangeTypeEmun;
                }
                this.getSubscribers = function(){
                    return mObservers;
                };
                this.getHashTable = function(){
                    return mList;
                };
                this.getLength = function(){
                    return mLength;
                };
                this.getDataTypeFactory = function(){
                    return mDataTypeFactory;
                };
                this.getLength = function() {
                    return mLength;
                };

                this.subscribeDataChange = function(obj) {
                    if(obj.hasOwnProperty('dataChanged') && obj.hasOwnProperty('dataCleared')) {
                        mObservers.push(obj);
                    }else{
                        throw new Error("Subcribe Object hadn't extend from IIOConfigChangeObserver");
                    }
                };

                this.unsubscribe = function(obj) {
                    mObservers = mObservers.filter(
                        function(item) {
                            if(item !== obj) {
                                return item;
                            }
                        }
                    );
                };

                this.appendData = function(key, jsonObj, cfgObj) {
                    try {
                        if(!mList.hasOwnProperty(key)) {
                            mList[key] = mDataTypeFactory.instance(jsonObj, cfgObj);
                            if(this.COMMON_CONFIG_KEY != key){
                                mList[key].setModeTypeEmun(this.getModeRangeTypeEmun());
                            }
                            mLength++;
                            var ioType = '';
                            if(this.getDataTypeFactory() instanceof Advantech.Data.IOData.DITypeDataFactory){
                                ioType = 'DI';
                            }
                            if(this.getDataTypeFactory() instanceof Advantech.Data.IOData.AITypeDataFactory){
                                ioType = 'AI';
                            }
                            for (var i = 0; i < mObservers.length; ++i) {
                                mObservers[i].dataAppended(this, {
                                    Key: key,
                                    Obj: mList[key].toJson(),
                                    Type: ioType
                                });
                            }
                        }else{
                            throw new Error(key + " has existed.");
                        }
                    } catch (e) {
                        throw e;
                    }
                };

                this.removeData = function(key) {
                    if(typeof(mList[key]) != 'undefined') {
                        mLength--;
                        delete mList[key];
                    }
                };

                this.getData = function(key) {
                    return mList[key];
                };

                this.setData = function(key, jsonObj) {
                    if(typeof(mList[key]) == 'undefined') {
                        throw new Error("The Key " + key + " has not in the hashtable");
                    }
                    var preObj, isChanged;

                    preObj = mList[key];
                    try {
                        if(mList[key].getMode() !== int(jsonObj.Md)) {
                            mList[key] = mDataTypeFactory.instance(jsonObj);
                            mList[key].setModeTypeEmun(this.getModeRangeTypeEmun());
                        }
                        mList[key].setData(jsonObj);
                        isChanged = true;
                    } catch (e) {
                        isChanged = false;
                        for (var i = 0; i < mObservers.length; ++i) {
                            mObservers[i].dataErrorOccurred(this, {
                                Key: key,
                                PreObj: preObj.toJson(),
                                Obj: preObj.toJson(),
                                Msg: e.message
                            });
                        }
                        return false;
                    }
                    var e = {
                        Key: key,
                        PreObj: preObj.toJson(),
                        Obj: mList[key].toJson(),
                        isChanged: isChanged
                    };
                    for (var i = 0; i < mObservers.length; ++i) {
                        mObservers[i].dataChanged(this, e);
                    }
                    return true;
                };

                this.hasData = function(in_key) {
                    return typeof(mList[in_key]) != 'undefined';
                };

                this.clearData = function() {
                    for (var i in mList) {
                        delete mList[i];
                    }
                    mLength = 0;
                    for (var i = 0; i < mObservers.length; ++i) {
                        mObservers[i].dataCleared(this, {});
                    }
                };
            },
            //Inherit form IOTypeConfigDataModule
            AITypeConfigDataModule: function(dataTypeFactory, rangeTypeEmun) {
                Advantech.Data.IOData.IOTypeConfigDataModule.apply(this, [dataTypeFactory, rangeTypeEmun]);
                var _Self = this;
                this.setData = function(key, jsonObj) {
                    if(typeof(_Self.getHashTable()[key]) == 'undefined') {
                        throw new Error("The Key " + key + " has not in the hashtable");
                    }
                    var preObj = _Self.getHashTable()[key],
                        isChanged = false,
                        subscribers =  _Self.getSubscribers(),
                        hashTb = _Self.getHashTable();
                    try {
                        if(key != _Self.COMMON_CONFIG_KEY){
                            hashTb[_Self.COMMON_CONFIG_KEY].setRng(jsonObj.Ch, jsonObj.Rng);
                        }
                        hashTb[key].setData(jsonObj);
                        isChanged = true;
                    } catch (e) {
                        for (var i = 0; i <subscribers.length; ++i) {
                            _Self.getSubscribers()[i].dataErrorOccurred(_Self, {
                                Key: key,
                                PreObj: preObj.toJson(),
                                Obj: preObj.toJson(),
                                Msg: e.message
                            });
                        }
                        return false;
                    }
                    var e = {
                        Key: key,
                        PreObj: preObj.toJson(),
                        Obj: hashTb[key].toJson(),
                        isChanged: isChanged
                    };
                    for (var i = 0; i <subscribers.length; ++i) {
                        subscribers[i].dataChanged(_Self, e);
                    }
                    return true;
                };
            },

            DITypeDataFactory: function() {
                this.instance = function(jsonObj) {
                    var mode = Number(jsonObj.Md);
                    //Robert(2016/12/14): remove DI modes and display all values in original 5 DI modes
                    return new Advantech.
                        Data.
                        IOData.
                        DIConfigAllData(Number(jsonObj.Ch), jsonObj.Tag, mode, Number(jsonObj.En), Number(jsonObj.Inv), Number(jsonObj.Fltr), Number(jsonObj.FtLo), Number(jsonObj.FtHi), parseFloat(jsonObj.CntIV), Number(jsonObj.CntKp), int(jsonObj.FqT), int(jsonObj.FqP));
                    /*
                    if(mode === 0) {
                        return new Advantech.
                        Data.
                        IOData.
                        DIConfigDIData(Number(jsonObj.Ch), jsonObj.Tag, mode, Number(jsonObj.Inv), Number(jsonObj.Fltr), Number(jsonObj.FtLo), Number(jsonObj.FtHi));
                    }else if(mode === 1) {
                        return new Advantech.
                        Data.
                        IOData.
                        DIConfigCntData(Number(jsonObj.Ch), jsonObj.Tag, mode, Number(jsonObj.Inv), Number(jsonObj.Fltr), Number(jsonObj.FtLo), Number(jsonObj.FtHi), parseFloat(jsonObj.CntIV), Number(jsonObj.CntKp));
                    }else if(mode === 2) {
                        return new Advantech.
                        Data.
                        IOData.
                        DIConfigL2HData(Number(jsonObj.Ch), jsonObj.Tag, mode, Number(jsonObj.Inv));
                    }else if(mode === 3) {
                        return new Advantech.
                        Data.
                        IOData.
                        DIConfigH2LData(Number(jsonObj.Ch), jsonObj.Tag, mode, Number(jsonObj.Inv));
                    }else if(mode === 4) {
                        return new Advantech.
                        Data.
                        IOData.
                        DIConfigFrqData(int(jsonObj.Ch), jsonObj.Tag, mode, int(jsonObj.FqT), int(jsonObj.FqP));
                    }else if(mode === 255) {
                        return new Advantech.Data.IOData.DIConfigInvalidMode(Number(jsonObj.Ch), jsonObj.Tag, mode, Number(jsonObj.Inv));
                    }else{
                        throw new Error("Not exist this mode type in DI");
                    }
                    */
                };
            },
            /*inherited from DIConfigBaseData*/
            DIConfigAllData: function(index, tagName, mode, En, inv, fltr, ftLo, ftHi, cntIV, cntKp, fqT, fqP) {
                Advantech.Data.IOData.DIConfigBaseData.apply(this, arguments);
                //Robert(2017/11/09): use En to check if channel is disabled
                this.getEn = function() {
                    return En;
                };
                this.setEn = function(val) {
                    En = val;
                };
                this.getFtLo = function() {
                    return ftLo;
                };
                this.setFtLo = function(val) {
                    if(val > 0 && val <= 65535) {
                        ftLo = val;
                    }else{
                        if(Advantech.Data.ModuleData.getInstance().getIoMode() == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE){//Low power mode: unit sec
                            throw new Error("Out of range 1~6 in FtLo");
                        }else{
                            throw new Error("Out of range 1~65535 in FtLo");
                        }
                    }
                };
                this.getFtHi = function() {
                    return ftHi;
                };
                this.setFtHi = function(val) {
                    if(val > 0 && val <= 65535) {
                        ftHi = val;
                    }else{
                        if(Advantech.Data.ModuleData.getInstance().getIoMode() == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE){//Low power mode: unit sec
                            throw new Error("Out of range 1~6 in FtHi");
                        }else{
                            throw new Error("Out of range 1~65535 in FtHi");
                        }
                    }
                };
                this.getCntIV = function() {
                    return cntIV;
                };
                this.setCntIV = function(val) {
                    if(val >= 0 && val <= 4294967295) {
                        cntIV = val;
                    }else{
                        throw new Error("Out of range 0~4294967295 in CntIV");
                    }
                };
                this.getFltr = function() {
                    return fltr;
                };
                this.setFltr = function(val) {
                    if(val == 1 || val == 0) {
                        fltr = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Fltr");
                    }
                };
                this.getCntKp = function() {
                    return cntKp;
                };

                this.setCntKp = function(val) {
                    if(val == 1 || val == 0) {
                        cntKp = val;
                    }else{
                        throw new Error("Must be 0 or 1 in CntKp");
                    }
                };
                this.getInv = function() {
                    return inv;
                };
                this.setInv = function(val) {
                    if(val == 1 || val == 0) {
                        inv = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Inv");
                    }
                };
                this.getFqP = function() {
                    return fqP;
                };
                this.setFqP = function(val) {
                    if(val ==0 || val == 1) {
                        fqP = val;
                    }else{
                        throw new Error("Must be 0 or 1 in FqP");
                    }
                };
                this.getFqT = function() {
                    return fqT;
                };
                this.setFqT = function(val) {
                    if(val > 0 && val <= 255) {
                        fqT = val;
                    }else{
                        throw new Error("Out of range 1~255 in FqT");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match in Setting Data");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setEn(int(jsonObj.En));
                        this.setCntKp(int(jsonObj.CntKp));
                        this.setCntIV(parseFloat(jsonObj.CntIV));
                        this.setInv(int(jsonObj.Inv));
                        this.setTagName(jsonObj.Tag);
                        this.setFltr(int(jsonObj.Fltr));
                        this.setFtHi(int(jsonObj.FtHi));
                        this.setFtLo(int(jsonObj.FtLo));
                        //set default frequency value when IO is in Low power mode to prevent data check error
                        var ioMode = Advantech.Data.ModuleData.getInstance().getIoMode();
                        if(ioMode == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE){// 1: low power mode
                            this.setFqP(0);
                            this.setFqT(100);
                        }else{// 0: performance mode
                            this.setFqP(int(jsonObj.FqP));
                            this.setFqT(int(jsonObj.FqT));
                        }
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        En: int(this.getEn()),
                        Md: int(this.getMode()),
                        Inv: int(this.getInv()),
                        Fltr: int(this.getFltr()),
                        FtHi: int(this.getFtHi()),
                        FtLo: int(this.getFtLo()),
                        Tag: this.getTagName(),
                        CntIV: parseFloat(this.getCntIV()),
                        CntKp: int(this.getCntKp()),
                        FqT: int(this.getFqT()),
                        FqP: int(this.getFqP())
                    };
                };
            },
            /*inherited from DIConfigBaseData*/
/*
            DIConfigDIData: function(index, tagName, mode, inv, fltr, ftLo, ftHi) {
                Advantech.Data.IOData.DIConfigBaseData.apply(this, arguments);
                this.getInv = function() {
                    return inv;
                };
                this.setInv = function(val) {
                    if(val === 1 || val === 0) {
                        inv = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Inv");
                    }
                };
                this.getFltr = function() {
                    return fltr;
                };
                this.setFltr = function(val) {
                    if(val === 1 || val === 0) {
                        fltr = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Fltr");
                    }
                };
                this.getFtLo = function() {
                    return ftLo;
                };
                this.setFtLo = function(val) {
                    if(val > 0 && val <= 65535) {
                        ftLo = val;
                    }else{
                        throw new Error("Out of range 1~65535 in ftLo");
                    }
                };
                this.getFtHi = function() {
                    return ftHi;
                };
                this.setFtHi = function(val) {
                    if(val > 0 && val <= 65535) {
                        ftHi = val;
                    }else{
                        throw new Error("Out of range 1~65535 in ftHi");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(Number(jsonObj.Md));
                        this.setInv(Number(jsonObj.Inv));
                        this.setTagName(jsonObj.Tag);
                        this.setFltr(Number(jsonObj.Fltr));
                        this.setFtHi(Number(jsonObj.FtHi));
                        this.setFtLo(Number(jsonObj.FtLo));
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: Number(this.getIndex()),
                        Md: Number(this.getMode()),
                        Inv: Number(this.getInv()),
                        Fltr: Number(this.getFltr()),
                        FtHi: Number(this.getFtHi()),
                        FtLo: Number(this.getFtLo()),
                        Tag: this.getTagName()
                    };
                };
            },
*/
            /*inherited from DIConfigBaseData*/
/*
            DIConfigCntData: function(index, tagName, mode, inv, fltr, ftLo, ftHi, cntIV, cntKp) {
                Advantech.Data.IOData.DIConfigBaseData.apply(this, arguments);
                this.getFtLo = function() {
                    return ftLo;
                };
                this.setFtLo = function(val) {
                    if(val > 0 && val <= 65535) {
                        ftLo = val;
                    }else{
                        throw new Error("Out of range 1~65535 in FtLo");
                    }
                };
                this.getFtHi = function() {
                    return ftHi;
                };
                this.setFtHi = function(val) {
                    if(val > 0 && val <= 65535) {
                        ftHi = val;
                    }else{
                        throw new Error("Out of range 1~65535 in FtHi");
                    }
                };
                this.getCntIV = function() {
                    return cntIV;
                };
                this.setCntIV = function(val) {
                    if(val >= 0 && val <= 4294967295) {
                        cntIV = val;
                    }else{
                        throw new Error("Out of range 0~4294967295 in CntIV");
                    }
                };
                this.getFltr = function() {
                    return fltr;
                };
                this.setFltr = function(val) {
                    if(val == 1 || val == 0) {
                        fltr = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Fltr");
                    }
                };
                this.getCntKp = function() {
                    return cntKp;
                };

                this.setCntKp = function(val) {
                    if(val == 1 || val == 0) {
                        cntKp = val;
                    }else{
                        throw new Error("Must be 0 or 1 in CntKp");
                    }
                };
                this.getInv = function() {
                    return inv;
                };
                this.setInv = function(val) {
                    if(val == 1 || val == 0) {
                        inv = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Inv");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match in CNT");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setCntKp(int(jsonObj.CntKp));
                        this.setCntIV(parseFloat(jsonObj.CntIV));
                        this.setInv(int(jsonObj.Inv));
                        this.setTagName(jsonObj.Tag);
                        this.setFltr(int(jsonObj.Fltr));
                        this.setFtHi(int(jsonObj.FtHi));
                        this.setFtLo(int(jsonObj.FtLo));
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        Inv: int(this.getInv()),
                        Fltr: int(this.getFltr()),
                        FtHi: int(this.getFtHi()),
                        FtLo: int(this.getFtLo()),
                        Tag: this.getTagName(),
                        CntIV: parseFloat(this.getCntIV()),
                        CntKp: int(this.getCntKp())
                    };
                };
            },
*/
            /*inherited from DIConfigBaseData*/
/*
            DIConfigL2HData: function(index, tagName, mode, inv) {
                Advantech.Data.IOData.DIConfigBaseData.apply(this, arguments);
                this.getInv = function() {
                    return inv;
                };
                this.setInv = function(val) {
                    if(val === 1 || val === 0) {
                        inv = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Inv");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setInv(int(jsonObj.Inv));
                        this.setTagName(jsonObj.Tag);
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        Inv: int(this.getInv()),
                        Tag: this.getTagName()
                    };
                };
            },
*/
            /*inherited from DIConfigBaseData*/
/*
            DIConfigH2LData: function(index, tagName, mode, inv) {
                Advantech.Data.IOData.DIConfigBaseData.apply(this, arguments);
                this.getInv = function() {
                    return inv;
                };
                this.setInv = function(val) {
                    if(val === 1 || val === 0) {
                        inv = val;
                    }else{
                        throw new Error("Must be 0 or 1 in Inv");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setInv(int(jsonObj.Inv));
                        this.setTagName(jsonObj.Tag);
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        Inv: int(this.getInv()),
                        Tag: this.getTagName()
                    };
                };
            },
            DIConfigInvalidMode: function(index, tagName, mode, inv) {
                Advantech.Data.IOData.DIConfigBaseData.apply(this, arguments);
                this.getInv = function() {
                    return inv;
                };
                this.setInv = function(val) {
                    inv = val;
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setInv(int(jsonObj.Inv));
                        this.setTagName(jsonObj.Tag);
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        Inv: int(this.getInv()),
                        Tag: this.getTagName()
                    };
                }
            },
*/
            /*inherited from DIConfigBaseData*/
/*
            DIConfigFrqData: function(index, tagName, mode, fqT, fqP) {
                Advantech.Data.IOData.DIConfigBaseData.apply(this, arguments);
                this.getFqP = function() {
                    return fqP;
                };
                this.setFqP = function(val) {
                    if(val ==0 || val == 1) {
                        fqP = val;
                    }else{
                        throw new Error("Must be 0 or 1 in FqP");
                    }
                };
                this.getFqT = function() {
                    return fqT;
                };
                this.setFqT = function(val) {
                    if(val > 0 && val <= 255) {
                        fqT = val;
                    }else{
                        throw new Error("Out of range 1~255 in FqT");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setTagName(jsonObj.Tag);
                        this.setFqP(int(jsonObj.FqP));
                        this.setFqT(int(jsonObj.FqT));
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        Tag: this.getTagName(),
                        FqT: int(this.getFqT()),
                        FqP: int(this.getFqP())
                    };
                };
            },
*/
            /*inherited from DIOConfigBaseData*/
            DOConfigBaseData: function(index, tagName, mode, fsv) {
                Advantech.Data.IOData.DIOConfigBaseData.apply(this, arguments);
                var _Self = this;
                this.setMode = function(md) {
                    var type = this.getModeTypeEmun()[md];
                    if(type === undefined) {
                        throw new Error("Not existed this type in Md");
                    }else{
                        mode = md;
                    }

                };
                this.getFSV = function() {
                    return fsv;
                };
                this.setFSV = function(fsvVal) {
                    if(fsvVal === 1 || fsvVal === 0) {
                        fsv = fsvVal;
                    }else{
                        throw new Error("Must be 0 or 1 in FSV");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setEn(int(jsonObj.En));
                        this.setTagName(jsonObj.Tag);
                        this.setFSV(int(jsonObj.FSV));
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        En: int(this.getEn()),
                        Md: int(this.getMode()),
                        FSV: int(this.getFSV()),
                        Tag: this.getTagName()
                    };
                };
                (function(){
                    _Self.setModeTypeEmun(Advantech.Profile.DOModeTypeEmun);
                })();
            },

            DOTypeDataFactory: function() {
                this.instance = function(jsonObj) {
                    var mode = int(jsonObj.Md, 10);
                    if(mode === 0) {
                        return new Advantech.
                        Data.
                        IOData.
                        DOConfigDOData(int(jsonObj.Ch), jsonObj.Tag, mode, int(jsonObj.En), int(jsonObj.FSV));
                    }else if(mode === 1) {
                        return new Advantech.
                        Data.
                        IOData.
                        DOConfigPulseOutData(int(jsonObj.Ch), jsonObj.Tag, mode, int(jsonObj.En), int(jsonObj.FSV), int(jsonObj.PsLo), int(jsonObj.PsHi));
                    }else if(mode === 2) {
                        return new Advantech.
                        Data.
                        IOData.
                        DOConfigL2HDData(int(jsonObj.Ch), jsonObj.Tag, mode, int(jsonObj.En), int(jsonObj.FSV), int(jsonObj.LDT));
                    }else if(mode === 3) {
                        return new Advantech.
                        Data.
                        IOData.
                        DOConfigH2LDData(int(jsonObj.Ch), jsonObj.Tag, mode, int(jsonObj.En), int(jsonObj.FSV), int(jsonObj.HDT));
                    }else if(mode === 4) {
                        return new Advantech.
                        Data.
                        IOData.
                        DOConfigAIAlrDrData(int(jsonObj.Ch), jsonObj.Tag, mode, int(jsonObj.En), int(jsonObj.ACh), int(jsonObj.AMd));
                    }else{
                        throw new Error("Not exist this mode:" + mode + " type in DODataFactory");
                    }
                };
            },

            RelayTypeDataFactory: function() {
                this.instance = function(jsonObj) {
                    var mode = int(jsonObj.Md, 10);
                    if(mode === 1) {
                        return new Advantech.
                        Data.
                        IOData.
                        RelayConfigPulseOutData(int(jsonObj.Ch), jsonObj.Tag, mode, int(jsonObj.En), int(jsonObj.FSV), int(jsonObj.PsLo), int(jsonObj.PsHi));
                    }
                    else {
                        try{
                            var data = new Advantech.Data.IOData.DOTypeDataFactory().instance(jsonObj);
                            return  data;
                        }
                        catch(e){
                            throw new Error("Not exist this mode:" + mode + " type in RelayDataFactory");
                        }
                    }
                };
            },

            DOConfigDOData: function(index, tagName, mode, En, fsv) {
                Advantech.Data.IOData.DOConfigBaseData.apply(this, arguments);
            },
            //Inherit DOConfigPulseOutData
            RelayConfigPulseOutData: function(index, tagName, mode, En, fsv, psLo, psHi) {
                Advantech.Data.IOData.DOConfigPulseOutData.apply(this, arguments);
                this.getPsLo = function() {
                    return psLo;
                };
                this.getPsHi = function() {
                    return psHi;
                };
                this.setPsLo = function(val) {
                    var min = 5000;
                    if(val >= min && val <= 65535) {
                        psLo = val;
                    }else{
                        throw new Error("Out of range "+min+"~65535 in PsLo");
                    }
                };
                this.setPsHi = function(val) {
                    var min = 5000;
                    if(val >= min && val <= 65535) {
                        psHi = val;
                    }else{
                        throw new Error("Out of range "+min+"~65535 in PsHi");
                    }
                };
            },
            //Inherit DOConfigBaseData
            DOConfigPulseOutData: function(index, tagName, mode, En, fsv, psLo, psHi) {
                Advantech.Data.IOData.DOConfigBaseData.apply(this, arguments);
                this.getPsLo = function() {
                    return psLo;
                };
                this.setPsLo = function(val) {
                    psLo = val;
                };
                this.getPsHi = function() {
                    return psHi;
                };
                this.setPsHi = function(val) {
                    var min = 1;
                    if(val >= min && val <= 65535) {
                        psHi = val;
                    }else{
                        throw new Error("Out of range "+min+"~65535 in PsHi");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setEn(int(jsonObj.En));
                        this.setTagName(jsonObj.Tag);
                        this.setFSV(int(jsonObj.FSV));
                        this.setPsLo(int(jsonObj.PsLo));
                        this.setPsHi(int(jsonObj.PsHi));
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        En: int(this.getEn()),
                        Md: int(this.getMode()),
                        FSV: int(this.getFSV()),
                        Tag: this.getTagName(),
                        PsLo: int(this.getPsLo()),
                        PsHi: int(this.getPsHi())
                    };
                };
            },

            //Inherit DOConfigBaseData
            DOConfigAIAlrDrData: function(index, tagName, mode, En, aCh, aMd) {
                Advantech.Data.IOData.DOConfigBaseData.apply(this, arguments);
                this.getACh = function() {
                    return aCh;
                };
                this.setACh = function(val) {
                    if($.isNumeric(val)) {
                        aCh = val;
                    }else{
                        throw new Error("Must be a numeric in ACh");
                    }
                };
                this.getAMd = function() {
                    return aMd;
                };
                this.setAMd = function(val) {
                    if($.isNumeric(val)) {
                        if(Advantech.Profile.DODrivedByAIModeEmun[val] == undefined){
                            throw new Error("Not existed this type in AMd");
                        }else{
                            aMd = val;
                        }
                    }else{
                        throw new Error("Must be a numeric in AMd");
                    }
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setEn(int(jsonObj.En));
                        this.setTagName(jsonObj.Tag);
                        this.setACh(int(jsonObj.ACh));
                        this.setAMd(int(jsonObj.AMd));
                    } catch (e) {
                        throw e;
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        En: int(this.getEn()),
                        ACh: int(this.getACh()),
                        Tag: this.getTagName(),
                        AMd: int(this.getAMd())
                    };
                };
            },

            DOConfigL2HDData: function(index, tagName, mode, En, fsv, ldt) {
                Advantech.Data.IOData.DOConfigBaseData.apply(this, arguments);
                this.getLDT = function() {
                    return ldt;
                };
                this.setLDT = function(val) {
                    if(val > 0 && val <= 65535) {
                        ldt = val;
                    }else{
                        throw new Error("Out of range 1~65535 in LDT");
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        En: int(this.getEn()),
                        Md: int(this.getMode()),
                        FSV: int(this.getFSV()),
                        Tag: this.getTagName(),
                        LDT: int(this.getLDT())
                    };
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setEn(int(jsonObj.En));
                        this.setTagName(jsonObj.Tag);
                        this.setFSV(int(jsonObj.FSV));
                        this.setLDT(int(jsonObj.LDT));
                    } catch (e) {
                        throw e;
                    }
                };
            },

            DOConfigH2LDData: function(index, tagName, mode, En, fsv, hdt) {
                Advantech.Data.IOData.DOConfigBaseData.apply(this, arguments);
                this.getHDT = function() {
                    return hdt;
                };
                this.setHDT = function(val) {
                    if(val > 0 && val <= 65535) {
                        hdt = val;
                    }else{
                        throw new Error("Out of range 1~65535 in HDT");
                    }
                };
                this.toJson = function() {
                    return {
                        Ch: int(this.getIndex()),
                        Md: int(this.getMode()),
                        En: int(this.getEn()),
                        FSV: int(this.getFSV()),
                        Tag: this.getTagName(),
                        HDT: int(this.getHDT())
                    };
                };
                this.setData = function(jsonObj) {
                    try {
                        if(int(jsonObj.Ch) !== this.getIndex()) {
                            throw new Error("Index is not match");
                        }
                        this.setMode(int(jsonObj.Md));
                        this.setEn(int(jsonObj.En));
                        this.setTagName(jsonObj.Tag);
                        this.setFSV(int(jsonObj.FSV));
                        this.setHDT(int(jsonObj.HDT));
                    } catch (e) {
                        throw e;
                    }
                };
            },
        },
        ///Main function class, for instance System, Configuration, IO Group
        AdvancedFunctionPageInfo: function(pageID, pageHref, listviewContex) {
            var mPageID = pageID; //The function ID in listveiw
            var mPageHref = pageHref; //The function page url
            var mListviewContext = listviewContex; //The context which disply on list view

            this.getPageID = function() {
                return mPageID.toString();
            };
            this.getPageHref = function() {
                return mPageHref.toString();
            };
            this.getListviewContext = function() {
                return mListviewContext.toString();
            };
        },

        //The solt information class
        SlotInfo: function(slotNum, device) {
            var mSlotNumer = slotNum; //Solt number
            var mDevice = device; //device name in the solt
            //Get the solt number
            this.getSlotNumber = function() {
                return mSlotNumer.toString();
            };
            //Get the device name
            this.getDeviceName = function() {
                return mDevice;
            };
        },

        TableData: function() {
            "use strict";
            var mColumn = [];
            var mRow = [];
            this.GetColumn = function() {
                return mColumn;
            };
            this.AddColumn = function(type, title) {
                this.GetColumn().push({
                    type: type,
                    title: title
                });
            };
            this.AddRow = function(array) {
                if(array.length != this.GetColumn().length)
                    throw new Error("The Row Data Format Error");
            };
            this.AddRows = function(array2d) {
                for (var i = 0; i < array2d.length; ++i) {
                    this.AddRow(array2d[i]);
                }
            };
        }
    },
    Control: {
        AdvantechControl: function(id) {
            "use strict";
            var mId = id;
            this.GetId = function() {
                return mId;
            }
            this.SetId = function(id) {
                mId = id;
            }
            this.createDisplayElement = function(containerId) {
                throw new Error("Not Implement createDisplayElement");
            }
        },
        Switch: function(id) {
            "use strict";
            Advantech.Control.AdvantechControl.call(this, id);
            var mSwitchHandler = null;
            this.createDisplayElement = function(containerId) {
                var switchContainer = document.createElement('div');
                switchContainer.id = this.GetId();
                switchContainer.innerHTML = "<div class='SliderSwitch'>" +
                    "<input type='checkbox' name='onoffswitch' class='SliderSwitch-checkbox' id='switch" + this.GetId() + "'>" +
                    "<label class='SliderSwitch-label' for='switch" + this.GetId() + "'>" +
                    "<span class='SliderSwitch-inner'></span>" +
                    "<span class='SliderSwitch-switch'></span>" +
                    "</label>" +
                    "</div>";
                document.getElementById(containerId).appendChild(switchContainer);
                mSwitchHandler = $("#" + this.GetId() + " input")[0] || undefined;
                if(mSwitchHandler === undefined) {
                    throw new Error("Create Switch Fail");
                }
            };
            this.setValue = function(boolStatus) {
                mSwitchHandler.checked = boolStatus;
            };
            this.getValue = function() {
                return mSwitchHandler.checked;
            };
            this.getHandle = function() {
                return mSwitchHandler;
            }
        },

        Table: function(id) {
            "use strict";
            var mData;
            Advantech.Control.AdvantechControl.call(this, id);
            this.createDisplayElement = function(containerId) {
                var tableContainer = document.createElement('div');
                tableContainer.className = 'table-responsive';
                tableContainer.id = this.GetId();
                tableContainer.innerHTML = "<table class='table table-bordered table-hover' id='" + this.GetTableId() + "'>" +
                    "<thead>" +
                    "</thead>" +
                    "<tbody>" +
                    "</tbody>" +
                    "</table>";
                document.getElementById(containerId).appendChild(tableContainer);

                if(mSwitchHandler === undefined) {
                    throw new Error("Create Switch Fail");
                }
            };
        },
        Range: function(from, to) {
            this._from = (from <= to) ? parseInt(from) : parseInt(to);
            this._to = (from <= to) ? parseInt(to) : parseInt(from);
            var _Self = this;
            this.getFrom = function() {
                return this._from;
            }
            this.setFrom = function(from) {
                this._from = from;
                if(this.getTo() < from)
                    exchange();
            }
            this.getTo = function() {
                return this._to;
            }
            this.setTo = function(to) {
                this._to = to;
                if(to < _from)
                    exchange();
            }
            var exchange = function() {
                var temp = this.getTo();
                _Self.setTo(this.getFrom());
                _Self.setFrom(temp);
            }

            this.isContain = function(value) {
                    var val = parseInt(value);
                    if(this.getFrom() <= val && this.getTo() >= val)
                        return true;
                    return false;
                },
                this.isOverlap = function(rangeObj) {
                    if(this.isContain(rangeObj.getFrom()) ||
                        this.isContain(rangeObj.getTo()) ||
                        rangeObj.isContain(this.getFrom()) ||
                        rangeObj.isContain(this.getTo()))
                        return true;
                    return false;
                }
        },
        IndicatorLight: function() {
            //this.mIdicatorLightHandler = null;
            this.mDiIdicatorLightHandler = null;
            this.mL2hLatchIdicatorLightHandler = null;
            this.mH2lLatchIdicatorLightHandler = null;
            this.mCntOverflowIdicatorLightHandler = null;
            //this.mLedNumHandler;
            this.mCounterLedNumHandler;
            this.mFreqLedNumHandler;

            //this.mbtnClrLatchHandler;
            this.mbtnH2lClrLatchHandler; //high to low latch clear btn
            this.mbtnL2hClrLatchHandler; //low to high latch clear btn
            this.mbtnRestCntHandler;
            this.mId = null;
            this.mSwitch = null;
            //this._onLatchCleared = null;
            this._onH2lLatchCleared = null;
            this._onL2hLatchCleared = null;
            this._onOverflowCleared = null;
            this._onCntRested = null;
            this._onChangeCntStatus = null;
/*
            this.onLatchCleared = function(x) {
                if(!arguments.length) return this._onLatchCleared;
                this._onLatchCleared = x;
            };
*/
            this.onH2lLatchCleared = function(x) {
                if(!arguments.length) return this._onH2lLatchCleared;
                this._onH2lLatchCleared = x;
            };
            this.onOverflowCleared = function(x) {
                if(!arguments.length) return this._onOverflowCleared;
                this._onOverflowCleared = x;
            };
            this.onL2hLatchCleared = function(x) {
                if(!arguments.length) return this._onL2hLatchCleared;
                this._onL2hLatchCleared = x;
            };
            this.onCntRested = function(x) {
                if(!arguments.length) return this._onCntRested;
                this._onCntRested = x;
            };
            this.onChangeCntStatus = function(x) {
                if(!arguments.length) return this._onChangeCntStatus;
                this._onChangeCntStatus = x;
            };
            this.createDisplayElement = function(id) {
                var Indicator = document.createElement('div');
                Indicator.className = 'col-sm-12';
                this.mId = id;
                Indicator.id = this.mId;
                Indicator.innerHTML =
                    //for DI and Frequence mode
/*
                    "<h4 class='page-header'>" +
                        "DI Status" +
                        "<a data-toggle='collapse' data-target='#collapseDIFreq" + id + "'>" +
                        "<i class='fa fa-fw fa-caret-right'>" +
                        "</i>" +
                        "</a>" +
                    "</h4>" +
                    "<div class='collapse' id='collapseDIFreq" + id + "'>" +
*/
                    "<div class='form-group row' id='collapseDI" + id + "'>" +
                        "<div class='form-group row'>"+
                            '<div style="float:left; padding-left:35px; padding-top:5px;">'+
                                "<label class='control-label'></lable>" +
                            '</div>'+
                            "<div id='diLed" + id + "' style='float:left; padding-left:10px;'>"+
                                "<input type = 'checkbox' class='Indicator-checkbox' id='diLight" + id + "'><a class='Indicator-light'></a>" +
                            "</div>"+
                        "</div>"+
                    "</div>"+ //collapseDI
                    //Frequency
                    "<div class='form-group row' id='collapseFreq" + id + "'>" +
                        "<div class='form-group row'>"+
                        '<div style="float:left; padding-left:35px; padding-top:5px;">'+
                            "<label class='control-label'></lable>" +
                        '</div>'+
                        "<div class='row' id='freqNumLed" + id + "' style='width:200px; height:40px; float:left;'>"+
                        "</div>"+
                        "</div>"+
                        //'<div style="float:left; padding-left:15px; padding-top:5px;">'+
                        //    "Frequency:<div class='row' id='freqNumLed" + id + "' style='width:200px; height:40px; float:left;'></div>" +
                        //'</div>'+
//                    "</div>"+
                    "</div>"+
                    //for Hight to Low/Low to High Latch
/*
                    "<h4 class='page-header'>" +
                        "Latch Status" +
                        "<a data-toggle='collapse' data-target='#collapseDILatch" + id + "'>" +
                        "<i class='fa fa-fw fa-caret-right'>" +
                        "</i>" +
                        "</a>" +
                    "</h4>" +
                    "<div class='collapse' id='collapseDILatch" + id + "'>" +
*/
                    //High to Low Latch
                    "<div class='form-group row' id='collapseDIH2LLatch" + id + "'>" +
                        '<div class="form-group row">'+
                            '<div style="float:left; padding-left:35px; padding-top:5px;">'+
                                "<label class='control-label'></lable>" +
                            '</div>'+
                            "<div id='h2lLed" + id + "' style='float:left; padding-left:10px;'>"+
                                "<input type = 'checkbox' class='Indicator-checkbox' id='h2lLight" + id + "'><a class='Indicator-light'></a>" +
                           "</div>"+
                           '<div style="float:left; padding-left:15px; padding-top:0px;">'+
                               "<button class='btn btn-primary btn-sm' id='btnH2lClear" + id + "'><i class='fa fa-eraser'></i> Clear</button>" +
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    //Low to High Latch
                    "<div class='form-group row' id='collapseDIL2HLatch" + id + "'>" +
                        '<div class="form-group row">'+
                            '<div style="float:left; padding-left:35px; padding-top:5px;">'+
                                "<label class='control-label'></lable>" +
                            '</div>'+
                            "<div id='l2hLed" + id + "' style='float:left; padding-left:10px;'>"+
                                "<input type = 'checkbox' class='Indicator-checkbox' id='l2hLight" + id + "'><a class='Indicator-light'></a>" +
                            "</div>"+
                            '<div style="float:left; padding-left:15px; padding-top:0px;">'+
                               "<button class='btn btn-primary btn-sm' id='btnL2hClear" + id + "'><i class='fa fa-eraser'></i> Clear</button>" +
                            '</div>'+
                        '</div>'+
                    "</div>" +
//                    "</div>" +
                     //for counter
/*
                    "<h4 class='page-header'>" +
                        "Counter Status" +
                        "<a data-toggle='collapse' data-target='#collapseDICounter" + id + "'>" +
                        "<i class='fa fa-fw fa-caret-right'>" +
                        "</i>" +
                        "</a>" +
                    "</h4>" +
*/
                    //"<div class='form-group row'>"+
//                    "<div class='collapse' id='collapseDICounter" + id + "'>" +
                    "<div class='form-group row' id='collapseDICounter" + id + "'>" +
                        "<div class='form-group row'>"+
                            '<div style="float:left; padding-left:35px; padding-top:5px;">'+
                                "<label class='control-label'></lable>" +
                            '</div>'+
                            "<div class='row' id='numLed" + id + "' style='width:200px; height:40px; float:left;'>"+
                            "</div>"+
                            "<div class='row' style='float:left; padding-left:20px;'>"+
                                "<div class ='row' id ='switch" + id + "' style='width:50px; height:40px; padding-left:20px; float:left;'>" +
                                "</div>" +
                                '<div style="float:left; padding-left:60px;">'+
                                     "<button class='btn btn-danger btn-sm' id='btnReset" + id + "' > <i class='fa fa-undo'></i> Reset</button>" +
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<div class='form-group row'>"+
                            '<div style="float:left; padding-left:35px; padding-top:5px;">'+
                                "<label class='control-label'>Overflow Status:</lable>" +
                            '</div>'+
                            "<div id='cntOverflowLed" + id + "' style='float:left; padding-left:10px;'>"+
                                "<input type = 'checkbox' class='Indicator-checkbox' id='cntOverflowLight" + id + "'><a class='Indicator-light'></a>" +
                            "</div>"+
                            '<div style="float:left; padding-left:15px; padding-top:0px;">'+
                               "<button class='btn btn-primary btn-sm' id='btnOverflowClear" + id + "'><i class='fa fa-eraser'></i> Clear</button>" +
                            '</div>'+
                       "</div>"+
//                       "</div>"+
//                       "</div>"+
//                    "</div>"+
                    "</div>";

                return Indicator;
            };
            this.drawElement = function() {
                //this.mIdicatorLightHandler = document.getElementById("light" + this.mId);
                this.mDiIdicatorLightHandler = document.getElementById("diLight" + this.mId);
                this.mL2hLatchIdicatorLightHandler = document.getElementById("l2hLight" + this.mId);
                this.mH2lLatchIdicatorLightHandler = document.getElementById("h2lLight" + this.mId);
                this.mCntOverflowIdicatorLightHandler = document.getElementById("cntOverflowLight" + this.mId);
                //this.mbtnClrLatchHandler = document.getElementById("btnClear" + this.mId);
                this.mbtnH2lClrLatchHandler = document.getElementById("btnH2lClear" + this.mId);
                this.mbtnL2hClrLatchHandler = document.getElementById("btnL2hClear" + this.mId);
                this.mbtnRestCntHandler = document.getElementById("btnReset" + this.mId);
                this.mbtnOverflowClrHandler = document.getElementById("btnOverflowClear" + this.mId);

                var svg = d3.select("#numLed" + this.mId)
                    .append("svg:svg")
                    .attr("margin","0px auto")
                    .attr("width", "90%")
                    .attr("height", "40px");

                var svg2 = d3.select("#freqNumLed" + this.mId)
                    .append("svg:svg")
                    .attr("margin","0px auto")
                    .attr("width", "90%")
                    .attr("height", "40px");

                this.mSwitch = new Advantech.Control.SliderSwitch();
                this.mSwitch.createDisplayElement();
                $('#switch' + this.mId).append(this.mSwitch.createDisplayElement('onOffSwitch' + this.mId));
                this.mSwitch.drawElement();
/*
                this.mLedNumHandler = iopctrl.segdisplay()
                    .width(150)
                    .digitCount(10)
                    .negative(true);

                svg.append("g")
                    .attr("class", "segdisplay")
                    .attr("transform", "translate(20, 5)")
                    .call(this.mLedNumHandler);
*/
                //for counter LED number
                this.mCounterLedNumHandler = iopctrl.segdisplay()
                    .width(150)
                    .digitCount(10)
                    .negative(true);
                svg.append("g")
                    .attr("class", "segdisplay")
                    .attr("transform", "translate(20, 5)")
                    .call(this.mCounterLedNumHandler);
                //for frequency LED number
                this.mFreqLedNumHandler = iopctrl.segdisplay()
                    .width(150)
                    .digitCount(10)
                    .decimals(2)
                    .negative(true);
                svg2.append("g")
                    .attr("class", "segdisplay")
                    .attr("transform", "translate(20, 5)")
                    .call(this.mFreqLedNumHandler);

                var _Self = this;
/*
                $("#" + this.mId + " #btnClear" + this.mId).click(function() {
                    if(_Self._onLatchCleared !== null)
                        _Self._onLatchCleared(this, {
                            OvLch: 0
                        });
                });
*/
                $("#" + this.mId + " #btnH2lClear" + this.mId).click(function() {
                    if(_Self._onH2lLatchCleared !== null)
                        _Self._onH2lLatchCleared(this, {
                            //HLch: 0
                            Hch: 0
                        });
                });
                $("#" + this.mId + " #btnL2hClear" + this.mId).click(function() {
                    if(_Self._onL2hLatchCleared !== null)
                        _Self._onL2hLatchCleared(this, {
                            Lch: 0
                        });
                });
                $("#" + this.mId + " #btnOverflowClear" + this.mId).click(function() {
                    if(_Self._onOverflowCleared !== null)
                        _Self._onOverflowCleared(this, {
                            OvLch: 0
                        });
                });
                $("#" + this.mId + " #btnReset" + this.mId).click(function() {
                    if(_Self._onCntRested !== null)
                        _Self._onCntRested(this, {
                            ClrCnt: 1
                        });
                });
                $(this.mSwitch.mSliderSwitchHandler).click(function() {
                    var status = (this.checked) ? 1 : 0;
                    if(_Self._onChangeCntStatus !== null)
                        _Self._onChangeCntStatus(this, {
                            Cnting: status
                        });
                });
/*
                $('.collapse').on('hide.bs.collapse', function (event) {
                    event.stopPropagation();
                    var test = event.target.id;
                    $("a[data-target='#"+event.target.id+"'] i").removeClass("fa-caret-down");
                    $("a[data-target='#"+event.target.id+"'] i").addClass("fa-caret-right");
                });

                $('.collapse').on('shown.bs.collapse', function (event) {
                    event.stopPropagation();
                    var test = event.target.id;
                    $("a[data-target='#"+event.target.id+"'] i").removeClass("fa-caret-right");
                    $("a[data-target='#"+event.target.id+"'] i").addClass("fa-caret-down");
                }).collapse('show');
*/
                $("#" + this.mSwitch.mId + " .SliderSwitch").removeClass("SliderSwitch").addClass("IndicatorSwitch");
                $("#" + this.mSwitch.mId + " .SliderSwitch-checkbox").removeClass("SliderSwitch-checkbox").addClass("IndicatorSwitch-checkbox");
                $("#" + this.mSwitch.mId + " .SliderSwitch-label").removeClass("SliderSwitch-label").addClass("IndicatorSwitch-label");
                $("#" + this.mSwitch.mId + " .SliderSwitch-inner").removeClass("SliderSwitch-inner").addClass("IndicatorSwitch-inner");
                $("#" + this.mSwitch.mId + " .SliderSwitch-switch").removeClass("SliderSwitch-switch").addClass("IndicatorSwitch-switch");

                $('#collapseDI' + this.mId).hide();
                $('#collapseFreq' + this.mId).hide();
                $('#collapseDIH2LLatch' + this.mId).hide();
                $('#collapseDIL2HLatch' + this.mId).hide();
                $('#collapseDICounter' + this.mId).hide();
/*
                this.setResetBtnVisble(false);
                this.setClrBtnVisble(false);
                this.setSwitchVisble(false);
                this.setLedNumVisble(false);
*/
            };
            this.setNumLedDecimal = function(fixedPos) {
                //this.mLedNumHandler.decimals(fixedPos);
                this.mCounterLedNumHandler.decimals(fixedPos);
                this.mFreqLedNumHandler.decimals(fixedPos);
            }

            this.setDIRemoteStatus = function(mode, numDecimal) {
                //Robert(2017/06/15): PM requests to restore original DI modes display
                if(mode == 0){//DI
                    $('#collapseDI' + this.mId).show();
                    $('#collapseFreq' + this.mId).hide();
                    $('#collapseDIH2LLatch' + this.mId).hide();
                    $('#collapseDIL2HLatch' + this.mId).hide();
                    $('#collapseDICounter' + this.mId).hide();
                }else if(mode == 1){//Counter
                    $('#collapseDI' + this.mId).hide();
                    $('#collapseFreq' + this.mId).hide();
                    $('#collapseDIH2LLatch' + this.mId).hide();
                    $('#collapseDIL2HLatch' + this.mId).hide();
                    $('#collapseDICounter' + this.mId).show();
                    if(numDecimal)
                        this.setNumLedDecimal(numDecimal);
                    else
                        this.setNumLedDecimal(0);
                }else if(mode == 2){//Low to High Latch
                    $('#collapseDI' + this.mId).hide();
                    $('#collapseFreq' + this.mId).hide();
                    $('#collapseDIH2LLatch' + this.mId).hide();
                    $('#collapseDIL2HLatch' + this.mId).show();
                    $('#collapseDICounter' + this.mId).hide();
                }else if(mode == 3){//High to Low Latch
                    $('#collapseDI' + this.mId).hide();
                    $('#collapseFreq' + this.mId).hide();
                    $('#collapseDIH2LLatch' + this.mId).show();
                    $('#collapseDIL2HLatch' + this.mId).hide();
                    $('#collapseDICounter' + this.mId).hide();
                }else if(mode == 4){//Frequency
                    $('#collapseDI' + this.mId).hide();
                    $('#collapseFreq' + this.mId).show();
                    $('#collapseDIH2LLatch' + this.mId).hide();
                    $('#collapseDIL2HLatch' + this.mId).hide();
                    $('#collapseDICounter' + this.mId).hide();
                    if(numDecimal)
                        this.setNumLedDecimal(numDecimal);
                    else
                        this.setNumLedDecimal(2);
                }else{//Disabled
                    $('#collapseDI' + this.mId).hide();
                    $('#collapseFreq' + this.mId).hide();
                    $('#collapseDIH2LLatch' + this.mId).hide();
                    $('#collapseDIL2HLatch' + this.mId).hide();
                    $('#collapseDICounter' + this.mId).hide();
                }
                //this.setHeader();
            }
/*
            this.setIndicatorVisble = function(IsShow) {
                if(IsShow){
                    d3.select("#led" + this.mId).style("display", "block");
                }
                else{
                    d3.select("#led" + this.mId).style("display", "none");
                }
            };
            this.setLedNumVisble = function(IsShow) {
                if(IsShow)
                    d3.select("#numLed" + this.mId).style("display", "block");
                else
                    d3.select("#numLed" + this.mId).style("display", "none");
            };
            this.setSwitchVisble = function(IsShow) {
                if(IsShow)
                    d3.select("#switch" + this.mId).style("display", "block");
                else
                    d3.select("#switch" + this.mId).style("display", "none");
            };
            this.setClrBtnVisble = function(IsShow) {
                if(IsShow)
                    d3.select("#btnClear" + this.mId).style("display", "block");
                else
                    d3.select("#btnClear" + this.mId).style("display", "none");
            };
            this.setResetBtnVisble = function(IsShow) {
                if(IsShow)
                    d3.select("#btnReset" + this.mId).style("display", "block");
                else
                    d3.select("#btnReset" + this.mId).style("display", "none");
            };

            this.setHeader = function(){
                if($("#btnReset" + this.mId).is(':visible') || $("#btnClear" + this.mId).is(':visible')){
                    d3.select("#header" + this.mId).style("display", "block");
                }
                else{
                    d3.select("#header" + this.mId).style("display", "none");
                }
            };
*/
            //this.setValue = function(lightStatus, numLedVal, switchStatus) {
            this.setValue = function(jsonObj,  CfgObj) {
                //Robert(2016/12/14): remove DI modes and display all values in original 5 DI modes
                this.mDiIdicatorLightHandler.checked = (jsonObj.Stat == 1) ? true : false;
                this.mL2hLatchIdicatorLightHandler.checked = (jsonObj.Lch == 1) ? true : false;
                this.mH2lLatchIdicatorLightHandler.checked = (jsonObj.Hch == 1) ? true : false;
                this.mCntOverflowIdicatorLightHandler.checked = (jsonObj.OvLch == 1) ? true : false;
                this.mCounterLedNumHandler.value(jsonObj.CtFq);
                //this.mFreqLedNumHandler.value(jsonObj.Fq);
                this.mFreqLedNumHandler.value(jsonObj.Fq * ((CfgObj.FqP == 1) ? 0.01 : 0.1));
                this.mSwitch.setValue(jsonObj.Cnting ==1 ? true: false);
/*
                this.mIdicatorLightHandler.checked = lightStatus;
                if(!(numLedVal == undefined)){
                    this.mLedNumHandler.value(numLedVal);
                }
                if(typeof(switchStatus) !== "undefined" && switchStatus !== null)
                    this.mSwitch.setValue(switchStatus);
*/
            };

            this.getValue = function() {
                return this.mIdicatorLightHandler.checked;
            };

            this.setRemotePartByAdvJson = function(valObj, IOConfigData) {
                //this.setValueByAdvJson(valObj);
                this.setValue(valObj, IOConfigData);
            };
/*
            this.setValueByAdvJson = function(valObj) {
                if(valObj.Md == 0) {
                    var status = (valObj.Val == 1) ? true : false;
                    this.setValue(status);
                }else if(valObj.Md == 1) {
                    var status = (valObj.Cnting == 1) ? true : false;
                    var isOverFlow = (valObj.OvLch == 1) ? true : false;
                    this.setValue(isOverFlow, valObj.Val, status);
                }else if(valObj.Md == 2 || valObj.Md == 3) {
                    var isLatch = (valObj.OvLch == 1) ? true : false;
                    this.setValue(isLatch);
                }else{
                    var hasPusle = (valObj.Val > 0) ? true : false;
                    this.setValue(hasPusle, valObj.Val);
                }
            };
*/
        },

        SliderSwitch: function() {
            this.mSliderSwitchHandler = null;
            var _onSwitchChanged = null;
            var _onStartButtonClicked = null;
            var _onStopButtonClicked = null;
            this.mId = null;
            var _Self = this;
            this.onSwitchChanged = function(x) {
                if(!arguments.length) {
                    return _onSwitchChanged;
                }
                _onSwitchChanged = x;
            };
            this.onStartButtonClicked = function(x) {
                if(!arguments.length) {
                    return _onStartButtonClicked;
                }
                _onStartButtonClicked = x;
            };
            this.onStopButtonClicked = function(x) {
                if(!arguments.length) {
                    return _onStopButtonClicked;
                }
                _onStopButtonClicked = x;
            };
            this.createDisplayElement = function(id) {
                this.mId = id;
                var sliderSwitch = document.createElement('div');
                sliderSwitch.id = id;
                var HTML =
                "<div class='SliderSwitch'><input type='checkbox' name='onoffswitch' class='SliderSwitch-checkbox' id='switch" + id + "'>" +
                    "<label class='SliderSwitch-label' for='switch" + id + "'>" +
                    "<span class='SliderSwitch-inner'></span>" +
                    "<span class='SliderSwitch-switch'></span>" +
                    "</label>" +
                    "</div>" +
                    "<div class='row' id='pulseOutConfig'>" +
                            "<div style='float:left; margin-left:40px'>" +
                                "<div class='row isModuleInternalOnly'>" +
                                    "<input type='radio' name='DoPulseOutMode" + id + "' id='radioContiuneMode' value = '1' checked> Continue" +
                                "</div>" +
                                "<div class='row' style='margin-top:3px'>" +
                                    "<div class='input-group'>" +
                                        "<input type='radio' name='DoPulseOutMode" + id + "' value ='0' id='radioFixedMode'> Fixed total " +
                                        "<input type='number' class='isNumericType' id='numbarFixedCount' style='margin-top:10px;' value='0' max='9999999999' min='0' disabled>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                            "<div style='float:left;  margin-left:20px; margin-top:8px;'>" +
                                '<div style="float:left; padding-left:5px;">'+
                                    "<button class='btn btn-success' id='psStart'> <i class='fa fa-play'></i> Start</button>" +
                                "</div>"+
                                '<div style="float:left; padding-left:5px;">'+
                                    "<button class='btn btn-danger' id='psStop' > <i class='fa fa-stop'></i> Stop</button>" +
                                '</div>'+
                            "</div>" +
                    "</div>";
                sliderSwitch.innerHTML = HTML;
                return sliderSwitch;
            };
            this.drawElement = function() {
                this.mSliderSwitchHandler = $("#" + this.mId + " #switch" + this.mId)[0];
                this.setPulseOutConfigVisble(false);
                $("#" + this.mId + " #radioFixedMode").click(function() {
                    if($(this).prop("checked")) {
                        $("#" + _Self.mId + " #numbarFixedCount").removeAttr('disabled');
                    }
                });
                $("#" + this.mId + " #radioContiuneMode").click(function() {
                    if($(this).prop("checked")) {
                        $("#" + _Self.mId + " #numbarFixedCount").attr('disabled', 'disabled');
                    }
                });
                $("#" + this.mId + " #psStart").click(function() {
                    $("#" + _Self.mId + " #psStart").attr('disabled', 'disabled').addClass("disabled");
                    if($.isFunction(_Self.onStartButtonClicked())) {
                        var isCnt = $("#" + _Self.mId + " #pulseOutConfig input[type=radio]:checked").val();
                        _Self.onStartButtonClicked()(this, {
                            PsCtn: parseInt(isCnt, 10),
                            Val: _Self.getNumberValue()
                        });
                    }
                });
                $("#" + this.mId + " #psStop").click(function() {
                    $("#" + _Self.mId + " #psStart").removeAttr('disabled').removeClass("disabled");
                    if($.isFunction(_Self.onStopButtonClicked())) {
                        _Self.onStopButtonClicked()(this, {
                            PsStop: 1
                        });
                    }
                });
                $("#" + this.mId + " #switch" + this.mId).click(function() {
                    if($.isFunction(_Self.onSwitchChanged())) {
                        _Self.onSwitchChanged()(this, {
                            val: $(this).prop("checked")
                        });
                    }
                });
            };
            this.setValue = function(boolStatus, value) {
                this.mSliderSwitchHandler.checked = boolStatus;
                if(value !== undefined) {
                    $("#" + _Self.mId + " #numbarFixedCount").val(value);
                }
            };
            this.getValue = function() {
                return this.mSliderSwitchHandler.checked;
            };
            this.setPulseOutConfigVisble = function(IsShow) {
                if(IsShow) {
                    $("#" + _Self.mId + " .SliderSwitch").hide();
                    $("#" + _Self.mId + " #pulseOutConfig").show();
                }else{
                    $("#" + _Self.mId + " .SliderSwitch").show();
                    $("#" + _Self.mId + " #pulseOutConfig").hide();
                }
            };
            this.getNumberValue = function() {
                var val = 0;
                try {
                    val = parseInt($("#" + _Self.mId + " #numbarFixedCount").val(), 10);
                    if(val < 0) {
                        val = 0;
                    }
                } catch (e) {
                    val = 0;
                }
                return val;
            };
            this.setNumberValue = function(val) {
                $("#" + _Self.mId + " #numbarFixedCount").val(val);
            };
            this.getDoValueJson = function(index, mode, value) {
                if(mode == 1) {
                    var isCnt = $("#pulseOutConfig" + this.mId + " input[name=DoPulseOutMode" + this.mId + "]:checked").val();
                    return {
                        Ch: parseInt(index, 10),
                        PsCtn: parseInt(isCnt, 10),
                        Val: this.getNumberValue()
                    };
                }else{
                    return {
                        Ch: parseInt(index, 10),
                        Val: parseInt(value, 10)
                    };
                }
            };
            this.setValueByAdvJson = function(valObj) {
                if(valObj.Md == 1) {
                    this.setMode(valObj.PsCtn, valObj.Val);
                    if(int(valObj.PsCtn) === 0) {
                        this.setNumberValue(valObj.Val);
                    }
                }
                else {
                    var status = (valObj.Val == 1) ? true : false;
                    this.mSliderSwitchHandler.checked = status;
                }
            };

            this.setRemotePartByAdvJson = function(valObj) {
                if(valObj.Md == 1) {
                    if(valObj.PsCtn == 0) {
                        if(parseInt(valObj.Val, 10) != 0) {
                            $("#" + _Self.mId + " #numbarFixedCount").val(valObj.Val);
                        }else{
                            if($("#" + _Self.mId + " #psStart").is('[disabled=disabled]')) {
                                $("#" + _Self.mId + " #psStart").removeAttr('disabled').removeClass("disabled");
                                $("#" + _Self.mId + " #numbarFixedCount").val(0);
                            }
                        }
                    }
                    else {
                        if($("#" + _Self.mId + " #psStart").is('[disabled=disabled]') && valObj.Cnting == 0) {
                            $("#" + _Self.mId + " #psStart").removeAttr('disabled').removeClass("disabled");
                            $("#" + _Self.mId + " #numbarFixedCount").val(0);
                        }
                    }
                }
                else {
                    var status = (valObj.Val == 1) ? true : false;
                    this.mSliderSwitchHandler.checked = status;
                }
            };

            this.setMode = function(mode, count) {
                if(mode == 1) {
                    $("#" + this.mId + " #radioContiuneMode").prop('checked', true).trigger("click");
                }else{
                    $("#" + this.mId + " #radioFixedMode").prop('checked', true).trigger("click");
                }
                $("#" + this.mId + " #numbarFixedCount").val(count);
            };
            this.setDORemoteStatus = function(mode) {
                if(mode == 1) {
                    this.setPulseOutConfigVisble(true);
                }else{
                    this.setPulseOutConfigVisble(false);
                }
            }
        },

        Knob: function() {
            this.mKnobHandler = null;
            this.mId = null;
            this.mInputElement = null;
            this.mSubmitElement = null;

            this.createDisplayElement = function(id) {
                this.mId = id;
                this.mInputElement = $("#" + this.mId + " input");
                this.mSubmitElement = $("#" + this.mId + " button");

                var knobContainer = document.createElement('div');
                var HTML = "<span id='" + id + "' touch-action='none'></span>" + "<div class='input-group'>" + "<input type='number' class='form-control isNumericType' id='input" + id + "'>" + "<span class='input-group-btn'>" + "<button class='btn btn-default' type='button' id='set" + id + "'>Set</button>" + "</span>" + "</div>";
                knobContainer.innerHTML = HTML;
                return knobContainer;
            };

            this.getValue = function() {
                this.mKnobHandler.value();
            };

            this.setValue = function(vale) {
                this.mKnobHandler.value(value);
            };

            this.drawElement = function() {
                var svg = d3.select("#" + this.mId)
                    .append("svg:svg")
                    .attr("width", 180)
                    .attr("height", 160);

                function drawKnob(g, r) {
                    var radius = r * .90;
                    var pointerWidth = radius / 25.0;
                    var HeightWidth = radius / 3;
                    var point1 = (-pointerWidth).toString() + ", 0";
                    var point2 = pointerWidth.toString() + ", 0";
                    var point3 = pointerWidth.toString() + "," + (-HeightWidth).toString();
                    var point4 = "0," + (-HeightWidth - pointerWidth * 2).toString();
                    var point5 = (-pointerWidth).toString() + "0," + (-HeightWidth).toString();

                    var gradient = svg.append("svg:defs")
                        .append("svg:radialGradient")
                        .attr("id", "knobGradient")
                        .attr("cx", "-10%")
                        .attr("cy", "40%")
                        .attr("r", "100%");
                    gradient.append("svg:stop")
                        .attr("offset", "0%")
                        .attr("stop-color", "#CCCCCC");

                    gradient.append("svg:stop")
                        .attr("offset", "200%")
                        .attr("stop-color", "White");

                    var gradient_negative = svg.append("svg:defs")
                        .append("svg:radialGradient")
                        .attr("id", "knobGradient_negative")
                        .attr("cx", "-10%")
                        .attr("cy", "40%")
                        .attr("r", "100%");
                    gradient_negative.append("svg:stop")
                        .attr("offset", "0%")
                        .attr("stop-color", "White");

                    gradient_negative.append("svg:stop")
                        .attr("offset", "200%")
                        .attr("stop-color", "#CCCCCC");

                    g.append("circle")
                        .attr("r", r)
                        .attr("fill", "url(#knobGradient_negative)");

                    g.append("circle")
                        .attr("r", radius)
                        .attr("fill", "url(#knobGradient)");

                    g.append("polygon")
                        .attr("points", point1 + " " + point2 + " " + point3 + " " + point4 + " " + point5)
                        .attr("style", "fill:brown;")
                        .attr("transform", "translate(0, " + (HeightWidth + pointerWidth * 2.3 - radius).toString() + ")");
                }

                this.mKnobHandler = iopctrl.arcslider()
                    .radius(58)
                    .indicator(drawKnob);

                this.mKnobHandler.axis().orient("out")
                    .outerRadius(65)
                    .innerRadius(63)
                    .normalize(true)
                    .ticks(10)
                    .tickSubdivide(5)
                    .tickSize(10, 5, 5)
                    .tickPadding(3)
                    .scale(d3.scale.linear()
                        .domain([-10, 10])
                        .range([-3 * Math.PI / 4, 3 * Math.PI / 4]));

                svg.append("g")
                    .attr("transform", "translate(-20, -20)")
                    .attr("class", "knob")
                    .call(this.mKnobHandler);

                this.mKnobHandler.onValueChanged(function(v) {
                    $("#input" + this.mId).val(parseFloat(v).toFixed(3));
                })
            };
            this.changeRange = function(min, max) {

                this.mKnobHandler.scale(d3.scale.linear()
                    .domain([min, max])
                    .range([-1 * Math.PI / 2, 1 * Math.PI / 2]));
                var selectElementId = "#" + this.mId;

                var svg = d3.select(selectElementId).select("svg");

                svg.append("g")
                    .attr("class", "knob")
                    .attr("transform", "translate(-20, -20)")
                    .call(this.mKnobHandler);
            };
        },
        Meter: function() {
            this.mMeterHandler;
            this.mLedNumHandler;
            this.mId = null;
            var _Self = this;
            this.getId = function(value){
                return this.mId;
            };
            this.setValue = function(value) {
                this.mMeterHandler.value(value);
				var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                var precision = Advantech.Profile.DeviceEmun[module].AiStatusEgLimitPrecision;
                if(typeof(precision) != 'undefined'){
                    this.mLedNumHandler.value(Advantech.Utility.sprintFlowValue(value, precision));
                }else{
                    this.mLedNumHandler.value(value);
                }
            };

            this.getValue = function(value) {
                return this.mMeterHandler.value();
            };

            this.changeRange = function(min, max) {
                this.mMeterHandler.scale(d3.scale.linear()
                    .domain([min, max])
                    .range([-1 * Math.PI / 2, 1 * Math.PI / 2]));
                var selectElementId = "#" + _Self.getId();

                d3.select(selectElementId).select("svg").remove();

                var svg = d3.select(selectElementId)
                    .append("svg:svg");

                svg.append("g")
                    .attr("class", "segdisplay")
                    .attr("transform", "translate(45, 100)")
                    .call(this.mLedNumHandler);

                svg.append("g")
                    .attr("class", "gauge")
                    .attr("transform", "translate(-49, 0)")
                    .call(this.mMeterHandler);
            };

            this.createDisplayElement = function(id) {
                var meter = document.createElement('span');
                meter.id = id;
                this.mId = id;
                return meter;
            };

            this.drawElement = function() {
                var svg = d3.select("#" + _Self.getId())
                    .append("svg:svg");
                    //.attr("height", 80);

                this.mMeterHandler = iopctrl.arcslider()
                    .radius(80)
                    .events(false)
                    .indicator(iopctrl.defaultGaugeIndicator);
                this.mMeterHandler.axis()
                    .orient("in")
                    .normalize(true)
                    .ticks(10)
                    .tickSubdivide(4)
                    .tickSize(10, 5, 5)
                    .tickPadding(8)
                    .scale(d3.scale.linear()
                        .domain([-10, 10])
                        .range([-1 * Math.PI / 2, 1 * Math.PI / 2]));

                this.mLedNumHandler = iopctrl.segdisplay()
                    .width(80)
                    .digitCount(8)
                    .negative(true)
                    .decimals(4);

                svg.append("g")
                    .attr("class", "segdisplay")
                    .attr("transform", "translate(55, 100)")
                    .call(this.mLedNumHandler);

                svg.append("g")
                    .attr("class", "gauge")
                    .attr("transform", "translate(-35, 0)")
                    .call(this.mMeterHandler);
            };
        },

        plotInfo: function(name, color) {
            var mName = name;
            var mColor = color;
            this.getName = function() {
                return mName;
            };
            this.getColor = function() {
                return mColor;
            };
        },

        plotDate: function(x, y, timestamp) {
            this._x = x;
            this._y = y;
            this._timestamp = timestamp;

            this.getX = function() {
                return this._x;
            };

            this.getY = function() {
                return this._y;
            }

            this.getTimestamp = function() {
                return this._timestamp;
            }
        },

        Plot: function(plotInfomation) {
            this.mCapacity = 20;
            this.mPlotInfo = plotInfomation;
            this.mPlotDatas = [];
            var _Self = this;
            var mVisble = true;
            var mIsEnabled = true;
            this.appendData = function(plotData) {
                this.mPlotDatas.push(plotData);
                if(this.mCapacity === this.mPlotDatas.length) {
                    this.removeData(0);
                }
            };
            this.removeData = function(index) {
                this.mPlotDatas.splice(index, 1);
            };
            this.clearData = function() {
                this.mPlotDatas = [];
            };
            this.getLength = function(){
                return this.mPlotDatas.length;
            };
            this.getIsEnabled = function() {
                return mIsEnabled;
            };
            this.setEnabled = function(val) {
                mIsEnabled = val;
            };
            this.getIsVisble = function() {
                return mVisble;
            };
            this.setIsVisble = function(val) {
                mVisble = val;
            };
            this.toJsonFormat = function() {
                return {
                    values: this.mPlotDatas,
                    key: this.mPlotInfo.getName(),
                    color: (this.getIsEnabled()) ? _Self.mPlotInfo.getColor() : "#8F8B8B",
                    disabled: (!this.getIsVisble()||!this.getIsEnabled())
                };
            };
        },
        TrendChart: function(containerId) {
            this.mChartHandler = null;
            this.mPointer = 0; //current step
            this.mCapacity = 50; //max on chart
            this.mChartGraphic = null;
            this.mPlots = [];
            var mContainerId = containerId;
            var _Self = this;

            this.getContainerId = function() {
                return mContainerId;
            }
            this.appendPlot = function(plotInfo) {
                var plot = new Advantech.Control.Plot(plotInfo);
                this.mPlots.push(plot);
            };
            this.clearPlot = function() {
                this.mPointer = 0;
                for (var i = 0; i < this.mPlots.length; ++i) {
                    this.mPlots[i].clearData();
                }
            };
            this.appendData = function(values) {
                this.mPointer++;
                for (var i = 0; i < values.length; ++i) {
                    if(this.mPlots[i].getIsEnabled() != (!values[i].invalid)){
                        this.mPlots[i].setEnabled(!values[i].invalid);
                    }
                    var data = {
                        _x: this.mPointer,
                        _y: values[i].val
                    };
                    this.mPlots[i].appendData(data);
                }
                try{
                    this.mChartGraphic.datum(this.toPlotDataJsonFormat())
                    .call(this.mChartHandler);
                    nv.utils.windowResize(this.mChartHandler.update);
                }
                catch(e){

                }
            };
            this.toPlotDataJsonFormat = function() {
                var plosJson = [];
                this.mPlots.forEach(function(item) {
                    plosJson.push(item.toJsonFormat());
                });
                return plosJson;
            };

            this.getPlotLength = function() {
                return this.mPlots.length;
            };

            this.clearChart = function() {
                this.mPointer = 0;
                this.mPlots = [];
                if(this.mChartHandler !== null) {
                    $("#" + this.getContainerId() + "_Svg").remove();
                }
            };

            var drawChart = function() {
                var chartSvgId = _Self.getContainerId() + '_Svg';
                _Self.mChartGraphic = d3.select('#' + _Self.getContainerId())
                    .append("svg:svg")
                    .attr("id", chartSvgId)
                    .attr("style", "height:500px;");
            };

            this.createChart = function(xAxisUnit, yAxisUnit, xAxisFormat, yAxisFormat) {
                drawChart();
                this.mChartHandler = nv.models.lineChart()
                    .useInteractiveGuideline(true) //avoid Uncaught TypeError: Cannot read property 'x' of null
                    .options({
                        margin: {
                            left: 45,
                            bottom: 150
                        },
                        showXAxis: true,
                        showYAxis: true,
                        //transitionDuration: 100
                    })
                    .x(function(d) {
                        if(d != undefined){
                            return d._x
                        }
                    })
                    .y(function(d) {
                        if(d != undefined){
                            return d._y
                        }
                    });
				var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                var aiRange = Advantech.Profile.DeviceEmun[module].AiStatusRangeValue;
                if(typeof(aiRange) != 'undefined'){
                    var minAiRange = Advantech.Profile.AIRangeInfoEmun[aiRange].min;
                    var maxAiRange = Advantech.Profile.AIRangeInfoEmun[aiRange].max;
                    this.mChartHandler.forceY([minAiRange, maxAiRange]);
                }
                _Self.mChartHandler.legend.dispatch.legendClick = function(e, i) {
                    if(_Self.mPlots.length > i) {
                        if(!_Self.mPlots[i].getIsEnabled()){
                            Advantech.Form.MessageForm.getInstance().showMessageBox("Notification","<h5>The status of Channel "+i+" hadn't supported trend log function.</h5>")
                            return false;
                        }else{
                            _Self.mPlots[i].setIsVisble(!_Self.mPlots[i].getIsVisble());
                        }

                    }
                };
                // this.mChartHandler.dispatch.on('stateChange', function(e) {
                // });
                this.changeXAxisUnit(xAxisUnit, xAxisFormat);
                this.changeYAxisUnit(yAxisUnit, yAxisFormat);

                this.mChartGraphic.datum([])
                    .call(this.mChartHandler);
                nv.utils.windowResize(this.mChartHandler.update);
            };

            this.changeXAxisUnit = function(xAxisUnit, xAxisFormat) {
                this.mChartHandler.xAxis
                    .axisLabel(xAxisUnit)
                    .tickFormat(xAxisFormat);
            };

            this.changeYAxisUnit = function(yAxisUnit, yAxisFormat) {
                this.mChartHandler.yAxis
                    .axisLabel(yAxisUnit)
                    .tickFormat(yAxisFormat);
            };

            this.refreshChart = function() {
                this.mChartGraphic.call(this.mChartHandler);
                nv.utils.windowResize(this.mChartHandler.update);
            };
        },
        TrendDigitalChart: function(containerId) {
            this.mChartHandler = null;
            this.mPointer = 0; //current step
            this.mCapacity = 50; //max on chart
            this.mChartGraphic = null;
            this.mPlots = [];
            var mContainerId = containerId;
            var _Self = this;

            this.getContainerId = function() {
                return mContainerId;
            };

            this.appendPlot = function(plotInfo) {
                var plot = new Advantech.Control.Plot(plotInfo);
                this.mPlots.push(plot);
            };

            this.getPlotLength = function() {
                return this.mPlots.length;
            };
            this.clearPlot = function() {
                this.mPointer = 0;
                for (var i = 0; i < this.mPlots.length; ++i) {
                    this.mPlots[i].clearData();
                    this.mPlots[i].setEnabled(true);
                    this.mPlots[i].setIsVisble(true);
                }
            };
            this.appendData = function(values) {
                this.mPointer++;
                for (var i = 0; i < values.length; ++i) {
                    if(this.mPlots[i].getIsEnabled() != (!values[i].invalid)){
                        this.mPlots[i].setEnabled(!values[i].invalid);
                    }
                    var data = {
                        _x: this.mPointer,
                        _y: this.booleanToValue(i, values[i].val)
                    };
                    var drawData = {
                        _x: this.mPointer - 1,
                        _y: this.booleanToValue(i, values[i].val)
                    };
                    this.mPlots[i].appendData(drawData);
                    this.mPlots[i].appendData(data);
                }
                try{
                    this.mChartGraphic.datum(this.toPlotDataJsonFormat())
                        .call(this.mChartHandler);
                    nv.utils.windowResize(this.mChartHandler.update);
                }catch(e){

                }
            };

            this.booleanToValue = function(index, boolValue) {
                if(boolValue === true) {
                    return index + 0.5;
                }else if(boolValue === false) {
                    return index;
                }else{
                    return null;
                }

            };

            this.toPlotDataJsonFormat = function() {
                var plosJson = [];
                this.mPlots.forEach(function(item) {
                    plosJson.push(item.toJsonFormat());
                });
                return plosJson;
            };

            this.clearChart = function() {
                this.mPointer = 0;
                this.mPlots = [];
                if(this.mChartHandler !== null) {
                    $("#" + this.getContainerId() + "_Svg").remove();
                }
            };

            var drawChart = function() {
                var chartSvgId = _Self.getContainerId() + '_Svg';
                _Self.mChartGraphic = d3.select('#' + _Self.getContainerId())
                    .append("svg:svg")
                    .attr("id", chartSvgId);
            };

            this.createChart = function(xAxisUnit, yAxisUnit, xAxisFormat, yAxisFormat) {
                drawChart();
                this.mChartHandler = nv.models.lineChart()
                    .useInteractiveGuideline(true) //avoid Uncaught TypeError: Cannot read property 'x' of null
                    .options({
                        margin: {
                            left: 25,
                            bottom: 50
                        },
                        showXAxis: true,
                        showYAxis: true,
                        //transitionDuration: 100
                    })
                    .x(function(d) {
                        if(d != undefined){
                            return d._x;
                        }
                    })
                    .y(function(d) {
                        if(d != undefined){
                            return d._y;
                        }
                    })
/*                     .tooltipContent(function(key, x, y, e, graph) {
                        var index = int(e.pointIndex);
                        var value;
                        if((index % 2) > 0.001) {
                            index = index-1;
                        }
                        value = ((Math.round(e.series.values[index]._y) - e.series.values[index]._y) < 0.01) ? false : true;
                        return '<h5>' + key + '</h5>' + '<p>' + value + ' at ' + x + '</p>';
                    }); */
                _Self.mChartHandler.legend.dispatch.legendClick = function(e, i) {
                    if(_Self.mPlots.length > i) {
                        if(!_Self.mPlots[i].getIsEnabled()){
                            Advantech.Form.MessageForm.getInstance().showMessageBox("Notification","<h5>The mode of Channel "+i+" had't supported trend log function.</h5>")
                            return false;
                        }else{
                            _Self.mPlots[i].setIsVisble(!_Self.mPlots[i].getIsVisble());
                        }

                    }
                };
                this.changeXAxisUnit(xAxisUnit, xAxisFormat);
                this.changeYAxisUnit(yAxisUnit, yAxisFormat);
                this.mChartGraphic.datum([])
                    .call(this.mChartHandler);
                nv.utils.windowResize(this.mChartHandler.update);
            };

            this.changeXAxisUnit = function(xAxisUnit, xAxisFormat) {
                this.mChartHandler.xAxis
                    .axisLabel(xAxisUnit)
                    .tickFormat(xAxisFormat);
            };

            this.changeYAxisUnit = function(yAxisUnit, yAxisFormat) {
                this.mChartHandler.yAxis
                    .axisLabel(yAxisUnit)
                    .axisLabelDistance(10)
                    .tickFormat(function(num) {
                        var val = num - Math.floor(num);
                        if(val >= 0.4999 && val <= 0.5001)
                            return "1";
                        else if(val < 0.0001)
                            return "0";
                        else
                            return "";
                    });
            };

            this.refreshChart = function() {
                try{
                    this.mChartGraphic.call(this.mChartHandler);
                    this.mChartHandler.update();
                }
                catch(e){

                }
            };
        },

        TrendWithFocusChart:function(containerId){
            this.mChartHandler = null;
            this.mChartGraphic = null;
            var mPlots = {};
            var mIsDigital = false;
            var mLength = 0;
            var mContainerId = containerId;
            var _Self = this;
            var mCapacity = 25;

            this.getCapacity = function(){
                return mCapacity;
            };
            var getIsDigital = function(){
                return mIsDigital;
            };
            var setIsDigital = function(val){
                mIsDigital = val;
            };
            this.getContainerId = function() {
                return mContainerId;
            };

            this.appendPlot = function(key, color) {
                if(mPlots[key] == undefined){
                    var plot = new Advantech.Control.Plot(new Advantech.Control.plotInfo(key, color));
                    plot.mCapacity = this.getCapacity();
                    plot.index = this.getPlotLength();
                    mPlots[key] = plot;
                    mLength++;
                }
            };

            this.getPlotLength = function() {
                return mLength;
            };

            var clearPlot = function() {
                mPlots = {};
                mLength = 0;
            };

            this.appendData = function(key, timestamp, val) {
                if( getIsDigital() == true ){
                    setIsDigital(false);
                }
                mPlots[key].appendData({ _x:timestamp,
                                         _y:val});
            };
            this.appendDigitalData = function(key, timestamp, val) {
                if( getIsDigital() == false ){
                    setIsDigital(true);
                }
                var idx = mPlots[key].index;
                var trendVal = (val == 1)?int(idx)+0.5:idx;
                var plotLen = mPlots[key].mPlotDatas.length;
                if(plotLen > 0){
                    var lastStamp = mPlots[key].mPlotDatas[plotLen-1]._x;
                    mPlots[key].appendData({ _x:lastStamp,
                                             _y:trendVal});
                }
                mPlots[key].appendData({ _x:timestamp,
                                             _y:trendVal});
            };
            this.getPlot = function(){
                return mPlots;
            };

            var getStep = function(){
                var max = 0;
                for(var prop in mPlots){
                    var temp = mPlots[prop].getLength();
                    if(max <= temp){
                        max = temp;
                    }
                }
                return max;
            };

            this.setPlotIsVisble = function(key, val){
                mPlots[key].setIsVisble(val);
            }

            this.toPlotDataJsonFormat = function() {
                var plosJson = [];
                for( var prop in  mPlots){
                    plosJson.push(mPlots[prop].toJsonFormat());
                }
                return plosJson;
            };

            this.clearChart = function() {
                clearPlot();
                this.createChart();
                _Self.refreshChart();
            };

            var drawChart = function(width, height) {
                var chartSvgId = _Self.getContainerId() + '_Svg';
                if(this.mChartHandler !== null) {
                    $("#" + chartSvgId).remove();
                }
                _Self.mChartGraphic = d3.select('#' + _Self.getContainerId())
                    .append("svg:svg")
                    .attr("id", chartSvgId);
                if(width != undefined){
                    _Self.mChartGraphic.select("svg").attr("width", width);
                }
                if(height != undefined){
                    _Self.mChartGraphic.select("svg").attr("height", height);
                }
            };

            this.createChart = function(width, height) {
                drawChart(width, height);
                this.mChartHandler = nv.models.lineChart() //lineWithFocusChart()
                    .useInteractiveGuideline(true) //avoid Uncaught TypeError: Cannot read property 'x' of null
                //this.mChartHandler = nv.models.lineWithFocusChart()
                    .options({
                        margin: {
                            left: 80,
                            right: 50,
                            bottom: 55
                        },
                        showXAxis: true,
                        showX2Axis: false,
                        showYAxis: true,
                        //transitionDuration: 100
                    })
                    //.tooltips(true)
                    .x(function(d) {
                        if(d != undefined){
                            return d._x;
                        }
                    })
                    .y(function(d) {
                        if(d != undefined){
                            return d._y;
                        }
                    });
                _Self.mChartHandler.legend.dispatch.legendClick = function(e, i) {

                };

                 _Self.mChartHandler.xAxis.tickFormat(function(d) {
                       //return d3.time.format('%m/%d %H:%M:%S')(new Date(d))
                       return d3.time.format('%m/%d %H:%M')(new Date(d))
                 }).staggerLabels(true);
/*                 _Self.mChartHandler.x2Axis.tickFormat(function(d) {
                       return "";
                 }).staggerLabels(true);*/
                this.refreshChart();
            };

            this.changeXAxisUnit = function(xAxisUnit, xAxisFormat) {
                this.mChartHandler.xAxis
                    .axisLabel(xAxisUnit)
                    .tickFormat(xAxisFormat);
            };

            this.refreshChart = function(width, height) {
                if(width==undefined && height==undefined)
                    return;
                try{
                    if(getIsDigital()){
                        this.mChartHandler.options({
                            width:width,
                            height:height,
                            margin: {
                                left: 80,
                                right: 50,
                                bottom: 55
                            },
                            showXAxis: true,
                            showX2Axis: false,
                            showYAxis: false,
                        })/* .tooltipContent(function(key, x, y, e, graph) {
                            var index = int(e.pointIndex);
                            var value;
                            if((index % 2) > 0.001) {
                                index = index-1;
                            }
                            value = ((Math.round(e.series.values[index]._y) - e.series.values[index]._y) < 0.01) ? false : true;
                            return '<center><h3>' + key + '</h3></center><p>value:' + value + '</p><p>timestamp:' + x;
                        }); */
                        _Self.mChartHandler.yAxis.tickFormat(function(d) {
                           return "";
                        });
/*                         _Self.mChartHandler.y2Axis.tickFormat(function(d) {
                           return "";
                        }); */
                    }
                    else{
                        this.mChartHandler.options({
                            width:width,
                            height:height,
                            margin: {
                                left: 80,
                                right: 50,
                                bottom: 55
                            },
                            showXAxis: true,
                            showX2Axis: false,
                            showYAxis: true,
                        })/*.tooltipContent(function(key, x, y, e, graph) {
                            return '<center><h3>' + key + '</h3></center><p>value:' + y + '</p><p>timestamp:' + x + '</p>';
                         });*/
                        _Self.mChartHandler.yAxis.tickFormat(d3.format(',.2f'));
                       /*  _Self.mChartHandler.y2Axis.tickFormat(d3.format(',.2f')); */
                    }
                     this.mChartGraphic.datum(_Self.toPlotDataJsonFormat())
                        .call(this.mChartHandler);
                    nv.utils.windowResize(this.mChartHandler.update);
                }catch(e){

                }
            };
        },
        StatisticsData:function(){
            var statisticsObj = {};
            var _Self = this;
            _Self.DEFAULT_GP = "Default";
            this.getValue = function(key, group){
                var gpKey = _Self.DEFAULT_GP;
                if(group!= undefined){
                    gpKey = group;
                }
                if(statisticsObj[gpKey]!=undefined){
                    if(statisticsObj[gpKey][key]!=undefined){
                        return statisticsObj[gpKey][key].val;
                    }
                    else{
                        return NaN;
                    }
                }
                return NaN;
            }
            this.appendData = function(key, val, group){
                var gpKey = "";
                if(group == undefined){
                    gpKey = _Self.DEFAULT_GP;
                }
                else{
                    gpKey = group;
                }
                if(statisticsObj[gpKey] == undefined){
                    statisticsObj[gpKey] = {};
                    statisticsObj[gpKey].isVisible = true;//if visible
                }
                if(statisticsObj[gpKey][key] == undefined){
                    statisticsObj[gpKey][key] = {};
                    if(val != undefined){
                        statisticsObj[gpKey][key].val = val;
                    }
                    else{
                        statisticsObj[gpKey][key].val = 1;
                    }
                    statisticsObj[gpKey][key].isDisabled = false;
                }
                else{
                    if(val != undefined){
                        statisticsObj[gpKey][key].val = val;
                    }
                    else{
                        statisticsObj[gpKey][key].val++;
                    }
                }
            };
            this.setIsVisble = function(gpKey){
                if(statisticsObj[gpKey] != undefined)
                    statisticsObj[gpKey].isVisible = !statisticsObj[gpKey].isVisible;
            };
            this.clearData = function(){
                statisticsObj = {};
            };

            this.toBarDatas = function(){
                var gpKeyArray =[];
                for(var gpKey in statisticsObj){
                    var array = [];
                    for(var prop in statisticsObj[gpKey]){
                        if(prop != "isVisible"){
                            array.push({tag:prop,
                                    val:statisticsObj[gpKey][prop].val});
                        }
                    }
                    var bIsVisible = statisticsObj[gpKey].isVisible;
                    gpKeyArray.push({ key: gpKey,
                                      values: array,
                                      disabled: !bIsVisible});
                }

                return gpKeyArray;
            };

            this.toPieDatas = function(){
                var array = [];
                for(var prop in statisticsObj[_Self.DEFAULT_GP]){
                    if(prop != "isVisible"){
                        array.push({key:prop,
                                val:statisticsObj[_Self.DEFAULT_GP][prop].val,
                                disabled:statisticsObj[_Self.DEFAULT_GP][prop].isDisabled});
                    }
                }
                return array;
            };
        },

        PieChart:function(containerId) {
            this.mChartHandler = null;
            this.mChartGraphic = null;
            var mData = new Advantech.Control.StatisticsData();
            var mContainerId = containerId;
            var _onPieClick = null;
            var _Self = this;

            this.getContainerId = function() {
                return mContainerId;
            };

            this.appendData = function(key, val) {
                mData.appendData(key, val);
            };

            this.clearChart = function() {
                mData.clearData();
                this.createChart();
            };

            this.setColors = function(colorArray) {
                this.mChartHandler.color(colorArray);
            };

            var drawChart = function(width, height) {
                var chartSvgId = _Self.getContainerId() + '_Svg';
                if(this.mChartHandler !== null) {
                    $("#" + chartSvgId).remove();
                }
                _Self.mChartGraphic = d3.select('#' + _Self.getContainerId())
                    .append("svg:svg")
                    .attr("id", chartSvgId);
                if(width != undefined){
                    _Self.mChartGraphic.select("svg").attr("width", width);
                }
                if(height != undefined){
                    _Self.mChartGraphic.select("svg").attr("height", height);
                }
            };

            this.createChart = function(width, height) {
                drawChart(width, height);
                this.mChartHandler = nv.models.pieChart()
                      .x(function(d) {
                        if(d != undefined){
                            return d.key;
                        }})    //Specify the data accessors.
                      .y(function(d) {
                        if(d != undefined){
                            return d.val
                        }})
                      .color(d3.scale.category10().range())
                      .labelType("percent")
                      .showLabels(true);

                _Self.mChartHandler.legend.dispatch.legendClick = function(e, i) {

                };

                this.mChartGraphic.datum([])
                    .call(this.mChartHandler);
                nv.utils.windowResize(this.mChartHandler.update);
            };
            this.onPieClick = function(x){
                if(!arguments.length) {
                    return _onPieClick;
                }
                _onPieClick = x;
            };
            this.refreshChart = function() {
                try{
                    this.mChartGraphic.datum(mData.toPieDatas())
                                    .call(this.mChartHandler);

                    d3.selectAll(".nv-slice").on("click", function(e) {
                        if( $.isFunction(_Self.onPieClick())){
                            _Self.onPieClick().apply(this, [this, e.data]);
                        }
                    });
                    nv.utils.windowResize(this.mChartHandler.update);
                }
                catch(e){

                }
            };
        },

        BarChart:function(containerId)  {
            this.mChartHandler = null;
            this.mChartGraphic = null;
            var _onBarClick = null;
            var mData = new Advantech.Control.StatisticsData();
            var mContainerId = containerId;
            var _Self = this;

            this.getContainerId = function() {
                return mContainerId;
            };

            this.appendData = function(key, val, gpKey) {
                mData.appendData(key, val, gpKey);
            };
            this.getValue = function(key,gpKey) {
                mData.getValue(key, gpKey);
            };
            this.clearChart = function() {
                mData.clearData();
                this.createChart();
            };

            var drawChart = function(width, height) {
                var chartSvgId = _Self.getContainerId() + '_Svg';
                if(this.mChartHandler !== null) {
                    $("#" + chartSvgId).remove();
                }
                _Self.mChartGraphic = d3.select('#' + _Self.getContainerId())
                    .append("svg:svg")
                    .attr("id", chartSvgId);
                if(width != undefined){
                    _Self.mChartGraphic.select("svg").attr("width", width);
                }
                if(height != undefined){
                    _Self.mChartGraphic.select("svg").attr("height", height);
                }
                $("#" + _Self.getContainerId()).css("min-width", 300);//prevent text overlap
            };
            this.onBarClick = function(x){
                if(!arguments.length) {
                    return _onBarClick;
                }
                _onBarClick = x;
            };
            this.createChart = function(width, height) {
                drawChart(width, height);
                this.mChartHandler = nv.models.multiBarHorizontalChart()
                        .options({
                            margin: {
                                left: 70,
                            }
                        })
                      .x(function(d) {
                        if(d != undefined){
                            return d.tag
                        } })    //Specify the data accessors.
                      .y(function(d) {
                        if(d != undefined){
                            return d.val
                        }})
                      .color(d3.scale.category10().range())
                      //.staggerLabels(true)
                      .showControls(false)  //Too many bars and not enough room? Try staggering labels.
                      //.tooltips(true)        //Don't show tooltips
                      .showValues(true)       //...instead, show the bar value right on top of each bar.
                      //.transitionDuration(350);

                this.mChartGraphic.datum([])
                    .call(this.mChartHandler);
                nv.utils.windowResize(this.mChartHandler.update);

                _Self.mChartHandler.legend.dispatch.on('legendClick', function(d,i) {
                    var gpKey = "";
                    if(i == 0)
                        gpKey = "Max";
                    else
                        gpKey = "Min";

                    mData.setIsVisble(gpKey);
                });
            };

            this.changeXAxisUnit = function(xAxisUnit, xAxisFormat) {
                this.mChartHandler.xAxis
                    .axisLabel(xAxisUnit)
                    .tickFormat(xAxisFormat);
            };

            this.changeYAxisUnit = function(yAxisUnit, yAxisFormat) {
                this.mChartHandler.yAxis
                    .axisLabel(yAxisUnit)
                    .axisLabelDistance(10);
            };
            this.changeYAxisFormat = function(yAxisFormat) {
                this.mChartHandler.yAxis.tickFormat(yAxisFormat);
            };
            this.setColors = function(colorArray) {
                this.mChartHandler.color(colorArray);
            };

            this.refreshChart = function() {
                try{
                    this.mChartGraphic.datum(mData.toBarDatas())
                                .call(this.mChartHandler);
                    d3.selectAll(".nv-bar").on("click", function(data) {
                        if( $.isFunction(_Self.onBarClick())){
                             _Self.onBarClick().apply(this, [this, data]);
                         }
                    });
                    nv.utils.windowResize(this.mChartHandler.update);
                }catch(e){

                }
            };
        },
        ColumnChart:function(){
            this.drawChart = function(fq) {
                var i;
                var data = [
                    {
                        key: "Acceleration RMS in Band",
                        values: []
                    }
                ];
                for (i=0; i<fq.length; i++) {
                    data[0].values[i] = {
                        "label": i.toString(),
                        "value": fq[i]
                    };
                }
                nv.addGraph(function() {
                    var chart = nv.models.discreteBarChart()
                        .x(function(d) { return d.label })
                        .y(function(d) { return d.value })
                        .color(["#1f77b4","#1f77b4","#1f77b4","#1f77b4","#1f77b4","#1f77b4","#1f77b4","#1f77b4","#1f77b4"])
                        ;
                    chart.yAxis
                    .axisLabel(' ')
                    .tickFormat(d3.format(",.3f"));

                    d3.select('#fqBarChart svg')
                        .datum(data)
                        .call(chart);

                    nv.utils.windowResize(chart.update);
                });
            };
        },
    },
    Privilege: {
        UIManagerSingleton: (function() {
            var mInstance;
            var userDispatch = function(user) {
                var _rankType = user;
                var getRank = function() {
                    return _rankType;
                };
                var refreshUI = function() {
                    $("html,body").animate({
                                scrollTop: 0
                            }, 0);
                    if(getRank() === 0) {//user
                        $(".root").removeClass("root").hide();
                        $(".admin").removeClass("admin").hide();
                    }else if(getRank() === 1) {//admin
                        $(".root").each(function(){
                            $(this).removeClass("root");
                            if(!$(this).hasClass('admin')){
                                $(this).hide();
                            }
                        });
                    }else if(getRank() !== 2) {
                        $(".root").removeClass("root").hide();
                        $(".admin").removeClass("admin").hide();
                    }
                    if($(window).width() < 768){
                        if(!$("#titleNavbar").hasClass("hidden-title")){
                            $("#menu-toggle").trigger("click");
                        }
                    }
                };
                return {
                    getRank: getRank,
                    refreshUI: refreshUI,
                };
            };

            return {
                getInstance: function(user) {
                    if(!mInstance) {
                        mInstance = userDispatch(user);
                    }
                    return mInstance;
                }
            };
        })(),
    },
    Utility: {
        dotNetUtilityCallBack:function(advRestfullProtocol, jsonObj){
            try{
                try{
                    jsonObj.MAC = Advantech.Utility.MacRecordInstance.getInstance().getMAC();
                    var xml = Advantech.Utility.json2xml(jsonObj, xml);
                    //alert(xml);
                    window.external.UtSyncCallBackFun(advRestfullProtocol, xml);//for utility callback
                }
                catch(e){
                }
            }
            catch(e){
            }
        },
        callExternalFun: function (cmd, param) {
            try {
                setTimeout(function() {
                    if (typeof window.external.VComWebUtilitySyncCallBackFun != 'undefined') {
                        window.external.VComWebUtilitySyncCallBackFun(cmd, param);
                    } else if (typeof CefSharp != 'undefined') {
                        CefSharp.PostMessage(JSON.stringify({cmd: cmd, param: param}));
                    }
                });
            } catch(e) {

            }
        },
        checkExternalFunExist: function () {
            return typeof window.external.VComWebUtilitySyncCallBackFun != 'undefined' || typeof CefSharp != 'undefined';
        },
        ProfileRecordInstance: (function() {
            var mInstance; //private variable to hold the
            var ProfileRecord = function(profile) {
                var mProfile = profile; //private
                var getProfile = function() {
                    return mProfile;
                };
                return {
                    getProfile: getProfile
                };
            };

            return {
                getInstance: function(profile) {
                    if(!mInstance) {
                        mInstance = ProfileRecord(profile);
                    }
                    return mInstance;
                }
            };
        })(),
        MacRecordInstance: (function() {
            var mInstance; //private variable to hold the
            //only instance of Sun that will exits.
            var MacRecordTool = function(mac) {
                var mMAC = mac; //private
                var getMAC = function() {
                    return mMAC;
                };
                return {
                    getMAC: getMAC
                };
            };

            return {
                getInstance: function(mac) {
                    if(!mInstance) {
                        mInstance = MacRecordTool(mac);
                    }
                    return mInstance;
                }
            };
        })(),
        /*!
           This work is licensed under Creative Commons GNU LGPL License.
           License: http://creativecommons.org/licenses/LGPL/2.1/
           Version: 0.9
           Author:  Stefan Goessner/2006
           Web:     http://goessner.net/
        */
        json2xml:function (o, tab) {
           var toXml = function(v, name, ind) {
              var xml = "";
              if(v instanceof Array) {
                 for (var i=0, n=v.length; i<n; i++)
                    xml += ind + toXml(v[i], name, ind+"\t") + "\n";
              }
              else if(typeof(v) == "object") {
                 var hasChild = false;
                 xml += ind + "<" + name;
                 for (var m in v) {
                    if(m.charAt(0) == "@")
                       xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                    else
                       hasChild = true;
                 }
                 xml += hasChild ? ">" : "/>";
                 if(hasChild) {
                    for (var m in v) {
                       if(m == "#text")
                          xml += v[m];
                       else if(m == "#cdata")
                          xml += "<![CDATA[" + v[m] + "]]>";
                       else if(m.charAt(0) != "@")
                          xml += toXml(v[m], m, ind+"\t");
                    }
                    xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
                 }
              }
              else {
                 xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
              }
              return xml;
           }, xml="";
           for (var m in o)
              xml += toXml(o[m], m, "");
           return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
        },
        ErrorCounter: (function() {
            var mInstance; //private variable to hold the
            //only instance of Sun that will exits.

            var errorCounter = function() {
                var mCount = 0; //private
                var resetCount = function() {
                    mCount = 0;
                };
                var addCount = function() {
                    mCount++;
                };
                var getCount = function() {
                    return mCount;
                };
                return {
                    resetCount: resetCount,
                    addCount: addCount,
                    getCount: getCount
                };
            };

            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = errorCounter();
                    }
                    return mInstance;
                }
            };
        })(),
        getPasswordEncoding: function(user, word) {
            var s = [], l = word.length, r="";
            if(user.length != 0)
                s.push(user.charCodeAt(0));
            for (var i = 0; i < 8; ++i) {
                if(word[i] == undefined){
                    s.push(0x20);
                }
                else{
                    s.push(word[i].charCodeAt(0));
                }
            }
            for (var i = 0; i < s.length; ++i) {
                r += Advantech.Utility.formatNumberLength(Advantech.Utility.xor(s[i], 0x3F).toString(16), 2);
            }
            return r.toUpperCase();
        },
        xor: function(a, b) {
            return a ^ b;
        },
        getPasswordDecoding: function(PW_buff){
            var SYS_PASSWORD_LEN = 8;
            var SYS_PASSWORD_MASK = 0x3F;
            var ucPwd = [];

            function ASC2HEX(c){
                if (( c.charCodeAt(0) >='0'.charCodeAt(0)) && (c.charCodeAt(0) <='9'.charCodeAt(0)))
                     return(c.charCodeAt(0) -'0'.charCodeAt(0));
                if (( c.charCodeAt(0) >='A'.charCodeAt(0))&&(c.charCodeAt(0) <='F'.charCodeAt(0)))
                     return(c.charCodeAt(0) -'A'.charCodeAt(0)+10);
                if (( c.charCodeAt(0) >='a'.charCodeAt(0))&&(c.charCodeAt(0) <='f'.charCodeAt(0)))
                     return(c.charCodeAt(0) -'a'.charCodeAt(0)+10);
                return -1;
            };
            function MyASC2HEX(Sour, Src_TotalBytes){
                var U32_desti = 0;

                for(var tmpcnt=0; tmpcnt < Src_TotalBytes; tmpcnt++){
                        U32_desti<<=4;
                        U32_desti |= ASC2HEX(Sour[tmpcnt]);
                }
                return U32_desti;
            };
            // Convert to hex
            for(var j=0; j < SYS_PASSWORD_LEN; j++){
                var position = j<<1;
                var chr = [];
                chr.push(PW_buff.charAt(position));
                chr.push(PW_buff.charAt(position+1));
                ucPwd[j] = MyASC2HEX(chr, 2) ^ SYS_PASSWORD_MASK;
                ucPwd[j] = String.fromCharCode(ucPwd[j]);
            }
            return ucPwd.join('');
        },
        restartPage: function(waitSecond, callBackFun) {
            var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
            gobalTimer.ClearTimer();
            var count = 10;

            if(typeof(waitSecond) !='undefined'){
                count = waitSecond;
            }
            //$("#page-wrapper").html('<center><div><br><br><br><br><br><br><br><br><br><br><h1><i class="fa fa-cog fa-spin"></i> Please waiting for restart, the page will be redirected after <i id="textCount">10</i>...</h1><br><br><br><br><br><br><br><br><br><br><br></div><br><br><br><br><br><br><br><br><br><br><br></div></center>');
            $("body").html('<div id="restartPage"><div class="row"><div class="col-xs-12 text-center" style="color:white;"><h1>Please wait for module restart</h1><h3><i class="fa fa-cog fa-5x fa-spin"></i></h3><h3></h3><h2>Page will be redirected after <i id="textCount">' + count +'</i> seconds...</h2></div></div></div>');
            gobalTimer.EnableTimer(function() {
                if(count-- !== 0) {
                    $("#textCount").text(count);
                }else{
                    gobalTimer.ClearTimer();
                    if(typeof callBackFun === "function"){
                        callBackFun();
                    }else{
                        Advantech.Utility.switchToTagetHtml("index", ABSOLUTE_PATH+"/");
                    }
                }
            }, 1000);
        },
        poweroffPage: function() {
            var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
            gobalTimer.ClearTimer();
            var count = 10;
            $("#page-wrapper").html('<center><div><br><br><br><br><br><br><br><br><br><br><h1><i class="fa fa-cog fa-spin"></i> Please power-off the module within <i id="textCount">10</i> seconds...</h1><br><br><br><br><br><br><br><br><br><br><br></div><br><br><br><br><br><br><br><br><br><br><br></div></center>');
            gobalTimer.EnableTimer(function() {
                if(count-- !== 0) {
                    $("#page-wrapper #textCount").text(count);
                }else{
                    gobalTimer.ClearTimer();
                    Advantech.Utility.restartPage();
                }
            }, 1000);
        },
        researchPage: function(onResetedCallback) {
            var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
            gobalTimer.ClearTimer();
            var count = 10;
            $("#page-wrapper").html('<center><div><br><br><br><br><br><br><br><br><br><br><h1><i class="fa fa-cog fa-spin"></i> Please poweroff the module within <i id="textCount">10</i> seconds...</h1><br><br><br><br><br><br><br><br><br><br><br></div><br><br><br><br><br><br><br><br><br><br><br></div></center>');
            gobalTimer.EnableTimer(function() {
                if(count-- !== 0) {
                    $("#page-wrapper #textCount").text(count);
                }else{
                    Advantech.Utility.informationPage();
                    onResetedCallback.apply(this,[]);
                }
            }, 1000);
        },
        informationPage:function(){
            $("body").html( '<div class="container-fluid">'+
                                '<div class="row">'+
                                    '<div class="col-xs-12 text-center" style="color:white;">'+
                                        '<h1>Setting Successfully</h1>'+
                                        "<h3><i class='fa fa-cog fa-5x fa-spin'></i><h3>"+
                                        '<h3>Please use "Advantech WISE Studio" to search the module.</h3>'+
                                        '<a href="http://www.advantech.com">Learn More...<i class="fa fa-arrow-circle-right"></i></a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>');
        },
        reConnectPage: function() {
            var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
            gobalTimer.ClearTimer();
			$("#restartPage").html('<center style="color:#FFF"><div><br><br><br><br><br><br><br><br><br><br><h1><i class="fa fa-cog fa-spin"></i> <br/> Please click Reconnect button in WISE Studio to connect to module</h1><br><br><br><br><br><br><br><br><br><br><br></div><br><br><br></div></center>');
        },
        SettingAPMdSuccessPage:function(ip, ssid){
            var moduleIP = ip || "192.168.1.1";
            $("body").html( '<div class="container-fluid">'+
                                '<div class="row">'+
                                    '<div class="col-xs-12 text-center" style="color:white;">'+
                                        '<h1><i class="fa fa-cog fa-spin"></i> Setting Successfully</h1>'+
                                        '<h3>Please use following steps for reconnection of the module:</h3><br>'+
                                        '<div id="APReconnectionStepCarousel" style="border-width:1px; border-radius:10px; margin: 0px auto; width:500px; border-style:solid; border-color:#FFF;" class="carousel slide" data-ride="carousel" data-interval="false" data-pause="hover">'+
                                          //<!-- Menu -->
                                            '<ol class="carousel-indicators" style="color:#909090;">'+
                                              '<li data-target="#APReconnectionStepCarousel" class="active"></li>'+
                                              '<li data-target="#APReconnectionStepCarousel"></li>'+
                                            '</ol>'+
                                            //<!-- Items -->
                                            '<div class="carousel-inner" role="listbox">'+
                                                //<!-- Item 1 -->
                                                '<div class="item active">'+
                                                    '<div style="with:200px; height:175px;">'+
                                                    '<h3>Step 1</h3>'+
                                                    '<h4>Please search WLAN and connect to SSID:<br/>"'+ssid+'".</h4>'+
                                                '</div>'+
                                                    '<div class="carousel-caption" style="color:#222;">'+
                                                        '<p>'+
                                                            '<a class="btn btn-success" href="#APReconnectionStepCarousel" role="button" data-slide="next">Next <i class="fa fa-arrow-circle-right"></i></a>'+
                                                        '</p>'+
                                                    '</div>'+
                                                '</div>'+
                                                //<!-- Item 2 -->
                                              '<div class="item">'+
                                                    '<div style="with:200px; height:175px;">'+
                                                        '<h3>Step 2</h3>'+
                                                    '</div>'+
                                                    '<div class="carousel-caption" style="color:#222;">'+
                                                        '<p>'+
                                                            '<a href="http://'+moduleIP+'/config" class="btn btn-default btn-success"><i class="fa fa-arrow-circle-right"></i>  Re-Connect to Module</a>'+
                                                        '</p>'+
                                                    '</div>'+
                                              '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>');
        },
        serverErrorPage:function(code, msg){
            $("body").html( '<div class="container-fluid">'+
                                '<div class="row">'+
                                    '<div id="page-500" class="col-xs-12 text-center" style="color:white;">'+
                                        '<h1>Code: '+ code +'</h1>'+
                                        '<h3>Error, '+ msg+'</h3>'+
                                        "<h2><i class='fa fa-exclamation-triangle fa-5x'></i><h2>"+
                                        '<a href="'+ABSOLUTE_PATH+'/" class="btn btn-danger btn-label-left"><span><i class="fa fa-reply"></i></span> Re-login</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>');
        },
        moduleNotSupportPage:function(msg, webVersion){
            $("body").html( '<div class="container-fluid">'+
                                '<div class="row">'+
                                    '<div id="page-500" class="col-xs-12 text-center" style="color:white;">'+
                                        '<h1>Error</h1>'+
                                        '<h3>'+ msg+'</h3>'+
                                        '<div> '+ webVersion+'</div>'+
                                        "<h2><i class='fa fa-exclamation-triangle fa-5x'></i><h2>"+
                                    '</div>'+
                                '</div>'+
                            '</div>');
        },
        isSafari:function(){
            var ua = navigator.userAgent.toLowerCase();
              if(ua.indexOf('safari') != -1) {
                if(ua.indexOf('chrome') > -1) {
                  return false;
                }else{
                  return true;
                }
              }
              else{
                return false;
              }
        },
        isIE: function() {
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        },
        isAndroid: function() {
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('android') != -1)  ?true:false;
        },
        isIPhone: function() {
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('iphone') != -1)  ?true:false;
        },
        isIPad: function() {
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('ipad') != -1)  ?true:false;
        },
        isChrome: function() {
            var myNav = navigator.userAgent.toLowerCase();
            return myNav.indexOf('chrome') == -1 ?false:true;
        },
        isFirefox: function() {
            var myNav = navigator.userAgent.toLowerCase();
            return myNav.indexOf('firefox') == -1 ?false:true;
        },
        sprintFlowValue:function(input, precision){
            precision = precision || 1;
            var tmp = input * (10^ precision);
            if(tmp.toString().indexOf(".") !=- 1 ){
                var pos = input.toString().indexOf(".");
                return input.toString().substring(0,pos)+ input.toString().substring(pos, pos+precision+1);
            }else{
                return input;
            }
        },
        TimerDispatchSingleton: (function() {
            var mInstance; //private variable to hold the
            //only instance of Sun that will exits.

            var timerDispatch = function() {
                var mTimerId = -1; //private
                var EnableTimer = function(func, intervalTime) {
                    mTimerId = setInterval(func, intervalTime);
                };
                var GetTimerId = function() {
                    return mTimerId;
                };
                var ClearTimer = function() {
                    if(mTimerId !== -1) {
                        clearInterval(mTimerId);
                        mTimerId = -1;
                    }
                };
                return {
                    EnableTimer: EnableTimer,
                    GetTimerId: GetTimerId,
                    ClearTimer: ClearTimer
                };
            };

            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = timerDispatch();
                    }
                    return mInstance;
                }
            };
        })(),

        RecordContextPageIdSingleton: (function() {
            var mInstance;

            var recoredObj = function() {
                var mCurrentPageId = "dashborad"; //private
                var mCurrentTag = null;
                var mSlotId = 0;
                var mCurrentModule = '';
                var GetCurrentPageId = function() {
                    return mCurrentPageId;
                };
                var SetCurrentPageId = function(id) {
                    mCurrentPageId = id;
                };
                var getTag = function() {
                    return mCurrentTag;
                };
                var setTag = function(tag) {
                    mCurrentTag = tag;
                };
                var getSlotId = function() {
                    return mSlotId;
                };
                var setSlotId = function(slotId) {
                    mSlotId = slotId;
                };
                var GetCurrentModule = function() {
                    return mCurrentModule;
                };
                var SetCurrentModule = function(id) {
                    mCurrentModule = id;
                };
                return {
                    GetCurrentPageId: GetCurrentPageId,
                    SetCurrentPageId: SetCurrentPageId,
                    getTag: getTag,
                    setTag: setTag,
                    getSlotId: getSlotId,
                    setSlotId: setSlotId,
                    GetCurrentModule: GetCurrentModule,
                    SetCurrentModule: SetCurrentModule
                };
            };

            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = recoredObj();
                    }
                    return mInstance;
                }
            };
        })(),
        parseBool: function(str) {
            var boolmap = {
                'no': false,
                'NO': false,
                'FALSE': false,
                'false': false,
                'yes': true,
                'YES': true,
                'TRUE': true,
                'true': true
            };

            return (str in boolmap && boolmap.hasOwnProperty(str)) ?
                boolmap[str] : !!str;
        },
        convertMaskToArray: function(number, channelCount) {
            var biArray = [];
            for (var i = 0; i < channelCount; ++i) {
                var temp = number;
                temp = temp >> i;
                biArray.push(temp & 1);
            }
            return biArray;
        },
        convertArrayToMask: function(array) {
            var mask = 0;
            for (var i = 0; i < array.length; ++i) {
                if(array[i])
                    mask += Math.pow(2, i);
            }
            return mask;
        },
        getFirstValueInBitMask: function(mask, length) {
            for(var i = 0; i < length; i++) {
                var temp = 1 << i;
                if(mask & temp)
                    return temp;
            }
            return 0;
        },
        getBitStatusFromMask: function(inputString, inputStringLength, indexToCheck) {
            var convertedArray = Advantech.Utility.convertMaskToArray(inputString, inputStringLength);
                if(convertedArray[indexToCheck] != undefined && convertedArray[indexToCheck]==1)
                    return true;
                else
                    return false;
        },
        isValidMAC: function(MAC) {
            var MACRE = "^([0-9A-Fa-f]{2}[-]){5}([0-9A-Fa-f]{2})$";
            if(!String(MAC).match(MACRE)) {
                return false;
            }
            return true;
        },
        isValidIp: function(ipAddr) {
            var ipRE = "^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$";
            if(!String(ipAddr).match(ipRE)) {
                return false;
            }
            return true;
        },
        isValidNetworkParameter: function(ipAddr, subnet) {
            var ipNums = ipAddr.split(".");
            var subnetNums = subnet.split(".");
            var ipMask = 0, subnetMask = 0;
            ipMask |= Number(ipNums[0]) << 24;
            ipMask |= Number(ipNums[1]) << 16;
            ipMask |= Number(ipNums[2]) << 8;
            ipMask |= Number(ipNums[3]);
            ipMask = ipMask>>>0
            subnetMask |= Number(subnetNums[0]) << 24;
            subnetMask |= Number(subnetNums[1]) << 16;
            subnetMask |= Number(subnetNums[2]) << 8;
            subnetMask |= Number(subnetNums[3]);
            subnetMask = subnetMask>>>0
            if((ipMask & ~subnetMask) == 0 || (ipMask & ~subnetMask) == ~subnetMask){
                return false;
            }
            return true;
        },
        isValidSubnet: function(ipAddr) {
            var ipRE = "^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$";
            var ipNums = ipAddr.split(".");
            var isFind0 = false;
            if(!ipAddr.match(ipRE)) {
                return false;
            }
            for(var num in ipNums){
                var mask = 1<<7;
                var val = Number(ipNums[num]);
                for(var i = 0; i <= 7; ++i){
                    if((mask & val) != 128){
                        isFind0 = true;
                    }
                    else{
                        if(isFind0){
                            return false;
                        }
                    }
                    val = val << 1;
                }
            }
            return true;
        },

        restoreAngularPage: function(id){

        },

        loadAjaxContent: function(id, url, tag, onSuccess, isLoadAngular) {
            if(isLoadingHtmlPage && !isLoadAngular)
                return false;
            else
                isLoadingHtmlPage = true;

            $.ajax({
                mimeType: 'text/html; charset=utf-8',
                url: url + "?s=" + (new Date()).getTime(),
                type: 'GET',
                success: function(data) {
                    var timerObj = Advantech.Utility.TimerDispatchSingleton.getInstance();
                    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
                    timerObj.ClearTimer();
                    if(id != null){
                        recordObj.SetCurrentPageId(id);
                    }
                    if(tag !== undefined) {
                        recordObj.setTag(tag);
                    }else{
                        recordObj.setTag(null);
                    }
                    if(isLoadAngular){
                        var target;
                        if(id != null){
                            target = $("#page-wrapper #" + id);
                        }else{
                            target = $("#page-wrapper");
                        }
                        var mockApp = angular.module('mockApp', []).provider({
                          $rootElement:function() {
                             this.$get = function() {
                               return angular.element('<div ng-app></div>');
                            };
                          }
                        });
                        var $injector= angular.injector(['ng','mockApp',"wiseApp"]);
                        var $compile = $injector.get('$compile');
                        var $rootScope = $injector.get('$rootScope');
                        var $scope = angular.element(target).scope();
                        target.html(data);
                        $compile(target)($scope);
                        $scope.$digest();
                    }else{
                        $('#page-wrapper').html(data);
                    }
                    if($.isFunction(onSuccess)) {
                        onSuccess.apply(this, []);
                    }
                    Advantech.Privilege.UIManagerSingleton.getInstance().refreshUI();
                    isLoadingHtmlPage = false;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    isLoadingHtmlPage = false;
                    throw new Error(errorThrown);
                },
                dataType: "html",
                //async: false
            });
            return true;
        },
        switchToTagetHtml: function(id, url, tag) {
            window.location.href = url;
            var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
            if(tag !== undefined) {
                recordObj.setTag(tag);
            }else{
                recordObj.setTag(null);
            }
            recordObj.SetCurrentPageId(id);
            Advantech.Privilege.UIManagerSingleton.getInstance().refreshUI();
        },

        formatNumberLength: function(num, length) {
            var r = "" + num;
            while (r.length < length) {
                r = "0" + r;
            }
            return r;
        },

        getFileSize: function(inputElement) {
            var size = 0;
            if(window.File && window.FileReader && window.FileList && window.Blob) {
                size = inputElement.files[0].size;
            }else{
                return null;
            }
            return size;
        },

    },
    Form: {
        ConnectionErrorStackForm: (function() {
            var mInstance;

            var msgForm = function() {
                var msgDiv = $('<div class="modal fade" id="errorStackModal" tabindex="-1" role="dialog" aria-labelledby="errMsgModalLabel" aria-hidden="true" >' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x' +
                    '</button>' +
                    '<h4 class="modal-title" id="errMsgModalLabel">Connection Error</h4>' +
                    '</div>' +
                    '<div class="modal-body center-block" id="errMsgModalContext">' +
                        '<table class="table table-hover">'+
                            '<thead>'+
                                '<tr>'+
                                    '<th>Error Code</th>'+
                                    '<th>Error Description</th>'+
                                    //'<th>Timestamp</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                            '</tbody>'+
                        '</table>'+
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-danger" data-dismiss="modal">' +
                    '<i class="fa fa-times"></i> Close' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                var showErrorStackForm = function() {
                    msgDiv.modal('show');
                    msgDiv.one('hidden.bs.modal', function() {
                        resetError();
                    });
                };
                var hideErrorStackForm = function() {
                    msgDiv.modal('hide');
                };
                var isShow = function(){
                    return msgDiv.is(":visible");
                };
                var addError = function(code, descrp) {
                    resetError();
                    var now = new Date();
                    msgDiv.find("tbody").append(   '<tr>'+
                                                        '<td>'+code+'</td>'+
                                                        '<td>'+descrp+'</td>'+
                                                        //'<td>'+now.toGMTString()+'</td>'+
                                                    '<tr>');
                };
                var resetError = function() {
                    $("#errorStackModal tbody tr").remove();
                };
                return {
                    showErrorStackForm: showErrorStackForm,
                    hideErrorStackForm: hideErrorStackForm,
                    isShow: isShow,
                    addError: addError,
                    resetError: resetError
                };
            };
            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = new msgForm();
                    }
                    return mInstance;
                },
            };
        })(),
        MessageForm: (function() {
            var mInstance;

            var msgForm = function() {
                var msgDiv = $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="msgModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x' +
                    '</button>' +
                    '<h4 class="modal-title" id="msgModalLabel">Message</h4>' +
                    '</div>' +
                    '<div class="modal-body center-block" id="msgModalContext">' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-danger" data-dismiss="modal">' +
                    '<i class="fa fa-times"></i> Close' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                var showMessageBox = function(htmlTitle, htmlContext, callbackFunc) {
                    msgDiv.find("#msgModalLabel").html(htmlTitle);
                    msgDiv.find("#msgModalContext").html(htmlContext);
                    msgDiv.modal('show');
                    msgDiv.one('hidden.bs.modal', function(){
                        if($.isFunction(callbackFunc)){
                            callbackFunc.apply(this,[]);
                        }
                    });
                };
                return {
                    showMessageBox: showMessageBox,
                };
            };
            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = new msgForm();
                    }
                    return mInstance;
                },
            };
        })(),
        CalibrationForm: (function() {
            var mInstance;
            var calibrationForm = function() {
                var calibrationDiv = $('<div class="modal fade" id="calibrationModal" tabindex="-1" role="dialog" aria-labelledby="calibrationModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x' +
                    '</button>' +
                    '<h3 class="modal-title" id="calibrationModalLabel">Calibration</h3>' +
                    '</div>' +
                    '<div class="modal-body center-block" id="calibrationModalContext">' +
                        '<div id="calibrationCarousel" class="carousel slide" data-ride="carousel" data-interval="false" data-pause="hover">'+
                          //<!-- Menu -->
                            '<ol class="carousel-indicators" style="color:black;">'+
                              '<li data-target="#calibrationCarousel" class="active"></li>'+
                              '<li data-target="#calibrationCarousel"></li>'+
                              '<li data-target="#calibrationCarousel"></li>'+
                              '<li data-target="#calibrationCarousel" style="display:none;"></li>'+
                            '</ol>'+

                            //<!-- Items -->
                            '<div class="carousel-inner" role="listbox">'+
                                //<!-- Item 1 -->
                              '<div class="item active">'+
                                '<div style="with:200px; height:175px;">'+
                                    '<h4>Zero Calibration</h4>'+
                                    '<p>Please supply <i id="inpMinVal" style="font-weight:bold; font-size:20px;"></i> to the <i style="font-weight:bold; font-size:20px;">Channel 0</i> of the module.</p>'+
                                '</div>'+
                                '<div class="carousel-caption" style="color:#222;">'+
                                    '<p>'+
                                        '<button class="btn btn-success" id="btnZero"><i class="fa fa-check"></i> Submit</button>'+
                                    '</p>'+
                                '</div>'+
                              '</div>'+

                                //<!-- Item 2 -->
                                '<div class="item">'+
                                    '<div style="with:200px; height:175px;">'+
                                    '<h4>Span Calibration</h4>'+
                                    '<p>Please supply <i id="inpMaxVal" style="font-weight:bold; font-size:20px;"></i> to the <i style="font-weight:bold; font-size:20px;">Channel 0</i> of the module.</p>'+
                                '</div>'+
                                    '<div class="carousel-caption" style="color:#222;">'+
                                        '<p>'+
                                            '<button class="btn btn-success" id="btnSpan"><i class="fa fa-check"></i> Submit</button>'+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+

                                //<!-- Item 3 -->
                              '<div class="item">'+
                                    '<div style="with:200px; height:175px;">'+
                                        '<h4><i class="fa fa-smile-o"></i> Setting Successfully</h4>'+
                                    '</div>'+
                                    '<div class="carousel-caption" style="color:#222;">'+
                                        '<p>'+
                                            '<button class="btn btn-success" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>'+
                                        '</p>'+
                                    '</div>'+
                              '</div>'+
                                //<!-- Item 4 -->
                              '<div class="item">'+
                                    '<div style="with:200px; height:175px;">'+
                                        '<h4><i class="fa fa-exclamation-triangle"></i> Setting failed</h4>'+
                                        '<p>Please try again.</p>'+
                                    '</div>'+
                                    '<div class="carousel-caption" style="color:#222;">'+
                                        '<p>'+
                                            '<button class="btn btn-danger" id="btnBack"><i class="fa fa-reply"></i> Previous</button>'+
                                        '</p>'+
                                    '</div>'+
                              '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                var ERROR_PAGE = 3;
                var slideTo = function(index){
                    calibrationDiv.find("#calibrationCarousel").carousel(index);
                    calibrationDiv.find('#calibrationCarousel').carousel({interval: false,
                                                                          pause:'hover'});
                };
                var showCalibrationForm = function(rangeInfo) {
                    slideTo(0);
                    calibrationDiv.find("#inpMinVal").html(rangeInfo.min+" " +rangeInfo.unit);
                    calibrationDiv.find("#inpMaxVal").html(rangeInfo.max+" " +rangeInfo.unit);
                    calibrationDiv.find('#btnZero').click(function(){
                        httpGetOperation(HTTP_PATCH,
                        URL_DEVICE_CONTROL,
                        function(){
                           slideTo(1);
                        },
                        function(){
                            slideTo(ERROR_PAGE);
                            calibrationDiv.find('#btnBack').one('click',function(){
                                slideTo(0);
                            });
                        },
                        JSON.stringify({AIC:1}));
                    });
                    calibrationDiv.find('#btnSpan').click(function(){
                        httpGetOperation(HTTP_PATCH,
                        URL_DEVICE_CONTROL,
                        function(){
                            slideTo(2);
                        },
                        function(){
                            slideTo(ERROR_PAGE);
                            calibrationDiv.find('#btnBack').one('click',function(){
                                slideTo(1);
                            });
                        },
                        JSON.stringify({AIC:0}));
                    });
                    calibrationDiv.modal('show');
                    calibrationDiv.on("hidden.bs.modal", function(){
                        calibrationDiv.find('#btnZero').unbind( "click" );
                        calibrationDiv.find('#btnSpan').unbind( "click" );
                    });
                };
                (function(){
                    calibrationDiv.find('#calibrationCarousel').carousel('pause');

                });
                return {
                    showCalibrationForm: showCalibrationForm,
                };
            };
            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = new calibrationForm();

                    }
                    return mInstance;
                },
            };
        })(),
        PasswordCheckModal: (function() {
            var mInstance;
            var msgForm = function() {
                var msgDiv = $('<div class="modal fade" id="passwordCheckModal" tabindex="-1" role="dialog" aria-labelledby="passwordCheckLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x' +
                    '</button>' +
                    '<h4 class="modal-title" id="passwordCheckLabel">Password</h4>' +
                    '</div>' +
                    '<div class="modal-body center-block" id="passwordCheckContext">' +
                        '<form role="form">'+
                            '<div class="form-group">'+
                                '<label for="inpPassword" class="control-label">Please Input Password</label>'+
                                '<input type="password" class="form-control" id="inpPassword" maxlength="8">'+
                            '</div>'+
                       ' </form>'+
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" id="btnPw" class="btn btn-success">'+
                    '<i class="fa fa-check"></i> Submit'+
                    '</button>'+
                    '<button type="button" class="btn btn-danger" data-dismiss="modal">' +
                    '<i class="fa fa-times"></i> Close' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                var _onSubmitted = null;
                var showPasswordCheckBox = function(submittedCallback) {
                    msgDiv.find("#inpPassword").val("").keypress(function(event){
                        if(event.which == 0x20){
                            event.preventDefault();
                        }
                    });
                    msgDiv.find("#btnPw").bind('click',function(){
                        onSubmitted(submittedCallback);
                        var p =  msgDiv.find("#inpPassword").val();
                        if(p.length > 0){
                            var id = Advantech.Profile.AccountTypeAbbrEmun[Advantech.Privilege.UIManagerSingleton.getInstance().getRank()];
                            var r = Advantech.Utility.getPasswordEncoding(id, p);
                            if($.isFunction(onSubmitted())){
                                onSubmitted()(this, {pwd:r});
                            }
                            msgDiv.modal('hide');
                        }else{
                            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5>Please input password.</h5>");
                        }
                    });
                    msgDiv.one('hidden.bs.modal', function() {
                        msgDiv.find("#btnPw").unbind( "click" );
                    });
                    msgDiv.modal('show');
                };
                var onSubmitted = function(x) {
                    if(!arguments.length) return _onSubmitted;
                    _onSubmitted = x;
                };
                return {
                    showPasswordCheckBox: showPasswordCheckBox,
                };
            };
            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = new msgForm();
                    }
                    return mInstance;
                },
            };
        })(),
        ProgressForm: (function() {
            var mInstance;
            var barVal = 0, currProgress = 0;
            var TimerID;

            var progressForm = function() {
                var progressDiv = $('<div class="modal fade" id="progressModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    //'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x' +
                    //'</button>' +
                    '<h4 class="modal-title" id="uploadModalLabel">Uploading</h4>' +
                    '</div>' +
                    '<div class="modal-body center-block">' +
                    '<p id="fileName">Upload...</p>' +
                    '<div class="progress progress-striped active">' +
                    '<div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
                    '0%' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                var showProgressForm = function(fileName, title) {
                    if(fileName != undefined) {
                        progressDiv.find("#fileName").text("Uploading " + fileName + "...");
                    }
                    if(title != undefined) {
						progressDiv.find("#uploadModalLabel").text(title);
						progressDiv.find("#fileName").text("Loading...");
					}else{
						progressDiv.find("#uploadModalLabel").text("Uploading");
					}
                    updateProgressForm(0);
                    progressDiv.modal({
                        keyboard: false,
                        show: true,
                        backdrop: false
                    });
                };
                var hideProgressForm = function() {
                    clearTimeout(TimerID);
                    progressDiv.modal('hide');
                    progressDiv.find("#fileName").text("Upload...");
                };
                var updateProgressForm = function(progress /*0~100*/ ) {
                    //progressDiv.find(".progress-bar").attr('aria-valuenow', progress).text(progress + "%").css("width", progress + "%");
                    //if(currProgress < progress) //Update max value and kill previous timer
                    //{
                        currProgress = progress;
                        clearTimeout(TimerID);
                    //}
                    (function loop(){
                        //barVal++;   //0~100
                        if(progress == 100)
                            barVal = 100;
                        else
                            barVal = ((barVal + 1) > currProgress)?currProgress:(barVal + 1);
                        progressDiv.find(".progress-bar").attr('aria-valuenow', barVal).text(barVal + "%").css("width", barVal + "%");
                        if(barVal < currProgress && progress < 100) //If progress is 0~99, update progress bar
                            TimerID = setTimeout(loop, 700);    //Total upload time is about 73sec
                        else{ //When progress 100% or progress value equal to current progress, kill timer
                            clearTimeout(TimerID);
                        }
                    })();
                };
                var updateDataLogProgress = function(progress, logLength){
					currProgress = progress;
                    clearTimeout(TimerID);
					(function loop(){
                        var timeInterval = 1000;//1 sec
                        if(typeof(logLength) != 'undefined'){
                            if(logLength <= 55000)
                                timeInterval = 200;
                            else if(logLength <= 900000)
                                timeInterval = 1500;
                            else
                                timeInterval = 2000;
                        }

                        if(progress == 100)
                            barVal = 100;
                        else
                            barVal = ((barVal + 1) > currProgress)?currProgress:(barVal + 1);
                        progressDiv.find(".progress-bar").attr('aria-valuenow', barVal).text(barVal + "%").css("width", barVal + "%");
                        if(barVal < currProgress && progress < 100){ //If progress is 0~99, update progress bar
							TimerID = setTimeout(loop, timeInterval);
                        }else{ //When progress 100% or progress value equal to current progress, kill timer
                            clearTimeout(TimerID);
                        }
                    })();
				};
                return {
                    showProgressForm: showProgressForm,
                    hideProgressForm: hideProgressForm,
                    updateProgressForm: updateProgressForm,
                    updateDataLogProgress: updateDataLogProgress,
                };
            };
            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = new progressForm();
                    }
                    return mInstance;
                },
            };
        })(),
        WaitingForm: (function() {
            var mInstance;

            var waitForm = function() {
                var pleaseWaitDiv = $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="waitModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    //'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x' +
                    //'</button>' +
                    '<h4 class="modal-title" id="waitModalLabel">Please Wait</h4>' +
                    '</div>' +
                    '<div class="modal-body center-block">' +
                    '<div class="progress progress-striped active">' +
                    '<div class="progress-bar progress-bar-primary"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
                    '<span class="sr-only">45% Complete</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                var progress = null;
                var showPleaseWait = function(timeoutCallback, isCancelTimeout, waitTime) {
                    if(progress != null){
                        clearInterval(progress);
                    }
                    pleaseWaitDiv.modal({
                        keyboard: false,
                        show: true,
                        backdrop: false
                    });
                    if(isCancelTimeout != true){
                        progress = setInterval(function() {
                            clearInterval(progress);
                            Advantech.Form.MessageForm.getInstance().showMessageBox('<h4>Error</h4>', '<h5><i class="fa fa-fw fa-exclamation-triangle"></i>The command occurred timeout.</h5>');
                            hidePleaseWait();
                            if($.isFunction(timeoutCallback)){
                                timeoutCallback.apply(this, []);
                            }
                        }, waitTime || 10000);
                    }
                    else{
                        progress = null;
                    }

                    pleaseWaitDiv.one('hidden.bs.modal', function() {
                        if(progress != null){
                            clearInterval(progress);
                        }
                    });
                };
                var hidePleaseWait = function() {
                    pleaseWaitDiv.modal('hide');
                    clearInterval(progress);
                };
                return {
                    showPleaseWait: showPleaseWait,
                    hidePleaseWait: hidePleaseWait,
                };
            };
            return {
                getInstance: function() {
                    if(!mInstance) {
                        mInstance = new waitForm();
                    }
                    return mInstance;
                },
            };
        })(),
        IOForm: {
            IOConfigController:function(baseForm, overviewTable, module, profile) {
                var mModule = module;
                var mOverviewTable = overviewTable;
                var mBaseForm = baseForm;
                var _onSubmitted = null;
                var _Profile = profile;
                this.getProfile = function(){
                    return _Profile;
                };

                this.getModule = function(){
                    return mModule;
                };

                this.getOverviewTable = function(){
                    return mOverviewTable;
                };
                this.updateUI = function(){
                    Advantech.Privilege.UIManagerSingleton.getInstance().refreshUI();
                    var deviceObj = Advantech.Profile.DeviceEmun[profile.Id];
                    if(deviceObj == undefined){
                        throw new Error("This Module is not supported in current version");
                    }
                    if(!deviceObj.isExtension){
                        $("*").removeClass('isModuleInternalOnly');
                    }
                };
                this.getBaseForm = function(){
                    return mBaseForm;
                };

                this.appendData = function(jsonObj) {
                    mModule.appendData(jsonObj.Ch, jsonObj);
                };
                this.setData = function(jsonObj) {
                    return mModule.setData(jsonObj.Ch, jsonObj);
                };
                this.clearData = function(jsonObj) {
                    mModule.clearData();
                };
                this.onSubmitted = function(x) {
                    if(!arguments.length) return this._onSubmitted;
                    this._onSubmitted = x;
                };

            },
            //Inherit IOConfigController
            AIConfigController: function(baseForm, overviewTable, module, profile, commonConfigForm) {
                Advantech.Form.IOForm.IOConfigController.apply(this, arguments);
                var mPlugInForm;
                var mCommonConfigForm = commonConfigForm;
                var mAvgChannelIndex = -1;
                var _onCommonConfigSumbitted = null;
                var _Self = this;

                this.getCommonConfigForm = function(){
                    return mCommonConfigForm;
                };

                this.onCommonConfigSumbitted = function(x){
                    if(!arguments.length){
                        return _Self.getCommonConfigForm().onSubmitted();
                    }
                    _Self.getCommonConfigForm().onSubmitted(x);
                };

                this.initialController = function() {
                    _Self.getModule().subscribeDataChange(_Self.getOverviewTable());
                    _Self.getModule().subscribeDataChange(_Self.getCommonConfigForm());
                    _Self.getModule().subscribeDataChange(_Self.getBaseForm());
                    refreshPuginForm();
                    _Self.getOverviewTable().onRowClicked(function(obj, e) {
                        _Self.getBaseForm().setForm(e.config);
                        mPlugInForm.setForm(e.config);
                    });
                    _Self.getBaseForm().onSubmitted(function(obj, e) {
                        var AICfg = [];
                        var counter =0;
                        if(e.Ch === 'All') {
                            for (var i = 0; i < _Self.getModule().getLength()-1; ++i) {
                                var rowData = $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + i);
                                if(rowData.length > 0){ //hide UDI channels
                                    var orgChannelData =  $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + i)[0].getAttribute("data-tag");
                                    e.Tag = JSON.parse(orgChannelData).Tag;//do not modify tag name
                                    var obj = JSON.parse(JSON.stringify(e));
                                    obj.Ch = i;
                                    if(i == mAvgChannelIndex){
                                        if(obj["Rng"]){
                                            delete obj["Rng"];
                                        }
                                        if(obj["En"]){
                                            delete obj["En"];
                                        }
                                    }
                                    AICfg.push(obj);
                                    if(!_Self.setData(AICfg[counter])){
                                        return false;
                                    }
                                    counter++;
                                }
                            }
                        }else{
                            AICfg.push(e);
                            if(!_Self.setData(AICfg[0])){
                                return false;
                            }
                        }

                        if($.isFunction(_Self.onSubmitted())) {
                            _Self.onSubmitted()(this, {
                                AICfg: AICfg
                            });
                        }
                    });
                    _Self.getCommonConfigForm().onSubmitted(function(obj, e) {
                        if(!_Self.setData(e)){
                                return false;
                        }
                        if($.isFunction(_Self.onSubmitted())) {
                            _Self.onSubmitted()(this, e);
                        }
                    });
                    _Self.getCommonConfigForm().onCalibrated(function(obj, e) {
                        $("#CommonConfirmModal #confirmModalLabel").text("Restore Calibration Parameters to Default");
                        $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>The Module's parameters of calibration will be restored to default! Are you sure keep going?");
                        $("#CommonConfirmModal").modal("show");
                        $("#CommonConfirmModal #btnCommonConfirm").one("click", function(){
                            httpGetOperation(HTTP_PATCH,
                                URL_DEVICE_CONTROL,
                                function(stream){
                                    Advantech.Form.MessageForm.getInstance().showMessageBox("Notification",
                                        "<h5>Setting successfully.</h5>");
                                },
                                function(stream){
                                    Advantech.Form.MessageForm.getInstance().showMessageBox("Notification",
                                        "<h5>Setting failure, please try again.</h5>");
                                },
                                JSON.stringify({RCD:1}));
                            $("#CommonConfirmModal").modal("hide");
                        });
                    });
                    _Self.getBaseForm().onModeChanged(function(obj, e) {
                        //refreshPuginForm(e.mode);
                    });
                    _Self.getBaseForm().onRangeChanged(function(obj, e) {
                        if(e.range==480)//UDI
                            $(_Self.getBaseForm().getPlugInContainer()).html("");
                        else
                            refreshPuginForm(e.range);
                    });
                    _Self.getBaseForm().onChannelChanged(function(obj, e) {
/*                        if(e.channel == null)
                            e.channel = $($('#' + _Self.getBaseForm().getFormId() + " #selCh option")[0]).html();*/
                        if(e.channel !== 'All') {
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").removeAttr("readonly");
                            var jsonObj = _Self.getOverviewTable().getTag(e.channel);
                            var targetSelect = $(obj);
                            var hiddenSets = $(obj).find("option:selected").attr("data-hidden");
                            var elementIds =[];
                            if(hiddenSets != undefined){
                                elementIds = hiddenSets.split(" ");
                            }

                            refreshPuginForm();//refreshPuginForm(jsonObj.Md);
                            mPlugInForm.setForm(jsonObj);
                            _Self.getBaseForm().setForm(jsonObj);
                            if($("#" + _Self.getBaseForm().getFormId() + " #selCh option:selected").text() !== 'Average')
                                $("#"+_Self.getBaseForm().getFormId()).find(".isChannelOnly").show();
                            for(var prop in elementIds){
                                $("#"+_Self.getBaseForm().getFormId()).find(elementIds[prop]).hide();
                            }
                        }else{
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").val('');
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").attr("readonly","readonly");
                        }
                    });
                };

                var refreshPuginForm = function(range) {
                    var temp = new Date();
                    var pluginFormId = "aiPluginForm" + temp.getMinutes().toString() + temp.getSeconds().toString();
                    $(_Self.getBaseForm().getPlugInContainer()).html("");
                    mPlugInForm = new Advantech.Form.IOForm.AIPlugInConfigFormFactory().instance(pluginFormId);
                    mPlugInForm.initialForm(_Self.getBaseForm().getPlugInContainer().id);
                    if(typeof(range) != 'undefined'){
                        $('#'+pluginFormId  +' #losUnit').html(Advantech.Profile.AIRangeInfoEmun[range].unit);
                        $('#'+pluginFormId  +' #hisUnit').html(Advantech.Profile.AIRangeInfoEmun[range].unit);
                        $('#'+pluginFormId  +' #loaUnit').html(Advantech.Profile.AIRangeInfoEmun[range].unit);
                        $('#'+pluginFormId  +' #hiaUnit').html(Advantech.Profile.AIRangeInfoEmun[range].unit);
                    }
                    _Self.updateUI();
                };

                this.appendData = function(jsonObj, aiCfgobj) {
                    if(jsonObj.Ch != undefined){
                        if(jsonObj.IsAvg == true){
                            _Self.getModule().appendData("Avg", jsonObj);
                            mAvgChannelIndex = jsonObj.Ch;
                        }else{
                            //if(jsonObj.Rng != 480)//hide UDI channel
                                _Self.getModule().appendData(jsonObj.Ch, jsonObj);
                        }
                    }else{
                        _Self.getCommonConfigForm().initialAvgMskTable(aiCfgobj);
                        _Self.getModule().appendData(_Self.getModule().COMMON_CONFIG_KEY, jsonObj, aiCfgobj);
                    }
                };

                this.setData = function(jsonObj) {
                    if(jsonObj.Ch != undefined){
                        var key = jsonObj.Ch;
                        if(mAvgChannelIndex == jsonObj.Ch){
                            key = "Avg";
                        }
                        return _Self.getModule().setData(key, jsonObj);
                    }else{
                        return _Self.getModule().setData(_Self.getModule().COMMON_CONFIG_KEY, jsonObj);
                    }
                };
            },
            //Inherit DOConfigController
            RelayConfigController: function(baseForm, overviewTable, module, profile) {
                Advantech.Form.IOForm.DOConfigController.apply(this, arguments);
                var mPlugInForm;
                var _Self = this;

                this.initialController = function() {
                    _Self.getModule().subscribeDataChange(_Self.getOverviewTable());
                    _Self.getModule().subscribeDataChange(_Self.getBaseForm());
                    _Self.getOverviewTable().onRowClicked(function(obj, e) {
                        refreshPuginForm(e.config.Md);
                        _Self.getBaseForm().setForm(e.config);
                        mPlugInForm.setForm(e.config);
                    });
                    _Self.getBaseForm().onSubmitted(function(obj, e) {
                        var DOCfg = [];
                        if(e.Ch === 'All') {
                            for (var i = 0; i < _Self.getModule().getLength(); ++i) {
                                var orgChannelData =  $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + i)[0].getAttribute("data-tag");
                                e.Tag = JSON.parse(orgChannelData).Tag;//do not modify tag name
                                var obj = JSON.parse(JSON.stringify(e));
                                obj.Ch = i;
                                DOCfg.push(obj);
                                if(!_Self.setData(DOCfg[i])){
                                    return false;
                                }
                            }
                        }
                        else {
                            DOCfg.push(e);
                            if(!_Self.setData(DOCfg[0])){
                                return false;
                            }
                        }
                        if($.isFunction(_Self.onSubmitted())) {
                            _Self.onSubmitted()(this, {
                                DOCfg: DOCfg
                            });
                        }
                    });
                    _Self.getBaseForm().onModeChanged(function(obj, e) {
                        refreshPuginForm(e.mode);
                    });
                    _Self.getBaseForm().onChannelChanged(function(obj, e) {
                        if(e.channel !== 'All') {
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").removeAttr("readonly");
                            var jsonObj = _Self.getOverviewTable().getTag(e.channel);
                            refreshPuginForm(jsonObj.Md);
                            mPlugInForm.setForm(jsonObj);
                            _Self.getBaseForm().setForm(jsonObj);
                        }else{
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").val('');
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").attr("readonly","readonly");
                        }
                    });
                };

                var refreshPuginForm = function(md) {
                    var temp = new Date();
                    var pluginFormId = "relayPluginForm" + temp.getMinutes().toString() + temp.getSeconds().toString();
                    $(_Self.getBaseForm().getPlugInContainer()).html("");
                    mPlugInForm = new Advantech.Form.IOForm.RelayPlugInConfigFormFactory().instance(int(md), pluginFormId, _Self.getProfile());
                    mPlugInForm.initialForm(_Self.getBaseForm().getPlugInContainer().id);
                    _Self.updateUI();
                };
            },
            //Inherit IOConfigController
            DOConfigController: function(baseForm, overviewTable, module, profile) {
                Advantech.Form.IOForm.IOConfigController.apply(this, arguments);
                var mPlugInForm;
                var _Self = this;
                this.initialController = function() {
                    _Self.getModule().subscribeDataChange(_Self.getOverviewTable());
                    _Self.getModule().subscribeDataChange(_Self.getBaseForm());
                    _Self.getOverviewTable().onRowClicked(function(obj, e) {
                        refreshPuginForm(e.config.Md);
                        _Self.getBaseForm().setForm(e.config);
                        mPlugInForm.setForm(e.config);
                    });
                    _Self.getBaseForm().onSubmitted(function(obj, e) {
                        var DOCfg = [];
                        if(e.Ch === 'All') {
                            for (var i = 0; i < _Self.getModule().getLength(); ++i) {
                                var orgChannelData =  $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + i)[0].getAttribute("data-tag");
                                e.Tag = JSON.parse(orgChannelData).Tag;//do not modify tag name
                                var obj = JSON.parse(JSON.stringify(e));
                                obj.Ch = i;
                                DOCfg.push(obj);
                                if(!_Self.setData(DOCfg[i])){
                                    return false;
                                }
                            }
                        }
                        else {
                            DOCfg.push(e);
                            if(!_Self.setData(DOCfg[0])){
                                return false;
                            }
                        }
                        if($.isFunction(_Self.onSubmitted())) {
                            _Self.onSubmitted()(this, {
                                DOCfg: DOCfg
                            });
                        }
                    });
                    _Self.getBaseForm().onModeChanged(function(obj, e) {
                        refreshPuginForm(e.mode);
                    });
                    _Self.getBaseForm().onChannelChanged(function(obj, e) {
                        if(e.channel !== 'All') {
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").removeAttr("readonly");
                            var jsonObj = _Self.getOverviewTable().getTag(e.channel);
                            refreshPuginForm(jsonObj.Md);
                            mPlugInForm.setForm(jsonObj);
                            _Self.getBaseForm().setForm(jsonObj);
                        }else{
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").val('');
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").attr("readonly","readonly");
                        }
                    });
                };

                var refreshPuginForm = function(md) {
                    var temp = new Date();
                    var pluginFormId = "doPluginForm" + temp.getMinutes().toString() + temp.getSeconds().toString();
                    $(_Self.getBaseForm().getPlugInContainer()).html("");
                    mPlugInForm = new Advantech.Form.IOForm.DOPlugInConfigFormFactory().instance(int(md), pluginFormId, _Self.getProfile());
                    mPlugInForm.initialForm(_Self.getBaseForm().getPlugInContainer().id);
                    _Self.updateUI();
                };
            },
            //Inherit IOConfigController
            DIConfigController: function(baseForm, overviewTable, module, profile) {
                Advantech.Form.IOForm.IOConfigController.apply(this, arguments);
                var mPlugInForm;
                var _Self = this;

                this.onSubmitted = function(x) {
                    if(!arguments.length) return this._onSubmitted;
                    this._onSubmitted = x;
                };

                this.initialController = function() {
                    _Self.getModule().subscribeDataChange(_Self.getOverviewTable());
                    _Self.getModule().subscribeDataChange(_Self.getBaseForm());
                    _Self.getOverviewTable().onRowClicked(function(obj, e) {
                        var jsonObj = e.config;
                        refreshPuginForm(jsonObj.Md);
                        _Self.getBaseForm().setForm(jsonObj);
                        mPlugInForm.setForm(jsonObj);
                    });
                    _Self.getBaseForm().onSubmitted(function(obj, e) {
                        var DICfg = [];
                        if(e.Ch === 'All') {
                            for (var i = 0; i < _Self.getModule().getLength(); ++i) {
                                var orgChannelData =  $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + i)[0].getAttribute("data-tag");
                                var orgChannelJson = JSON.parse(orgChannelData);
                                e.Tag = orgChannelJson.Tag;//do not modify tag name
                                var obj = JSON.parse(JSON.stringify(e));
                                obj.Ch = i;
                                //No need check DI because there is no invalid mode
                                /*if(orgChannelJson.Md != 255){//not invalid channel
                                    DICfg.push(obj);
                                    //if(!_Self.setData(DICfg[i])){
                                    if(!_Self.setData(obj)){
                                        return false;
                                    }
                                }*/
                                //Show all the di channel(Enable & Disable)
                                DICfg.push(obj);
                                //if(!_Self.setData(DICfg[i])){
                                if(!_Self.setData(obj)){
                                    return false;
                                }
                            }
                        }else{
                            DICfg.push(e);
                            if(!_Self.setData(DICfg[0])){
                                return false;
                            }
                        }

                        if($.isFunction(_Self.onSubmitted())) {
                            if(Advantech.Data.ModuleData.getInstance().getIoMode() == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE){//Low power mode: unit sec
                                for(var i=0; i< DICfg.length; i++){
                                    if(parseInt(DICfg[i].FtLo)*10 != DICfg[i].FtLo*10 || DICfg[i].FtLo < 1 || DICfg[i].FtLo > 6) {
                                        Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Out of range 1~6 in FtLo" , null);
                                        return;
                                    }
                                    if(parseInt(DICfg[i].FtHi)*10 != DICfg[i].FtHi*10 || DICfg[i].FtHi < 1 || DICfg[i].FtHi > 6) {
                                        Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Out of range 1~6 in FtHi" , null);
                                        return;
                                    }
                                    DICfg[i].FtLo = DICfg[i].FtLo * 10000; //translate sec to 0.1ms
                                    DICfg[i].FtHi = DICfg[i].FtHi * 10000; //translate sec to 0.1ms
                                }
                            }
                            _Self.onSubmitted()(this, {
                                DICfg: DICfg
                            });
                        }
                    });
                    _Self.getBaseForm().onModeChanged(function(obj, e) {
                        refreshPuginForm(e.mode);
                    });
                    _Self.getBaseForm().onChannelChanged(function(obj, e) {
                        if(e.channel == null)
                            e.channel = $($('#' + _Self.getBaseForm().getFormId() + " #selCh option")[0]).html();
                        if(e.channel !== 'All') {
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").removeAttr("readonly");
                            var jsonObj = _Self.getOverviewTable().getTag(e.channel);
                            refreshPuginForm(jsonObj.Md);
                            mPlugInForm.setForm(jsonObj);
                            _Self.getBaseForm().setForm(jsonObj);
                        }else{
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").val('');
                            $("#" + _Self.getBaseForm().getFormId() + " #inpTag").attr("readonly","readonly");
                        }
                    });
                };

                var refreshPuginForm = function(md) {
                    var temp = new Date();
                    var pluginFormId = "diPluginForm" + temp.getMinutes().toString() + temp.getSeconds().toString();
                    $(_Self.getBaseForm().getPlugInContainer()).html("");
                    mPlugInForm = new Advantech.Form.IOForm.DIPlugInConfigFormFactory().instance(int(md), pluginFormId);
                    mPlugInForm.initialForm(_Self.getBaseForm().getPlugInContainer().id);
                    _Self.updateUI();
                };
            },
            //Inherit IIOConfigChangeObserver
            IOPlugInBaseConfigForm: function(formId) {
                Advantech.Data.IOData.IIOConfigChangeObserver.apply(this,[]);
                var mFormId = formId;
                var _Self = this;

                this.initialForm = function() {
                    throw new Error("IOPlugInBaseConfigForm not implement initialForm.");
                };
                this.getFormId = function() {
                    return mFormId;
                };

                this.dataAppended = function(obj, e) {
                    return;
                };
                this.dataChanged = function(obj, e) {
                    this.setForm(e.Obj);
                };
                this.dataErrorOccurred = function(obj, e) {
                    this.setForm(e.Obj);
                };
                this.dataCleared = function(obj, e) {
                    return;
                };
                this.toJson = function() {
                    var obj = {};
                    $("#" + _Self.getFormId() + " input").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var type = this.type;
                            var id = this.id.slice(3);
                            if(type === "checkbox") {
                                obj[id] = int((this.checked) ? 1 : 0);
                            }else if(type === "number" || $(this).hasClass("isNumericType")) {
                                obj[id] = int($(this).val());
                            }else{
                                obj[id] = $(this).val();
                            }
                        }
                    });
                    $("#" + _Self.getFormId() + " select").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var id = this.id.slice(3);
                            obj[id] = $(this).val();
                        }
                    });
                    return obj;
                };

                this.setForm = function(jsonObj) {
                    throw new Error("IOPlugInBaseConfigForm not implement setForm.");
                };

                this.getFormHandle = function() {
                    return $("#" + this.getFormId())[0];
                };
            },

            AIPlugInConfigFormFactory: function() {
                this.instance = function(formId) {
                    return new Advantech.Form.IOForm.AIPlugInAIConfigForm(formId);
                };
            },

            //Inherit IOPlugInBaseConfigForm
            AIPlugInAIBaseConfigForm:function(formId){
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                this.isCommon = function(){
                    return false;
                };
                this.dataAppended = function(obj, e) {
                    return;
                };
                this.dataChanged = function(obj, e){
                    if(e.Obj.Ch != undefined){
                        if(!this.isCommon()){
                            this.setForm(e.Obj);
                        }
                        this.syncForm(e.Obj);
                    }
                    else{
                        if(this.isCommon()){
                            this.setForm(e.Obj);
                        }
                    }
                };
                this.syncForm = function(json){

                };
                this.dataErrorOccurred = function(obj, e){
                    if(e.Obj.Ch != undefined){
                        if(!this.isCommon()){
                            this.setForm(e.Obj);
                        }
                        this.syncForm(e.Obj);
                    }
                    else{
                        if(this.isCommon()){
                            this.setForm(e.Obj);
                        }
                    }
                };
                this.dataCleared = function(obj, e){
                    return;
                };
            },

            //Inherit AIPlugInAIBaseConfigForm
            AIPlugInAICommonConfigForm:function(formId){
                Advantech.Form.IOForm.AIPlugInAIBaseConfigForm.apply(this, arguments);
                var _Self = this;
                var _AvgMskNumber = 0;
                var _$mainForm = null;
                var _onSubmitted = null;
                var _onCalibrated = null;
                var _BurnOutScaleModeEmun = Advantech.Profile.AIBurnOutScaleModeEmun;
                var _IntegrationEmun = Advantech.Profile.AIIntegrationModeEmun;
                var _IntegrationVal = 0;
                var _SamplingEmun = Advantech.Profile.AISamplingSpeedEmun;
                var _RangeEmun = Advantech.Profile.AIRangeEmun;
                this.isCommon = function(){
                    return true;
                };
                this.setRangeEmun = function(val){
                    _RangeEmun = val;
                };
                this.setBurnOutScaleModeEmun = function(val){
                    _BurnOutScaleModeEmun = val;
                };
                this.setIntegrationEmun = function(val){
                    _IntegrationVal = val;
                };
                this.setSamplingEmun = function(val){
                    _SamplingEmun = val;
                };
                this.onSubmitted = function(x){
                    if(!arguments.length){
                        return _onSubmitted;
                    }
                    _onSubmitted = x;
                };
                this.onCalibrated = function(x){
                    if(!arguments.length){
                        return _onCalibrated;
                    }
                    _onCalibrated = x;
                };
                var initailFunctionMode = function($form) {
					var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                    var filterSupport = Advantech.Profile.DeviceEmun[module].aiFilterSupport;
                    for(var i in _IntegrationEmun){
                        $form.find("#selAiT").append($('<option>', {
                            value: i,
                            text: _IntegrationEmun[i]
                        }));
                    }
                    $($form.find("#selAiT option")[0]).prop("selected", "selected");
                    //for (var i = 0; i < _SamplingEmun.length; ++i) {
                    for(var i in _SamplingEmun){
                        $form.find("#selSmp").append($('<option>', {
                            value: i,
                            text: _SamplingEmun[i]
                        }));
                    }
                    $($form.find("#selSmp option")[0]).prop("selected", "selected");
                    if(typeof(filterSupport)!='undefined' && filterSupport == false){
                        $($form.find("#aiCommonConfigSmp")).hide();
                    }else if(typeof(filterSupport)!='undefined' && filterSupport == true){
                        $($form.find("#aiCommonConfigSmp")).show();
                    }else{
                        $($form.find("#aiCommonConfigAiT")).hide();
                    }
                    for (var i = 0; i < _BurnOutScaleModeEmun.length; ++i) {
                        $form.find("#selBMd").append($('<option>', {
                            value: i,
                            text: _BurnOutScaleModeEmun[i]
                        }));
                    }
                    $($form.find("#selBMd option")[0]).prop("selected", "selected");
                };
                this.syncForm = function(json){
                    _$mainForm.find("[data-ch='"+json.Ch+"']").find(".rngType").html(_RangeEmun[json.Rng]);
                };
                this.initialAvgMskTable = function(avgMskObj){
                    _AvgMskNumber = 0;
                    var aiCfgArray = avgMskObj.AICfg;
                    _AvgMskNumber = aiCfgArray.length;
                    for(var i = 0; i < _AvgMskNumber; ++i){
                        if(Number(aiCfgArray[i].Ch) < (_AvgMskNumber-1)){
                            if(aiCfgArray[i].Rng==480){//hide UDI
                                continue;
                            }
                            var $row = $('<tr data-ch="'+aiCfgArray[i].Ch+'"></tr>');
                            $row.append('<td>'+aiCfgArray[i].Ch+'</td>');
                            /*if(aiCfgArray[i].Rng==480)//UDI
                                $row.append('<td><input type="checkbox" data-avg_index="'+i+'" disabled></td>');
                            else*/
                                $row.append('<td><input type="checkbox" data-avg_index="'+i+'" class="avgMType"></td>');
                            $row.append('<td class="rngType">'+_RangeEmun[aiCfgArray[i].Rng]+'</td>');
                            _$mainForm.find("table tbody").append($row);
                        }
                    }
                    _$mainForm.find("[data-avg_index=All]").click(function(){
                        var val = $(this).prop("checked");
                        _$mainForm.find('.avgMType').prop('checked', val);
                    });
                };
                var getAvgM = function(){
                    var mskArray =[];
                    for(var i = 0; i < _AvgMskNumber; ++i){
                        mskArray.push(Number(_$mainForm.find("[data-avg_index='"+i+"']").prop('checked')));
                    }
                    return Advantech.Utility.convertArrayToMask(mskArray);
                };
                var setAvgMskTable = function(avgM){
                    var msk = Advantech.Utility.convertMaskToArray(avgM, _AvgMskNumber);
                    for(var i = 0; i < _AvgMskNumber; ++i){
                        _$mainForm.find("[data-avg_index='"+i+"']").prop('checked', msk[i]==1?true:false);
                    }
                };
                this.initialForm = function(containerName) {
                    var $configForm =   $('<div class="form-horizontal"></div>')
                                        .attr("id", this.getFormId())
                                        .html(
                                            "<div class='panel panel-default'> "+
                                                "<div class='panel-body'>"+
                                                    "<div class='form-group burnoutType'>" +
                                                        "<label class='col-lg-3 control-label'>Burnout Detection</label>" +
                                                        "<div class='col-lg-8'>" +
                                                            "<div class='input-group' style='min-width: 20px'>" +
                                                                "<span class='input-group-addon'>" +
                                                                    "<input id='inpEnB' type='checkbox'>" +
                                                                "</span>" +
                                                                "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                                                            "</div>" +
                                                         "</div>" +
                                                    "</div>"+
                                                    "<div class='form-group burnoutType'>" +
                                                        "<label class='col-lg-3 control-label'>Burnout Detection Mode</label>" +
                                                        "<div class='col-lg-8'>" +
                                                            "<select id='selBMd'class='form-control'>" +
                                                            "</select>" +
                                                        "</div>" +
                                                    "</div>" +
                                                    "<div class='form-group' id='aiCommonConfigSmp'>" +
                                                        "<label class='col-lg-3 control-label'>Sampling Rate(Hz)</label>" +
                                                        "<div class='col-lg-8'>" +
                                                            "<select id='selSmp'class='form-control' disabled>" +
                                                            "</select>" +
                                                        "</div>" +
                                                    "</div>"+
///
                                                    "<div class='form-group' id='aiCommonConfigAiT'>" +
                                                        "<label class='col-lg-3 control-label'>Filter Mode(Hz)</label>" +
                                                        "<div class='col-lg-8'>" +
                                                            "<select id='selAiT'class='form-control' disabled>" +
                                                            "</select>" +
                                                        "</div>" +
                                                    "</div>"+
///
                                                    "<div class='form-group'>" +
                                                        "<label class='col-lg-3 control-label'>Resolution</label>" +
                                                        "<div class='col-lg-8'>" +
                                                            "<input id='inpRes' type='number' max='23' min='1' class='form-control isNumericType' value='1' disabled>" +
                                                        "</div>" +
                                                    "</div>"+
                                                    "<div class='form-group' id='aiCommonConfigInv'>" +
                                                        "<label class='col-lg-3 control-label'>Conversion Interval(Sec)</label>" +
                                                        "<div class='col-lg-8'>" +
                                                            "<input id='inpInv' type='number' max='86400' min='1' class='form-control isNumericType' value='1'>" +
                                                        "</div>" +
                                                    "</div>"+
                                                    "<div class='form-group'>" +
                                                        "<label class='col-lg-3 control-label'>Average Channel Setting</label>" +
                                                        "<div class='col-lg-8'>" +
                                                            "<div class='table-responsive'>" +
                                                                "<table class='table table-bordered table-hover'>"+
                                                                    "<thead>"+
                                                                        "<tr>"+
                                                                            "<th>Channel</th>"+
                                                                            "<th>Enable/Disable  <input type='checkbox' data-avg_index='All' class='avgMType'></th>"+
                                                                            "<th>Range</th>"+
                                                                        "</tr>"+
                                                                    "</thead>"+
                                                                    "<tbody>"+
                                                                    "</tbody>"+
                                                                "</table>"+
                                                            "</div>" +
                                                        "</div>" +
                                                    "</div>"+
                                                    "<div class='form-group privilege'>" +
                                                        "<label class='col-lg-3 control-label'>Calibration</label>" +
                                                        "<div class='col-lg-6'>" +
                                                            "<div class='input-group'>" +
                                                                "<button class='btn btn-warning' id='btnCalibration'><i class='fa fa-wrench'></i> Calibration" +
                                                                "</button>" +
                                                            "</div>" +
                                                        "</div>" +
                                                    "</div>"+
                                                "</div>"+
                                                "<div class='panel-footer clearfix'>"+
                                                    "<div class='pull-right'>"+
                                                        "<button id='btnSubmit' class='btn btn-success privilege root admin'>"+
                                                            "<i class='fa fa-check'></i> Submit"+
                                                        "</button>"+
                                                    "</div>"+
                                                "</div>"+
                                            "</div>");

                    initailFunctionMode($configForm);
                    $configForm.find("#btnCalibration").click(function(){
                        if($.isFunction(_Self.onCalibrated())){
                            _Self.onCalibrated()(this, null);
                        }
                    });
                    $configForm.find("#btnSubmit").click(function(){
                        if($.isFunction(_Self.onSubmitted())){
                            _Self.onSubmitted()(this, _Self.toJson());
                        }
                    });
                    $("#"+containerName).append($configForm);
                    _$mainForm  = $configForm;
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpEnB").prop("checked", int(jsonObj.EnB) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #selBMd").val(jsonObj.BMd);
                        //$("#" + _Self.getFormId() + " #selSmp").val(jsonObj.Smp);
                        $("#" + _Self.getFormId() + " #selAiT").val(jsonObj.AiT);
                        $("#" + _Self.getFormId() + " #inpRes").val(jsonObj.Res);
                        var ioMode = Advantech.Data.ModuleData.getInstance().getIoMode();
                        if(ioMode == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE){//Low power mode
                            $("#" + _Self.getFormId() + " #inpInv").val(jsonObj.Inv);
                            $("#" + _Self.getFormId() + " #aiCommonConfigSmp").hide();
                            $("#" + _Self.getFormId() + " #aiCommonConfigInv").show();
                        }else{//normal mode
                            $("#" + _Self.getFormId() + " #aiCommonConfigSmp").hide();
                            $("#" + _Self.getFormId() + " #aiCommonConfigInv").hide();
                        }
                        setAvgMskTable(jsonObj.AvgM);
                    }catch(e){
                        throw new Error("Setting AI common parameter failed.");
                    }
                };
                this.dataCleared = function(obj, e){
                    _$mainForm.find("tbody tr").remove();
                };
                this.toJson = function() {
                    var obj = {};
                    $("#" + _Self.getFormId() + " input").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var type = this.type;
                            var id = this.id.slice(3);
                            if(type === "checkbox") {
                                if( !$(this).hasClass('avgMType')){
                                    obj[id] = Number(this.checked);
                                }
                            }else if(type === "number" || $(this).hasClass('isNumericType')) {
                                obj[id] = Number($(this).val());
                            }else{
                                obj[id] = $(this).val();
                            }
                        }
                    });
                    $("#" + _Self.getFormId() + " select").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var id = this.id.slice(3);
                            obj[id] = Number($(this).val());
                        }
                    });
                    obj['AvgM'] = getAvgM();
                    return obj;
                };
            },

            //Inherit AIPlugInAIBaseConfigForm
            AIPlugInAIConfigForm:function(formId){
                Advantech.Form.IOForm.AIPlugInAIBaseConfigForm.apply(this, arguments);
                var _Self = this;
                var _AlarmModeEmun = Advantech.Profile.AIAlarmModeEmun;
                var _onAverageSettingChanged = null;
                this.setAlarmMdEmun =function(val){
                    _AlarmModeEmun = val;
                };

                this.onAverageSettingChanged = function(x){
                    if(!arguments.length) return _onAverageSettingChanged;
                    _onAverageSettingChanged = x;
                };
                var initialAlarmMode = function($configForm){
                    for(var i = 0; i < _AlarmModeEmun.length; ++i){
                        $configForm.find("#selLAMd").append("<option value="+i+">"+_AlarmModeEmun[i]+"</option>");
                        $configForm.find("#selHAMd").append("<option value="+i+">"+_AlarmModeEmun[i]+"</option>");
                    }
                };
                this.initialForm = function(containerName) {
                    var $configForm = $('<div></div>')
                                        .attr("id", this.getFormId())
                                        .html(
                                            "<div class='form-group'>" +
                                                "<label class='col-sm-3 control-label'>Low Scaling Value</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group'>" +
                                                        "<input id='inpLoS' type='text' class='form-control' value='0'>" +
                                                        '<span class="input-group-addon" style="width: 5px" id="losUnit"></span>'+
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                            "<div class='form-group'>" +
                                                "<label class='col-sm-3 control-label'>High Scaling Value</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<input id='inpHiS' type='text' class='form-control' value='0'>" +
                                                        '<span class="input-group-addon" style="width: 5px" id="hisUnit"></span>'+
                                                    "</div>" +
                                                "</div>" +
                                            "</div>"+
                                            "<div class='form-group' id='physicalMinValue'>" +
                                                "<label class='col-sm-3 control-label'>Physical Min Scaling Value</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<input id='inpLoP' type='text' class='form-control' value='0'>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>"+
                                            "<div class='form-group' id='physicalMaxValue'>" +
                                                "<label class='col-sm-3 control-label'>Physical Max Scaling Value</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<input id='inpHiP' type='text' class='form-control' value='0'>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>"+
                                            /* "<div class='form-group' id='physicalMappingUnit'>" +
                                                "<label class='col-sm-3 control-label'>Mapping Unit</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<input id='inpUni' type='text' class='form-control' value=''>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>"+ */
                                            "<div class='form-group'>" +
                                                "<label class='col-sm-3 control-label'>Enable Low Alarm</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<span class='input-group-addon'>" +
                                                            "<input id='inpEnLA' type='checkbox'>" +
                                                        "</span>" +
                                                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                                                    "</div>" +
                                                 "</div>" +
                                            "</div>" +
                                            "<div class='form-group lowAlarmConfig' hidden>" +
                                                "<label class='col-sm-3 control-label'>Low Alarm Mode</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<select id='selLAMd'class='form-control'>" +
                                                    "</select>"+
                                                "</div>" +
                                            "</div>" +
                                            "<div class='form-group lowAlarmConfig' hidden>" +
                                                "<label class='col-sm-3 control-label'>Low Alarm Value</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<input id='inpLoA' type='text' class='form-control' value='0'>" +
                                                        '<span class="input-group-addon" style="width: 5px" id="loaUnit"></span>'+
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                            "<div class='form-group'>" +
                                                "<label class='col-sm-3 control-label'>Enable High Alarm</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<span class='input-group-addon'>" +
                                                            "<input id='inpEnHA' type='checkbox'>" +
                                                        "</span>" +
                                                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                                                    "</div>" +
                                                 "</div>" +
                                            "</div>" +
                                            "<div class='form-group hiAlarmConfig' hidden>" +
                                                "<label class='col-sm-3 control-label'>High Alarm Mode</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<select id='selHAMd'class='form-control'>" +
                                                    "</select>" +
                                                "</div>" +
                                            "</div>" +
                                            "<div class='form-group hiAlarmConfig' hidden>" +
                                                "<label class='col-sm-3 control-label'>High Alarm Value</label>" +
                                                "<div class='col-sm-8'>" +
                                                    "<div class='input-group' style='min-width: 20px'>" +
                                                        "<input id='inpHiA' type='text' class='form-control' value='0'>" +
                                                        '<span class="input-group-addon" style="width: 5px" id="hiaUnit"></span>'+
                                                    "</div>" +
                                                "</div>" +
                                            "</div>");
                    $configForm.find("#inpEnLA").change(function(){
                        if($(this).prop("checked")){
                            $configForm.find(".lowAlarmConfig").show();
                        }else{
                            $configForm.find(".lowAlarmConfig").hide();
                        }
                    });
                    $configForm.find("#inpEnHA").change(function(){
                        if($(this).prop("checked")){
                            $configForm.find(".hiAlarmConfig").show();
                        }else{
                            $configForm.find(".hiAlarmConfig").hide();
                        }
                    });
                    var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                    var physicalValueSupport = Advantech.Profile.DeviceEmun[module].aiPhysicalValueSupport;
                    if(typeof(physicalValueSupport)!="undefined" && !physicalValueSupport){
                        $configForm.find("#physicalMinValue").hide();
                        $configForm.find("#physicalMaxValue").hide();
                        //$configForm.find("#physicalMappingUnit").hide();
                    }
                    //$configForm.find("#physicalMappingUnit").hide();//for WISE-4610
                    initialAlarmMode($configForm);
                    $("#"+containerName).append($configForm);
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpEn").prop("checked", int(jsonObj.En) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpEnAvg").prop("checked", int(jsonObj.Avg) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpEnLA").prop("checked", int(jsonObj.EnLA) === 1 ? true : false).trigger('change');
                        $("#" + _Self.getFormId() + " #selLAMd").val(jsonObj.LAMd);
                        $("#" + _Self.getFormId() + " #inpEnHA").prop("checked", int(jsonObj.EnHA) === 1 ? true : false).trigger('change');
                        $("#" + _Self.getFormId() + " #selHAMd").val(jsonObj.HAMd);
                        $("#" + _Self.getFormId() + " #inpLoA").val(jsonObj.LoA);
                        $("#" + _Self.getFormId() + " #inpHiA").val(jsonObj.HiA);
                        $("#" + _Self.getFormId() + " #inpLoS").val(jsonObj.LoS);
                        $("#" + _Self.getFormId() + " #inpHiS").val(jsonObj.HiS);
                        $("#" + _Self.getFormId() + " #inpLoP").val(jsonObj.LoP || 0);
                        $("#" + _Self.getFormId() + " #inpHiP").val(jsonObj.HiP || 0);
                        $("#" + _Self.getFormId() + " #inpUni").val(jsonObj.Uni || '');
                        $("#" + _Self.getFormId() + " #losUnit").html(Advantech.Profile.AIRangeInfoEmun[jsonObj.Rng].unit);
                        $("#" + _Self.getFormId() + " #hisUnit").html(Advantech.Profile.AIRangeInfoEmun[jsonObj.Rng].unit);
                        $("#" + _Self.getFormId() + " #loaUnit").html(Advantech.Profile.AIRangeInfoEmun[jsonObj.Rng].unit);
                        $("#" + _Self.getFormId() + " #hiaUnit").html(Advantech.Profile.AIRangeInfoEmun[jsonObj.Rng].unit);
                        if(typeof(jsonObj.Rng)!='undefined' && jsonObj.Rng==480){ //UDI
                            $("#" + _Self.getFormId()).hide();
                        }
                    }catch(e){
                        throw new Error("Setting AI mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },

            DIPlugInConfigFormFactory: function() {
                this.instance = function(md, formId) {
                    //Robert(2016/12/14): remove DI modes and display all configs in original 5 DI modes
                    return new Advantech.Form.IOForm.DIPlugInConfigForm(formId);
                    /*
                    if(md === 0) {
                        return new Advantech.Form.IOForm.DIPlugInDIConfigForm(formId);
                    }else if(md === 1) {
                        return new Advantech.Form.IOForm.DIPlugInCNTConfigForm(formId);
                    }else if(md === 2) {
                        return new Advantech.Form.IOForm.DIPlugInL2HConfigForm(formId);
                    }else if(md === 3) {
                        return new Advantech.Form.IOForm.DIPlugInH2LConfigForm(formId);
                    }else if(md === 4) {
                        return new Advantech.Form.IOForm.DIPlugInFrqConfigForm(formId);
                    }else if(md === 255) {
                        return new Advantech.Form.IOForm.DIPlugInInvalidForm(formId);
                    }else{
                        throw new Error("DIPlugInConfigFormFactory doesn't supported mode:" + md + ".");
                    }
                    */
                };
            },

            //Inherit IOPlugInBaseConfigForm
            DIPlugInConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML =
                        //DI and Counter
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Invert Signal</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpInv' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='well'>"+
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Digital Filter</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFltr' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Min. Low Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFtLo' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon diSignalWidth'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Min. High Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFtHi' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon diSignalWidth'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Counter: Startup Value</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpCntIV' type='number' max='4294967295' min='0' class='form-control lognType isNumericType' value='0'>" +
                        "<span class='input-group-addon' >times</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Counter: Keep Last Value</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpCntKp' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        //frequency related configs
                        "<div class='well diFreConfigs'>"+
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Frequency: Precision</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group'>" +
                        "<select id='selFqP' class='form-control'>" +
                        "<option value ='0'>0.1 Hz</option>" +
                        "<option value ='1'>0.01 Hz</option>" +
                        "</select>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Frequency: Value Reset Time</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFqT' type='number' max='255' min='1' class='form-control isNumericType' value='100' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1 sec</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";//well

                    document.getElementById(containerName).appendChild(configForm);
                    //no frequency setting when IO board is in Low power mode
                    var ioMode = Advantech.Data.ModuleData.getInstance().getIoMode();
                    if(ioMode == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE){
                        $("#" + containerName + " .diFreConfigs").hide();
                        $("#" + _Self.getFormId() + " .diSignalWidth").html("sec");// change unit in Low power mode
                        $("#" + _Self.getFormId() + " #inpFtLo").attr("max", 6);
                        $("#" + _Self.getFormId() + " #inpFtHi").attr("max", 6);
                    }else{
                        $("#" + containerName + " .diFreConfigs").show();
                        $("#" + _Self.getFormId() + " .diSignalWidth").html("0.1ms");// change unit in performance mode
                        $("#" + _Self.getFormId() + " #inpFtLo").attr("max", 65535);
                        $("#" + _Self.getFormId() + " #inpFtHi").attr("max", 65535);
                    }
                };
                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpInv").prop("checked", int(jsonObj.Inv) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpFltr").prop("checked", int(jsonObj.Fltr) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpCntKp").prop("checked", int(jsonObj.CntKp) === 1 ? true : false);
                        if(Advantech.Data.ModuleData.getInstance().getIoMode() == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE){//Low power mode: unit sec
                            $("#" + _Self.getFormId() + " #inpFtLo").val(Math.ceil(Number(jsonObj.FtLo) / 10000));
                            $("#" + _Self.getFormId() + " #inpFtHi").val(Math.ceil(Number(jsonObj.FtHi) / 10000));
                        }else{//Performance mode: unit 0.1ms */
                            $("#" + _Self.getFormId() + " #inpFtLo").val(jsonObj.FtLo);
                            $("#" + _Self.getFormId() + " #inpFtHi").val(jsonObj.FtHi);
                        }
                        $("#" + _Self.getFormId() + " #inpCntIV").val(jsonObj.CntIV);
                        //frequency
						$("#" + _Self.getFormId() + " #selFqP").val(jsonObj.FqP);
                        $("#" + _Self.getFormId() + " #inpFqT").val(jsonObj.FqT);
                    }catch(e){
                        throw new Error("Setting DI form failed at Ch "+ jsonObj.Ch);
                    }
                };
            },
/*
            //Inherit IOPlugInBaseConfigForm
            DIPlugInInvalidForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "";
                }
                this.setForm = function(jsonObj) {
                }
            },

            //Inherit IOPlugInBaseConfigForm
            DIPlugInDIConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Invert Signal</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpInv' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='well'>"+
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Digital Filter</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFltr' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Min. Low Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFtLo' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon' >0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Min. High Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFtHi' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpInv").prop("checked", int(jsonObj.Inv) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpFltr").prop("checked", int(jsonObj.Fltr) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpFtLo").val(jsonObj.FtLo);
                        $("#" + _Self.getFormId() + " #inpFtHi").val(jsonObj.FtHi);
                    }catch(e){
                        throw new Error("Setting DI mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },

            //Inherit IOPlugInBaseConfigForm
            DIPlugInCNTConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Invert Signal</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpInv' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='well'>"+
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Digital Filter</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFltr' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Min. Low Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFtLo' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon' >0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Min. High Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFtHi' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon' >0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Startup Value</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpCntIV' type='number' max='4294967295' min='0' class='form-control lognType isNumericType' value='0'>" +
                        "<span class='input-group-addon' >times</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Keep Last Value</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpCntKp' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                };
                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpInv").prop("checked", int(jsonObj.Inv) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpFltr").prop("checked", int(jsonObj.Fltr) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpCntKp").prop("checked", int(jsonObj.CntKp) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpFtLo").val(jsonObj.FtLo);
                        $("#" + _Self.getFormId() + " #inpFtHi").val(jsonObj.FtHi);
                        $("#" + _Self.getFormId() + " #inpCntIV").val(jsonObj.CntIV);
                    }catch(e){
                        throw new Error("Setting CNT mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },

            //Inherit IOPlugInBaseConfigForm
            DIPlugInL2HConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Invert Signal</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpInv' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                };
                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpInv").prop("checked", int(jsonObj.Inv) === 1 ? true : false);
                    }catch(e){
                        throw new Error("Setting L2H mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },

            //Inherit IOPlugInBaseConfigForm
            DIPlugInH2LConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Invert Signal</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpInv' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                };
                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpInv").prop("checked", int(jsonObj.Inv) === 1 ? true : false);
                    }catch(e){
                        throw new Error("Setting H2L mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },

            //Inherit IOPlugInBaseConfigForm
            DIPlugInFrqConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Precision</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group'>" +
                        "<select id='selFqP' class='form-control'>" +
                        "<option value ='0'>0.1 Hz</option>" +
                        "<option value ='1'>0.01 Hz</option>" +
                        "</select>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Value Reset Time</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpFqT' type='number' max='255' min='1' class='form-control isNumericType' value='100' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1 sec</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                };
                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #selFqP").val(jsonObj.FqP);
                        $("#" + _Self.getFormId() + " #inpFqT").val(jsonObj.FqT);
                    }catch(e){
                        throw new Error("Setting Frq mode parameter failed at Ch "+ jsonObj.Ch);
                    }

                };
            },
*/
            DOPlugInConfigFormFactory: function() {
                this.instance = function(md, formId, profile) {
                    if(md === 0) {
                        return new Advantech.Form.IOForm.DOPlugInDOConfigForm(formId);
                    }else if(md === 1) {
                        return new Advantech.Form.IOForm.DOPlugInPSConfigForm(formId);
                    }else if(md === 2) {
                        return new Advantech.Form.IOForm.DOPlugInL2HConfigForm(formId);
                    }else if(md === 3) {
                        return new Advantech.Form.IOForm.DOPlugInH2LConfigForm(formId);
                    }else if(md === 4) {
                        var form = new Advantech.Form.IOForm.DOPlugInAIAlrDrDOConfigForm(formId);
                        form.setDOMappingChannelEmun(profile.AIn);
                        return form;
                    }else{
                        throw new Error("DOPlugInConfigFormFactory doesn't supported mode:" + md + ".");
                    }
                };
            },

            RelayPlugInConfigFormFactory: function() {
                this.instance = function(md, formId, profile) {
                    if(md === 1) {
                        return new Advantech.Form.IOForm.RelayPlugInPSConfigForm(formId);
                    }
                    else{
                        try{
                            return new Advantech.Form.IOForm.DOPlugInConfigFormFactory().instance(md, formId, profile);
                        }
                        catch(e){
                            throw new Error("RelayPlugInConfigFormFactory doesn't supported mode:" + md + ".");
                        }
                    }
                };
            },

            //Inherit IOPlugInBaseConfigForm
            DOPlugInDOConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>FSV</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFSV' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='True/False' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    document.getElementById(containerName).appendChild(configForm);
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpFSV").prop("checked", int(jsonObj.FSV) === 1 ? true : false);
                    }catch(e){
                        throw new Error("Setting DO mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },
            //Inherit DOPlugInPSConfigForm
            RelayPlugInPSConfigForm: function(formId) {
                Advantech.Form.IOForm.DOPlugInPSConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>FSV</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFSV' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='True/False' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Low Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpPsLo' type='number' max='65535' min='5000' class='form-control isNumericType' value='5000' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>High Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpPsHi' type='number' max='65535' min='5000' class='form-control isNumericType' value='5000' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Output frequency</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input type='number' id='inpOFrq' class='form-control isNumericType' style='min-width: 15px' disabled>" +
                        "<span class='input-group-addon' >HZ</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Duty cycle</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpDuty' type='number' class='form-control isNumericType' style='min-width: 15px' disabled>" +
                        "<span class='input-group-addon'>%</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                    _Self.eventHandle();
                };
            },
            //Inherit IOPlugInBaseConfigForm
            DOPlugInPSConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>FSV</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFSV' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='True/False' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Low Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpPsLo' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>High Signal Width</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpPsHi' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Output frequency</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input type='number' id='inpOFrq' class='form-control isNumericType' style='min-width: 15px' disabled>" +
                        "<span class='input-group-addon' >HZ</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Duty cycle</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpDuty' type='number' class='form-control isNumericType' style='min-width: 15px' disabled>" +
                        "<span class='input-group-addon'>%</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                    _Self.eventHandle();
                };
                this.eventHandle = function() {
                    $("#" + _Self.getFormId() + " #inpPsLo").keyup(function() {
                        countFreqAndDuty();
                    }).change(function() {
                        countFreqAndDuty();
                    });
                    $("#" + _Self.getFormId() + " #inpPsHi").keyup(function() {
                        countFreqAndDuty();
                    }).change(function() {
                        countFreqAndDuty();
                    }).trigger("keyup");
                };
                var isFeasible = function() {
                    var dPulseHigh = parseFloat($("#" + _Self.getFormId() + " #inpPsHi").val());
                    var dPulseLow = parseFloat($("#" + _Self.getFormId() + " #inpPsLo").val());
                    if(!isNaN(dPulseHigh) && !isNaN(dPulseLow) && (dPulseHigh + dPulseLow) > 0)
                        return true;
                    return false;
                };
                var countFreqAndDuty = function() {
                    var dPulseHigh = parseFloat($("#" + _Self.getFormId() + " #inpPsHi").val());
                    var dPulseLow = parseFloat($("#" + _Self.getFormId() + " #inpPsLo").val());
                    if(isFeasible()) {
                        $("#" + _Self.getFormId() + " #inpOFrq").val((10000.0 / (dPulseHigh + dPulseLow)));
                        $("#" + _Self.getFormId() + " #inpDuty").val((100.0 * dPulseHigh / (dPulseHigh + dPulseLow)));
                    }else{
                        $("#" + _Self.getFormId() + " #inpOFrq").val("");
                        $("#" + _Self.getFormId() + " #inpDuty").val("");
                    }
                };
                this.setForm = function(jsonObj) {
                    $("#" + _Self.getFormId() + " #inpFSV").prop("checked", int(jsonObj.FSV) === 1 ? true : false);
                    $("#" + _Self.getFormId() + " #inpPsLo").val(jsonObj.PsLo);
                    $("#" + _Self.getFormId() + " #inpPsHi").val(jsonObj.PsHi).trigger("keyup");
                };
            },
            //Inherit IOPlugInBaseConfigForm
            DOPlugInL2HConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>FSV</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFSV' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='True/False' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Delay Time</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpLDT' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>";


                    document.getElementById(containerName).appendChild(configForm);
                };
                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpFSV").prop("checked", int(jsonObj.FSV) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpLDT").val(jsonObj.LDT);
                    }catch(e){
                        throw new Error("Setting L2H mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },
            //Inherit IOPlugInBaseConfigForm
            DOPlugInH2LConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML = "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>FSV</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<span class='input-group-addon'>" +
                        "<input id='inpFSV' type='checkbox'>" +
                        "</span>" +
                        "<input type='text' class='form-control' value='True/False' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Delay Time</label>" +
                        "<div class='col-lg-8'>" +
                        "<div class='input-group' style='min-width: 20px'>" +
                        "<input id='inpHDT' type='number' max='65535' min='1' class='form-control isNumericType' value='1' style='min-width: 15px'>" +
                        "<span class='input-group-addon'>0.1ms</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    document.getElementById(containerName).appendChild(configForm);
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #inpFSV").prop("checked", int(jsonObj.FSV) === 1 ? true : false);
                        $("#" + _Self.getFormId() + " #inpHDT").val(jsonObj.HDT);
                    }catch(e){
                        throw new Error("Setting H2L mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },
            //Inherit IOPlugInBaseConfigForm
            DOPlugInAIAlrDrDOConfigForm: function(formId) {
                Advantech.Form.IOForm.IOPlugInBaseConfigForm.apply(this, arguments);
                var _Self = this;
                var _DrivedAlarmModeEmun = Advantech.Profile.DODrivedByAIModeEmun;
                var _MappingTotalNumber = 4;
                this.setDOMappingChannelEmun =function(val){
                    _MappingTotalNumber = val;
                };

                var initialDOMappingChannel = function($configForm){
                    for(var i = 0; i < _MappingTotalNumber; ++i){
                        $configForm.find("#selACh").append("<option value="+i+">"+i+"</option>");
                    }
                };
                this.setDrivedByAlramMdEmun =function(val){
                    _DrivedAlarmModeEmun = val;
                };
                var initialDrivedByAlramMode = function($configForm){
                    for(var i = 0; i < _DrivedAlarmModeEmun.length; ++i){
                        $configForm.find("#selAMd").append("<option value="+i+">"+_DrivedAlarmModeEmun[i]+"</option>");
                    }
                };
                this.initialForm = function(containerName) {
                    var configForm = document.createElement('div');
                    configForm.id = this.getFormId();
                    configForm.innerHTML =
                        "<div class='form-group'>" +
                            "<label class='col-sm-3 control-label'>Mapping Channel</label>" +
                            "<div class='col-sm-8'>" +
                                "<select id='selACh' class='form-control'>" +
                                "</select>"+
                            "</div>" +
                        "</div>"+
                        "<div class='form-group'>" +
                            "<label class='col-sm-3 control-label'> Trigger Mode</label>" +
                            "<div class='col-sm-8'>" +
                                "<select id='selAMd' class='form-control'>" +
                                "</select>"+
                            "</div>" +
                        "</div>";
                    initialDOMappingChannel($(configForm));
                    initialDrivedByAlramMode($(configForm));
                    document.getElementById(containerName).appendChild(configForm);
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #selACh").val(jsonObj.ACh);
                        $("#" + _Self.getFormId() + " #selAMd").val(jsonObj.AMd);
                    }catch(e){
                        throw new Error("Setting AI Alarm Driven mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },

            //Inherit IIOConfigChangeObserver
            IOConfigBaseForm: function(formId){
                Advantech.Data.IOData.IIOConfigChangeObserver.apply(this,[]);
                var mFormId = formId;
                var _onSubmitted = null;
                var _onModeChanged = null;
                var _onRangeChanged = null;
                var _onChannelChanged = null;
                var _Self = this;
                var mChannelNumber = 0;
                this.getChannelNumber = function(){
                    return mChannelNumber;
                };
                this.setChannelNumber = function(val){
                    mChannelNumber = val;
                };
                this.onSubmitted = function(x) {
                    if(!arguments.length) return _onSubmitted;
                    _onSubmitted = x;
                };

                this.onModeChanged = function(x) {
                    if(!arguments.length) return _onModeChanged;
                    _onModeChanged = x;
                };
                this.onRangeChanged = function(x) {
                    if(!arguments.length) return _onRangeChanged;
                    _onRangeChanged = x;
                };
                this.onChannelChanged = function(x) {
                    if(!arguments.length) return _onChannelChanged;
                    _onChannelChanged = x;
                };

                this.getFormId = function() {
                    return mFormId;
                };
                this.getPlugInContainer = function() {
                    return $("#" + _Self.getFormId() + " .panel-body")[0];
                };

                this.initialForm = function(containerName, modeArray) {
                    throw new Error("Not implement initialForm");
                };

                this.toJson = function() {
                    var obj = {};
                    $("#" + _Self.getFormId() + " input").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")){
                            var type = this.type;
                            var id = this.id.slice(3);
                            if(type === "checkbox") {
                                obj[id] = (this.checked) ? 1 : 0;
                            }else if(type === "number" || $(this).hasClass("isNumericType")) {
                                if($(this).val() === 'All') {
                                    obj[id] = "All";
                                }else{
                                    if($(this).hasClass('longType')){
                                        obj[id] = parseFloat($(this).val());
                                    }
                                    else{
                                        obj[id] = Number($(this).val());
                                    }
                                }
                            }else{
                                obj[id] = $(this).val();
                            }
                        }
                    });
                    $("#" + _Self.getFormId() + " select").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")){
                            var id = this.id.slice(3);
                            var str = $(this).val();
                            if(str === 'All') {
                                obj[id] = 'All';
                            }else{
                                obj[id] = int(str);
                            }
                        }
                    });
                    var channelName = $("#" + _Self.getFormId() + ' #selCh option:selected').text();
                    if(channelName == "Average"){ //fill En and Rng of average channel since they are hidden
                        obj['En'] = $("#" + _Self.getFormId() + " #inpEn").prop('checked') ? 1 : 0;
                        var range = $("#" + _Self.getFormId() + " #selRng").val();
                        obj['Rng'] = range==null? 65535:Number(range); //65535 when Rng is invalid
                    }
                    return obj;
                };

                this.dataAppended = function(obj, e) {
                    if(e.Type == 'DI' && e.Obj.Md==255){ //skip Invalid DI, AI channel doest not go here
                        // || (e.Type == 'AI' && e.Obj.Rng==480)){ //skip Invalid DI, AI channel
                        mChannelNumber++;
                        return;
                    }
                    $('#' + _Self.getFormId() + " #selCh").append($('<option>', {
                        value: mChannelNumber,
                        text: mChannelNumber
                    }));
                    mChannelNumber++;
                    var selectList = $('#' + _Self.getFormId() + " #selCh option");
                    selectList.sort(function(a, b) {
                        if(a.value === 'All') {
                            return 1;
                        }
                        if(b.value === 'All') {
                                return -1;
                        }
                        a = Number(a.value);
                        b = Number(b.value);
                        return a - b;
                    });
                    $('#' + _Self.getFormId() + " #selCh").html(selectList);
                    $($('#' + _Self.getFormId() + " #selCh option")[0]).prop("selected", "selected");
                };

                this.dataChanged = function(obj, e) {
                    //this.setForm(e.Obj);
                };
                this.dataErrorOccurred = function(obj, e) {
                    if(obj.COMMON_CONFIG_KEY != e.Key){
                        this.setForm(e.Obj);
                    }

                };
                this.dataCleared = function(obj, e) {
                    mChannelNumber = 0;
                    $('#' + _Self.getFormId() + " #selCh").html("");
                    $('#' + _Self.getFormId() + " #selCh").append($('<option>', {
                        value: "All",
                        text: "All"
                    }));
                };
                this.setForm = function(jsonObj) {

                };
            },

            //Inherit IOConfigBaseForm
            DIOConfigBaseForm: function(formId) {
                Advantech.Form.IOForm.IOConfigBaseForm.apply(this, arguments);
                var _Self = this;

                var setMode = function(containerName, mdArray) {
                    if($.isArray(mdArray)) {
                        var ioMode = Advantech.Data.ModuleData.getInstance().getIoMode();
                        $('#' + _Self.getFormId() + " #selMd").html("");
                        for (var i = 0; i < mdArray.length; ++i) {
                            //no frequency setting when IO board is in Low power mode
                            if(ioMode == Advantech.Profile.IoBoardWorkingModeValue.LOW_POWER_MODE && mdArray[i] == "Frequency"){
                                continue;
                            }
                            //Robert(2017/11/09): change again, no DI disable mode Array
                            $('#' + _Self.getFormId() + " #selMd").append($('<option>', {
                                value: i,
                                text: mdArray[i]
                            }));
                            /*
                            //Robert(2017/06/15): PM requests to restore original DI modes display. For DI Disable mode: 255
                            if(containerName == "containerDiCommConfig" && i == mdArray.length - 1)
                            {
                                $('#' + _Self.getFormId() + " #selMd").append($('<option>', {
                                    value: 255,
                                    text: mdArray[i]
                                }));
                            }
                            else
                            {
                                //no frequency setting when IO board is in Low power mode
                                if(ioMode == 1 && mdArray[i] == "Frequency"){
                                    continue;
                                }
                                $('#' + _Self.getFormId() + " #selMd").append($('<option>', {
                                    value: i,
                                    text: mdArray[i]
                                }));
                            }
                            */
                        }
                        $($('#' + _Self.getFormId() + " #selCh option")[0]).prop("selected", "selected");
                    }else{
                        throw new Error("Invalid parameter when setting DIOConfigBaseForm.");
                    }
                };

                this.getPlugInContainer = function() {
                    return $("#" + _Self.getFormId() + " .panel-body")[0];
                };

                this.initialForm = function(containerName, modeArray) {
                    var configForm = document.createElement('div');
                    configForm.className = 'panel panel-default form-horizontal';
                    configForm.id = this.getFormId();
                    if(containerName == "containerDiCommConfig")
                    {
                    //DI
                    configForm.innerHTML =
                        "<div class='panel-heading'>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Channel</label>" +
                        "<div class='col-lg-3'>" +
                        "<div class='input-group'>" +
                        "<select id='selCh'class='form-control'>" +
                        "<option value='All'>All</option>" +
                        "</select>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Tag Name</label>" +
                        "<div class='col-lg-6'>" +
                        "<div class='input-group'>" +
                        "<input type='text' class='form-control' id='inpTag'>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                            "<label class='col-lg-3 control-label'>Mode</label>" +
                            "<div class='col-lg-2'>" +
                                "<div class='input-group'>" +
                                "<select id='selMd'class='form-control'>" +
                                "</select>" +
                                "</div>" +
                            "</div>" +
                            "<h5 class='col-lg-6'>"+
                                "<i class='fa fw-fa  fa-info-circle'> </i> Channel Mode is used for Channel Status Display only."+
                            "</h5>"+
                        "</div>" +
                        "<div class='form-group isChannelOnly'>" +
                            "<label class='col-lg-3 control-label'>Channel Mask</label>" +
                            "<div class='col-lg-6'>" +
                                "<div class='input-group' style='min-width: 20px'>" +
                                    "<span class='input-group-addon'>" +
                                        "<input id='inpEn' type='checkbox'>" +
                                    "</span>" +
                                    "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Refresh</label>" +
                        "<div class='col-lg-6'>" +
                        "<div class='input-group'>" +
                        "<button class='btn btn-info' id='btnRefresh'><i class='fa fa-refresh'></i> Refresh" +
                        "</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='panel-body' id='" + this.getFormId() + "ioConfigPluginContainer'>" +
                        "</div>" +
                        "<div class='panel-footer clearfix'>" +
                        "<div class='pull-right'>" +
                        "<button class='btn btn-success' id='btnSubmit'>" +
                        "<i class='fa fa-check'></i> Submit" +
                        "</button>" +
                        "</div>" +
                        "</div>";
                    }
                    else
                    {
                    //DO
                    configForm.innerHTML =
                        "<div class='panel-heading'>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Channel</label>" +
                        "<div class='col-lg-3'>" +
                        "<div class='input-group'>" +
                        "<select id='selCh'class='form-control'>" +
                        "<option value='All'>All</option>" +
                        "</select>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Tag Name</label>" +
                        "<div class='col-lg-6'>" +
                        "<div class='input-group'>" +
                        "<input type='text' class='form-control' id='inpTag'>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                            "<label class='col-lg-3 control-label'>Mode</label>" +
                            "<div class='col-lg-3'>" +
                                "<div class='input-group'>" +
                                "<select id='selMd'class='form-control'>" +
                                "</select>" +
                                "</div>" +
                            "</div>" +
                            "<h5 class='col-lg-6'>"+
                                "<i class='fa fw-fa  fa-info-circle'> </i> All data will be cleared in the data logger if Channel Mode is changed."+
                            "</h5>"+
                        "</div>" +
                        "<div class='form-group isChannelOnly'>" +
                        "<label class='col-lg-3 control-label'>Channel Mask</label>" +
                            "<div class='col-lg-6'>" +
                                "<div class='input-group' style='min-width: 20px'>" +
                                    "<span class='input-group-addon'>" +
                                        "<input id='inpEn' type='checkbox'>" +
                                    "</span>" +
                                    "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Refresh</label>" +
                        "<div class='col-lg-6'>" +
                        "<div class='input-group'>" +
                        "<button class='btn btn-info' id='btnRefresh'><i class='fa fa-refresh'></i> Refresh" +
                        "</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='panel-body' id='" + this.getFormId() + "ioConfigPluginContainer'>" +
                        "</div>" +
                        "<div class='panel-footer clearfix'>" +
                        "<div class='pull-right'>" +
                        "<button class='btn btn-success' id='btnSubmit'>" +
                        "<i class='fa fa-check'></i> Submit" +
                        "</button>" +
                        "</div>" +
                        "</div>";
                    }
                    document.getElementById(containerName).appendChild(configForm);
                    setMode(containerName, modeArray);
                    eventHandle();
                };

                var eventHandle = function() {
                    $("#" + _Self.getFormId() + " #selCh").change(function() {
                        if($.isFunction(_Self.onChannelChanged())) {
                            _Self.onChannelChanged()(this, {
                                channel: $(this).val()
                            });
                        }
                    });

                    $("#" + _Self.getFormId() + " #selMd").change(function() {
                        if($.isFunction(_Self.onModeChanged())) {
                            _Self.onModeChanged()(this, {
                                mode: $(this).val()
                            });
                        }
                    });

                    $("#" + _Self.getFormId() + " #btnSubmit").click(function() {
                        if($.isFunction(_Self.onSubmitted())) {
                            _Self.onSubmitted()(this, _Self.toJson());
                        }
                    });
                    $("#" + _Self.getFormId() + " #btnRefresh").click(function() {
                        $("#" + _Self.getFormId() + " #selCh").trigger("change");
                    });
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #selCh").val(jsonObj.Ch);
                        $("#" + _Self.getFormId() + " #inpTag").val(jsonObj.Tag);
                        $("#" + _Self.getFormId() + " #selMd").val(jsonObj.Md);
                        //Robert(2017/11/09): use En to check if channel is disabled
                        $("#" + _Self.getFormId() + " #inpEn").prop("checked",Number(jsonObj.En));
                    }catch(e){
                        throw new Error("Setting current mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },
            //Inherit IOConfigBaseForm
            AIOConfigBaseForm: function(formId) {
                Advantech.Form.IOForm.IOConfigBaseForm.apply(this, arguments);
                var _Self = this;

                var setMode = function(mdObj) {
                    $('#' + _Self.getFormId() + " #selRng").html("");
                    for (var prop in mdObj) {
                        if(prop != "65535" && prop != "480"){
                            $('#' + _Self.getFormId() + " #selRng").append($('<option>', {
                                value: prop,
                                text: mdObj[prop]
                            }));
                        }
                    }
                    $($('#' + _Self.getFormId() + " #selCh option")[0]).prop("selected", "selected");
                };

                this.getPlugInContainer = function() {
                    return $("#" + _Self.getFormId() + " .panel-body")[0];
                };

                this.initialForm = function(containerName, mdObj) {
                    var configForm = document.createElement('div');
                    configForm.className = 'panel panel-default form-horizontal';
                    configForm.id = this.getFormId();
                    configForm.innerHTML =
                        "<div class='panel-heading'>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Channel</label>" +
                        "<div class='col-lg-3'>" +
                        "<div class='input-group'>" +
                        "<select id='selCh'class='form-control'>" +
                        "<option value='All'>All</option>" +
                        "</select>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isModuleInternalOnly'>" +
                        "<label class='col-lg-3 control-label'>Tag Name</label>" +
                        "<div class='col-lg-6'>" +
                        "<div class='input-group'>" +
                        "<input type='text' class='form-control' id='inpTag'>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isChannelOnly'>" +
                        "<label class='col-lg-3 control-label'>Range</label>" +
                        "<div class='col-lg-6'>" +
                        "<div class='input-group'>" +
                        "<select id='selRng'class='form-control'>" +
                        "</select>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='form-group isChannelOnly'>" +
                        "<label class='col-lg-3 control-label'>Channel Mask</label>" +
                            "<div class='col-lg-6'>" +
                                "<div class='input-group' style='min-width: 20px'>" +
                                    "<span class='input-group-addon'>" +
                                        "<input id='inpEn' type='checkbox'>" +
                                    "</span>" +
                                    "<input type='text' class='form-control' value='Enabled/Disabled' disabled>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                        "<label class='col-lg-3 control-label'>Refresh</label>" +
                        "<div class='col-lg-6'>" +
                        "<div class='input-group'>" +
                        "<button class='btn btn-info' id='btnRefresh'><i class='fa fa-refresh'></i> Refresh" +
                        "</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='panel-body' id='" + this.getFormId() + "ioConfigPluginContainer'>" +
                        "</div>" +
                        "<div class='panel-footer clearfix'>" +
                        "<div class='pull-right'>" +
                        "<button class='btn btn-success privilege root admin' id='btnSubmit'>" +
                        "<i class='fa fa-check'></i> Submit" +
                        "</button>" +
                        "</div>" +
                        "</div>";

                    document.getElementById(containerName).appendChild(configForm);
                    setMode(mdObj);
                    eventHandle();
                };
                this.dataAppended = function(obj, e) {
                    var optionText, hiddemColumn;

                     if(e.Key == "Avg"){
                        optionText = "Average";
                        hiddemColumn = ".isChannelOnly";
                     }else{
                        optionText = _Self.getChannelNumber();
                        hiddemColumn = "";
                     }
                    if(obj.COMMON_CONFIG_KEY != e.Key){
                        if(e.Obj.Rng == 480){//hide UDI channel option
                            this.setChannelNumber(_Self.getChannelNumber()+1);
                            return;
                        }else{
                            $('#' + _Self.getFormId() + " #selCh").append($('<option>', {
                                value: _Self.getChannelNumber(),
                                "data-hidden":hiddemColumn,
                                text: optionText
                            }));
                        }
                        this.setChannelNumber(_Self.getChannelNumber()+1);
                        var selectList = $('#' + _Self.getFormId() + " #selCh option");
                        selectList.sort(function(a, b) {
                            if(a.value === 'All') {
                                    return 1;
                            }
                            if(b.value === 'All') {
                                    return -1;
                            }
                            a = Number(a.value);
                            b = Number(b.value);
                            return a - b;
                        });
                        $('#' + _Self.getFormId() + " #selCh").html(selectList);
                        //$($('#' + _Self.getFormId() + " #selCh option")[0]).prop("selected", "selected");
                    }
                };

                var eventHandle = function() {
                    $("#" + _Self.getFormId() + " #selCh").change(function() {
                        if($.isFunction(_Self.onChannelChanged())) {
                            _Self.onChannelChanged()(this, {
                                channel: $(this).val()
                            });
                        }
                    });
                    $("#" + _Self.getFormId() + " #selRng").change(function() {
                        //if($.isFunction(_Self.onModeChanged())) {
                            //_Self.onModeChanged()(this, {
                        if($.isFunction(_Self.onRangeChanged())) {
                            _Self.onRangeChanged()(this, {
                                range: $(this).val()
                            });
                        }
                    });
                    $("#" + _Self.getFormId() + " #btnSubmit").click(function() {
                        if($.isFunction(_Self.onSubmitted())) {
                            _Self.onSubmitted()(this, _Self.toJson());
                        }
                    });
                    $("#" + _Self.getFormId() + " #btnRefresh").click(function() {
                        $("#" + _Self.getFormId() + " #selCh").trigger("change");
                    });
                };

                this.setForm = function(jsonObj) {
                    try{
                        $("#" + _Self.getFormId() + " #selCh").val(jsonObj.Ch);
                        $("#" + _Self.getFormId() + " #inpEn").prop("checked",Number(jsonObj.En));
                        $("#" + _Self.getFormId() + " #inpTag").val(jsonObj.Tag);
                        $("#" + _Self.getFormId() + " #selRng").val(jsonObj.Rng);
                    }catch(e){
                        throw new Error("Setting current mode parameter failed at Ch "+ jsonObj.Ch);
                    }
                };
            },

            //Inherit IIOConfigChangeObserver
            IOConfigBaseOverviewTable: function(tableId) {
                Advantech.Data.IOData.IIOConfigChangeObserver.apply(this,[]);
                var mTableId = tableId;
                var _onRowClicked = null;
                var _Self = this;
                var _RowName;
                var _ModeTypeEmun = [];
                var mChannelNumber = 0;

                this.getChannelNumber =function(){
                    return mChannelNumber;
                };
                this.addChannelNumber =function(){
                    mChannelNumber++;
                };
                this.setRowName = function(val) {
                    _RowName = val;
                };
                this.setModeTypeEmun = function(val) {
                    _ModeTypeEmun = val;
                };
                this.getModeTypeEmun = function(val) {
                    return _ModeTypeEmun;
                };
                this.getRowName = function() {
                    return _RowName;
                };
                this.onRowClicked = function(x) {
                    if(!arguments.length) return _onRowClicked;
                    _onRowClicked = x;
                };
                this.getTableId = function() {
                    return mTableId;
                };
                this.initialTable = function(containerName) {
                    throw Error("Not implement initialTable")
                };
                this.dataCleared = function(obj, e) {
                    this.clearDataTable();
                };
                this.dataAppended = function(obj, e) {
                    if(e.Key != obj.COMMON_CONFIG_KEY){
                        this.addChannelNumber();
                        appendRowToDataTable(e.Obj);
                    }
                };
                this.dataChanged = function(obj, e) {
                    if(e.isChanged) {
                        setTable(e.Obj);
                    }
                };
                this.dataErrorOccurred = function(obj, e) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Value invalid<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>"+e.Msg+" at Channel:"+e.Key+".<h5>");
                    if(e.Key != obj.COMMON_CONFIG_KEY){
                        $($("#" + _Self.getTableId() + " tbody tr")[e.Key]).trigger("click");
                    }
                };
                this.clearDataTable = function() {
                    mChannelNumber = 0;
                    $("#" + _Self.getTableId() + " tbody tr").remove();
                };
                this.getTag = function(channel) {
                    var rows = $("#" + _Self.getTableId() + " #" + _Self.getRowName() + channel);
                    if(rows.length > 0) {
                        return JSON.parse(rows[0].getAttribute("data-tag"));
                    }else{
                        throw new Error("The channel isn't exist in Overview Table.");
                    }
                };
                var setTable = function(jsonObj) {
                    var row = $("#" + _Self.getTableId() + " #" + _Self.getRowName() + jsonObj.Ch)[0];
                    if(row != undefined) {
                        if(row.cells){
                            $(row.cells[0]).html(jsonObj.Ch);
                            $(row.cells[1]).html(jsonObj.Tag);
                            //Robert(2017/11/09): use En to check if channel is disabled
                            if(jsonObj.En == 0)
                                $(row.cells[2]).html("****");
                            else
                                 $(row.cells[2]).html( _Self.getModeTypeEmun()[jsonObj.Md]);
/*
                            //Robert(2017/06/15): PM requests to restore original DI modes display. For DI Disable mode: 255
                            if(mTableId == 'diConfigOverviewTable'){
                                var DIMd;
                                if(jsonObj.Md == 255)
                                    DIMd = 5; //value of DI disable mode
                                else
                                    DIMd = jsonObj.Md;
                                $(row.cells[2]).html( _Self.getModeTypeEmun()[DIMd]);//[jsonObj.Md]
                            }else{
                                $(row.cells[2]).html( _Self.getModeTypeEmun()[jsonObj.Md]);
                            }
*/
                            //Robert(2016/12/14): remove DI modes and display all values in original 5 DI modes
                            /*if(mTableId == 'diConfigOverviewTable'){
                                $(row.cells[2]).hide();
                            }*/
                            $(row.cells[3]).html(getParameter(jsonObj));
                            row.setAttribute("data-tag", JSON.stringify(jsonObj));
                        }
                    }
                };

                var appendRowToDataTable = function(jsonObj) {
                    var row = document.createElement('tr');
                    if(/*(mTableId=='diConfigOverviewTable' && jsonObj.Md == 255) ||*/
                        (mTableId=='aiConfigOverviewTable' && jsonObj.Rng == 65535)){
                        row.setAttribute("style", "display:none");//hide channel when DI or AI channel is invalid
                    }
                    row.id = _Self.getRowName() + jsonObj.Ch;
                    row.setAttribute("data-tag", JSON.stringify(jsonObj));

                    for (var i = 0; i < 4; ++i) {
                        var cell = row.insertCell(i);
                        if(i == 1){
                            cell.className='isModuleInternalOnly';
                        }
                    }
                    $("#" + _Self.getTableId() + " tbody").append(row);
                    setTable(jsonObj);
                    $("#" + _Self.getTableId() + " #" + _Self.getRowName() + jsonObj.Ch).click(function() {
                        if($.isFunction(_Self.onRowClicked())) {
                            _Self.onRowClicked()(this, {
                                config: _Self.getTag(jsonObj.Ch),
                                channel: int(jsonObj.Ch)
                            })
                        }
                        /* $("html,body").animate({
                            scrollTop: 0
                        }, 900); */
                    });
                };

                var getParameter = function(jsonObj) {
                    var str = "";
                    for (var prop in jsonObj) {
                        if(prop !== "Ch" && prop !== "Tag" && prop !== "Md") {
                            str += prop + " = " + jsonObj[prop] + ", "
                        }
                    }
                    str = str.slice(0, str.length - 2);
                    return str;
                };
            },

            //Inherit IOConfigBaseOverviewTable
            AIOConfigBaseOverviewTable: function(tableId) {
                Advantech.Form.IOForm.IOConfigBaseOverviewTable.apply(this, arguments);
                var _Self = this;
                this.initialTable = function(containerName) {
                    var diTable = document.createElement('div');
                    diTable.className = 'table-responsive';
                    diTable.id = this.getTableId();
                    diTable.innerHTML = "<table class='table table-bordered table-hover table-striped'>" +
                        "<thead>" +
                        "<tr>" +
                        "<td>Channel</td>" +
                        "<td class='isModuleInternalOnly'>Tag Name</td>" +
                        "<td>Range</td>" +
                        "<td>Parameter</td>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>";
                    document.getElementById(containerName).appendChild(diTable);
                };
                this.dataAppended = function(obj, e) {
                    if(e.Key != obj.COMMON_CONFIG_KEY){
                        this.addChannelNumber();
                        appendRowToDataTable(e.Obj, e.Key);
                    }
                };
                this.dataChanged = function(obj, e) {
                    if(e.isChanged) {
                        setTable(e.Obj);
                    }
                };
                var setTable = function(jsonObj, key) {
                    var row = $("#" + _Self.getTableId() + " #" + _Self.getRowName() + jsonObj.Ch)[0];
                    if(row != undefined) {
                        if(row.cells){
                            $(row.cells[0]).html(key);
                            $(row.cells[1]).html(jsonObj.Tag);
                            $(row.cells[2]).html(_Self.getModeTypeEmun()[jsonObj.Rng]);
                            $(row.cells[3]).html(getParameter(jsonObj));
                            row.setAttribute("data-tag", JSON.stringify(jsonObj));
                        }
                    }
                };
                var appendRowToDataTable = function(jsonObj, key) {
                    if(jsonObj.Rng == 480){//hide UDI channel
                        return;
                    }
                    var row = document.createElement('tr');
                    row.id = _Self.getRowName() + jsonObj.Ch;
                    row.setAttribute("data-tag", JSON.stringify(jsonObj));

                    for (var i = 0; i < 4; ++i) {
                        var cell = row.insertCell(i);
                        if( i == 1){
                            $(cell).addClass('isModuleInternalOnly');
                        }
                    }
                    $("#" + _Self.getTableId() + " tbody").append(row);
                    setTable(jsonObj, key);
                    $("#" + _Self.getTableId() + " #" + _Self.getRowName() + jsonObj.Ch).click(function() {
                        if($.isFunction(_Self.onRowClicked())) {
                            _Self.onRowClicked()(this, {
                                config: _Self.getTag(jsonObj.Ch),
                                channel: int(jsonObj.Ch)
                            })
                        }
                        /* $("html,body").animate({
                            scrollTop: 0
                        }, 900); */
                    });
                };
                var getParameter = function(jsonObj) {
                    var str = "";
                    for (var prop in jsonObj) {
                        if(prop !== "Ch" && prop !== "Tag" && prop !== "Rng") {
                            var range = jsonObj.Rng;
                            if(range!=480)//not UDI
                                str += prop + " = " + jsonObj[prop] + ", ";
                            else{//UDI
                                if(prop == "En")
                                    str += prop + " = " + jsonObj[prop] + ", ";
                            }
                        }
                    }
                    str = str.slice(0, str.length - 2);
                    return str;
                };
            },

            //Inherit AIOConfigBaseOverviewTable
            AIConfigOverviewTable: function(tableId) {
                Advantech.Form.IOForm.AIOConfigBaseOverviewTable.apply(this, arguments);
                var _Self = this;
                (function(argument) {
                    _Self.setRowName("aiConfigRow");
                    _Self.setModeTypeEmun(Advantech.Profile.AIRangeEmun);
                })();
            },

            DIOConfigOverviewTableFactory: function(OverviewTableId) {
                this.instance = function(Type, tableId) {
                    if(Type === 'DI') {
                        return Advantech.Form.IOForm.DIConfigOverviewTable(tableId);
                    }else if(Type === 'DO') {
                        return Advantech.Form.IOForm.DOConfigOverviewTable(tableId);
                    }
                };
            },

            //Inherit IOConfigBaseOverviewTable
            DIOConfigBaseOverviewTable: function(tableId) {
                Advantech.Form.IOForm.IOConfigBaseOverviewTable.apply(this, arguments);

                this.initialTable = function(containerName) {
                    var diTable = document.createElement('div');
                    diTable.className = 'table-responsive';
                    diTable.id = this.getTableId();
                    diTable.innerHTML = "<table class='table table-bordered table-hover table-striped'>" +
                        "<thead>" +
                        "<tr>" +
                        "<td>Channel</td>" +
                        "<td class='isModuleInternalOnly'>Tag Name</td>" +
                        "<td>Mode</td>" +
                        "<td>Parameter</td>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>";
                    document.getElementById(containerName).appendChild(diTable);
                };
            },

            //Inherit DIOConfigBaseOverviewTable
            DIConfigOverviewTable: function(tableId) {
                Advantech.Form.IOForm.DIOConfigBaseOverviewTable.apply(this, arguments);
                var _Self = this;
                (function(argument) {
                    _Self.setRowName("diConfigRow");
                    _Self.setModeTypeEmun(Advantech.Profile.DIModeTypeEmun);
                })();
            },

            //Inherit DIOConfigBaseOverviewTable
            DOConfigOverviewTable: function(tableId) {
                Advantech.Form.IOForm.DIOConfigBaseOverviewTable.apply(this, arguments);
                var _Self = this;
                (function(argument) {
                    _Self.setRowName("doConfigRow");
                    _Self.setModeTypeEmun(Advantech.Profile.DOModeTypeEmun);
                })();
            },

            IOStatusPage:function(pageId, channelNumber) {
                var mPageId = pageId;
                var mStatusTb = null;
                var mCtrlList = null;
                var mTrend = null;
                var mChannelNumber = channelNumber;
                var _onPageChanged = null;
                var _onConfigChanged = null;
                var _onValueChanged = null;
                var mOverviewTable = null;
                var mConfigBaseForm = null;
                var mConfigController = null;
                var _ModeRangeEmun = null;

                this.getModeRangeEmun = function(){
                    return _ModeRangeEmun;
                };
                this.setModeRangeEmun = function(val){
                    _ModeRangeEmun = val
                };

                this.getStatusTb = function(){
                    return mStatusTb;
                };
                this.setStatusTb = function(val){
                    mStatusTb = val;
                };
                this.getTrend = function(){
                    return mTrend;
                };
                this.setTrend = function(val){
                    mTrend = val;
                };

                this.getCtrlList = function(){
                    return mCtrlList;
                };
                this.setCtrlList = function(val){
                    mCtrlList = val;
                };

                this.getCtrlList = function(){
                    return mCtrlList;
                };
                this.setCtrlList = function(val){
                    mCtrlList = val;
                };
                this.getOverviewTable = function(){
                    return mOverviewTable;
                };
                this.setOverviewTable = function(val){
                    mOverviewTable = val;
                };
                this.getConfigBaseForm = function(){
                    return mConfigBaseForm;
                };
                this.setConfigBaseForm = function(val){
                    mConfigBaseForm = val;
                };
                this.getConfigController = function(){
                    return mConfigController;
                };
                this.setConfigController = function(val){
                    mConfigController = val;
                };
                this.getPageId = function() {
                    return mPageId;
                };
                this.getChannelNumber = function() {
                    return mChannelNumber;
                };

                this.getPageHandle = function() {
                    return $("#" + this.getPageId()).get();
                };

                this.onPageChanged = function(x) {
                    if(!arguments.length){
                        return _onPageChanged;
                    }
                    _onPageChanged = x;
                };
                this.onConfigChanged = function(x) {
                    if(!arguments.length){
                        return  _onConfigChanged;
                    }
                    _onConfigChanged = x;
                };
                this.onValueChanged = function(x) {
                    if(!arguments.length){
                        return _onValueChanged;
                    }
                    _onValueChanged = x;
                };
                this.setValues = function(valuessJson, isInitial) {
                    throw new Error("Not Implement function setValues(valuessJson, isInitial)");
                };
                this.updateTrend = function(valuesJson) {
                    throw new Error("Not Implement function updateTrend(valuesJson)");
                };
                this.initialConfigs = function(configsJson) {
                    throw new Error("Not Implement function initialConfigs(configsJson)");
                }
                this.setConfigs = function(configsJson) {
                    throw new Error("Not Implement function setConfigs(configsJson)");
                };
                this.initialCurrentPage = function() {
                    $($("#" + this.getPageId() + " .nav-tabs .active a")[0]).trigger("shown.bs.tab");
                };
            },
            AIStatusPollingStrategy:function(aiStatusPage){
                var statusPage = aiStatusPage;
                this.getStatusPage = function(){
                    return statusPage;
                };
                this.setValue = function(idx, aiValobj){
                    throw new Error("Not Implement setValue Function");
                }
            },
            //Inherit form AIStatusPollingStrategy
            AIStatusPollingGenValStrategy:function(aiStatusPage){
                Advantech.Form.IOForm.AIStatusPollingStrategy.apply(this,[aiStatusPage]);
                this.setValue = function(idx, aiValobj){
                    this.getStatusPage().getStatusTb().setRow(idx, aiValobj);
                }
            },
            //Inherit form AIStatusPollingStrategy
            AIStatusPollingMaxValStrategy:function(aiStatusPage){
                Advantech.Form.IOForm.AIStatusPollingStrategy.apply(this,[aiStatusPage]);
                this.setValue = function(idx, aiValobj){
                    this.getStatusPage().getMaxStatusTb().setRow(idx, aiValobj);
                }
            },
            //Inherit form AIStatusPollingStrategy
            AIStatusPollingMinValStrategy:function(aiStatusPage){
                Advantech.Form.IOForm.AIStatusPollingStrategy.apply(this,[aiStatusPage]);
                this.setValue = function(idx, aiValobj){
                    this.getStatusPage().getMinStatusTb().setRow(idx, aiValobj);
                }
            },
            //Inherit IOStatusPage
            AIStatusPage: function(pageId, channelNumber) {
                Advantech.Form.IOForm.IOStatusPage.apply(this, arguments);
                var mCommonConfigPlugInForm = null;
                var _Self = this;
                var mMinMaxBar = null;
                var mMaxStatusTb = null;
                var mMinStatusTb = null;
                var mPollingValStrategy = new Advantech.Form.IOForm.AIStatusPollingGenValStrategy(_Self);
                this.getPollingValueStrategy = function(val){
                    return mPollingValStrategy;
                };
                this.setPollingValueStrategy = function(val){
                    mPollingValStrategy = val;
                };
                this.getMinStatusTb = function(){
                    return mMinStatusTb;
                };
                this.setMinStatusTb = function(val){
                    mMinStatusTb = val;
                };
                this.getMaxStatusTb = function(){
                    return mMaxStatusTb;
                };
                this.setMaxStatusTb = function(val){
                    mMaxStatusTb = val;
                };
                this.getBarChart = function(){
                    return mMinMaxBar;
                };
                this.setBarChart = function(val){
                    mMinMaxBar = val;
                };
                this.getCommonConfigPlugInForm = function(){
                    return mCommonConfigPlugInForm;
                };
                this.setCommonConfigPlugInForm = function(val){
                    mCommonConfigPlugInForm = val
                };
                this.createPage = function(containerName, profile) {
                    var diPageContainer = document.createElement('div');
                    diPageContainer.className = 'col-lg-12';
                    diPageContainer.id = this.getPageId();
                    diPageContainer.innerHTML = "<div class='row'>"+
                                                    "<div class='tab-pane'>"+
                                                        "<ul class='nav nav-tabs nav-justified' role='tablist'>" +
                                                            "<li class='active'>" +
                                                                "<a href='#aiStatus' role='tab' data-toggle='tab'>Status</a>" +
                                                            "</li>" +
                                                            "<li>" +
                                                                "<a href='#aiConfig' role='tab' data-toggle='tab'>Configuration</a>" +
                                                            "</li>" +
                                                            /*"<li>" +
                                                                "<a href='#aiTrend' role='tab' data-toggle='tab'>Trend</a>" +
                                                            "</li>" +*/
                                                        "</ul>" +
                                                        "<div class='tab-content'>" +
                                                            "<div class='tab-pane active' id='aiStatus'>" +
                                                                "<div class='row'>" +
                                                                    "<div class='col-lg-12'>" +
                                                                        "<div class='panel panel-default'>" +
                                                                            "<div class='panel-heading'>" +
                                                                                "<h2 class='panel-title' id='aiStatusInfom'>Status</h2>" +
                                                                            "</div>" +
                                                                            "<div class='panel-body'>" +
                                                                                '<div class="col-lg-12">'+
                                                                                    "<ul class='nav nav-tabs nav-justified' role='tablist'>"+
                                                                                        '<li class="active">'+
                                                                                            '<a href="#aiGeneralVal" data-toggle="tab">Current</a>'+
                                                                                        '</li>'+
                                                                                        '<li>'+
                                                                                            '<a href="#aiMaxVal" data-toggle="tab">Max</a>'+
                                                                                        '</li>'+
                                                                                        '<li>'+
                                                                                            '<a href="#aiMinVal" data-toggle="tab">Min</a>'+
                                                                                        '</li>'+
                                                                                    '</ul>'+
                                                                                    '<div class="tab-content">'+
                                                                                        '<div class="tab-pane active" id="aiGeneralVal">'+
                                                                                            "<div id='containerAiStatusTable'>"+
                                                                                            "</div>" +
                                                                                        "</div>" +//<!-- /.tab-pane -->
                                                                                        '<div class="tab-pane" id="aiMaxVal">'+
                                                                                            "<div id='containerAiMaxStatusTable'>"+
                                                                                            "</div>" +
                                                                                        "</div>" +//<!-- /.tab-pane -->
                                                                                        '<div class="tab-pane" id="aiMinVal">'+
                                                                                            "<div id='containerAiMinStatusTable'>"+
                                                                                            "</div>" +
                                                                                        "</div>" +//<!-- /.tab-pane -->
                                                                                    "</div>" +//<!-- /.tab-content -->
                                                                                "</div>"+ //<!-- /.col-lg-12 -->
                                                                            "</div>" + //<!--./panel-body-->
                                                                        "</div>" + //<!--./panel-->
                                                                    "</div>" + //<!-- /.col-lg-12 -->
                                                                "</div>" +
                                                            "</div>" +
                                                            "<div class='tab-pane' id='aiConfig'>" +
                                                                "<div class='panel panel-default'>" +
                                                                    "<div class='panel-heading'>"+
                                                                        "<h2 class='panel-title' id='aiConfigInfom'>Configuration</h2>"+
                                                                    "</div>"+
                                                                    "<div class='panel-body'>"+
                                                                        '<div class="col-lg-12">'+
                                                                            "<ul class='nav nav-tabs nav-justified' role='tablist'>"+
                                                                                '<li>'+
                                                                                    '<a href="#tabCommConfig" data-toggle="tab">Common Settings</a>'+
                                                                                '</li>'+
                                                                                '<li class="active">'+
                                                                                    '<a href="#tabChConfig" data-toggle="tab">Channel Settings</a>'+
                                                                                '</li>'+
                                                                            '</ul>'+
                                                                            '<div class="tab-content">'+
                                                                                '<div class="tab-pane" id="tabCommConfig">'+
                                                                                    "<div id='containerAiCommConfig'>"+
                                                                                    "</div>" +
                                                                                "</div>" +
                                                                                '<div class="tab-pane active" id="tabChConfig">'+
                                                                                    "<div id='containerAiChConfig'>" +
                                                                                    "</div>" +
                                                                                    "<p>" +
                                                                                        "<h4 class='page-header'>Overview</h4>" +
                                                                                    "</p>" +
                                                                                    "<div id='containerAiOverview'>" +
                                                                                    "</div>"+
                                                                                "</div>" +
                                                                            "</div>" +
                                                                        "</div>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                            "</div>" +
                                                            "<div class='tab-pane' id='aiTrend'>" +
                                                                "<div class='panel panel-default'>" +
                                                                    "<div class='panel-heading'>" +
                                                                        "<h2 class='panel-title'>AI Trend</h2>" +
                                                                    "</div>" +
                                                                    "<div class='panel-body'>" +
                                                                        "<div class='col-lg-8'>"+
                                                                            "<div class='panel panel-primary'>" +
                                                                                "<div class='panel-heading'>" +
                                                                                    "<h2 class='panel-title'><i class='fa fa-fw fa-line-chart'></i> Value Plot</h2>" +
                                                                                "</div>" +
                                                                                "<div class='panel-body' id='containerAiTrend'>" +
                                                                                "</div>" + //<!--./panel-body-->
                                                                            "</div>" + //<!--./panel-->
                                                                        "</div>"+
                                                                        "<div class='col-lg-4'>"+
                                                                            "<div class='panel panel-green'>" +
                                                                                "<div class='panel-heading'>" +
                                                                                    "<h2 class='panel-title'><i class='fa fa-fw fa-bar-chart-o'></i> Max & Min Bar</h2>" +
                                                                                "</div>" +
                                                                                "<div class='panel-body' id='containerAiBar'>" +
                                                                                "</div>" + //<!--./panel-body-->
                                                                            "</div>" + //<!--./panel-->
                                                                        "</div>"+
                                                                    "</div>"+
                                                                "</div>" + //<!--./panel-body-->
                                                            "</div>" +
                                                        "</div>"+
                                                    "</div>"+
                                                "</div>";
                    try{
                        var element = document.getElementById(containerName).appendChild(diPageContainer);
                        this.setupPage(profile);
                        this.handleEvent();
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };
                this.handleEvent = function() {
                    var _Self = this;
                    $('#' + this.getPageId() + ' a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                        var type = e.target.hash.slice(3);
                        if($.isFunction(_Self.onPageChanged())) {
                            _Self.onPageChanged()(this, {
                                type: type
                            });
                        }
                    });
                    _Self.getMaxStatusTb().onResetSubmitted(function(obj, e){
                        var AiValArray = [e];
                        if($.isFunction(_Self.onValueChanged())) {
                            _Self.onValueChanged()(obj, {
                                AIVal: AiValArray
                            });
                        }
                    });
                    _Self.getMinStatusTb().onResetSubmitted(function(obj, e){
                        var AiValArray = [e];
                        if($.isFunction(_Self.onValueChanged())) {
                            _Self.onValueChanged()(obj, {
                                AIVal: AiValArray
                            });
                        }
                    });
                    _Self.getStatusTb().onResetSubmitted(function(obj, e){
                        var AiValArray = [e];
                        if($.isFunction(_Self.onValueChanged())) {
                            _Self.onValueChanged()(obj, {
                                AIVal: AiValArray
                            });
                        }
                    });
                    _Self.getConfigController().onSubmitted(function(obj, e) {
                        if($.isFunction(_Self.onConfigChanged())) {
                            _Self.onConfigChanged()(obj, e);
                        }
                    });
                }

                this.getNumLedDecimal = function(mode, configJson) {
                    if(mode == 4) {
                        if(parseInt(configJson.FqP) == 1)
                            return 2;
                        else
                            return 1;
                    }else
                        return 0;
                };

                this.updateValueTables = function(mode, channel, valueJson) {
                    var iMode = parseInt(mode);
                    switch (iMode) {
                        case 0:
                            var value = (valueJson.Val == 1) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value);
                            break;
                        case 1:
                            var value = (valueJson.OvLch == 1) ? true : false;
                            var isCnting = (valueJson.Cnting == 1) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value, valueJson.Val, isCnting);
                            break;
                        case 2:
                        case 3:
                            var value = (valueJson.OvLch == 1) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value);
                            break;
                        default:
                            var value = (valueJson.Val > 0) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value, valueJson.Val);
                            break;
                    }
                    _Self.getStatusTb().setIOMode(channel, Advantech.Profile.DIModeTypeEmun[iMode]);
                };

                this.updateRemoteDatas = function(channel, valueJson) {
                    _Self.getCtrlList()[channel].setRemotePartByAdvJson(valueJson);
                    _Self.getStatusTb().setIOMode(channel, Advantech.Profile.DIModeTypeEmun[valueJson.Md]);
                };

                this.setupPage = function(profile) {
                    var deviceObj = Advantech.Profile.DeviceEmun[profile.Id];
                    var configDataModule = deviceObj.aiDataModuleFactory.apply(this,[]);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun aiDataModuleFactory");
                    }
                    var rngEmun = deviceObj.aiRangeEmun;
                    var smplingEmun = deviceObj["aiSamplingSpeedEmun"]||Advantech.Profile.AISamplingSpeedEmun;
                    var isSupportAIBurnout = deviceObj["isSupportAIBurnout"]||false;
                    _Self.setModeRangeEmun(rngEmun);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun aiRangeEmun");
                    }
                    _Self.setCommonConfigPlugInForm(new Advantech.Form.IOForm.AIPlugInAICommonConfigForm("aiConfigCommForm"));
                    _Self.getCommonConfigPlugInForm().setRangeEmun(rngEmun);
                    _Self.getCommonConfigPlugInForm().setSamplingEmun(smplingEmun);
                    _Self.setOverviewTable(new Advantech.Form.IOForm.AIConfigOverviewTable("aiConfigOverviewTable"));
                    _Self.getOverviewTable().setModeTypeEmun(rngEmun);
                    _Self.setConfigBaseForm(new Advantech.Form.IOForm.AIOConfigBaseForm("aiConfigBaseForm"));
                    _Self.getOverviewTable().initialTable("containerAiOverview");
                    _Self.getCommonConfigPlugInForm().initialForm("containerAiCommConfig");
                    _Self.getConfigBaseForm().initialForm("containerAiChConfig", rngEmun);
                    _Self.setConfigController(new Advantech.Form.IOForm.AIConfigController( _Self.getConfigBaseForm(),
                                                                                            _Self.getOverviewTable(),
                                                                                            new Advantech.Data.IOData.AITypeConfigDataModule(new configDataModule(), rngEmun),
                                                                                            profile,
                                                                                            _Self.getCommonConfigPlugInForm()));
                    _Self.getConfigController().initialController();
                    isSupportAIBurnout?$("#aiConfigCommForm .burnoutType").show():$("#aiConfigCommForm .burnoutType").hide();
                    var aiDispalyFactory = new Advantech.Form.IOForm.AiDispalyStrategyFactory();
                    _Self.setStatusTb(new Advantech.Form.IOForm.IOStatusTableFactory().instance("AIStatusTable", this.getChannelNumber(), "AI"));
                    _Self.setMaxStatusTb(new Advantech.Form.IOForm.IOStatusTableFactory().instance("AIMaxStatusTable", this.getChannelNumber(), "AI"));
                    _Self.setMinStatusTb(new Advantech.Form.IOForm.IOStatusTableFactory().instance("AIMinStatusTable", this.getChannelNumber(), "AI"));
                    _Self.getStatusTb().initialTable("containerAiStatusTable", aiDispalyFactory.instance(Advantech.Profile.AIValueDisplayEmun.VALUE, _Self.getStatusTb()));
                    _Self.getMaxStatusTb().initialTable("containerAiMaxStatusTable", aiDispalyFactory.instance(Advantech.Profile.AIValueDisplayEmun.MAX, _Self.getMaxStatusTb()));
                    _Self.getMinStatusTb().initialTable("containerAiMinStatusTable", aiDispalyFactory.instance(Advantech.Profile.AIValueDisplayEmun.MIN, _Self.getMinStatusTb()));
                    _Self.getStatusTb().setRangeEmun(rngEmun);
                    _Self.getMaxStatusTb().setRangeEmun(rngEmun);
                    _Self.getMinStatusTb().setRangeEmun(rngEmun);
                    var chartSize = (this.getChannelNumber() * 40);
                    if(chartSize < 400){
                        chartSize = 400;
                    }
                    $("#" + this.getPageId() + " #containerAiTrend").height(chartSize);
                    $("#" + this.getPageId() + " #containerAiBar").height(chartSize);
                    _Self.setTrend(new Advantech.Control.TrendChart("containerAiTrend"));
                    _Self.setBarChart(new Advantech.Control.BarChart("containerAiBar"));
                    var colors = Advantech.Profile.TrendColorEmun;

                    for (var i = 0; i < this.getChannelNumber(); ++i) {
                        var infoDIO = new Advantech.Control.plotInfo("AI_Ch" + i.toString(), colors[i]);
                        _Self.getTrend().appendPlot(infoDIO);
                        _Self.getBarChart().appendData("AI_Ch"+i, 0,"Max");
                        _Self.getBarChart().appendData("AI_Ch"+i, 0,"Min");
                    }
					var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                    if(typeof(Advantech.Profile.DeviceEmun[module].AiTrendChartPrecisionFormat) != "undefined"){
                        _Self.getTrend().createChart("Step", "Value", d3.format('d'), d3.format(Advantech.Profile.DeviceEmun[module].AiTrendChartPrecisionFormat));
                        _Self.getBarChart().createChart();
                        _Self.getBarChart().changeYAxisFormat(d3.format(Advantech.Profile.DeviceEmun[module].AiTrendChartPrecisionFormat));
                    }else{
                        _Self.getTrend().createChart("Step", "Value", d3.format('d'), d3.format(',.2f'));
                        _Self.getBarChart().createChart();
                    }
                };
                this.clearChart = function() {
                    _Self.getTrend().clearPlot();
                };
                this.setValues = function(valuessJson, isInitial) {
                    var valuesArray = valuessJson.AIVal;
                    var bAllAiClosed = true;
                    if(valuesArray) {
                        var statuses = [];
                        var avgCh = _Self.getChannelNumber();
                        for(var i = 0; i < valuesArray.length; ++i) {
                            var idx = valuesArray[i].Ch;
                            if(avgCh == idx){
                                idx = _Self.getStatusTb().AVGERAGE_TAG;
                            }
                            _Self.getPollingValueStrategy().setValue(idx, valuesArray[i]);
                            //this.updateRemoteDatas(idx, valuesArray[i]);
							var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                            if(typeof(Advantech.Profile.DeviceEmun[module].isSupportUniversalInput)!='undefined'){
                                _Self.updateChannelSelectDisplayStatus(idx, valuesArray[i]);
                            }
                            if(valuesArray[i].Rng != 480 && valuesArray[i].Rng != 65535)
                                bAllAiClosed = false;
                        }
                        if(bAllAiClosed){
                            $('#' + this.getPageId() + ' #aiStatusInfom').html("<h4><i class='fa fw-fa fa-info-circle'></i> No AI channel available.Please add AI channel in UI Setting Tab.</h4>");
                            $('#' + this.getPageId() + ' #aiConfigInfom').html("<h4><i class='fa fw-fa fa-info-circle'></i> No AI channel available.Please add AI channel in UI Setting Tab.</h4>");
                            $('#' + this.getPageId() + ' #selCh').hide();
                            $('#' + this.getPageId() + ' #btnSubmit').hide();
                        }else{
                            $('#' + this.getPageId() + ' #aiStatusInfom').html("Status");
                            $('#' + this.getPageId() + ' #aiConfigInfom').html("Configuration");
                            $('#' + this.getPageId() + ' #selCh').show();
                            $('#' + this.getPageId() + ' #btnSubmit').show();
                        }
                    }else{
                        throw new Error("The AI Value JSON data Format Error.");
                    }
                };
/*
                this.updateTrend = function(valuesJson) {
                    var valuesArray = valuesJson.AIVal;
                    if(valuesArray) {
                        var statuses = [];
                        for (var i = 0; i < valuesArray.length; ++i) {
                            if(valuesArray[i].Ch < this.getChannelNumber()){
                                var status = {};
                                var range = valuesArray[i].Rng;
                                var unit = (Advantech.Profile.AIRangeInfoEmun[valuesArray[i].Rng]==undefined)?"":Advantech.Profile.AIRangeInfoEmun[valuesArray[i].Rng].unit;
                                //var specialFlag = Advantech.Profile.DeviceEmun[module].AiStatusEgUnitSpecialFlag;
                                var key = "AI_Ch"+valuesArray[i].Ch;
                                var max, min;
                                // if(typeof(specialFlag) != 'undefined'){ //for WISE-4012E AI
                                //    min = valuesArray[i].LEgF/1000.0;
                                //    max = valuesArray[i].HEgF/1000.0;
                                //    status.val = valuesArray[i].EgF/1000.0;
                                //}else{
                                    if(unit=="V" || unit=="A"){
                                        min = valuesArray[i].LEgF/1000.0;
                                        max = valuesArray[i].HEgF/1000.0;
                                        status.val = valuesArray[i].EgF/1000.0;
                                    }else{//mV or mA
                                        min = valuesArray[i].LEgF;
                                        max = valuesArray[i].HEgF;
                                        status.val = valuesArray[i].EgF;
                                    }
                                //}
                                status.invalid = (valuesArray[i].En == 0 || valuesArray[i].Evt > 0 || range=='480') ? true : false;
                                statuses.push(status);
                                _Self.getBarChart().appendData(key, max, "Max");
                                _Self.getBarChart().appendData(key, min, "Min");
                            }
                        }
                        _Self.getTrend().appendData(statuses);
                        _Self.getBarChart().refreshChart();
                    }else{
                        throw new Error("Invalid AIVal JSON Data");
                    }
                };
*/
                this.initialConfigs = function(configsJson, commonObj) {
                    var configArray = configsJson.AICfg;
                    _Self.getConfigController().clearData();
                    if(configArray) {
                        for (var i = 0; i < configArray.length; ++i) {
                            //if(i< this.getChannelNumber()){
                            if(i == configArray.length-1){
                                configArray[i].IsAvg = true;
                            }else{
                                configArray[i].IsAvg = false;
                            }
                            _Self.getConfigController().appendData(configArray[i]);
                            //}
                            //var md = int(configArray[i].Md);
                            //_Self.getCtrlList()[configArray[i].Ch].setDIRemoteStatus(md, this.getNumLedDecimal(md, configArray[i]));
                        }
                        $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + "0").trigger("click");
                        _Self.getConfigController().appendData(commonObj, configsJson);
                        _Self.setConfigs(commonObj);
                    }else{
                        throw new Error("The AI Config JSON data Format Error.");
                    }
                };
                this.setConfigs = function(configsJson) {
                    if(configsJson.AICfg != undefined) {
                        var configArray = configsJson.AICfg;
                        for (var i = 0; i < configArray.length; ++i) {
                            if(Number(configArray[i].Ch)<= this.getChannelNumber()){
                                _Self.getConfigController().setData(configArray[i]);
                            }
                        }
                    }else if(configsJson["AvgM"]  != undefined){
                        _Self.getConfigController().setData(configsJson);
                    }else{
                        throw new Error("The AI Config JSON data Format Error.");
                    }
                };
                this.triggerSelectFirstChannel = function(tabId, triggerChannelSelect){
					var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                    if(triggerChannelSelect && typeof(Advantech.Profile.DeviceEmun[module].isSupportUniversalInput)!='undefined'){
                        //$($('#' + _Self.getConfigBaseForm().getFormId() + " #selCh option")[0]).attr("selected", "selected").trigger("change");//default select first channel
                        $($('#' + _Self.getConfigBaseForm().getFormId() + " #selCh option")[0]).prop("selected", "selected").trigger("change");//default select first channel
                        var tabTableId = 'AIStatusTable';//default page
                        if(tabId == 'MaxVal')
                            tabTableId = 'AIMaxStatusTable';
                        else if(tabId == 'MinVal')
                            tabTableId = 'AIMinStatusTable';

                        var selArray = $('#'+ tabTableId + ' #selCh option');
                        for(var i=0; i< selArray.length; i++){
                            var elem = $(selArray[i]);
                            if(elem[0].style.display!="none"){ //select first visible option
                                elem.prop("selected", "selected").trigger("change");
                                break;
                            }
                        }
                    }
                };
                this.updateChannelSelectDisplayStatus = function(idx, jsonObj){
                    var statusTab = ['AIStatusTable', 'AIMaxStatusTable', 'AIMinStatusTable'];
                    for(var i=0; i< statusTab.length; i++){
                        var tab = statusTab[i];
                        var currentSel = $('#'+ tab + ' #selCh').val();
                        var idxSelect = $('#'+tab + ' #selCh option[value="'+ idx+'"]');
                        if(jsonObj.Rng == 480){ //hide UDI channel
                            if(idx == currentSel){
                                idxSelect.removeAttr("selected");
                            }
                            idxSelect.hide();
                        }else{
                            idxSelect.show();
                        }
                    }
                }
            },
            //Inherit IOStatusPage
            DIStatusPage: function(pageId, channelNumber) {
                Advantech.Form.IOForm.IOStatusPage.apply(this, arguments);
                var IOCfg = new Advantech.Data.IOData.IOConfigData();
                var _Self = this;

                this.createPage = function(containerName, profile) {
                    var diPageContainer = document.createElement('div');
                    diPageContainer.className = 'col-lg-12';
                    diPageContainer.id = this.getPageId();
                    diPageContainer.innerHTML = "<div class='row'><div class='tab-pane'><ul class='nav nav-tabs nav-justified' role='tablist'>" +
                        "<li class='active'>" +
                        "<a href='#diStatus' role='tab' data-toggle='tab'>Status</a>" +
                        "</li>" +
                        "<li>" +
                        "<a href='#diConfig' role='tab' data-toggle='tab'>Configuration</a>" +
                        "</li>" +
                        /*"<li>" +
                        "<a href='#diTrend' role='tab' data-toggle='tab'>Trend</a>" +
                        "</li>" +*/
                        "</ul>" +
                        "<div class='tab-content'>" +
                        "<div class='tab-pane active' id='diStatus'>" +
                        "<div class='row'>" +
                        "<div class='col-lg-12'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title' id='diStatusInfom'>Status</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerDiStatusTable'>" +
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" + //<!-- /.col-lg-6 -->
                        "</div>" +
                        "</div>" +
                        "<div class='tab-pane' id='diConfig'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title' id='diConfigInfom'>Configuration</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerDiConfig'>" +
                            "<div id='containerDiCommConfig'>" +
                            "</div>" +
                            "<p>" +
                            "<h4 class='page-header'>Overview</h4>" +
                            "</p>" +
                            "<div id='containerDiOverview'>" +
                            "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" +
                        "<div class='tab-pane' id='diTrend'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title'>DI Trend</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerDiTrend'>" +
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" +
                        "</div></div></div>";
                    try{
                        var element = document.getElementById(containerName).appendChild(diPageContainer);
                        this.setupPage(profile);
                        this.handleEvent();
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };
                this.handleEvent = function() {
                    var _Self = this;
                    $('#' + this.getPageId() + ' a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                        var type = e.target.hash.slice(3);
                        if($.isFunction(_Self.onPageChanged())) {
                            _Self.onPageChanged()(this, {
                                type: type
                            });
                        }
                    });
                    for (var i = 0; i < _Self.getCtrlList().length; ++i) {
                        /*_Self.getCtrlList()[i].onLatchCleared(function(obj, e) {
                            var idx = this.mId.slice(3);
                            var DiValArray = [];
                            e.Ch = parseInt(idx, 10);
                            DiValArray.push(e);
                            if($.isFunction(_Self.onValueChanged())) {
                                _Self.onValueChanged()(obj, {
                                    DIVal: DiValArray
                                });
                            }
                        });*/
                        _Self.getCtrlList()[i].onOverflowCleared(function(obj, e) {
                            var idx = this.mId.slice(3);
                            var DiValArray = [];
                            e.Ch = parseInt(idx, 10);
                            DiValArray.push(e);
                            if($.isFunction(_Self.onValueChanged())) {
                                _Self.onValueChanged()(obj, {
                                    DIVal: DiValArray
                                });
                            }
                        });
                        _Self.getCtrlList()[i].onH2lLatchCleared(function(obj, e) {
                            var idx = this.mId.slice(3);
                            var DiValArray = [];
                            e.Ch = parseInt(idx, 10);
                            DiValArray.push(e);
                            if($.isFunction(_Self.onValueChanged())) {
                                _Self.onValueChanged()(obj, {
                                    DIVal: DiValArray
                                });
                            }
                        });
                        _Self.getCtrlList()[i].onL2hLatchCleared(function(obj, e) {
                            var idx = this.mId.slice(3);
                            var DiValArray = [];
                            e.Ch = parseInt(idx, 10);
                            DiValArray.push(e);
                            if($.isFunction(_Self.onValueChanged())) {
                                _Self.onValueChanged()(obj, {
                                    DIVal: DiValArray
                                });
                            }
                        });
                        _Self.getCtrlList()[i].onCntRested(function(obj, e) {
                            var idx = this.mId.slice(3);
                            var DiValArray = [];
                            e.Ch = parseInt(idx, 10);
                            DiValArray.push(e);
                            if($.isFunction(_Self.onValueChanged())) {
                                _Self.onValueChanged()(obj, {
                                    DIVal: DiValArray
                                });
                            }
                        });
                        _Self.getCtrlList()[i].onChangeCntStatus(function(obj, e) {
                            var idx = this.mId.slice(3);
                            var DiValArray = [];
                            e.Ch = parseInt(idx, 10);
                            DiValArray.push(e);
                            if($.isFunction(_Self.onValueChanged())) {
                                _Self.onValueChanged()(obj, {
                                    DIVal: DiValArray
                                });
                            }
                        });
                    }

                    _Self.getConfigController().onSubmitted(function(obj, e) {
                        if($.isFunction(_Self.onConfigChanged())) {
                            _Self.onConfigChanged()(obj, e);
                        }
                    });
                }

                this.getNumLedDecimal = function(mode, configJson) {
                    if(mode == 4) {
                        if(parseInt(configJson.FqP) == 1)
                            return 2;
                        else
                            return 1;
                    }else
                        return 0;
                }

                this.updateValueTables = function(mode, channel, valueJson) {
                    var iMode = parseInt(mode);
                    var IOCfgData = IOCfg.getConfig();
                    _Self.getCtrlList()[channel].setValue(valueJson, IOCfgData[channel]);
                    /*
                    switch (iMode) {
                        case 0:
                            var value = (valueJson.Val == 1) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value);
                            break;
                        case 1:
                            var value = (valueJson.OvLch == 1) ? true : false;
                            var isCnting = (valueJson.Cnting == 1) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value, valueJson.Val, isCnting);
                            break;
                        case 2:
                        case 3:
                            var value = (valueJson.OvLch == 1) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value);
                            break;
                        default:
                            var value = (valueJson.Val > 0) ? true : false;
                            _Self.getCtrlList()[channel].setValue(value, valueJson.Val);
                            break;
                    }*/
                    _Self.getStatusTb().setIOMode(channel, _Self.getModeRangeEmun()[iMode]);
                };

                this.updateRemoteDatas = function(channel, valueJson) {
                    var IOConfigData = IOCfg.getConfig();
                    _Self.getCtrlList()[channel].setRemotePartByAdvJson(valueJson, IOConfigData[channel]);
                    //_Self.getCtrlList()[channel].setRemotePartByAdvJson(valueJson);
                    _Self.getStatusTb().setIOMode(channel, _Self.getModeRangeEmun()[valueJson.Md]);
                };

                this.setupPage = function(profile) {
                    var deviceObj = Advantech.Profile.DeviceEmun[profile.Id];
                    var configDataModule = deviceObj.diDataModuleFactory.apply(this,[]);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun diDataModuleFactory");
                    }
                    var mdEmun = deviceObj.diModeEmun;
                    _Self.setModeRangeEmun(mdEmun);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun diModeEmun");
                    }
                    _Self.setOverviewTable(new Advantech.Form.IOForm.DIConfigOverviewTable("diConfigOverviewTable"));
                    _Self.getOverviewTable().setModeTypeEmun(mdEmun);
                    _Self.setConfigBaseForm(new Advantech.Form.IOForm.DIOConfigBaseForm("diConfigBaseForm"));
                    _Self.getOverviewTable().initialTable("containerDiOverview");
                    _Self.getConfigBaseForm().initialForm("containerDiCommConfig", mdEmun);
                    _Self.setConfigController(new Advantech.Form.IOForm.DIConfigController(_Self.getConfigBaseForm(),
                        _Self.getOverviewTable(),
                        new Advantech.Data.IOData.IOTypeConfigDataModule(new configDataModule(), mdEmun),
                        profile));
                    _Self.getConfigController().initialController();
                    _Self.setStatusTb(new Advantech.Form.IOForm.IOStatusTableFactory().instance("DIStatusTable", _Self.getChannelNumber(), "DI"));
                    _Self.getStatusTb().initialTable("containerDiStatusTable");
                    _Self.setCtrlList(_Self.getStatusTb().getControlsHandle());

                    /*
                    //remove trend
                    $("#" + _Self.getPageId() + " #containerDiTrend").height((_Self.getChannelNumber() * 50));
                    if($("#" + _Self.getPageId() + " #containerDiTrend").height() < 400) {
                        $("#" + _Self.getPageId() + " #containerDiTrend").height(400);
                    }
                    _Self.setTrend(new Advantech.Control.TrendDigitalChart("containerDiTrend"));

                    var colors =Advantech.Profile.TrendColorEmun;

                    for (var i = 0; i < this.getChannelNumber(); ++i) {
                        var infoDIO = new Advantech.Control.plotInfo("DI_Ch" + i.toString(), colors[i]);
                        _Self.getTrend().appendPlot(infoDIO);
                    }
                    _Self.getTrend().createChart("Step", "Bool", d3.format('d'), d3.format(',.2f'));
                    */
                };
                this.clearChart = function() {
                    _Self.getTrend().clearPlot();
                };
                this.setValues = function(valuessJson, isInitial) {
                    try{
                        var bAllDiClosed = true;
                        var valuesArray = valuessJson.DIVal;
                        if(valuesArray) {
                            var statuses = [];
                            for (var i = 0; i < valuesArray.length; ++i) {
                                var idx = valuesArray[i].Ch;
                                var md = parseInt(valuesArray[i].Md, 10);
                                (isInitial === true) ? this.updateValueTables(md, idx, valuesArray[i]) : this.updateRemoteDatas(idx, valuesArray[i]);
                                //Robert(2017/11/09): use En to check if channel is disabled
                                if(valuesArray[i].En == 0)//channel disabled
                                    _Self.getStatusTb().ChannelRowDisplayStatus(i, false);
                                else{
                                    _Self.getStatusTb().ChannelRowDisplayStatus(i, true);
                                    bAllDiClosed = false;
                                }
                            }
                            if(bAllDiClosed){
                                //Robert(2017/06/15): PM requests to restore original DI modes display. For DI Disable mode: 255
                                $('#' + pageId + ' #diStatusInfom').html("<h4><i class='fa fw-fa fa-info-circle'></i> No DI channel enabled. Please change DI channel Mask in DI Configuration.</h4>");
                                /*
                                $('#' + pageId + ' #diConfigInfom').html("<h4><i class='fa fw-fa fa-info-circle'></i> No DI channel available.Please add DI channel in DI Setting Tab.</h4>");
                                $('#' + pageId + ' #selCh').hide();
                                $('#' + pageId + ' #btnSubmit').hide();
                                */
                            }else{
                                $('#' + pageId + ' #diStatusInfom').html("Status");
                                $('#' + pageId + ' #diConfigInfom').html("Configuration");
                                $('#' + pageId + ' #selCh').show();
                                $('#' + pageId + ' #btnSubmit').show();
                            }
                        }else{
                            throw new Error("The DI Value JSON data Format Error.");
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Setting DI Value Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Setting DI value failed with error:"+e.message+"<h5>");
                        //throw new Error("Setting DI value failed");
                    }
                };
/*
                this.updateTrend = function(valuesJson) {
                    try{
                        var valuesArray = valuesJson.DIVal;
                        if(valuesArray) {
                            var statuses = [];
                            for (var i = 0; i < valuesArray.length; ++i) {
                                var status = {};
                                status.val = (valuesArray[i].Stat == 1) ? true : false;
                                status.invalid = (int(valuesArray[i].Md) !== 1 && int(valuesArray[i].Md) !== 4 && int(valuesArray[i].Md) !== 255) ? false : true;
                                statuses.push(status);
                            }
                            _Self.getTrend().appendData(statuses);
                        }else{
                            throw new Error("Invalid DOVal JSON Data");
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>DI Trend Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Setting DI trend value failed with error:"+e.message+"<h5>");
                        //throw new Error("Setting DI trend value failed");
                    }
                };
*/
                this.initialConfigs = function(configsJson) {
                    try{
                        IOCfg.setConfig(configsJson.DICfg);
                        var configArray = configsJson.DICfg;
                        _Self.getConfigController().clearData();
                        if(configArray) {
                            for (var i = 0; i < configArray.length; ++i) {
                                _Self.getConfigController().appendData(configArray[i]);
                                //Robert(2017/06/15): PM requests to restore original DI modes display
                                var md = int(configArray[i].Md);
                                _Self.getCtrlList()[configArray[i].Ch].setDIRemoteStatus(md, this.getNumLedDecimal(md, configArray[i]));
                            }
                            $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + "0").trigger("click");
                        }else{
                            throw new Error("The DI Config JSON data Format Error.");
                        }
                    }catch(e){
                        console.log("DIStatusPage Error: " + e);
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Setting DI Config Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Initial DI configuration parameter failed with error:"+e.message+"<h5>");
                        //throw new Error("Initial DI configuration parameter failed");
                    }
                };
                this.setConfigs = function(configsJson) {
                    try{
                        var configArray = configsJson.DICfg;
                        if(configArray) {
                            for (var i = 0; i < configArray.length; ++i) {
                                _Self.getConfigController().setData(configArray[i]);
                                //Robert(2017/06/15): PM requests to restore original DI modes display
                                var md = int(configArray[i].Md);
                                _Self.getCtrlList()[configArray[i].Ch].setDIRemoteStatus(md, this.getNumLedDecimal(md, configArray[i]));
                            }
                        }else{
                            throw new Error("The DI Config JSON data Format Error.");
                        }
                        IOCfg.setConfig(configsJson.DICfg);
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Setting DI Config Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Setting DI configuration parameter failed with error:"+e.message+"<h5>");
                        //throw new Error("Setting DI configuration parameter failed");
                    }
                };
                this.triggerSelectFirstChannel = function(tabId, triggerChannelSelect){
                    if(triggerChannelSelect)
                        $($('#' + _Self.getConfigBaseForm().getFormId() + " #selCh option")[0]).prop("selected", "selected").trigger("change");//default select first channel
                };
            },
            //Inherit IOStatusPage
            DOStatusPage: function(pageId, channelNumber) {
                Advantech.Form.IOForm.IOStatusPage.apply(this, arguments);
                var _Self = this;
                this.createPage = function(containerName, profile) {
                    var doPageContainer = document.createElement('div');
                    doPageContainer.className = 'col-lg-12';
                    doPageContainer.id = this.getPageId();
                    doPageContainer.innerHTML = "<div class='row'><div class='tab-pane'><ul class='nav nav-tabs nav-justified' role='tablist'>" +
                        "<li class='active'>" +
                        "<a href='#doStatus' role='tab' data-toggle='tab'>Status</a>" +
                        "</li>" +
                        "<li>" +
                        "<a href='#doConfig' role='tab' data-toggle='tab'>Configuration</a>" +
                        "</li>" +
                        /*"<li>" +
                        "<a href='#doTrend' role='tab' data-toggle='tab'>Trend</a>" +
                        "</li>" +*/
                        "</ul>" +
                        "<div class='tab-content'>" +
                        "<div class='tab-pane active' id='doStatus'>" +
                        "<div class='row'>" +
                        "<div class='col-lg-12'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title' id='doStatusInfom'>Status</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerDoStatusTable'>" +
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" + //<!-- /.col-lg-6 -->
                        "</div>" +
                        "</div>" +
                        "<div class='tab-pane' id='doConfig'>" +
                            "<div class='panel panel-default'>" +
                                "<div class='panel-heading'>" +
                                    "<h2 class='panel-title'>Configuration</h2>" +
                                "</div>" +
                                "<div class='panel-body'>" +
                                    "<div id='containerDoCommConfig'>" +
                                    "</div>" +
                                    "<p>" +
                                        "<h4 class='page-header'>Overview</h4>" +
                                    "</p>" +
                                    "<div id='containerDoOverview'>" +
                                    "</div>" +
                                "</div>" + //<!--./panel-body-->
                            "</div>" + //<!--./panel-->
                        "</div>" +
                        "<div class='tab-pane' id='doTrend'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title'>DO Trend</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerDoTrend'>" +
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" +
                        "</div></div></div>";
                    try{
                        var element = document.getElementById(containerName).appendChild(doPageContainer);
                        this.setupPage(profile);
                        this.handleEvent();
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };
                this.handleEvent = function() {
                    $('#' + this.getPageId() + ' a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                        var type = e.target.hash.slice(3);
                        if($.isFunction(_Self.onPageChanged())) {
                            _Self.onPageChanged()(this, {
                                type: type
                            });
                        }
                    });
                    for (var i = 0; i < _Self.getCtrlList().length; ++i) {
                        (function(idx) {
                            _Self.getCtrlList()[idx].onSwitchChanged(function(obj, e) {
                                var value = (e.val) ? 1 : 0;
                                var md = int(_Self.getOverviewTable().getTag(idx).Md);
                                if($.isFunction(_Self.onValueChanged())) {
                                    _Self.onValueChanged()(this, {
                                        DOVal: [_Self.getCtrlList()[idx].getDoValueJson(idx, md, value)]
                                    });
                                }
                            });
                            _Self.getCtrlList()[idx].onStartButtonClicked(function(obj, e) {
                                var DOVal = [];
                                DOVal.push(e);
                                DOVal[0].Ch = idx;
                                if($.isFunction(_Self.onValueChanged())) {
                                    _Self.onValueChanged()(this, {
                                        DOVal: DOVal
                                    });
                                }
                            });
                            _Self.getCtrlList()[idx].onStopButtonClicked(function(obj, e) {
                                var DOVal = [];
                                DOVal.push(e);
                                DOVal[0].Ch = idx;
                                if($.isFunction(_Self.onValueChanged())) {
                                    _Self.onValueChanged()(this, {
                                        DOVal: DOVal
                                    });
                                }
                            });
                        })(i);
                    }
                    _Self.getConfigController().onSubmitted(function(obj, e) {
                        if($.isFunction(_Self.onConfigChanged())) {
                            _Self.onConfigChanged()(obj, e);
                        }
                    });
                };

                this.updateValueTables = function(mode, channel, valueJson) {
                    var iMode = parseInt(mode, 10);
                    var value = (parseInt(valueJson.Stat, 10) === 1) ? true : false;
                    var valuePulse = 0;
                    if(iMode === 1) {
                        valuePulse = (valueJson.PsCtn == 1) ? 0 : valueJson.Val;
                        _Self.getCtrlList()[channel].setMode(valueJson.PsCtn, valuePulse);
                    }
                    _Self.getCtrlList()[channel].setValue(value, valuePulse);
                    _Self.getStatusTb().setIOMode(channel, _Self.getModeRangeEmun()[iMode]);
                };

                this.updateRemoteDatas = function(channel, valueJson) {
                    _Self.getCtrlList()[channel].setRemotePartByAdvJson(valueJson);
                    _Self.getStatusTb().setIOMode(channel, _Self.getModeRangeEmun()[valueJson.Md]);

                };

                this.setupPage = function(profile) {
                    var deviceObj = Advantech.Profile.DeviceEmun[profile.Id];
                    var configDataModule = deviceObj.doDataModuleFactory.apply(this,[]);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun doDataModuleFactory");
                    }
                    var mdEmun = deviceObj.doModeEmun;
                    _Self.setModeRangeEmun(mdEmun);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun doModeEmun");
                    }
                    _Self.setOverviewTable(new Advantech.Form.IOForm.DOConfigOverviewTable("doConfigOverviewTable"));
                    _Self.getOverviewTable().setModeTypeEmun(mdEmun);
                    _Self.setConfigBaseForm(new Advantech.Form.IOForm.DIOConfigBaseForm("doConfigBaseForm"));
                    _Self.setStatusTb(new Advantech.Form.IOForm.IOStatusTableFactory().instance("DOStatusTable", this.getChannelNumber(), "DO"));
                    _Self.getOverviewTable().initialTable("containerDoOverview");
                    _Self.getConfigBaseForm().initialForm("containerDoCommConfig", mdEmun);
                    var dataModel = new Advantech.Data.IOData.IOTypeConfigDataModule(new configDataModule(), mdEmun);
                    _Self.setConfigController(new Advantech.Form.IOForm.DOConfigController(_Self.getConfigBaseForm(),
                                                                                            _Self.getOverviewTable(),
                                                                                            dataModel,
                                                                                            profile));
                    _Self.getConfigController().initialController();
                    _Self.getStatusTb().initialTable("containerDoStatusTable");
                    _Self.setCtrlList(_Self.getStatusTb().getControlsHandle());
                    var TrendHeight = $("#" + this.getPageId() + " #containerDoStatusTable").height();
                    $("#" + this.getPageId() + " #containerDoTrend").height(this.getChannelNumber() * 50);
                    if($("#" + this.getPageId() + " #containerDoTrend").height() < 400) {
                        $("#" + this.getPageId() + " #containerDoTrend").height(400);
                    }
                    _Self.setTrend(new Advantech.Control.TrendDigitalChart("containerDoTrend"));

                    var colors = Advantech.Profile.TrendColorEmun;

                    for (var i = 0; i < this.getChannelNumber(); ++i) {
                        var infoDIO = new Advantech.Control.plotInfo("DO_Ch" + i.toString(), colors[i]);
                        _Self.getTrend().appendPlot(infoDIO);
                    }
                    _Self.getTrend().createChart("Step", "Bool", d3.format('d'), d3.format(',.2f'));
                };
                this.clearChart = function() {
                    _Self.getTrend().clearPlot();
                };

                this.setValues = function(valuesJson, isInitial) {
                    try{
                        var bAllDoClosed = true;
                        var valuesArray = valuesJson.DOVal;
                        if(valuesArray) {
                            var statuses = [];
                            for (var i = 0; i < valuesArray.length; ++i) {
                                var idx = parseInt(valuesArray[i].Ch, 10);
                                var md = parseInt(valuesArray[i].Md, 10);
                                (isInitial === true) ? this.updateValueTables(md, idx, valuesArray[i]): this.updateRemoteDatas(idx, valuesArray[i]);
                                //Robert(2017/11/09): use En to check if channel is disabled
                                if(valuesArray[i].En == 0)//channel disabled
                                    _Self.getStatusTb().ChannelRowDisplayStatus(i, false);
                                else {
                                    _Self.getStatusTb().ChannelRowDisplayStatus(i, true);
                                    bAllDoClosed = false;
                                }
                            }

                            //Robert(2017/11/09): use En to check if channel is disabled
                            if(bAllDoClosed){
                                $('#' + pageId + ' #doStatusInfom').html("<h4><i class='fa fw-fa fa-info-circle'></i> No DO channel enabled. Please change DO channel Mode in DO Configuration.</h4>");
                            }else{
                                $('#' + pageId + ' #doStatusInfom').html("Status");
                            }
                        }else{
                            throw new Error("Invalid DOVal JSON Data");
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Setting DO Value Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Setting DO value failed with error:"+e.message+"<h5>");
                        //throw new Error("Setting DO values failed");
                    }
                };
/*
                this.updateTrend = function(valuesJson) {
                    try{
                        var valuesArray = valuesJson.DOVal;
                        if(valuesArray) {
                            var statuses = [];
                            for (var i = 0; i < valuesArray.length; ++i) {
                                var status = {};
                                status.val = (valuesArray[i].Stat == 1) ? true : false;
                                status.invalid = (Number(valuesArray[i].Md) !== 1) ? false : true;
                                statuses.push(status);
                            }
                            _Self.getTrend().appendData(statuses);
                        }else{
                            throw new Error("Invalid DOVal JSON Data");
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>DO Trend Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Setting DO trend failed with error:"+e.message+"<h5>");
                        //throw new Error("Setting DO trend values failed");
                    }

                };
*/
                this.initialConfigs = function(configsJson) {
                    try{
                        var configArray = configsJson.DOCfg;
                        _Self.getConfigController().clearData();
                        if(configArray) {
                            for (var i = 0; i < configArray.length; ++i) {
                                _Self.getConfigController().appendData(configArray[i]);
                                _Self.getCtrlList()[configArray[i].Ch].setDORemoteStatus(int(configArray[i].Md));
                            }
                            $("#" + _Self.getOverviewTable().getTableId() + " #" + _Self.getOverviewTable().getRowName() + "0").trigger("click");
                        }else{
                            throw new Error("The DO Config JSON data Format Error.");
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Setting DO Config Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Initial DO configuration parameter failed with error:"+e.message+"<h5>");
                        //throw new Error("Initial DO configuration parameter failed");
                    }
                };
                this.setConfigs = function(configsJson) {
                    try{
                        var configArray = configsJson.DOCfg;
                        if(configArray) {
                            for (var i = 0; i < configArray.length; ++i) {
                                _Self.getConfigController().setData(configArray[i]);
                                _Self.getCtrlList()[configArray[i].Ch].setDORemoteStatus(int(configArray[i].Md));
                            }
                        }else{
                            throw new Error("The DO Config JSON data Format Error.");
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Setting DO Config Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Setting DO configuration parameter failed with error:"+e.message+"<h5>");
                        //throw new Error("Setting DO configuration parameter failed");
                    }
                };
            },
            //Inherit DOStatusPage
            RelayStatusPage: function(pageId, channelNumber) {
                Advantech.Form.IOForm.DOStatusPage.apply(this, arguments);
                var _Self = this;
                this.handleEvent = function() {
                    $('#' + this.getPageId() + ' a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                        var type = e.target.hash.slice(6);
                        if($.isFunction(_Self.onPageChanged())) {
                            _Self.onPageChanged()(this, {
                                type: type
                            });
                        }
                    });
                    for (var i = 0; i < _Self.getCtrlList().length; ++i) {
                        (function(idx) {
                            _Self.getCtrlList()[idx].onSwitchChanged(function(obj, e) {
                                var value = (e.val) ? 1 : 0;
                                var md = int(_Self.getOverviewTable().getTag(idx).Md);
                                if($.isFunction(_Self.onValueChanged())) {
                                    _Self.onValueChanged()(this, {
                                        DOVal: [_Self.getCtrlList()[idx].getDoValueJson(idx, md, value)]
                                    });
                                }
                            });
                            _Self.getCtrlList()[idx].onStartButtonClicked(function(obj, e) {
                                var DOVal = [];
                                DOVal.push(e);
                                DOVal[0].Ch = idx;
                                if($.isFunction(_Self.onValueChanged())) {
                                    _Self.onValueChanged()(this, {
                                        DOVal: DOVal
                                    });
                                }
                            });
                            _Self.getCtrlList()[idx].onStopButtonClicked(function(obj, e) {
                                var DOVal = [];
                                DOVal.push(e);
                                DOVal[0].Ch = idx;
                                if($.isFunction(_Self.onValueChanged())) {
                                    _Self.onValueChanged()(this, {
                                        DOVal: DOVal
                                    });
                                }
                            });
                        })(i);
                    }
                    _Self.getConfigController().onSubmitted(function(obj, e) {
                        if($.isFunction(_Self.onConfigChanged())) {
                            _Self.onConfigChanged()(obj, e);
                        }
                    });
                };
                this.createPage = function(containerName, profile) {
                    var doPageContainer = document.createElement('div');
                    doPageContainer.className = 'col-lg-12';
                    doPageContainer.id = this.getPageId();
                    doPageContainer.innerHTML = "<div class='row'><div class='tab-pane'><ul class='nav nav-tabs nav-justified' role='tablist'>" +
                        "<li class='active'>" +
                        "<a href='#relayStatus' role='tab' data-toggle='tab'>Status</a>" +
                        "</li>" +
                        "<li>" +
                        "<a href='#relayConfig' role='tab' data-toggle='tab'>Configuration</a>" +
                        "</li>" +
                        /*"<li>" +
                        "<a href='#relayTrend' role='tab' data-toggle='tab'>Trend</a>" +
                        "</li>" +*/
                        "</ul>" +
                        "<div class='tab-content'>" +
                        "<div class='tab-pane active' id='relayStatus'>" +
                        "<div class='row'>" +
                        "<div class='col-lg-12'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title'>Status</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerRelayStatusTable'>" +
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" + //<!-- /.col-lg-12 -->
                        "</div>" +
                        "</div>" +
                        "<div class='tab-pane' id='relayConfig'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title'>Configuration</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerRelayConfig'>" +
                            "<div id='containerRelayCommConfig'>" +
                            "</div>" +
                            "<p>" +
                                "<h4 class='page-header'>Overview</h4>" +
                            "</p>" +
                            "<div id='containerRelayOverview'>" +
                            "</div>" +
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" +
                        "<div class='tab-pane' id='relayTrend'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h2 class='panel-title'>Relay Trend</h2>" +
                        "</div>" +
                        "<div class='panel-body' id='containerRelayTrend'>" +
                        "</div>" + //<!--./panel-body-->
                        "</div>" + //<!--./panel-->
                        "</div>" +
                        "</div></div></div>";
                    try{
                        var element = document.getElementById(containerName).appendChild(doPageContainer);
                        this.setupPage(profile);
                        this.handleEvent();
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };

                this.setupPage = function(profile) {
                    var deviceObj = Advantech.Profile.DeviceEmun[profile.Id];
                    var configDataModule = deviceObj.doDataModuleFactory.apply(this,[]);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun doDataModuleFactory");
                    }
                    var mdEmun = deviceObj.doModeEmun;
                    _Self.setModeRangeEmun(mdEmun);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun doModeEmun");
                    }
                    _Self.setOverviewTable(new Advantech.Form.IOForm.DOConfigOverviewTable("relayConfigOverviewTable"));
                    _Self.getOverviewTable().setModeTypeEmun(mdEmun);
                    _Self.setConfigBaseForm(new Advantech.Form.IOForm.DIOConfigBaseForm("relayConfigBaseForm"));
                    _Self.setStatusTb(new Advantech.Form.IOForm.IOStatusTableFactory().instance("RelayStatusTable", this.getChannelNumber(), "DO"));
                    _Self.getOverviewTable().initialTable("containerRelayOverview");
                    _Self.getConfigBaseForm().initialForm("containerRelayCommConfig", mdEmun);
                    _Self.setConfigController(new Advantech.Form.IOForm.RelayConfigController(_Self.getConfigBaseForm(),
                                                                                            _Self.getOverviewTable(),
                                                                                            new Advantech.Data.IOData.IOTypeConfigDataModule(new configDataModule(), mdEmun),
                                                                                            profile));
                    _Self.getConfigController().initialController();
                    _Self.getStatusTb().initialTable("containerRelayStatusTable");
                    _Self.setCtrlList(_Self.getStatusTb().getControlsHandle());
                    var TrendHeight = $("#" + this.getPageId() + " #containerRelayStatusTable").height();
                    $("#" + this.getPageId() + " #containerRelayTrend").height(this.getChannelNumber() * 50);
                    if($("#" + this.getPageId() + " #containerRelayTrend").height() < 400) {
                        $("#" + this.getPageId() + " #containerRelayTrend").height(400);
                    }
                    _Self.setTrend(new Advantech.Control.TrendDigitalChart("containerRelayTrend"));

                    var colors = Advantech.Profile.TrendColorEmun;

                    for (var i = 0; i < this.getChannelNumber(); ++i) {
                        var infoDIO = new Advantech.Control.plotInfo("Relay_Ch" + i.toString(), colors[i]);
                        _Self.getTrend().appendPlot(infoDIO);
                    }
                    _Self.getTrend().createChart("Step", "Bool", d3.format('d'), d3.format(',.2f'));
                };
            },
            //Inherit IOStatusPage
            UIModeSelectPage: function(pageId, channelNumber) {
                Advantech.Form.IOForm.IOStatusPage.apply(this, arguments);
                var _Self = this;
                var _onSubmitted = null;

                this.createPage = function(containerName, profile) {
                    var uiPageContainer = document.createElement('div');
                    uiPageContainer.className = 'col-lg-12';
                    uiPageContainer.id = this.getPageId();
                    uiPageContainer.innerHTML =
                        "<div class='row'><div class='tab-pane'>"+
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                            "<h4>Universal Input Channel Setting</h4>" +
                            "<ul>" +
                            "<li> Use below configuration to set AI channel(s) as DI channel(s)." +
                            "<li> Mode can not be changed when channel is in AI average mode." +
                            "</ul>" +
                        "</div>" + //<!--./panel-heading-->
                        "<div class='panel-body' id='containerUiStatusTable'>" +
                            "<div id='containerUiCommConfig'>" +
                            "</div>" +
                        "</div>" + //<!--./panel-body-->
                        "<div class='panel-footer clearfix'>" +
                        "<div class='pull-right'>"+
                            '<button type="submit" class="btn btn-success privilege root admin" id="btnUIConfig">'+
                            '<i class="fa fa-check"></i> Submit</button>'+
                        '</div></div>'+ // panel-footer
                        "</div></div></div>";
                    try{
                        var element = document.getElementById(containerName).appendChild(uiPageContainer);
                        this.setupPage(profile);
                        this.handleEvent();
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };
                this.setupPage = function(profile){
                    var deviceObj = Advantech.Profile.DeviceEmun[profile.Id];
                    var configDataModule = deviceObj.diDataModuleFactory.apply(this,[]);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun diDataModuleFactory");
                    }
                    var mdEmun = deviceObj.diModeEmun;
                    _Self.setModeRangeEmun(mdEmun);
                    if(configDataModule == null){
                        throw new Error("Parameter setup failure. Please implement device emun diModeEmun");
                    }
                    _Self.setStatusTb(new Advantech.Form.IOForm.IOStatusTableFactory().instance("UIStatusTable", this.getChannelNumber(), "UI"));
                    _Self.getStatusTb().initialTable("containerUiStatusTable");
                };
                this.initialConfigs = function(configsJson){
                    try{
                        var configArray = configsJson.UCfg;
                        if(configArray) {
                            for (var i = 0; i < configArray.length; ++i) {
                                var mode = int(configArray[i].Md);
                                var status = int(configArray[i].En);
                                //update table content
                                _Self.getStatusTb().updateRowValue(i, mode,status);
                            }
                        }else{
                            throw new Error("The UI Config JSON data Format Error.");
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Setting UI Config Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Initial UI configuration parameter failed with error:"+e.message+"<h5>");
                    }
                };
                this.onSubmitted = function(x) {
                    if(!arguments.length){
                        return  _onSubmitted;
                    }
                    _onSubmitted = x;
                };
                this.handleEvent = function() {
                    $('#' + this.getPageId() + ' #btnUIConfig').click(function(){
                        if($.isFunction(_Self.onSubmitted())){
                            var jsonObj = _Self.getStatusTb().getJsonData();
                            _Self.onSubmitted()(this, jsonObj);
                        }
                    });
                    for(var i = 0; i < this.getChannelNumber(); i++){
                        $('#' + this.getPageId() + ' #inpEn_' + i).change(function(){
                            var target = $(this).attr('data-target');
                            if($(this).prop("checked"))
                                $('#' + _Self.getPageId() + ' #' + target).removeAttr('disabled');
                            else
                                $('#' + _Self.getPageId() + ' #' + target).attr('disabled','disabled');
                        })
                    }
                }
            },
            IOStatusTab: function(tabId) {
                var _onTabSwitch = null;
                var mTabId = tabId;
                var mTabElement = [];
                var mDOPage = null;
                var mRelayPage = null;
                var mDIPage = null;
                var mAOPage = null;
                var mAIPage = null;
                var mCNTPage = null;
                var mUIModePage = null;//Universal Input
                this.getTabId = function() {
                    return mTabId;
                };
                this.onTabSwitch = function(x) {
                    if(!arguments.length) return _onTabSwitch;
                    _onTabSwitch = x;
                };
                this.GetDOPage = function() {
                    return mDOPage;
                }
                this.GetRelayPage = function() {
                    return mRelayPage;
                }
                this.GetDIPage = function() {
                    return mDIPage;
                }
                this.GetAOPage = function() {
                    return mAOPage;
                }
                this.GetAIPage = function() {
                    return mAIPage;
                }
                this.GetCNTPage = function() {
                    return mCNTPage;
                }
                this.GetUIModePage = function() {
                    return mUIModePage;
                }
                this.GetTabTitleId = function() {
                    return "ioStatusTabTitle";
                };
                this.GetTabContextId = function() {
                    return "ioStatusTabContext";
                };
                this.CreateTab = function(containerName) {
                    var ioStatusTabContainer = document.createElement('div');
                    ioStatusTabContainer.className = 'col-lg-12';
                    ioStatusTabContainer.id = this.getTabId();
                    ioStatusTabContainer.innerHTML =    "<ul id='ioStatusTabTitle' class='nav nav-pills'>" +
                                                        "</ul>" +
                                                        "<div id='ioStatusTabContext' class='tab-content'>" +
                                                        "</div>";
                    var element = document.getElementById(containerName).appendChild(ioStatusTabContainer);
                }
                this.CreateIOPage = function(profileArray, slotIndex) {
                    if(mDIPage!=null || mDOPage!=null || mRelayPage!=null || mAIPage!=null || mCNTPage!=null|| mUIModePage!=null)//prevent duplicate IO Tab creation
                        return;

                    //var soltProfile = this.GetSlotProfile(profileArray, slotIndex);
                    var soltProfile = profileArray;
                    if(soltProfile == null){
                        throw new Error("Invalid profile json");
                    }else{
                        var currentModule = soltProfile.Id;
                        if(Advantech.Profile.DeviceEmun[currentModule] == undefined){
                            $("#"+this.getTabId()).html("<center>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<h1>"+
                                                        "<i class='fa fa-exclamation-triangle'></i> This module does not support IO Status"+
                                                        "</h1>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                        "<br>"+
                                                    "</center>");
                        }else{
                            var uiFlag = Advantech.Profile.DeviceEmun[currentModule].isSupportUniversalInput;
                            var uiChannelAmount = 0;
                            var rs485Flag = Advantech.Profile.DeviceEmun[currentModule].isSupportRS485;
                            var sensorFlag = Advantech.Profile.DeviceEmun[currentModule].isSupportSensor;
                            if(typeof(uiFlag)!='undefined' && uiFlag && typeof(soltProfile.UIn)!='undefined'){
                                uiChannelAmount = soltProfile.UIn;
                                this.AppendTab("UITab", "UI Setting");
                                mUIModePage = new Advantech.Form.IOForm.UIModeSelectPage("UiModeSelectPage", soltProfile.UIn);
                                mUIModePage.createPage("UITab", soltProfile);
                            }
                            if(soltProfile.AIn > 0 || uiChannelAmount > 0){
                                this.AppendTab("AITab", "AI");
                                var channelAmount = Number(soltProfile.AIn) + Number(uiChannelAmount);
                                mAIPage = new Advantech.Form.IOForm.AIStatusPage("AiStatusPage", channelAmount);
                                soltProfile.AIn = channelAmount;
                                mAIPage.createPage("AITab", soltProfile);
                            }
                            if(soltProfile.AOn > 0) {
                                this.AppendTab("AOTab", "AO");
                            }
                            if(soltProfile.DIn > 0 || uiChannelAmount > 0) {
                                this.AppendTab("DITab", "DI");
                                var channelAmount =  Number(soltProfile.DIn) + Number(uiChannelAmount);
                                mDIPage = new Advantech.Form.IOForm.DIStatusPage("DiStatusPage", channelAmount);
                                soltProfile.DIn = channelAmount;
                                mDIPage.createPage("DITab", soltProfile);
                            }
                            if(soltProfile.DOn > 0) {
                                this.AppendTab("DOTab", "DO");
                                mDOPage = new Advantech.Form.IOForm.DOStatusPage("DoStatusPage", soltProfile.DOn);
                                mDOPage.createPage("DOTab", soltProfile);
                            }
                            if(soltProfile.RLAn > 0) {
                                this.AppendTab("RelayTab", "Relay");
                                mRelayPage = new Advantech.Form.IOForm.RelayStatusPage("RelayStatusPage", soltProfile.RLAn);
                                mRelayPage.createPage("RelayTab", soltProfile);
                            }
                            if(soltProfile.Cntn > 0) {
                                this.AppendTab("CntTab", "Cnt");
                            }
                            if(typeof(rs485Flag)!='undefined' && rs485Flag){
                                for(var i = 0; i < soltProfile.RT; i++) //For multi COM
                                {
                                    this.AppendTab("TabCOM" + (i+1), "COM" + (i+1));
                                }
                                //this.AppendTab("TabCom1", "COM1");
                            }
                            if(typeof(sensorFlag)!='undefined' && sensorFlag){
                                this.AppendTab("TabSensor", "Sensor");
                            }
                            if($.isFunction(this.onTabSwitch())) {
                                this.onTabSwitch()(this, {
                                    Type: mTabElement[0]
                                });
                            }
                            $("#" + this.getTabId() + " li a[href='#" + mTabElement[0] + "Tab']").tab('show');
                        }
                    }
                };
                this.GetSlotProfile = function(profileArray, slotIndex) {
                    var soltProfile = null;
                    for (var i = 0; i < profileArray.Dev.length; ++i) {
                        if(profileArray.Dev[i].SL == slotIndex) {
                            soltProfile = profileArray.Dev[i];
                            break;
                        }
                    }
                    return soltProfile;
                }
                this.AppendTab = function(tabPageId, tabTilteText) {
                    if(mTabElement.length == 0) {
                        $("#" + this.getTabId() + " #" + this.GetTabTitleId()).append("<li class='active'><a id='link" + tabPageId + "' href='#" + tabPageId + "' data-toggle='tab'>" + tabTilteText + "</a></li>");
                        $("#" + this.getTabId() + " #" + this.GetTabContextId()).append("<div class='tab-pane active' id='" + tabPageId + "'>");
                    }else{
                        $("#" + this.getTabId() + " #" + this.GetTabTitleId()).append("<li><a href='#" + tabPageId + "' data-toggle='tab'>" + tabTilteText + "</a></li>");
                        $("#" + this.getTabId() + " #" + this.GetTabContextId()).append("<div class='tab-pane' id='" + tabPageId + "'>");
                    }
                    mTabElement.push(tabTilteText);
                    var _Self = this;
                    $("#" + _Self.getTabId() + " #" + this.GetTabTitleId() + " li a[href='#" + tabPageId + "']").click(function(e) {
                        e.preventDefault()
                        var pageId = $(this).text();
                        $(this).tab('show');
                        if($.isFunction(_Self.onTabSwitch())) {
                            _Self.onTabSwitch()(this, {
                                Type: pageId
                            });
                        }
                    });
                };
            },
            //Inherit from IOStatusTable
            DIOStatusTable: function(tableName, channelNumber, IOType) {
                Advantech.Form.IOForm.IOStatusTable.apply(this,[tableName, channelNumber, IOType]);
                var _Self = this;
                var mControlsHandle = [];
                this.initialTable = function(containerID) {
                    var IOChannelIDFactory = this.getIOChannelID(this.getIOType());
                    var DisplayFactory = new Advantech.Form.IOForm.IODisplayFactory();
                    var container = document.getElementById(containerID);
                    if(IOType == "DI")
                    {
                        //container.innerHTML = "<div class='table-responsive'>" +
						container.innerHTML = "<div>" +
                            "<table class = 'table table-bordered table-hover table-striped' id = '" + this.getTableId() + "'>" +
                            "<thead>" +
                            "<tr>" +
                            "<th class=''>Channel</th>" +
                            "<th>Mode</th>" +
                            "<th>Status</th>" +
                            "</tr>" +
                            "</thead>" +
                            "<tbody>" +
                            "</tbody>" +
                            "</table>" +
                            "</div>";
                    }
                    else if(IOType == "DO")
                    {
                        //container.innerHTML = "<div class='table-responsive'>" +
						container.innerHTML = "<div>" +
                            "<table class = 'table table-bordered table-hover table-striped' id = '" + this.getTableId() + "'>" +
                            "<thead>" +
                            "<tr>" +
                            "<th class=''>Channel</th>" +
                            "<th class='mode'>Mode</th>" +
                            "<th>Status</th>" +
                            "</tr>" +
                            "</thead>" +
                            "<tbody>" +
                            "</tbody>" +
                            "</table>" +
                            "</div>";
                    }
                    for (var i = 0; i < channelNumber; i++) {
                        var indicatorId = IOChannelIDFactory(i);
                        var IndicatorElment = DisplayFactory.createDisplayElement(IOType);
                        _Self.getControlsHandle().push(IndicatorElment);
                        addRowToIOTable(i, IndicatorElment.CreateIODisplayElement(indicatorId), IOType);
                        IndicatorElment.drawElement(indicatorId);
                    }
                };
                var addRowToIOTable = function(index, element, IOType) {
                    var row = document.createElement('tr');
                    row.id = 'ch_'+index;
                    try{
                        for (var i = 0; i < 3; ++i) {
                            var cell = row.insertCell(i);
                            if(i == 0) {
                                cell.className = '';
                                cell.innerHTML = index;
                            }else if(i == 1) {
                                cell.className = 'mode';
                                cell.innerHTML = "Mode";
                            }else{
                                cell.appendChild(element);
                            }
                        }
                        $("#" + _Self.getTableId() + " tbody").append(row);
                    }catch(ex){
                        $("#" + _Self.getTableId() + " tbody").html('<h3><p/><p/>Error Occured, Please <a href="/config">Reload</a> Page!</h3>');
                    }
                };
                this.ChannelRowDisplayStatus = function(index, bDisplay){//when channel disable
                    if(bDisplay)
                        $("#" + _Self.getTableId() + " #ch_" + index).show();
                    else
                        $("#" + _Self.getTableId() + " #ch_" + index).hide();
                };
            },
            //Inherit from IOStatusTable
            UIStatusTable: function(tableName, channelNumber, IOType) {
                Advantech.Form.IOForm.IOStatusTable.apply(this,[tableName, channelNumber, IOType]);
                var _Self = this;
                var mControlsHandle = [];
                this.initialTable = function(containerID) {
                    var IOChannelIDFactory = this.getIOChannelID(this.getIOType());
                    var DisplayFactory = new Advantech.Form.IOForm.IODisplayFactory();
                    var container = document.getElementById(containerID);
                    container.innerHTML = "<div class='table-responsive'>" +
                        "<table class = 'table table-bordered table-hover table-striped' id = '" + this.getTableId() + "'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th class=''>Channel</th>" +
                        "<th>Enable/Disable</th>" +
                        "<th>Mode</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>" +
                        "</div>";
                    for (var i = 0; i < channelNumber; i++) {
                        var modeElm = this.createModeElement(i);
                        var statusElm = this.createStatusElement(i);
                        addRowToIOTable(i, statusElm, modeElm);
                    }
                };
                this.createModeElement = function(id) {
                    var selectElm = document.createElement('span');
                    //selectElm.id = id;
                    selectElm.innerHTML = '<select class="form-control" id="selMd_' + id+ '">' +
                            '<option value="0">AI</option>' +
                            '<option value="1">DI</option>' +
                            '</select>';
                    return selectElm;
                }
                this.createStatusElement = function(id) {
                    var inputElm = document.createElement('span');
                    //selectElm.id = id;
                    inputElm.innerHTML = '<input type="checkbox" class="channelStatus" id="inpEn_'+ id+ '" data-target="selMd_'+ id +'" />';
                    return inputElm;
                }
                var addRowToIOTable = function(index, statusElement, modeElement) {
                    var row = document.createElement('tr');
                    try{
                        for(var i = 0; i < 3; ++i){
                            var cell = row.insertCell(i);
                            if(i == 0){
                                cell.className = '';
                                cell.innerHTML = index;
                            }else if(i == 1){
                                cell.appendChild(statusElement);
                            }else{
                                cell.appendChild(modeElement);
                            }
                        }
                        $("#" + _Self.getTableId() + " tbody").append(row);
                    }catch(ex){
                        $("#" + _Self.getTableId() + " tbody").html('<h3><p/><p/>Error Occured, Please <a href="/config">Reload</a> Page!</h3>');
                    }
                };
                this.updateRowValue = function(index, mode, status){
                    $("#" + _Self.getTableId() + " #selMd_" + index).val(mode);
                    if(status == 1)
                        $("#" + _Self.getTableId() + " #inpEn_" + index).prop('checked', true).trigger("change");
                    else
                        $("#" + _Self.getTableId() + " #inpEn_" + index).prop('checked', false).trigger("change");
                }
                this.getJsonData = function(){
                    var jsonObj = {"UCfg":[]};
                    for(var i=0; i < channelNumber; i++){
                        var mode = Number($("#" + _Self.getTableId() + " #selMd_" + i).val());
                        var uiChannel;
                        var status = 0;
                        if($("#" + _Self.getTableId() + " #inpEn_" + i).prop('checked'))
                            uiChannel = {"Ch":i, "En":1, "Md":mode};
                        else
                            uiChannel = {"Ch":i, "En":0};//do not send disabled channel
                        jsonObj["UCfg"].push(uiChannel);
                    }
                    return jsonObj;
                }
            },
            AIMinTypeDisplay:function(aIStatusTable){
                this.initialTable = function(){
                    for (var i = 0; i < aIStatusTable.getChannelNumber(); i++) {
                        aIStatusTable.addRowToIOTable(i);
                    }
                    aIStatusTable.addRowToIOTable(aIStatusTable.AVGERAGE_TAG);
                    $("#"+aIStatusTable.getTableId()).find(".aiValueType").hide();
                };
                this.setRow = function(idx ,aiValObj){
                    var row = $("#"+ aIStatusTable.getTableId() +" #"+idx);
                    if(row.length > 0){
                        var range = aIStatusTable.getRangeEmun()[aiValObj.Rng];
                        var unit = (Advantech.Profile.AIRangeInfoEmun[aiValObj.Rng]==undefined)?"":Advantech.Profile.AIRangeInfoEmun[aiValObj.Rng].unit;
                        //var specialFlag = Advantech.Profile.DeviceEmun[module].AiStatusEgUnitSpecialFlag;
                        var val;
						var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                        var precision = Advantech.Profile.DeviceEmun[module].AiStatusEgLimitPrecision;
                        if(range=='UDI'){
                            val = aiValObj.LEgF;
                        }else{
                            if(unit=="V" || unit=="A"){
                                val = parseFloat(aiValObj.LEgF/1000.0).toFixed(3);
                            }else{
                                val = parseFloat(aiValObj.LEgF);
                            }
                        }
                        if(typeof(precision) != 'undefined'){
                           val = Advantech.Utility.sprintFlowValue(val, precision);
                        }
                        if(row[0].cells){
                            row[0].cells[1].innerHTML = range;
                            row.data("tag", aiValObj);
                            if(range != Advantech.Profile.INVALID_VALUE && range!='UDI'){
                                row[0].cells[4].innerHTML = aiValObj.LVal;
                                row[0].cells[3].innerHTML = aiValObj.LVal.toString("16").toUpperCase();
                                row[0].cells[2].innerHTML = val + " " +unit;
                            }else{
                                val = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[2].innerHTML = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[3].innerHTML = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[4].innerHTML = Advantech.Profile.INVALID_VALUE;
                            }
                            if( aIStatusTable.getCurrentDisplayChannel() == idx){
                                aIStatusTable.setDisplayForm(aiValObj.Rng, val, unit);
                            }
                        }
                        if(aiValObj.Rng == 480){//hide UDI channel
                            row.hide();
                        }else
                            row.show();
                    }
                    else{
                        $("#"+ aIStatusTable.getTableId() +" .panel-body").html('<h3><p/><p/>Error Occured, Please <a href="/config">Reload</a> Page!</h3>');
                    }
                };
                this.getRestObjProp = function(){
                    return "ClrL";
                };
            },
            AIMaxTypeDisplay:function(aIStatusTable){
                this.initialTable = function(){
                    for (var i = 0; i < aIStatusTable.getChannelNumber(); i++) {
                        aIStatusTable.addRowToIOTable(i);
                    }
                    aIStatusTable.addRowToIOTable(aIStatusTable.AVGERAGE_TAG);
                    $("#"+aIStatusTable.getTableId()).find(".aiValueType").hide();
                };
                this.setRow = function(idx ,aiValObj){
                    var row = $("#"+ aIStatusTable.getTableId() +" #"+idx);
                    if(row.length > 0){
                        var range = aIStatusTable.getRangeEmun()[aiValObj.Rng];
                        var unit = (Advantech.Profile.AIRangeInfoEmun[aiValObj.Rng]==undefined)?"":Advantech.Profile.AIRangeInfoEmun[aiValObj.Rng].unit;
                        //var specialFlag = Advantech.Profile.DeviceEmun[module].AiStatusEgUnitSpecialFlag;
                        var val;
						var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                        var precision = Advantech.Profile.DeviceEmun[module].AiStatusEgLimitPrecision;
                        if(range=='UDI'){
                            val = aiValObj.HEgF;
                        }else{
                            if(unit=="V" || unit=="A"){
                                val = parseFloat(aiValObj.HEgF/1000.0).toFixed(3);
                            }else{
                                val = parseFloat(aiValObj.HEgF);
                            }
                        }
                        if(typeof(precision) != 'undefined'){
                           val = Advantech.Utility.sprintFlowValue(val, precision);
                        }
                        if(row[0].cells){
                            row[0].cells[1].innerHTML = range;
                            row.data("tag", aiValObj);
                            if(range != Advantech.Profile.INVALID_VALUE && range!='UDI'){
                                row[0].cells[4].innerHTML = aiValObj.HVal;
                                row[0].cells[3].innerHTML = aiValObj.HVal.toString("16").toUpperCase();
                                row[0].cells[2].innerHTML = val + " " +unit;
                            }else{
                                val = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[2].innerHTML = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[3].innerHTML = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[4].innerHTML = Advantech.Profile.INVALID_VALUE;
                            }
                            if( aIStatusTable.getCurrentDisplayChannel() == idx){
                                aIStatusTable.setDisplayForm(aiValObj.Rng, val, unit);
                            }
                        }
                        if(aiValObj.Rng == 480){//hide UDI channel
                            row.hide();
                        }else
                            row.show();
                    }
                    else{
                        $("#"+ aIStatusTable.getTableId() +" .panel-body").html('<h3><p/><p/>Error Occured, Please <a href="/config">Reload</a> Page!</h3>');
                        //throw new Error("Invalid parameters on setting value.")
                    }
                };
                this.getRestObjProp = function(){
                    return "ClrH";
                };
            },
            AIValueTypeDisplay:function(aIStatusTable){
                this.initialTable = function(){
                    for (var i = 0; i < aIStatusTable.getChannelNumber(); i++) {
                        aIStatusTable.addRowToIOTable(i);
                    }
                    aIStatusTable.addRowToIOTable(aIStatusTable.AVGERAGE_TAG);
                    $("#"+aIStatusTable.getTableId()).find(".aiMinMaxType").hide();
                };
                this.setRow = function(idx ,aiValObj){
                    var row = $("#"+ aIStatusTable.getTableId() +" #"+idx);
                    if(row.length > 0){
                        row.data("tag", aiValObj);
                        var range = aIStatusTable.getRangeEmun()[aiValObj.Rng];
                        var unit = (Advantech.Profile.AIRangeInfoEmun[aiValObj.Rng]==undefined)?"":Advantech.Profile.AIRangeInfoEmun[aiValObj.Rng].unit;
                        //var specialFlag = Advantech.Profile.DeviceEmun[module].AiStatusEgUnitSpecialFlag;
                        var val;
                        if(aiValObj.Evt == 0){
                            if(range=='UDI'){
                                val = aiValObj.EgF;
                            }else{
                                if(unit=="V" || unit=="A"){
                                    val = parseFloat(aiValObj.EgF/1000.0).toFixed(3);
                                }else{
                                    val = parseFloat(aiValObj.EgF);
                                }
                            }
							var module = Advantech.Utility.RecordContextPageIdSingleton.getInstance().GetCurrentModule();
                            var precision = Advantech.Profile.DeviceEmun[module].AiStatusEgLimitPrecision;
                            if(typeof(precision) != 'undefined'){
                               val = Advantech.Utility.sprintFlowValue(val, precision);
                            }
                        }else{
                            var errEvtArray = Advantech.Utility.convertMaskToArray(aiValObj.Evt, 32);
                            for(var i = 0; i < 32; ++i){
                                if(errEvtArray[i] == 1){
                                    var code = Math.pow(2, i);
                                    val = ""+Advantech.Profile.AIEventStatusEmun[code]+"\r\n";
                                }
                            }
                        }
                        if(aiValObj.En == 0 || range == undefined){
                            range = Advantech.Profile.INVALID_VALUE;
                        }
                        if(row[0].cells){
                            row[0].cells[1].innerHTML = range;
                            if(range != Advantech.Profile.INVALID_VALUE && range!='UDI'){
                                row[0].cells[5].innerHTML = aiValObj.PEgF;
                                row[0].cells[4].innerHTML = aiValObj.Val;
                                row[0].cells[3].innerHTML = aiValObj.Val.toString("16").toUpperCase();
                                row[0].cells[2].innerHTML = ($.isNumeric(val))?val + " " +unit:val;
                            }else{
                                val = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[5].innerHTML = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[4].innerHTML = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[3].innerHTML = Advantech.Profile.INVALID_VALUE;
                                row[0].cells[2].innerHTML = Advantech.Profile.INVALID_VALUE;
                            }
                            if( aIStatusTable.getCurrentDisplayChannel() == idx){
                                aIStatusTable.setDisplayForm(aiValObj.Rng, val, unit, aiValObj.LoA, aiValObj.HiA);
                            }
                        }
                        if(aiValObj.Rng == 480){//hide UDI channel
                            row.hide();
                        }else
                            row.show();
                    }else{
                        $("#"+ aIStatusTable.getTableId() +" .panel-body").html('<h3><p/><p/>Error Occured, Please <a href="/config">Reload</a> Page!</h3>');
                        //throw new Error("Invalid parameters on setting value.")
                    }
                };
                this.getRestObjProp = function(){
                    return "";
                };
            },
            AiDispalyStrategyFactory : function(){
                this.instance = function(type, aiStatusTable) {
                    var emun = Advantech.Profile.AIValueDisplayEmun;
                    if(type == emun.VALUE) {
                        return new Advantech.Form.IOForm.AIValueTypeDisplay(aiStatusTable);
                    }
                    else if(type === emun.MIN) {
                       return new Advantech.Form.IOForm.AIMinTypeDisplay(aiStatusTable);
                    }
                    else if(type === emun.MAX) {
                        return new Advantech.Form.IOForm.AIMaxTypeDisplay(aiStatusTable);
                    }
                    return {};
                };
            },
            //Inherit from IOStatusTable
            AIStatusTable: function(tableName, channelNumber, IOType) {
                Advantech.Form.IOForm.IOStatusTable.apply(this,[tableName, channelNumber, IOType]);
                var _Self = this;
                var mCurrentChannel = 0;
                var mCurrentRange = "323";
                _Self.INVALID_VALUE = Advantech.Profile.INVALID_VALUE;
                _Self.AVGERAGE_TAG = "AVG";
                var mDisplayStrategy = null;
                var mControlsHandle = [];//AIValueDisplayEmun
                var _onResetSubmitted = null;
                var _onChannelChanged = null;
                var _RangeEmun = Advantech.Profile.AIRangeEmun;

                this.setRangeEmun = function(val){
                    _RangeEmun = val;
                };
                this.getRangeEmun = function(){
                    return _RangeEmun;
                };
                this.onResetSubmitted = function(x){
                    if(x != undefined){
                        _onResetSubmitted = x;
                    }
                    return _onResetSubmitted;
                };
                this.onChannelChanged = function(x){
                    if(x != undefined){
                        _onChannelChanged = x;
                    }
                    return _onChannelChanged;
                };
                this.getCurrentDisplayChannel = function(){
                    return mCurrentChannel;
                };
                var setCurrentDisplayChannel = function(val){
                    mCurrentRange = "-1";
                    mCurrentChannel = val;
                    var idx = mCurrentChannel;
                    setFocusOnRow(idx);
                    var tag = _Self.getRowTag(idx);
                    if(tag != null){
                        var rangeInfo = Advantech.Profile.AIRangeInfoEmun[tag.Rng];
                        if(rangeInfo != undefined){
                            if(rangeInfo.unit != _Self.INVALID_VALUE){
                                _Self.getControlsHandle()[0].changeRange(rangeInfo.min, rangeInfo.max);
                            }
                            else{
                                _Self.getControlsHandle()[0].changeRange(-10, 10);
                            }
                        }else{
                            throw new Error("Range code abnormal at channel "+idx+".");
                        }
                    }else{
                        throw new Error("Get row tag failure at channel "+idx+".");
                    }
                };
                this.initialTable = function(containerID, aiValueStrategy) {
                    var IOChannelIDFactory = this.getIOChannelID(this.getIOType());
                    var DisplayFactory = new Advantech.Form.IOForm.IODisplayFactory();
                    var container = document.getElementById(containerID);
                    if(aiValueStrategy == undefined){
                        throw new Error("Not Assign AiDispalyStrategy");
                        return;
                    }
                    mDisplayStrategy = aiValueStrategy;
                    container.innerHTML =
                    "<div class='panel panel-default' id = '" + this.getTableId() + "'>"+
                        "<div class='panel-body'>"+
                            "<div class='table-responsive'>" +
                                "<center><table class='table-control'>"+
                                    "<tbody>"+
                                        "<tr>"+
                                            "<td rowspan='6'>"+
                                            "<div id='"+this.getTableId()+"meterContainer' style='height:200px; width:220px; display:block; float:left;'>"+
                                            "</div>"+
                                            "</td>"+
                                            "<td></td>"+
                                        "</tr>"+
                                        "<tr>"+
                                            "<td class='td-label'><label >Channel:</label></td>"+
                                            "<td class='td-control'><select class='form-control' id='selCh'></select></td>"+
                                        "</tr>"+
                                        "<tr>"+
                                            "<td class='td-label'><label>Range:</label></td>"+
                                            "<td class='td-control'><p style='margin-left:10px;' id='chRngDescr'>****</p></td>"+
                                        "</tr>"+
                                        "<tr>"+
                                            "<td class='td-label'><label>Value:</label></td>"+
                                            "<td class='td-control'><p style='margin-left:10px;' id='chValue'>****</p></td>"+
                                        "</tr>"+
                                        "<tr class='aiValueType'>"+
                                            "<td class='td-label'><label>Low Alarm Status:</label></td>"+
                                            "<td class='td-control'>"+
                                                "<input type = 'checkbox' class='Indicator-checkbox' id='inpLoA' checked><a class='Indicator-light' style='width:40px; height:25px; float:left;'></a>" +
                                                "<button class='btn btn-warning' id='btnLoA' style='margin-top:-1px;'><span class='fa fa-fw fa-eraser'></span> Clear</button>"+
                                            "</td>"+
                                        "</tr>"+
                                        "<tr class='aiValueType'>"+
                                            "<td class='td-label'><label>High Alarm Status:</label></td>"+
                                            "<td class='td-control'>"+
                                                "<input type = 'checkbox' id='inpHiA' class='Indicator-checkbox' checked><a class='Indicator-light' style='width:40px; height:25px; float:left;'></a>" +
                                                "<button class='btn btn-warning' id='btnHiA' style='margin-top:-1px;'><span class='fa fa-fw fa-eraser'></span> Clear</button>"+
                                            "</td>"+
                                        "</tr>"+
                                        "<tr class='aiMinMaxType'>"+
                                            "<td class='td-label'><label>Reset Value:</label></td>"+
                                            "<td class='td-control'><button class='btn btn-success' id='btnClrL'><span class='fa fa-fw fa-refresh'></span> Reset</button></td>"+
                                        "</tr>"+
                                    "</tbody>" +
                                "</table></center>"+
                            "</div>"+
                            "<div class='table-responsive' style='display:block;'>" +
                                "<table id='"+this.getTableId()+"_overview' class ='table table-bordered table-hover table-striped'>" +
                                    "<thead>" +
                                        "<tr>" +
                                            "<th class=''>Ch</th>" +
                                            "<th>Range</th>" +
                                            "<th>Value[Eg]</th>" +
                                            "<th class='cellphone'>Value[Hex]</th>" +
                                            "<th class='cellphone'>Value[Dec]</th>" +
                                            "<th class='table-hidden-column'>Physical Scaling Value[Dec]</th>" +
                                        "</tr>" +
                                    "</thead>" +
                                    "<tbody>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>"+
                        "</div>"+
                    "</div>";
                    var IndicatorElment = DisplayFactory.createDisplayElement(IOType);
                    _Self.getControlsHandle().push(IndicatorElment);
                    IndicatorElment.CreateIODisplayElement(this.getTableId()+"meterContainer");
                    IndicatorElment.drawElement(this.getTableId()+"meterContainer");
                    var physicalValueSupport = Advantech.Profile.DeviceEmun[module].aiPhysicalValueSupport;
                    if(typeof(physicalValueSupport)!="undefined" && physicalValueSupport){
                        $("#" + this.getTableId()+"_overview .table-hidden-column").attr('class', 'cellphone');
                    }
                    mDisplayStrategy.initialTable();
                    $(container).find("#btnClrL").click(function(){
                        if($.isFunction(_Self.onResetSubmitted())){
                            var e = {};
                            e["Ch"] = getSelectValToChIndex();
                            e[mDisplayStrategy.getRestObjProp()] = 1;
                            _Self.onResetSubmitted().apply(this,[this, e]);
                        }
                    });
                    $(container).find("#btnLoA").click(function(){
                        if($.isFunction(_Self.onResetSubmitted())){
                            var e = {};
                            e["Ch"] = getSelectValToChIndex();
                            e["LoA"] = 0;
                            _Self.onResetSubmitted().apply(this,[this, e]);
                        }
                    });
                    $(container).find("#btnHiA").click(function(){
                        if($.isFunction(_Self.onResetSubmitted())){
                            var e = {};
                            e["Ch"] = getSelectValToChIndex();
                            e["HiA"] = 0;
                            _Self.onResetSubmitted().apply(this,[this, e]);
                        }
                    });
                    $(container).find("#selCh").change(function(){
                        setCurrentDisplayChannel($(this).val());
                    });
                    $(container).find("#"+this.getTableId()+"_overview tbody tr").click(function(){
                        if(this.id != _Self.getCurrentDisplayChannel()){
                            $(container).find("#selCh").val(this.id).trigger('change');
                        }
                    });
                };

                var getSelectValToChIndex = function(){
                    var chVal = $("#"+_Self.getTableId()).find("#selCh").val();
                    if(chVal == _Self.AVGERAGE_TAG){
                        chVal = Number(_Self.getChannelNumber());
                    }
                    return Number(chVal);
                };

                this.setRow = function(idx ,aiValObj){
                    mDisplayStrategy.setRow(idx ,aiValObj);
                };
                var setFocusOnRow = function(idx){
                    $("#"+_Self.getTableId()+"_overview tbody tr").removeClass('info');
                    $("#"+ _Self.getTableId() +" #"+idx).addClass('info');
                };
                this.setDisplayForm = function(rng, val, unit, loA, hiA){
                    var range = Advantech.Profile.AIRangeEmun[rng]||_Self.INVALID_VALUE;
                    var tag = _Self.getRowTag(_Self.getCurrentDisplayChannel());
                    if(tag != null){
                        var rangeInfo = Advantech.Profile.AIRangeInfoEmun[tag.Rng];
                        if(rangeInfo != undefined){
                            if(rng != tag.Rng || mCurrentRange != rng){
                                mCurrentRange = rng;
                                if(rangeInfo.unit != _Self.INVALID_VALUE){
                                    if(loA == undefined){
                                        if(range=='UDI'){
                                            _Self.getControlsHandle()[0].changeRange(rangeInfo.min, rangeInfo.max);
                                    /*    }else if((rangeInfo.min > -20 || rangeInfo.max < 20)){
                                            _Self.getControlsHandle()[0].changeRange(-20, 20);*/
                                        }else{
                                            _Self.getControlsHandle()[0].changeRange(rangeInfo.min, rangeInfo.max);
                                        }
                                    }else{
                                        _Self.getControlsHandle()[0].changeRange(rangeInfo.min, rangeInfo.max);
                                    }
                                }else{
                                    _Self.getControlsHandle()[0].changeRange(-20, 20);
                                }
                            }
                        }else{
                            throw new Error("Range code abnormal at channel "+idx+".");
                        }
                    }else{
                        throw new Error("Get row tag failure at channel "+idx+".");
                    }
                    $("#"+_Self.getTableId()+" #chRngDescr").html(_RangeEmun[rng]);
                    $("#"+_Self.getTableId()+" #chValue").html(((unit != _Self.INVALID_VALUE)&&($.isNumeric(val)))?val +" "+unit:val);
                    _Self.getControlsHandle()[0].setValue(val);
                    if(hiA != undefined){
                        $("#"+_Self.getTableId()+" #inpHiA").prop("checked", Number(hiA));
                    }
                    if(loA != undefined){
                        $("#"+_Self.getTableId()+" #inpLoA").prop("checked", Number(loA));
                    }
                }
                this.getRowTag = function(idx){
                    var row = $("#"+ _Self.getTableId() +" #"+idx);
                    if(row.length > 0){
                        return row.data("tag");
                    }
                    return null;
                };
                this.addRowToIOTable = function(index) {
                    var row = document.createElement('tr');
                    var physicalValueSupport = Advantech.Profile.DeviceEmun[module].aiPhysicalValueSupport;
                    row.id = index;
                    if(index == 0){
                        row.className='info';
                    }
                    for (var i = 0; i < 6; ++i) {
                        var cell = row.insertCell(i);
                        if(i == 0) {
                            cell.innerHTML = index;
                        }else if(i == 3 || i == 4) {
                            cell.className = 'cellphone';
                            cell.innerHTML = _Self.INVALID_VALUE;
                        }else if(i == 5) {
                            if(typeof(physicalValueSupport)=="undefined" || !physicalValueSupport){
                                cell.className = 'table-hidden-column';
                            }else{
                                cell.className = 'cellphone';
                            }
                            cell.innerHTML = _Self.INVALID_VALUE;
                        }else{
                            cell.innerHTML = _Self.INVALID_VALUE;
                        }
                    }
                    $("#" + _Self.getTableId() + " #"+ _Self.getTableId()+"_overview tbody").append(row);
                    $("#" + _Self.getTableId() + " select").append("<option value='"+index+"'>"+index+"</option>");
                };
            },
            IOStatusTable: function(tableName, channelNumber, IOType) {
                "use strict"
                var mTableName = tableName;
                var mChannelNumber = channelNumber;
                var mIOType = IOType;
                var mControlsHandle = [];
                var _Self = this;

                this.getControlsHandle = function() {
                    return mControlsHandle;
                };

                this.getTableId = function() {
                    return mTableName;
                };

                this.getChannelNumber = function() {
                    return mChannelNumber;
                };

                this.getIOType = function() {
                    return mIOType;
                };
                this.initialTable = function(containerID) {
                    throw new Error("Not Implement InitialTable");
                };

                this.getIOChannelID = function(IOType) {
                    return function(index) {
                        return IOType + "_" + index.toString();
                    };
                };

                this.setIOMode = function(index, modeDescription) {
                    var row = $("#" + _Self.getTableId() + " tbody tr");
                    if(row.length > 0){
                        if(row[index].cells){
                            row[index].cells[1].innerHTML = modeDescription;
                        }
                    }
                };
            },
            IOStatusTableFactory:function(){
                this.instance = function(tableName, channelNumber, type) {
                    if(type === "DI" || type === "DO") {
                        return new Advantech.Form.IOForm.DIOStatusTable(tableName, channelNumber, type);
                    }else if(type === "AI") {
                       return new Advantech.Form.IOForm.AIStatusTable(tableName, channelNumber, type);
                    }else if(type === "UI") {//Universal Input
                       return new Advantech.Form.IOForm.UIStatusTable(tableName, channelNumber, type);
                    }else if(type === "AO") {
                        return {};
                    }
                    return {};
                };
            },

            IODisplayFactory: function() {
                this.createDisplayElement = function(type) {
                    var displayElement;

                    if(type === "DI") {
                        displayElement = new Advantech.Control.IndicatorLight();
                    }else if(type === "DO") {
                        displayElement = new Advantech.Control.SliderSwitch();
                    }else if(type === "AI") {
                        displayElement = new Advantech.Control.Meter();
                    }else if(type === "AO") {
                        displayElement = new Advantech.Control.Knob();
                    }

                    displayElement.CreateIODisplayElement = function(id) {
                        return displayElement.createDisplayElement(id);
                    };

                    displayElement.DrawIODisplayElement = function() {
                        return displayElement.drawElement();
                    };

                    return displayElement;
                };
            },
        },
        ConfigForm: {
            CloudConfigPanel:function(panelId){
                var _onCloudAuthenticateClick = null;
                var _onGetAuthenticatedReslut = null;
                var _onCloudStatusRefreshSubmitted = null;
                var _onCloudSettingDeleteSubmitted = null;
                var _onCloudSettingDisableSubmitted = null;
                var mContextPanelId = panelId;
                var mPrivateServerPanelId = null;
                var mWebAccessPanelId = null;
                var _cloudAuthModal = $('<div class="modal fade" id="cloudAuthModal" tabindex="-1" role="dialog" aria-labelledby="cloudAuthModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x' +
                    '</button>' +
                    '<h3 class="modal-title" id="cloudAuthModalLabel">Grant Cloud Access</h3>' +
                    '</div>' +
                    '<div class="modal-body center-block" id="calibrationModalContext">' +
                        '<div id="cloudAuthCarousel" class="carousel slide" data-ride="carousel" data-interval="false" data-pause="hover">'+
                          //<!-- Menu -->
                            '<ol class="carousel-indicators" style="color:black;">'+
                              '<li data-target="#cloudAuthCarousel" class="active"></li>'+
                              '<li data-target="#cloudAuthCarousel"></li>'+
                              '<li data-target="#cloudAuthCarousel"></li>'+
                            '</ol>'+
                            //<!-- Items -->
                            '<div class="carousel-inner" role="listbox">'+
                                //<!-- Item 1 -->
                              '<div class="item active">'+
                                '<div style="with:200px; height:225px;">'+
                                    '<h4>Step 1</h4>'+
                                    '<p>Login to your Cloud website and grant access of "WISE Cloud Logger".</p>'+
                                '</div>'+
                                '<div class="carousel-caption" style="color:#222;">'+
                                    '<p>'+
                                        '<button class="btn btn-success" id="carouselBtnNext">Next <i class="fa fa-arrow-circle-right"></i></button>'+
                                    '</p>'+
                                '</div>'+
                              '</div>'+
                                //<!-- Item 2 -->
                                '<div class="item">'+
                                    '<div style="with:200px; height:225px;">'+
                                        '<h4>Step 2</h4>'+
                                        '<p>Copy the "User Code" on Cloud Service Website and paste to the following column:</p>'+
                                        "<br>"+
                                         "<div class='input-group' >"+
                                                "<span class='input-group-addon'><span class='fa fa-cloud-upload'></span>"+
                                                "</span>"+
                                                "<input id='inpCode' type='text' class='form-control' placeholder='Paste code here'>"+
                                                "<br>"+
                                        "</div>"+
                                    '</div>'+
                                    '<div class="carousel-caption" style="color:#222;">'+
                                        '<div>'+
                                            '<button class="btn btn-success" id="carouselBtnSubmit"><i class="fa fa-check"></i> Submit</button>'+
                                        '</div>'+
                                    '</div>'+
                                    //'</div>'+
                                '</div>'+
                                //<!-- Item 3 -->
                                '<div class="item">'+
                                      '<div style="with:200px; height:175px;">'+
                                          '<h4><i class="fa fa-check-circle"></i> Setting Successfully</h4>'+
                                      '</div>'+
                                      '<div class="carousel-caption" style="color:#222;">'+
                                          '<p>'+
                                              '<button class="btn btn-success" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>'+
                                          '</p>'+
                                      '</div>'+
                                '</div>'+
                                //<!-- Item 4 -->
                                '<div class="item">'+
                                    '<div style="with:200px; height:175px;">'+
                                        '<h4><i class="fa fa-exclamation-triangle"></i> Setting failed</h4>'+
                                        '<div id="cloudSettingErrorDesc">Please try again.</div>'+
                                    '</div>'+
                                    '<div class="carousel-caption" style="color:#222;">'+
                                        '<p>'+
                                            '<button class="btn btn-danger" id="btnBack"> Close</button>'+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                var _Self = this;
                var _$Panel;
                var cloudWindowId;
                this.getPanelId = function() {
                    return mContextPanelId;
                };
                this.setOtherPanelId = function(privateServerPanelId, webAccessPanelId){
                    mPrivateServerPanelId = privateServerPanelId;
                    mWebAccessPanelId = webAccessPanelId;
                }
                this.setPanel = function(selCloudMask, jsonObj){
                    var selServiceValue = Advantech.Utility.getFirstValueInBitMask(selCloudMask, Advantech.Profile.CloudServiceVenderEmun.EmunUsefulLength);
                    _$Panel.find("#selCloud").val(selServiceValue).trigger("change");
                    if(jsonObj){
                        _$Panel.find("#cloudStatusValue").val(jsonObj.CRdy); //store value
                        var status = convertCloudStatusValue(jsonObj.CRdy, selCloudMask);
                        _$Panel.find("#inpCloudStatus").val(status);
                        //updateDeleteCloudSettingBtn(status);
                    }
                };
                this.refreshPanelData = function(jsonObj){//just update data, no #selCloud change tirgger
                    var selCloudMask = _$Panel.find("#selCloud").val();
                    _$Panel.find("#cloudStatusValue").val(jsonObj.CRdy); //store value
                    var status = convertCloudStatusValue(jsonObj.CRdy, selCloudMask);
                    _$Panel.find("#inpCloudStatus").val(status);
                };
                var slideTo = function(index){
                    _cloudAuthModal.find("#cloudAuthCarousel").carousel(index);
                    _cloudAuthModal.find('#cloudAuthCarousel').carousel({interval: false, pause:'hover'});
                };
                var handleAuthenticateClick = function(){
                    _$Panel.find("#btnCloudAuthenticate").click(function(){
                        //check if cloud setting exists
                        var statusValue = _$Panel.find("#cloudStatusValue").val();
                        var serviceIndex = _$Panel.find("#selCloud").val();
                        var cloudArray = Advantech.Utility.convertMaskToArray(statusValue, Advantech.Profile.CloudServiceVenderEmun.EmunUsefulLength);
                        if(cloudArray[serviceIndex] != undefined && cloudArray[serviceIndex] == 1){
                            $("#cloudConfirmModal #cloudConfirmModalLabel").text("Cloud Setting Confirm");
                            $("#cloudConfirmModal #cloudConfirmContext").html("<i class='fa fa-fw fa-warning'></i>Previous setting is found! Please choose how to start service:");
                            $("#cloudConfirmModal").modal("show");
                            $("#cloudConfirmModal #btnCloudNewSetting").one("click", handleCloudServiceSetting);
                            $("#cloudConfirmModal #btnCloudOldSetting").one("click",startCloudServiceWithOldSetting);
                        }else{
                            handleCloudServiceSetting();
                        }
                    });
                };
                var startCloudServiceWithOldSetting = function(){
                    var serviceVenderCode = Number(_$Panel.find("#selCloud").val());
                    httpGetOperation(HTTP_PATCH,
                                URL_CLOUD_CONFIG,
                                function(){
                                    if($.isFunction(_Self.onCloudStatusRefreshSubmitted())) {
                                        _Self.onCloudStatusRefreshSubmitted()(this, null);
                                    }
                                },
                                function(){
                                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error code: 400", "<i class='fa fa-fw fa-exclamation-triangle'></i> Error when getting Cloud URL" , null);
                                },
                                JSON.stringify({Sel:serviceVenderCode}), 45000);
                    $("#cloudConfirmModal").modal("hide");
                };
                var handleCloudServiceSetting = function(){
                    slideTo(0);
                    var serviceVenderCode = Number(_$Panel.find("#selCloud").val());
                    var serviceVenderURL =  _$Panel.find("#selCloud").find("option:selected").attr("data-server");
                    if(serviceVenderURL){
                       cloudWindowId = window.open(serviceVenderURL, '', config='height=500,width=530');
                       _cloudAuthModal.modal('show');

                       _cloudAuthModal.find("#carouselBtnNext").one("click",function(){
                            slideTo(1);
                       });

                       _cloudAuthModal.find("#carouselBtnSubmit").one("click",function(){
                            httpGetOperation(HTTP_PATCH,
                                URL_CLOUD_CONFIG,
                                function(){
                                    slideTo(2);
                                    if($.isFunction(_Self.onCloudStatusRefreshSubmitted())) {
                                        _Self.onCloudStatusRefreshSubmitted()(this, null);
                                    }
                                    try{cloudWindowId.close();}catch(e){}
                                },
                                function(status, msg, apiErrorCode, jsonMsg){
                                    var apiErrorName = Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] || "";
                                    if(typeof(Advantech.Profile.DeviceEmun[module].isErrorCodeJsonFormat) != 'undefined' &&
                                            Advantech.Profile.DeviceEmun[module].isErrorCodeJsonFormat){
                                        var apiErrorName = Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] || "";
                                        _cloudAuthModal.find('#cloudSettingErrorDesc').text(apiErrorName);
                                    }
                                    slideTo(3);
                                    _cloudAuthModal.find('#btnBack').one('click',function(){
                                        _cloudAuthModal.modal('hide');
                                    });
                                    try{cloudWindowId.close();}catch(e){}
                                },
                                JSON.stringify({Code:_cloudAuthModal.find("#inpCode").val(), Sel:serviceVenderCode}), 45000);
                        });
                    }
                    else{
                        Advantech.Form.MessageForm.getInstance().showMessageBox("Error code: 400", "<i class='fa fa-fw fa-exclamation-triangle'></i> Error when getting Cloud URL" , null);
                    }
                    $("#cloudConfirmModal").modal("hide");
                };
                var handleRefreshCloudStatusClick = function(){
                    _$Panel.find("#btnRefreshCloudStatus").click(function(e){
                        e.preventDefault();
                        if($.isFunction(_Self.onCloudStatusRefreshSubmitted())) {
                            _Self.onCloudStatusRefreshSubmitted()(this, null);
                        }
                    });
                };
                var handleDeleteCloudSettingClick = function(){//delete specific cloud setting
                    _$Panel.find("#btnDeleteCloudSetting").click(function(e){
                        e.preventDefault();
                        var serviceIndex = _$Panel.find("#selCloud").val();
                        $("#CommonConfirmModal #confirmModalLabel").text("Clear Setting Confirm");
                        $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>Setting will be erased! Are you sure keep going?");
                        $("#CommonConfirmModal").modal("show");
                        $("#CommonConfirmModal #btnCommonConfirm").one("click", handleCloudServiceDelete);
                    });
                };
                var handleCloudDisableClick = function(){
                    _$Panel.find("#btnCloudDisableSubmit").click(function(e){
                        if($.isFunction(_Self.onCloudSettingDisableSubmitted())) {
                            var status = Number(_$Panel.find("#selCloud").val());
                            _Self.onCloudSettingDisableSubmitted()(this, {Sel:status});
                        }
                    });
                };
                var handleCloudServiceDelete = function(){
                    if($.isFunction(_Self.onCloudSettingDeleteSubmitted())) {
                            var serviceVenderCode = Number(_$Panel.find("#selCloud").val());
                            _Self.onCloudSettingDeleteSubmitted()(this, {Code:"", Sel:0});
                    }
                    $("#CommonConfirmModal").modal("hide");
                };
                var updateDeleteCloudSettingBtn = function(status){
                    if(status == "Ready"){
                        _$Panel.find("#btnDeleteCloudSetting").show();
                    }else{
                        _$Panel.find("#btnDeleteCloudSetting").hide();
                    }
                };
                var convertCloudStatusValue = function(readyMask, selectMask){
                    if(readyMask & selectMask)
                        return "Ready";
                    else
                        return "Not Ready";
                };
                var handleCloudServiceSelect = function(selectId){
                    var $selCloud = $("#"+_Self.getPanelId()+" #"+selectId);
                    $selCloud.change(function(){
                        var statusValue = _$Panel.find("#cloudStatusValue").val();
                        var index = $selCloud.val();
                        var status = convertCloudStatusValue(statusValue, index);
                        _$Panel.find("#inpCloudStatus").val(status);
                        updateDeleteCloudSettingBtn(status);
                        if(index == Advantech.Profile.CloudServiceVenderEmun.PrivateServer){
                            _$Panel.find("#panelCloudLinkStatus").hide();
                            _$Panel.find("#panelPrivateServer").show();
                            _$Panel.find("#panelCloudDisableStatus").hide();
                            _$Panel.find("#panelWebAccess").hide();
                            _$Panel.find("#selLogPauth").trigger("change");
                        }else if(index == Advantech.Profile.CloudServiceVenderEmun.WebAccess){
                            _$Panel.find("#panelCloudLinkStatus").hide();
                            _$Panel.find("#panelPrivateServer").hide();
                            _$Panel.find("#panelCloudDisableStatus").hide();
                            _$Panel.find("#panelWebAccess").show();
                            //get WebAccess setting
                            if(mWebAccessPanelId != null) {
                                mWebAccessPanelId.refreshWebAccessStatus()();
                            }
                        }else if(index == Advantech.Profile.CloudServiceVenderEmun.Dropbox || index==Advantech.Profile.CloudServiceVenderEmun.Baidu){
                            _$Panel.find("#panelCloudLinkStatus").show();
                            _$Panel.find("#panelPrivateServer").hide();
                            _$Panel.find("#panelCloudDisableStatus").hide();
                            _$Panel.find("#panelWebAccess").hide();
                            //get dropBox setting
                            if($.isFunction(_Self.onCloudStatusRefreshSubmitted())) {
                                _Self.onCloudStatusRefreshSubmitted()(this, null);
                            }
                        }else{
                            _$Panel.find("#panelCloudLinkStatus").hide();
                            _$Panel.find("#panelPrivateServer").hide();
                            _$Panel.find("#panelWebAccess").hide();
                            _$Panel.find("#panelCloudDisableStatus").show();
                        }
                    });
                };
                this.initialPanel = function() {
                    try {
                        _$Panel = $("#"+_Self.getPanelId());
                        handleAuthenticateClick();
                        handleCloudServiceSelect("selCloud");
                        handleRefreshCloudStatusClick();
                        handleDeleteCloudSettingClick();
                        handleCloudDisableClick();
                    } catch (ex) {
                        alert("CloudConfigPanel:" + ex);
                    }
                };

                this.onCloudAuthenticateClick = function(x) {
                    if(!arguments.length) return _onCloudAuthenticateClick;
                    _onCloudAuthenticateClick = x;
                };
                this.onGetAuthenticatedReslut = function(x) {
                    if(!arguments.length) return _onGetAuthenticatedReslut;
                    _onGetAuthenticatedReslut = x;
                };
                this.onCloudStatusRefreshSubmitted = function(x) {
                    if(!arguments.length) return _onCloudStatusRefreshSubmitted;
                    _onCloudStatusRefreshSubmitted = x;
                };
                this.onCloudSettingDeleteSubmitted = function(x) {
                    if(!arguments.length) return _onCloudSettingDeleteSubmitted;
                    _onCloudSettingDeleteSubmitted = x;
                };
                this.onCloudSettingDisableSubmitted = function(x) {
                    if(!arguments.length) return _onCloudSettingDisableSubmitted;
                    _onCloudSettingDisableSubmitted = x;
                };
            },

            PrivateServerConfigPanel: function(panelId) {
                var _onDataLogPrivateServerSubmitted = null;
                var mContextContainerId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function() {
                    handleInputChange("selLogPauth");
                    handleSubmitted();
                };
                var handleInputChange = function(selectId){
                    var $selMd = $("#"+_Self.getPanelId()+" #"+selectId);
                    $selMd.change(function(){
                        //for authentication type selection
                        var val = $(this).val();
                        var $currentOption = $(this).find("option[value='"+val+"']");
                        if(Boolean(Number($currentOption.attr('data-isShow')))){
                            $("#"+_Self.getPanelId()).find($currentOption.attr('data-target')).show();
                        }else{
                            $("#"+_Self.getPanelId()).find($currentOption.attr('data-target')).hide();
                        }
                    });
                };
                var handleSubmitted = function(){
                    $("#" + _Self.getPanelId() + " #btnPrivateServerSubmit").click(function() {
                        if($.isFunction(_Self.onDataLogPrivateServerSubmitted())) {
                            _Self.onDataLogPrivateServerSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                };
                this.setPanel = function(jsonObj) {
                    try{
                        $("#"+_Self.getPanelId()+" #logIP" ).val(jsonObj.IP);
                        $("#"+_Self.getPanelId()+" #logPWeb").val(jsonObj.PWeb);
                        $("#"+_Self.getPanelId()+" #logUurl").val(jsonObj.Uurl);
                        $("#"+_Self.getPanelId()+" #logDurl").val(jsonObj.Durl);
                        $("#"+_Self.getPanelId()+" #logSurl").val(jsonObj.Surl);
                        if(int(jsonObj.SSLEn) == 1)
                            $("#"+_Self.getPanelId()+" #RadioSslEnable").prop("checked", true);
                        else
                            $("#"+_Self.getPanelId()+" #RadioSslDisable").prop("checked", true);
                        $("#"+_Self.getPanelId()+" #selLogPauth" ).val(jsonObj.Pauth).trigger("change");
                        $("#"+_Self.getPanelId()+" #logPu" ).val(jsonObj.Pu);
                        $("#"+_Self.getPanelId()+" #logPw").val(jsonObj.Pw);
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };
                this.toJson = function() {
                    var obj = {};
                    obj['Sel'] = Number($("#CloudConfigPanel #selCloud").val());//cloud type selection
                    $("#" + _Self.getPanelId() + " input").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var type = this.type;
                            var id = this.id.slice(3);
                            if(type === "checkbox") {
                                obj[id] = (this.checked) ? 1 : 0;
                            }else if(type === "number" || $(this).hasClass("isNumericType")) {
                                obj[id] = Number($(this).val());
                            }else if(type == "radio"){
                                obj['SSLEn'] = $("#" + _Self.getPanelId() + ' #RadioSslDisable').prop("checked")?0:1;
                            }else{
                                obj[id] = $(this).val();
                            }
                        }
                    });
                    $("#" + _Self.getPanelId() + " select").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var id = this.id.slice(6);
                            obj[id] = Number($(this).val());
                        }
                    });
                    return obj;
                };

                this.onDataLogPrivateServerSubmitted = function(x) {
                    if(!arguments.length) return _onDataLogPrivateServerSubmitted;
                    _onDataLogPrivateServerSubmitted = x;
                };
            },

            WebAccessConfigPanel: function(panelId) {
                var _onWebAccessCloudSubmitted = null;
                var _refreshWebAccessStatus = null;
                var mContextContainerId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function() {
                    handleSubmitted();
                };
                var handleSubmitted = function(){
                    $("#" + _Self.getPanelId() + " #btnWebAccessSubmit").click(function() {
                        if($.isFunction(_Self.onWebAccessSubmitted())) {
                            _Self.onWebAccessSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                };
                this.setPanel = function(jsonObj) {
                    try{
                        $("#"+_Self.getPanelId()+" #Nm" ).val(jsonObj.Nm);
                        $("#"+_Self.getPanelId()+" #PWeb").val(jsonObj.PWeb);
                        $("#"+_Self.getPanelId()+" #PNm").val(jsonObj.PNm);
                        $("#"+_Self.getPanelId()+" #NNm").val(jsonObj.NNm);
                        $("#"+_Self.getPanelId()+" #HbF").val(jsonObj.HbF);
                        if(int(jsonObj.SSLEn) == 1)
                            $("#"+_Self.getPanelId()+" #waSslEnable").prop("checked", true);
                        else
                            $("#"+_Self.getPanelId()+" #waSslDisable").prop("checked", true);
                        $("#"+_Self.getPanelId()+" #Pu" ).val(jsonObj.Pu);
                        $("#"+_Self.getPanelId()+" #Pw").val(jsonObj.Pw);
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };
                this.toJson = function() {
                    var obj = {};
                    obj['Sel'] = Number($("#CloudConfigPanel #selCloud").val());//cloud type selection
                    $("#" + _Self.getPanelId() + " input").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var type = this.type;
                            var id = this.id;//this.id.slice(3);
                            if(type === "checkbox") {
                                obj[id] = (this.checked) ? 1 : 0;
                            }else if(type === "number" || $(this).hasClass("isNumericType")) {
                                obj[id] = Number($(this).val());
                            }else if(type == "radio"){
                                obj['SSLEn'] = $('#waSslDisable').prop("checked")?0:1;
                            }else{
                                obj[id] = $(this).val();
                            }
                        }
                    });
                    return obj;
                };

                this.refreshWebAccessStatus = function(x) {
                    if(!arguments.length) return _refreshWebAccessStatus;
                    _refreshWebAccessStatus = x;
                };
                this.onWebAccessSubmitted = function(x) {
                    if(!arguments.length) return _onWebAccessCloudSubmitted;
                    _onWebAccessCloudSubmitted = x;
                };
            },

            PasswordChangeModal: function(modalId) {
                var _onPasswordChangedSuccess = null;
                var mContextPanelId = modalId;
                var _Self = this;

                this.getModalId = function() {
                    return mContextPanelId;
                };

                this.initialModal = function() {
                    $('#' + _Self.getModalId()).on('hide.bs.modal', function(event) {
                        var modal = $(this);
                        modal.find('#btnPw').unbind("click");
                    });
                    $('#' + _Self.getModalId()).on('show.bs.modal', function(event) {
                        var button = $(event.relatedTarget); // Button that triggered the modal
                        var userCode = button.data('user');
                        var userName = Advantech.Profile.PasswordChangeTypeEmun[userCode];
                        var modal = $(this);
                        modal.find("input").val("");
                        modal.find('.modal-title').text('Change ' + userName + ' Password');
                        modal.find('#btnPw').bind("click", function() {
                            var oldPassword = modal.find("#inpOldPassword").val();
                            var password = modal.find("#inpNewPassword").val();
                            var confirm = modal.find("#inpConfirm").val();
                            var length = password.length;
                            if(password === confirm) {
                                var val = encapsulatedPassword(userCode, length, password, oldPassword);
                                if($.isFunction(_Self.onPasswordChangedSuccess())) {
                                    _Self.onPasswordChangedSuccess()(this, {
                                        Pw: val
                                    });
                                }
                                modal.modal('hide');
                            }else{
                                Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>New Password Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>The new password existed error! Please try again.<h5>");
                                modal.find("input").val("");
                            };

                        });
                    });
                };

                var encapsulatedPassword = function(userCode, length, password, oldPassword) {
                    var s = [],
                        r = "";
                    s.push(userCode.charCodeAt(0));
                    s.push(int(length));
                    for (var i = 0; i < 8; ++i) {
                        if(password[i] != undefined) {
                            s.push(password[i].charCodeAt(0));
                        }else{
                            s.push(0x20);
                        }
                    }
                    for (var i = 0; i < 8; ++i) {
                        if(oldPassword[i] != undefined) {
                            s.push(oldPassword[i].charCodeAt(0));
                        }else{
                            s.push(0x20);
                        }
                    }
                    for (var i = 0; i < s.length; ++i) {
                        r += Advantech.Utility.formatNumberLength(Advantech.Utility.xor(s[i], 0x3F).toString(16), 2);
                    }
                    return r.toUpperCase();
                };

                this.onPasswordChangedSuccess = function(x) {
                    if(!arguments.length) return this._onPasswordChangedSuccess;
                    this._onPasswordChangedSuccess = x;
                };
            },


            GeneralConfigPanel: function(panelId) {
                var _onGeneralConfigSubmitted = null;
                var mContextPanelId = panelId;
                var _Self = this;
                var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
                var isSupportBatteryLifeCalc = Boolean(profile.FCS & Advantech.Profile.FCSMask.BatteryLifeCalc);
                this.getPanelId = function() {
                    return mContextPanelId;
                };

                this.initialPanel = function() {
                    try {
                        $("#" + _Self.getPanelId() + " button").click(function(e) {
                            e.preventDefault();
                            var type = $(this).attr('id').slice(3);
                            if($(this).hasClass("isSWType")){
                                if(type == 'PollingRate'){
                                    Advantech.Profile.Parameter.POLLING_RATE = $("#" + _Self.getPanelId() + " #inp" + type).val();
                                }
                            } else if ($(this).hasClass("isTmFType")) {
                                var jsonObj = {};
                                if (type == "IntialTmF") {
                                    jsonObj.TmF = 1;
                                } else {
                                    jsonObj.TmF = 0;
                                }
                                if($.isFunction(_Self.onGeneralConfigSubmitted())) {
                                    _Self.onGeneralConfigSubmitted()(this, jsonObj);
                                }
                            }else{
                                var jsonObj = {};
                                $("#" + _Self.getPanelId() + " #inp" + type).each(function() {
                                    if(!$(this).hasClass("isSWType")){
                                        jsonObj[type] = (this.type == 'checkbox') ? ((this.checked) ? 1 : 0) : int($(this).val());
                                    }
                                });
                                if($.isFunction(_Self.onGeneralConfigSubmitted())) {
                                    _Self.onGeneralConfigSubmitted()(this, jsonObj);
                                }
                            }
                        });
                    } catch (ex) {
                        alert("GeneralConfigPanel:" + ex);
                    }
                };

                this.onGeneralConfigSubmitted = function(x) {
                    if(!arguments.length) return _onGeneralConfigSubmitted;
                    _onGeneralConfigSubmitted = x;
                };

                this.setGeneralConfig = function(jsonObj) {
                    try{
                        $("#" + _Self.getPanelId() + " #inpPollingRate").val(Advantech.Profile.Parameter.POLLING_RATE);
                        for (var prop in jsonObj) {
                            if (prop == 'BVer' && !isSupportBatteryLifeCalc) {
                                $('#' + _Self.getPanelId() + ' #lowBatterySetting').show();
                            }
                            if (isSupportBatteryLifeCalc) {
                                $('#' + _Self.getPanelId() + ' #batteryLifeCalc').show();
                                $('#' + _Self.getPanelId() + ' #inpBatteryLifeCount').val(((jsonObj.TmF == 0) ? "Disable" : "Enable"));
                            }
                            $element = $("#" + _Self.getPanelId() + " #inp" + prop);
                            if($element.length > 0) {
                                if($element[0].type === 'checkbox') {
                                    $element.attr("checked", int(jsonObj[prop]) == 1 ? true : false);
                                }else{
                                    $element.val(jsonObj[prop]);
                                }
                            }
                        }
                    }catch(e){
                        throw new Error("Setting GeneralConfig panel failed.");
                    }
                };
            },
        },
        SystemForm: {
            ControlCommanPanel: function(panelId) {
                var _onSystemRestartClick = null;
                var _onModuleLocateClick = null;
                var _onRestoreDefaultsClick = null;
                var _onDownloadProcessClick = null;
                var _onRestPasswordClick = null;
                var mContainerId = panelId;
                var mLocateStatus = false;
                var _Self = this;

                var getLocateStatus = function() {
                    return mLocateStatus;
                };

                var setLocateStatus = function(status) {
                    mLocateStatus = status;
                    $("#" + _Self.getContainerId() + " #inpLc").val(getLocateStatus() ? "Enabled" : "Disabled");
                };

                this.getContainerId = function() {
                    return mContainerId;
                };

                this.initialPanel = function() {
                    initialEventHandle();
                };

                var initialEventHandle = function() {
                    $("#" + _Self.getContainerId() + " #btnRPw").click(function() {
                        if($.isFunction(_Self.onRestPasswordClick())) {
                            _Self.onRestPasswordClick()(this, {
                                RPw: 1
                            });
                        }
                    });

                    $("#" + _Self.getContainerId() + " #btnLc").click(function() {
                        if($.isFunction(_Self.onModuleLocateClick())) {
                            var status = getLocateStatus();
                            setLocateStatus(!status);
                            _Self.onModuleLocateClick()(this, {
                                Lc: (getLocateStatus()) ? 1 : 0
                            });
                        }
                        if(getLocateStatus()){
                            $(this).find(".fa").removeClass("fa-toggle-off").addClass("fa-toggle-on");
                        }else{
                            $(this).find(".fa").removeClass("fa-toggle-on").addClass("fa-toggle-off");
                        }
                    });
                    $("#" + _Self.getContainerId() + " #btnRFD").click(function() {
                        if($.isFunction(_Self.onRestoreDefaultsClick())) {
                            _Self.onRestoreDefaultsClick()(this, {
                                RFD: 1
                            });
                        }
                    });
                    $("#" + _Self.getContainerId() + " #btnRst").bind("click", function() {
                        if($.isFunction(_Self.onSystemRestartClick())) {
                            _Self.onSystemRestartClick()(this, {
                                Rst: 1
                            });
                        }
                    });
                };

                this.onModuleLocateClick = function(x) {
                    if(!arguments.length) return _onModuleLocateClick;
                    _onModuleLocateClick = x;
                };

                this.onRestoreDefaultsClick = function(x) {
                    if(!arguments.length) return _onRestoreDefaultsClick;
                    _onRestoreDefaultsClick = x;
                };

                this.onRestPasswordClick = function(x) {
                    if(!arguments.length) return _onRestPasswordClick;
                    _onRestPasswordClick = x;
                };
                this.onSystemRestartClick = function(x) {
                    if(!arguments.length) return _onSystemRestartClick;
                    _onSystemRestartClick = x;
                };
            },
            LocalTimeConfigPanel: function(panelId) {
                var _onLocalTimeSubmitted = null;
                var _onTimeZoneSubmitted = null;
                var _onCurrentTimeRefreshedSubmitted = null;
                var mContextPanelId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextPanelId;
                };

                this.initialPanel = function() {
                    try {
                        $("#" + _Self.getPanelId() + " #btnTm").click(function(e) {
                            e.preventDefault();
                            $("#inpDatetimepicker").collapse(true);
                            var obj = _Self.getTimeZoneObj();
                            var toIntToStr = Advantech.Utility.formatNumberLength;
                            var date = $("#inpDatetimepicker").val();
                            if(date !== "") {
                                if(obj.TZHr > 0) {
                                    date += "+";
                                    date += toIntToStr(obj.TZHr, 2);
                                }else if(obj.TZHr === 0) {
                                    date += "-00";
                                }else{
                                    //date += toIntToStr(obj.TZHr, 2);
                                    var Hr = -obj.TZHr;
                                    date += "-" + toIntToStr(Hr, 2);
                                }
                                if(obj.TZMn < 0) {//use TZHr to decide + or -
									obj.TZMn = -obj.TZMn;
								}
                                date += ":" + toIntToStr(obj.TZMn, 2);
                                if($.isFunction(_Self.onLocalTimeSubmitted())) {
                                    _Self.onLocalTimeSubmitted()(this, {
                                        Tm: date
                                    });
                                }
                            }
                        });
                        $("#" + _Self.getPanelId() + " #inpDatetimepicker").datetimepicker({});

                        $("#" + _Self.getPanelId() + " #btnTZ").click(function(e) {
                            e.preventDefault();
                            if($.isFunction(_Self.onTimeZoneSubmitted())) {
                                _Self.onTimeZoneSubmitted()(this, _Self.getTimeZoneObj());
                            }
                        });
                        $("#" + _Self.getPanelId() + " #btnRefreshTm").click(function(e) {
                            e.preventDefault();
                            if($.isFunction(_Self.onCurrentTimeRefreshedSubmitted())) {
                                _Self.onCurrentTimeRefreshedSubmitted()(this, null);
                            }
                        });
                    } catch (ex) {
                    }
                };

                this.getTimeZoneObj = function(text) {
                    var obj = {};
                    var str = "" + $("#" + _Self.getPanelId() + " option:selected").text();
                    obj.TZC = parseInt($("#" + _Self.getPanelId() + " option:selected").val(), 10);
                    if(str[4] === ')') {
                        obj.TZHr = 0;
                        obj.TZMn = 0;
                    }else{
                        obj.TZHr = parseInt(str.substr(4, 3), 10);
                        obj.TZMn = parseInt(str.substr(8, 2), 10);
                        if(obj.TZHr < 0)
                            obj.TZMn = -obj.TZMn;
                    }
                    return obj;
                }
                this.setTimeZone = function(jsonObj) {
                     try{
                        $("#" + this.getPanelId() + " option[value=" + jsonObj.TZC + "]").attr("selected", "selected");
                    }catch(e){
                        throw new Error("Set timezone data failed.");
                    }
                };

                this.setCurrentTime = function(jsonObj) {
                    try{
                        $("#" + this.getPanelId() + " #inpTm").val(jsonObj.Tm);
                    }catch(e){
                        throw new Error("Set current time data failed.");
                    }
                };

                /* used by DOW_To_Day() function */
                function is_leap(_y_){
                    return (((0==(_y_)%4 && 0!=(_y_)%100) || 0==(_y_)%400) ? 1 : 0)
                }

                /*--------------------------------------------------------------------------
                  @brief   transform Nth day of month from DOW and Nth week, for DST(daylight saving time) usage
                  @param   year: retrive from RTC
                           month: start from 1
                           DOW, NthWeek: from DST start/end setting (start from 1)
                           NthWeek: 1~6 (6:last week)
                  @return  Nth day of month
                  @note  : Sakamoto's Algorithm http://en.wikipedia.org/wiki/Calculating_the_day_of_the_week#Sakamoto.27s_algorithm
                           DST: daylight saving time
                           DOW: day of week (0~6 is Sun~Sat)
                --------------------------------------------------------------------------*/
                function DOW_To_Day(year, month, DOW, NthWeek){
                    var targetDate = 1; // assume the day of month is 1st
                    //transform 1st day to DOW (Sakamoto's Algorithm)
                    var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
                    var days_per_month = [
                        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                    ];

                    year -= (month < 3);
                    var tempDOW = int((year + year/4 - year/100 + year/400 + t[month-1] + targetDate) % 7);

                    while (tempDOW != DOW){
                        tempDOW = (tempDOW+1)%7;
                        targetDate++;
                    }
                    targetDate += (NthWeek-1)*7;
                    // calculate for NthWeek = 6
                    while(targetDate>days_per_month[is_leap(year)][month-1]){
                        targetDate -= 7;
                    }
                    return targetDate;
                }

                this.setDayLightSavingDesc = function(sysJson, dayLightSavingJson) {
                    try{
                        if(dayLightSavingJson.En == 0){
                            $("#" + this.getPanelId() + " #dayLightSavingDiv").hide();
                        }else{
                            var desc = "";
                            var desc1 = "Daylight Saving begins on ";
                            var desc2 = " and ends on ";
                            var desc3 = ". The clock offset is ";
                            var desc4 = " mins.";
                            var start_date, end_date;
                            var day;
                            var Tm = sysJson.Tm;

                            //set default value to prevent browser hangs if RTC error
                            if(Tm == "")
                                Tm = "1970-01-01T01:01:01+08:00";

                            //calculate DayLightSaving start date
                            start_date = new Date(Tm);//get year
                            if(isNaN(start_date.getTime())){
                                throw new Error("Daylight Saving Time Format Error.");
                            }
                            start_date.setMonth(dayLightSavingJson.MOs-1);//set month
                            //get day of month from DOW(day of week), month starts from 1
                            day = DOW_To_Day(start_date.getFullYear(), dayLightSavingJson.MOs, dayLightSavingJson.Ds, dayLightSavingJson.Ws);
                            start_date.setDate(day);//set day
                            start_date.setHours(dayLightSavingJson.Hs);
                            start_date.setMinutes(dayLightSavingJson.MIs);
                            desc = desc1 + start_date.toDateString() + " "+ start_date.getHours() + ":" + start_date.getMinutes() + desc2;

                            //calculate DayLightSaving end date
                            end_date = new Date(Tm);//get year
                            if(isNaN(end_date.getTime())){
                                throw new Error("Daylight Saving Time Format Error.");
                            }
                            end_date.setMonth(dayLightSavingJson.MOe-1);//set month
                            //get day of month from DOW(day of week), month starts from 1
                            day = DOW_To_Day(end_date.getFullYear(), dayLightSavingJson.MOe, dayLightSavingJson.De, dayLightSavingJson.We);
                            end_date.setDate(day);//set day
                            end_date.setHours(dayLightSavingJson.He);
                            end_date.setMinutes(dayLightSavingJson.MIe);

                            //If Start time > End time, displayed end year= (current year+1)
                            if(start_date.getTime() > end_date.getTime()){
                                end_date.setFullYear(end_date.getFullYear() + 1);
                                end_date.setMonth(dayLightSavingJson.MOe-1);//set month
                                //get day of month from DOW(day of week), month starts from 1
                                day = DOW_To_Day(end_date.getFullYear(), dayLightSavingJson.MOe, dayLightSavingJson.De, dayLightSavingJson.We);
                                end_date.setDate(day);//set day
                                end_date.setHours(dayLightSavingJson.He);
                                end_date.setMinutes(dayLightSavingJson.MIe);
                            }

                            desc += end_date.toDateString() + " "+ end_date.getHours() + ":" + end_date.getMinutes() + desc3 + dayLightSavingJson.Tm + desc4;
                            $("#" + this.getPanelId() + " #dayLightSavingDesc").html(desc);
                            $("#" + this.getPanelId() + " #dayLightSavingDiv").show();
                        }
                    }catch(e){
                        var desc;
                        if(typeof(e.message) != "undefined" && e.message != "")
                            desc = e.message;
                        else
                            desc = "Set Daylight Saving Desc failed.";
                        throw new Error(desc);
                    }
                };

                this.onTimeZoneSubmitted = function(x) {
                    if(!arguments.length) return _onTimeZoneSubmitted;
                    _onTimeZoneSubmitted = x;
                };
                this.onLocalTimeSubmitted = function(x) {
                    if(!arguments.length) return _onLocalTimeSubmitted;
                    _onLocalTimeSubmitted = x;
                };
                this.onCurrentTimeRefreshedSubmitted = function(x) {
                    if(!arguments.length) return _onCurrentTimeRefreshedSubmitted;
                    _onCurrentTimeRefreshedSubmitted = x;
                };
            },
            SNTPConfigPanel: function(panelId) {
                var _onSNTPConfigSubmitted = null;
                var mContextPanelId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextPanelId;
                };

                this.initialPanel = function() {
                    try {
                        var _Self = this;
                        $("#" + _Self.getPanelId() + " button").click(function(e) {
                            e.preventDefault();
                            var type = $(this).attr('id').slice(3);
                            var jsonObj = {};
                            if(type == "All") {
                                var selIndex = parseInt($("#" + _Self.getPanelId() + " #inpEnSNTP").val(), 10);
                                jsonObj["EnSNTP"] = selIndex;
                                $("#" + _Self.getPanelId() + " input:enabled").each((function() {
                                    var prop = $(this).attr('id').slice(3);
                                    if(this.type == 'checkbox') {
                                        jsonObj[prop] = int((this.checked) ? 1 : 0);
                                    }else if(this.type == 'number' || $(this).hasClass("isNumericType")) {
                                        jsonObj[prop] = parseInt($(this).val(), 10);
                                    }else{
                                        jsonObj[prop] = $(this).val();
                                    }
                                }));
                            }else{
                                $("#" + _Self.getPanelId() + " #inp" + type).each(function() {
                                    if(this.type == 'checkbox') {
                                        jsonObj[type] = int((this.checked === true) ? 1 : 0);
                                    }else if(this.type == 'number' || $(this).hasClass("isNumericType")) {
                                        jsonObj[type] = parseInt($(this).val(), 10);
                                    }else{
                                        jsonObj[type] = $(this).val();
                                    }
                                });
                            }
                            if(_Self.onSNTPConfigSubmitted() !== null) {
                                _Self.onSNTPConfigSubmitted()(this, jsonObj);
                            }
                        });
                    } catch (ex) {
                        alert("SNTPPanel:" + ex);
                    }
                };

                this.textToTimeZoneObj = function(text) {
                    var obj = {};
                    var str = "" + text;
                    if(str[4] === ')') {
                        obj.TZHr = 0;
                        obj.TZMn = 0;
                    }else{
                        obj.TZHr = parseInt(str.substr(4, 3), 10);
                        obj.TZMn = parseInt(str.substr(8, 2), 10);
                    }
                    return obj;
                };
                this.setEnSNTPStatus = function(value) {

                };
                this.setNetWorkAppConfig = function(jsonObj) {
                    try{
                        $("#" + this.getPanelId() + " #inpSNTPI").val(jsonObj.SNTPI);
                        $("#" + this.getPanelId() + " #inpSNTP2").val(jsonObj.SNTP2);
                        $("#" + this.getPanelId() + " #inpSNTP1").val(jsonObj.SNTP1);
                        $("#" + this.getPanelId() + " #inpEnSNTP").val(jsonObj.EnSNTP).trigger("change");
                    }catch(e){
                        throw new Error("Set network app data failed.");
                    }
                };

                this.onSNTPConfigSubmitted = function(x) {
                    if(!arguments.length) return _onSNTPConfigSubmitted;
                    _onSNTPConfigSubmitted = x;
                };
            },
            FileUpgradePanel: function(panelId) {
                var _onUpgradeSubmitted = null;
                //var _onGroupConfigDownloadSubmitted = null;
                var mPanelId = panelId;
                var mTypeEmun = Advantech.Profile.UpgradeTypeEmun;
                var _Self = this;

                this.getPanelId = function() {
                    return mPanelId;
                };
                this.refreshPanel =function(){
                    $("#" + this.getPanelId() + " a[data-config=FileUpgrade]").trigger("click");
                }
                this.initialPanel = function() {
                    //handleDownloadGroupConfigClick();
                    $("#" + this.getPanelId() + " a[data-config=FileUpgrade]").click(function(e) {
                            e.preventDefault();
                            var url = $(this).attr('href');
                            var id = $(this).attr('id');
                            //Advantech.Utility.loadAjaxContent(id, url, this);
							Advantech.Utility.loadAjaxContent(id, url, this, null, true);
                    });
                    if((Advantech.Utility.isIE() > 10 || !Advantech.Utility.isIE())
                        && !Advantech.Utility.isSafari()
                        && !Advantech.Utility.isIPhone()
                        && !Advantech.Utility.isIPad()
                        && !Advantech.Utility.isAndroid()){
                       eventHandle();
                        $("#" + _Self.getPanelId() + " input").each(function(){
                            var fileType = this.id.slice(3);
                            $("#" + _Self.getPanelId() + " #btn" + fileType).hide("slow");
                        });
                    }
                    else{
                        $("#" + _Self.getPanelId()).find(".panel-body").html("<br>"+
                                                                            "<br>"+
                                                                            "<br>"+
                                                                            "<br>"+
                                                                            "<br>"+
                                                                            "<h3>"+
                                                                                "<i class='fa fa-fw fa-exclamation-triangle'></i>Upload function not be supported by this browser, browser version or platform. Suggest changing browser(<a href='https://www.google.com/chrome/'>Chrome</a>, <a href='https://mozilla.com/firefox/'>Firefox</a> or <a href='http://windows.microsoft.com/en-us/internet-explorer/download-ie'>Internet Explorer</a>(version 11 or above)) or PC to try again."+
                                                                            "</h3>"+
                                                                            "<br>"+
                                                                            "<br>"+
                                                                            "<br>"+
                                                                            "<br>"+
                                                                            "<br>"+
                                                                            "<br>");
                    }

                };

                var eventHandle = function() {
                    $("#" + _Self.getPanelId() + " .fileinput-submit").click(function(event) {
                        event.preventDefault();
                        var fileType = this.id.slice(3);
                        var element = $("#" + _Self.getPanelId() + " #inp" + fileType)[0];
                        var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
                        var size = Advantech.Utility.getFileSize(element);
                        var hiddenForm = document.createElement("form");
                        var uploadTypeCode =  mTypeEmun[fileType].code;
                        element.name = "file";
                        hiddenForm.id = "hiddenMultipartForm";
                        hiddenForm.style = "display:none;"
                        var $hiddenForm = $(hiddenForm);
                        if(size != null){
                            $hiddenForm.append("<input type='hidden' name='length' value='" + size + "'></input>");
                        }
                        if(profile.length > 1 && uploadTypeCode == 0){
                            $("#CommonConfirmModal #confirmModalLabel").text("Upload Target Selection");
                            $("#CommonConfirmModal #confirmContext").html("<h5>Select Target:</h5>");
                            var $select = $("<select id = 'selTarget' class='form-control'></select>");
                            for(var i = 0; i < profile.length; ++i){
                                if(profile[i].SL == 0){
                                    $select.append("<option value='0'>Slot 0</option>");
                                }
                                else if(profile[i].Id !=""){
                                    $select.append("<option value='"+(Number(profile[i].SL)+5)+"'>Slot "+profile[i].SL+"</option>");
                                }
                            }
                            $("#CommonConfirmModal #confirmContext").append($select);
                            $("#CommonConfirmModal").modal("show");
                            $("#CommonConfirmModal #btnCommonConfirm").one("click", function(){
                                uploadTypeCode += Number($select.val());
                                $hiddenForm.append("<input type='hidden' name='type' value='" + uploadTypeCode + "'></input>");
                                $hiddenForm.append(element);
                                $hiddenForm.append("<input type='submit'></input>");
                                if($.isFunction(_Self.onUpgradeSubmitted())) {
                                    _Self.onUpgradeSubmitted()(this, {
                                        file: element.files[0],
                                        length: size,
                                        type: uploadTypeCode,
                                        form: $hiddenForm
                                    });
                                }
                                $("#CommonConfirmModal").modal("hide");
                            });
                        }else{
                            if(uploadTypeCode ==4 &&
                                    ($("#" + _Self.getPanelId() + " #groupConfigIpSettingBtn").text() == 'Without IP Settings ')){
                                uploadTypeCode = 10;
                            }
                            $hiddenForm.append("<input type='hidden' name='type' value='" + uploadTypeCode + "'></input>");
                            $hiddenForm.append(element);
                            $hiddenForm.append("<input type='submit'></input>");
                            if($.isFunction(_Self.onUpgradeSubmitted())) {
                                _Self.onUpgradeSubmitted()(this, {
                                    file: element.files[0],
                                    length: size,
                                    type: uploadTypeCode,
                                    form: $hiddenForm
                                });
                            }
                        }

                    });
                    $("#" + _Self.getPanelId() + " input").change(function(event) {
                        var fileType = this.id.slice(3);
                        var fileCode = mTypeEmun[fileType].code;
                        if(isValidFile($(this)[0], fileCode)) {
                            $("#" + _Self.getPanelId() + " #btn" + fileType).show("slow");
                        }else{
                            $("#" + _Self.getPanelId() + " #btn" + fileType).hide("slow");
                        }

                    });
                };

                this.onUpgradeSubmitted = function(x) {
                    if(!arguments.length) return _onUpgradeSubmitted;
                    _onUpgradeSubmitted = x;
                };
/*                this.onGroupConfigDownloadSubmitted = function(x) {
                    if(!arguments.length) return _onGroupConfigDownloadSubmitted;
                    _onGroupConfigDownloadSubmitted = x;
                };

                function handleDownloadGroupConfigClick(){
                    $("#" + _Self.getPanelId() + " #btnDldGroupConfig").click(function(e){
                        e.preventDefault();
                        if($.isFunction(_Self.onGroupConfigDownloadSubmitted())) {
                            _Self.onGroupConfigDownloadSubmitted()(this, null);
                        }
                    });
                }*/

                function isValidFile(element, type) {
                    var fileName = "";
                    if(window.File && window.FileReader && window.FileList && window.Blob) {
                        var files = element.files;
                        if(!files.length) {
                            return false;
                        }
                        fileName = files[0].name;
                    }else{
                        fileName = element.value;
                    }
                    switch (type) {
                        case 0:
                            if(/\.bin$/i.test(fileName)) {
                                return true;
                            }
                            break;
                        case 1:
                            if(/\.ehf$/.test(fileName)) {
                                return true;
                            }
                            break;
                        case 2:
                            if(/\.ehf$/.test(fileName)) {
                                return true;
                            }
                            break;
                        case 3:
                            if(/\.js$/.test(fileName)) {
                                return true;
                            }
                            break;
                        case 4:
                            if(/\.cfg$/.test(fileName)) {
                                return true;
                            }
                            break;
                        case 5:
                            //if( /\.xml$/.test(files[0].name)) {
                            return true;
                            //}
                            break;
                        default:
                            break;
                    }
                    alert('Invalid file.');
                    return false;
                };
            },

            IModbusLengthCalculator: function() {
                this.calculateLength = function(bas, length) {
                    throw new Error("Not implement calculateLength");
                };
            },
            //Implement IModbusLengthCalculator
            ModbusAutoAllocateLengthCalculator: function() {
                this.calculateLength = function(bases, lens) {
                    if(Array.isArray(lens)) {
                        var sum = 0;
                        for (var i = 0; i < lens.length; ++i) {
                            sum += parseInt(lens[i], 10);
                        }
                        return sum;
                    }
                    return parseInt(lens, 10);
                };

            },
            //Implement IModbusLengthCalculator
            ModbusFixedLengthCalculator: function() {
                this.calculateLength = function(bases, lens, deltBasDiff) {
                    if(Array.isArray(bases)) {
                        var gap = parseInt(bases[1], 10) - parseInt(bases[0], 10);
                        len = gap * bases.length;
                        if(len < 0)
                            throw new Error("Invaild Data Source.");
                        return len;
                    }
                    return parseInt(lens, 10);
                };
            },

            ModbusLengthCalculatorFactory: function() {
                this.instanceModbusLengthCalculator = function(md) {
                    var mode = parseInt(md, 10);
                    if(mode === 0) {
                        return new Advantech.
                        Form.
                        SystemForm.
                        ModbusFixedLengthCalculator();
                    }else if(mode === 1) {
                        return new Advantech.
                        Form.
                        SystemForm.
                        ModbusAutoAllocateLengthCalculator();
                    }else{
                        throw new Error("Not exist this type.");
                    }
                };
            },

            //Implement IModbusAddressChangeSubject
            ModbusAddressConfigPanel: function(panelId, tagName) {
                var mContextContainerId = panelId;
                var mTagName = tagName;
                var mSlotTable = new Advantech.Form.SystemForm.ModbusConfigSlotInfoTable("table" + panelId, 5);
                var _onModbusBaseAddressChanged = null;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextContainerId;
                };

                this.getTagName = function() {
                    return mTagName;
                };

                this.onModbusBaseAddressChanged = function(x) {
                    if(!arguments.length) return _onModbusBaseAddressChanged;
                    _onModbusBaseAddressChanged = x;
                };

                this.initialPanel = function(containerId) {
                    var contextId = "panelContext" + this.getPanelId();
                    var modbusAddrConfigContainer = document.createElement('div');
                    modbusAddrConfigContainer.className = 'col-sm-6';
                    modbusAddrConfigContainer.id = this.getPanelId();
                    modbusAddrConfigContainer.innerHTML = "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                        "<h4>" + Advantech.Profile.ModbusTagEmun[this.getTagName()] + "</h4>" +
                        "</div>" +
                        "<div class='panel-body' id='" + contextId + "' >" +
                        "<div class='form-horizontal'>" +
                        "<div class='form-group'>" +
                        "<label class='col-sm-2 control-label'>Base</label>" +
                        "<div class='col-sm-4'>" +
                        "<input min='1' class='form-control isNumericType' id='bas" + this.getTagName() + "' type='number'>" +
                        "</div>" +
                        "<label class='col-sm-2 control-label'>Length</label>" +
                        "<div class='col-sm-4'>" +
                        "<input class='form-control isNumericType' type='number' id='len" + this.getTagName() + "' disabled>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    document.getElementById(containerId).appendChild(modbusAddrConfigContainer);
                    mSlotTable.initialTable(contextId);
                    $("#" + this.getPanelId() + " #bas" + this.getTagName()).change(
                        function() {
                            if($.isFunction(_Self.onModbusBaseAddressChanged())) {
                                _Self.onModbusBaseAddressChanged()(this, {
                                    Tag: _Self.getTagName(),
                                    Range: _Self.toRange()
                                });
                            }
                        }
                    );
                };
                this.toModbusBasJson = function() {
                    jsonObj = {};
                    if($("#" + this.getPanelId() + " .panel").hasClass("panel-success")) {
                        jsonObj[_Self.getTagName()] = _Self.getBase();
                    }
                    return jsonObj;
                };
                this.toRange = function() {
                    var from = this.getBase();
                    var to = from + this.getLength() - 1;
                    return new Advantech.Control.Range(from, to);
                };

                this.getBase = function() {
                    return parseInt($("#" + this.getPanelId() + " #bas" + this.getTagName()).val(), 10);
                };

                this.setBase = function(val) {
                    try{
                        $("#" + this.getPanelId() + " #bas" + this.getTagName()).val(val);
                    }catch(e){
                        throw new Error("Set "+this.getTagName()+" base data failed.");
                    }

                };

                this.getLength = function() {
                    return parseInt($("#" + this.getPanelId() + " #len" + this.getTagName()).val(), 10);
                };

                this.setLength = function(val) {
                    try{
                        $("#" + this.getPanelId() + " #len" + this.getTagName()).val(val);
                    }catch(e){
                        throw new Error("Set "+this.getTagName()+" len data failed.");
                    }
                };

                this.dataChanged = function(obj, e) {
                    if(e.Key === this.getTagName()) {
                        var base = e.Range.getFrom();
                        var delta = base - e.PreRange.getFrom();
                        //var len = e.Range.getTo()- base+1;
                        this.setBase(base);
                        //this.setLength(len);
                        mSlotTable.updateTable(delta);
                        if(e.IsChanged) {
                            this.setModified();
                        }
                    }
                };

                this.dataErrorOccurred = function(obj, e) {
                    if(e.targetKey === this.getTagName() || e.primalKey === this.getTagName()) {
                        this.setError();
                    }
                    if(e.primalKey === this.getTagName()) {
                        Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5>" + e.primalKey + " address has overlapped with " + e.targetKey + "." + "</h5>");
                    }
                };
                this.setModified = function() {
                    if(!$("#" + this.getPanelId() + " .panel").hasClass("panel-success")) {
                        $("#" + this.getPanelId() + " .panel").addClass("panel-success");
                    }
                };
                this.setError = function() {
                    $("#" + this.getPanelId() + " .panel").addClass("panel-danger");
                };

                this.clearError = function() {
                    $("#" + this.getPanelId() + " .panel").removeClass("panel-danger");
                };

                this.setModbusAddrPanel = function(bas, len) {
                    try{
                        $("#" + this.getPanelId() + " #bas" + this.getTagName()).val(bas);
                        $("#" + this.getPanelId() + " #len" + this.getTagName()).val(len);
                    }catch(e){
                        throw new Error("Set modbus "+this.getTagName()+" data failed.");
                    }
                };

                this.setModbusAddrTable = function(bases, lens) {
                    mSlotTable.setTable(bases, lens);
                };
            },

            ModbusConfigSlotInfoTable: function(tableId, slotNumber) {
                var mTableId = tableId;
                var mSlotNumber = slotNumber;
                this.getTableId = function() {
                    return mTableId;
                };

                this.getSlotNumber = function() {
                    return mSlotNumber;
                };
                this.initialTable = function(containerId) {
                    var modbusAddrConfigContainer = document.createElement('div');
                    modbusAddrConfigContainer.className = 'table-responsive';
                    modbusAddrConfigContainer.id = this.getTableId();
                    modbusAddrConfigContainer.innerHTML = "<table class='table'>" +
                        "<caption><h4>Slot Information</h4></caption>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Slot</th>" +
                        "<th>Base</th>" +
                        "<th>Length</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>";
                    document.getElementById(containerId).appendChild(modbusAddrConfigContainer);
                    for (var i = 0; i < this.getSlotNumber(); ++i) {
                        this.addRow(i);
                    }
                };
                this.addRow = function(index) {
                    var row = document.createElement('tr');
                    row.id = 'row' + index;
                    for (var i = 0; i < 3; ++i) {
                        var cell = row.insertCell(i);
                        if(i == 0) {
                            cell.innerHTML = index;
                        }else{
                            cell.innerHTML = 0;
                        }
                    }
                    $("#" + this.getTableId() + " tbody").append(row);
                };
                this.setTable = function(basArray, lenArray) {
                    for (var i = 0; i < basArray.length; ++i) {
                        $("#" + this.getTableId() + " tbody #row" + i).each(function() {
                            if(this.cells){
                                $(this.cells[1]).text(basArray[i]);
                                $(this.cells[2]).text(lenArray[i]);
                            }
                        });
                    }
                };
                this.updateTable = function(deltaDiffBas) {
                    $("#" + this.getTableId() + " tbody tr").each(function() {
                        if(this.cells){
                            var bas = parseInt($(this.cells[1]).text(), 10);
                            if(bas !== 0){
                                $(this.cells[1]).text(bas + deltaDiffBas);
                            }
                        }

                    });
                };
            },

            //Implement IModbusAddressChangeSubject
            ModbusAddressCommonConfigTable: function(tableId) {
                var mContextContainerId = tableId;
                var mTagNames = {};
                var _onModbusBaseAddressChanged = null;
                var _Self = this;
                var mLength = 0;
                this.getTableId = function() {
                    return mContextContainerId;
                };

                this.onModbusBaseAddressChanged = function(x) {
                    if(!arguments.length) return _onModbusBaseAddressChanged;
                    _onModbusBaseAddressChanged = x;
                };

                this.initialTable = function(containerId) {
                    var modbusAddrConfigContainer = document.createElement('div');
                    modbusAddrConfigContainer.className = 'col-sm-12';
                    modbusAddrConfigContainer.id = this.getTableId();
                    modbusAddrConfigContainer.innerHTML = "<table class='table'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Item</th>" +
                        "<th>Base Address</th>" +
                        "<th>Length</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>";
                    document.getElementById(containerId).appendChild(modbusAddrConfigContainer);
                };

                this.addRow = function(tagName) {
                    if(mTagNames[tagName] != undefined) {
                        return;
                    }
                    mLength++;
                    var row = document.createElement('tr');
                    row.id = 'row' + tagName;
                    for (var i = 0; i < 3; ++i) {
                        var cell = row.insertCell(i);
                        if(i == 0) {
                            cell.innerHTML = '<td>' + Advantech.Profile.ModbusTagEmun[tagName] + '</td>';
                        }else if(i == 1) {
                            cell.innerHTML = "<input type='number' min='1' max='9999' id ='bas" + tagName + "' value='0' class='form-control isNumericType'>";
                        }else{
                            cell.innerHTML = "<input type='number' id ='len" + tagName + "' value='0' class='form-control isNumericType' disabled>";
                        }
                    }
                    $("#" + _Self.getTableId() + " tbody").append(row);
                    $("#" + this.getTableId() + " #bas" + tagName).change(function() {
                        var value = this.value;
                        if(value > parseInt(this.max) || value < parseInt(this.min)){
                            var tag = this.id.slice(3);
                            _Self.setError(tag);
                            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Value not in range: "+ this.min + "~" + this.max, null);
                            return;
                        }
                        if($.isFunction(_Self.onModbusBaseAddressChanged())) {
                            _Self.onModbusBaseAddressChanged()(this, {
                                Tag: tagName,
                                Range: _Self.toRange(tagName)
                            });
                        }
                    });
                };
                this.toModbusBasJson = function() {
                    jsonObj = {};
                    $("#" + this.getTableId() + " tbody tr").each(function() {
                        if($(this).hasClass("success")) {
                            var tag = this.id.slice(3);
                            jsonObj[tag] = _Self.getBase(tag);
                        };
                    });
                    return jsonObj;
                };
                this.toRange = function(tagName) {
                    var from = this.getBase(tagName);
                    var to = from + this.getLength(tagName) - 1;
                    return new Advantech.Control.Range(from, to);
                };

                this.getBase = function(tagName) {
                    return parseInt($("#" + this.getTableId() + " #bas" + tagName).val(), 10);
                };

                this.setBase = function(tagName, val) {
                    try{
                        $("#" + this.getTableId() + " #bas" + tagName).val(val);
                    }catch(e){
                        throw new Error("Set modbus bas "+tagName+" data failed.");
                    }
                };

                this.getLength = function(tagName) {
                    return parseInt($("#" + this.getTableId() + " #len" + tagName).val(), 10);
                };

                this.setLength = function(tagName, val) {
                    try{
                        $("#" + this.getTableId() + " #len" + tagName).val(val);
                    }catch(e){
                        throw new Error("Set modbus len "+tagName+" data failed.");
                    }

                };

                this.dataChanged = function(obj, e) {
                    $("#" + this.getTableId() + " tbody tr").each(function() {
                        var tag = this.id.slice(3);
                        if(e.Key === tag) {
                            var base = e.Range.getFrom();
                            _Self.setBase(tag, base);
                            if(e.IsChanged) {
                                _Self.setModified(tag);
                            }
                        }
                    });
                };

                this.dataErrorOccurred = function(obj, e) {
                    $("#" + this.getTableId() + " tbody tr").each(function() {
                        var tag = this.id.slice(3);
                        if(e.targetKey === tag || e.primalKey === tag) {
                            _Self.setError(tag);
                        }
                        if(e.primalKey === tag) {
                            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5>" + e.primalKey + " has collision with " + e.targetKey + "." + "</h5>");
                        }
                    });
                };
                this.setModified = function(tagName) {
                    if(!$("#" + this.getTableId() + " #row" + tagName).hasClass("success")) {
                        $("#" + this.getTableId() + " #row" + tagName).addClass("success");
                    }
                };
                this.setError = function(tagName) {
                    $("#" + this.getTableId() + " #row" + tagName).addClass("danger");
                };

                this.clearError = function() {
                    $("#" + this.getTableId() + " .danger").removeClass("danger");
                };

                this.setModbusAddrRow = function(tagName, bas, len) {
                    try{
                        $("#" + this.getTableId() + " #bas" + tagName).val(bas);
                        $("#" + this.getTableId() + " #len" + tagName).val(len);
                    }catch(e){
                        throw new Error("Set modbus "+tagName+" data failed.");
                    }
                };
            },

            ModbusConfigPageController: function(containerId) {
                var SystemNameSpace = Advantech.Form.SystemForm;
                var modbusAddrDatas = new Advantech.Data.ModbusData.ModbusAddressDatas(); //ModbusAddressDatas
                var modbusCommonAddrTable = null;
                var modbusAddrPanels = {}; //ModbusAddressConfigPanel
                var lengthCalculator = null;
                var mContextContainerId = containerId;
                this.getContainerId = function() {
                    return mContextContainerId;
                };
                this.initialController = function(panelId, tableId, basObj, slotBasObj, slotLenObj) {
                    modbusCommonAddrTable = new SystemNameSpace.ModbusAddressCommonConfigTable(tableId)
                    if(basObj.Md === undefined) {
                        lengthCalculator = new SystemNameSpace.ModbusLengthCalculatorFactory().instanceModbusLengthCalculator(0);
                    }else{
                        lengthCalculator = new SystemNameSpace.ModbusLengthCalculatorFactory().instanceModbusLengthCalculator(basObj.Md);
                    }
                    var hasNotSlot = [];
                    for (var i in slotBasObj) {
                        var len = lengthCalculator.calculateLength(slotBasObj[i], slotLenObj[i]);
                        var bas = parseInt(basObj[i], 10);
                        var range = new Advantech.Control.Range(bas, (bas + len - 1));
                        modbusAddrDatas.appendData(i, range);
                        if($.isArray(slotBasObj[i])) {
                            modbusAddrPanels[i] = new SystemNameSpace.ModbusAddressConfigPanel(panelId + i, i);
                            modbusAddrPanels[i].initialPanel(this.getContainerId());
                            modbusAddrPanels[i].setModbusAddrPanel(bas, len);
                            modbusAddrPanels[i].setModbusAddrTable(slotBasObj[i], slotLenObj[i]);
                            modbusAddrDatas.subscribeDataChange(modbusAddrPanels[i]);
                            modbusAddrPanels[i].onModbusBaseAddressChanged((function(key) {
                                return function(obj, e) {
                                    $(".panel-danger").removeClass("panel-danger");
                                    modbusCommonAddrTable.clearError();
                                    modbusAddrDatas.setData(key, e.Range);
                                }
                            })(i));
                        }else{
                            hasNotSlot.push({
                                Tag: i,
                                Bas: bas,
                                Len: len
                            });
                        }
                    }
                    modbusCommonAddrTable.initialTable(this.getContainerId());
                    modbusAddrDatas.subscribeDataChange(modbusCommonAddrTable);
                    modbusCommonAddrTable.onModbusBaseAddressChanged(function(obj, e) {
                        modbusCommonAddrTable.clearError();
                        $(".panel-danger").removeClass("panel-danger");
                        modbusAddrDatas.setData(e.Tag, e.Range);
                    });
                    for (var i = 0; i < hasNotSlot.length; ++i) {
                        modbusCommonAddrTable.addRow(hasNotSlot[i].Tag);
                        modbusCommonAddrTable.setModbusAddrRow(hasNotSlot[i].Tag, hasNotSlot[i].Bas, hasNotSlot[i].Len);
                    }
                };

                this.setModbusPage = function(basObj, slotBasObj, slotLenObj, isForcingChange) {
                    if(basObj.Md === undefined) {
                        lengthCalculator = new SystemNameSpace.ModbusLengthCalculatorFactory().instanceModbusLengthCalculator(0);
                    }else{
                        lengthCalculator = new SystemNameSpace.ModbusLengthCalculatorFactory().instanceModbusLengthCalculator(basObj.Md);
                    }
                    var hasNotSlot = [];
                    for (var i in slotBasObj) {
                        var len = lengthCalculator.calculateLength(slotBasObj[i], slotLenObj[i]);
                        var bas = parseInt(basObj[i]);
                        if(isForcingChange){
                            if($.isArray(slotBasObj[i])) {
                                modbusAddrPanels[i].setModbusAddrPanel(bas, len);
                                modbusAddrPanels[i].setModbusAddrTable(slotBasObj[i], slotLenObj[i]);
                            }else{
                                hasNotSlot.push({
                                    Tag: i,
                                    Bas: bas,
                                    Len: len
                                });
                            }
                            for (var i = 0; i < hasNotSlot.length; ++i) {
                                modbusCommonAddrTable.setModbusAddrRow(hasNotSlot[i].Tag, hasNotSlot[i].Bas, hasNotSlot[i].Len);
                            }
                        }else{
                            var range = new Advantech.Control.Range(bas, bas + len - 1);
                            modbusAddrDatas.setData(i, range, false);
                        }
                    }
                };

                this.toModbusBasJson = function() {
                    var jsonObj = {};
                    var tempObj = null;
                    for (var i in modbusAddrPanels) {
                        var tempObj = modbusAddrPanels[i].toModbusBasJson();
                        if(tempObj !== null) {
                            for (var j in tempObj) {
                                jsonObj[j] = tempObj[j];
                            }
                        };
                    }
                    tempObj = modbusCommonAddrTable.toModbusBasJson();
                    for (var k in tempObj) {
                        jsonObj[k] = tempObj[k];
                    }
                    return jsonObj;
                }
            },
            ModbusModeConfigPanel: function(coilPanelId, regPanelId) {
                var _onModbudMdCoilSubmitted = null;
                var _onModbudMdRegSubmitted = null;
                this.mContextCoilPanelId = coilPanelId;
                this.mContextRegPanelId = regPanelId;
                var _Self = this;
                this.getCoilPanelId = function() {
                    return this.mContextCoilPanelId;
                };
                this.getRegPanelId = function() {
                    return this.mContextRegPanelId;
                };
                this.initialPanel = function() {
                    try {
                        $("#" + this.getCoilPanelId() + " #btnModbusModeCoilConfig").click(function(e) {
                            e.preventDefault();
                            if($.isFunction(_Self.onModbudMdCoilSubmitted()))
                                _Self.onModbudMdCoilSubmitted()(this, {
                                    Md: parseInt($("#" + _Self.getCoilPanelId() + " input[name=modbusType]:checked").val(), 10)
                                });
                        });
                        $("#" + this.getRegPanelId() + " #btnModbusModeRegConfig").click(function(e) {
                            e.preventDefault();
                            if($.isFunction(_Self.onModbudMdRegSubmitted()))
                                _Self.onModbudMdRegSubmitted()(this, {
                                    Md: parseInt($("#" + _Self.getRegPanelId() + " input[name=modbusType]:checked").val(), 10)
                                });
                        });
                    } catch (ex) {
                        alert("SlotInfoPanel:" + ex);
                    }
                };
                this.setModbusMdPanel = function(jsonObj) {
                    try{
                        $("#" + _Self.getCoilPanelId() + " input[value=" + jsonObj.Md + "]").prop('checked', true);
                        $("#" + _Self.getRegPanelId() + " input[value=" + jsonObj.Md + "]").prop('checked', true);
                    }catch(e){
                        throw new Error("Set modbus mode data failed.");
                    }
                };
                this.onModbudMdCoilSubmitted = function(x) {
                    if(!arguments.length) return _onModbudMdCoilSubmitted;
                    _onModbudMdCoilSubmitted = x;
                };
                this.onModbudMdRegSubmitted = function(x) {
                    if(!arguments.length) return _onModbudMdRegSubmitted;
                    _onModbudMdRegSubmitted = x;
                };
            },

            ModbusAddressConfigTab: function(tabId) {
                var mContextContainerId = tabId;
                var _onModbusCoilConfigSubmitted = null;
                var _onModbusRegConfigSubmitted = null;
                //var _onModbudMdSubmitted = null;
                var _onModbudMdCoilSubmitted = null;
                var _onModbudMdRegSubmitted = null;
                var mModbusCoilAddrConfig = null;
                var mModbusMdConfig = null;
                var mModbusRegAddrConfig = null;
                var _Self = this;
                this.getTabId = function() {
                    return mContextContainerId;
                };
                this.createTab = function(containerCoilAddrPanel, containerRegAddrPanel, containerMdInCoilPanel, containerMdInRegPanel) {
                    if(containerMdInCoilPanel !== undefined && containerMdInRegPanel !== undefined) {
                        mModbusMdConfig = new Advantech.Form.SystemForm.ModbusModeConfigPanel(containerMdInCoilPanel, containerMdInRegPanel);
                        mModbusMdConfig.initialPanel();
                        mModbusMdConfig.onModbudMdCoilSubmitted(function(obj, e) {
                            if($.isFunction(_Self.onModbudMdCoilSubmitted())) {
                                _Self.onModbudMdCoilSubmitted()(this, e);
                            }
                        });
                        mModbusMdConfig.onModbudMdRegSubmitted(function(obj, e) {
                            if($.isFunction(_Self.onModbudMdRegSubmitted())) {
                                _Self.onModbudMdRegSubmitted()(this, e);
                            }
                        });
                    }
                    mModbusCoilAddrConfig = new Advantech.Form.SystemForm.ModbusConfigPageController(containerCoilAddrPanel);
                    mModbusRegAddrConfig = new Advantech.Form.SystemForm.ModbusConfigPageController(containerRegAddrPanel);

                    $("#" + this.getTabId() + " #btnModbusCoilSubmit").click(function() {
                        if($.isFunction(_Self.onModbusCoilConfigSubmitted())) {
                            _Self.onModbusCoilConfigSubmitted()(this, mModbusCoilAddrConfig.toModbusBasJson());
                            $(".panel-success").removeClass('panel-success');
                            $(".success").removeClass("success");
                        }
                    });
                    $("#" + this.getTabId() + " #btnModbusRegSubmit").click(function() {
                        if($.isFunction(_Self.onModbusRegConfigSubmitted())) {
                            _Self.onModbusRegConfigSubmitted()(this, mModbusRegAddrConfig.toModbusBasJson());
                            $(".panel-success").removeClass("panel-success");
                            $(".success").removeClass("success");
                        }
                    });
                };
                this.initialCoilPage = function(basObj, slotBasObj, slotLenObj) {
                    mModbusCoilAddrConfig.initialController("panelCoil", "tableCoilCommonAddr", basObj, slotBasObj, slotLenObj);
                };
                this.initialRegPage = function(basObj, slotBasObj, slotLenObj) {
                    mModbusRegAddrConfig.initialController("panelReg", "tableRegCommonAddr", basObj, slotBasObj, slotLenObj);
                };
                this.setCoilPage = function(basObj, slotBasObj, slotLenObj, isForcingChange) {
                    mModbusCoilAddrConfig.setModbusPage(basObj, slotBasObj, slotLenObj, isForcingChange);
                };
                this.setRegPage = function(basObj, slotBasObj, slotLenObj, isForcingChange) {
                    mModbusRegAddrConfig.setModbusPage(basObj, slotBasObj, slotLenObj, isForcingChange);
                };
                this.setPageTitle = function(md) {
                    if(md === 0) {
                        $("#" + this.getTabId() + " ");
                    }else{

                    }
                };
                this.setModePanel = function(basObj) {
                    if(mModbusMdConfig !== null) {
                        mModbusMdConfig.setModbusMdPanel(basObj);
                    }
                };
                this.onModbusCoilConfigSubmitted = function(x) {
                    if(!arguments.length) return this._onModbusCoilConfigSubmitted;
                    this._onModbusCoilConfigSubmitted = x;
                };
                this.onModbusRegConfigSubmitted = function(x) {
                    if(!arguments.length) return this._onModbusRegConfigSubmitted;
                    this._onModbusRegConfigSubmitted = x;
                };
                this.onModbudMdCoilSubmitted = function(x) {
                    if(!arguments.length) return this._onModbudMdCoilSubmitted;
                    this._onModbudMdCoilSubmitted = x;
                };
                this.onModbudMdRegSubmitted = function(x) {
                    if(!arguments.length) return this._onModbudMdRegSubmitted;
                    this._onModbudMdRegSubmitted = x;
                };
            },
            CouplerInfoPanel: function(panelId) {
                var _onCouplerSubmitted = null;
                var mContextPanelId = panelId;
                var mIsDashboard;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextPanelId;
                };
                this.initialPanel = function(isDashBoard) {
                    try {
                        var _Self = this;
                        if(isDashBoard) {
                            $("#" + this.getPanelId() + ' a').click(function(e) {
                                if($(this).hasClass('ajax-link')) {
                                    e.preventDefault();
                                    var url = $(this).attr('href');
                                    var id = $(this).attr('id');
                                    //Advantech.Utility.loadAjaxContent(id, url, this);
                                    Advantech.Utility.loadAjaxContent(id, url, this, null, true);
                                }else
                                    e.preventDefault();
                            });
                        }else{
                            $("#" + this.getPanelId() + " #btnCommonInfo").click(function() {
                                var jsonObj = {};
                                $("#"+_Self.getPanelId()+" input").each((function(){
                                    if(!$(this).is(":disabled")){
                                        var prop = $(this).attr('id').slice(3);
                                        jsonObj[prop] = $(this).val();
                                    }
                                }));
                                $("#"+_Self.getPanelId()+" textarea").each((function(){
                                    if(!$(this).is(":disabled")){
                                        var prop = $(this).attr('id').slice(3);
                                        jsonObj[prop] = $(this).val();
                                    }
                                }));
                                if(_Self.onCouplerSubmitted() !== null)
                                    _Self.onCouplerSubmitted()(this, jsonObj);
                            });
                        }

                    }catch(e){
                        throw new Error("Initial couple information paenl failed.");
                    }
                };
                this.setCouplerInfoPanel = function(jsonObj) {
                    try{
                        for (var prop in jsonObj) {
                            $element = $("#" + _Self.getPanelId() + " #inp" + prop);
                            if($element.length > 0) {
                                if($element[0].type === 'checkbox') {
                                    $element.attr("checked", parseInt(jsonObj[prop], 10) == 1 ? true : false);
                                }
                                else{
                                   $element.val(jsonObj[prop]);
                                }
                            }
                        }
                    }catch(e){
                        throw new Error("Set couple information data failed.")
                    }
                };
                this.setIoWorkingMode = function(jsonObj) {
                    var mode = Advantech.Data.ModuleData.getInstance().getIoMode();
    				$("#" + _Self.getPanelId() + " #inpWMd").val(Advantech.Profile.IoWorkingModeEmun[mode]);
                };
                this.checkUpgradePrompt = function(jsonObj) {
                    var deviceInfo = Advantech.Profile.DeviceEmun[module];
                    var pattern = /^A(?:(\d+)\.(\d+))+(?:\ B(\d+))?$/;
                    var profileFwMatches = jsonObj.FwVer.match(pattern);
                    var studioFwMatches = deviceInfo.fwVersion.match(pattern);
                    if (profileFwMatches != null && studioFwMatches != null) {
                        if (parseInt(profileFwMatches[1]) > parseInt(studioFwMatches[1])) {
                            $("#" + _Self.getPanelId() + " #upgradePrompt").show();
                        } else if (parseInt(profileFwMatches[1]) == parseInt(studioFwMatches[1])) {
                            if (parseInt(profileFwMatches[2]) > parseInt(studioFwMatches[2])) {
                                $("#" + _Self.getPanelId() + " #upgradePrompt").show();
                            } else if (parseInt(profileFwMatches[2]) == parseInt(studioFwMatches[2])) {
                                if (parseInt(profileFwMatches[3]) > parseInt(studioFwMatches[3])) {
                                    $("#" + _Self.getPanelId() + " #upgradePrompt").show();
                                }
                            }
                        }
                    }
                };
                this.onCouplerSubmitted = function(x) {
                    if(!arguments.length) return _onCouplerSubmitted;
                    _onCouplerSubmitted = x;
                };
            },

            SlotInfoPanel: function(panelId) {
                var _onSlotInfoSelected = null;
                this.mContextPanelId = panelId;
                //this.mSlotNumber = slotNumber;
                var _Self = this;
                var counter = 0;
                /*this.getSlotNumber = function() {
                    return this.mSlotNumber;
                };*/
                this.getPanelId = function() {
                    return this.mContextPanelId;
                };
                this.initialPanel = function(isDashBoard) {
                    try {
                        var _Self = this;
                        //setupSlotInfoTable();
                        $("#" + this.getPanelId() + " tbody tr").click(function() {
                            var slotIndex = $(this).attr('id').slice(3);
                            if(_Self.onSlotInfoSelected() !== null) {
                                $("#" + _Self.getPanelId() + " tbody tr").removeClass('info');
                                $("#" + _Self.getPanelId() + " tbody #row" + slotIndex).addClass('info');
                                _Self.onSlotInfoSelected()(this, {
                                    slot: slotIndex
                                });
                            }
                        });
                    } catch (ex) {
                        throw new Error("initial slot information panel failed.")
                    }
                };
/*
                var setupSlotInfoTable = function() {
                    for (var i = 0; i < _Self.getSlotNumber(); ++i) {
                        addRowToSlotInfoTable(i);
                    }
                }*/

                var addRowToSlotInfoTable = function(index) {
                    var row = document.createElement('tr');
                    row.id = 'row' + index;
                    for (var i = 0; i < 3; ++i) {//for (var i = 0; i < 4; ++i) {
                        var cell = row.insertCell(i);
                        if(i == 0) {
                            cell.innerHTML = index;
                            //cell.className = 'slotType';
                        }
                    }
                    $("#" + _Self.getPanelId() + " tbody").append(row);
                }

                this.setSlotInfoPanel = function(index, jsonObj) {
                    try{
                        var dev = jsonObj;
                        addRowToSlotInfoTable(index);
                        var slot = dev.SLs ? dev.SLs : dev;//dev.SLs//.SL;
                        var $row = $("#" + _Self.getPanelId() + " #row" + index);
                        var $columns = $($row).find("td");
                        $columns[0].innerHTML = dev.Id || "";
/*                         if(slot == "0")
                        {
                            $columns[1].innerHTML = "--";
                        }
                        else
                        {
                            $columns[1].innerHTML = slot || "";
                        } */
                        $columns[1].innerHTML = getSlotDescription(dev);
                        $columns[2].innerHTML = getFirmwareDescription(dev);
                        $("#" + this.getPanelId() + " tbody #row0").trigger('click');
                    }catch(e){
                        throw new Error("Setting slot information data failed.")
                    }
                };

                var getSlotDescription = function(slotInfoJson) {
                    if(slotInfoJson) {
                        if(typeof(Advantech.Profile.DeviceEmun[slotInfoJson.Id].description) != 'undefined' &&
                            Advantech.Profile.DeviceEmun[slotInfoJson.Id].description !=""){
                            return Advantech.Profile.DeviceEmun[slotInfoJson.Id].description;
                        }else{
                            return "";
                        }
                    }else
                        return "";
                };

                var getFirmwareDescription = function(slotInfoJson) {
                    if(slotInfoJson) {
                        var descStr = "";
                        for (var pro in slotInfoJson) {
                            switch (pro) {
                                case "FwVer":
                                    if(slotInfoJson[pro] !== "")
                                        descStr += 'Fw:' + slotInfoJson[pro] + ', ';
                                    break;
                                case "BVer":
                                    if(slotInfoJson[pro] !== "")
                                        descStr += 'Bootloader:' + slotInfoJson[pro] + ', ';
                                    break;
                                case "ADVer":
                                    if(slotInfoJson[pro] !== "")
                                        descStr += 'A/D Fw:' + slotInfoJson[pro] + ', ';
                                    break;
                                case "IBVer":
                                    if(slotInfoJson[pro] !== "")
                                        descStr += 'A/D Bootloader:' + slotInfoJson[pro] + ', ';
                                    break;
                                case "HwVer":
                                    if(slotInfoJson[pro] !== "")
                                        descStr += 'Hw:' + slotInfoJson[pro] + ', ';
                                    break;
                            }
                        }
                        return descStr.slice(0, descStr.length - 2);
                    }
                }

                this.onSlotInfoSelected = function(x) {
                    if(!arguments.length) return _onSlotInfoSelected;
                    _onSlotInfoSelected = x;
                };
            }
        },
        AdvancedForm: {
            Built_InDataFilterModeEmun: {
                None: 0,
                timeFltrType: 1, //mapping to html tag class name
                amountFltrType: 2, //mapping to html tag class name
                indexFltrType: 3
            },
            FILE_FilterModeEmun: {
                timeFltrType: 1, //mapping to html tag class name
                amountFltrType:2,
                formatFltrType:3
            },
            DataViewerPanel: function(panelId, tableId, pieContainerId, barContainerId, trendContainerId, panelType) {
                var isWISE2411 = (module.indexOf('WISE-2411') > -1) ? true : false;
                var _onDataViewConfigSubmitted = null;
                var _onDataViewQueried = null;
                var _onDataViewCleared = null;
                var _onDataViewFilterChanged = null;
                var mIOTypeList = {};
                var mLogTypeList = {};
                var _onDataFilterModeChanged = null;
                var mContextContainerId = panelId;
                var mPanelType = panelType;
                var mTableId = tableId;
                var mJsonDatas = null;
                var mRawDatas = null;
                var mSlotRawDatas = null;
                var mChannelPie = new Advantech.Control.PieChart(pieContainerId);
                var mIOTypeBar = new Advantech.Control.BarChart(barContainerId);
                var mValTrend;// = new Advantech.Control.TrendWithFocusChart(trendContainerId);
                var mTrendModel = null;
                var _IOTypeEmun = Advantech.Profile.DataLogIOTypeEmun;
                var _RecordEmun = Advantech.Profile.DataLogRecordTypeEmun;
                var _EventTypeEmun = Advantech.Profile.DataLogEventTypeEmun;
                var _Self = this;
                var _DATA_FORMAT_SL = 0;
                var _DATA_FORMAT_CH = 1;
                var _DATA_FORMAT_IOTYPE = 2;
                var _DATA_FORMAT_VAL = 3;
                var _DATA_DISPLAY_LIMITATION = 5000;
                var _worker = null;
                var mRawDataPointer = 0;
                var getIOTypeList = function(){
                    return mIOTypeList;
                };
                var getLogTypeList = function(){
                    return mLogTypeList;
                };

                var appendLogTypeList = function(val){
                    if( mLogTypeList[val] == undefined){
                        mLogTypeList[val] = val2RecordEmunString(val);
                        $("#"+_Self.getPanelId()+' [data-select="logType"]').append('<option value="'+val+'">'+mLogTypeList[val]+'</option>');
                    }
                };

                var val2RecordEmunString = function(val){
                    if(mPanelType=='system'){
                        return _EventTypeEmun[val];
                    }else{
                        for(var prop in _RecordEmun){
                            if(_RecordEmun[prop] == val){
                                return prop;
                            }
                        }
                    }
                };

                var clearLogTypeList = function(val){
                    $("#"+_Self.getPanelId()+' [data-select="logType"]').html("");
                    mLogTypeList ={};
                    mLogTypeList["All"] = "All";
                    $("#"+_Self.getPanelId()+' [data-select="logType"]').append('<option value="All" selected>All</option>');
                };

                var appendSlotList = function(val){
                    $('[data-select="slot"]').append('<option value="'+val+'">'+val+'</option>');
                    $($('[data-select="slot"] option')[0]).prop("selected", "selected");
                };
                var clearSlotList = function(val){
                    $("#"+_Self.getPanelId()+' [data-select="slot"]').html("");
                };

                var appendIOTypeList = function(val){
                    if( mIOTypeList[val] == undefined){
                        mIOTypeList[val] = val;
                        //var str = _IOTypeEmun[val];
                        var str;
                        if(mPanelType=='system')
                            str = _EventTypeEmun[val];
                        else
                            str = _IOTypeEmun[val];
                        if($('[data-select="ioType"] option').length > 0){
                            $("#"+_Self.getPanelId()+' [data-select="ioType"]').append('<option value="'+val+'">'+str+'</option>');
                        }else{
                            $("#"+_Self.getPanelId()+' [data-select="ioType"]').append('<option value="'+val+'" selected>'+str+'</option>');
                        }
                    }
                };

                var clearIOTypeList = function(val){
                    $("#"+_Self.getPanelId()+' [data-select="ioType"]').html("");
                    mIOTypeList ={};
                };

                this.getPanelId = function() {
                    return mContextContainerId;
                };

                this.getChannelPie = function(){
                    return mChannelPie;
                };

                this.getIOTypeBar = function(){
                    return mIOTypeBar;
                };

                this.getValTrend = function(){
                    return mValTrend;
                };

                this.getTableId = function(){
                    return mTableId;
                };

                this.toJson = function() {
                    var jsonObj = _Self.getFilterObj();
                    jsonObj.UID = parseInt($("#" + _Self.getPanelId() + " #inpUID").prop("checked") ? 1 : 0, 10);
                    jsonObj.MAC = parseInt($("#" + _Self.getPanelId() + " #inpMAC").prop("checked") ? 1 : 0, 10);
                    jsonObj.TmF = parseInt($("#" + _Self.getPanelId() + " #selTmF option:selected").val(), 10);
                    if (isWISE2411) {
                        delete jsonObj.UID;
                        delete jsonObj.MAC;
                    }
                    return jsonObj;
                };
                this.updateFltrValue = function(jsonObj){
                    $("#" + _Self.getPanelId() + " #inpTotal").val(jsonObj.Total);
                    $("#" + _Self.getPanelId() + " #inpAmt").val(jsonObj.Amt).prop('max',jsonObj.Total).prop('min',0);
                    $("#" + _Self.getPanelId() + " #inpTLst").val(moment(parseInt(jsonObj.TLst, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));
                    $("#" + _Self.getPanelId() + " #inpTFst").val(moment(parseInt(jsonObj.TFst, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));
                    $("#" + _Self.getPanelId() + " #inpTSt").val(moment(parseInt(jsonObj.TSt, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));
                    $("#" + _Self.getPanelId() + " #inpTEnd").val(moment(parseInt(jsonObj.TEnd, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));

                    var calendarObj = {};
                    $("#" + _Self.getPanelId() + " #inpTSt").datetimepicker(calendarObj);
                    $("#" + _Self.getPanelId() + " #inpTEnd").datetimepicker(calendarObj);

                    if(isWISE2411) {
                        $("#" + _Self.getPanelId() + " #inpHs").val(jsonObj.Hs).prop('max',jsonObj.MIe).prop('min',jsonObj.MIs);
                        $("#" + _Self.getPanelId() + " #inpHe").val(jsonObj.He).prop('max',jsonObj.MIe).prop('min',jsonObj.MIs);
                        $("#" + _Self.getPanelId() + " .showIdxRange").text("(" + jsonObj.MIs + " ~ " + jsonObj.MIe + ")");
                    }
                };
                this.setPanel = function(jsonObj, bInitial) {
                    try{
                        $("#" + _Self.getPanelId() + " #inpUID").prop("checked", parseInt(jsonObj.UID, 10)==1?true:false);
                        $("#" + _Self.getPanelId() + " #inpMAC").prop("checked", parseInt(jsonObj.MAC, 10)==1?true:false);
                        $("#" + _Self.getPanelId() + " #selTmF option[value=" + jsonObj.TmF + "]").attr("selected", "selected");
                        $("#" + _Self.getPanelId() + " #selFltr option[value=" + jsonObj.Fltr + "]").attr("selected", "selected");
                        /* if(bInitial){
                            var macSlotList = jsonObj.SLs;
                            for(var i = 0; i < macSlotList.length; i++){
                                $("#"+_Self.getPanelId()+' [data-select="macSlot"]').append('<option value="'+macSlotList[i]+'">'+macSlotList[i]+'</option>');
                            }
                        } */
                        this.updateFltrValue(jsonObj);
                        $("#" + _Self.getPanelId() + " #selFltr").data("val", jsonObj.Fltr);
                        $("#" + _Self.getPanelId() + " #selFltr").trigger("change");
                    }catch(e){
                        throw new Error("Setting data logger data failed.")
                    }
                };
                var addSaveButton = function(){
                    var data; //"text/json;charset=utf-8," + encodeURIComponent("/log_message");
					if(mPanelType=='system')
						data = URL_LOGSYS_DATA_MESSAGE;
					else
						data = URL_LOG_DATA_MESSAGE;

                        if((Advantech.Utility.isChrome() || Advantech.Utility.isFirefox())
                            && !Advantech.Utility.isIPhone()
                            && !Advantech.Utility.isIPad()
                            && !Advantech.Utility.isAndroid()){
						//save json from restful
						//$('<a href="data:' + data + '" download="data.json"  class="btn btn-success"><i class="fa fa-download"></i> Save</a>').appendTo("#" + _Self.getPanelId() + ' .btn-group');
                        $('<a target="_blank" href="' + data + '" download="data.json"  class="btn btn-success"><i class="fa fa-download"></i> Save</a>').appendTo("#" + _Self.getPanelId() + ' .btn-group:last');
                    }
                };
                var romoveSaveButton = function(){
                    $("#" + _Self.getPanelId() + ' .btn-group a').remove();
                };
                this.getFilterObj = function() {
                    var obj = {};
                    var filterEmun = Advantech.Form.AdvancedForm.Built_InDataFilterModeEmun;
                    var fltVal = parseInt($("#" + _Self.getPanelId() + " #selFltr option:selected").val(), 10);
                    obj.Fltr = fltVal;
                    if(fltVal === 0) {
                        return obj;
                    }

                    for (var filterType in filterEmun) {
                        if(fltVal === filterEmun[filterType]) {
                            $("#" + _Self.getPanelId() + " ." + filterType + " input").each(function() {
                                if(!$(this).is(":disabled")) {
                                    var prop = this.id.slice(3);
                                    if($(this).hasClass("utcValue")) {
                                        if($(this).val() !== "") {
                                            obj[prop] = parseInt(moment($(this).val(), "YYYY-MM-DDTHH:mm:ss").valueOf()/1000, 10);
                                        }
                                    }else if($(this).attr("type") === 'number' ||$(this).hasClass('isNumericType')) {
                                        obj[prop] = parseInt($(this).val());
                                    }else{
                                        obj[prop] = $(this).val();
                                    }
                                }
                            });
                        }
                    }
                    return obj;
                };

                this.getSelectedMacSlot = function() {
                    return $("#" + _Self.getPanelId() + ' [data-select="macSlot"] option:selected').val();
                };

                this.onDataFilterModeChanged = function(x) {
                    if(!arguments.length) return _onDataFilterModeChanged;
                    _onDataFilterModeChanged = x;
                };
                this.onDataViewConfigSubmitted = function(x) {
                    if(!arguments.length) return _onDataViewConfigSubmitted;
                    _onDataViewConfigSubmitted = x;
                };
                this.onDataViewQueried = function(x) {
                    if(!arguments.length) return _onDataViewQueried;
                    _onDataViewQueried = x;
                };
                this.onDataViewCleared = function(x) {
                    if(!arguments.length) return _onDataViewCleared;
                    _onDataViewCleared = x;
                };
                this.onDataViewSaved = function(x) {
                    if(!arguments.length) return _onDataViewSaved;
                    _onDataViewSaved = x;
                };
                this.onDataViewFilterChanged = function(x) {
                    if(!arguments.length) return _onDataViewFilterChanged;
                    _onDataViewFilterChanged = x;
                };

                var getUTCTime = function(raw){
                    var tim;
                    if(raw == undefined){
                        tim = "****";
                    }
                    if($.isNumeric(raw)){
                         tim = int(raw)*1000;
                    }else{
                       tim = moment(raw, "YYYY-MM-DDTHH:mm:ss").valueOf();
                    }
                    return tim;
                };

                var workerHandle = function(){
                    _worker.addEventListener('message', function(e) {
                        var cmd = e.data;
                        if(cmd.command == 'parseJson'){
                            processRawData(cmd);
                        }else if(cmd.command == 'parseSysJson'){
                            processRawData(cmd);
                        }else if(cmd.command == 'initial' || cmd.command == 'initialSys'){
                            setUpDataViewer(cmd);
                        }else if(cmd.command == 'appendDataToDbTable'){
                            setUpDataViewer(cmd);
                        }else if(cmd.command == 'update'){
                            updateDataViewer(cmd);
                        }
                    }, false);
                };
                var processRawData = function(cmd){
                    refreshTable(cmd.data.raw);
                    clearSlotList();
                    if(mPanelType!='system'){//for io channel data query
                        var slotList = cmd.data.slotArray;
                        var slotListLength = slotList.length;
                        for(var i = 0; i <  slotListLength; ++i){
                            appendSlotList(slotList[i]);
                        }
                        var slot = (slotListLength > 0)?slotList[0]:0;
                        if(slotListLength <= 1){
                            $("#" + _Self.getPanelId() + " .hasSlotType").hide();
                        }else{
                            $("#" + _Self.getPanelId() + " .hasSlotType").show();
                        }
                        _worker.postMessage({command:'initial', data:{raw:cmd.data.raw, slot:slot}});
                    }else{//for system data query
                        _worker.postMessage({command:'initialSys', data:{raw:cmd.data.raw, slot:slot}});
                    }
                }
                var updateDataViewer = function(cmd){
                        if (isWISE2411 && mPanelType == "io") {
                            $("#" + _Self.getPanelId() + " .processingType").hide();
                            $("#" + _Self.getPanelId() + " .dataType#dataTable").show();
                        } else {
                            var trendData = cmd.data.trendObj;
                            for( var prop in trendData){
                                trendData[prop] = trendData[prop].map(function(obj){
                                    var tempObj = obj;
                                    tempObj._x= getUTCTime(tempObj._x);
                                    return tempObj;
                                })
                            }
                            //mTrendModel = new Advantech.Data.ChartData.TrendData(trendData, _Self.getValTrend().getCapacity());
                            refreshPieChart(cmd.data.logTypeObj);
                            //refreshTrend(mTrendModel);
                            refreshChartTilte();
                            $("#" + _Self.getPanelId() + " .processingType").hide();
                            $("#" + _Self.getPanelId() + " .dataType").show();
                            _Self.getIOTypeBar().refreshChart();
                            _Self.getChannelPie().refreshChart();
                            //_Self.getValTrend().refreshChart(getTrendWidth(),400);
                        }
                        addSaveButton();
                };
                var getTrendWidth = function(){
                    return parseInt($( "#"+_Self.getPanelId()).width(), 10)*0.84;
                };
                var setUpDataViewer = function(cmd){
                    if (isWISE2411 && mPanelType == "io") {
                        updateDataViewer(cmd);
                    } else {
                        refreshBarChart(cmd.data.ioTypeObj);
                        updateDataViewer(cmd);
                    }
                };
                this.setDataTable = function(jsonObj) {
                    try{
                        $("#" + _Self.getPanelId() + " .processingType").show();
                        var amountOfEachUnit = (jsonObj.LogMsg.length < 1)?0:Number(jsonObj.LogMsg[0].Record.length);
                        var totalDataAmount = jsonObj.LogMsg.length * amountOfEachUnit;
                        if(totalDataAmount > _DATA_DISPLAY_LIMITATION){
                            var amountOfFeasible = Math.ceil(_DATA_DISPLAY_LIMITATION/(amountOfEachUnit*(1.0)));
                            Advantech.Form.MessageForm.getInstance().showMessageBox("Notification","<h5>Only latest "+amountOfFeasible+" records are provided for manipulation, due to browser resource limitation.<br/>Please press 'Save' button(not include Internet Explorer) to download data.</h5>");
							mJsonDatas = {LogMsg:jsonObj.LogMsg.slice(jsonObj.LogMsg.length - amountOfFeasible)};
                        }else{
                            mJsonDatas = jsonObj;
                        }
                        if(jsonObj["LogMsg"] != undefined){
                            if(_worker != null){
                                if(mPanelType=='system')
                                    _worker.postMessage({command:'parseSysJson', data:mJsonDatas});
                                else
                                    _worker.postMessage({command:'parseJson', data:mJsonDatas, isWISE2411:isWISE2411});
                            }else{
                                var logMsg = jsonObj["LogMsg"];
                                var logMsgLen = logMsg.length;
                                var rawData = [];
                                for (var i = 0; i < logMsgLen; ++i) {
                                    var pe = logMsg[i].PE;
                                    var tim = logMsg[i].TIM || "****";
                                    var uid = logMsg[i].UID || "****";
                                    var mac = logMsg[i].MAC || "****";
                                    var utc = getUTCTime(logMsg[i].TIM);
                                    if(mPanelType=='system'){
                                        var record = logMsg[i].Record || "****";
                                        rawData.push(toSystemRawData(pe, tim, uid, mac, record));
                                    }else{
                                        var recordArray =logMsg[i].Record;
                                        for (var j = 0; j < recordArray.length; ++j) {
                                            rawData.push(toRawData(pe, tim, uid, mac, recordArray[j]));
                                        }
                                    }
                                }
                                refreshTable(rawData);
                                $("#" + _Self.getPanelId() + " .processingType").hide();
                                $("#" + _Self.getPanelId() + " .dataType").show();
                            }
                        }
                    }catch(e){
                        throw new Error("Setting log logger failed.")
                    }
                };
                var refreshTable = function(raw){
                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                    $tb.clear();
                    mRawDataPointer = 0;
                    mRawDatas = raw;
                    var visibleData = [];
                    if(mRawDatas.length <= 100){
                        visibleData = mRawDatas;
                    }
                    else{
                        for(var i = 0; i < 100; ++i){
                            visibleData.push(mRawDatas[i]);
                        }
                    }
                    updateTable(visibleData);
                };
                var updateTable = function(raw){
                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                    $('#'+_Self.getTableId()).unbind('draw.dt');
                    if (isWISE2411 && mPanelType == "io") {
                        $('#'+_Self.getTableId()).unbind('click');
                    }
                    if(raw.length > 0){
                        if(raw[0][2] == "****"){
                            $tb.column(2).visible(false);
                        }else{
                            $tb.column(2).visible(true);
                        }
                        if(raw[0][3] == "****"){
                            $tb.column(3).visible(false);
                        }else{
                            $tb.column(3).visible(true);
                        }
                        $tb.rows.add(raw);

                        mRawDataPointer += raw.length;
                    }
                    $('#'+_Self.getTableId()).on( 'draw.dt', function () {
                        if(mRawDatas.length > mRawDataPointer){
                               addGetMoreButton();
                        }
                    });
                    if (isWISE2411 && mPanelType == "io" && raw.length > 0) {
                        $('#'+_Self.getTableId()).on( 'click', 'tbody tr', function () {
                            updateSensorChart($tb.row( $(this) ).data());
                        });
                    }
                    $tb.draw();
                };
                var addGetMoreButton = function(){
                    $('<li class="paginate_button " aria-controls="dataViewerTable" tabindex="0" id="fileViewerTable_DummyBtn"><a href="#">...</a></li>')
                    .insertBefore('#'+_Self.getTableId()+"_next")
                    .one('click', function(e){
                        e.preventDefault();
                        var visibleData = [], startIdx, endIdx;
                        startIdx = mRawDataPointer;
                        if(mRawDataPointer + 100 > (mRawDatas.length-1)){
                            endIdx = mRawDatas.length;
                        }else{
                            endIdx = mRawDataPointer+100
                        }
                        for(var i = startIdx; i < endIdx; ++i){
                            visibleData.push(mRawDatas[i]);
                        }
                        function updateTableProcedure(parameters){
                            updateTable(parameters);
                            var $tb = $('#'+_Self.getTableId()).dataTable().api();
                            $tb.page( 'last' ).draw( false );
                        }
                        if(endIdx > 5000){
                            $("#CommonConfirmModal #confirmModalLabel").text("Loading more data");
                                $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>The browser resource will be tight when manipulating more than 5,000 items of data! Are you sure keep going?");
                                $("#CommonConfirmModal").modal({
                                    keyboard: false,
                                    show: true,
                                    backdrop: false
                                });
                                $("#CommonConfirmModal #btnCommonConfirm").one('click',function(){
                                    updateTableProcedure(visibleData);
                                    $("#CommonConfirmModal").modal("hide");
                                });
                                $("#CommonConfirmModal #btnCommonCancel").one('click',function(){
                                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                                    $tb.page( 'last' ).draw( false );
                                });

                        }else{
                            updateTableProcedure(visibleData);
                        }
                    });
                };
                var refreshBarChart = function(ioTypeObj){
                    var colorArray = [];
                    var count = 0;
                    _Self.getIOTypeBar().clearChart();
                    clearIOTypeList();
                    var ioTypStatistic = ioTypeObj;
                    for(var prop in ioTypStatistic){
                        if(mPanelType=='system')
                            _Self.getIOTypeBar().appendData("Event_"+prop, ioTypStatistic[prop], _EventTypeEmun[prop]);
                        else{
                            appendIOTypeList(prop);
                            _Self.getIOTypeBar().appendData("IO-Type_"+prop, ioTypStatistic[prop], _IOTypeEmun[prop]);
                        }
                        colorArray.push(Advantech.Profile.TrendColorEmun[count]);//use TrendColorEmun to must sure all chart colors are the same
                        count++;
                    }
                    _Self.getIOTypeBar().setColors(colorArray);
                    _Self.getIOTypeBar().refreshChart();
                };
                var refreshPieChart = function(logTypeObj){
                    var colorArray = [];
                    var count = 0;
                    _Self.getChannelPie().clearChart();
                    clearLogTypeList();
                    var logTypStatistic = logTypeObj;
                    for(var prop in logTypStatistic){
                        appendLogTypeList(prop);
                        _Self.getChannelPie().appendData(val2RecordEmunString(prop), logTypStatistic[prop]);
                        colorArray.push(Advantech.Profile.TrendColorEmun[count]);//use TrendColorEmun to must sure all chart colors are the same
                        count++;
                    }
                    _Self.getChannelPie().setColors(colorArray);
                    _Self.getChannelPie().refreshChart();
                };
                var refreshTrend = function(dataModel){
                    if(dataModel != null){
                        var ioType = $('[data-select="ioType"]').val();
                        var logType = $('[data-select="logType"]').val();
                        _Self.getValTrend().clearChart();
                        var datas = dataModel.getDrawData();
                        for(var prop in datas){
                            //var key = "Ch_"+prop;
                            var key;
                            if(mPanelType=='system')
                                key = "Event_"+prop;
                            else
                                key = "Ch_"+prop;
                            _Self.getValTrend().appendPlot(key, Advantech.Profile.TrendColorEmun[_Self.getValTrend().getPlotLength()]);
                            var len = datas[prop].length;
                            for(var i = 0; i < len; ++i){
                                var data = datas[prop][i];
                                if(mPanelType=='system'){
                                    _Self.getValTrend().appendData(key, data._x, data._y);
                                }else{
                                    if(ioType == 1 || ioType == 4){
                                        if( logType == 'All' || logType == data.logType)
                                        _Self.getValTrend().appendDigitalData(key, data._x, data._y);
                                    }
                                    else{
                                        _Self.getValTrend().appendData(key, data._x, data._y);
                                    }
                                }
                            }
                        }
                        _Self.getValTrend().refreshChart(getTrendWidth(), 400);
                    }
                };
                var refreshChartTilte = function(){
                    var slot = $('[data-select="slot"]').val();
                    //var ioStr = _IOTypeEmun[$('[data-select="ioType"]').val()];
                    var ioStr;
                    if(mPanelType=='system')
                        ioStr = _EventTypeEmun[$('[data-select="ioType"]').val()];
                    else
                        ioStr = _IOTypeEmun[$('[data-select="ioType"]').val()];
                    var evtStr = getLogTypeList()[$('[data-select="logType"]').val()];
                    var slotString = ($('[data-select="slot"] option').length > 1)?("(Slot "+slot+")"):"";
                    if(mPanelType!='system'){
                        $("#barTitle").html("IO_Type Bar Chart"+slotString);
                        $("#pieTitle").html(ioStr+slotString);
                        $("#trendTitle").html(ioStr+"-"+evtStr+slotString);
                    }
                };
                var updateSensorChart = function(rowData) {
                    var i;
                    var vibration = rowData[3].split(",");
                    var rms = rowData[4].replace(/-/g, "0").split(",");
                    var temperature = rowData[5];
                    var drawFqChart = new Advantech.Control.ColumnChart();

                    for (i=0; i<vibration.length; i++) {
                        if (vibration[i] == "-") {
                            $("#collapseaChart_2411 tr:eq("+i+") label").attr("disabled", "disabled")
                            $("#collapseaChart_2411 tr:eq("+i+") label:first").removeClass("btn-info").addClass("btn-secondary");
                        } else {
                            $("#collapseaChart_2411 tr:eq("+i+") label").removeAttr("disabled")
                            $("#collapseaChart_2411 tr:eq("+i+") label:first").removeClass("btn-secondary").addClass("btn-info");
                        }
                        $("#collapseaChart_2411 tr:eq("+i+") #option2_text").text(vibration[i]);
                    }
                    drawFqChart.drawChart(rms);
                    $("#Temperature").text(temperature + " °C")
                    $("#" + _Self.getPanelId() + " .dataType:first").show();
                }

                var toRawData = function( pe, tim, uid, mac, data) {
                    var logObj = logDataToObj(parseInt(pe, 10), tim, uid, mac, data);
                    return [logObj["pe"],logObj["tim"],logObj["uid"],logObj["mac"],logObj["slot"],logObj["channel"],logObj["ioType"], logObj["value"]];
                };
                var toSystemRawData = function( pe, tim, uid, mac, record) {
                    var logObj = logDataToObj(parseInt(pe, 10), tim, uid, mac, data);
                    return [pe, tim, uid, mac, record];
                };
                var logDataToObj = function(pe, tim, uid, mac, data) {
                    return {
                        pe: pe,
                        tim: tim,
                        uid: uid,
                        mac: mac,
                        slot: data[_DATA_FORMAT_SL],
                        channel: data[_DATA_FORMAT_CH],
                        ioType: data[_DATA_FORMAT_IOTYPE],
                        value: data[_DATA_FORMAT_VAL]
                    };
                };
                this.clearDataTable = function() {
                    mJsonDatas = null;
                    mRawDatas = null;
                    mRawDataPointer = 0;
                    romoveSaveButton();
                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                    $tb.clear();
                    _Self.getIOTypeBar().clearChart();
                    clearIOTypeList();
                    _Self.getChannelPie().clearChart();
                    clearLogTypeList();
                    //_Self.getValTrend().clearChart();
                    $("#" + _Self.getPanelId() + " .dataType").hide();
                    $("#" + _Self.getPanelId() + " .dataTypeTable").hide();
                    $("#" + _Self.getPanelId() + " .processingType").hide();
                };
                this.initialPanel = function() {
                    var isIE = Advantech.Utility.isIE();
                    var waitForm = Advantech.Form.WaitingForm.getInstance();
                    if( !(int(isIE) < 10) || isIE == false){
                        if(panelType=="io"){//for io data query
                            if(typeof(dataViewerWebWorker)!="undefined"){
                                dataViewerWebWorker.terminate();
                            }
                            dataViewerWebWorker = new Worker(ABSOLUTE_PATH+'/data_worker.js');
                            _worker = dataViewerWebWorker;
                        }
                        if(panelType=="system"){//for system data query
                            if(typeof(sysDataViewerWebWorker)!="undefined"){
                                sysDataViewerWebWorker.terminate();
                            }
                            sysDataViewerWebWorker = new Worker(ABSOLUTE_PATH+'/data_worker.js');
                            _worker = sysDataViewerWebWorker;
                        }
                        workerHandle();
                    }else{
                        $("#" + _Self.getPanelId() + " .chartType").hide();
                        $("#" + _Self.getPanelId() + " #collapseaChart").append('<div class="row"><center><i class="fa fa-fw fa-exclamation-triangle"></i>Chart Function is Not Supported by your Web browser.</center></div>')
                    }
                    _Self.getChannelPie().createChart("200", "400");
                    //_Self.getValTrend().createChart("200", "400");
                    _Self.getIOTypeBar().createChart("200", "400");
                    $(document).load($(window).bind("resize", function(){
                        _Self.getIOTypeBar().refreshChart();
                        _Self.getChannelPie().refreshChart();
                        //_Self.getValTrend().refreshChart(getTrendWidth(), 400);
                    }));
                    _Self.getIOTypeBar().onBarClick(function(obj, e){
                        if(mPanelType!='system'){
                            var baseStr = "IO-Type_";
                            var type = e.tag.slice(baseStr.length);
                            $('[data-select="ioType"]').val(type).trigger("change");
                        }
                    });
                    _Self.getChannelPie().onPieClick(function(obj, e){
                        if(mPanelType!='system'){
                            var logType = e.key;
                            var type = _RecordEmun[logType];
                            $('[data-select="logType"]').val(type).trigger("change");
                        }
                    });
                    if(mPanelType!='system'){
                        $('[data-select="ioType"]').change(function(){
                            romoveSaveButton();
                            var val = $(this).val();
                            if(_worker != null){
                                $("#" + _Self.getPanelId() + " .dataType").hide();
                                $("#" + _Self.getPanelId() + " .processingType").show();
                                var slot = $("#" + _Self.getPanelId() + ' [data-select="slot"]').val();
                                _worker.postMessage({command:'update', data:{raw:mRawDatas, slot:slot, ioType:val}});
                            }
                        });
                    }
                    $('[data-select="slot"]').change(function(){
                        romoveSaveButton();
                        var val = $(this).val();
                        if(_worker != null){
                            $("#" + _Self.getPanelId() + " .dataType").hide();
                            $("#" + _Self.getPanelId() + " .processingType").show();
                            _worker.postMessage({command:'initial', data:{raw:mRawDatas, slot:val}});
                        }
                    });
                    $('[data-trendToogle="minusStep"]').click(function(e){
                        e.preventDefault();
                        $('[data-trendToogle="addStep"]').closest("li").removeClass('disabled');
                        if( mTrendModel != null && !mTrendModel.isStartBound()){
                            waitForm.showPleaseWait();
                            mTrendModel.minusStep();
                            refreshTrend(mTrendModel);
                            waitForm.hidePleaseWait();
                        }else{
                            $(this).closest("li").addClass('disabled');
                        }
                    });
                    $('[data-trendToogle="addStep"]').click(function(e){
                        e.preventDefault();
                        $('[data-trendToogle="minusStep"]').closest("li").removeClass('disabled');
                        if( mTrendModel != null && !mTrendModel.isEndBound()){
                            waitForm.showPleaseWait();
                            mTrendModel.addStep();
                            refreshTrend(mTrendModel);
                            waitForm.hidePleaseWait();
                        }else{
                            $(this).closest("li").addClass('disabled');
                        }
                    });
                    if(mPanelType!='system'){
                        $('[data-select="logType"]').change(function(){
                            var val = $(this).val();
                            /*mTrendModel.recoverData();
                            if(val !='All'){
                                mTrendModel.filterData(val);
                            }
                            refreshTrend(mTrendModel);*/
                            refreshChartTilte();
                        });
                    }
                    $("#" + _Self.getPanelId() + " .dataType").hide();
                    $("#" + _Self.getPanelId() + " .dataTypeTable").hide();
                    $("#" + _Self.getPanelId() + " .processingType").hide();

                    $("#" + _Self.getPanelId() + " #btnQuery").click(function() {
                        if ($("#" + _Self.getPanelId() + " #inpHe").val() < $("#" + _Self.getPanelId() + " #inpHs").val()) {
                            Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Parameter Invalid<h4>", "<h5><i class='fa fa-fw fafrown-o'></i>End index must be greater than or equal to the Start Index!<h5>");
                            return;
                        }
                        _Self.clearDataTable()
                        if($.isFunction(_Self.onDataViewQueried())) {
                            _Self.onDataViewQueried().apply(this, [this, _Self.toJson()]);
                        }
                    });
                    $("#" + _Self.getPanelId() + " #btnClear").click(function() {
                        _Self.clearDataTable();
                        if($.isFunction(_Self.onDataViewCleared())) {
                            if(mPanelType=='system')
                                _Self.onDataViewCleared().apply(this,[this, {ClrLg: 2}]);
                            else
                                _Self.onDataViewCleared().apply(this,[this, {ClrLg: 1}]);
                        }
                    });
                    $("#" + _Self.getPanelId() +' .collapse').on('hide.bs.collapse', function () {
                        $("a[data-target='#"+this.id+"'] i").removeClass("fa-caret-down");
                        $("a[data-target='#"+this.id+"'] i").addClass("fa-caret-right");
                    });
                    $("#" + _Self.getPanelId() +' .collapse').on('shown.bs.collapse', function () {
                        $("a[data-target='#"+this.id+"'] i").removeClass("fa-caret-right");
                        $("a[data-target='#"+this.id+"'] i").addClass("fa-caret-down");
                        if( "collapseaChart" == this.id){
                            _Self.getIOTypeBar().refreshChart();
                            _Self.getChannelPie().refreshChart();
                            //_Self.getValTrend().refreshChart(getTrendWidth(), 400);
                        }
                    }).collapse('show');
                    $("#" + _Self.getPanelId() + " #selFltr").change(function(){
                        var filterEmun = Advantech.Form.AdvancedForm.Built_InDataFilterModeEmun;
                        var fltVal = parseInt($("#" + _Self.getPanelId() + " #selFltr option:selected").val(), 10);
                        for (var filterType in filterEmun) {
                            if(filterType !== 'None') {
                                $("#" + _Self.getPanelId() + " ." + filterType).hide();
                            }
                            if(fltVal === filterEmun[filterType]) {
                                if(filterType !== 'None') {
                                    $("#" + _Self.getPanelId() + " ." + filterType).show();
                                }
                            }
                        }
                    });
                };
            },

            FileViewerPanel: function(panelId, tableId) {
                var _onFileViewQueried = null;
                var _onFileViewQueryDeviceChanged = null;
                var mContextContainerId = panelId;
                var mTableId = tableId;
                var mJsonDatas = null;
                var mPreQueryData = null;
                var mPreFileTotalAmount = 0;
                var mRawDatas = null;
                var _Self = this;
                var _DATA_FORMAT_NM = 0;
                var _DATA_FORMAT_TIM = 1;

                this.getPanelId = function() {
                    return mContextContainerId;
                };

                this.getTableId = function(){
                    return mTableId;
                };

                this.getQueryTpye = function(){
                    return $("#" + _Self.getPanelId() +" #selSrc").val();
                };

                this.toJson = function() {
                    var jsonObj = _Self.getFilterObj();
                    return jsonObj;
                };
                this.updateFltrValue = function(jsonObj){
                    $("#" + _Self.getPanelId() + " #inpTotal").val(jsonObj.Total);
                    $("#" + _Self.getPanelId() + " #inpISt").val(jsonObj.ISt).prop('max',jsonObj.Total).prop('min',1);
                    $("#" + _Self.getPanelId() + " #inpIEnd").val(jsonObj.IEnd).prop('max',jsonObj.Total).prop('min',1);
                    $("#" + _Self.getPanelId() + " #inpTLst").val(moment(parseInt(jsonObj.TLst, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));
                    $("#" + _Self.getPanelId() + " #inpTFst").val(moment(parseInt(jsonObj.TFst, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));
                    $("#" + _Self.getPanelId() + " #inpTSt").val(moment(parseInt(jsonObj.TSt, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));
                    $("#" + _Self.getPanelId() + " #inpTEnd").val(moment(parseInt(jsonObj.TEnd, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss"));

                    var calendarObj = {};
                    $("#" + _Self.getPanelId() + " #inpTSt").datetimepicker(calendarObj);
                    $("#" + _Self.getPanelId() + " #inpTEnd").datetimepicker(calendarObj);
                };

                this.setPanel = function(jsonObj) {
                    try{
                        mPreQueryData = jsonObj;
                        var fltrs = Advantech.Utility.convertMaskToArray(jsonObj.Fltr, 3);
                        for(var i = 0 ; i<fltrs.length; ++i){
                            var $master = $("#selFltr [data-mask-index='"+i+"']");
                            $master.prop("checked", Boolean(fltrs[i])).trigger("change");
                        }
                        this.updateFltrValue(jsonObj);
                    }catch(e){
                        throw new Error("Setting data logger data failed.")
                    }
                };

                this.getFilterObj = function() {
                    var obj = {};
                    var filterEmun = Advantech.Form.AdvancedForm.FILE_FilterModeEmun;

                    var fltVal = 0;
                    $("#" + _Self.getPanelId() + " #selFltr [data-mask-index]").each(function(){
                        fltVal+= Math.pow(2, $(this).attr("data-mask-index"))*Number($(this).prop("checked"));
                    })
                    obj.Fltr = Number(fltVal);
                    for (var filterType in filterEmun) {
                        (function(filterType){
                            $("#" + _Self.getPanelId() + " ." + filterType + " input").each(function() {
                                if(!$(this).is(":disabled")) {
                                    var prop = this.id.slice(3);
                                    if($(this).hasClass("utcValue")) {
                                        if($(this).val() !== "") {
                                            obj[prop] = parseInt(moment($(this).val(), "YYYY-MM-DDTHH:mm:ss").valueOf()/1000, 10);
                                        }
                                    }else if($(this).attr("type") === 'number' ||$(this).hasClass('isNumericType')) {
                                        obj[prop] = parseInt($(this).val());
                                    }else{
                                        obj[prop] = $(this).val();
                                }
                            }});
                            $("#" + _Self.getPanelId() + " ." + filterType + " select").each(function() {
                                if(!$(this).is(":disabled")) {
                                    var prop = this.id.slice(3);
                                    obj[prop] = Number($(this).val());
                                }
                            });
                        })(filterType);
                    }
                    return obj;
                };
                this.onFileViewQueried = function(x) {
                    if(!arguments.length) return _onFileViewQueried;
                    _onFileViewQueried = x;
                };
                this.onFileViewQueryDeviceChanged = function(x) {
                    if(!arguments.length) return _onFileViewQueryDeviceChanged;
                    _onFileViewQueryDeviceChanged = x;
                };

                var updateDataViewer = function(cmd){
                    $("#" + _Self.getPanelId() + " .processingType").hide();
                    $("#" + _Self.getPanelId() + " .dataType").show();
                };

                var setUpDataViewer = function(cmd){
                    refreshTable(cmd.data.raw);
                    updateDataViewer(cmd);
                };

                this.setDataTable = function(jsonObj, action) {
                    try{
                        $("#" + _Self.getPanelId() + " .processingType").show();
                        mJsonDatas = jsonObj;
                        if(jsonObj["LogList"] != undefined){
                            var logList = jsonObj["LogList"];
                            var logListLen = logList.length;
                            var TIME_FILTER_MASK_INDEX = 0;
                            var AMOUT_OF_LAST_FILE_FILTER_MASK_INDEX  = 1;
                            logList.sort(function(a, b){return a.TIM-b.TIM;});
                            var rawData = [];
                            for (var i = 0; i < logListLen; ++i) {
                                var nm = logList[i].Nm;
                                var tim = moment(parseInt(logList[i].TIM, 10) * 1000).format("YYYY-MM-DDTHH:mm:ss");
                                if(nm != undefined){
                                    rawData.push(toRawData(nm, tim));
                                }
                            }
                            var hasMore = Boolean(mJsonDatas.Mf);
                            var isExceed50 = (Math.abs(mPreQueryData.ISt - mPreQueryData.IEnd) > 50);
                            var fltrMask = Advantech.Utility.convertMaskToArray(mPreQueryData.Fltr, 4);
                            if(Boolean(mJsonDatas.Mf) == true || (Math.abs(mPreQueryData.ISt - mPreQueryData.IEnd) > 50 || mPreQueryData.Fltr == 0) && mPreQueryData.Total > 50){
                                if(fltrMask[AMOUT_OF_LAST_FILE_FILTER_MASK_INDEX] == 1 && !Boolean(mJsonDatas.Mf)){
                                    hasMore = false;
                                }
                                else{
                                hasMore = true;
                                }
                            }
                            if(action == 'new'){

                                refreshTable(rawData, Boolean(hasMore));
                            }else{
                                updateTable(rawData, Boolean(hasMore));
                            }
                            $("#" + _Self.getPanelId() + " .processingType").hide();
                            $("#" + _Self.getPanelId() + " .dataType").show();
                        }
                    }catch(e){
                        throw new Error("Setting log logger failed.")
                    }
                };

                var refreshTable = function(raw, hasMore){
                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                    $tb.clear();
                    $('#'+_Self.getTableId()).unbind('draw.dt');
                    mRawDatas = raw;
                    $tb.rows.add(mRawDatas);
                    $('#'+_Self.getTableId()+"_length option[value=100]").remove();
                    $('#'+_Self.getTableId()).on( 'draw.dt', function () {
                        if(hasMore){
                            addGetMoreButton(raw);
                        }
                    });
                    $tb.draw();
                };
                var addGetMoreButton = function(referDatas){
                    $('<li class="paginate_button " aria-controls="fileViewerTable" tabindex="0" id="fileViewerTable_DummyBtn"><a href="#">...</a></li>')
                    .insertBefore('#'+_Self.getTableId()+"_next")
                    .one('click', function(e){
                        e.preventDefault();
                        var queryObj = {};
                        if(mPreQueryData.Fltr == 0){
                            queryObj.Fltr = 2;
                            var shift = mPreQueryData.Total - mPreFileTotalAmount;
                            queryObj.ISt = Number(mRawDatas.length+1+shift);
                            queryObj.IEnd = Number(mPreFileTotalAmount+shift);
                        }else{
                            queryObj.Fltr = 0;
                            var fltrs = Advantech.Utility.convertMaskToArray(mPreQueryData.Fltr, 3);
                            if(fltrs[0]/*Time filter*/ == 1 && fltrs[1] == 0){
                                queryObj.Fltr += 1;
                                queryObj.TSt = Number(parseInt(moment(referDatas[referDatas.length-1][1], "YYYY-MM-DDTHH:mm:ss").valueOf()/1000, 10));
                                queryObj.TEnd = Number(mPreQueryData.TEnd);
                            }
                            if(fltrs[0]/*Time filter*/ == 1){
                                queryObj.Fltr += 1;
                                queryObj.TSt = Number(mPreQueryData.TSt);
                                queryObj.TEnd = Number(mPreQueryData.TEnd);
                            }
                            if(fltrs[1]/*Amout of latest files*/ == 1){
                                queryObj.Fltr += 2;
                                var shift = mPreQueryData.Total - mPreFileTotalAmount;
                                queryObj.ISt = Number(mPreQueryData.ISt+50+shift);
                                queryObj.IEnd = Number(mPreQueryData.IEnd+shift);
                            }
                            if(fltrs[2]/*File Format*/ == 1){
                                queryObj.Fltr += 3;
                            }
                        }
                        if($.isFunction(_Self.onFileViewQueried())) {
                            _Self.onFileViewQueried().apply(this, [this, {'data':queryObj, 'dev':_Self.getQueryTpye(), 'action':'update'}]);
                        }
                    });
                };

                var updateTable = function(raw, hasMore){
                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                    for(var idx = 0; idx < raw.length; ++idx){
                        mRawDatas.push(raw[idx]);
                    }
                    $tb.rows.add(raw);
                    $('#'+_Self.getTableId()).unbind('draw.dt').on( 'draw.dt', function () {
                        if(hasMore){
                            addGetMoreButton(raw);
                        }

                    });
                    //$tb.draw();
                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                    $tb.page( 'last' ).draw( false );
                };

                var toRawData = function( nm, tim) {
                    return [nm,tim];
                };

                var logDataToObj = function(pe, tim, uid, mac, data) {
                    return {
                        pe: pe,
                        tim: tim,
                        uid: uid,
                        mac: mac,
                        slot: data[_DATA_FORMAT_SL],
                        channel: data[_DATA_FORMAT_CH],
                        ioType: data[_DATA_FORMAT_IOTYPE],
                        value: data[_DATA_FORMAT_VAL]
                    };
                };

                this.clearDataTable = function() {
                    mJsonDatas = null;
                    mRawDatas = null;
                    var $tb = $('#'+_Self.getTableId()).dataTable().api();
                    $tb.clear();
                    $("#" + _Self.getPanelId() + " .dataType").hide();
                    $("#" + _Self.getPanelId() + " .processingType").hide();
                };
                this.initialPanel = function() {
                    $("#" + _Self.getPanelId() + " .dataType").hide();
                    $("#" + _Self.getPanelId() + " .dataTypeTable").hide();
                    $("#" + _Self.getPanelId() + " .processingType").hide();


                    $("#" + _Self.getPanelId() + " #btnQuery").click(function() {
                        _Self.clearDataTable();
                        mPreFileTotalAmount = $("#" + _Self.getPanelId() + " #inpTotal").val();
                        if($.isFunction(_Self.onFileViewQueried())) {
                            _Self.onFileViewQueried().apply(this, [this, {'data':_Self.toJson(), 'dev':_Self.getQueryTpye(), 'action':'new'}]);
                        }
                    });
                    $("#" + _Self.getPanelId() +' #selSrc').on('change', function (event) {
                        _Self.clearDataTable();
                        if($.isFunction(_Self.onFileViewQueryDeviceChanged())) {
                            _Self.onFileViewQueryDeviceChanged().apply(this, [this, {'dev':_Self.getQueryTpye()}]);
                        }
                    });
                    $("#" + _Self.getPanelId() +' #selFltr input[type=checkbox]').on('change', function(){
                        var status = $(this).prop("checked");
                        if(status){
                            $($(this).attr("data-target")).show();
                        }else{
                            $($(this).attr("data-target")).hide();
                        }
                    });
                    $("#" + _Self.getPanelId() +' .collapse').on('hide.bs.collapse', function (event) {
                        event.stopPropagation();
                        if($(this).hasClass("configPanel")){
                            $("a[data-target='#"+this.id+"'] i").removeClass("fa-caret-down");
                            $("a[data-target='#"+this.id+"'] i").addClass("fa-caret-right");
                        }

                    });
                    $("#" + _Self.getPanelId() +' .collapse').on('shown.bs.collapse', function (event) {
                        event.stopPropagation();
                        if($(this).hasClass("configPanel")){
                            $("a[data-target='#"+this.id+"'] i").removeClass("fa-caret-right");
                            $("a[data-target='#"+this.id+"'] i").addClass("fa-caret-down");
                        }
                    }).collapse('show');
                };
            },

            DataLogOptionPanel: function(panelId) {
                var _onDataLogOptionSubmitted = null;
                var mContextContainerId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function(hasAi, hasAo) {
                    if(hasAi === false) {
                        $("#" + _Self.getPanelId() + " .aiType").hide();
                    }
                    if(hasAo === false) {
                        $("#" + _Self.getPanelId() + " .aoType").hide();
                    }

                    $("#" + _Self.getPanelId() + " #btnDataOptionSubmit").click(function(e) {
                        e.preventDefault();
                        if($.isFunction(_Self.onDataLogOptionSubmitted())) {
                            _Self.onDataLogOptionSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                };
                var getAIODataOptionCount = function(type) {
                    var count = 0;
                    if(type === 'AI') {
                        return $("#" + _Self.getPanelId() + " .aiType input").length;
                    }else if(type === 'AO') {
                        return $("#" + _Self.getPanelId() + " .aoType input").length;
                    }else{
                        return count;
                    }
                }
                this.setPanel = function(jsonObj) {
                    try{
                        $("#" + _Self.getPanelId() + " #inpTIM").prop("checked", Number(jsonObj.TIM));
                        var aiLgDataOptionArray = Advantech.Utility.convertMaskToArray(Number(jsonObj.AILgD), getAIODataOptionCount('AI'));
                        var aoLgDataOptionArray = Advantech.Utility.convertMaskToArray(Number(jsonObj.AOLgD), getAIODataOptionCount('AO'));
                        var dividePos = "cBAIData".length;
                        $("#" + _Self.getPanelId() + " .aiType input").each(function() {
                            var idx = this.id.slice(dividePos);
                            $(this).prop("checked", aiLgDataOptionArray[idx]);
                        });
                        dividePos = "cBAOData".length;
                        $("#" + _Self.getPanelId() + " .aoType input").each(function() {
                            var idx = this.id.slice(dividePos);
                            $(this).prop("checked", aoLgDataOptionArray[idx]);
                        });
                    }catch(e){
                        throw new Error("Setting log logger failed.")
                    }
                };
                this.toJson = function() {
                    var jsonObj = {};
                    jsonObj.TIM = $("#" + _Self.getPanelId() + " #inpTIM").prop('checked') ? 1 : 0;
                    if($('.aiType').is(':visible')) {
                        jsonObj.AILgD = getAILgDJson();
                    }
                    if($('.aoType').is(':visible')) {
                        jsonObj.AOLgD = getAOLgDJson();
                    }
                    return jsonObj;
                };
                var boolToNumber = function(val) {
                    return (val) ? 1 : 0;
                };
                var getAILgDJson = function() {
                    var maskArray = [];
                    var dividePos = "cBAIData".length;
                    $("#" + _Self.getPanelId() + " .aiType input").each(function() {
                        idx = parseInt(this.id.slice(dividePos), 10);
                        maskArray[idx] = boolToNumber($(this).prop('checked'));
                    });
                    return Advantech.Utility.convertArrayToMask(maskArray);
                };
                var getAOLgDJson = function() {
                    var maskArray = [];
                    var dividePos = "cBAOData".length;
                    $("#" + _Self.getPanelId() + " .aoType input").each(function() {
                        var idx = parseInt(this.id.slice(dividePos), 10);
                        maskArray[idx] = boolToNumber($(this).prop('checked'));
                    });
                    return Advantech.Utility.convertArrayToMask(maskArray);
                };
                this.onDataLogOptionSubmitted = function(x) {
                    if(!arguments.length) return _onDataLogOptionSubmitted;
                    _onDataLogOptionSubmitted = x;
                };
            },

            DataLogSensorOptionPanel: function(panelId) {
                //var _onDataLogOptionSubmitted = null;
                var mContextContainerId = panelId;
                var _Self = this;
                var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function(hasSensor, isEnableAvgMode) {
                    if(hasSensor === false) {
                        $("#" + _Self.getPanelId() + " .sensorType").hide();
                    }

                    $("#" + _Self.getPanelId() + " #btnSensorOptionSubmit").click(function(e) {
                        e.preventDefault();
                        if($.isFunction(_Self.onDataLogSensorOptionSubmitted())) {
                            _Self.onDataLogSensorOptionSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                    initialEventHandle();
                    if (isEnableAvgMode) {
                        $("#" + _Self.getPanelId() + " .sensorType #cBSensorData6").attr('disabled', 'disabled');
                        $("#" + _Self.getPanelId() + " .sensorType input[name='cBSensorData15']").attr('disabled', 'disabled');
                        if(typeof(profile.FCS) != 'undefined' && profile.FCS & Advantech.Profile.FCSMask.onlySupportFFT) {
                            $("#" + _Self.getPanelId() + " .sensorType .averageModeTooltip").attr('title', 'Please disable Feature Average Mode to enable FFT Data log.');
                        }
                        $("#" + _Self.getPanelId() + " .sensorType .averageModeTooltip").tooltip('enable');
                    } else {
                        $("#" + _Self.getPanelId() + " .sensorType .averageModeTooltip").tooltip('disable');
                    }
                }
                var initialEventHandle = function() {
                    if(!(typeof(profile.FCS) != 'undefined' && profile.FCS & Advantech.Profile.FCSMask.onlySupportFFT)) {
                        $("#" + _Self.getPanelId() + " .sensorType #cBSensorData6").click(function() {
                            if ($(this).prop('checked')) {
                                $("#" + _Self.getPanelId() + " .sensorType .rawDataFormat").show();
                            } else {
                                $("#" + _Self.getPanelId() + " .sensorType .rawDataFormat").hide();
                            }
                        });
                    }
                }
                var getDataOptionCount = function(type) {
                    //TODO: debugger: add array hash for each sensor data option(ch 20.1.6)
                    if (isWISE2411)
                        return 19;
                    else
                        return 16;
/*                    var count = 0;
                     if(type === 'Sensor') {
                        return $("#" + _Self.getPanelId() + " .sensorType input").length;
                    }else
                        return count; */
                }
                this.setPanel = function(jsonObj) {
                    try{
                        var sensorLgDataOptionArray = Advantech.Utility.convertMaskToArray(Number(jsonObj.SLgD), getDataOptionCount('Sensor'));
                        if(typeof(profile.FCS) != 'undefined' && profile.FCS & Advantech.Profile.FCSMask.onlySupportFFT) {
                            $("#" + _Self.getPanelId() + " .sensorType #dataFormatLabel").text('FFT Data');
                        } else {
                            if (sensorLgDataOptionArray[6] === 1) {
                                $("#" + _Self.getPanelId() + " .sensorType .rawDataFormat").show();
                            } else {
                                $("#" + _Self.getPanelId() + " .sensorType .rawDataFormat").hide();
                            }
                        }
                        //for sensor
                        var idLength = "cBSensorData".length;
                        $("#" + _Self.getPanelId() + " .sensorType #sensorOptions input").each(function() {
                            if (this.type == 'radio') { // Raw data format
                                var idx = this.name.slice(idLength);
                                $('input[name="cBSensorData15"][value="' + sensorLgDataOptionArray[idx] + '"]').prop('checked', true);
                                return; // continue
                            }
                            var idx = this.id.slice(idLength);
                            $(this).prop("checked", sensorLgDataOptionArray[idx]);
                        });
                        //for RMS
                        if (isWISE2411) {
                            $("#rmsEnable").prop("checked", jsonObj.RFD);
                        }
                    }catch(e){
                        throw new Error("Setting Sensor log logger failed.")
                    }
                }
                this.toJson = function() {
                    var jsonObj = {};
                    if($('.sensorType').is(':visible')) {
                        jsonObj.SLgD = getSLgDJson();
                    }
                    if (isWISE2411) {
                        jsonObj.RFD = getRFDJson();
                    }
                    return jsonObj;
                }
                var getSLgDJson = function() {
                    var maskArray = [];
                    var dividePos = "cBSensorData".length;
                    $("#" + _Self.getPanelId() + " .sensorType #sensorOptions input").each(function() {
                        if (this.type == 'radio') { // Raw data format
                            if ($(this).prop('checked')) {
                                var idx = parseInt(this.name.slice(dividePos), 10);
                                maskArray[idx] = parseInt(($(this).val()));
                            }
                            return; // continue
                        }
                        var idx = parseInt(this.id.slice(dividePos), 10);
                        maskArray[idx] = boolToNumber($(this).prop('checked'));
                    });
                    return Advantech.Utility.convertArrayToMask(maskArray);
                }
                var getRFDJson = function() {
                    if ($("#rmsEnable").prop("checked")) {
                        return 1023;
                    } else {
                        return 0;
                    }
                }
                var boolToNumber = function(val) {
                    return (val) ? 1 : 0;
                }
/*                this.onDataLogSensorOptionSubmitted = function(x) {
                    if(!arguments.length) return _onDataLogOptionSubmitted;
                    _onDataLogOptionSubmitted = x;
                };*/
            },

            DataLogSysOptionPanel: function(panelId) {
                var _onDataLogSysOptionSubmitted = null;
                var mContextContainerId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.setPanel = function(jsonObj) {
                    if (typeof jsonObj.Evt != 'undefined') {
                        var sysEventSupportArr = Advantech.Utility.convertMaskToArray(jsonObj.Evt, Advantech.Profile.DataLoggerSystemEventEmun.EmunUsefulLength);
                        $("#" + _Self.getPanelId() +" .form-group div").each(function() {
                            var id = this.id.slice(3);
                            if (sysEventSupportArr[Advantech.Profile.DataLoggerSystemEventEmun[id]] != 1) {
                                $(this).hide();
                            }
                        })
                    }
                    var sysEventArr = Advantech.Utility.convertMaskToArray(jsonObj.Ev, Advantech.Profile.DataLoggerSystemEventEmun.EmunUsefulLength);
                    $("#" + _Self.getPanelId() +" input").each(function() {
                        var id = this.id.slice(3);
                        $(this).prop("checked", int(sysEventArr[Advantech.Profile.DataLoggerSystemEventEmun[id]]) === 1 ? true : false);
                    })
                    $("#" + _Self.getPanelId() +" #inpCONFIG_ERROR").prop("checked", true);
                    $("#" + _Self.getPanelId() +" #inpFLASH_ERROR").prop("checked", true);
                };
                this.toJson = function() {
                    var jsonObj = {};
                    var sysEventArr = [];
                    $("#" + _Self.getPanelId() +" input").each(function(){
                        var id = this.id.slice(3);
                        sysEventArr[Advantech.Profile.DataLoggerSystemEventEmun[id]] = (this.checked) ? 1 : 0;
                    })
                    var sysEventMask = Advantech.Utility.convertArrayToMask(sysEventArr);
                    jsonObj.Ev = sysEventMask;
                    return jsonObj;
                };
                this.onDataLogSysOptionSubmitted = function(x) {
                    if(!arguments.length) return _onDataLogSysOptionSubmitted;
                    _onDataLogSysOptionSubmitted = x;
                };
            },

            DataLogLoggerConfigPanel: function(panelId) {
                var _onDataLogConfigSubmitted = null;
                var _onMemoryLogStatusChanged = null;
                var _onCloudLogStatusChanged = null;
                var _onPushLogStatusChanged = null;
                var mContextContainerId = panelId;
                var _Self = this;
                var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function() {
                    handleInputChange("selDEn");
                    handleInputChange("selSEn");
                    handleInputChange("logTIM");
                    handleSubmitted();
                };
                var handleInputChange = function(selectId){
                    var $selId = $("#"+_Self.getPanelId()+" #"+selectId);
                    $selId.change(function(){
                        if($(this).is("input")){ //for TimeStamp checkbox
                            if($(this).prop("checked"))
                                $("#"+_Self.getPanelId()).find($(this).attr('data-target')).removeAttr('disabled');
                            else
                                $("#"+_Self.getPanelId()).find($(this).attr('data-target')).attr('disabled', 'disabled');
                        }else{
                            var val = $(this).val();
                            var $currentOption = $(this).find("option[value='"+val+"']");
                            $(this).find("option").each(function(){
                                var target = $(this).attr('data-target');
                                if(target != undefined){
                                    var elements = target.split(" ");
                                    for(ele in elements){
                                       $(elements[ele]).hide();
                                    }
                                }
                            });
                            var target = $currentOption.attr('data-target');
                            if(target != undefined){
                                var elements = target.split(" ");
                                for(ele in elements){
                                    $(elements[ele]).show();
                                }
                            }
                        }
                    });
                };
                var handleSubmitted = function(){
                    $("#" + _Self.getPanelId() + " #btnLoggerConfigSubmit").click(function() {
                        /* if($.isFunction(_Self.onDataLogConfigSubmitted())) {
                            _Self.onDataLogConfigSubmitted().apply(this, [this, _Self.toJson()]);
                        } */
						if($.isFunction(_Self.onMemoryLogStatusChanged())) {
                            var status = $("#" + _Self.getPanelId() + " #memDEn").prop("checked")?1:0;
                            // if(status == 0){
                            //     $("#" + _Self.getPanelId() + " #cloudUploadSetting").hide();
                            //     $("#" + _Self.getPanelId() + " #cloudUploadSettingDesc").show();
                            // }else{
                            //     $("#" + _Self.getPanelId() + " #cloudUploadSetting").show();
                            //     $("#" + _Self.getPanelId() + " #cloudUploadSettingDesc").hide();
                            // }
                            if(typeof(profile.FCS) != 'undefined' && profile.FCS & Advantech.Profile.FCSMask.SystemLogger) {
                                _Self.onMemoryLogStatusChanged().apply(this, [this, {
                                    DEn: status,
                                    SEn: $("#" + _Self.getPanelId() + " #memSEn").prop("checked")?1:0
                                }]);
                            } else {
                                _Self.onMemoryLogStatusChanged().apply(this, [this, {DEn:status}]);
                            }
                        }
                    });
                     $("#" + _Self.getPanelId() + " #memDEn").click(function() {
                        /* if($.isFunction(_Self.onMemoryLogStatusChanged())) {
                            var status = $(this).prop("checked")?1:0;
                            if(status == 0){
                                $("#" + _Self.getPanelId() + " #cloudUploadSetting").hide();
                                $("#" + _Self.getPanelId() + " #cloudUploadSettingDesc").show();
                            }else{
                                $("#" + _Self.getPanelId() + " #cloudUploadSetting").show();
                                $("#" + _Self.getPanelId() + " #cloudUploadSettingDesc").hide();
                            }
                            _Self.onMemoryLogStatusChanged().apply(this, [this, {DEn:status}]);
                        } */
                    });
/*
                    $("#" + _Self.getPanelId() + " #memSEn").click(function() {
                        if($.isFunction(_Self.onMemoryLogStatusChanged())) {
                            var status = $(this).prop("checked")?1:0;
                            _Self.onMemoryLogStatusChanged().apply(this, [this, {SEn:status}]);
                        }
                    }); */
                    $("#" + _Self.getPanelId() + " #cloudEn").click(function() {
                        if($.isFunction(_Self.onCloudLogStatusChanged())) {
                            var status = $(this).prop("checked")?1:0;
                            _Self.onCloudLogStatusChanged().apply(this, [this, {En:status}]);
                        }
                    });
                    /*
                    $("#" + _Self.getPanelId() + " #cloudSEn").click(function() {
                        if($.isFunction(_Self.onCloudLogStatusChanged())) {
                            var status = $(this).prop("checked")?1:0;
                            _Self.onCloudLogStatusChanged().apply(this, [this, {SEn:status, En:status}]);
                        }
                    });*/
/*                     $("#" + _Self.getPanelId() + " #pushDEn").click(function() {
                        if($.isFunction(_Self.onPushLogStatusChanged())) {
                            var DEnStatus = $(this).prop("checked")?1:0;
                            var SEnStatus = $("#" + _Self.getPanelId() + " #pushSEn").prop("checked")?1:0;
                            if(DEnStatus ==0 && SEnStatus ==0)
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").hide();
                            else
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").show();
                            _Self.onPushLogStatusChanged().apply(this, [this, {DEn:DEnStatus}]);
                        }
                    });
                    $("#" + _Self.getPanelId() + " #pushSEn").click(function() {
                        if($.isFunction(_Self.onPushLogStatusChanged())) {
                            var SEnStatus = $(this).prop("checked")?1:0;
                            var DEnStatus = $("#" + _Self.getPanelId() + " #pushDEn").prop("checked")?1:0;
                            if(DEnStatus ==0 && SEnStatus ==0)
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").hide();
                            else
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").show();
                            _Self.onPushLogStatusChanged().apply(this, [this, {SEn:SEnStatus}]);
                        }
                    }); */
					$("#" + _Self.getPanelId() + " #pushREn").click(function() {
                        if($.isFunction(_Self.onPushLogStatusChanged())) {
                            var REnStatus = $(this).prop("checked")?1:0;
                            //var SEnStatus = $("#" + _Self.getPanelId() + " #pushSEn").prop("checked")?1:0;
                            //if(DEnStatus ==0 && SEnStatus ==0)
							if(REnStatus ==0)
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").hide();
                            else
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").show();
                            _Self.onPushLogStatusChanged().apply(this, [this, {REn:REnStatus}]);
                        }
                    });
                };
                this.setPanel = function(logSwitchJson, logUploadJson, pushOutputJson) {
                    try{
                        if(logSwitchJson !=null){
                            $("#"+_Self.getPanelId()+" #memDEn").prop("checked", int(logSwitchJson.DEn) === 1 ? true : false);
                            if(typeof(profile.FCS) != 'undefined' && profile.FCS & Advantech.Profile.FCSMask.SystemLogger) {
                                $("#"+_Self.getPanelId()+" #systemLogSwitch").show();
                                $("#"+_Self.getPanelId()+" #memSEn").prop("checked", int(logSwitchJson.SEn) === 1 ? true : false);
                            }
                            /* if(int(logSwitchJson.DEn) === 0 && int(logSwitchJson.SEn) === 0){
                                $("#" + _Self.getPanelId() + " #cloudUploadSetting").hide();
                                $("#" + _Self.getPanelId() + " #cloudUploadSettingDesc").show();
                            }else{
                                $("#" + _Self.getPanelId() + " #cloudUploadSetting").show();
                                $("#" + _Self.getPanelId() + " #cloudUploadSettingDesc").hide();
                            } */
                        }
                        if(logUploadJson != null){
                            $("#"+_Self.getPanelId()+" #cloudEn").prop("checked", int(logUploadJson.En) !== 0 ? true : false);
                            $("#"+_Self.getPanelId()+" #logFn").val(int(logUploadJson.Fn));
                            $("#"+_Self.getPanelId()+" #logTmF").val(int(logUploadJson.TmF));
                            //$("#"+_Self.getPanelId()+" #selDEn" ).val(logUploadJson.DEn).trigger("change");
                            //$("#"+_Self.getPanelId()+" #inpDTim").val(logUploadJson.DTim);
                            //$("#"+_Self.getPanelId()+" #inpDItm").val(logUploadJson.DItm);
                            //$("#"+_Self.getPanelId()+" #cloudSEn").prop("checked", int(logUploadJson.SEn) !== 0 ? true : false);
                            //$("#"+_Self.getPanelId()+" #selSEn" ).val(logUploadJson.SEn).trigger("change");
                            //$("#"+_Self.getPanelId()+" #inpSTim").val(logUploadJson.STim);
                            //$("#"+_Self.getPanelId()+" #inpSItm").val(logUploadJson.SItm);
                            //$("#"+_Self.getPanelId()+" #inpDTag").val(logUploadJson.DTag);
                            //$("#"+_Self.getPanelId()+" #inpSTag").val(logUploadJson.STag);
                        }
                        if(pushOutputJson != null){
                            //$("#"+_Self.getPanelId()+" #pushDEn").prop("checked", int(pushOutputJson.DEn) === 1 ? true : false);
                            //$("#"+_Self.getPanelId()+" #pushSEn").prop("checked", int(pushOutputJson.SEn) === 1 ? true : false);
                            $("#"+_Self.getPanelId()+" #pushREn").prop("checked", int(pushOutputJson.REn) === 1 ? true : false);
                            $("#"+_Self.getPanelId()+" #logMAC").prop("checked", int(pushOutputJson.MAC) === 1 ? true : false);
                            $("#"+_Self.getPanelId()+" #logTIM").prop("checked", int(pushOutputJson.TIM) === 1 ? true : false).trigger("change");
                            $("#"+_Self.getPanelId()+" #selTmF").val(int(pushOutputJson.TmF));
                            //if(int(pushOutputJson.DEn) ==0 && int(pushOutputJson.SEn) ==0)
                            if(int(pushOutputJson.REn) == 0)
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").hide();
                            else
                                $("#" + _Self.getPanelId() + " #pushNotifySetting").show();
                        }
                    }catch(e){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Data Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Data Error during network transfer. Page will be ReLoaded!<h5>");
                        Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
                    }
                };
                this.toJson = function() {
                    var jsonObj = {};
                    var containers = ['log_upload', 'push_output'];
                    containers.forEach(function(container){
                        var obj = {};
                        $("#" + _Self.getPanelId() + " #"+ container +" input").each(function() {
                            if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                                var type = this.type;
                                var id = this.id.slice(3);
                                if(type === "checkbox") {
                                    obj[id] = (this.checked) ? 1 : 0;
                                }else if(type === "number" || $(this).hasClass("isNumericType")) {
                                    obj[id] = Number($(this).val());
                                }else{
                                    obj[id] = $(this).val();
                                }
                            }
                        });
                        $("#" + _Self.getPanelId() + " #"+ container +" select").each(function() {
                            if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                                var id = this.id.slice(3);
                                obj[id] = Number($(this).val());
                            }
                        });
                        jsonObj[container] = obj;
                    });
                    return jsonObj;
                };

                this.onDataLogConfigSubmitted = function(x) {
                    if(!arguments.length) return _onDataLogConfigSubmitted;
                    _onDataLogConfigSubmitted = x;
                };
                this.onMemoryLogStatusChanged = function(x) {
                    if(!arguments.length) return _onMemoryLogStatusChanged;
                    _onMemoryLogStatusChanged = x;
                };
                this.onCloudLogStatusChanged = function(x) {
                    if(!arguments.length) return _onCloudLogStatusChanged;
                    _onCloudLogStatusChanged = x;
                };
                this.onPushLogStatusChanged = function(x) {
                    if(!arguments.length) return _onPushLogStatusChanged;
                    _onPushLogStatusChanged = x;
                };
            },

            DataLogMediaConditionPanel: function(panelId) {
                var _onDataLogMediaSubmitted = null;
                var _onDataLogUploadMediaStatusChanged = null;
                var mContextContainerId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function() {
                    handleSubmitted();
                };

                var handleSubmitted = function(){
                    $("#" + _Self.getPanelId() + " #btnLogMediaSubmit").click(function() {
                        if($.isFunction(_Self.onDataLogMediaSubmitted())) {
                            _Self.onDataLogMediaSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                    $("#" + _Self.getPanelId() + " #inpMEn").click(function() {
                        if($.isFunction(_Self.onDataLogUploadMediaStatusChanged())) {
                            var status = $(this).prop("checked")?1:0;
                            _Self.onDataLogUploadMediaStatusChanged().apply(this, [this, {MEn:status}]);
                        }
                    });

                };
                this.setPanel = function(jsonObj) {
                    try{
                        $("#"+_Self.getPanelId()+" #inpMEn" ).prop("checked", Boolean(Number(jsonObj.MEn)));
                        $("#"+_Self.getPanelId()+" #selMLg" ).val(jsonObj.MLg);
                        $("#"+_Self.getPanelId()+" #selMF" ).val(jsonObj.MF);
                    }catch(e){
                        throw new Error("Setting media logger failed.")
                    }
                };
                this.toJson = function() {
                    var obj = {};
                    $("#" + _Self.getPanelId() + " input").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var type = this.type;
                            var id = this.id.slice(3);
                            if(type === "checkbox") {
                                obj[id] = (this.checked) ? 1 : 0;
                            }else if(type === "number" || $(this).hasClass("isNumericType")) {
                                obj[id] = Number($(this).val());

                            }else{
                                obj[id] = $(this).val();
                            }
                        }
                    });
                    $("#" + _Self.getPanelId() + " select").each(function() {
                        if(!$(this).is(":disabled") && ($(this).css("display")!='none') && $(this).is(":visible")) {
                            var id = this.id.slice(3);
                            obj[id] = Number($(this).val());
                        }
                    });
                    return obj;
                };
                this.onDataLogMediaSubmitted = function(x) {
                    if(!arguments.length) return _onDataLogMediaSubmitted;
                    _onDataLogMediaSubmitted = x;
                };
                this.onDataLogUploadMediaStatusChanged = function(x) {
                    if(!arguments.length) return _onDataLogUploadMediaStatusChanged;
                    _onDataLogUploadMediaStatusChanged = x;
                };
            },

            DataLogConditionPanel: function(panelId) {
                var _onDataLogConditionSubmitted = null;
                var _onDataLogStatusChanged = null;
                var _onDataLogStorageStatusChanged = null;
                var mContextContainerId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function(hasAi, hasAo) {
                    if(hasAi == false) {
                        $("#" + _Self.getPanelId() + " .aiType").hide();
                    }
                    if(hasAo == false) {
                        $("#" + _Self.getPanelId() + " .aoType").hide();
                    }
                    $("#" + _Self.getPanelId() + " #btnLogConditionSubmit").click(function(e) {
                        e.preventDefault();
                        if($.isFunction(_Self.onDataLogConditionSubmitted())) {
                            _Self.onDataLogConditionSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                    $("#" + _Self.getPanelId() + " #inpIntLg").change(function(e) {
                        var status = $(this).prop("checked")?1:0;
                        if($.isFunction(_Self.onDataLogStorageStatusChanged())) {
                            _Self.onDataLogStorageStatusChanged().apply(this, [this, {IntLg:status}]);
                        }
                    });
                };
                this.setPanel = function(jsonObj) {
                    try{
                        //$("#" + _Self.getPanelId() + " #inpEn").prop("checked",  isDataLogEnable);
                        $("#" + _Self.getPanelId() + " #inpPer").prop("checked", (int(jsonObj.Per) ==1)?true:false);
                        //$("#" + _Self.getPanelId() + " #inpCWDT").prop("checked", (int(jsonObj.CWDT) ==1)?true:false);
                        //$("#" + _Self.getPanelId() + " #inpPItv").val(jsonObj.PItv);
                        $("#" + _Self.getPanelId() + " #inpCir").prop("checked", (int(jsonObj.Cir) ==1)?true:false);
                        $("#" + _Self.getPanelId() + " #inpRst").prop("checked", (int(jsonObj.Rst) ==1)?true:false);
                        /* if(jsonObj.IntLg != undefined){
                            $("#" + _Self.getPanelId() + " #inpIntLg").prop("checked", (int(jsonObj.IntLg) ==1)?true:false);
                        }
                        if(jsonObj.AIDR != undefined){
                            $("#" + _Self.getPanelId() + " #inpAIDR").val(jsonObj.AIDR);
                        }
                        if(jsonObj.AODR != undefined){
                             $("#" + _Self.getPanelId() + " #inpAODR").val(jsonObj.AODR);
                        } */
                    }catch(e){
                        throw new Error("Setting data log condition parameter failed.")
                    }
                };
                this.toJson = function() {
                    var jsonObj = {};
                    var dividePos = "inp".length;
                    $("#" + _Self.getPanelId() + " input").each(function() {
                        if($(this).is(':visible')) {
                            var propName = this.id.slice(dividePos);
                            if(this.type === 'checkbox') {
                                jsonObj[propName] = $(this).prop('checked') ? 1 : 0;
                            }else{
                                jsonObj[propName] = parseInt($(this).val(), 10);
                            }
                        }
                    });
                    dividePos = "sel".length;
                    $("#" + _Self.getPanelId() + " select").each(function() {
                        if($(this).is(':visible')) {
                            var propName = this.id.slice(dividePos);
                            jsonObj[propName] = parseInt($(this).val(), 10);
                        }
                    });
                    return jsonObj;
                };
                this.onDataLogStorageStatusChanged = function(x) {
                    if(!arguments.length) return _onDataLogStorageStatusChanged;
                    _onDataLogStorageStatusChanged = x;
                };
                this.onDataLogStatusChanged = function(x) {
                    if(!arguments.length) return _onDataLogStatusChanged;
                    _onDataLogStatusChanged = x;
                };
                this.onDataLogConditionSubmitted = function(x) {
                    if(!arguments.length) return _onDataLogConditionSubmitted;
                    _onDataLogConditionSubmitted = x;
                };
            },

            DataLogIOChannelConfigTable: function(tableId, channelNumber) {
                var mContextContainerId = tableId;
                var mChannelNumber = channelNumber;
                var mIsAiUioChannel = false;
                var mColIndexChMsk = 1;
                var mColIndexChDiMsk = 2;
                var mColIndexChCOS = 2;
                var mColIndexUiCOSk = 4;
                //sensor///
                var mColIndexDevi = 2;
                var mColIndexHiA = 3;
                var mColIndexLiA = 4;
                ///////////
                var _Self = this;
                this.getTableId = function() {
                    return mContextContainerId;
                };
                this.getChannelNumber = function() {
                    return mChannelNumber;
                };

                this.toJson = function() {
                    var enArray = [];
                    var enUiArray = [];
                    var cosArray = [];
                    var uioArray = [];
                    var jsonObj = [];
                    $("#" + _Self.getTableId() + " tbody tr").each(function() {
                        if(this.cells){
                            var idx = this.id.slice("row".length);
                            if(idx !== 'All') {
                                if(idx =='Avg'){
                                    enArray[_Self.getChannelNumber()-1] = $(this.cells[mColIndexChMsk]).find("input").prop("checked");
                                    cosArray[_Self.getChannelNumber()-1] = $(this.cells[mColIndexChCOS]).find("input").prop("checked");
                                    if(mIsAiUioChannel){
                                        enUiArray[_Self.getChannelNumber()-1] = $(this.cells[mColIndexChDiMsk]).find("input").prop("checked");
                                        uioArray[_Self.getChannelNumber()-1] = $(this.cells[mColIndexUiCOSk]).find("input").prop("checked");
                                    }
                                }
                                else{
                                    enArray[idx] = $(this.cells[mColIndexChMsk]).find("input").prop("checked");
                                    cosArray[idx] = $(this.cells[mColIndexChCOS]).find("input").prop("checked");
                                    if(mIsAiUioChannel){
                                        enUiArray[idx] = $(this.cells[mColIndexChDiMsk]).find("input").prop("checked");
                                        uioArray[idx] = $(this.cells[mColIndexUiCOSk]).find("input").prop("checked");
                                    }
                                }
                            }
                        }
                    });
                    jsonObj.enMask = Advantech.Utility.convertArrayToMask(enArray);
                    jsonObj.cosMask = Advantech.Utility.convertArrayToMask(cosArray);
                    if(mIsAiUioChannel){
                        jsonObj.enUiMask = Advantech.Utility.convertArrayToMask(enUiArray);
                        jsonObj.uioMask = Advantech.Utility.convertArrayToMask(uioArray);
                    }
                    return jsonObj;
                };

                this.setEnColumn = function(chEnMask) {
                    try{
                        var enArray = Advantech.Utility.convertMaskToArray(parseInt(chEnMask, 10), this.getChannelNumber());
                        $("#" + _Self.getTableId() + " tbody tr").each(function() {
                            var idx = this.id.slice("row".length);
                            if(this.cells){
                                if(idx !== 'All') {
                                    if(idx == 'Avg'){
                                        $(this.cells[mColIndexChMsk]).find("input").prop("checked", enArray[_Self.getChannelNumber()-1]);
                                    }
                                    else if(enArray[idx] !== undefined) {
                                        $(this.cells[mColIndexChMsk]).find("input").prop("checked", enArray[idx]);
                                    }else{
                                        throw new Error("The channel enabled row size is creepy.");
                                    }
                                }
                            }
                        });
                    }catch(e){
                        throw new Error("Setting data log enabled mask column failed.")
                    }
                };

                this.setUioDiEnColumn = function(chEnMask) {
                    try{
                        var enArray = Advantech.Utility.convertMaskToArray(parseInt(chEnMask, 10), this.getChannelNumber());
                        $("#" + _Self.getTableId() + " tbody tr").each(function() {
                            var idx = this.id.slice("row".length);
                            if(this.cells){
                                if(idx !== 'All') {
                                    if(idx == 'Avg'){
                                        $(this.cells[mColIndexChDiMsk]).find("input").prop("checked", enArray[_Self.getChannelNumber()-1]);
                                    }
                                    else if(enArray[idx] !== undefined) {
                                        $(this.cells[mColIndexChDiMsk]).find("input").prop("checked", enArray[idx]);
                                    }else{
                                        throw new Error("The DI channel enabled row size is creepy.");
                                    }
                                }
                            }
                        });
                    }catch(e){
                        throw new Error("Setting data log DI enabled mask column failed.")
                    }
                };

                this.setCosColumn = function(chCOSMask) {
                    try{
                        var cosArray = Advantech.Utility.convertMaskToArray(parseInt(chCOSMask, 10), this.getChannelNumber());
                        $("#" + _Self.getTableId() + " tbody tr").each(function() {
                            var idx = this.id.slice("row".length);
                            if(this.cells){
                                if(idx !== 'All') {
                                    if(idx == 'Avg'){
                                        $(this.cells[mColIndexChCOS]).find("input").prop("checked", cosArray[_Self.getChannelNumber()-1]);
                                    }
                                    else if(cosArray[idx] !== undefined) {
                                        $(this.cells[mColIndexChCOS]).find("input").prop("checked", cosArray[idx]);
                                    }
                                    else {
                                        throw new Error("The channel C.O.S row size is creepy.");
                                    }
                                }
                            }
                        });
                    }catch(e){
                        throw new Error("Setting data log C.O.S mask column failed.")
                    }
                };

                this.setUioColumn = function(chUioMask){
                    try{
                        var uioArray = Advantech.Utility.convertMaskToArray(parseInt(chUioMask, 10), this.getChannelNumber());
                        $("#" + _Self.getTableId() + " tbody tr").each(function() {
                            var idx = this.id.slice("row".length);
                            if(this.cells){
                                if(idx !== 'All') {
                                    if(idx == 'Avg'){
                                        $(this.cells[mColIndexUiCOSk]).find("input").prop("checked", uioArray[_Self.getChannelNumber()-1]);
                                    }
                                    else if(uioArray[idx] !== undefined) {
                                        $(this.cells[mColIndexUiCOSk]).find("input").prop("checked", uioArray[idx]);
                                    }
                                    else {
                                        throw new Error("The channel UIO row size is creepy.");
                                    }
                                }
                            }
                        });
                        //mIsAiUioChannel = true;
                    }catch(e){
                        throw new Error("Setting data log UIO mask column failed.")
                    }
                };

                this.setSensorColumns = function(jsonObj){
                    try{
                        var deviArray = Advantech.Utility.convertMaskToArray(parseInt(jsonObj.SCOS, 10), this.getChannelNumber());//deviation enable mask
                        var hiaArray = Advantech.Utility.convertMaskToArray(parseInt(jsonObj.SHiA, 10), this.getChannelNumber());//high alarm mask
                        var liaArray = Advantech.Utility.convertMaskToArray(parseInt(jsonObj.SLoA, 10), this.getChannelNumber());//low alarm mask
                        $("#" + _Self.getTableId() + " tbody tr").each(function() {
                            var idx = this.id.slice("row".length);
                            if(this.cells){
                                if(deviArray[idx] !== undefined && hiaArray[idx] !== undefined && liaArray[idx] !== undefined) {
                                    $(this.cells[mColIndexDevi]).find("input").prop("checked", deviArray[idx]);
                                    $(this.cells[mColIndexHiA]).find("input").prop("checked", hiaArray[idx]);
                                    $(this.cells[mColIndexLiA]).find("input").prop("checked", liaArray[idx]);
                                }else {
                                    throw new Error("The channel Sensor row size is creepy.");
                                }
                            }
                        });
                    }catch(e){
                        throw new Error("Setting data log Sensor column failed.")
                    }
                };

                this.initialTable = function(containerName) {

                }
                this.addRow = function(index, bIsUioChannel) {
                    var row = document.createElement('tr');
                    row.id = 'row' + index;
                    if(typeof(bIsUioChannel)!='undefined' && bIsUioChannel){
                        mIsAiUioChannel = true;
                        mColIndexChCOS = 3;
                    }
                    for (var i = 0; i < 5; ++i) {
                        if(i == 0) {
                            var cell = row.insertCell(i);
                            cell.innerHTML = index;
                        }else if(i == 1) {
                            var cell = row.insertCell(i);
                            cell.innerHTML = "<input type='checkbox' id='cbChMask" + index + "'>";
                        }else if(i >= 2){
                            if(mIsAiUioChannel){ //UIO channel
                                switch(i){
                                    case 2:
                                        var cell = row.insertCell(i);
                                        if(index == "Avg")//DI AVG is not available
                                            cell.innerHTML = "<input type='checkbox' id='cbChDiMask" + index + "' disabled>";
                                        else
                                            cell.innerHTML = "<input type='checkbox' id='cbChDiMask" + index + "'>";
                                        break;
                                    case 3:
                                        var cell = row.insertCell(i);
                                        cell.innerHTML = "<input type='checkbox' id='cbChCOS" + index + "'>";
                                        break;
                                    case 4:
                                        var cell = row.insertCell(i);
                                        if(index == "Avg")//DI AVG is not available
                                            cell.innerHTML = "<input type='checkbox' id='cbChUIO" + index + "' disabled>";
                                        else
                                            cell.innerHTML = "<input type='checkbox' id='cbChUIO" + index + "'>";
                                        break;
                                }
                            }else{//AI channel
                                if(i == 2){
                                    var cell = row.insertCell(i);
                                    cell.innerHTML = "<input type='checkbox' id='cbChCOS" + index + "'>";
                                }
                            }
                        }
                    }
                    $("#" + this.getTableId() + " tbody").append(row);
                }
                this.addSensorTableRow = function(index) {
                    var tableColumnAmount = 2;
                    var row = document.createElement('tr');
                    row.id = 'row' + index;
                    for (var i = 0; i < tableColumnAmount; ++i) {
                        if(i == 0) {
                            var cell = row.insertCell(i);
                            cell.innerHTML = index;
                        }else if(i >= 1){
                            switch(i){
                                case 1:
                                    var cell = row.insertCell(i);
                                    cell.innerHTML = "<input type='checkbox' id='cbLogMask" + index + "'>";
                                    break;
                                case 2:
                                    var cell = row.insertCell(i);
                                    cell.innerHTML = "<input type='checkbox' id='cbDeviMask" + index + "'>";
                                    break;
                                case 3:
                                    var cell = row.insertCell(i);
                                    cell.innerHTML = "<input type='checkbox' id='cbHiaMask" + index + "'>";
                                    break;
                                case 4:
                                    var cell = row.insertCell(i);
                                    cell.innerHTML = "<input type='checkbox' id='cbLiaMask" + index + "'>";
                                    break;
                            }
                        }
                    }
                    $("#" + this.getTableId() + " tbody").append(row);
                }
            },
            /*inherited from DataLogIOChannelConfigTable*/
            DataLogDIOChannelConfigTable: function(tableId, channelNumber) {
                Advantech.Form.AdvancedForm.DataLogIOChannelConfigTable.apply(this, arguments);
                var _Self = this;

                this.initialTable = function(containerName) {
                    var tanleConfigContainer = document.createElement('div');
                    tanleConfigContainer.className = 'table-responsive';
                    tanleConfigContainer.id = this.getTableId();
                    tanleConfigContainer.innerHTML = "<table class='table table-bordered table-hover'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Channel</th>" +
                        "<th>Log Enabled <input type='checkbox' id='chMskAll'></th>" +
                        "<th>Change of State <input type='checkbox' id='chCOSAll'></th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>";
                    document.getElementById(containerName).appendChild(tanleConfigContainer);
                    var i = 0;
                    while (i < _Self.getChannelNumber()) {
                        this.addRow(i);
                        i++;
                    }
                    $("#"+_Self.getTableId()+" #chMskAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[1]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                    $("#"+_Self.getTableId()+" #chCOSAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[2]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                };
            },

            /*Inheritance from DataLogIOChannelConfigTable*/
            DataLogAIOChannelConfigTable: function(tableId, channelNumber, hasAvg) {
                Advantech.Form.AdvancedForm.DataLogIOChannelConfigTable.apply(this, arguments);
                var _Self = this;

                this.initialTable = function(containerName) {
                    var uiFlag = Advantech.Profile.DeviceEmun[module].isSupportUniversalInput;
                    var tanleConfigContainer = document.createElement('div');
                    var colIndexChMskAll = 1;
                    var colIndexChDiMskAll = 2;
                    var colIndexChCOSAll = 3;
                    var colIndexUiCOSkAll = 4;
                    tanleConfigContainer.className = 'table-responsive';
                    tanleConfigContainer.id = this.getTableId();
                    var htmlStr = "<table class='table table-bordered table-hover'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Channel</th>";
                    if(typeof(uiFlag)!='undefined' && uiFlag){//UI channel
                        htmlStr += "<th>AI Log Enabled <input type='checkbox' id='chMskAll'></th>" +
                        "<th>DI Log Enabled <input type='checkbox' id='chDiMskAll'></th>" +
                        "<th>AI Deviation Enabled <input type='checkbox' id='chCOSAll'></th>" + "<th>DI Change of State <input type='checkbox' id='uiCOSAll'></th>";
                        uiFlag = true;
                    }else{//AI channel
                        htmlStr += "<th>Log Enabled <input type='checkbox' id='chMskAll'></th>" +
                        "<th>Deviation Enabled <input type='checkbox' id='chCOSAll'></th>";
                        uiFlag = false;
                        colIndexChCOSAll =2;
                    }
                    htmlStr += "</tr></thead><tbody></tbody></table>";
                    tanleConfigContainer.innerHTML = htmlStr;
                    document.getElementById(containerName).appendChild(tanleConfigContainer);
                    var ch = 0;
                    var totalChannel = _Self.getChannelNumber();
                    while(ch < totalChannel) {
                        if(hasAvg == true && ch== totalChannel-1 ){
                            this.addRow("Avg", uiFlag);
                        }else{
                            this.addRow(ch, uiFlag);
                        }
                        ch++;
                    }
                    $("#"+_Self.getTableId()+" #chMskAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[colIndexChMskAll]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                    $("#"+_Self.getTableId()+" #chCOSAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[colIndexChCOSAll]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                    if(uiFlag){
                        $("#"+_Self.getTableId()+" #chDiMskAll").change(function(){
                            var val = $(this).prop("checked");
                            $("#"+_Self.getTableId()+" tbody tr").each(function(){
                                if(this.cells){
                                    $($(this)[0].cells[colIndexChDiMskAll]).find("input[type=checkbox]:enabled").prop("checked", val);
                                }
                            });
                        });
                        $("#"+_Self.getTableId()+" #uiCOSAll").change(function(){
                            var val = $(this).prop("checked");
                            $("#"+_Self.getTableId()+" tbody tr").each(function(){
                                if(this.cells){
                                    $($(this)[0].cells[colIndexUiCOSkAll]).find("input[type=checkbox]:enabled").prop("checked", val);
                                }
                            });
                        });
                    }
                };
            },
            /*inherited from DataLogIOChannelConfigTable*/
            DataLogSensorChannelConfigTable: function(tableId, channelNumber) {
                Advantech.Form.AdvancedForm.DataLogIOChannelConfigTable.apply(this, arguments);
                var _Self = this;

                this.initialTable = function(containerName) {
                    var tanleConfigContainer = document.createElement('div');
                    tanleConfigContainer.className = 'table-responsive';
                    tanleConfigContainer.id = this.getTableId();
                    tanleConfigContainer.innerHTML = "<table class='table table-bordered table-hover'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Channel</th>" +
                        "<th>Log Enabled <input type='checkbox' id='chLogAll'></th>" +
                        //"<th>Deviation Enabled <input type='checkbox' id='chDevAll'></th>" +
                        //"<th>High Alarm <input type='checkbox' id='chHiaAll'></th>" +
                        //"<th>Low Alarm <input type='checkbox' id='chLiaAll'></th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>";
                    document.getElementById(containerName).appendChild(tanleConfigContainer);
                    var i = 0;
                    while (i < _Self.getChannelNumber()) {
                        this.addSensorTableRow(i);
                        i++;
                    }
                    $("#"+_Self.getTableId()+" #chLogAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[1]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                    $("#"+_Self.getTableId()+" #chDevAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[2]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                    $("#"+_Self.getTableId()+" #chHiaAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[3]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                    $("#"+_Self.getTableId()+" #chLiaAll").change(function(){
                        var val = $(this).prop("checked");
                        $("#"+_Self.getTableId()+" tbody tr").each(function(){
                            if(this.cells){
                                $($(this)[0].cells[4]).find("input[type=checkbox]").prop("checked", val);
                            }
                        });
                    });
                }
                this.toJson = function() {
                    var enArray = [];
                    var devArray = [];
                    var hiaArray = [];
                    var lianObj = [];
                    var colIndexChMask = 1; //sensor ch enable mask
                    var colIndexDevMask = 2; //sensor deviation mask
                    var colIndexHiaMask = 3; //sensor high alarm mask
                    var colIndexLiaMask = 4; //sensor low alarm mask
                    var jsonObj = {};
                    $("#" + _Self.getTableId() + " tbody tr").each(function() {
                        if(this.cells){
                            var idx = this.id.slice("row".length);
                            enArray[idx] = $(this.cells[colIndexChMask]).find("input").prop("checked");
                            devArray[idx] = $(this.cells[colIndexDevMask]).find("input").prop("checked");
                            hiaArray[idx] = $(this.cells[colIndexHiaMask]).find("input").prop("checked");
                            lianObj[idx] = $(this.cells[colIndexLiaMask]).find("input").prop("checked");
                        }
                    })
                    jsonObj.enMask = Advantech.Utility.convertArrayToMask(enArray);
                    jsonObj.devMask = Advantech.Utility.convertArrayToMask(devArray);
                    jsonObj.hiaMask = Advantech.Utility.convertArrayToMask(hiaArray);
                    jsonObj.liaMask = Advantech.Utility.convertArrayToMask(lianObj);
                    return jsonObj;
                }
            },

            /*inherited from DataLogIOChannelConfigTable*/
            DataLogEmptyChannelConfigTable: function(tableId, channelNumber) {
                Advantech.Form.AdvancedForm.DataLogIOChannelConfigTable.apply(this, arguments);
                this.toJson = function() {
                    var jsonObj = [];
                    jsonObj.enMask = 0;
                    jsonObj.cosMask = 0;
                    return jsonObj;
                };

                this.setEnColumn = function(chEnMask) {
                    return;
                };

                this.setCosColumn = function(chCOSMask) {
                    return;
                };

                this.initialTable = function(containerName) {
                    var tableConfigContainer = document.createElement('div');
                    tableConfigContainer.className = 'col-lg-12';
                    tableConfigContainer.id = this.getTableId();
                    tableConfigContainer.innerHTML = "<div class = 'row'>" +
                        "<br>" +
                        "<br>" +
                        "<br>" +
                        "<center><h3><i class='fa fa-fw fa-exclamation-triangle'></i>Is Empty</h3></center>" +
                        "<br>" +
                        "<br>" +
                        "<br>" +
                        "</div>";
                    document.getElementById(containerName).appendChild(tableConfigContainer);
                };
            },
            DataLogChannelPageFactory: function() {
                this.instancePage = function(iOType, tableId, channelNumber, hasAvg) {
                    if(iOType === "AIO") {
                        return new Advantech.
                        Form.
                        AdvancedForm.
                        DataLogAIOChannelConfigTable(tableId, channelNumber, hasAvg);
                    }else if(iOType === "DIO") {
                        return new Advantech.
                        Form.
                        AdvancedForm.
                        DataLogDIOChannelConfigTable(tableId, channelNumber);
                    }else if(iOType === "Sensor") { //sensor
                        return new Advantech.
                        Form.
                        AdvancedForm.
                        DataLogSensorChannelConfigTable(tableId, channelNumber);
                    }else{
                        return new Advantech.
                        Form.
                        AdvancedForm.
                        DataLogEmptyChannelConfigTable(tableId, channelNumber);
                    }
                };
            },
            DataLogSlotMaskPage: function(panelId, idx) {
                var mContextContainerId = panelId;
                var mIndex = idx;
                var mAIPage = null;
                var mAOPage = null;
                var mDIPage = null;
                var mDOPage = null;
                var mSensorPage = null;
                var _Self = this;

                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.getIndex = function() {
                    return mIndex;
                };
                this.initialPage = function(profileObj) {
                    profileObj["DOn"] = int(profileObj["DOn"]) + int(profileObj["RLAn"]);
                    var chPageFactory = new Advantech.Form.AdvancedForm.DataLogChannelPageFactory();
                    var typeArray = [
                        {
                            iOType: "AI",
                            factoryType: "AIO",
                            pageHandle: {},
                            hasAvg : true
                        }, {
                            iOType: "AO",
                            factoryType: "AIO",
                            pageHandle: {},
                            hasAvg : false
                        }, {
                            iOType: "DI",
                            factoryType: "DIO",
                            pageHandle: {},
                            hasAvg : false
                        }, {
                            iOType: "DO",
                            factoryType: "DIO",
                            pageHandle: {},
                            hasAvg : false
                        }, {
                            iOType: "S", //sensor
                            factoryType: "Sensor",
                            pageHandle: {},
                            hasAvg : false
                        }
                    ];
                    for (var i = 0; i < typeArray.length; ++i) {
                        var iOType = typeArray[i].iOType;
                        var factoryType = typeArray[i].factoryType;
                        var profileProp = iOType + "n";
                        var channelNumber = (profileObj != null) ? profileObj[profileProp] : 0;
                        channelNumber = parseInt(channelNumber, 10);
                        if( iOType == "AI" && channelNumber > 0){
                            channelNumber++;/*Avg*/
                        }
                        var page = (channelNumber > 0) ? chPageFactory.instancePage(factoryType, getTableId(iOType), channelNumber, typeArray[i].hasAvg) :
                            chPageFactory.instancePage("Null", getTableId(iOType), 0);
                        page.initialTable(getIOPageContainerId(iOType));
                        (function(i, page) {
                            typeArray[i].pageHandle = page;
                        })(i, page);
                    }
                    mAIPage = typeArray[0].pageHandle;
                    mAOPage = typeArray[1].pageHandle;
                    mDIPage = typeArray[2].pageHandle;
                    mDOPage = typeArray[3].pageHandle;
                    mSensorPage = typeArray[4].pageHandle;
                };
                this.setPageEn = function(jsonObj, bUiChannel) {
                    try{
                        if(jsonObj.DIChM !== undefined) {
                            mDIPage.setEnColumn(jsonObj.DIChM);
                            if(bUiChannel)
                                mAIPage.setUioDiEnColumn(jsonObj.DIChM);
                        }
                        if(jsonObj.DOChM !== undefined) {
                            mDOPage.setEnColumn(jsonObj.DOChM);
                        }
                        if(jsonObj.AIChM !== undefined) {
                            mAIPage.setEnColumn(jsonObj.AIChM);
                        }
                        if(jsonObj.AOChM !== undefined) {
                            mAOPage.setEnColumn(jsonObj.AOChM);
                        }
                        if(jsonObj.SChM !== undefined) {
                            mSensorPage.setEnColumn(jsonObj.SChM);
                        }
                    }catch(e){
                        throw new Error("Setting data log enabled mask parameter failed.")
                    }
                };
                this.setPageCos = function(jsonObj) {
                    try{
                        if(jsonObj.DICOS !== undefined) {
                            mDIPage.setCosColumn(jsonObj.DICOS);
                        }
                        if(jsonObj.DOCOS !== undefined) {
                            mDOPage.setCosColumn(jsonObj.DOCOS);
                        }
                        if(jsonObj.AICOS !== undefined) {
                            mAIPage.setCosColumn(jsonObj.AICOS);
                        }
                        if(jsonObj.AOCOS !== undefined) {
                            mAOPage.setCosColumn(jsonObj.AOCOS);
                        }
                    }catch(e){
                        throw new Error("Setting data log C.O.S mask parameter failed.")
                    }
                };
                this.setPageUio = function(jsonObj){//currently used by AI module which has UIO
                    try{
                        if(jsonObj.DICOS !== undefined) {
                            mAIPage.setUioColumn(jsonObj.DICOS);
                        }
                    }catch(e){
                        throw new Error("Setting data log Uio mask parameter failed.")
                    }
                };
                this.setPageSensor = function(jsonObj){//for Sensor
                    try{
                        if(jsonObj.SCOS !== undefined && jsonObj.SHiA !== undefined && jsonObj.SLoA !== undefined) {
                            mSensorPage.setSensorColumns(jsonObj);
                        }
                    }catch(e){
                        throw new Error("Setting data log Sensor mask parameter failed.")
                    }
                };
                this.toJson = function() {
                    var jsonObj = {};
                    jsonObj.DIMask = mDIPage.toJson();
                    jsonObj.DOMask = mDOPage.toJson();
                    jsonObj.AIMask = mAIPage.toJson();
                    jsonObj.AOMask = mAOPage.toJson();
                    jsonObj.SensorMask = mSensorPage.toJson();
                    return jsonObj;
                };
                var getTableId = function(ioType) {
                    return "tb" + ioType + "_SL" + _Self.getIndex();
                };
                var getIOPageContainerId = function(ioType) {
                    return "page" + ioType + "_SL" + _Self.getIndex();
                };
            },
            DataLogChannelMaskPanel: function(panelId, slotNumber) {
                var _onChannelMaskSubmitted = null;
                var mSlotNumber = slotNumber;
                var mContextContainerId = panelId;
                var mSlotPage = [];
                var _Self = this;
                this.getSlotNumber = function() {
                    return mSlotNumber;
                };
                this.getPanelId = function() {
                    return mContextContainerId;
                };
                this.initialPanel = function(profileArray) {
                    var containerId = "tabDataLogConfigSlot";
                    var profileLength = profileArray.Dev.length;
                    for (var i = 0; i < _Self.getSlotNumber(); ++i) {
                        mSlotPage.push(null);
                    }
                    for (var i = 0; i < _Self.getSlotNumber(); ++i) {//check all slots
                        if(i < profileLength) {
                            var slot = i; //profileArray.Dev[i].SLs;
                            mSlotPage[slot] = new Advantech.Form.AdvancedForm.DataLogSlotMaskPage(containerId + slot, slot);
                            mSlotPage[slot].initialPage(profileArray.Dev[i]);
                        }
                        if(mSlotPage[i] === null) {
                            mSlotPage[i] = new Advantech.Form.AdvancedForm.DataLogSlotMaskPage(containerId + i, i);
                            mSlotPage[i].initialPage(null);
                        }
                        //if UI exist, modify tab name
                        if(typeof(profileArray.Dev[i].UIn)!='undefined' && profileArray.Dev[i].UIn > 0){
                            $("#" + _Self.getPanelId() +  " #"+ containerId + i + " #aiChannelTabId").html("AI/UI");
                        }
                        //if IO not exists, hide tab
                        if(profileArray.Dev[i].DIn == 0)
                            $("#" + _Self.getPanelId() +  " #"+ containerId + i + " #diLiId").hide();
                        if((profileArray.Dev[i].AIn + profileArray.Dev[i].AIn) == 0)
                            $("#" + _Self.getPanelId() +  " #"+ containerId + i + " #aiLiId").hide();
                        if((profileArray.Dev[i].DOn + profileArray.Dev[i].RLAn) == 0)
                            $("#" + _Self.getPanelId() +  " #"+ containerId + i + " #doLiId").hide();
                        if(profileArray.Dev[i].AOn == 0)
                            $("#" + _Self.getPanelId() +  " #"+ containerId + i + " #aoLiId").hide();
                        if(profileArray.Dev[i].Sn == 0)
                            $("#" + _Self.getPanelId() +  " #"+ containerId + i + " #sensorLiId").hide();
                    }
                    $("#" + _Self.getPanelId() + " #btnDataLogSubmit").click(function() {
                        if($.isFunction(_Self.onChannelMaskSubmitted())) {
                            _Self.onChannelMaskSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                };
                this.setPanelEnableSegment = function(jsonObj, uiChannelAmount) {
                    var bUiChannel = false;
                    if(typeof(uiChannelAmount)!="undefined" && uiChannelAmount> 0)
                        bUiChannel = true;
                    try{
                        if(_Self.getSlotNumber() === 1) {
                            var temp = {};
                            if(jsonObj.DIChM !== undefined) {
                                temp.DIChM = jsonObj.DIChM;
                            }
                            if(jsonObj.DOChM !== undefined) {
                                temp.DOChM = jsonObj.DOChM;
                            }
                            if(jsonObj.AIChM !== undefined) {
                                temp.AIChM = jsonObj.AIChM;
                            }
                            if(jsonObj.AOChM !== undefined) {
                                temp.AOChM = jsonObj.AOChM;
                            }
                            if(jsonObj.SChM !== undefined) {
                                temp.SChM = jsonObj.SChM;
                            }
                            mSlotPage[0].setPageEn(temp, bUiChannel);
                        }else{
                            for (var i = 0; i < _Self.getSlotNumber(); ++i) {
                                var temp = {};
                                if(jsonObj.DIChM !== undefined) {
                                    temp.DIChM = jsonObj.DIChM[i];
                                }
                                if(jsonObj.DOChM !== undefined) {
                                    temp.DOChM = jsonObj.DOChM[i];
                                }
                                if(jsonObj.AIChM !== undefined) {
                                    temp.AIChM = jsonObj.AIChM[i];
                                }
                                if(jsonObj.AOChM !== undefined) {
                                    temp.AOChM = jsonObj.AOChM[i];
                                }
                                if(jsonObj.SChM !== undefined) {
                                    temp.SChM = jsonObj.SChM[i];
                                }
                                mSlotPage[i].setPageEn(temp, bUiChannel);
                            }
                        }
                    }catch(e){
                        throw new Error("Setting data log enabled mask parameter failed.")
                    }
                };
                this.setPanelCosSegment = function(jsonObj) {
                    try{
                        if(_Self.getSlotNumber() === 1){
                            var temp = {};
                            if(jsonObj.DICOS !== undefined){
                                temp.DICOS = jsonObj.DICOS;
                            }
                            if(jsonObj.DOCOS !== undefined){
                                temp.DOCOS = jsonObj.DOCOS;
                            }
                            if(jsonObj.AICOS !== undefined){
                                temp.AICOS = jsonObj.AICOS;
                            }
                            if(jsonObj.AOCOS !== undefined){
                                temp.AOCOS = jsonObj.AOCOS;
                            }
                            mSlotPage[0].setPageCos(temp);
                        }else {
                            for (var i = 0; i < _Self.getSlotNumber(); ++i){
                                var temp = {};
                                if(jsonObj.DICOS !== undefined) {
                                    temp.DICOS = jsonObj.DICOS[i];
                                }
                                if(jsonObj.DOCOS !== undefined) {
                                    temp.DOCOS = jsonObj.DOCOS[i];
                                }
                                if(jsonObj.AICOS !== undefined) {
                                    temp.AICOS = jsonObj.AICOS[i];
                                }
                                if(jsonObj.AOCOS !== undefined) {
                                    temp.AOCOS = jsonObj.AOCOS[i];
                                }
                                mSlotPage[i].setPageCos(temp);
                            }
                        }
                    }catch(e){
                        throw new Error("Setting data log C.O.S mask parameter failed.")
                    }
                };
                this.setPanelUioSegment = function(uioObj, jsonObj){//currently used by AI module which has UI
                    try{
                        if(_Self.getSlotNumber() === 1){
                            var temp = {};
                            if(jsonObj.DICOS !== undefined){
                                temp.DICOS = jsonObj.DICOS;
                            }
                            mSlotPage[0].setPageUio(temp);
                        }else {
                            for (var i = 0; i < _Self.getSlotNumber(); ++i){
                                var temp = {};
                                if(jsonObj.DICOS !== undefined) {
                                    temp.DICOS = jsonObj.DICOS[i];
                                }
                                mSlotPage[i].setPageUio(temp);
                            }
                        }
                    }catch(e){
                        throw new Error("Setting data log UIO mask parameter failed.")
                    }
                };
                this.setPanelSensorSegment = function(jsonObj){//for Sensor
                    try{
                        if(_Self.getSlotNumber() === 1){
                            mSlotPage[0].setPageSensor(jsonObj);
                        }else {
                            for (var i = 0; i < _Self.getSlotNumber(); ++i){
                                mSlotPage[i].setPageSensor(jsonObj[i]);
                            }
                        }
                    }catch(e){
                        throw new Error("Setting data log UIO mask parameter failed.")
                    }
                };
                this.toJson = function() {
                    var jsonObj = {};
                    jsonObj.ChM = {};
                    jsonObj.COS = {};
                    if(_Self.getSlotNumber() === 1) {
                        var maskJson = mSlotPage[0].toJson();
                        /* jsonObj.ChM.DIChM = maskJson.DIMask.enMask;
                        jsonObj.ChM.DOChM = maskJson.DOMask.enMask;
                        jsonObj.ChM.AIChM = maskJson.AIMask.enMask;
                        jsonObj.ChM.AOChM = maskJson.AOMask.enMask; */
                        /////for sensor/////
                        //ChM: for log_dataoption, COS: for log_control
                        jsonObj.ChM.SChM = maskJson.SensorMask.enMask;
                        /* jsonObj.COS.SCOS = maskJson.SensorMask.devMask;
                        jsonObj.COS.SHiA = maskJson.SensorMask.hiaMask;
                        jsonObj.COS.SLoA = maskJson.SensorMask.liaMask;
                        ///////////////
                        jsonObj.COS.DICOS = maskJson.DIMask.cosMask;
                        if(typeof(maskJson.AIMask.uioMask) !='undefined')//for DI in UIO
                            jsonObj.COS.DICOS = maskJson.AIMask.uioMask;
                        if(typeof(maskJson.AIMask.enUiMask) !='undefined')//for DI in UIO
                            jsonObj.ChM.DIChM = maskJson.AIMask.enUiMask;
                        jsonObj.COS.DOCOS = maskJson.DOMask.cosMask;
                        jsonObj.COS.AICOS = maskJson.AIMask.cosMask;
                        jsonObj.COS.AOCOS = maskJson.AOMask.cosMask; */
                        return jsonObj;
                    }else{
                        /* jsonObj.ChM.DIChM = [];
                        jsonObj.ChM.DOChM = [];
                        jsonObj.ChM.AIChM = [];
                        jsonObj.ChM.AOChM = [];
                        jsonObj.COS.DICOS = [];
                        jsonObj.COS.DOCOS = [];
                        jsonObj.COS.AICOS = [];
                        jsonObj.COS.AOCOS = [];
                        for (var i = 0; i < _Self.getSlotNumber(); ++i) {
                            var maskJson = mSlotPage[i].toJson();
                            jsonObj.ChM.DIChM.push(maskJson.DIMask.enMask);
                            jsonObj.ChM.DOChM.push(maskJson.DOMask.enMask);
                            jsonObj.ChM.AIChM.push(maskJson.AIMask.enMask);
                            jsonObj.ChM.AOChM.push(maskJson.AOMask.enMask);

                            if(typeof(maskJson.AIMask.uioMask) !='undefined')//for DI in UIO
                                jsonObj.COS.DICOS.push(maskJson.AIMask.uioMask);
                            else
                                jsonObj.COS.DICOS.push(maskJson.DIMask.cosMask);

                            if(typeof(maskJson.AIMask.enUiMask) !='undefined')//for DI in UIO
                                jsonObj.ChM.DIChM.push(maskJson.AIMask.enUiMask);

                            jsonObj.COS.DOCOS.push(maskJson.DOMask.cosMask);
                            jsonObj.COS.AICOS.push(maskJson.AIMask.cosMask);
                            jsonObj.COS.AOCOS.push(maskJson.AOMask.cosMask);
                        } */
                        return jsonObj;
                    }
                };
                this.onChannelMaskSubmitted = function(x) {
                    if(!arguments.length) return _onChannelMaskSubmitted;
                    _onChannelMaskSubmitted = x;
                };
            },
        },
    }
});
module.exports = {
    Advantech: Advantech,
};
