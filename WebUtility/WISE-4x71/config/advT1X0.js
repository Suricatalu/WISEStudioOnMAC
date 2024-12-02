var MODULE_NORMAL_WORKING_MODE_NUM = "0";
var MODULE_INITIAL_WORKING_MODE_NUM = "1";
var WLAN_INFRASTRUCTURE_OPERATION_MODE_NUM = "0";
var WLAN_AP_OPERATION_MODE_NUM = "2";
var Advantech = Advantech || {};
$.extend(true, Advantech, {
    ConstantParamter: {
        SlotNumber: 1
    },
    Profile: {
        Information: {
            Version: WEB_UTILITY_VERSION,
            Vender: "Advantech Corp.",
            Contact: "www.advantech.com",
            Product: WEB_UTILITY_PRODUCT,
            Date: WEB_UTILITY_DATE,
        },
        AdvancedEmun: {
            ADAMT1X0Series: {
                getAdvancedFunctionProfile: function() {
                    var advancedFunctions = [];
                    //advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("accessCtrl", "access_ctrl.html", "Access Control"));
                    advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("dataLog", "data_log.html", "Data Logger"));
                    advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("diagnostic", "diagnostic.html", "Diagnostician"));
                    //advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("peer2Peer", "p2p.html", "Peer to Peer"));
                    //advancedFunctions.push(new AdvancedFunctionPageInfo("gcl", "#", "GCL"));
                    return advancedFunctions;
                },
            },
        },
        ModuleWorkingModeEmun: {
            "0": "Normal Mode",
            "1": "Initial Mode"
        },
        IoBoardWorkingModeValue: {
            "PERFORMANCE_MODE": 0,
            "LOW_POWER_MODE": 1
        },
        WlanOperationModeEmun: {
            "0": "Infrastructure Mode",
            "1": "Reserved",
            "2": "AP Mode",
        },
        API_ERROR_CODE_NAME: {
            "404": "File not found",
            "405": "The request method (POST or GET) is not allowed on the requested resource.",
            "411": "The required Content-length header is missing.",
            "1000": "User name or password error(User will be logged out after idle for a period of time)",
            "1101": "User permission error",
            "1102": "The server refuses to ful-fill the request due to authentication error, such as invalid cookie.",
            "1150": "The login list is full.",
            "2000": "Invalid Data (Invalid object value)",
            "2101": "The AI range codes are not consistent for average CH",
            "2102": "Scale range setting is not allowed",
            "2103": "The writing process is busy",
            //"2150": "AI zero calibration processed unsuccessfully.",
            "2151": "AI span calibration processed unsuccessfully.",
            "2152": "Unable to reset the AI calibration data",
            "2200": "IP and Gateway are not in the same IP range according to subnet calculation.",
            "2201": "IP Access Control List Validation Error",
            "2300": "Invalid file size",
            "2301": "Illegal file",
            "2350": "Internal memory error(fail to erase/write)",
            "2351": "Fail to upgrade Boot loader image",
            "2352": "Fail to upgrade firmware application image",
            "2353": "Fail to upgrage service pack image",
            "2354": "Can not downgrade firmware application image to old version",
            /*"2401": "Expainsion value writing fail",
            "2402": "Expansion value property is read only",
            "2403": "Slave device response timeout",
            "2404": "Invalid address",*/
            "3051": "Fail to get log data because the other request is still processing",
            "4000": "Cloud setting error",
            "4100": "Connection error between device and cloud server",
            "4101": "DNS query was failed",
            "4102": "Internal socket failed",
            "4103": "Send header to server failed",
            "4104": "Send data to server failed",
            "4105": "Fail to receive response from the server",
            "5010": "Request to modem timeout",
            "5011": "SIM operation error"
        },
        CellularRegisterStatusEmun: {
            "0": "Not Registered",
            "1": "Registered",
            "2": "Registration Denied"
        },
        CellularConnectStatusEmun: {
            "0": "Always Online",
            "1": "Connection On Demand",
            "2": "Manual"
        }
    },
    Form: {
        ConfigForm: {
            GeneralStatusPanel: function(panelId) {
                var BATTERY_STATUS = {"0": "No Error", "1": "Low Voltage"};
                var POWER_SOURCE_NAME = {"0": "Line Power", "1": "Device Battery"};
                var _onGeneralStatusRefreshed = null;
                var mContextPanelId = panelId;
                var _Self = this;
                var _$Panel;
                this.getPanelId = function() {
                    return mContextPanelId;
                };
                this.onGeneralStatusRefreshed = function(x) {
                    if (!arguments.length) return this._onGeneralStatusRefreshed;
                    this._onGeneralStatusRefreshed = x;
                };
                this.initialPanel = function() {
                    _$Panel = $("#" + _Self.getPanelId());
                    handleRefreshed();
                };
                this.setPanel = function(jsonObj) {
                    var powerArray;
                    var powerArrayLen = 3;
                    var mskArray;
                    var mskArrayLen = 16;
                    var statusString = "";
                    var powerType = "";

                    powerArray = Advantech.Utility.convertMaskToArray(jsonObj.Pw, powerArrayLen);

                    if(powerArray[0] == 1){ //line power
                        powerType = "Line Power";
                    }
                    _$Panel.find("#inpLB").val(BATTERY_STATUS[jsonObj.LB]);
                    if(powerArray[1] == 1){ //battery power
                        if(powerType != "")
                            powerType += ", Battery";
                        else
                            powerType = "Battery";
                        _$Panel.find("#inpVal").val(jsonObj.Val + " %");
                        _$Panel.find("#inpAmt").val(jsonObj.Amt);
                        _$Panel.find("#inpTst").val((jsonObj.TSt)/100 + " °C");
                        mskArray = Advantech.Utility.convertMaskToArray(jsonObj.Stat, mskArrayLen);
                        for(var i=0; i<mskArrayLen; i++){
                            if(mskArray[i]!=0 && Advantech.Profile.BatteryStatusEnum[i] != ""){
                                statusString += Advantech.Profile.BatteryStatusEnum[i] + ",";
                            }
                        }
                        if(statusString != ""){
                            statusString = statusString.substring(0, statusString.length-1)
                            _$Panel.find("#inpStat").val("Battery: " + statusString);
                            _$Panel.find("#inpStat").attr("title", statusString);
                        }else{
                            _$Panel.find("#inpStat").val("Normal");
                            _$Panel.find("#inpStat").attr("title", "Normal");
                        }
                        _$Panel.find("#batteryInfo1").show();
                        _$Panel.find("#batteryInfo2").show();
                        _$Panel.find("#batteryInfo3").show();
                    }else{
                        if (powerArray[0] == 1) {
                            powerType += '(No Battery)';
                        }
                        _$Panel.find("#batteryInfo1").hide();
                        _$Panel.find("#batteryInfo2").hide();
                        _$Panel.find("#batteryInfo3").hide();
                    }
                    if(powerArray[2] == 1){ //Solar
                        if(powerType != "")
                            powerType += ", Solar Panel";
                        else
                            powerType = "Solar Panel";
                    }
                    _$Panel.find("#inpPw").val(powerType);
                };
                var handleRefreshed = function() {
                    var $btn = $("#" + _Self.getPanelId() + " #btnGeneralRefresh");
                    $btn.click(function() {
                        if ($.isFunction(_Self.onGeneralStatusRefreshed())) {
                            _Self.onGeneralStatusRefreshed().apply(this, [{}]);
                        }
                    });
                };
                this.hide = function() {
                    $('#' + _Self.getPanelId()).hide();
                };
            },
            NetworkPanel: function(panelId, isViewOnly) {
                var _onNetworkConfigSubmitted = null;
                var _onNetworkStatusRefreshed = null;
                var mContextPanelId = panelId;
                var mIsViewOnly = isViewOnly;
                var _Self = this;

                this.getPanelId = function() {
                    return mContextPanelId;
                };

                this.isViewOnly = function() {
                    return mIsViewOnly;
                };

                this.onNetworkStatusRefreshed = function(x) {
                    if (!arguments.length) return this._onNetworkStatusRefreshed;
                    this._onNetworkStatusRefreshed = x;
                };

                this.toNetConfigJson = function() {
                    //var md = parseInt($('#' + _Self.getPanelId() + ' input[name=IpType]:checked').val(), 10);
                    var md = parseInt($('#' + _Self.getPanelId() + ' input[type=radio]:checked').val(), 10);
                    var jsonObj = {};
                    jsonObj.DHCP = md;
                    if (md === 0) {
                        jsonObj.IP = $("#" + _Self.getPanelId() + " #inpIP").val();
                        jsonObj.Msk = $("#" + _Self.getPanelId() + " #inpMsk").val();
                        jsonObj.GW = $("#" + _Self.getPanelId() + " #inpGW").val();
                    } else if (md === 1) {

                    } else {
                        jsonObj.IP = $("#" + _Self.getPanelId() + " #inpIP").val();
                        jsonObj.Msk = $("#" + _Self.getPanelId() + " #inpMsk").val();
                        jsonObj.GW = $("#" + _Self.getPanelId() + " #inpGW").val();
                    }
                    return jsonObj;
                };

                this.toJson = function() {
                    //var md = parseInt($('#' + _Self.getPanelId() + ' input[name=IpType]:checked').val(), 10);
                    var md = parseInt($('#' + _Self.getPanelId() + ' input[type=radio]:checked').val(), 10);
                    var jsonObj = {};
                    jsonObj.DHCP = md;
                    jsonObj.IP = $("#" + _Self.getPanelId() + " #inpIP").val();
                    jsonObj.Msk = $("#" + _Self.getPanelId() + " #inpMsk").val();
                    jsonObj.GW = $("#" + _Self.getPanelId() + " #inpGW").val();
                    return jsonObj;
                };

                var handleSubmitted = function() {
                    $('#' + _Self.getPanelId() + " #btnNetworkConfig").click(function() {
                        if (!_Self.checkFrom()) {
                            return;
                        }
                        if ($.isFunction(_Self.onNetworkConfigSubmitted())) {
                            _Self.onNetworkConfigSubmitted()(this, _Self.toNetConfigJson());
                        }
                    });
                };

                var handleHyperLink = function() {
                    $('#' + _Self.getPanelId() + ' a').click(function(e) {
                        if ($(this).hasClass('ajax-link')) {
                            e.preventDefault();
                            var url = $(this).attr('href');
                            var id = $(this).attr('id');
                            Advantech.Utility.loadAjaxContent(id, url, this);
                        } else {
                            e.preventDefault();
                        }
                    });
                };

                var handleDHCPMode = function() {
                    //$('#' + _Self.getPanelId() + ' input[name=IpType]').click(function() {
                    $('#' + _Self.getPanelId() + ' input[type=radio]').click(function() {
                        var val = parseInt($('#' + _Self.getPanelId() + ' input[type=radio]:checked').val(), 10);
                        _Self.setPanelModeStatus(val);
                    });
                };

                var handleRefreshed = function() {
                    var $btn = $("#" + _Self.getPanelId() + " #btnNetworkRefresh");
                    $btn.click(function() {
                        if ($.isFunction(_Self.onNetworkStatusRefreshed())) {
                            _Self.onNetworkStatusRefreshed().apply(this, [{}]);
                        }
                    });
                };

                this.initialPanel = function(containerName) {
                    try {
                        if (!this.isViewOnly()) {
                            handleSubmitted();
                            handleDHCPMode();
                        } else {
                            handleHyperLink();
                            this.setPanelModeStatus(-1);
                        }
                    } catch (ex) {
                        alert("DoLowHighDelayTable:" + ex);
                    }
                    handleRefreshed();
                };

                this.checkFrom = function() {
                    var result = true;
                    //if($("#" + _Self.getPanelId() + " input[name=IpType]:checked").val()==0){
                    if ($("#" + _Self.getPanelId() + " input[type=radio]:checked").val() == 0) {
                        $('#' + _Self.getPanelId() + " input").each(function() {
                            if ($(this).hasClass("txtIp")) {
                                var id = $(this).attr('id');
                                var ip = $(this).val();
                                if (!Advantech.Utility.isValidIp(ip) && !$(this).is(":disabled")) {
                                    Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Format Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Invalid IP in " + id.slice(3) + "!<h5>");
                                    $(this).val("");
                                    result = false;
                                    return result;
                                }
                            }
                        });
                        var ip = $("#" + _Self.getPanelId() + " #inpIP").val();
                        var mask = $("#" + _Self.getPanelId() + " #inpMsk").val();
                        if (!Advantech.Utility.isValidNetworkParameter(ip, mask)) {
                            result = false;
                            Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Format Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>The combination of IP and Subnet mask is incorrect! All Host ID bits are 0 or 1.<h5>");
                        }
                    }
                    return result;
                };

                this.setNetworkConfig = function(jsonObj) {
                    try {
                        $("#" + _Self.getPanelId() + " #inpStat").val(jsonObj.Stat);
                        $("#" + _Self.getPanelId() + " #inpRst").val(jsonObj.Rst);
                        $("#" + _Self.getPanelId() + " #inpMd").val(jsonObj.Md);
                        $("#" + _Self.getPanelId() + " #inpIP").val(jsonObj.IP);
                        if (module.indexOf('WISE-4671') > -1 && jsonObj.Md == 'GSM') {
                            if(jsonObj.Rssi == 0){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("-113dBm or less");
                            }else if(jsonObj.Rssi == 1){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("-111dBm");
                            }else if(jsonObj.Rssi == 31){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("-51dBm or greater");
                            }else if(jsonObj.Rssi == 99){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("Undetectable");
                            }else{
                                var maxRssi = -113 + (parseInt(jsonObj.Rssi) * 2);
                                $("#" + _Self.getPanelId() + " #inpRssi").val(maxRssi + "dBm");
                            }
                        } else {
                            if(jsonObj.Rssi == 0){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("-141dBm or less");
                            }else if(jsonObj.Rssi == 1){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("-140dBm");
                            }else if(jsonObj.Rssi == 31){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("-110dBm or greater");
                            }else if(jsonObj.Rssi == 99){
                                $("#" + _Self.getPanelId() + " #inpRssi").val("Undetectable");
                            }else{
                                var maxRssi = -141 + parseInt(jsonObj.Rssi);
                                $("#" + _Self.getPanelId() + " #inpRssi").val(maxRssi + "dBm");
                            }
    /*                         if(jsonObj.Rssi != 99)
                            {
                                var maxRssi = -113 + parseInt(jsonObj.Rssi)*2;
                                var Strength = maxRssi + "dBm";
                                $("#" + _Self.getPanelId() + " #inpRssi").val(Strength);
                            }
                            else
                                $("#" + _Self.getPanelId() + " #inpRssi").val("Undetectable"); */
                        }
                        $("#" + _Self.getPanelId() + " #inpNm").val(jsonObj.Nm);
                        $("#" + _Self.getPanelId() + " #inpDes").val(jsonObj.Des);
                        $("#" + _Self.getPanelId() + " #inpId").val(jsonObj.Id);
                        $("#" + _Self.getPanelId() + " #inpSn").val(jsonObj.Sn);
						$("#" + _Self.getPanelId() + " #inpMFW").val(jsonObj.MFW);
						$("#" + _Self.getPanelId() + " #inpIccid").val(jsonObj.Iccid);
                    } catch (e) {
                        throw new Error("Setting Network panel failed.");
                    }
                };

                this.setPanelModeStatus = function(mode) {
                    if (mode == 0 && !this.isViewOnly()) {
                        $("#" + _Self.getPanelId() + " #inpIP").removeAttr('disabled');
                        $("#" + _Self.getPanelId() + " #inpMsk").removeAttr('disabled');
                        $("#" + _Self.getPanelId() + " #inpGW").removeAttr('disabled');
                        $("#" + _Self.getPanelId() + " .dIPIpAddressNote").hide('slow');
                    } else if (mode == 2 && !this.isViewOnly()) {
                        $("#" + _Self.getPanelId() + " #inpIP").removeAttr('disabled');
                        $("#" + _Self.getPanelId() + " #inpMsk").removeAttr('disabled');
                        $("#" + _Self.getPanelId() + " #inpGW").removeAttr('disabled');
                        $("#" + _Self.getPanelId() + " .dIPIpAddressNote").show('slow');
                    } else {
                        $("#" + _Self.getPanelId() + " #inpIP").attr('disabled', 'disabled');
                        $("#" + _Self.getPanelId() + " #inpMsk").attr('disabled', 'disabled');
                        $("#" + _Self.getPanelId() + " #inpGW").attr('disabled', 'disabled');
                        $("#" + _Self.getPanelId() + " .dIPIpAddressNote").hide('slow');
                    }
                };

                this.onNetworkConfigSubmitted = function(x) {
                    if (!arguments.length) return this._onNetworkConfigSubmitted;
                    this._onNetworkConfigSubmitted = x;
                };
            },
            NetworkAppConfigPanel: function(panelId) {
                var _onNetworkAppConfigSubmitted = null;
                var mContextPanelId = panelId;
                var _Self = this;
                this.getPanelId = function() {
                    return mContextPanelId;
                };
                this.initialPanel = function() {
                    try {
                        var _Self = this;
						//use angular instead
                        /* $("#" + _Self.getPanelId() + " button").click(function(e) {
                            e.preventDefault();
                            var type = this.id.slice(3);
                            var jsonObj = {};
                            if (type == "All") {
                                $("#" + _Self.getPanelId() + " input").each((function() {
                                    if (!$(this).is(":disabled")) {
                                        var prop = this.id.slice(3);
                                        jsonObj[prop] = (this.type == 'checkbox') ? ((this.checked) ? 1 : 0) : Number($(this).val());
                                    }
                                }));
                                $("#" + _Self.getPanelId() + " select").each((function() {
                                    if (!$(this).is(":disabled")) {
                                        var prop = this.id.slice(3);
                                        jsonObj[prop] = Number($(this).val());
                                    }
                                }));
                            } else {
                                $("#" + _Self.getPanelId() + " #inp" + type).each(function() {
                                    jsonObj[type] = (this.type == 'checkbox') ? ((this.checked) ? 1 : 0) : Number($(this).val());
                                });
                            }
                            if ($.isFunction(_Self.onNetworkAppConfigSubmitted())) {
                                _Self.onNetworkAppConfigSubmitted()(this, jsonObj);
                            }
                        }); */
                    } catch (ex) {
                        alert("NetworkAppConfigPanel:" + ex);
                    }
                };

                this.setNetWorkAppConfig = function(jsonObj) {
                    try {
                        for (var prop in jsonObj) {
                            $element = $("#" + _Self.getPanelId() + " #inp" + prop);
                            if ($element.length > 0) {
                                if ($element[0].type === 'checkbox') {
                                    $element.attr("checked", parseInt(jsonObj[prop], 10) == 1 ? true : false);
                                } else {
                                    $element.val(jsonObj[prop]);
                                }
                            }
                        }
                    } catch (e) {
                        throw new Error("Setting NetworkApp panel failed")
                    }
                };

                this.onNetworkAppConfigSubmitted = function(x) {
                    if (!arguments.length) return _onNetworkAppConfigSubmitted;
                    _onNetworkAppConfigSubmitted = x;
                };
            }
        },
        MainForm: {
            AdamT1X0form: function(containerId) {
                var mContainerId = containerId;
                var mLocateStatus = true;
                var _Self = this;
                //var EnableCellularTimer = true;
                this.getContainerId = function() {
                    return mContainerId;
                };
                /*
                this.ClearCellularTimer = function(){
                    EnableCellularTimer = false;
                };
                */
                this.initialForm = function(profileObj, advancedFunctions, userTypeObj) {
                //this.initialForm = function(advancedFunctions, userTypeObj) {
                    var slotInfos = profileObjToSlotInfo(profileObj);
                    initialSoltInforamtionListView();
                    initialAdvancedFunctionListView(advancedFunctions);
                    var isCollapse = true;
                    var title = "<i class='fa fa-user'></i>";
                    //title += (userTypeObj.Acnt == undefined) ? " User " : (" " + Advantech.Profile.AccountTypeEmun[userTypeObj.Acnt] + " ");
                    title += "Root";
                    title += "<b class='caret'></b>";
                    $("#" + _Self.getContainerId() + " #userTitle").html(title);
                    $("#" + _Self.getContainerId() + " .hasMoreType").bind({
                        mouseover: function() {
                            $("#" + _Self.getContainerId()).find(this).find(" .collapse").collapse('show');
                        },
                        mouseleave: function() {
                            $("#" + _Self.getContainerId()).find(this).find(" .collapse").collapse('hide');
                        },
                    });
                };

                this.initialEventHandle = function() {
                    $("#" + _Self.getContainerId() + " #logout").click(function() {
                        Advantech.Utility.TimerDispatchSingleton.getInstance().ClearTimer();
                        document.cookie = "adamsessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + document.domain + "; path=/";
                        Advantech.Utility.switchToTagetHtml("index", ABSOLUTE_PATH);
                    });
                    $("#" + _Self.getContainerId() + ' .navbar-brand').on('click', 'a', function(e) {
                        if ($(this).hasClass('ajax-home')) {
                            e.preventDefault();
                            Advantech.Utility.switchToTagetHtml("index", ABSOLUTE_PATH + "/index.html");
                        }
                    });
                    $("#" + _Self.getContainerId() + ' .top-nav').on('click', 'a', function(e) {
                        if ($(this).hasClass('ajax-link')) {
                            e.preventDefault();
                            var url = $(this).attr('href');
                            var id = $(this).attr('id');
                            var ret = Advantech.Utility.loadAjaxContent(id, url, this);
                            if (ret && $(".navbar-toggle").is(":visible"))
                                $('#collapseableNavbar').collapse('hide');
                        }
                    });
                    $("#" + _Self.getContainerId() + ' .main-menu').on('click', 'a', function(e) {
                        if ($(this).hasClass('ajax-link')) {
                            e.preventDefault();
                            var url = $(this).attr('href');
                            var id = $(this).attr('id');
                            var ret = Advantech.Utility.loadAjaxContent(id, url, this);
                            if (ret && $(".navbar-toggle").is(":visible"))
                                $('#collapseableNavbar').collapse('hide');
                        } else if ($(this).hasClass('ajax-home')) {
                            e.preventDefault();
                            Advantech.Utility.switchToTagetHtml("index", ABSOLUTE_PATH + "/index.html");
                        } else {
                            e.preventDefault();
                        }
                    });

                };

                var profileObjToSlotInfo = function(profileObj) {
                    return null;
                };

                //Sub Node menu item
                var initialSoltInforamtionListView = function() {
                    var htmlCode = '';
                    htmlCode += "<a href ='" + ABSOLUTE_PATH + "/io_status.html' id ='ioStatus0' class ='ajax-link'>";
                    htmlCode += "<i class='fa fa-fw fa-bar-chart-o'></i> I/O Status";
                    htmlCode += "</a>";
                    $("#" + _Self.getContainerId() + " #soltInfoListViewItem").append(htmlCode);
                };

                var addSlotInfoListItem = function(slotIndex, deviceName) {
                    var htmlCode = '';
                    htmlCode += "<li>";
                    htmlCode += "<a id ='ioStatus_" + slotIndex + "' href='" + ABSOLUTE_PATH + "/io_status.html' class='ajax-link'>(Solt " + slotIndex + ")" + deviceName + "</a>";
                    htmlCode += "</li>";
                    return htmlCode;
                };

                var initialAdvancedFunctionListView = function(advancedFunctions) {
                    if (advancedFunctions != null) {
                        for (var i = 0; i < advancedFunctions.length; ++i)
                            $("#" + _Self.getContainerId() + " #advanced").append(addAdvancedFunctionList(advancedFunctions[i].getPageID(),
                                advancedFunctions[i].getPageHref(),
                                advancedFunctions[i].getListviewContext()));
                    }
                };

                var addAdvancedFunctionList = function(id, href, context) {
                    var htmlCode = '';
                    htmlCode += "<li>";
                    htmlCode += ("<a id ='" + id + "' href='" + ABSOLUTE_PATH + "/" + href + "' class='ajax-link'>" + context + "</a>");
                    htmlCode += "</li>";
                    return htmlCode;
                };
            },
        },
    },
    Data: {
        ModuleData: (function() {
            var mInstance; //private variable to hold the only instance that will exits.
            var moduleWorkingMode = function() {
                var mMode = 0; //private
                var mIoWorkingMode; //private: working mode of io board
                var mErrorStatus; //private: Module Error Status(gen_status - Evt)
                var setMode = function(mode) {
                    mMode = mode;
                };
                var getMode = function() {
                    return mMode;
                };
                var setIoMode = function(mode) {
                    mIoWorkingMode = mode;
                };
                var getIoMode = function() {
                    return mIoWorkingMode;
                };
                var setErrorStatus = function(mode) {
                    mErrorStatus = mode;
                };
                var getErrorStatus = function() {
                    return mErrorStatus;
                };
                return {
                    setMode: setMode,
                    getMode: getMode,
                    setIoMode: setIoMode,
                    getIoMode: getIoMode,
                    setErrorStatus: setErrorStatus,
                    getErrorStatus: getErrorStatus
                };
            };

            return {
                getInstance: function() {
                    if (!mInstance) {
                        mInstance = moduleWorkingMode();
                    }
                    return mInstance;
                }
            };
        })(),
        NetworkData: {
            WlanData: (function() {
                var mInstance; //private variable to hold the only instance that will exits.
                var wlanOpMode = function() {
                    var mMode = 0; //private
                    var setMode = function(mode) {
                        mMode = mode;
                    };
                    var getMode = function() {
                        return mMode;
                    };
                    return {
                        setMode: setMode,
                        getMode: getMode
                    };
                };

                return {
                    getInstance: function() {
                        if (!mInstance) {
                            mInstance = wlanOpMode();
                        }
                        return mInstance;
                    }
                };
            })(),
        },
    }
});

module.exports = {
    Advantech: Advantech,
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Angular WISE App
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var wiseApp = angular.module('wiseApp', []);
wiseApp.config(['$httpProvider', '$compileProvider',
    function($httpProvider, $compileProvider) {
        //for http PATCH request
        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/json; charset=utf-8',
            'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        };
        $compileProvider.aHrefSanitizationWhitelist(/^data:/);
    }
]);

wiseApp.service('filteredListService', function () {
    this.searched = function (valLists,toSearch) {
        return _.filter(valLists,
        function (i) {
            /* Search Text in all 3 fields */
            return searchUtil(i, toSearch);
        });
    };
    this.paged = function (valLists,pageSize)
    {
        var retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if(typeof(retVal[Math.floor(i / pageSize)])=="undefined"){
                retVal[Math.floor(i / pageSize)] = [];
            }
            retVal[Math.floor(i / pageSize)].push(valLists[i]);
        }
        return retVal;
    };
});

function angularShowHttpErrorMessage(errObj) {
    var code, apiErrorCode, apiErrorMsg, returnMsg, statusText;

    Advantech.Utility.ErrorCounter.getInstance().addCount();
    try {
        statusText = errObj.statusText;
        code = errObj.status;
        apiErrorCode = errObj.data.Err;
        apiErrorMsg = errObj.data.Msg;
    } catch (e) {
        //statusText = "Unknown Error";
    }
    returnMsg = apiErrorCode != undefined ? Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] : "";
    if(apiErrorCode == 5011)
        returnMsg += apiErrorMsg != undefined && apiErrorMsg != "" ? "<p/>(Reason:" + apiErrorMsg + " retry remaining)" : "";
    else
        returnMsg += apiErrorMsg != undefined && apiErrorMsg != "" ? "<p/>(Reason:" + apiErrorMsg + " error, Error number:" + apiErrorCode + ")" : "";
    if (returnMsg == "") {
        if (statusText != "")
            returnMsg = statusText;
        else
            returnMsg = "Unknown Error";
    }
    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + returnMsg, null);

    if(Advantech.Utility.ErrorCounter.getInstance().getCount() >= 5){
        Advantech.Utility.ErrorCounter.getInstance().resetCount();
        Advantech.Utility.TimerDispatchSingleton.getInstance().ClearTimer();
        Advantech.Utility.serverErrorPage("Connection Failed", "Polling failed more than 5 times. Please check network connection or related errors!");
    }
}

wiseApp.controller('SensorCtrl', ['$scope', '$http', '$element', '$filter', function($scope, $http, $element, $filter) {
    $scope.activeTab = 'status'; //default active tab
    $scope.statusActiveTab = 'status_current'; //default active tab
    //for sensor value
    $scope.rangeSelectList = Advantech.Profile.SensorRangeEmun;
    $scope.channelSelectList = {};
    $scope.sensorValues;
    $scope.channelObj = {
                            Ch : 0,
                            Rng: 0,
                            Evt: 0,
                            LoA: 0,
                            HiA: 0,
                            name: "****",
                            value: "Loading",
                            RangeName: "****",
                            UnitName: ""
                        };
    $scope.channelTableObj = {};
    //for sensor config
    $scope.sensorConfigs;
    $scope.selectedChannel = {"ch": 0};
    var httpInProgress = false;
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;

    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    var slotId = recordObj.getSlotId();
    var currentModule = recordObj.GetCurrentModule();
    //console.log("SensorCtrl currentModule: " + currentModule);
    var channelAmount = Advantech.Profile.DeviceEmun[currentModule].sensor_Ch;
    //console.log("SensorCtrl channelAmount: " + channelAmount);

    //////////////////Tab Switch/////////////////////
    $scope.switchTabTo = function(tabId) {
        if($scope.activeTab == tabId)
            return;
        $scope.activeTab = tabId;
        gobalTimer.ClearTimer();
        if (tabId == "status") {
            loadSensorValue();
            //gobalTimer.EnableTimer(function(){loadSensorValue()}, pollingRate);//create timer
        }else if (tabId == "config") {
            loadSensorConfig();
        }
    }
    $scope.switchStatusTab = function(tabId) {
        if($scope.statusActiveTab == tabId)
            return;
        $scope.statusActiveTab = tabId;
        assignChannelValue();
    }

    $scope.isTabShow = function(tabId) {
        if (tabId == $scope.activeTab)
            return true;
        else
            return false;
    }
    $scope.isStatusTabShow = function(tabId) {
        if (tabId == $scope.statusActiveTab)
            return true;
        else
            return false;
    }

    /////////////////////////////////////////////////

    function assignChannelValue(){
        var i;
        var tabId = $scope.statusActiveTab;
        if(tabId == "status_current") {
            $scope.channelObj.value = $scope.channelObj.EgF;
            for(i=0; i< channelAmount;i++)
                $scope.channelTableObj[i].value = $scope.sensorValues[i].EgF;
        }else if (tabId == "status_max") {
            $scope.channelObj.value = $scope.channelObj.HEgF;
            for(i=0; i< channelAmount;i++)
                $scope.channelTableObj[i].value = $scope.sensorValues[i].HEgF;
        }else if (tabId == "status_min") {
            $scope.channelObj.value = $scope.channelObj.LEgF;
            for(i=0; i< channelAmount;i++)
                $scope.channelTableObj[i].value = $scope.sensorValues[i].LEgF;
        }
        $scope.channelObj.RangeName = $scope.rangeSelectList[$scope.channelObj.Rng].name;
        $scope.channelObj.UnitName = $scope.rangeSelectList[$scope.channelObj.Rng].unit;
    }

    function loadSensorProfile() {
        $http({
            method: 'GET',
            url: URL_PROFILE + "/slot_" + slotId,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            for(var i=0; i < channelAmount; i++)
                $scope.channelSelectList[i] = i;

            if($scope.activeTab == "status") {
                loadSensorValue();
            }else if($scope.activeTab == "config") {
                loadSensorConfig();
            }
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
    function loadSensorConfig() {
        $http({
            method: 'GET',
            url: URL_SENSOR_CONFIG + '/slot_' + slotId,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.sensorConfigs = response.data.SCfg;
            $scope.channelObj = $scope.sensorConfigs[$scope.selectedChannel.ch];
            //$scope.channelTableObj = $scope.sensorConfigs;
            for(var i=0; i < channelAmount; i++){
                var range = $scope.sensorConfigs[i].Rng;
                //$scope.channelTableObj[i].RangeName = $scope.rangeSelectList[range].name;
                $scope.sensorConfigs[i].UnitName = $scope.rangeSelectList[range].unit;
                //$scope.channelTableObj[i].EventName = Advantech.Profile.SensorChannelEventEmun[$scope.channelTableObj[i].Evt];
            }
            //assignChannelValue();
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
    function loadSensorValue() {
		gobalTimer.ClearTimer();
        $http({
            method: 'GET',
            url: URL_SENSOR_VALUE + '/slot_' + slotId,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.sensorValues = response.data.SVal;
            $scope.channelObj = $scope.sensorValues[$scope.selectedChannel.ch];
            $scope.channelTableObj = $scope.sensorValues;
            for(var i=0; i< channelAmount; i++){
                var range = $scope.channelTableObj[i].Rng;
                $scope.channelTableObj[i].RangeName = $scope.rangeSelectList[range].name;
                $scope.channelTableObj[i].UnitName = $scope.rangeSelectList[range].unit;
                $scope.channelTableObj[i].EventName = Advantech.Profile.SensorChannelEventEmun[$scope.channelTableObj[i].Evt];
            }
            assignChannelValue();
            $scope.$digest();
			if($scope.activeTab == "status"){
				gobalTimer.EnableTimer(function(){loadSensorValue()}, pollingRate);//create timer
			}
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
    /////Event Handler////////////////////////////////////////////
    $scope.onValueChannelChange = function(selectedChannel){
        $scope.channelObj = $scope.sensorValues[selectedChannel];
        assignChannelValue();
    }
    $scope.onTableRowClick = function(selectedChannel){
        $scope.selectedChannel.ch = selectedChannel;
        $scope.channelObj = $scope.sensorValues[selectedChannel];
        assignChannelValue();
    }

    $scope.onClearLowAlarmClick = function(){
        if($scope.channelObj.LoA == 0)
            return;
        var requestURL;
        var requestData;
        requestURL = URL_SENSOR_VALUE + "/slot_" + slotId + "/ch_" + $scope.selectedChannel.ch;
        requestData = {LoA: 0};
        $http({
            method: 'PATCH',
            url: requestURL,
            data: requestData
        })
        .then(function(response) {
        }, function(error) {
            //Advantech.Utility.ErrorCounter.getInstance().resetCount();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onClearHighAlarmClick = function(){
        if($scope.channelObj.HiA == 0)
            return;
        var requestURL;
        var requestData;
        requestURL = URL_SENSOR_VALUE + "/slot_" + slotId + "/ch_" + $scope.selectedChannel.ch;
        requestData = {HiA: 0};
        $http({
            method: 'PATCH',
            url: requestURL,
            data: requestData
        })
        .then(function(response) {
        }, function(error) {
            //Advantech.Utility.ErrorCounter.getInstance().resetCount();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onResetValueClick = function(){
        if(httpInProgress)
            return;
        else
            httpInProgress = true;

        var requestURL;
        var requestData;
        requestURL = URL_SENSOR_VALUE + "/slot_" + slotId + "/ch_" + $scope.selectedChannel.ch;
        if($scope.statusActiveTab == "status_max")
            requestData = {ClrH: 1};
        else
            requestData = {ClrL: 1};
        $http({
            method: 'PATCH',
            url: requestURL,
            data: requestData
        })
        .then(function(response) {
            httpInProgress = false;
        }, function(error) {
            httpInProgress = false;
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onConfigChannelChange = function(selectedChannel){
        $scope.channelObj = $scope.sensorConfigs[selectedChannel];
        //$scope.channelObj.UnitName = $scope.rangeSelectList[$scope.channelObj.Rng].unit;
    }

    $scope.onConfigClick = function(){
        //check value
        if(isNaN($scope.channelObj.LoA) || $scope.channelObj.LoA > 2147483.647 || $scope.channelObj.LoA < -2147483.647){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Low Alarm Value must between -2147483.647 ~ +2147483.647", null);
            return;
        }
        if(isNaN($scope.channelObj.HiA) || $scope.channelObj.HiA > 2147483.647 || $scope.channelObj.HiA < -2147483.647){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>High Alarm Value must between -2147483.647 ~ +2147483.647", null);
            return;
        }
        if(isNaN($scope.channelObj.Dev) || $scope.channelObj.Dev < 0){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Deviation Value must be a positive number.", null);
            return;
        }

        var requestData = $scope.channelObj;
        requestData.Rng = Number(requestData.Rng);
        requestData.EnLA = Number(requestData.EnLA);
        requestData.EnHA = Number(requestData.EnHA);
        requestData.LAMd = Number(requestData.LAMd);
        requestData.HAMd = Number(requestData.HAMd);
        $http({
            method: 'PATCH',
            url: URL_SENSOR_CONFIG + "/slot_" + slotId + "/ch_" + $scope.selectedChannel.ch,
            data: requestData
        })
        .then(function(response) {
            //httpInProgress = false;
        }, function(error) {
            httpInProgress = false;
            angularShowHttpErrorMessage(error);
        });
    }

    /////////////////////////////////////////////////
    loadSensorProfile();
    //gobalTimer.EnableTimer(function(){loadSensorValue()}, pollingRate);//create timer
}]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// RS-485 IO Status Control
///////////////////////////////////////////////////////////////////////////////////////////////////////////
wiseApp.controller('ComPortSettingCtrl', ['$scope', '$http', '$element', 'filteredListService', '$filter', '$timeout',
    function($scope, $http, $element, filteredListService, $filter, $timeout) {
        $scope.baudRateSelectList = Advantech.Profile.ComPortBaudRate;
        $scope.DataBitSelectList = Advantech.Profile.ComPortDataBit;
        $scope.ParitySelectList = Advantech.Profile.ComPortParity;
        $scope.StopBitSelectList = Advantech.Profile.ComPortStopBit;
        $scope.modbusRtuChannelStatusCodeList = Advantech.Profile.ModbusRtuChannelStatusCode;
        $scope.activeTab = 'status'; //default active tab
        //$scope.activeTab = 'modbus'; //default active tab
        //$scope.configActiveTab = 'config_rule' //'config_common'; //default active tab
        $scope.configActiveTab = 'config_common'; //default active tab
        $scope.statusActiveTab = 'status_bit'; //default active tab
        $scope.comPortSetting = {};
        //modbus
        $scope.modbusCommonSetting = {};
        $scope.modbusRuleSetting = {};
        //for error display in web page
        $scope.ruleLengthOccupiedError = [];
        $scope.ruleChannelOccupiedError = [];
        $scope.modbusCoilErrorIndicator = false;
        $scope.errorIndicatorSlaveId = [];
        $scope.errorIndicatorStartAddress = [];
        $scope.errorIndicatorLength = [];
        $scope.errorIndicatorScanInterval = [];
        $scope.errorIndicatorMappingChannel = [];
		$scope.errorIndicatorDevValue = [];
		$scope.errorIndicatorDelayTime = [];
        $scope.ruleDisableEdit = [];
        var currentEditRuleIdx = 0;
        var currentEditRuleField = "";
        //var MAX_RULE_NUMBER = 30;//8;
        //var MAX_CHANNEL_NUMBER = 64;//32;
        //status
        $scope.statusQueryData = {};
        $scope.statusQueryCount = 0;
        $scope.isQueryExapsionDataWriteResult = false;
        var queryExapsionDataWriteResultTimer;
        $scope.queryExapsionDataWriteResultText = "";
        //global
        var parentName = $element.parent().attr('id');
        var comNumber = parentName.slice(6); //COM port number: 1 or 2 ...
        var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
        //dialog
        $scope.responseTimeData = {};
        $scope.responseTimeQueryCount = 0;
        //////////////////
        var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
        var MAX_RULE_NUMBER = profile.RL ? profile.RL : 8; //if not defined, use default value
        var MAX_CHANNEL_NUMBER = profile.MCh ? profile.MCh : 32; //if not defined, use default value
        $scope.max_rule_amount = MAX_RULE_NUMBER;
        $scope.max_channel_amount = MAX_CHANNEL_NUMBER;
        //////////////////
        for(var i=0; i < MAX_RULE_NUMBER; i++){
            $scope.ruleLengthOccupiedError.push(false);
            $scope.ruleChannelOccupiedError.push(false);
            $scope.errorIndicatorSlaveId.push(false);
            $scope.errorIndicatorStartAddress.push(false);
            $scope.errorIndicatorLength.push(false);
            $scope.errorIndicatorScanInterval.push(false);
            $scope.errorIndicatorMappingChannel.push(false);
            $scope.errorIndicatorDevValue.push(false);
            $scope.errorIndicatorDelayTime.push(false);
            $scope.ruleDisableEdit.push(false);
        }
        $scope.isSupportPowerOutput = typeof Advantech.Profile.DeviceEmun[module].isSupportPowerOutput != 'undefined' ? Advantech.Profile.DeviceEmun[module].isSupportPowerOutput : false;
        $scope.powerOutputChannel = typeof Advantech.Profile.DeviceEmun[module].powerOutputChannel != 'undefined' ? Advantech.Profile.DeviceEmun[module].powerOutputChannel : 0;
        $scope.powerOutputOptions = [{id: 0, name: 'Disable'}];
        for (var i=0; i<$scope.powerOutputChannel; i++) {
            $scope.powerOutputOptions.push({id: i+1, name: 'Power Output ' + i});
        }

        //////////////////Tab Switch
        $scope.switchTabTo = function(tabId) {
            if($scope.activeTab == tabId)
                return;
            $scope.activeTab = tabId;
            gobalTimer.ClearTimer();
            $scope.isQueryExapsionDataWriteResult = false;
            $timeout.cancel(queryExapsionDataWriteResultTimer);
            $scope.queryExapsionDataWriteResultText = "";
            if (tabId == "status") {
                $scope.statusQueryCount = 0;
                loadStatusTab($scope.statusActiveTab);
            } else if (tabId == "modbus") {
                loadComPortSetting();//load data for default tab
                //loadModbusCommonSetting(); //load data for default tab
            } else if (tabId == "diag") {
                loadDiagnosticData(false);
                gobalTimer.EnableTimer(function(){loadDiagnosticData(true)}, pollingRate);//create timer
            }
        }
        $scope.switchConfigTabTo = function(tabId) {
            if($scope.configActiveTab == tabId)
                return;
            $scope.configActiveTab = tabId;
            if (tabId == "config_rule") {
                loadModbusRuleSetting();
            } else if (tabId == "config_common") {
                loadComPortSetting();
            }
        }
        $scope.switchStatusTab = function(tabId) {
            if($scope.statusActiveTab == tabId)
                return;

			Advantech.Form.WaitingForm.getInstance().showPleaseWait();
			$timeout.cancel(queryExapsionDataWriteResultTimer);
            gobalTimer.ClearTimer();
			$scope.statusActiveTab = tabId;
            $scope.isQueryExapsionDataWriteResult = false;
            $scope.queryExapsionDataWriteResultText = "";
            loadStatusTab(tabId);
        }
        function loadStatusTab(tabId){
            if (tabId == "status_bit") {
                $scope.statusQueryCount = 0;
                loadStatusBit(true);//set initial to true
            } else if (tabId == "status_word") {
                $scope.statusQueryCount = 0;
                loadStatusWord(true);//set initial to true
            }
        }

        $scope.isTabShow = function(tabId) {
            if (tabId == $scope.activeTab)
                return true;
            else
                return false;
        }
        $scope.isConfigTabShow = function(tabId) {
            if (tabId == $scope.configActiveTab)
                return true;
            else
                return false;
        }
        $scope.isStatusTabShow = function(tabId) {
            if (tabId == $scope.statusActiveTab)
                return true;
            else
                return false;
        }

        function updateModbusRuleType(){
            var length = $scope.modbusRuleSetting.length;
            for(var i = 0; i < length; i++){
                if($scope.modbusRuleSetting[i].FC == 1 || $scope.modbusRuleSetting[i].FC == 2)
                    $scope.modbusRuleSetting[i].type = "coil";
                else if($scope.modbusRuleSetting[i].FC == 3 || $scope.modbusRuleSetting[i].FC == 4)
                    $scope.modbusRuleSetting[i].type = "register";
                else
                    $scope.modbusRuleSetting[i].type = "";
            }
        }

        ////////////////////load Data
        function loadComPortSetting() {
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_SERIAL_PORT_CONFIG + '/slot_0' + '/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $scope.comPortSetting = response.data;
                $scope.$digest();
                //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                loadModbusCommonSetting();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }

        function loadModbusCommonSetting() {
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_MODBUS_GEN_CONFIG + '/slot_0/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $scope.modbusCommonSetting = response.data;
                $scope.$digest();
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }

        function loadModbusRuleSetting() {
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_MODBUS_CONFIG + '/slot_0/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $scope.modbusRuleSetting = response.data.RtuCfg;
                updateModbusRuleType();
                //check validity of each config rule
                $scope.checkRuleValidation();
                //calculate modbus address of each rule
                //calculateModbusAddress('coil');
                $scope.$digest();
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
                return;
            })
        }

        function loadStatusBit(isInitial) {
            gobalTimer.ClearTimer();
            $scope.statusQueryCount++;
            if(isInitial)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_EXPANSION_BIT + '/slot_0/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $scope.statusQueryData = response.data.ExpBit;
                var length = response.data.ExpBit.length;
                var bit7Mask = 128; //1000-0000
                var bit0To6Mask = 127; //0111-1111
                for(var i=0; i< length; i++){
                    $scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] == 1 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                    $scope.statusQueryData[i]["ReadWrite"] = $scope.statusQueryData[i]["Prop"] == 2 ? true : false;
                    $scope.statusQueryData[i]["Evt"] = $scope.statusQueryData[i]["Evt"] & bit0To6Mask;//get bit 0~6
                }
                //start to show table data
                $scope.sortAndShow(isInitial);
                /*
                if(isPeriodical)
                    $scope.sortAndShow(null, true);
                else
                    $scope.sortAndShow();
                */
                $scope.$digest();

                //if(isPeriodical && !$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_bit')
                if(!$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_bit')
                    gobalTimer.EnableTimer(function(){loadStatusBit()}, pollingRate);//create timer
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
				gobalTimer.ClearTimer();
                if(isInitial)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }
        function loadStatusWord(isInitial) {
            gobalTimer.ClearTimer();
            $scope.statusQueryCount++;
            if(isInitial)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_EXPANSION_WORD + '/slot_0/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $scope.statusQueryData = response.data.ExpWord;
                var length = response.data.ExpWord.length;
                var bit7Mask = 128; //1000-0000
                var bit0To6Mask = 127; //0111-1111
                for(var i=0; i< length; i++){
                    $scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] == 1 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                    $scope.statusQueryData[i]["ReadWrite"] = $scope.statusQueryData[i]["Prop"] == 2 ? true : false;
                    $scope.statusQueryData[i]["Evt"] = $scope.statusQueryData[i]["Evt"] & bit0To6Mask;//get bit 0~6
                }
                //start to show table data
                $scope.sortAndShow(isInitial);
                /* if(isPeriodical)
                    $scope.sortAndShow(null, true);
                else
                    $scope.sortAndShow(); */
                $scope.$digest();

                //if(isPeriodical && !$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_word')
                if(!$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_word')
                    gobalTimer.EnableTimer(function(){loadStatusWord()}, pollingRate);//create timer
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
				gobalTimer.ClearTimer();
                if(isInitial)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }
        function loadDiagnosticData(isPeriodical){
            $scope.responseTimeQueryCount++;
            if(!isPeriodical)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_MODBUS_STATUS + '/slot_0/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                var length = response.data.RtuStat.length;
                var bit7Mask = 128; //1000-0000
                var bit0To6Mask = 127; //0111-1111
                for(var i = 0; i < length; i++){
                    response.data.RtuStat[i]['writeOnly'] = (response.data.RtuStat[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                    response.data.RtuStat[i]['Evt'] = response.data.RtuStat[i]["Evt"] & bit0To6Mask;//get bit 0~6
                    response.data.RtuStat[i]['status'] = $scope.modbusRtuChannelStatusCodeList[response.data.RtuStat[i]['Evt']];
                }
                $scope.responseTimeData = response.data.RtuStat;
                $scope.$digest();

                if(!isPeriodical)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                if(!isPeriodical)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }
        function queryExpansionDataWriteResult(requestType, channel){
            if($scope.isQueryExapsionDataWriteResult){
                var requestURL;
                if(requestType == "status_bit"){
                    requestURL = URL_EXPANSION_BIT + '/slot_0/com_' + comNumber + "/ch_" + channel;
                }else{
                    requestURL = URL_EXPANSION_WORD + '/slot_0/com_' + comNumber + "/ch_" + channel;
                }

                $http({
                    method: 'GET',
                    url: requestURL,
                    params: { 'foobar': new Date().getTime() }
                })
                .then(function(response){
                    var responseCode = response.data.WEvt;
                    if(responseCode == 0x17) //still in progress
                        queryExapsionDataWriteResultTimer = $timeout(function(){queryExpansionDataWriteResult(requestType, channel)}, pollingRate);//keep polling
                    else{
                        //write finished
                        $scope.queryExapsionDataWriteResultText = $scope.modbusRtuChannelStatusCodeList[responseCode];
                        $scope.isQueryExapsionDataWriteResult = false;
                        $scope.$digest();
                    }
                }, function(error) {
                    Advantech.Utility.ErrorCounter.getInstance().resetCount();
                    angularShowHttpErrorMessage(error);
                });
            }
        }
        /////////////////Buttons
        $scope.btnDiagnosticResetClick = function() {
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'PATCH',
                url: URL_DEVICE_CONTROL,
                data: {"RRS": Number(comNumber)/*1*/}
            })
            .then(function(response) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                angularShowHttpErrorMessage(error);
            });
        }
        $scope.btnComSettingClick = function() {
            $scope.comPortSetting.BR = parseInt($scope.comPortSetting.BR);
            $scope.comPortSetting.DB = parseInt($scope.comPortSetting.DB);
            $scope.comPortSetting.SB = parseInt($scope.comPortSetting.SB);
            $scope.comPortSetting.P = parseInt($scope.comPortSetting.P);
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();

            $http({
                method: 'PATCH',
                url: URL_SERIAL_PORT_CONFIG + '/slot_0' + '/com_' + comNumber,
                data: $scope.comPortSetting
            })
            .then(function(response) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                loadComPortSetting();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                angularShowHttpErrorMessage(error);
            });
        }

        $scope.btnModbusComSettingClick = function() {
            var requestData = $scope.modbusCommonSetting;
            requestData.EnC = parseInt(requestData.EnC);
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'PATCH',
                url: URL_MODBUS_GEN_CONFIG + '/slot_0/com_' + comNumber,
                data: requestData
            })
            .then(function(response) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                //loadModbusCommonSetting();
                $scope.btnComSettingClick();
            }, function(error) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                angularShowHttpErrorMessage(error);
            });
        }
        $scope.btnModbusClick = function() {
            var requestData;
            var requestURL;

            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            requestData = $scope.modbusRuleSetting;
            requestURL = URL_MODBUS_CONFIG + '/slot_0/com_' + comNumber;

            for(var i=0; i< requestData.length; i++){
                requestData[i].FC = parseInt(requestData[i].FC);
                requestData[i].Prop = parseInt(requestData[i].Prop);
                requestData[i].LgE = parseInt(requestData[i].LgE);
                requestData[i].DevE = parseInt(requestData[i].DevE);
                if ($scope.isSupportPowerOutput) {
                    requestData[i].PE = parseInt(requestData[i].PE);
                } else {
                    delete requestData[i].PE;
                    delete requestData[i].DTim;
                }
                delete requestData[i].valid;
                delete requestData[i].type;
                delete requestData[i].ruleStatus;
            }
            requestData = {
                    "RtuCfg": requestData
                };

            $http({
                method: 'PATCH',
                url: requestURL,
                data: requestData
            })
            .then(function(response) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                loadModbusRuleSetting();
            }, function(error) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                angularShowHttpErrorMessage(error);
                $scope.checkRuleValidation();
                //calculate modbus address of each rule
                $scope.$digest();
            });
        }

        $scope.btnApplyStatusValue = function(channel){
            var requestData;
            var requestURL;
            var requestType = $scope.statusActiveTab;

            $scope.isQueryExapsionDataWriteResult = true;
            $scope.queryExapsionDataWriteResultText = "Waiting for server response..."

            if(requestType == "status_bit"){
                requestURL = URL_EXPANSION_BIT + '/slot_0/com_' + comNumber + "/ch_" + channel;
            }else{
                requestURL = URL_EXPANSION_WORD + '/slot_0/com_' + comNumber + "/ch_" + channel;
            }
            requestData = {
                    //"Ch": channel,
                    "Val": parseInt($scope.statusQueryData[channel]["Val"])
            };

            $http({
                method: 'PATCH',
                url: requestURL,
                data: requestData
            })
            .then(function(response) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                /* we must create another new query to check write status due to RS-485 needs some times to process */
                queryExpansionDataWriteResult(requestType, channel);
            }, function(error) {
                $scope.isQueryExapsionDataWriteResult = false;
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                angularShowHttpErrorMessage(error);
            });
        }
        $scope.btnStatusSwitchMode = function(){
            $scope.isStatusEditMode= !$scope.isStatusEditMode;
            $scope.queryExapsionDataWriteResultText = "";
            if($scope.isStatusEditMode){
                gobalTimer.ClearTimer();
            }else{
                if($scope.statusActiveTab == "status_bit")
                    loadStatusBit(true);//gobalTimer.EnableTimer(function(){loadStatusBit(true)}, pollingRate);//create timer
                else
                    loadStatusWord(true);//gobalTimer.EnableTimer(function(){loadStatusWord(true)}, pollingRate);//create timer
            }
        }

        //copy data from index 0
        $scope.btnModbusConfigCopy = function(field){
            if($scope.configActiveTab == 'config_rule'){
                for(var i=1; i< $scope.modbusRuleSetting.length; i++)
                    $scope.modbusRuleSetting[i][field] = $scope.modbusRuleSetting[0][field];
            }
            if(field == "NOP"){
                if($scope.configActiveTab == 'config_rule')
                    $scope.onChannelQuantityChange();
            }else if(field == "FC"){
                updateModbusRuleType();
                //check validity of each config rule
                $scope.checkRuleValidation();
            }
        }
        /////////////////////////////////////////////////////
        $scope.modbusAddressPattern = (function() {
            var regexp = /(\d+)/;
            return {
                test: function(value) {
                    return (value >= 0 && value < MAX_CHANNEL_NUMBER);
                }
            };
        })();

        $scope.onSlaveIdChange = function(index, sid){

            $scope.checkRuleValidation();
        }
        $scope.onFunctionCodeChange = function(index, fc){
            if(fc == 1 || fc == 2)
                $scope.modbusRuleSetting[index].type = "coil";
            else if(fc == 3 || fc == 4)
                $scope.modbusRuleSetting[index].type = "register";
            else
                $scope.modbusRuleSetting[index].type = "";
            currentEditRuleIdx = index;
            currentEditRuleField = "FC";
            $scope.checkRuleValidation();
        }
        $scope.onStartAddressChange = function(index, address){
            currentEditRuleIdx = index;
            currentEditRuleField = "Addr";
            $scope.checkRuleValidation();
        }
        $scope.onChannelQuantityChange = function(index, quantity){
            currentEditRuleIdx = index;
            currentEditRuleField = "NOP";
            $scope.checkRuleValidation();
        }
        $scope.onIntervalChange = function(index, interval){
            currentEditRuleIdx = index;
            currentEditRuleField = "SItv";
            $scope.checkRuleValidation();
        }
        $scope.onMappingChannelChange = function(index, channel){
            currentEditRuleIdx = index;
            currentEditRuleField = "MCh";
            $scope.checkRuleValidation();
        }
        $scope.onDevValueChange = function(index, devValue){
            if(typeof(devValue) == "undefined" || devValue == null || devValue < 1 || devValue > 65535){
                $scope.errorIndicatorDevValue[index] = true;
                $scope.modbusRuleSetting[index]['ruleStatus'] = false;
            }else{
                $scope.errorIndicatorDevValue[index] = false;
                $scope.modbusRuleSetting[index]['ruleStatus'] = true;
            }
        }
        $scope.onDelayTimeChange = function(index, channel){
            currentEditRuleIdx = index;
            currentEditRuleField = "DTim";
            $scope.checkRuleValidation();
        }
        function isRuleValid(channelIdx){
            var isValid = true;
            var ruleObj = $scope.modbusRuleSetting[channelIdx];
            if(ruleObj['FC'] == 0)
                isValid = false;
            if(isNaN(ruleObj['SID']) || ruleObj['SID'] < 1 || ruleObj['SID'] > 255){
                $scope.errorIndicatorSlaveId[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorSlaveId[channelIdx] = false;
            }
            if(isNaN(ruleObj['Addr']) || ruleObj['Addr'] < 1/*<= 0*/ || ruleObj['Addr'] > 65535){
                $scope.errorIndicatorStartAddress[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorStartAddress[channelIdx] = false;
            }
            if(isNaN(ruleObj['NOP']) || ruleObj['NOP'] < 1 || ruleObj['NOP'] > MAX_CHANNEL_NUMBER){
                $scope.errorIndicatorLength[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorLength[channelIdx] = false;
            }
            if(isNaN(ruleObj['SItv']) || ruleObj['SItv'] < 1/*100*/ || ruleObj['SItv'] > 65535){
                $scope.errorIndicatorScanInterval[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorScanInterval[channelIdx] = false;
            }
            if(isNaN(ruleObj['MCh']) || ruleObj['MCh'] < 0 || ruleObj['MCh'] >= MAX_CHANNEL_NUMBER){
                $scope.errorIndicatorMappingChannel[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorMappingChannel[channelIdx] = false;
            }
            if($scope.isSupportPowerOutput && (isNaN(ruleObj['DTim']) || ruleObj['DTim'] < 1 || ruleObj['DTim'] > 1800)){
                $scope.errorIndicatorDelayTime[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorDelayTime[channelIdx] = false;
            }
            return isValid;
        }
        $scope.checkRuleValidation = function(){
            var length = $scope.modbusRuleSetting.length;
            for(var i=0; i < length; i++){
                if(!isRuleValid(i)){
                    $scope.modbusRuleSetting[i]['valid'] = false;
                }else{
                    $scope.modbusRuleSetting[i]['valid'] = true;
                }
            }
            checkModbusDuplicateOrOccupiedChannel();
        }

        function getUsedChannelAmount(channelMap){
            var counter = 0;
            for(var i = 0; i < MAX_CHANNEL_NUMBER; i++){
                if(channelMap[i])
                    counter++;
            }
            return counter;
        }
        function isChannelOverlay(channelMap, startChannel, length){
            for(var i = startChannel; i < (startChannel+length); i++){
                if(channelMap[i])
                    return true;
            }
            return false;
        }
        function checkModbusDuplicateOrOccupiedChannel() {
            var isOccupiedFound = false;
            var channelOccupyMap = {}; //key: channel, value: true(occupied)
            var i,j,k;

            //////////for coil////////////
            var amount = $scope.modbusRuleSetting.length;
            //reset variables
            for(i = 0; i < MAX_CHANNEL_NUMBER; i++){
                channelOccupyMap[i] = false;
            }
            for(i = 0; i < MAX_RULE_NUMBER; i++){
                $scope.ruleLengthOccupiedError[i] = false;
                $scope.ruleChannelOccupiedError[i] = false;
                $scope.modbusRuleSetting[i]['ruleStatus'] = true;
                $scope.ruleDisableEdit[i] = false;
            }
            //Scan channel for occupied: Coil
            for(i = 0; i < amount; i++){
                var channel = $scope.modbusRuleSetting[i]['MCh'];
                if($scope.modbusRuleSetting[i]['valid'] && $scope.modbusRuleSetting[i]['type']=="coil"){ //check only when channel is valid
                    var isRecordValid = true;
                    //Build Occupied channel Map of "previous rules" for coil
                    for(k = 0; k < i; k++){
                        if($scope.modbusRuleSetting[k]['valid'] && $scope.modbusRuleSetting[k]['type']=="coil"){
                            var startChannel = $scope.modbusRuleSetting[k]['MCh'];
                            var channelLength = $scope.modbusRuleSetting[k]['NOP'];
                            for(j = startChannel; j < (startChannel + channelLength); j++){
                                channelOccupyMap[j] = true;
                            }
                        }
                    }
                    //for occupied check
                    if(isChannelOverlay(channelOccupyMap, channel, $scope.modbusRuleSetting[i]['NOP']) ||
                        (channel + $scope.modbusRuleSetting[i]['NOP'] > MAX_CHANNEL_NUMBER)){
                        isOccupiedFound = true;
                        isRecordValid = false;
                    }else{
                        $scope.ruleLengthOccupiedError[i] = false;
                        $scope.ruleChannelOccupiedError[i] = false;
                    }
                    if(!isRecordValid){
                        $scope.modbusRuleSetting[i]['valid'] = false;
                        if(currentEditRuleField == "" || currentEditRuleField == "FC" || currentEditRuleField == "MCh" ||
                            currentEditRuleField == "Addr"){
                            if(currentEditRuleIdx != i){
                                $scope.ruleChannelOccupiedError[currentEditRuleIdx] = true;
                                $scope.modbusRuleSetting[currentEditRuleIdx]['ruleStatus'] = false;
                            }//else{
                                $scope.ruleChannelOccupiedError[i] = true;
                                $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                            //}
                        }else{
                            if(currentEditRuleIdx != i){
                                $scope.ruleLengthOccupiedError[currentEditRuleIdx] = true;
                                $scope.modbusRuleSetting[currentEditRuleIdx]['ruleStatus'] = false;
                            }//else{
                                $scope.ruleLengthOccupiedError[i] = true;
                                $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                            //}
                        }
                        $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                        //error occurs, disable other rules
                        for(var m=0; m< MAX_RULE_NUMBER; m++){
                            //if(m != i)
                            if(m != currentEditRuleIdx)
                                $scope.ruleDisableEdit[m] = true;
                            else
                                $scope.ruleDisableEdit[m] = false;
                        }
                    }else{
                        if(isRuleValid(i)){
                            $scope.modbusRuleSetting[i]['valid'] = true;
                            $scope.modbusRuleSetting[i]['ruleStatus'] = true;
                        }else
                            $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                        $scope.ruleLengthOccupiedError[i] = false;
                        $scope.ruleChannelOccupiedError[i] = false;
                    }
                }else if(!$scope.modbusRuleSetting[i]['valid'] && $scope.modbusRuleSetting[i]['type']=="coil")
                    $scope.modbusRuleSetting[i]['ruleStatus'] = false;

                for(var j = 0; j < MAX_CHANNEL_NUMBER; j++){
                    channelOccupyMap[j] = false;
                }
            }
            if(isOccupiedFound){
                $scope.modbusCoilErrorIndicator = true;
            }else{
                $scope.modbusCoilErrorIndicator = false;
                //no error, enable all rules
                for(var j = 0; j < MAX_RULE_NUMBER; j++){
                    $scope.ruleDisableEdit[j] = false;
                }
            }

            /////////////////
            //calculate channel amount used by Coil
            //reset variables
            for(i = 0; i < MAX_CHANNEL_NUMBER; i++){
                channelOccupyMap[i] = false;
            }
            for(i = 0; i < amount; i++){
                if($scope.modbusRuleSetting[i]['valid'] && $scope.modbusRuleSetting[i]['type']=="coil"){ //check only when channel is valid
                    var startChannel = $scope.modbusRuleSetting[i]['MCh'];
                    var channelLength = $scope.modbusRuleSetting[i]['NOP'];
                    for(j = startChannel; j < (startChannel + channelLength); j++){
                        channelOccupyMap[j] = true;
                    }
                }
            }
            var coilUsedChannelAmount = getUsedChannelAmount(channelOccupyMap);//channel amount used by coil

            //////////for register//////////////
            var amount = $scope.modbusRuleSetting.length;
            var prevRegisterChannelAmount = 0;
            //reset variables
            for(i = 0; i < MAX_CHANNEL_NUMBER; i++){
                channelOccupyMap[i] = false;
            }
            //Scan channel for occupied: register
            for(i = 0; i < amount; i++){
                var channel = $scope.modbusRuleSetting[i]['MCh'];
                if($scope.modbusRuleSetting[i]['valid'] && $scope.modbusRuleSetting[i]['type']=="register"){ //check only when channel is valid
                    var isRecordValid = true;
                    //Build Occupied channel Map of "previous rules" for register
                    for(k = 0; k < i; k++){
                        if($scope.modbusRuleSetting[k]['valid'] && $scope.modbusRuleSetting[k]['type']=="register"){
                            var startChannel = $scope.modbusRuleSetting[k]['MCh'];
                            var channelLength = $scope.modbusRuleSetting[k]['NOP'];
                            for(j = startChannel; j < (startChannel + channelLength); j++){
                                channelOccupyMap[j] = true;
                            }
                            var usedChannelAmount = getUsedChannelAmount(channelOccupyMap);
                            prevRegisterChannelAmount = usedChannelAmount > prevRegisterChannelAmount ? usedChannelAmount: prevRegisterChannelAmount;
                        }
                    }
                    //for occupied check
                    if(isChannelOverlay(channelOccupyMap, channel, $scope.modbusRuleSetting[i]['NOP']) ||
                        (channel + $scope.modbusRuleSetting[i]['NOP'] > MAX_CHANNEL_NUMBER) ||
                        (coilUsedChannelAmount + prevRegisterChannelAmount + $scope.modbusRuleSetting[i]['NOP'] > MAX_CHANNEL_NUMBER) ){//coil+register = max 32 channels
                        isOccupiedFound = true;
                        isRecordValid = false;
                    }else{
                        $scope.ruleLengthOccupiedError[i] = false;
                        $scope.ruleChannelOccupiedError[i] = false;
                    }
                    if(!isRecordValid){
                        $scope.modbusRuleSetting[i]['valid'] = false;
                        if(currentEditRuleField == "" || currentEditRuleField == "FC" || currentEditRuleField == "MCh" ||
                            currentEditRuleField == "Addr"){
                            if(currentEditRuleIdx != i){
                                $scope.ruleChannelOccupiedError[currentEditRuleIdx] = true;
                                $scope.modbusRuleSetting[currentEditRuleIdx]['ruleStatus'] = false;
                            }
                            //else{
                                $scope.ruleChannelOccupiedError[i] = true;
                                $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                            //}
                        }else{
                            if(currentEditRuleIdx != i){
                                $scope.ruleLengthOccupiedError[currentEditRuleIdx] = true;
                                $scope.modbusRuleSetting[currentEditRuleIdx]['ruleStatus'] = false;
                            }
                            //else{
                                $scope.ruleLengthOccupiedError[i] = true;
                                $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                            //}
                        }
                        $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                        //error occurs, disable other rules
                        for(var m=0; m< MAX_RULE_NUMBER; m++){
                            //if(m != i)
                            if(m != currentEditRuleIdx)
                                $scope.ruleDisableEdit[m] = true;
                            else
                                $scope.ruleDisableEdit[m] = false;
                        }
                    }else{
                        if(isRuleValid(i)){
                            $scope.modbusRuleSetting[i]['valid'] = true;
                            $scope.modbusRuleSetting[i]['ruleStatus'] = true;
                        }else
                            $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                        $scope.ruleLengthOccupiedError[i] = false;
                        $scope.ruleChannelOccupiedError[i] = false;
                    }
                }else if(!$scope.modbusRuleSetting[i]['valid'] && $scope.modbusRuleSetting[i]['type']=="register"){
                    $scope.modbusRuleSetting[i]['ruleStatus'] = false;
                }

                for(j = 0; j < MAX_CHANNEL_NUMBER; j++){
                    channelOccupyMap[j] = false;
                }
            }
            if(isOccupiedFound){
                $scope.modbusCoilErrorIndicator = true;
            }else{
                $scope.modbusCoilErrorIndicator = false;
                //no error, enable all rules
                for(var j = 0; j < MAX_RULE_NUMBER; j++){
                    $scope.ruleDisableEdit[j] = false;
                }
            }

            for(var i = 0; i < MAX_RULE_NUMBER; i++){
                if(!isRuleValid(i))
                    $scope.modbusRuleSetting[i]['ruleStatus'] = false;
            }
        }//end function

        //////////////////////////////////
        //variables for Status Tables
        $scope.pageSize = 16;
        $scope.pageSizeList = [16, 32, 64];
        $scope.reverse = false;
        $scope.ItemsByPage; //data in each page
        $scope.currentPage = 0;
        $scope.filteredList;
        $scope.currentStartRecordNumber = 0;
        $scope.currentEndRecordNumber = 0;
        $scope.currentTotalRecordNumber = 0;
        $scope.columnToOrder; //column to sort
        $scope.isStatusEditMode = false;
        var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;

        // Calculate Total Number of Pages based on Search Result
        $scope.pagination = function () {
            $scope.ItemsByPage = filteredListService.paged( $scope.filteredList, $scope.pageSize );
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
            updateStartEndRecordNumber();
        };

        $scope.previousPage = function () {
            var pageIndex = $scope.currentPage;
            if((pageIndex - 1) >= 0){
                $scope.currentPage--;
                updateStartEndRecordNumber();
            }
        };

        $scope.nextPage = function () {
            var pageIndex = $scope.currentPage;
            if((pageIndex + 1) < $scope.ItemsByPage.length){
                $scope.currentPage++;
                updateStartEndRecordNumber();
            }
        };
        $scope.onSetPageSize = function(){
            $scope.currentPage = 0;
            updateStartEndRecordNumber();
        }
        function updateStartEndRecordNumber(){
            $scope.currentStartRecordNumber = parseInt($scope.currentPage) * parseInt($scope.pageSize) + 1;
            $scope.currentEndRecordNumber = parseInt($scope.currentPage) * parseInt($scope.pageSize) + parseInt($scope.pageSize);
			if($scope.currentEndRecordNumber > $scope.currentTotalRecordNumber){
                $scope.currentEndRecordNumber = $scope.currentTotalRecordNumber;
            }
            $scope.sortAndShow();
        }

        $scope.range = function (input, total) {
            var ret = [];
            if (!total) {
                total = input;
                input = 0;
            }
            for (var i = input; i < total; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.sortAndShow = function(isInitial, sortBy){
            if(!sortBy || sortBy == null)
                sortBy = 'Ch';

            $scope.filteredList = $scope.statusQueryData;
            $scope.currentTotalRecordNumber = $scope.filteredList.length;

            if(isInitial){
                $scope.currentPage = 0;
                $scope.currentStartRecordNumber = 1;
                $scope.currentEndRecordNumber = $scope.currentTotalRecordNumber > $scope.pageSize ? $scope.pageSize : $scope.currentTotalRecordNumber;
                $scope.columnToOrder = sortBy;
                //$scope.reverse = !$scope.reverse;
            }
            //standard filter service
            $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
            $scope.pagination();
        };
        //////////////////////////////////End of Status Tables

        //load data for default Tabs
        loadStatusBit(true);//initial true
        //gobalTimer.EnableTimer(function(){loadStatusBit(true)}, pollingRate);//start timer
}]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cellular & APN Config
///////////////////////////////////////////////////////////////////////////////////////////////////////////
wiseApp.controller('CellularCtrl', ['$scope', '$http', '$element', 'filteredListService', '$window', '$filter', '$timeout', '$compile',
    function($scope, $http, $element, filteredListService, $filter, $timeout, $compile) {
    var moduleSlotArray;
    var APNSlotValue = [];
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var LoginCanel = false;
    //var CellularTimer = false;
    $scope.selectedChannel = {"ch": 0};
    $scope.moduleAmount = 0;
    $scope.currentModuel = '';
    $scope.activeTab = "CellularInfo"; //default cellular tab
    $scope.activeConfigTab = "basic_setting"; //default cellular config tab
    $scope.CellularObj = {"Idl": 0};//basic mode
    $scope.CellularAdvObj = {};//advanced mode
    $scope.CellularAdvBandMsk1 = [];//advanced mode Band mask 1
    $scope.CellularAdvBandMsk2 = [];//advanced mode Band mask 2
    $scope.CellularAdvBandMsk3 = [];//advanced mode Band mask 3
    $scope.CellularAdvBandMsk4 = [];//advanced mode Band mask 4
    var supportedCellularBandMask = {"2":true, "3":true,"4":true,"8":true,"12":true,"13":true,"20":true,"28":true};
    if(Advantech.Profile.DeviceEmun[module].isSupportRfBand5){
        supportedCellularBandMask["5"] = true;
    }
    $scope.CellularValue = {};
    $scope.APNObj = {};
    $scope.SmsConfig = {};
    $scope.APNSetting = {};
    $scope.CurrentAPN = {};
    $scope.RegString = '';
    $scope.CMString = '';
    $scope.channelSelectList = {};
    $scope.ActiveChannel = 0;
    $scope.Strength = '';
    $scope.IsPINChange = false;
    $scope.HavePUK = false;
    $scope.LoginSuccess = false;
    //$scope.LoginSuccess = true; //For No SIM Test
    //$scope.AutoWritePIN = false;
    $scope.PINCode;
    $scope.PUKCode;
    $scope.generalConfig = {};

    $scope.isSupportGps = Advantech.Profile.DeviceEmun[module].isSupportGps;
    $scope.positionStatus = {};
    $scope.positionConfig = {};
    $scope.activePositionTab = 'status';
    $scope.positionSystemSelectList;
    $scope.otherPinStatus = [
        'SIM not inserted',
        'SIM PIN required',
        'SIM PUK required',
        'SIM failure',
        'SIM busy',
        'SIM wrong',
        'incorrect password',
        'SIM PIN2 required',
        'SIM PUK2 required'
    ];
    $scope.isSupportSimPinPukCounter = Advantech.Profile.DeviceEmun[module].isSupportSimPinPukCounter;
    $scope.isSupportRegisteredServiceDomain = Advantech.Profile.DeviceEmun[module].isSupportRegisteredServiceDomain;
    var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
    $scope.isSupportNetworkScanMode = typeof profile != 'undefined' && typeof profile.FCS != 'undefined' && profile.FCS & Advantech.Profile.FCSMask['2G'] ? true : false;

    var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;

    $scope.isTabShow = function(tabId) {
        if (tabId == $scope.activeTab)
            return true;
        else
            return false;
    }
    $scope.isConfigTabShow = function(tabId) {
        if (tabId == $scope.activeConfigTab)
            return true;
        else
            return false;
    }
    $scope.isPositionTabShow = function(tabId) {
        if (tabId == $scope.activePositionTab)
            return true;
        else
            return false;
    }

    $scope.showCellularTab = function() {
        LoginCanel = false;
        if ($scope.activeTab == "CellularConfig") {
            loadCellularConfig();
        }else if ($scope.activeTab == "CellularInfo") {
            loadCellularValue();
        }else if ($scope.activeTab == "SMSConfig") {
            loadSMSConfig();
        }
    }

    $scope.showNetworkAppTab = function() {
        loadGeneralConfig();
/*         LoginCanel = false;
        if ($scope.activeTab == "CellularConfig") {
            loadCellularConfig();
        }else if ($scope.activeTab == "CellularInfo") {
            loadCellularValue();
        }else if ($scope.activeTab == "SMSConfig") {
            loadSMSConfig();
        } */
    }

    $scope.switchTabTo = function(tabId) {
        gobalTimer.ClearTimer();
        if($scope.activeTab == tabId)
            return;
        $scope.activeTab = tabId;
        if (tabId == "CellularConfig") {
            loadCellularConfig();
        }else if (tabId == "CellularInfo") {
            loadCellularValue();
        }else if (tabId == "SMSConfig"){
            loadSMSConfig();
        }
    }

    $scope.switchSettingTab = function(tabId){
        if($scope.activeConfigTab == tabId)
            return;
        $scope.activeConfigTab = tabId;
        if (tabId == "basic_setting") {
            loadCellularBasicConfig();
        }else {
            loadCellularAdvancedConfig();
        }
    }

    $scope.switchPositionTabTo = function(tabId) {
        if($scope.activePositionTab == tabId)
            return;
        $scope.activePositionTab = tabId;
        gobalTimer.ClearTimer();
        if (tabId == "status") {
            loadPositionStatus(true);
        }else if (tabId == "config") {
            loadPositionConfig();
        }
    }

    $scope.SetAutoWrite = function(PINAuto){
        $http({
            method: 'PATCH',
            url: URL_CELLULAR_CONFIG,
            data: {En:(PINAuto == 0)? 1: 0},    //PIN only true or false;
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.ifSupportedBand = function(bandNumber){
        if(typeof(supportedCellularBandMask[bandNumber]) == "undefined")
            return false;
        else
            return true;
    }

    function loadGeneralConfig(){
        $http({
            method: 'GET',
            url: URL_GENERAL_CONFIG,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.generalConfig = response.data;
            $scope.$digest();
            //loadCellularAdvancedConfig();
            loadCellularAdvancedConfigforNetApp();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadCellularAdvancedConfigforNetApp(){
        $http({
            method: 'GET',
            url: URL_CELLULAR_ADV_CONFIG,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.CellularObj.Idl = response.data.Idl;
            $scope.CellularObj.CWDT = response.data.CWDT;
            $scope.CellularObj.Tm = response.data.Tm;
            $scope.CellularObj.Rst = response.data.Rst;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadCellularConfig(){
        if ($scope.activeConfigTab == "basic_setting") {
            loadCellularBasicConfig();
        }else {
            loadCellularAdvancedConfig();
        }
    }

    function loadCellularBasicConfig(){
        $http({
            method: 'GET',
            url: URL_CELLULAR_CONFIG,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.CellularObj = response.data;//.CCfg[0];
            //$scope.AutoWritePIN = $scope.CellularObj.En;
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function convertAdvancedBandMaskToArray(mask){
        var i;
        var destArr = [];
        var arr = Advantech.Utility.convertMaskToArray(mask, 32);
        for(i=0; i < arr.length; i++){
            destArr.push({val: arr[i]});
        }
        return destArr;
    }

    function convertAdvancedBandArrayToMask(hashArr){
        var i;
        var length = hashArr.length;
        var numberArr = [];
        var mask;
        for(i=0; i < length; i++){
            numberArr.push(parseInt(hashArr[i].val));
        }
        mask = Advantech.Utility.convertArrayToMask(numberArr);
        return mask;
    }

    function loadCellularAdvancedConfig(){
        $http({
            method: 'GET',
            url: URL_CELLULAR_ADV_CONFIG,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.CellularAdvObj = response.data;
            $scope.CellularAdvBandMsk1 = convertAdvancedBandMaskToArray($scope.CellularAdvObj.BM1);
            $scope.CellularAdvBandMsk2 = convertAdvancedBandMaskToArray($scope.CellularAdvObj.BM2);
            $scope.CellularAdvBandMsk3 = convertAdvancedBandMaskToArray($scope.CellularAdvObj.BM3);
            $scope.CellularAdvBandMsk4 = convertAdvancedBandMaskToArray($scope.CellularAdvObj.BM4);
            if (typeof $scope.CellularAdvObj.Res == 'undefined') {
                $scope.isSupportRegisteredServiceDomain = false;
            }

            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadCellularValue(){
        $http({
            method: 'GET',
            url: URL_CELLULAR_VALUE,// + '/slot_0',// + slotId
            params: { 's': new Date().getTime() },
            transformResponse: function(data, headersGetter) { // filter not ASCII printable characters in /cell_value - Nm
                return JSON.parse(data.replace(/[^\x20-\x7E]+/g, ''));
            }
        })
        .then(function(response) {
            gobalTimer.ClearTimer();
            $scope.CellularValue = response.data;//.CVal[0];
            //Set display string of current status
            $scope.RegString = Advantech.Profile.RegisterStatus[$scope.CellularValue.Rst];
            $scope.CMString = Advantech.Profile.CurrentServiceMode[$scope.CellularValue.Md];
            if (module.indexOf('WISE-4671') > -1 && $scope.CellularValue.Md == 1) {
                if($scope.CellularValue.Rssi == 0){
                    $scope.Strength = "-113dBm or less";
                }else if($scope.CellularValue.Rssi == 1){
                    $scope.Strength = "-111dBm";
                }else if($scope.CellularValue.Rssi == 31){
                    $scope.Strength = "-51dBm or greater";
                }else if($scope.CellularValue.Rssi == 99){
                    $scope.Strength = "Undetectable";
                }else{
                    var maxRssi = -113 + (parseInt($scope.CellularValue.Rssi) * 2);
                    $scope.Strength = maxRssi + "dBm";
                }
            } else {
                if($scope.CellularValue.Rssi == 0){
                    $scope.Strength = "-141dBm or less";
                }else if($scope.CellularValue.Rssi == 1){
                    $scope.Strength = "-140dBm";
                }else if($scope.CellularValue.Rssi == 31){
                    $scope.Strength = "-110dBm or greater";
                }else if($scope.CellularValue.Rssi == 99){
                    $scope.Strength = "Undetectable";
                }else{
                    var maxRssi = -141 + parseInt($scope.CellularValue.Rssi);
                    //$scope.Strength = minRssi + "dBm ~ " + maxRssi + "dBm";
                    $scope.Strength = maxRssi + "dBm";
                }
            }
            if (typeof $scope.CellularValue.Fq != 'undefined' && $scope.CellularValue.Fq === 0) {
                $scope.CellularValue.Fq = 'Not Detectable';
            }
            $scope.$digest();

            if($scope.CellularValue.Stat != "READY")
            {
                if(!LoginCanel)
                {
                    if ($scope.CellularValue.Stat === null)
                    {
                        Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "Get PIN status failed", null);
						return;//do not start timer when dialog appears
                    }
                    else if($scope.otherPinStatus.indexOf($scope.CellularValue.Stat) == -1)
                    {
                        if($scope.CellularValue.Stat == "SIM PUK")
                        {
                            $scope.HavePUK = true;
                            document.getElementById('TitlePINCode').innerHTML = "Please Enter New PIN Code:";
                            document.getElementById('TitlePINAuthentication').innerHTML = "PUK Authentication";
                        }
                        else if($scope.CellularValue.Stat == "SIM PIN")
                        {
                            $scope.HavePUK = false;
                        }
                        ShowPINAuthentication();
                        return;//do not start timer when dialog appears
                    }
                    else{
                        Advantech.Form.MessageForm.getInstance().showMessageBox("No SIM Card", "<i class='fa fa-fw fa-exclamation-triangle'></i>Please insert SIM card and restart power", null);
						return;//do not start timer when dialog appears
                    }
                }
            }else{
                $scope.LoginSuccess = true;
            }

            gobalTimer.EnableTimer(loadCellularValue, 3000);
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadPositionStatus(bPeriodical) {
        //Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        gobalTimer.ClearTimer();

        $http({
            method: 'GET',
            url: URL_POSITION_VALUE,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.positionStatus = response.data;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            if($scope.activePositionTab == 'status' && bPeriodical){
                gobalTimer.EnableTimer(function(){loadPositionStatus(true)}, pollingRate);//create timer
            }
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
    function loadPositionConfig() {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: URL_POSITION_CONFIG,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.positionSystemSelectList = Advantech.Profile.GnssSystemEnum;
            $scope.positionConfig = response.data;
            $scope.positionConfig.En = $scope.positionConfig.En + "";
            $scope.positionConfig.Intv = parseInt($scope.positionConfig.Intv);
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onConfigChannelChange = function(SelectCh){
        //selectedChannel.ch = $scope.channelSelectList[SelectCh];
        $scope.CurrentAPN = $scope.APNObj.APNPa[SelectCh];
    }

    $scope.onClickPositionStatus = function(){
        loadPositionStatus(true);
    }

    $scope.btnNetworkAppSubmit = function() {
        var requestData = {
            "EnWF": Number($scope.generalConfig.EnWF)
        };

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_GENERAL_CONFIG,
            data: requestData
        })
        .then(function(response) {
            var requestData = {
                "CWDT": Number($scope.CellularObj.CWDT),
                "Idl": Number($scope.CellularObj.Idl),
                "Tm": Number($scope.CellularObj.Tm),
                "Rst": Number($scope.CellularObj.Rst),
            };
            $http({
                method: 'PATCH',
                url: URL_CELLULAR_ADV_CONFIG,
                data: requestData
            })
            .then(function(response) {
                loadGeneralConfig();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnCellularBasicSubmit = function() {
        var requestData;// = $scope.CellularObj;
        //requestData.Code = $scope.CellularObj.Code;
        //requestData.Nm   = $scope.CellularObj.Nm;
        //requestData.Inv  = parseInt($scope.CellularObj.Inv);
        //requestData.Md   = parseInt($scope.CellularObj.Md);
        //check value
        /*if(isNaN($scope.CellularObj.Inv) || $scope.CellularObj.Inv > 600 || $scope.CellularObj.Inv < 3){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Redial Interval must between 3 ~ 600 second", null);
            return;
        }*/
        //requestData.Inv  = parseInt($scope.CellularObj.Inv);
        requestData = {
            "Nm": $scope.CellularObj.Nm,
            "Md": Number($scope.CellularObj.Md),
            "En": Number($scope.CellularObj.En)
            //"SVal": $scope.CellularObj.SVal,
            //"SMSC": $scope.CellularObj.SMSC
        };

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_CELLULAR_CONFIG,
            data: requestData
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadCellularBasicConfig();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnCellularAdvanceSubmit = function() {
        var requestData = {};

        requestData.Md = parseInt($scope.CellularAdvObj.Md);
        requestData.BM1 = convertAdvancedBandArrayToMask($scope.CellularAdvBandMsk1);
        requestData.BM2 = convertAdvancedBandArrayToMask($scope.CellularAdvBandMsk2);
        requestData.BM3 = convertAdvancedBandArrayToMask($scope.CellularAdvBandMsk3);
        requestData.BM4 = convertAdvancedBandArrayToMask($scope.CellularAdvBandMsk4);
        if ($scope.isSupportRegisteredServiceDomain && typeof $scope.CellularAdvObj.Res != 'undefined') {
            requestData.Res = parseInt($scope.CellularAdvObj.Res);
        }
        if ($scope.isSupportNetworkScanMode && typeof $scope.CellularAdvObj.Nm != 'undefined') {
            requestData.Nm = parseInt($scope.CellularAdvObj.Nm);
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_CELLULAR_ADV_CONFIG,
            data: requestData
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadCellularAdvancedConfig();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnPINCodeSubmit = function(){
        var requestData = {
            //"Code": $scope.CellularObj.Code,
            "OPw": $scope.CellularObj.OPw,
            "Pw": $scope.CellularObj.Pw,
        };

        $scope.IsPINChange = !$scope.IsPINChange;
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_CELLULAR_CONFIG,
            data: requestData//requestJson
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadCellularConfig();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onBtnPositionConfigClick = function(){
        var requestData = {};
        var url = URL_POSITION_CONFIG;
        requestData = $scope.positionConfig;
        requestData.Md = parseInt(requestData.Md);
        requestData.Intv = parseInt(requestData.Intv);
        requestData.En = parseInt(requestData.En);

        if (!requestData.Intv || requestData.Intv < 15 || requestData.Intv > 86400) {
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i> Update Interval must be 15~86400 seconds", null);
            return;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadPositionConfig();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            Advantech.Utility.restartPage();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.PINSettingVisable = function(){
        $scope.IsPINChange = !$scope.IsPINChange;
    }

    $scope.StartAuth = function(){
        var requestData = {};

        if(typeof($scope.CellularObj.En) == "undefined")
            requestData.En = 0;
        else
            requestData.En = Number($scope.CellularObj.En);

        $http({
            method: 'PATCH',
            url: URL_CELLULAR_CONFIG,
            data: requestData//requestJson
        })
        .then(function(response) {
            $scope.CheckPIN();
        }, function(error) {
            angularShowHttpErrorMessage(error);
            $scope.$digest();
        });
    }

    $scope.CheckPIN = function(){
        requestData = {};
        if($scope.HavePUK)
        {
            requestData.Pu = $scope.PUKCode;
            requestData.Pw = $scope.PINCode;
        }
        else
        {
            requestData.Code = $scope.PINCode;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_CELLULAR_CONFIG,
            data: requestData//requestJson
        })
        .then(function(response) {
            $scope.LoginSuccess = true;
            loadCellularValue();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            $scope.CloseDialog();
        }, function(error) {
            $scope.PINCode = '';
            $scope.PUKCode = '';
            $scope.LoginSuccess = false;
            if(error.data.Msg.indexOf("SIM PUK") >= 0 || $scope.HavePUK)
            {
                document.getElementById('TitlePINCode').innerHTML = "Please Enter New PIN Code:";
                document.getElementById('TitlePINAuthentication').innerHTML = "PUK Authentication";
                $scope.HavePUK = true;
            }
            else
                $scope.HavePUK = false;
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
            $scope.$digest();
        });
    }
    function loadSMSConfig(){
        $http({
            method: 'GET',
            url: URL_SMS_CONFIG,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.SmsConfig = response.data;
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
/*
    $scope.ClearCellularTimer = function()
    {
        CellularTimer = false;
    }
*/
    $scope.btnSMSSumitClick = function(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var requestData = {
            "Pw": $scope.SmsConfig.Pw,
            "SMSC": $scope.SmsConfig.SMSC
        }
        $http({
            method: 'PATCH',
            url: URL_SMS_CONFIG,
            data: requestData
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadSMSConfig();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
    $scope.CloseDialog = function(){
        $('#PINVerify').modal("hide");
        $scope.PINCode = '';
        $scope.PUKCode = '';
        LoginCanel = true;
        loadCellularValue();
        //$scope.LoginSuccess = true;
    }
    function ShowPINAuthentication() {
        $http({
            method: 'GET',
            url: URL_CELLULAR_CONFIG,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.CellularObj.En = response.data.En;
            //$scope.AutoWritePIN = $scope.CellularObj.En;
            $('#PINVerify').modal("show");
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
        //$('#PINVerify').modal("show");
    }

    /*$scope.btnAPNConfigSubmit = function(){
        requestData = $scope.CurrentAPN;
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_APN_CONFIG + '/slot_0' + '/ch_' + $scope.selectedChannel.ch,
            data: requestData
        })
        .then(function(response) {
            //Advantech.Utility.ErrorCounter.getInstance().resetCount();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadAPNConfig();
        }, function(error) {
            //Advantech.Utility.ErrorCounter.getInstance().resetCount();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }*/
}]);

function convertArrayElementToString(arr, params){
    var i, j;
    var length = arr.length;
    var paramCount = params.length;
    for(i=0; i< length; i++){
        for(j=0; j< paramCount; j++){
            arr[i][params[j]] = arr[i][params[j]] + "";
        }
    }
    return arr;
}

//WISE-PaaS IO Log Config
wiseApp.controller('wisePaasIoConfigCtrl', ['$scope', '$http', '$q', 'filteredListService', '$filter', '$timeout',
    function($scope, $http, $q, filteredListService, $filter, $timeout) {

    $scope.aiAmount = Advantech.Profile.DeviceEmun[module].ai_Ch;
    $scope.aoAmount = Advantech.Profile.DeviceEmun[module].ao_Ch;
    $scope.diAmount = Advantech.Profile.DeviceEmun[module].di_Ch;
    $scope.doAmount = Advantech.Profile.DeviceEmun[module].do_Ch;
    $scope.aiConfig = [];
    $scope.diConfig = [];
    $scope.doConfig = [];
    $scope.ModbusBitConfig = [];
    $scope.ModbusWordConfig = [];
    var slotId = "slot_0";
    $scope.activeCom = "1";
    $scope.activeTab = "di"; //default tab
    $scope.activeField = 'IO';
    $scope.activeModbus = 'Bit';
    $scope.logEnable = {di: false, do: false, ai:false, ao: false, bit: false, word: false};
    $scope.accessEnable = {di: false, do: false, ai:false, ao: false, bit: false, word: false};
    $scope.nameAiOrRtd = Advantech.Profile.DeviceEmun[module].ai_Ch > 0 && Advantech.Profile.DeviceEmun[module].isSupportRTD ? 'RTD' : 'AI';

    $scope.getTotalCom = function() {
        if(Advantech.Profile.DeviceEmun[module].TotalCom)
            return new Array(Advantech.Profile.DeviceEmun[module].TotalCom);
        else
            return new Array(0);
    }
    //////////////////Tab Switch
    $scope.switchTabTo = function(tabId) {
        if($scope.activeTab == tabId)
            return;
        $scope.activeTab = tabId;
        loadWaPartSetting(tabId);
    }
    $scope.switchFieldTo = function(tabId) {
        if($scope.activeField == tabId)
            return;
        $scope.activeField = tabId;
        if(tabId == 'Modbus')
            $scope.loadWaModbusSetting($scope.activeCom, $scope.activeModbus);
    }
    $scope.switchModbusTo = function(tabId) {
        if($scope.activeModbus == tabId)
            return;
        $scope.activeModbus = tabId;
        $scope.loadWaModbusSetting($scope.activeCom, $scope.activeModbus);
    }
    $scope.isFieldShow = function(tabId) {
        if (tabId == $scope.activeField)
            return true;
        else
            return false;
    }
    $scope.isModbusShow = function(tabId) {
        if (tabId == $scope.activeModbus)
            return true;
        else
            return false;
    }
    $scope.isTabShow = function(tabId) {
        if (tabId == $scope.activeTab)
            return true;
        else
            return false;
    }
    $scope.checkRTUModule = function(){
        if(Advantech.Profile.DeviceEmun[module].isSupportRS485 != null && Advantech.Profile.DeviceEmun[module].isSupportRS485)
            return true;
        else
            return false;
    }
    //////////////////click handler
    $scope.logEnableClick = function(ioType){
        var length;
        if(ioType == "di"){
            $scope.logEnable.di = !$scope.logEnable.di;
            length = $scope.diConfig.length;
            for(var i=0; i< length; i++){
                if($scope.logEnable.di)
                    $scope.diConfig[i].Lch = "1";
                else
                    $scope.diConfig[i].Lch = "0";
            }
        }else if(ioType == "do"){
            $scope.logEnable.do = !$scope.logEnable.do;
            length = $scope.doConfig.length;
            for(var i=0; i< length; i++){
                if($scope.logEnable.do)
                    $scope.doConfig[i].Lch = "1";
                else
                    $scope.doConfig[i].Lch = "0";
            }
        }else if(ioType == "ai"){
            $scope.logEnable.ai = !$scope.logEnable.ai;
            length = $scope.aiConfig.length;
            for(var i=0; i< length; i++){
                if($scope.logEnable.ai)
                    $scope.aiConfig[i].Lch = "1";
                else
                    $scope.aiConfig[i].Lch = "0";
            }
        }else if(ioType == "bit"){
            $scope.logEnable.bit = !$scope.logEnable.bit;
            length = $scope.ModbusBitConfig.length;
            for(var i=0; i< length; i++){
                if($scope.logEnable.bit)
                    $scope.ModbusBitConfig[i].Lch = "1";
                else
                    $scope.ModbusBitConfig[i].Lch = "0";
            }
        }else if(ioType == "word"){
            $scope.logEnable.word = !$scope.logEnable.word;
            length = $scope.ModbusWordConfig.length;
            for(var i=0; i< length; i++){
                if($scope.logEnable.word)
                    $scope.ModbusWordConfig[i].Lch = "1";
                else
                    $scope.ModbusWordConfig[i].Lch = "0";
            }
        }
    }

    $scope.accessEnableClick = function(ioType){
        var length;
        if(ioType == "di"){
            $scope.accessEnable.di = !$scope.accessEnable.di;
            length = $scope.diConfig.length;
            for(var i=0; i< length; i++){
                if($scope.accessEnable.di)
                    $scope.diConfig[i].En = "1";
                else
                    $scope.diConfig[i].En = "0";
            }
        }else if(ioType == "do"){
            $scope.accessEnable.do = !$scope.accessEnable.do;
            length = $scope.doConfig.length;
            for(var i=0; i< length; i++){
                if($scope.accessEnable.do)
                    $scope.doConfig[i].En = "1";
                else
                    $scope.doConfig[i].En = "0";
            }
        }else if(ioType == "ai"){
            $scope.accessEnable.ai = !$scope.accessEnable.ai;
            length = $scope.aiConfig.length;
            for(var i=0; i< length; i++){
                if($scope.accessEnable.ai)
                    $scope.aiConfig[i].En = "1";
                else
                    $scope.aiConfig[i].En = "0";
            }
        }else if(ioType == "bit"){
            $scope.accessEnable.bit = !$scope.accessEnable.bit;
            length = $scope.ModbusBitConfig.length;
            for(var i=0; i< length; i++){
                if($scope.accessEnable.bit)
                    $scope.ModbusBitConfig[i].En = "1";
                else
                    $scope.ModbusBitConfig[i].En = "0";
            }
        }else if(ioType == "word"){
            $scope.accessEnable.word = !$scope.accessEnable.word;
            length = $scope.ModbusWordConfig.length;
            for(var i=0; i< length; i++){
                if($scope.accessEnable.word)
                    $scope.ModbusWordConfig[i].En = "1";
                else
                    $scope.ModbusWordConfig[i].En = "0";
            }
        }
    }

    $scope.loadWaModbusSetting = function(Index, ModbusType){
        var url;
        if($scope.activeCom != Index)
            $scope.activeCom = Index;
        if(ModbusType == "Bit"){
            url = URL_WISEPAAS_BIT_CONFIG + "/slot_0/com_" + Index;
        }else if(ModbusType == "Word"){
            url = URL_WISEPAAS_WORD_CONFIG + "/slot_0/com_" + Index;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: url,
			params: { 'ss': new Date().getTime() }
        })
        .then(function(response) {
            if(ModbusType == "Bit"){
                $scope.ModbusBitConfig = response.data.ExpBit;
                convertArrayElementToString($scope.ModbusBitConfig, ["Lch", "En"]);
            }
            if(ModbusType == "Word"){
                $scope.ModbusWordConfig = response.data.ExpWord;
                convertArrayElementToString($scope.ModbusWordConfig, ["Lch", "En"]);
            }
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.aiDevRateCheck = function(aiDevRate){
        if(typeof(aiDevRate) == 'undefined' || aiDevRate < 1 || aiDevRate > 99)
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i> AI Deviation Rate must be 1~99", null);
    }

    $scope.btnWaSettingClick = function(){
        var url;
        var tag, content;
        var i, length;
        var requestData = {};
        if($scope.activeField == "IO"){
            if($scope.activeTab == "di"){
                if($scope.diAmount == 0){
                    return;
                }
                url = URL_WISEPAAS_DI_CONFIG + "/" + slotId;
                tag = "DICfg";
                content = $scope.diConfig;
            }else if($scope.activeTab == "do"){
                if($scope.doAmount == 0){
                    return;
                }
                url = URL_WISEPAAS_DO_CONFIG + "/" + slotId;
                tag = "DOCfg";
                content = $scope.doConfig;
            }else if($scope.activeTab == "ai"){
                if($scope.aiAmount == 0){
                    return;
                }
                url = URL_WISEPAAS_AI_CONFIG + "/" + slotId;
                tag = "AICfg";
                content = $scope.aiConfig;
            }else{
                return;
            }
        }else if($scope.activeField == "Modbus"){
            if($scope.activeModbus == "Bit"){
                url = URL_WISEPAAS_BIT_CONFIG + "/slot_0/com_" + $scope.activeCom;
                tag = "ExpBit";
                content = $scope.ModbusBitConfig;
            }else if($scope.activeModbus == "Word"){
                url = URL_WISEPAAS_WORD_CONFIG + "/slot_0/com_" + $scope.activeCom;
                tag = "ExpWord";
                content = $scope.ModbusWordConfig;
            }
        }else{
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i> IO Type Error", null);
            return;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        length = content.length;
        for(i=0; i< length; i++){
            content[i].Ch = parseInt(content[i].Ch);
            content[i].En = parseInt(content[i].En);
            content[i].Lch = parseInt(content[i].Lch);
            if(content[i].Md){
                content[i].Md = parseInt(content[i].Md);
            }

            if(content[i].AIDR){
                content[i].AIDR = parseInt(content[i].AIDR);
            }
        }
        requestData[tag] = content;

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            if($scope.activeField == "IO"){
                loadWaPartSetting($scope.activeTab);
            }else if($scope.activeField == "Modbus"){
                $scope.loadWaModbusSetting($scope.activeCom, $scope.activeModbus);
            }
        }, function(error) {
            Advantech.Utility.ErrorCounter.getInstance().resetCount();
            angularShowHttpErrorMessage(error);
        });
    }
    ////////////////////load Data

    function loadWaAllSetting(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var requestArray = [];
        var aiIndex, diIndex, doIndex;
        var counter = 0;

        if($scope.diAmount > 0){
            requestArray.push($http.get(URL_WISEPAAS_DI_CONFIG + "/" + slotId + "?s=" + (new Date().getTime())));
            diIndex = counter;
            counter++;
        }
        if($scope.doAmount > 0){
            requestArray.push($http.get(URL_WISEPAAS_DO_CONFIG + "/" + slotId + "?s=" + (new Date().getTime())));
            doIndex = counter;
            counter++;
        }
        if($scope.aiAmount > 0){
            requestArray.push($http.get(URL_WISEPAAS_AI_CONFIG + "/" + slotId + "?s=" + (new Date().getTime())));
            aiIndex = counter;
            counter++;
        }

        $q.all(requestArray)
        .then(function(responses){
            var i;
            if($scope.aiAmount!=0){
                $scope.aiConfig = responses[aiIndex].data.AICfg;
                convertArrayElementToString($scope.aiConfig, ["Lch", "En"]);
                for (i=0; i< $scope.aiConfig.length; i++){
                    $scope.aiConfig[i].AIDR = parseInt($scope.aiConfig[i].AIDR);
                }
            }
            if($scope.diAmount!=0){
                $scope.diConfig = responses[diIndex].data.DICfg;
                convertArrayElementToString($scope.diConfig, ["Lch", "En", "Md"]);
            }
            if($scope.doAmount!=0){
                $scope.doConfig = responses[doIndex].data.DOCfg;
                convertArrayElementToString($scope.doConfig, ["Lch", "En"]);
            }
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        })
    }

    function loadWaPartSetting(ioType){
        var url;
        if(ioType == "di"){
            if($scope.diAmount == 0){
                return;
            }
            url = URL_WISEPAAS_DI_CONFIG + "/" + slotId;
        }else if($scope.activeTab == "do"){
            if($scope.doAmount == 0){
                return;
            }
            url = URL_WISEPAAS_DO_CONFIG + "/" + slotId;
        }else if($scope.activeTab == "ai"){
            if($scope.aiAmount == 0){
                return;
            }
            url = URL_WISEPAAS_AI_CONFIG + "/" + slotId;
        }else{
            return;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: url,
            params: { 'ss': new Date().getTime() }
        })
        .then(function(response) {
            if(ioType == "ai"){
                $scope.aiConfig = response.data.AICfg;
                convertArrayElementToString($scope.aiConfig, ["Lch", "En"]);
                for (var i=0; i< $scope.aiConfig.length; i++){
                    $scope.aiConfig[i].AIDR = parseInt($scope.aiConfig[i].AIDR);
                }
            }
            if(ioType == "di"){
                $scope.diConfig = response.data.DICfg;
                convertArrayElementToString($scope.diConfig, ["Lch", "En", "Md"]);
            }
            if(ioType == "do"){
                $scope.doConfig = response.data.DOCfg;
                convertArrayElementToString($scope.doConfig, ["Lch", "En"]);
            }
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    //loadWaAllSetting();
    loadWaPartSetting($scope.activeTab);
}]);

wiseApp.controller('pagesCtrl', ['$scope', '$http', '$q', '$filter', '$timeout',
    function($scope, $http, $q, $filter, $timeout) {

    $scope.pageContent = '';
    var targetTab = Advantech.Utility.RecordContextPageIdSingleton.getInstance().getTag();
    $scope.pageContent = targetTab ? targetTab :'fwUpgrade'; //set desired tab
    $scope.ioBoardEvent = Advantech.Data.ModuleData.getInstance().getErrorStatus();
    $scope.errorDescription = '';
    if (typeof $scope.ioBoardEvent != 'undefined') {
        if ($scope.ioBoardEvent !== 0) {
            $scope.errorDescription = Advantech.Profile.IoBoardErrorStatusCode[$scope.ioBoardEvent] + '. Event=' + $scope.ioBoardEvent + '. ' + Advantech.Profile.IoBoardErrorActionCode[$scope.ioBoardEvent] + '.';
        } else {
            $scope.errorDescription = 'Fail to communicate with the I/O board. Event=' + $scope.ioBoardEvent + '. Firmware boot is in progress. Please connect again.';
        }
    } else {
        $scope.errorDescription = 'Firmware version is too old. Firmware upgrade is required.';
    }

    $scope.descStr = '';
    $http({
        method: 'GET',
        url: URL_PROFILE,
        params: { 's': new Date().getTime() }
    })
    .then(function(response) {
        var slotInfoJson = response.data;
        var arrDesc = [];
        for (var pro in slotInfoJson) {
            switch (pro) {
                case "FwVer":
                    if(slotInfoJson[pro] !== "")
                        arrDesc.push('Fw:' + slotInfoJson[pro]);
                    break;
                case "BVer":
                    if(slotInfoJson[pro] !== "")
                        arrDesc.push('Bootloader:' + slotInfoJson[pro]);
                    break;
                case "ADVer":
                    if(slotInfoJson[pro] !== "")
                        arrDesc.push('A/D Fw:' + slotInfoJson[pro]);
                    break;
                case "IBVer":
                    if(slotInfoJson[pro] !== "")
                        arrDesc.push('A/D Bootloader:' + slotInfoJson[pro]);
                    break;
                case "HwVer":
                    if(slotInfoJson[pro] !== "")
                        arrDesc.push('Hw:' + slotInfoJson[pro]);
                    break;
            }
        }
        $scope.descStr = arrDesc.join(', ');
        $scope.$digest();
        Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
    }, function(error) {
        Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
    });

    $scope.onReloadClick = function() {
        if (Advantech.Utility.checkExternalFunExist()) {
            Advantech.Utility.callExternalFun('control', '');
        } else {
            Advantech.Utility.reConnectPage();
        }
    }

    /////////////////////////////////////////////////////////
    // For End Device FW Upgrade (copy from config.html)
    var fileUpgradePanel;//fw upgrade
    var fileUpdatePrgressForm;//fw upgrade

    fileUpgradePanel = new Advantech.Form.SystemForm.FileUpgradePanel("panelFileUpgrade");
    fileUpdatePrgressForm = new Advantech.Form.ProgressForm.getInstance();
    fileUpgradePanel.initialPanel();

    fileUpgradePanel.onUpgradeSubmitted(function(obj, e) {
        if( !Advantech.Utility.isIE() || Advantech.Utility.isIE() > 9){
            fileUpdatePrgressForm.showProgressForm(e.file.name);
        }
        multiPartTransfer(URL_FILE_TRANSFER, function(){onFileUpgradeDone(e.type)}, onFileUpgradeFail, onFileUpgradeUpdateProgress, e.file, e.length, e.type, e.form);
    });

    function onFileUpgradeDone(type) {
        fileUpdatePrgressForm.updateProgressForm(100);
        setTimeout(function() {
            fileUpdatePrgressForm.hideProgressForm();
            if(type === 0 || type == 4 || type == 10){
                Advantech.Utility.retryAndRestartPage(23, function(){
                    if (Advantech.Utility.checkExternalFunExist()) {
                        Advantech.Utility.callExternalFun('control', '');
                    } else {
                        Advantech.Utility.reConnectPage();
                    }
                });//wait for FW
            }
            else if(type === 1){
                Advantech.Utility.switchToTagetHtml("index","/config");
            }
            else{
                Advantech.Form.MessageForm.getInstance().showMessageBox("Notification", "<h5>Uploaded successfully.</h5>");
            }
        }, 1000);
    };
    var onFileUpgradeFail = function(xhr, thrownError, file, apiErrorCode, apiErrorMsg) {
        var fileName = file.name || "file";
        var returnMsg = "<i class='fa fa-fw fa-exclamation-triangle'></i>The " + fileName + " upload fail. Cause upload has occurred " + thrownError + "<p/>";
        returnMsg += apiErrorCode!=undefined && apiErrorCode!="" ? "Reason: " + Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] : "";
        returnMsg += apiErrorMsg!=undefined && apiErrorMsg!=""? "<p/>(Detail: " + apiErrorMsg + " error, Error number:" +apiErrorCode+")" : "";
        Advantech.Form.MessageForm.getInstance().showMessageBox("Error code:" + xhr.status, returnMsg,
            function(){
                fileUpgradePanel.refreshPanel();
            });
            fileUpdatePrgressForm.hideProgressForm();
    };
    function onFileUpgradeUpdateProgress(evt) {
        if(evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total)*100;
            percentComplete =(percentComplete > 99)?99:percentComplete;
            fileUpdatePrgressForm.updateProgressForm(int(percentComplete));
        }
    };

	$scope.btnLeaveFwUploadClick = function(){
        //chagne to normal mode
        $http({
            method: 'PATCH',
            url: URL_GENERAL_CONFIG,
            data: {"AMd":1}
        })
        .then(function(response) {
            Advantech.Utility.switchToTagetHtml("index", ABSOLUTE_PATH+"/index.html");
        }, function(error) {
            $("#CommonConfirmModal").modal("hide");
            angularShowHttpErrorMessage(error);
        });
    }
    // End For End Device FW Upgrade
    /////////////////////////////////////////////////////////
}]);

wiseApp.controller('SiteSurveyCtrl', ['$scope', '$compile', '$http', '$q', '$filter', '$timeout',
    function($scope, $compile, $http, $q, $filter, $timeout) {
    //Node: site Survey
    $scope.siteSurvey = {
        "surveyPacketAmount": 100,
        "surveyStatus": 'stop',
        "currentPacketSend": 0,
        "successAutoPacketCount": 0,
        "successPacketCount": 0,
        "failedAutoPacketCount": 0,
        "failedPacketCount": 0,
        "bBtnClicked": false,
        "packetErrorRate": 0,
        "maxRssi": 0,
        "minRssi": 0,
        "avgRssi": 0,
        "maxTm": 0,
        "avgTm": 0,
        "totalNoAck": 0,
        "totalATError": 0,
        "totalRxErrorByte": 0,
        "totalCMSError": 0,
        "totalCMEError": 0,
        "totalSocketError": 0,
        "totalOtherError": 0,
        "totalTxErrorByte": 0,
        "totalWrongServerVersion": 0,
    };
    $scope.hasErr = false;
    var totalRssi = 0;
    var totalTm = 0;
    var bPendingPacketStop = false;
    var curMaxRssi = -141;
    var curMinRssi = 0;
    var curMaxTm = 0;
    $scope.sendList = [];
    $scope.isShowDownload = false;
    $scope.isSupDownloadAttr = ('download' in document.createElement('a'));
    $scope.CSVData = '';
    $scope.siteConfig = {};
    $scope.failStatusEnum = {
        0: 'No Ack',
        1: 'AT Error',
        2: 'Rx Error Byte(s) In Packet',
        3: 'CMS Error',
        4: 'CME Error',
        5: 'Socket Error',
        6: 'Other Error',
        7: 'Tx Error Byte(s) In Packet',
        8: 'Wrong Server Version'
    };
    $scope.autoSiteSurveyTimer = null;
    $scope.switchPacketSend = '1'; // 0: continuous, 1: specify amount
    $scope.isSupportExternalFun = Advantech.Utility.checkExternalFunExist();
    $scope.cancelButtonDisable = false;

    function padZero (val) {
        return val < 10 ? '0' + val : val;
    }

    function loadSiteConfig() {
        // try {
        //     // call c# function for derestrict timeout setting
        //     window.external.VComWebUtilitySyncCallBackFun('start_site_survy_nbiot', 120000);
        // } catch(e) {

        // }
        Advantech.Utility.callExternalFun('start_site_survy_nbiot', 120000);

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: URL_SITE_SURVEY_CONFIG + '/slot_0',
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            $scope.siteConfig = response.data;
            // $scope.siteConfig.IP = '52.184.99.168'; // for test
            $scope.$digest();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    function sendSiteSurveyPacket(){
        //Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $scope.siteSurvey.currentPacketSend++;
        $http({
            method: 'GET',
            url: URL_SITE_SURVEY_STATUS + '/slot_0',
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            if (!$scope.hasErr && typeof response.data.Err != 'undefined') {
                $scope.hasErr = true;
            }

            if (typeof response.data.Tm != 'undefined' && response.data.Tm.toString(16) != 'ffffffff') {
                if (response.data.Tm > curMaxTm) {
                    $scope.siteSurvey.maxTm = response.data.Tm;
                    curMaxTm = response.data.Tm;
                }
                totalTm += response.data.Tm;
                $scope.siteSurvey.avgTm = Number(totalTm/$scope.siteSurvey.currentPacketSend).toFixed(1);
            }

            if (response.data.Rssi != 99) {
                var dBm = -141 + response.data.Rssi;
                if(dBm < curMinRssi){
                    $scope.siteSurvey.minRssi = dBm;
                    curMinRssi = dBm;
                }
                if(dBm > curMaxRssi){
                    $scope.siteSurvey.maxRssi = dBm;
                    curMaxRssi = dBm;
                }
                totalRssi = totalRssi + dBm;
                $scope.siteSurvey.avgRssi = Number(totalRssi/$scope.siteSurvey.currentPacketSend).toFixed(1);
            }

            if(response.data.Stat == 1){
                if ($scope.siteSurvey.surveyStatus == 'auto') {
                    $scope.siteSurvey.successAutoPacketCount++;
                }
                $scope.siteSurvey.successPacketCount++;
            }else{
                if ($scope.siteSurvey.surveyStatus == 'auto') {
                    $scope.siteSurvey.failedAutoPacketCount++;
                }
                $scope.siteSurvey.failedPacketCount++;
                if ($scope.hasErr) {
                    switch (response.data.Err) {
                        case 0:
                            $scope.siteSurvey.totalNoAck++;
                            break;
                        case 1:
                            $scope.siteSurvey.totalATError++;
                            break;
                        case 2:
                            $scope.siteSurvey.totalRxErrorByte++;
                            break;
                        case 3:
                            $scope.siteSurvey.totalCMSError++;
                            break;
                        case 4:
                            $scope.siteSurvey.totalCMEError++;
                            break;
                        case 5:
                            $scope.siteSurvey.totalSocketError++;
                            break;
                        case 6:
                            $scope.siteSurvey.totalOtherError++;
                            break;
                        case 7:
                            $scope.siteSurvey.totalTxErrorByte++;
                            break;
                        case 8:
                            $scope.siteSurvey.totalWrongServerVersion++;
                            break;
                    }
                }
            }

            var now = new Date();
            $scope.sendList.push({
                Stat: response.data.Stat,
                Rssi: response.data.Rssi == 99 ? 'not known or not detectable' : -141 + response.data.Rssi,
                Tm:   typeof response.data.Tm != 'undefined' ? (response.data.Tm.toString(16) == 'ffffffff' ? 'RX Timeout' : response.data.Tm) : 'none',
                Err:  typeof response.data.Err != 'undefined' ? ([1,3,4].indexOf(response.data.Err) > -1 ? $scope.failStatusEnum[response.data.Err] + '(' + response.data.Code + ')' : $scope.failStatusEnum[response.data.Err]) : 'none',
                textColor: response.data.Stat === 1 ? {color:'#428bca'} : {color:'#d9534f'},
                PubQ: $scope.siteConfig.PubQ,
                SEn:  $scope.siteSurvey.surveyStatus == 'auto' ? $scope.sendList.length + 1 : response.data.SEn,
                time: now.getFullYear() + '/' + padZero(now.getMonth() + 1) + '/' + padZero(now.getDate()) + ' ' + padZero(now.getHours()) + ':' + padZero(now.getMinutes()) + ':' + padZero(now.getSeconds()),
                data: response.data
            });

            $scope.$digest();

            if (bPendingPacketStop == false && $scope.siteSurvey.surveyStatus == 'auto' && $scope.siteSurvey.successAutoPacketCount < 3 && $scope.siteConfig.PubQ > 100) {
                if ($scope.siteSurvey.failedAutoPacketCount > 0) {
                    $scope.siteConfig.PubQ -= 100;
                    $http({
                        method: 'PATCH',
                        url: URL_SITE_SURVEY_CONFIG + '/slot_0',
                        data: $scope.siteConfig
                    })
                    .then(function(response) {
                        $scope.siteSurvey.surveyPacketAmount = $scope.siteSurvey.currentPacketSend + 3;
                        $scope.siteSurvey.successAutoPacketCount = 0;
                        $scope.siteSurvey.failedAutoPacketCount = 0;
                        sendSiteSurveyPacket();
                    }, function(error) {
                        angularShowHttpErrorMessage(error);
                    });
                } else {
                    sendSiteSurveyPacket();
                }
            } else if (bPendingPacketStop==false && $scope.siteSurvey.surveyStatus == 'start' && $scope.siteSurvey.currentPacketSend < $scope.siteSurvey.surveyPacketAmount) {
                sendSiteSurveyPacket();
            } else {
                $scope.siteSurvey.surveyStatus = 'stop';
                bPendingPacketStop = false;
                //calculate result
                $scope.siteSurvey.packetErrorRate = Number(($scope.siteSurvey.failedPacketCount/$scope.siteSurvey.currentPacketSend) * 100).toFixed(2) + " %";
                genCSVData();
                $scope.$digest();
            }
        }, function(error) {
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            $scope.siteSurvey.surveyStatus = 'stop';
            bPendingPacketStop = false;
            $scope.$digest();
            angularShowHttpErrorMessage(error);
        });
    }

    function genCSVData() {
        var _CSVData = '';
        _CSVData += 'Sequence,Transmission Packet Length,Result,RSRP,Response Time,Date Time,Fail Status,Error Code\r\n';
        $scope.sendList.forEach(function(item) {
            _CSVData += item.SEn;
            _CSVData += ',';
            _CSVData += item.PubQ;
            _CSVData += ',';
            _CSVData += item.Stat == 1 ? 'Success' : 'Failed';
            _CSVData += ',';
            _CSVData += item.Rssi;
            _CSVData += ',';
            _CSVData += item.Tm;
            _CSVData += ',';
            _CSVData += item.time;
            _CSVData += ',';
            _CSVData += typeof item.data.Err == 'undefined' ? '' : item.data.Err;
            _CSVData += ',';
            _CSVData += typeof item.data.Code == 'undefined' ? (item.Stat == 1 ? '' : 0) : item.data.Code;
            _CSVData += '\r\n';
        });

        if ($scope.isSupDownloadAttr) {
            $scope.CSVData += 'text/csv;charset=utf-8,' + encodeURIComponent(_CSVData);
        } else {
            $scope.CSVData = _CSVData;
        }

        $scope.isShowDownload = true;
    }

    $scope.btnSiteSurveyClick = function(enable, surveyStatus){
        if ($scope.switchPacketSend === '0') {
            $scope.siteConfig.En = 1; // 1: enter site survey mode, 0: leave site survey mode
            $scope.siteConfig.Md = parseInt($scope.siteConfig.Md);
            // try {
            //     // call c# function for continuous send packet
            //     window.external.VComWebUtilitySyncCallBackFun('continuous_site_survy_nbiot', JSON.stringify($scope.siteConfig));
            // } catch(e) {

            // }
            Advantech.Utility.callExternalFun('continuous_site_survy_nbiot', JSON.stringify($scope.siteConfig));
            return;
        }

        $scope.siteSurvey.bBtnClicked = true;

        if(enable == 1){
            $scope.siteSurvey.surveyStatus = surveyStatus || 'start';
            $scope.cancelButtonDisable = true;
            $scope.siteSurvey.currentPacketSend = 0;
            $scope.siteSurvey.successAutoPacketCount = 0;
            $scope.siteSurvey.successPacketCount = 0;
            $scope.siteSurvey.failedAutoPacketCount = 0;
            $scope.siteSurvey.failedPacketCount = 0;
            $scope.siteSurvey.packetErrorRate = 'Please Wait...';
            $scope.siteSurvey.maxRssi = 0;
            $scope.siteSurvey.minRssi = 0;
            $scope.siteSurvey.avgRssi = 0;
            $scope.siteSurvey.maxTm = 0;
            $scope.siteSurvey.avgTm = 0;
            $scope.siteSurvey.totalNoAck = 0;
            $scope.siteSurvey.totalATError = 0;
            $scope.siteSurvey.totalRxErrorByte = 0;
            $scope.siteSurvey.totalCMSError = 0;
            $scope.siteSurvey.totalCMEError = 0;
            $scope.siteSurvey.totalSocketError = 0;
            $scope.siteSurvey.totalOtherError = 0;
            $scope.siteSurvey.totalTxErrorByte = 0;
            $scope.siteSurvey.totalWrongServerVersion = 0;
            totalRssi = 0;
            totalTm = 0;
            $scope.sendList = [];
            curMaxRssi = -141;
            curMinRssi = 0;
            curMaxTm = 0;
            $scope.isShowDownload = false;
            $scope.CSVData = '';
            $scope.siteConfig.En = 1; // 1: enter site survey mode, 0: leave site survey mode
            $scope.siteConfig.Md = parseInt($scope.siteConfig.Md);
            $http({
                method: 'PATCH',
                url: URL_SITE_SURVEY_CONFIG + '/slot_0',
                data: $scope.siteConfig
            })
            .then(function(response) {
                $scope.cancelButtonDisable = false;
                $scope.$digest();
                sendSiteSurveyPacket();
            }, function(error) {
                $scope.siteSurvey.surveyStatus = 'stop';
                $scope.$digest();
                angularShowHttpErrorMessage(error);
            });
        }else{
            bPendingPacketStop = true;
            if ($scope.siteSurvey.failedPacketCount == $scope.siteSurvey.currentPacketSend - 1) {
                $scope.siteSurvey.minRssi = 'none';
                $scope.siteSurvey.maxRssi = 'none';
                $scope.siteSurvey.avgRssi = 'none';
            }
        }
    }

    $scope.btnLeaveSiteSurveyClick = function(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'PATCH',
            url: URL_SITE_SURVEY_CONFIG + '/slot_0',
            data: {"En" : 0} //1: enter site survey mode, 0: leave site survey mode
        })
        .then(function(response) {
            // try {
            //     // call c# function for recovery timeout setting
            //     window.external.VComWebUtilitySyncCallBackFun('end_site_survy_nbiot', '');
            // } catch(e) {

            // }
            Advantech.Utility.callExternalFun('end_site_survy_nbiot', '');

            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            Advantech.Utility.restartPage(25);
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnSaveDataClick = function() {
        window.navigator.msSaveOrOpenBlob(new Blob([$scope.CSVData], {type: 'text/csv'}), 'data.csv');
    }

    $scope.btnAutoSiteSurveyClick = function(){
        $scope.siteConfig.PubQ = 2000;
        $scope.siteSurvey.surveyPacketAmount = 3;
        $scope.btnSiteSurveyClick(1, 'auto');
    }

    loadSiteConfig();
}])
.directive('toggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.toggle == 'tooltip' && element.hasClass('descTooltip')) {
                $(element).tooltip();
            }
        }
    };
});

wiseApp.controller('PowerOutputCtrl', ['$scope', '$http', '$q', '$filter', '$timeout', function($scope, $http, $q, $filter, $timeout) {
    $scope.AIGenConfig = {};

    function getAIGenConfig () {
        $http({
            method: 'GET',
            url: URL_AI_GEN_CONFIG + '/slot_0',
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.AIGenConfig = response.data;
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnPowerOutputClick = function() {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_AI_GEN_CONFIG + '/slot_0',
            // data: $scope.AIGenConfig
            data: {Alt: parseInt($scope.AIGenConfig.Alt)}
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        });
    }

    getAIGenConfig();
}]);

wiseApp.controller('mqttAdvancedSetting', ['$scope', '$http', '$q', '$filter', '$timeout',
    function($scope, $http, $q, $filter, $timeout) {

    var fileUpdatePrgressForm = new Advantech.Form.ProgressForm.getInstance();
    var _profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();

    $scope.uioConfig = [];
    $scope.mqttConfig = {};
    $scope.isSupportMqttCustomTopic = false;
    $scope.isNewMqttCustomGui = Advantech.Profile.DeviceEmun[module].isNewMqttCustomGui;
    $scope.nameAiOrRtd = (typeof _profile.RTD != 'undefined' && _profile.RTD > 0) ? ['RTD', 'Key Name of Published RTD Value', 'Key Name of Published RTD Status'] : ['AI', 'Key Name of Published AI Value', 'Key Name of Published AI Status'];
    $scope.topicPattern = function() {
        if (Advantech.Profile.DeviceEmun[module].allowTopicLeadingSlash) {
            return /^\/$|^\/?(([^\/\+\#]+\/)*[^\/\+\#]+)$/;
        } else {
            return /^\/$|^(([^\/\+\#]+\/)*[^\/\+\#]+)$/;
        }
    };
    $scope.errorMessage = {};
    $scope.mqttFileCfg = '';
    $scope.reservedWord = {
        '#MAC#': '',
        '#IP#': '',
        '#Id#': '',
        '#Nm#': '',
        '#UID#': ''
    };
    $scope.preview = {
        checked: false
    };
    $scope.mqttCustomCommon = {
        Cntn: {
            value: '',
            enabled: false,
            name: 'Connected Message',
            type: 'message',
            valid: false
        },
        Nm: {
            value: '',
            enabled: false,
            name: 'Will Topic',
            type: 'topic',
            valid: false
        },
        Ws: {
            value: '',
            enabled: false,
            name: 'Will Message',
            type: 'message',
            valid: false
        },
        PWeb: {
            value: '',
            enabled: false,
            name: 'Publish Data Topic',
            type: 'topic',
            valid: false
        },
        CtOv: {
            value: '',
            enabled: false,
            name: 'JSON Key Of Control',
            type: 'jsonKey',
            valid: false
        }
    };
    $scope.mqttCustomPO = {
        Lat: {
            value: '',
            enabled: false,
            name: 'Position Latitude',
            type: 'jsonKey',
            valid: false
        },
        Lng: {
            value: '',
            enabled: false,
            name: 'Position Longitude',
            type: 'jsonKey',
            valid: false
        },
        Alt: {
            value: '',
            enabled: false,
            name: 'Position Altitude',
            type: 'jsonKey',
            valid: false
        },
        RT: {
            value: '',
            enabled: false,
            name: 'Ground Speed',
            type: 'jsonKey',
            valid: false
        },
        Cntn: {
            value: '',
            enabled: false,
            name: 'Number Of Satellites',
            type: 'jsonKey',
            valid: false
        }
    };
    $scope.mqttCustomAI = [];
    $scope.mqttCustomDI = [];
    $scope.mqttCustomDO = [];
    $scope.mqttCustomCom = {};

    if ($scope.isNewMqttCustomGui) {
        $scope.mqttCustomPublishCoilAll = [];
        $scope.mqttCustomPublishRegisterAll = [];
        $scope.mqttCustomSubscribeCoilAll = [];
        $scope.mqttCustomSubscribeRegisterAll = [];

        $.extend(true, $scope.mqttCustomCommon, {
            Cntn: {
                radioChecked: 0
            },
            Nm: {
                radioChecked: 0
            },
            Ws: {
                radioChecked: 0
            },
            PWeb: {
                radioChecked: 0
            },
            CtOv: {
                radioChecked: 0
            }
        });
        $.extend(true, $scope.mqttCustomPO, {
            Lat: {
                radioChecked: 0
            },
            Lng: {
                radioChecked: 0
            },
            Alt: {
                radioChecked: 0
            },
            RT: {
                radioChecked: 0
            },
            Cntn: {
                radioChecked: 0
            }
        });
    }

    function getMqttConfig () {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: URL_MQTT_CONFIG,
			params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            if(response.data.CtOv === 1) {
                $scope.isSupportMqttCustomTopic = true;
                $scope.getMqttFile();
            } else {
                $scope.isSupportMqttCustomTopic = false;
            }
            $scope.mqttConfig = response.data;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    function getInitialInfo () {
        $scope.reservedWord['#MAC#'] = _profile.IId;
        $http({
            method: 'GET',
            url: URL_SYS_INFO,
			params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.reservedWord['#Id#'] = response.data.Id;
            $scope.reservedWord['#Nm#'] = response.data.Nm;
            $scope.reservedWord['#UID#'] = response.data.UID;
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });

        $http({
            method: 'GET',
            url: URL_CELLULAR_VALUE,
			params: { 'foo': new Date().getTime() },
            transformResponse: function(data, headersGetter) { // filter not ASCII printable characters in /cell_value - Nm
                return JSON.parse(data.replace(/[^\x20-\x7E]+/g, ''));
            }
        })
        .then(function(response) {
            $scope.reservedWord['#IP#'] = response.data.IP;
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });

        if (typeof _profile.UIn != 'undefined' && _profile.UIn > 0) {
            $http({
                method: 'GET',
                url: URL_UI_CONFIG + '/slot_0',
                params: { 'foo': new Date().getTime() }
            })
            .then(function(response) {
                $scope.uioConfig = angular.copy(response.data.UCfg);
                $scope.appendChannelData();
            }, function(error) {
                angularShowHttpErrorMessage(error);
            });
        } else {
            $scope.appendChannelData();
        }
    }

    $scope.appendChannelData = function () {
        if (typeof _profile.UIn != 'undefined' && _profile.UIn > 0) {
            for (var i=0; i<$scope.uioConfig.length; i++) {
                if ($scope.uioConfig[i].En === 1) {
                    if ($scope.uioConfig[i].Md === 0) { // AI
                        var _obj = {
                            Ch: $scope.uioConfig[i].Ch,
                            Val: {
                                value: '',
                                enabled: false,
                                name: 'JSON Key Name Of AI Value Channel' + $scope.uioConfig[i].Ch,
                                type: 'jsonKey',
                                valid: false
                            },
                            Tag: {
                                value: '',
                                enabled: false,
                                name: 'JSON Key Name Of AI Status Channel' + $scope.uioConfig[i].Ch,
                                type: 'jsonKey',
                                valid: false
                            }
                        };
                        if ($scope.isNewMqttCustomGui) {
                            $.extend(true, _obj, {
                                Val: {
                                    radioChecked: 0
                                },
                                Tag: {
                                    radioChecked: 0
                                }
                            })
                        }
                        $scope.mqttCustomAI.push(_obj);
                    } else { // DI
                        var _obj = {
                            Ch: $scope.uioConfig[i].Ch,
                            Val: {
                                value: '',
                                enabled: false,
                                name: 'JSON Key Name Of DI Value Channel' + $scope.uioConfig[i].Ch,
                                type: 'jsonKey',
                                valid: false
                            },
                            CtS: {
                                value: '',
                                enabled: false,
                                name: 'Topic Name Of DI Control Channel' + $scope.uioConfig[i].Ch,
                                type: 'topic',
                                valid: false
                            }
                        };
                        if ($scope.isNewMqttCustomGui) {
                            $.extend(true, _obj, {
                                Val: {
                                    radioChecked: 0
                                },
                                CtS: {
                                    radioChecked: 0
                                }
                            })
                        }
                        $scope.mqttCustomDI.push(_obj);
                    }
                }
            }
        } else if (typeof _profile.RTD != 'undefined' && _profile.RTD > 0) {
            for (var i=0; i<_profile.RTD; i++) {
                var _obj = {
                    Ch: i,
                    Val: {
                        value: '',
                        enabled: false,
                        name: 'JSON Key Name Of RTD Value Channel' + i,
                        type: 'jsonKey',
                        valid: false
                    },
                    Tag: {
                        value: '',
                        enabled: false,
                        name: 'JSON Key Name Of RTD Status Channel' + i,
                        type: 'jsonKey',
                        valid: false
                    }
                };
                if ($scope.isNewMqttCustomGui) {
                    $.extend(true, _obj, {
                        Val: {
                            radioChecked: 0
                        },
                        Tag: {
                            radioChecked: 0
                        }
                    })
                }
                $scope.mqttCustomAI.push(_obj);
            }
        } else {
            for (var i=0; i<_profile.AIn; i++) {
                var _obj = {
                    Ch: i,
                    Val: {
                        value: '',
                        enabled: false,
                        name: 'JSON Key Name Of AI Value Channel' + i,
                        type: 'jsonKey',
                        valid: false
                    },
                    Tag: {
                        value: '',
                        enabled: false,
                        name: 'JSON Key Name Of AI Status Channel' + i,
                        type: 'jsonKey',
                        valid: false
                    }
                };
                if ($scope.isNewMqttCustomGui) {
                    $.extend(true, _obj, {
                        Val: {
                            radioChecked: 0
                        },
                        Tag: {
                            radioChecked: 0
                        }
                    })
                }
                $scope.mqttCustomAI.push(_obj);
            }
            for (var i=0; i<_profile.DIn; i++) {
                var _obj = {
                    Ch: i,
                    Val: {
                        value: '',
                        enabled: false,
                        name: 'JSON Key Name Of DI Value Channel' + i,
                        type: 'jsonKey',
                        valid: false
                    },
                    CtS: {
                        value: '',
                        enabled: false,
                        name: 'Topic Name Of DI Control Channel' + i,
                        type: 'topic',
                        valid: false
                    }
                };
                if ($scope.isNewMqttCustomGui) {
                    $.extend(true, _obj, {
                        Val: {
                            radioChecked: 0
                        },
                        CtS: {
                            radioChecked: 0
                        }
                    })
                }
                $scope.mqttCustomDI.push(_obj);
            }
        }
        var _doCh = _profile.DOn || _profile.RLAn;
        for (var i=0; i<_doCh; i++) {
            var _obj = {
                Ch: i,
                Val: {
                    value: '',
                    enabled: false,
                    name: 'JSON Key Name Of DO Value Channel' + i,
                    type: 'jsonKey',
                    valid: false
                },
                CtS: {
                    value: '',
                    enabled: false,
                    name: 'Topic Name Of DO Control Channel' + i,
                    type: 'topic',
                    valid: false
                }
            };
            if ($scope.isNewMqttCustomGui) {
                $.extend(true, _obj, {
                    Val: {
                        radioChecked: 0
                    },
                    CtS: {
                        radioChecked: 0
                    }
                })
            }
            $scope.mqttCustomDO.push(_obj);
        }
        var comport = typeof _profile.RT != 'undefined' ? _profile.RT : (typeof _profile.MCh != 'undefined' && _profile.MCh !== 0 ? 1 : 0);
        for (var i=0; i<comport; i++) {
            var _mqttCustomCoil = [];
            var _mqttCustomRegister = [];
            for (var j=0; j<_profile.MCh; j++) {
                var _objColi = {
                    Ch: j,
                    Val: {
                        value: '',
                        enabled: false,
                        name: 'JSON Key Name Of Coil Value Com' + (i+1) + ' Channel' + j,
                        type: 'jsonKey',
                        valid: false
                    },
                    CtS: {
                        value: '',
                        enabled: false,
                        name: 'Topic Name Of Coil Control Com' + (i+1) + ' Channel' + j,
                        type: 'topic',
                        valid: false
                    }
                };
                var _objRegister = {
                    Ch: j,
                    Val: {
                        value: '',
                        enabled: false,
                        name: 'JSON Key Name Of Register Value Com' + (i+1) + ' Channel' + j,
                        type: 'jsonKey',
                        valid: false
                    },
                    CtS: {
                        value: '',
                        enabled: false,
                        name: 'Topic Name Of Reigster Control Com' + (i+1) + ' Channel' + j,
                        type: 'topic',
                        valid: false
                    }
                };
                if ($scope.isNewMqttCustomGui) {
                    $.extend(true, _objColi, {
                        Val: {
                            radioChecked: 0
                        },
                        CtS: {
                            radioChecked: 0
                        }
                    })
                    $.extend(true, _objRegister, {
                        Val: {
                            radioChecked: 0
                        },
                        CtS: {
                            radioChecked: 0
                        }
                    })
                }
                _mqttCustomCoil.push(_objColi);
                _mqttCustomRegister.push(_objRegister);
            }
            $scope.mqttCustomCom['COM' + (i+1)] = {};
            $scope.mqttCustomCom['COM' + (i+1)].mqttCustomCoil = _mqttCustomCoil;
            $scope.mqttCustomCom['COM' + (i+1)].mqttCustomRegister = _mqttCustomRegister;

            if ($scope.isNewMqttCustomGui) {
                $scope.mqttCustomPublishCoilAll.push("0");
                $scope.mqttCustomPublishRegisterAll.push("0");
                $scope.mqttCustomSubscribeCoilAll.push("0");
                $scope.mqttCustomSubscribeRegisterAll.push("0");
            }
        }

        $scope.$digest();
    }

    $scope.getMqttFile = function () {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: URL_MQTT_FILE,
            params: { 'foo': new Date().getTime() },
            transformResponse: function(data, headersGetter) {
                return data;
            }
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            $scope.mqttFileCfg = response.data;
            $scope.setMqttFileData(response.data);
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.setMqttFileData = function (data) {
        var headerMatch = data.match(/^({.*?}}).*?$/); // {"Id":"MQTA","Nm":1,"PE":{"  dis000000c0i03":        32}}{... or {"Id":"MQTA","Nm":0,"PE":""}
        if (headerMatch != null) { // has payload
            var header = JSON.parse(headerMatch[1]);

            // parse payload
            var startIdx = headerMatch[1].length; // header length
            for (var item in header.PE) {
                var payloadName =  item.replace(/\s/g, '');
                var payloadLength = parseInt(header.PE[item], 10);
                var payloadType = payloadName.substring(0, 2);
                var payloadComPort = payloadName.substring(10,11);

                var payloadFile = JSON.parse(data.substring(startIdx, startIdx + payloadLength)); // get single file
                startIdx += payloadLength;

                switch (payloadType) {
                    case 'cm': // common
                    case 'cn': // connection
                        for (var item in payloadFile) {
                            $scope.mqttCustomCommon[item].value = payloadFile[item];
                            $scope.mqttCustomCommon[item].valid = true;
                            $scope.mqttCustomCommon[item].enabled = true;
                            if ($scope.isNewMqttCustomGui) {
                                $scope.mqttCustomCommon[item].radioChecked = 1;
                            }
                        }
                        break;
                    case 'di':
                        for (var i=0; i<$scope.mqttCustomDI.length; i++) {
                            if ($scope.mqttCustomDI[i].Ch == payloadFile.Ch) {
                                for (var item in payloadFile) {
                                    $scope.mqttCustomDI[i][item].value = payloadFile[item];
                                    $scope.mqttCustomDI[i][item].valid = true;
                                    if ($scope.isNewMqttCustomGui) {
                                        if (payloadFile[item] == "") {
                                            $scope.mqttCustomDI[i][item].enabled = false;
                                            $scope.mqttCustomDI[i][item].radioChecked = 2;
                                        } else {
                                            $scope.mqttCustomDI[i][item].enabled = true;
                                            $scope.mqttCustomDI[i][item].radioChecked = 1;
                                        }
                                    } else {
                                        $scope.mqttCustomDI[i][item].enabled = true;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    case 'do':
                        for (var i=0; i<$scope.mqttCustomDO.length; i++) {
                            if ($scope.mqttCustomDO[i].Ch == payloadFile.Ch) {
                                for (var item in payloadFile) {
                                    $scope.mqttCustomDO[i][item].value = payloadFile[item];
                                    $scope.mqttCustomDO[i][item].valid = true;
                                    if ($scope.isNewMqttCustomGui) {
                                        if (payloadFile[item] == "") {
                                            $scope.mqttCustomDO[i][item].enabled = false;
                                            $scope.mqttCustomDO[i][item].radioChecked = 2;
                                        } else {
                                            $scope.mqttCustomDO[i][item].enabled = true;
                                            $scope.mqttCustomDO[i][item].radioChecked = 1;
                                        }
                                    } else {
                                        $scope.mqttCustomDO[i][item].enabled = true;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    case 'ai':
                        for (var i=0; i<$scope.mqttCustomAI.length; i++) {
                            if ($scope.mqttCustomAI[i].Ch == payloadFile.Ch) {
                                for (var item in payloadFile) {
                                    $scope.mqttCustomAI[i][item].value = payloadFile[item];
                                    $scope.mqttCustomAI[i][item].valid = true;
                                    if ($scope.isNewMqttCustomGui) {
                                        if (payloadFile[item] == "") {
                                            $scope.mqttCustomAI[i][item].enabled = false;
                                            $scope.mqttCustomAI[i][item].radioChecked = 2;
                                        } else {
                                            $scope.mqttCustomAI[i][item].enabled = true;
                                            $scope.mqttCustomAI[i][item].radioChecked = 1;
                                        }
                                    } else {
                                        $scope.mqttCustomAI[i][item].enabled = true;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    case 'tp': // temperature
                        break;
                    case 'hu': // himidity
                        break;
                    case 'sl': // stack light
                        break;
                    case 'bt': // modbus coil
                        for (var i=0; i<$scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil.length; i++) {
                            if ($scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i].Ch == payloadFile.Ch) {
                                for (var item in payloadFile) {
                                    $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i][item].value = payloadFile[item];
                                    $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i][item].valid = true;
                                    if ($scope.isNewMqttCustomGui) {
                                        if (payloadFile[item] == "") {
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i][item].enabled = false;
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i][item].radioChecked = 2;
                                        } else {
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i][item].enabled = true;
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i][item].radioChecked = 1;
                                        }
                                    } else {
                                        $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomCoil[i][item].enabled = true;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    case 'wd': // modbus register
                        for (var i=0; i<$scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister.length; i++) {
                            if ($scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i].Ch == payloadFile.Ch) {
                                for (var item in payloadFile) {
                                    $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i][item].value = payloadFile[item];
                                    $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i][item].valid = true;
                                    if ($scope.isNewMqttCustomGui) {
                                        if (payloadFile[item] == "") {
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i][item].enabled = false;
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i][item].radioChecked = 2;
                                        } else {
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i][item].enabled = true;
                                            $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i][item].radioChecked = 1;
                                        }
                                    } else {
                                        $scope.mqttCustomCom['COM' + payloadComPort].mqttCustomRegister[i][item].enabled = true;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    case 'po': // position
                        for (var item in payloadFile) {
                            $scope.mqttCustomPO[item].value = payloadFile[item];
                            $scope.mqttCustomPO[item].valid = true;
                            $scope.mqttCustomPO[item].enabled = true;
                            if ($scope.isNewMqttCustomGui) {
                                $scope.mqttCustomPO[item].radioChecked = 1;
                            }
                        }
                        break;
                }
            }

            $scope.$digest();
        }
    }

    $scope.onMqttCustomSubmit = function () {
        var payloadFile = [];

        // connection, common
        var _objConnect = {};
        var _objCommon = {};
        for (var item in $scope.mqttCustomCommon) {
            if ($scope.mqttCustomCommon[item].enabled && $scope.mqttCustomCommon[item].valid) {
                if (['Cntn', 'Nm', 'Ws'].indexOf(item) > -1) {
                    _objConnect[item] = $scope.mqttCustomCommon[item].value;
                } else {
                    _objCommon[item] = $scope.mqttCustomCommon[item].value;
                }
            }
        }
        if (Object.keys(_objConnect).length > 0) {
            payloadFile.push({
                fileName: '  cns000000c0i00',
                fileObject: angular.copy(_objConnect)
            });
        }
        if (Object.keys(_objCommon).length > 0) {
            payloadFile.push({
                fileName: '  cms000000c0i00',
                fileObject: angular.copy(_objCommon)
            });
        }

        // DI
        var _obj = {};
        for (var i=0; i<$scope.mqttCustomDI.length; i++) {
            if ($scope.mqttCustomDI[i].Val.enabled && $scope.mqttCustomDI[i].Val.valid) {
                _obj.Val = $scope.mqttCustomDI[i].Val.value;
            }
            if ($scope.mqttCustomDI[i].CtS.enabled && $scope.mqttCustomDI[i].CtS.valid) {
                _obj.CtS = $scope.mqttCustomDI[i].CtS.value;
            }
            if ($scope.isNewMqttCustomGui) {
                if ($scope.mqttCustomDI[i].CtS.radioChecked == 2) {
                    _obj.CtS = "";
                }
            }
            if (Object.keys(_obj).length > 0) {
                _obj.Ch = $scope.mqttCustomDI[i].Ch;
                payloadFile.push({
                    fileName: '  dis000000c0i' + ('00' + $scope.mqttCustomDI[i].Ch).slice(-2),
                    fileObject: angular.copy(_obj)
                });
                _obj = {};
            }
        }

        // DO
        var _obj = {};
        for (var i=0; i<$scope.mqttCustomDO.length; i++) {
            if ($scope.mqttCustomDO[i].Val.enabled && $scope.mqttCustomDO[i].Val.valid) {
                _obj.Val = $scope.mqttCustomDO[i].Val.value;
            }
            if ($scope.mqttCustomDO[i].CtS.enabled && $scope.mqttCustomDO[i].CtS.valid) {
                _obj.CtS = $scope.mqttCustomDO[i].CtS.value;
            }
            if ($scope.isNewMqttCustomGui) {
                if ($scope.mqttCustomDO[i].CtS.radioChecked == 2) {
                    _obj.CtS = "";
                }
            }
            if (Object.keys(_obj).length > 0) {
                _obj.Ch = $scope.mqttCustomDO[i].Ch;
                payloadFile.push({
                    fileName: '  dos000000c0i' + ('00' + $scope.mqttCustomDO[i].Ch).slice(-2),
                    fileObject: angular.copy(_obj)
                });
                _obj = {};
            }
        }

        // AI
        var _obj = {};
        for (var i=0; i<$scope.mqttCustomAI.length; i++) {
            if ($scope.mqttCustomAI[i].Val.enabled && $scope.mqttCustomAI[i].Val.valid) {
                _obj.Val = $scope.mqttCustomAI[i].Val.value;
            }
            if ($scope.mqttCustomAI[i].Tag.enabled && $scope.mqttCustomAI[i].Tag.valid) {
                _obj.Tag = $scope.mqttCustomAI[i].Tag.value;
            }
            if ($scope.isNewMqttCustomGui) {
                if ($scope.mqttCustomAI[i].Tag.radioChecked == 2) {
                    _obj.Tag = "";
                }
            }
            if (Object.keys(_obj).length > 0) {
                _obj.Ch = $scope.mqttCustomAI[i].Ch;
                payloadFile.push({
                    fileName: '  ais000000c0i' + ('00' + $scope.mqttCustomAI[i].Ch).slice(-2),
                    fileObject: angular.copy(_obj)
                });
                _obj = {};
            }
        }

        // modbus
        var _obj = {};
        $scope.mqttCustomCom
        for (var item in $scope.mqttCustomCom) {
            var comPort = item.slice(-1);

            // coil
            for (var i=0; i<$scope.mqttCustomCom[item].mqttCustomCoil.length; i++) {
                if ($scope.mqttCustomCom[item].mqttCustomCoil[i].Val.enabled && $scope.mqttCustomCom[item].mqttCustomCoil[i].Val.valid) {
                    _obj.Val = $scope.mqttCustomCom[item].mqttCustomCoil[i].Val.value;
                }
                if ($scope.mqttCustomCom[item].mqttCustomCoil[i].CtS.enabled && $scope.mqttCustomCom[item].mqttCustomCoil[i].CtS.valid) {
                    _obj.CtS = $scope.mqttCustomCom[item].mqttCustomCoil[i].CtS.value;
                }
                if ($scope.isNewMqttCustomGui) {
                    if ($scope.mqttCustomCom[item].mqttCustomCoil[i].CtS.radioChecked == 2) {
                        _obj.CtS = "";
                    }
                }
                if (Object.keys(_obj).length > 0) {
                    _obj.Ch = $scope.mqttCustomCom[item].mqttCustomCoil[i].Ch;
                    payloadFile.push({
                        fileName: '  bts000000c' + comPort + 'i' + ('00' + $scope.mqttCustomCom[item].mqttCustomCoil[i].Ch).slice(-2),
                        fileObject: angular.copy(_obj)
                    });
                    _obj = {};
                }
            }

            // register
            for (var i=0; i<$scope.mqttCustomCom[item].mqttCustomRegister.length; i++) {
                if ($scope.mqttCustomCom[item].mqttCustomRegister[i].Val.enabled && $scope.mqttCustomCom[item].mqttCustomRegister[i].Val.valid) {
                    _obj.Val = $scope.mqttCustomCom[item].mqttCustomRegister[i].Val.value;
                }
                if ($scope.mqttCustomCom[item].mqttCustomRegister[i].CtS.enabled && $scope.mqttCustomCom[item].mqttCustomRegister[i].CtS.valid) {
                    _obj.CtS = $scope.mqttCustomCom[item].mqttCustomRegister[i].CtS.value;
                }
                if ($scope.isNewMqttCustomGui) {
                    if ($scope.mqttCustomCom[item].mqttCustomRegister[i].CtS.radioChecked == 2) {
                        _obj.CtS = "";
                    }
                }
                if (Object.keys(_obj).length > 0) {
                    _obj.Ch = $scope.mqttCustomCom[item].mqttCustomRegister[i].Ch;
                    payloadFile.push({
                        fileName: '  wds000000c' + comPort + 'i' + ('00' + $scope.mqttCustomCom[item].mqttCustomRegister[i].Ch).slice(-2),
                        fileObject: angular.copy(_obj)
                    });
                    _obj = {};
                }
            }
        }

        // position
        var _objPosition = {};
        for (var item in $scope.mqttCustomPO) {
            if ($scope.mqttCustomPO[item].enabled && $scope.mqttCustomPO[item].valid) {
                _objPosition[item] = $scope.mqttCustomPO[item].value;
            }
        }
        if (Object.keys(_objPosition).length > 0) {
            payloadFile.push({
                fileName: '  pos000000c0i00',
                fileObject: angular.copy(_objPosition)
            });
        }

        if (payloadFile.length > 0) {
            if (!Advantech.Utility.isIE() || Advantech.Utility.isIE() > 9){
				fileUpdatePrgressForm.showProgressForm('file');
			}
            var header = {
                Id: 'MQTA',
                Nm: payloadFile.length,
                PE: {}
            };
            var payloadString = '';

            for (var i=0; i<payloadFile.length; i++) {
                var fileString = JSON.stringify(payloadFile[i].fileObject);
                header.PE[payloadFile[i].fileName] = ('          ' + fileString.length).slice(-10);
                payloadString += fileString;
            }
            payloadString = JSON.stringify(header) + payloadString;

            // upload file URL_MQTT_FILE and get new file
            var fileBlob = new Blob([payloadString]);
            var formData = new FormData();
            formData.append('length', fileBlob.size);
            formData.append('type', 17);
            formData.append('file', fileBlob);
            $scope.multiPartTransfer(URL_FILE_TRANSFER, $scope.onFileUpgradeDone, $scope.onFileUpgradeFail, $scope.onFileUpgradeUpdateProgress, formData);

        } else {
            $scope.errorMessage.empty = 'Not have Customized Topics and JSON Keys set!';
        }
    }

    $scope.inputValidate = function (event, data) {
        event.target.style.border = '1px solid #ccc';
        data.valid = false;
        var _inputName = data.name;
        switch (data.type) {
            case 'topic':
                var _value = typeof data.value == 'undefined' ? '' : $scope.replaceReservedWord(data.value);

                if (typeof data.value == 'undefined' || _value.length < 1 || _value.length > 128) {
                    $scope.errorMessage[_inputName] = 'The parameter ' + _inputName + ' out of range 1 ~ 128!';
                    event.target.style.border = '1px solid #FF0000';
                } else if (!$scope.topicPattern().test(_value) || _value.trim() == '') {
                    $scope.errorMessage[_inputName] = 'Invalid Topic format in ' + _inputName + ': ' + _value + ' , the characters + and # are forbidden.';
                    event.target.style.border = '1px solid #FF0000';
                } else {
                    data.valid = true;
                    delete $scope.errorMessage.empty;
                    delete $scope.errorMessage[_inputName];
                }
                break;
            case 'message':
                var _value = typeof data.value == 'undefined' ? '' : $scope.replaceReservedWord(data.value);

                if (typeof data.value == 'undefined' || _value.length < 1 || _value.length > 128) {
                    $scope.errorMessage[_inputName] = 'The parameter ' + _inputName + ' out of range 1 ~ 128!';
                    event.target.style.border = '1px solid #FF0000';
                } else {
                    data.valid = true;
                    delete $scope.errorMessage.empty;
                    delete $scope.errorMessage[_inputName];
                }
                break;
            case 'jsonKey':
                if (typeof data.value == 'undefined' || data.value.length < 1 || data.value.length > 64) {
                    $scope.errorMessage[_inputName] = 'The parameter ' + _inputName + ' out of range 1 ~ 64!';
                    event.target.style.border = '1px solid #FF0000';
                } else {
                    data.valid = true;
                    delete $scope.errorMessage.empty;
                    delete $scope.errorMessage[_inputName];
                }
                break;
        }
    }

    $scope.customEnableClick = function (data) {
        var inpDisabled = false;
        if ($scope.isNewMqttCustomGui) {
            inpDisabled = (data.radioChecked == "0") || (data.radioChecked == "2");
            data.enabled = (data.radioChecked == "1");
        } else {
            data.enabled = !data.enabled;
            inpDisabled = !data.enabled;
        }

        var _inputName = data.name;
        if (inpDisabled) {
            $('#panelMQTT input[name="' + _inputName + '"]')
                .css('border', '1px solid #ccc')
                .val('');
            data.value = '';
            data.valid = false;
            delete $scope.errorMessage[_inputName];
        } else {
            setTimeout(function() {
                $('#panelMQTT input[name="' + _inputName + '"]').focus();
            });
        }
    }

    if ($scope.isNewMqttCustomGui) {
        $scope.mqttCustomRadioSelectAll = function (mode, e, data) {
            if (mode == "publish") {
                for (var i=0; i<data.length; i++) {
                    if (e == "mqttCustomAIStatusPublishKeyAll") {
                        data[i].Tag.radioChecked = $("input[name=" + e + "]:checked").val();
                        $scope.customEnableClick(data[i].Tag);
                    } else {
                        data[i].Val.radioChecked = $("input[name=" + e + "]:checked").val();
                        $scope.customEnableClick(data[i].Val);
                    }
                }
            } else {
                for (var i=0; i<data.length; i++) {
                    data[i].CtS.radioChecked = $("input[name=" + e + "]:checked").val();
                    $scope.customEnableClick(data[i].CtS);
                }
            }
        }
    }

    $scope.changeMqttCustomStatus = function () {
        var requestData = {};
        requestData.CtOv = parseInt($scope.mqttConfig.CtOv, 10);
        requestData.Sel = parseInt($('#CloudConfigPanel #selCloud').val(), 10);

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_MQTT_CONFIG,
            data: requestData
        })
        .then(function(response) {
            getMqttConfig();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.isObjectEmpty = function(object){
        return Object.keys(object).length === 0;
    }

    $scope.multiPartTransfer = function (resURL, onSuccessFunc, onErrorFunc, onPorgressUpdate, formData) {
        try {
            try{
                var ajaxHandler = null;
                var ajaxObj = {};
                ajaxObj.url = resURL;
                ajaxObj.data = formData;
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
                    onAjaxSuccessHandle(ajaxObj, HTTP_POST, onSuccessFunc, stream);
                };
                ajaxObj.error = function(xhr, ajaxOptions, thrownError) {
                    onAjaxErrorHandle(xhr, ajaxOptions, thrownError, onErrorFunc);
                    ajaxHandler.abort();
                };
                ajaxHandler = $.ajax(ajaxObj);
            }
            catch(e){
                onAjaxErrorHandle(xhr, ajaxOptions, thrownError, onErrorFunc);
            }
        }catch (e) {
            if($.isFunction(onErrorFunc)) {
                onErrorFunc.apply(this, [{
                    status: ''
                }, e]);
            }
        }
    }

    $scope.onFileUpgradeUpdateProgress = function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total)*100;
            percentComplete =(percentComplete > 99)?99:percentComplete;
            fileUpdatePrgressForm.updateProgressForm(int(percentComplete));
        }
    }

    $scope.onFileUpgradeDone = function () {
        fileUpdatePrgressForm.updateProgressForm(100);
        setTimeout(function() {
            fileUpdatePrgressForm.hideProgressForm();
            getMqttConfig();
        }, 1000);
    }

    $scope.onFileUpgradeFail = function (xhr, thrownError, file, apiErrorCode, apiErrorMsg) {
        var fileName = "mqtt_file.cfg";
        var returnMsg = "<i class='fa fa-fw fa-exclamation-triangle'></i>The " + fileName + " upload fail. Cause upload has occurred " + thrownError + "<p/>";
        returnMsg += apiErrorCode != undefined && apiErrorCode != "" ? "Reason: " + Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] : "";
        returnMsg += apiErrorMsg!=undefined && apiErrorMsg!=""? "<p/>(Detail: " + apiErrorMsg + " error, Error number:" +apiErrorCode+")" : "";
        Advantech.Form.MessageForm.getInstance().showMessageBox("Error code:" + xhr.status, returnMsg);
        fileUpdatePrgressForm.hideProgressForm();
    }

    $scope.replaceReservedWord = function (value) {
        if (typeof value != 'undefined') {
            return value.replace(/#MAC#|#IP#|#Id#|#Nm#|#UID#/g, function(replacement) {
                return $scope.reservedWord[replacement];
            });
        } else {
            return '';
        }
    }

    $('#panelMQTT #mqttAdvancedTab a').one('show.bs.tab', function() {
        getMqttConfig();
        getInitialInfo();
    });
}])
.directive('toggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.toggle == 'tooltip' && element.hasClass('mqttCustomTooltip')) {
                $(element).tooltip();
            }
        }
    };
});
