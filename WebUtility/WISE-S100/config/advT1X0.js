var MODULE_NORMAL_WORKING_MODE_NUM = "0";
var MODULE_INITIAL_WORKING_MODE_NUM = "1";
var WLAN_INFRASTRUCTURE_OPERATION_MODE_NUM = "0";
var WLAN_AP_OPERATION_MODE_NUM = "2";
var Advantech = Advantech || {};
$.extend(true, Advantech, {
    Profile: {
        Information: {
            Version: WEB_UTILITY_VERSION,
            Vender: "Advantech Corp.",
            Contact: "www.advantech.com",
            Product: WEB_UTILITY_PRODUCT,
            Date: WEB_UTILITY_DATE
        },
        AdvancedEmun: {
            ADAMT1X0Series: {
                getAdvancedFunctionProfile: function() {
                    var advancedFunctions = [];
                    advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("dataLog", "data_log.html", "Data Logger"));
                    advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("diagnostic", "diagnostic.html", "Diagnostician"));
                    return advancedFunctions;
                }
            }
        },
        IoWorkingModeEmun: {
            "0": "Performance Mode",
            "1": "Low Power Mode"
        },
        IoBoardWorkingModeValue: {
            "PERFORMANCE_MODE": 0,
            "LOW_POWER_MODE": 1
        },
        WlanOperationModeEmun: {
            "0": "Infrastructure Mode",
            "1": "Reserved",
            "2": "AP Mode"
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
            "2150": "AI zero calibration processed unsuccessfully.",
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
            "4100": "Connection error between device and cloud server"
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
                    var powerArrayLen = 2;
                    //var mskArray;
                    //var mskArrayLen = 16;
                    var statusString = "";
                    var powerType = "";
                    var batteryLevel = 0;

                    powerArray = Advantech.Utility.convertMaskToArray(jsonObj.Pw, powerArrayLen);

                    if(powerArray[0] === 1){ //line power
                        powerType = "Line Power";
                    }
                    _$Panel.find("#inpLB").val(BATTERY_STATUS[jsonObj.LB]);
                    if(powerArray[1] === 1){ //battery power
                        if(powerType !== "")
                            powerType += ", Battery";
                        else
                            powerType = "Battery";

                        if(typeof jsonObj.BVer !== 'undefined'){
                            batteryLevel = parseFloat(jsonObj.BVer/1000).toFixed(3)  + " V";
                        }else{
                            batteryLevel = jsonObj.Val + " %";
                        }
                        _$Panel.find("#inpVal").val(batteryLevel);
                        if(jsonObj.Tm){
                            _$Panel.find("#inpTm").val(jsonObj.Tm + " sec ago");
                        }
                        /*
                        _$Panel.find("#inpVal").val(jsonObj.Val + " %");
                        _$Panel.find("#inpAmt").val(jsonObj.Tm);
                        _$Panel.find("#inpTst").val((jsonObj.TSt)/100 + " °C");
                        mskArray = Advantech.Utility.convertMaskToArray(jsonObj.Stat, mskArrayLen);
                        for(var i=0; i<mskArrayLen; i++){
                            if(mskArray[i]!=0 && Advantech.Profile.LoRaBatteryStatusEnum[i] != ""){
                                statusString += Advantech.Profile.LoRaBatteryStatusEnum[i] + ",";
                            }
                        }
                        if(statusString != ""){
                            statusString = statusString.substring(0, statusString.length-1)
                            _$Panel.find("#inpStat").val("Battery: " + statusString);
                            _$Panel.find("#inpStat").attr('title', statusString);
                        }
                        _$Panel.find("#batteryInfo1").show();
                        _$Panel.find("#batteryInfo2").show();
                        _$Panel.find("#batteryInfo3").show(); */
                        statusString = Advantech.Profile.BatteryStatusEnum[jsonObj.BR];
                        _$Panel.find("#inpBR").val(statusString);
                    }else{
                        _$Panel.find("#batteryInfo1").hide();
                        _$Panel.find("#batteryInfo2").hide();
                        _$Panel.find("#batteryInfo3").hide();
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
            WLanConfigPanel: function(panelId) {
                var _onWLanConfigSubmitted = null;
                var mContextPanelId = panelId;
                var _Self = this;
                var _$Panel;
                this.getPanelId = function() {
                    return mContextPanelId;
                };
                this.onWLanConfigSubmitted = function(x) {
                    if (!arguments.length) return this._onWLanConfigSubmitted;
                    this._onWLanConfigSubmitted = x;
                };
                this.initialPanel = function() {
                    _$Panel = $("#" + _Self.getPanelId());
                    handleMdSelect();
                    handleAPSecTpyeSelect();
                    handleISecTpyeSelect();
                    handleCountryCodeSelect();
                    handleSubmitted();
                };
                this.setPanel = function(jsonObj) {
                    _$Panel.find("#selMd").val(jsonObj.Md).trigger('change');
                    _$Panel.find("#inpISSID").val(jsonObj.ISSID);
                    _$Panel.find("#selISec").val(jsonObj.ISec).trigger('change');
                    _$Panel.find("#inpIKey").val(jsonObj.IKey);
                    _$Panel.find("#inpISSID2").val(jsonObj.ISSID2);
                    _$Panel.find("#selISec2").val(jsonObj.ISec2).trigger('change');
                    _$Panel.find("#inpIKey2").val(jsonObj.IKey2);
                    _$Panel.find("#inpASSID").val(jsonObj.ASSID);
                    _$Panel.find("#inpAHid").prop('checked', Boolean(Number(jsonObj.AHid)));
                    _$Panel.find("#selACnty").val(jsonObj.ACnty).trigger('change');
                    _$Panel.find("#inpACh").val(jsonObj.ACh);
                    _$Panel.find("#selASec").val(jsonObj.ASec).trigger('change');
                    _$Panel.find("#inpAKey").val(jsonObj.AKey);
                    //ifra-struct mode ip
                    _$Panel.find("#inpIP").val(jsonObj.IP);
                    _$Panel.find("#inpMsk").val(jsonObj.Msk);
                    _$Panel.find("#inpGW").val(jsonObj.GW);
                    //AP mode ip
                    _$Panel.find("#inpAIP").val(jsonObj.AIP);
                    _$Panel.find("#inpAMsk").val(jsonObj.AMsk);
                    _$Panel.find("#inpAGW").val(jsonObj.AGW);

                    _$Panel.find("#inpMAC").val(jsonObj.MAC);
                    if (jsonObj.DHCP == 1) {
                        _$Panel.find("#inpIpDHCP").prop('checked', true).trigger('click');
                        _$Panel.find("#RadioIpDHCP").prop('checked', true).trigger('click');
                    } else {
                        _$Panel.find("#inpIpStatic").prop('checked', true).trigger('click');
                        _$Panel.find("#RadioIpStatic").prop('checked', true).trigger('click');
                    }
                };
                var handleSubmitted = function() {
                    var $btn = $("#" + _Self.getPanelId() + " #btnWLanConfig");
                    $btn.click(function() {
                        if ($.isFunction(_Self.onWLanConfigSubmitted())) {
                            _Self.onWLanConfigSubmitted().apply(this, [this, _Self.toJson()]);
                        }
                    });
                };
                var handleMdSelect = function() {
                    var $selMd = $("#" + _Self.getPanelId() + " #selMd");
                    $selMd.change(function() {
                        var val = $(this).val();
                        var $currentOption = $(this).find("option[value='" + val + "']");
                        $(this).find("option").each(function() {
                            var target = $(this).attr('data-target');
                            if (target != undefined) {
                                var elements = target.split(" ");
                                for (ele in elements) {
                                    $(elements[ele]).hide();
                                }
                            }
                        });
                        var target = $currentOption.attr('data-target');
                        if (target != undefined) {
                            var elements = target.split(" ");
                            for (ele in elements) {
                                $(elements[ele]).show();
                            }
                        }
                    });
                }
                var handleAPSecTpyeSelect = function() {
                    var $selASec = $("#" + _Self.getPanelId() + " #selASec");
                    $selASec.change(function() {
                        var val = $(this).val();
                        var $currentOption = $(this).find("option[value='" + val + "']");
                        if (Boolean(Number($currentOption.attr('data-isShow')))) {
                            _$Panel.find($currentOption.attr('data-target')).show();
                        } else {
                            _$Panel.find($currentOption.attr('data-target')).hide();
                        }
                    });
                };
                var handleISecTpyeSelect = function() {
                    for (var i = 0; i < 2; i++) {
                        var name = "#selISec";
                        if (i == 1)
                            name = "#selISec2";
                        var $selISec = $("#" + _Self.getPanelId() + " " + name);
                        $selISec.change(function() {
                            var val = $(this).val();
                            var $currentOption = $(this).find("option[value='" + val + "']");
                            if (Boolean(Number($currentOption.attr('data-isShow')))) {
                                _$Panel.find($currentOption.attr('data-target')).show();
                            } else {
                                _$Panel.find($currentOption.attr('data-target')).hide();
                            }
                        });
                    }
                };
                var handleCountryCodeSelect = function() {
                    var $selACnty = $("#" + _Self.getPanelId() + " #selACnty");
                    $selACnty.change(function() {
                        var val = $(this).val();
                        var $currentOption = $(this).find("option[value='" + val + "']");
                        _$Panel.find($currentOption.attr('data-target')).attr("max", $currentOption.attr('data-max'));
                        if (Number(_$Panel.find($currentOption.attr('data-target')).val()) > Number($currentOption.attr('data-max'))) {
                            _$Panel.find($currentOption.attr('data-target')).val($currentOption.attr('data-max'));
                        }
                    });
                };
                this.toJson = function(isShowHidden) {
                    var obj = {},
                        isAddHidden = (isShowHidden) ? true : false;
                    $("#" + _Self.getPanelId() + " input").each(function() {
                        if (!$(this).is(":disabled") && ($(this).css("display") != 'none') && $(this).is(":visible") || isAddHidden) {
                            var type = this.type;
                            var id = this.id.slice(3);
                            if (type === "checkbox") {
                                obj[id] = (this.checked) ? 1 : 0;
                            } else if (type === "radio") {
                                if (this.checked) //skip other unchecked radio
                                    obj['DHCP'] = Number($(this).val());
                            } else if (type === "number" || $(this).hasClass("isNumericType")) {
                                obj[id] = Number($(this).val());

                            } else {
                                obj[id] = $(this).val();
                            }
                        }
                    });
                    $("#" + _Self.getPanelId() + " select").each(function() {
                        if (!$(this).is(":disabled") && ($(this).css("display") != 'none') && $(this).is(":visible") || isAddHidden) {
                            var id = this.id.slice(3);
                            obj[id] = Number($(this).val());
                        }
                    });
                    return obj;
                };
            },
            NetworkPanel: function(panelId, isViewOnly) {
                var _onNetworkConfigSubmitted = null;
                var mContextPanelId = panelId;
                var mIsViewOnly = isViewOnly;
                var _Self = this;

                this.getPanelId = function() {
                    return mContextPanelId;
                };

                this.isViewOnly = function() {
                    return mIsViewOnly;
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

                this.setNetworkConfig = function(jsonObj, settingList) {
                    try {
                        $("#" + _Self.getPanelId() + " #inpMd").val(Advantech.Profile.LoRaModeEmun[jsonObj.Md]);
                        $("#" + _Self.getPanelId() + " #inpDev").val(Advantech.Profile.LoRaDeviceClassEmun[jsonObj.Dev]);
                        $("#" + _Self.getPanelId() + " #inpSel").val(Advantech.Profile.LoRaDeviceActivationModeEmun[jsonObj.Sel]);
                        $("#" + _Self.getPanelId() + " #inpRT").val(settingList[jsonObj.RT]);
                        $("#" + _Self.getPanelId() + " #inpAddr").val(jsonObj.Addr);
                    } catch (e) {
                        throw new Error("Setting LoRa Information panel failed.");
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
                this.hide = function() {
                    $('#' + _Self.getPanelId()).hide();
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
                        $("#" + _Self.getPanelId() + " button").click(function(e) {
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
                        });
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

                this.getContainerId = function() {
                    return mContainerId;
                };

                //this.initialForm = function(profileObj, advancedFunctions, userTypeObj) {
                this.initialForm = function(advancedFunctions, userTypeObj) {
                    //var slotInfos = profileObjToSlotInfo(profileObj);
                    initialSoltInforamtionListView();
                    initialAdvancedFunctionListView(advancedFunctions);
                    var isCollapse = true;
                    var title = "<i class='fa fa-user'></i>";
                    title += (userTypeObj.Acnt == undefined) ? " User " : (" " + Advantech.Profile.AccountTypeEmun[userTypeObj.Acnt] + " ");
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

                var initialSoltInforamtionListView = function() {
                    var htmlCode = '';
                    htmlCode += "<a href ='" + ABSOLUTE_PATH + "/io_status.html' id ='ioStatus0' class ='ajax-link'>";
                    htmlCode += "<i class='fa fa-fw fa-bar-chart-o'></i> I/O Status";
                    htmlCode += "</a>";
                    $("#" + _Self.getContainerId() + " #soltInfoListViewItem").append(htmlCode);
                };
/*
                var addSlotInfoListItem = function(slotIndex, deviceName) {
                    var htmlCode = '';
                    htmlCode += "<li>";
                    htmlCode += "<a id ='ioStatus_" + slotIndex + "' href='" + ABSOLUTE_PATH + "/io_status.html' class='ajax-link'>(Solt " + slotIndex + ")" + deviceName + "</a>";
                    htmlCode += "</li>";
                    return htmlCode;
                };
*/
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
                var mWorkingMode = 0; //private: working mode of module
                var mIoWorkingMode = 0; //private: working mode of io board
				var mRfMode = 0; //private: working mode of RF
                var setMode = function(mode) {
                    mWorkingMode = mode;
                };
                var getMode = function() {
                    return mWorkingMode;
                };
                var setIoMode = function(mode) {
                    mIoWorkingMode = mode;
                };
                var getIoMode = function() {
                    return mIoWorkingMode;
                };
				var setRfMode = function(mode) {
                    mRfMode = mode;
                };
                var getRfMode = function() {
                    return mRfMode;
                };
                return {
                    setMode: setMode,
                    getMode: getMode,
                    setIoMode: setIoMode,
                    getIoMode: getIoMode,
					setRfMode: setRfMode,
					getRfMode: getRfMode
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
    }
});

module.exports = {
    Advantech: Advantech,
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Angular WISE App
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var wiseApp = angular.module('wiseApp', []);
wiseApp.config(['$httpProvider',
    function($httpProvider) {
        //for http PATCH request
        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/json;charset=utf-8'
        };
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
        Advantech.Utility.serverErrorPage("Connection Failed", "Polling failed more than 5 times.<br>Please check USB connection or related errors!");
    }
}

wiseApp.controller('SensorCtrl', ['$scope', '$http', '$element', 'filteredListService', '$window', '$filter', '$timeout', '$compile',
    function($scope, $http, $element, filteredListService, $filter, $timeout, $compile) {
    $scope.activeTab = 'status'; //default active tab
    $scope.statusActiveTab = 'status_current'; //default active tab
    //for sensor value
    var defaultRngList = Advantech.Profile.SensorRangeEmun;
    var vibrationFeatureArry = Advantech.Profile.VibrationFeatureArr;
    var sensorChannelDescriptionArry = Advantech.Profile.VibrationSensorChannelDescArr;
    //$scope.TemperatureList = Advantech.Profile.TemperatureRangeEmun;
    //$scope.HumidityList = Advantech.Profile.HumidityRangeEmun;
    $scope.CurrentList = Advantech.Profile.TemperatureRangeEmun;
    $scope.CurrentOffsetList = Advantech.Profile.TemperatureRangeEmun;
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
                            UnitName: "",
                            OffsetUnitName: "",
                            RCD: 0
                        };
    var sensorConfigs = {};
    //for sensor config
    sensorConfigs = {};
    $scope.IsTemperature = true;
    //global
    var channelAmount = 0;
    $scope.selectedChannel = {"ch": 0};
    var httpInProgress = false;
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var pollingRate = 5000;//larger interval for Sub-1G
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    var slotId = recordObj.getSlotId();
    var WriteStatus = 1;
    //////////////////Tab Switch/////////////////////
    $scope.switchTabTo = function(tabId) {
        if($scope.activeTab == tabId)
            return;
        $scope.activeTab = tabId;
        gobalTimer.ClearTimer();
        if (tabId == "status") {
            loadSensorValue();
        }else if (tabId == "config") {
            loadSensorConfig();
        }/*else if (tabId == "trend") {
            loadDiagnosticData(false);
            gobalTimer.EnableTimer(function(){loadDiagnosticData(true)}, pollingRate);//create timer
        }*/
    };
    $scope.switchStatusTab = function(tabId) {
        if($scope.statusActiveTab == tabId)
            return;
        $scope.statusActiveTab = tabId;
        assignChannelValue();
    };

    $scope.isTabShow = function(tabId) {
        if (tabId == $scope.activeTab)
            return true;
        else
            return false;
    };
    $scope.isStatusTabShow = function(tabId) {
        if (tabId == $scope.statusActiveTab)
            return true;
        else
            return false;
    };

    $scope.isTemperatureSensor = function(rangeId) {
        if(Advantech.Profile.TemperatureSensorRangeEmun[rangeId])
            return true;
        else
            return false;
    };
    /////////////////////////////////////////////////

    $scope.showVibrationValue = function(index){
        if(Array.isArray($scope.channelObj.EgF)){
            //return $scope.channelObj.EgF[index].toString();
            return $scope.channelObj.EgF[index].toFixed(2);
        }else{
            return "-";
        }
    };

    function assignChannelValue(){
        var i;
        var tabId = $scope.statusActiveTab;
        if(tabId === "status_current") {
            if(Array.isArray($scope.channelObj.EgF)){
                $scope.channelObj.value = $scope.channelObj.EgF;
            }
            for(i=0; i < channelAmount; i++){
                if(Array.isArray($scope.sensorValues[i].EgF)){
                    //$scope.channelObj.value = $scope.sensorValues[i].EgF.toString();
                    sensorConfigs[i].value = $scope.sensorValues[i].EgF.toString();
                }else{
                    //$scope.channelObj.value = $scope.sensorValues[i].EgF;
                    sensorConfigs[i].value = $scope.sensorValues[i].EgF;
                }
            }
        }/* else if (tabId === "status_max") {
            $scope.channelObj.value = $scope.channelObj.HEgF;
            for(i=0; i < channelAmount; i++)
                sensorConfigs[i].value = $scope.sensorValues[i].HEgF;
        }else if (tabId === "status_min") {
            $scope.channelObj.value = $scope.channelObj.LEgF;
            for(i=0; i< channelAmount; i++)
                sensorConfigs[i].value = $scope.sensorValues[i].LEgF;
        } */
    }

    function convertVibrationFeatureMaskToArray(mask){
        var i;
        var destArr = [];
        var arr = Advantech.Utility.convertMaskToArray(mask, Advantech.Profile.VibrationFeatureArr.length);
        for(i=0; i < arr.length; i++){
            destArr.push({val: arr[i]});
        }
        return destArr;
    }

    function convertVibrationFeatureArrayToMask(hashArr){
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

    function loadSensorProfile() {
        $http({
            method: 'GET',
            url: URL_PROFILE + '/slot_' + slotId,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            channelAmount = response.data.Sn;
            //$scope.rangeSelectList = new Array(channelAmount);
            for(var i=0; i < channelAmount; i++)
                $scope.channelSelectList[i] = i;

            if($scope.activeTab === "status") {
                loadSensorValue();
            }else if($scope.activeTab === "config") {
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
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            sensorConfigs = response.data.SCfg;
            $scope.channelObj = sensorConfigs[$scope.selectedChannel.ch];
            if(! $scope.isTemperatureSensor($scope.channelObj.Rng)){ //vibration
                $scope.channelObj.FeatureArry = convertVibrationFeatureMaskToArray($scope.channelObj.SLgD);
            }
            if(Advantech.Profile.TemperatureRangeEmun[$scope.channelObj.Rng])
                $scope.CurrentList = Advantech.Profile.TemperatureRangeEmun;
            else if(Advantech.Profile.HumidityRangeEmun[$scope.channelObj.Rng])
                $scope.CurrentList = Advantech.Profile.HumidityRangeEmun;
            else
                $scope.CurrentList = Advantech.Profile.VibrationRangeEmun;

            for(var i=0; i < channelAmount; i++){
                var range = sensorConfigs[i].Rng;
                //var offsetrange = sensorConfigs[i].RCD;
                //sensorConfigs[i].OffsetUnitName = defaultRngList[offsetrange].unit;
                sensorConfigs[i].OffsetUnitName = "°C";
                sensorConfigs[i].RangeName = defaultRngList[range].name;
                sensorConfigs[i].UnitName = defaultRngList[range].unit;
                //sensorConfigs[i].UnitName = $scope.rangeSelectList[range].unit;
                sensorConfigs[i].EventName = Advantech.Profile.SensorChannelEventEmun[sensorConfigs[i].Evt];
            }
            //$scope.SetCurrentRangeList($scope.channelObj.Rng);
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
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.sensorValues = response.data.SVal;
            $scope.channelObj = $scope.sensorValues[$scope.selectedChannel.ch];
            sensorConfigs = $scope.sensorValues;
            for(var i=0; i< channelAmount; i++){
                var range = sensorConfigs[i].Rng;
				sensorConfigs[i].RangeId = range;
                sensorConfigs[i].RangeName = defaultRngList[range].name;
                sensorConfigs[i].UnitName = defaultRngList[range].unit;
                sensorConfigs[i].Desc = sensorChannelDescriptionArry[i];
                sensorConfigs[i].EnableStatus = sensorConfigs[i].En === 1 ? "Enable": "Disable";
                //sensorConfigs[i].RangeName = $scope.rangeSelectList[range].name;
                sensorConfigs[i].EventName = Advantech.Profile.SensorChannelEventEmun[sensorConfigs[i].Evt];
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

    function CheckWriteStatus(callback){
        gobalTimer.ClearTimer();
        $http({
            method: 'GET',
            url: URL_LPWAN_WRITESTATUS
        })
        .then(function(response){
            WriteStatus = response.data.Stat;
            if(response.data.Stat == 1){
                if(callback != null){
                    gobalTimer.EnableTimer(function(){CheckWriteStatus(function(){
                        callback();
                    })},pollingRate);
                }else{
                    gobalTimer.EnableTimer(function(){CheckWriteStatus(null)},pollingRate);
                }
                return;
            }else if(response.data.Stat != 1){
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                if(response.data.Stat == 2){
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Write Fail", "<i class='fa fa-fw fa-exclamation-triangle'></i>Write To End Device Fail", null);
                }
                if(callback != null){
                    callback();
                }
                //return;
            }
        });
    }

    /////Event Handler////////////////////////////////////////////
    $scope.onValueChannelChange = function(selectedChannel){
        $scope.channelObj = $scope.sensorValues[selectedChannel];
        assignChannelValue();
    };
    $scope.onTableRowClick = function(selectedChannel){
        $scope.selectedChannel.ch = selectedChannel;
        $scope.channelObj = $scope.sensorValues[selectedChannel];
        assignChannelValue();
    };

    $scope.onClearLowAlarmClick = function(){
        var requestURL;
        var requestData;

        requestURL = URL_SENSOR_VALUE + '/slot_' + slotId + "/ch_" + $scope.selectedChannel.ch;
        requestData = {LoA: 0};
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'PATCH',
            url: requestURL,
            data: requestData
        })
        .then(function(response) {
            //check write status when AP at Paring mode
            if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                CheckWriteStatus(null);
            else
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            //Advantech.Utility.ErrorCounter.getInstance().resetCount();
            angularShowHttpErrorMessage(error);
        });
    };

    $scope.onClearHighAlarmClick = function(){
        if($scope.channelObj.HiA == 0)
            return;
        var requestURL;
        var requestData;
        requestURL = URL_SENSOR_VALUE + '/slot_' + slotId + "/ch_" + $scope.selectedChannel.ch;
        requestData = {HiA: 0};
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'PATCH',
            url: requestURL,
            data: requestData
        })
        .then(function(response) {
            //check write status when AP at Paring mode
            if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                CheckWriteStatus(null);
            else
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            //Advantech.Utility.ErrorCounter.getInstance().resetCount();
            angularShowHttpErrorMessage(error);
        });
    };

    $scope.onSendValuePacketClick = function(){
        requestURL = URL_GENERAL_CONFIG;
        requestData = {};
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'PATCH',
            url: requestURL,
            data: requestData
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    };

    $scope.onResetValueClick = function(){
        if(httpInProgress)
            return;
        else
            httpInProgress = true;

        var requestURL;
        var requestData;
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        requestURL = URL_SENSOR_VALUE + '/slot_' + slotId + "/ch_" + $scope.selectedChannel.ch;

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
            //check write status when AP at Paring mode
            if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                CheckWriteStatus(null);
            else
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            httpInProgress = false;
            angularShowHttpErrorMessage(error);
        });
    };

    $scope.onConfigChannelChange = function(selectedChannel){
        $scope.channelObj = sensorConfigs[selectedChannel];
/*         if(Number($scope.channelObj.Rng) == 4128)
            $scope.CurrentList = Advantech.Profile.HumidityRangeEmun;
        else
            $scope.CurrentList = Advantech.Profile.TemperatureRangeEmun; */
        if(Advantech.Profile.TemperatureRangeEmun[$scope.channelObj.Rng])
            $scope.CurrentList = Advantech.Profile.TemperatureRangeEmun;
        else if(Advantech.Profile.HumidityRangeEmun[$scope.channelObj.Rng])
            $scope.CurrentList = Advantech.Profile.HumidityRangeEmun;
        else
            $scope.CurrentList = Advantech.Profile.VibrationRangeEmun;
        $scope.channelObj.Rng = $scope.channelObj.Rng + "";
        if(! $scope.isTemperatureSensor($scope.channelObj.Rng)){ //Vibration
            $scope.channelObj.FeatureArry = convertVibrationFeatureMaskToArray($scope.channelObj.SLgD);
        }
    };

    $scope.onRangeChange = function(Range){
        $scope.channelObj.UnitName = defaultRngList[Range].unit;
    };

    $scope.onOffsetRangeChange = function(Range){
        $scope.channelObj.OffsetUnitName = defaultRngList[Range].unit;
    };

    $scope.onSensorConfigClick = function(){
        var requestData = {};
        requestData.Ch  = Number($scope.channelObj.Ch);
        requestData.En  = Number($scope.channelObj.En);
        requestData.EnHA = Number($scope.channelObj.EnHA);
        //check value
        if($scope.channelObj.EnHA === 1 &&
            ($scope.channelObj.HiA === "" || isNaN($scope.channelObj.HiA) || $scope.channelObj.HiA > 100000 || $scope.channelObj.HiA < -100000)){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>High Alarm Value must between -99999.999 ~ 99999.999", null);
            return;
        }
        if($scope.isTemperatureSensor($scope.channelObj.Rng)){ //temperature
            if($scope.channelObj.ReA === "" || isNaN($scope.channelObj.ReA) || $scope.channelObj.ReA < -100000 || $scope.channelObj.ReA > 100000){
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Release Alarm Value must between -99999.999 ~ 99999.999", null);
                return;
            }
            if($scope.channelObj.Val === "" || isNaN($scope.channelObj.Val) || $scope.channelObj.Val > 1000 || $scope.channelObj.Val < -1000){
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Sensor Offset Value must between -1000 ~ 1000", null);
                return;
            }

            requestData.ReA = Number($scope.channelObj.ReA);
            requestData.Val = Number($scope.channelObj.Val);
        }else{ //vibration sensor
            requestData.SLgD = convertVibrationFeatureArrayToMask($scope.channelObj.FeatureArry);
        }

        if(requestData.EnHA){
            requestData.HiA  = $scope.channelObj.HiA;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'PATCH',
            url: URL_SENSOR_CONFIG + '/slot_' + slotId + "/ch_" + $scope.selectedChannel.ch,
            data: requestData
        })
        .then(function(response) {
            loadSensorConfig();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            httpInProgress = false;
            angularShowHttpErrorMessage(error);
        });
    };

    $scope.getVibrationFeatureName = function(idx){
        return vibrationFeatureArry[idx];
    };

    loadSensorProfile();
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
        $scope.ruleDisableEdit = [];
        var currentEditRuleIdx = 0;
        var currentEditRuleField = "";
        //var MAX_RULE_NUMBER = 8;
        //var MAX_CHANNEL_NUMBER = 32;
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
        var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
        var slotId = recordObj.getSlotId();
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
            $scope.ruleDisableEdit.push(false);
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
                url: URL_SERIAL_PORT_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
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
                url: URL_MODBUS_SLAVE_GEN_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
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
                url: URL_MODBUS_SLAVE_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
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
                url: URL_EXPANSION_BIT + '/slot_' + slotId + '/com_' + comNumber,
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
                /* if(isInitial)
                    $scope.sortAndShow(null, true);
                else
                    $scope.sortAndShow(); */
                $scope.$digest();

                //if(isInitial && !$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_bit')
                if(!$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_bit')
                    gobalTimer.EnableTimer(function(){loadStatusBit()}, pollingRate);//create timer
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
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
                url: URL_EXPANSION_WORD + '/slot_' + slotId + '/com_' + comNumber,
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

                //if(isInitial && !$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_word')
                if(!$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_word')
                    gobalTimer.EnableTimer(function(){loadStatusWord()}, pollingRate);//create timer
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
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
                url: URL_MODBUS_SLAVE_STATUS + '/slot_' + slotId + '/com_' + comNumber,
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
                    requestURL = URL_EXPANSION_BIT + '/slot_' + slotId + '/com_' + comNumber + "/ch_" + channel;
                }else{
                    requestURL = URL_EXPANSION_WORD + '/slot_' + slotId + '/com_' + comNumber + "/ch_" + channel;
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
        function CheckWriteStatus(callback){
            gobalTimer.ClearTimer();
            $http({
                method: 'GET',
                url: URL_LPWAN_WRITESTATUS
            })
            .then(function(response){
                WriteStatus = response.data.Stat;
                if(response.data.Stat == 1){
                    if(callback != null){
                        gobalTimer.EnableTimer(function(){CheckWriteStatus(function(){
                            callback();
                        })},pollingRate);
                    }else{
                        gobalTimer.EnableTimer(function(){CheckWriteStatus(null)},pollingRate);
                    }
                }else{
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    if(response.data.Stat == 2){
                        Advantech.Form.MessageForm.getInstance().showMessageBox("Write Fail", "<i class='fa fa-fw fa-exclamation-triangle'></i>Write To End Device Fail", null);
                    }
                    if(callback != null){
                        callback();
                    }
                    return;
                }
            });
        }
        /////////////////Buttons
        $scope.btnDiagnosticResetClick = function() {
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'PATCH',
                url: URL_DEVICE_CONTROL,
                data: {"RRS": Number(comNumber) /*1*/}
            })
            .then(function(response) {
                //check write status when AP at Paring mode
                if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                    CheckWriteStatus(null);
                else
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
                url: URL_SERIAL_PORT_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
                data: $scope.comPortSetting
            })
            .then(function(response) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                //check write status when AP at Paring mode
                if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                    CheckWriteStatus(function(){loadComPortSetting();});
                else
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
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
                url: URL_MODBUS_SLAVE_GEN_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
                data: requestData
            })
            .then(function(response) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                //check write status when AP at Paring mode
                if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                    CheckWriteStatus(function(){$scope.btnComSettingClick();});//loadModbusCommonSetting();
                else
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
            requestURL = URL_MODBUS_SLAVE_CONFIG + '/slot_' + slotId + '/com_' + comNumber;

            for(var i=0; i< requestData.length; i++){
                requestData[i].FC = parseInt(requestData[i].FC);
                requestData[i].Prop = parseInt(requestData[i].Prop);
                requestData[i].LgE = parseInt(requestData[i].LgE);
                requestData[i].DevE = parseInt(requestData[i].DevE);
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
                //check write status when AP at Paring mode
                if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                    CheckWriteStatus(function(){loadModbusRuleSetting();});
                else
					loadModbusRuleSetting();
					//Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
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
                requestURL = URL_EXPANSION_BIT + '/slot_' + slotId + '/com_' + comNumber + "/ch_" + channel;
            }else{
                requestURL = URL_EXPANSION_WORD + '/slot_' + slotId + '/com_' + comNumber + "/ch_" + channel;
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
                //check write status when AP at Paring mode
                if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                    CheckWriteStatus(function(){queryExpansionDataWriteResult(requestType, channel);});
                else
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
            if(isNaN(ruleObj['Addr']) || ruleObj['Addr'] < 1/*<= 0*/ || ruleObj['Addr'] > 9999){
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
}]);

wiseApp.controller('RFConfigCtrl', ['$scope', '$http', '$q', '$element', 'filteredListService', '$filter', '$timeout', '$compile',
    function($scope, $http, $q, $element, filteredListService, $filter, $timeout, $compile) {
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
    $scope.slotId = recordObj.getSlotId();
    $scope.Locate = false;
    $scope.RFStatus = {};
    $scope.RFConfig = {};
    $scope.activeRFTab = ($scope.slotId != '0')? 'status':'config';
    $scope.rfRegionSelectList = Advantech.Profile.LoRaRfRegionEnum;
    $scope.rfFrequencySelectList = {"0": "Loading"};
    $scope.rfDataRateSelectList = {"0": "Loading"};
    $scope.rfTxPowerSelectList = {"0": "Loading"};
    //Region N
    $scope.rfFreqQuickSelectList = Advantech.Profile.LoRaWanQuickFreqSet;
    $scope.rfRegionUsFreqSet = Advantech.Profile.LoRaRegionUsFreqSet;
    $scope.bFreqRegNQuickSetting = false; //Region N for LoRaWan mode
    $scope.bFreqRegEQuickSetting = false; //Region E for LoRaWan mode
    $scope.bFreqRegJQuickSetting = false; //Region J for LoRaWan mode
    $scope.bFreqRegTQuickSetting = false; //Region T for LoRaWan mode
    $scope.FreqRegNSelect; //Region N for LoRaWan mode
    $scope.FreqRegESel = []; //Region E for LoRaWan mode
    $scope.FreqRegJSel = []; //Region E for LoRaWan mode
    $scope.FreqRegTSel = []; //Region T for LoRaWan mode

    $scope.rfFreqRegNQuickSettingDesc = "";

    $scope.activeConfigTab = 'Control';
    $scope.currentModuel;

    $scope.modbusIdList = [];
    $scope.positionStatus = {};
    $scope.positionConfig = {};

    $scope.activePositionTab = 'status';
    $scope.positionSystemSelectList;

    //Data Update
    $scope.UpdateConfig = {}; //Data Update Interval
    var deviceProfile = {};
    var validUpdateItems = {};
    $scope.diUpdateArr = [];
    $scope.doUpdateArr = [];
    $scope.aiUpdateArr = [];
    $scope.sensorUpdateArr = [];
    $scope.com1UpdateArr = [];
    $scope.com2UpdateArr = [];

    //mode config
    $scope.workingMode;

    //schedule time config
    $scope.weekDayNameArr = Advantech.Profile.WeekDayName;
    $scope.weekDayMask = [];
    //$scope.scheduleStartTime;
    //$scope.scheduleEndTime;
    $scope.scheduleInterval = 0;
    $scope.scheduleMode = 0;
    $scope.isSupportProprietary = Boolean(profile.FCS & Advantech.Profile.FCSMask.Proprietary);

    $scope.rs485Setting = {};
    $scope.rs485SettingClickCount = 0; // hide feature for enable rs485 setting
    $scope.rs485SettingClickTimer;

    $scope.restoreConfig = {
        typeOfRs485IdSetting: 'customize_value',
        changeToModbusMode: 0
    };

    $scope.localeSensitiveComparator = function(v1, v2) {
        if(int(v1) > int(v2))
            return 1;
        else
            return -1;
    }

    function loadRS485Setting(){
        var url = URL_SERIAL_PORT_CONFIG + "/slot_0/com_1";

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.rs485Setting = response.data;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadRFSettingList(){
        var url = URL_LPWAN_SETTING_LIST + "/slot_0";

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            //reset select list to default(one item) to prevent empty selection(value of ng-model not exist in select list)
            $scope.RFConfig.RT = 0;
            $scope.rfDataRateSelectList = {0:"Loading"};
            $scope.$digest();
            //build select list
            $scope.rfFrequencySelectList = response.data.Fq;
            $scope.rfDataRateSelectList = response.data.RT;
            $scope.rfTxPowerSelectList = response.data.Pw;
            $scope.$digest();
            loadRFConfig();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadRFConfig(){
        var url = URL_LPWAN_CONFIG + "/slot_0";

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
			params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.RFConfig = response.data;

            checkOfRfModeChange();

            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }
    function loadRFApUpdateInterval(){
        var url = URL_LPWAN_APP + "/slot_0";

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        //init variables
        $scope.diUpdateArr = [];
        $scope.doUpdateArr = [];
        $scope.aiUpdateArr = [];
        $scope.com1UpdateArr = [];
        $scope.com2UpdateArr = [];
        $scope.sensorUpdateArr = [];

        $http({
            method: 'GET',
            url: url,
			params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            var dataArray = [];
            $scope.UpdateConfig = response.data;
            //set available update items
            //var itemList = Object.keys($scope.UpdateConfig);
            validUpdateItems["PItv"] = true;
            //for(var i=0; i < itemList.length; i++){
                if(deviceProfile.DIn>0){
                    validUpdateItems["DICOS"] = true;
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.DICOS, deviceProfile.DIn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.diUpdateArr.push({"val": dataArray[j] + ''});
                    }
                }
                if(deviceProfile.DOn>0){
                    validUpdateItems["DOCOS"] = true;
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.DOCOS, deviceProfile.DOn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.doUpdateArr.push({"val": dataArray[j] + ''});
                    }
                }
                if(deviceProfile.AIn>0){
                    validUpdateItems["AICOS"] = true;
                    validUpdateItems["AIDR"] = true; //not channel mask
                    validUpdateItems["HiA"] = true;
                    validUpdateItems["LoA"] = true;
                    for(var j = 0; j < deviceProfile.AIn; j++){
                        $scope.aiUpdateArr.push({"AICOS":0, "HiA":0,"LoA":0});
                    }

                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.AICOS, deviceProfile.AIn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.aiUpdateArr[j].AICOS = dataArray[j] + '';
                    }
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.HiA, deviceProfile.AIn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.aiUpdateArr[j].HiA = dataArray[j] + '';
                    }
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.LoA, deviceProfile.AIn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.aiUpdateArr[j].LoA = dataArray[j] + '';
                    }
                }
                if(deviceProfile.Sn>0){
                    validUpdateItems["SCOS"] = true;
                    validUpdateItems["SHiA"] = true;
                    validUpdateItems["SLoA"] = true;
                    for(var j = 0; j < deviceProfile.Sn; j++){
                        $scope.sensorUpdateArr.push({"SCOS":0, "SHiA":0,"SLoA":0});
                    }
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.SCOS, deviceProfile.Sn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.sensorUpdateArr[j].SCOS = dataArray[j] + '';
                    }
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.SHiA, deviceProfile.Sn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.sensorUpdateArr[j].SHiA = dataArray[j] + '';
                    }
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.SLoA, deviceProfile.Sn);
                    for(var j=0; j < dataArray.length; j++){
                        $scope.sensorUpdateArr[j].SLoA = dataArray[j] + '';
                    }
                }
                if(deviceProfile.RT>0){
                    validUpdateItems["COS1"] = true;
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.COS1, 8); //8 rules
                    for(var j=0; j < dataArray.length; j++){
                        $scope.com1UpdateArr.push({"val": dataArray[j] + ''});
                    }
                }
                if(deviceProfile.RT>1){
                    validUpdateItems["COS2"] = true;
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.COS2, 8); //8 rules
                    for(var j=0; j < dataArray.length; j++){
                        $scope.com2UpdateArr.push({"val": dataArray[j] + ''});
                    }
                }
                if(Advantech.Profile.DeviceEmun[module].isSupportPositioning){
                    validUpdateItems["PE"] = true;
                    $scope.UpdateConfig.PE = $scope.UpdateConfig.PE + "";
                }
            //}
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadDeviceProfile() {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: URL_PROFILE + '/slot_' + $scope.slotId,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            deviceProfile = response.data;
            loadRFApUpdateInterval();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadModeConfig() {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: URL_GENERAL_CONFIG,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.workingMode = response.data;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadScheduleConfig() {
        $scope.weekDayMask = [];
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: URL_GENERAL_CONFIG,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.scheduleMode = response.data.Md;
            $scope.scheduleInterval = response.data.Tm;
            var weekDayMaskArr = Advantech.Utility.convertMaskToArray(response.data.Ws, 7);
            for(var i = 0; i < weekDayMaskArr.length; i++){
                $scope.weekDayMask.push({val: weekDayMaskArr[i]});
            }

            var startHour = response.data.Hs[0] ? response.data.Hs[0] : 0;
            var startMinute = response.data.Hs[1] ? response.data.Hs[1] : 0;
            var dateObj = new Date(2019, 1, 1, startHour, startMinute, 0, 0);
            $('#configMainForm #tabSchedule #scheduleStartDateTimePicker').datetimepicker({
                defaultDate:dateObj,
                format: 'HH:mm', //show only hour and minute
                toolbarPlacement: 'bottom'
            });
            var endHour = response.data.He[0] ? response.data.He[0] : 0;
            var endMinute = response.data.He[1] ? response.data.He[1] : 0;
            dateObj = new Date(2019, 1, 1, endHour, endMinute, 0, 0);
            $('#configMainForm #tabSchedule #scheduleEndDateTimePicker').datetimepicker({
                defaultDate:dateObj,
                format: 'HH:mm', //show only hour and minute
                toolbarPlacement: 'bottom'
            });

            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onRfOpModeChange = function(){
        //reset variables
        $scope.bFreqRegNQuickSetting = false;
        $scope.bFreqRegEQuickSetting = false;
        $scope.bFreqRegJQuickSetting = false;
        $scope.bFreqRegTQuickSetting = false;

        //WISE-Link v1 need further query
        if(parseInt($scope.RFConfig.Md) === Advantech.Profile.LoRaRfOperationMode.WISE_LINK_V1){
            var url = URL_LPWAN_SETTING_LIST + "/slot_0" + "/idx_" + $scope.RFConfig.Md;
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: url,
                params: { 'foo': new Date().getTime() }
            })
            .then(function(response) {
                //reset select list to default(one item) to prevent empty selection(value of ng-model not exist in select list)
                $scope.RFConfig.RT = 0;
                $scope.rfDataRateSelectList = {0:"Loading"};
                $scope.$digest();
                //build select list
                $scope.rfDataRateSelectList = response.data.RT;

                $scope.$digest();
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }else if(parseInt($scope.RFConfig.Md) === Advantech.Profile.LoRaRfOperationMode.LORA_WAN){
            checkOfRfModeChange();
        }
    }

    function checkOfRfModeChange(){
        var i, length, mask;
        //LoRaWan mode and Region N only
        if(parseInt($scope.RFConfig.Md) === Advantech.Profile.LoRaRfOperationMode.LORA_WAN && parseInt($scope.RFConfig.Reg) === 78 &&
            typeof $scope.RFConfig.MIs !== "undefined"){
            var count = 0;
            var maskArr;

            $scope.bFreqRegNQuickSetting = true;
            $scope.FreqRegNSelect = {};
            for(var item in $scope.rfRegionUsFreqSet){
                $scope.FreqRegNSelect[count] = [];
                maskArr = Advantech.Utility.convertMaskToArray($scope.RFConfig.Msg[count], 8);
                length = $scope.rfRegionUsFreqSet[count]["Freq"].length;
                for(i = 0; i < length; i++){
                    $scope.FreqRegNSelect[count].push({
                        "sel": maskArr[i],
                        "Freq": $scope.rfRegionUsFreqSet[item].Freq[i],
                        "BW": $scope.rfRegionUsFreqSet[item].BandWidth
                        });
                }
                count++;
            }
            $scope.onRegionNfreqChange();
        }else{
            $scope.bFreqRegNQuickSetting = false;
        }

        //LoRaWan mode and Region E or J or T
        if(parseInt($scope.RFConfig.Md) === Advantech.Profile.LoRaRfOperationMode.LORA_WAN && typeof $scope.RFConfig.MIe !== "undefined" &&
            (parseInt($scope.RFConfig.Reg) === 69 || parseInt($scope.RFConfig.Reg) === 74 || parseInt($scope.RFConfig.Reg) === 84)){
            length = $scope.RFConfig.Fltr.length;
            if(parseInt($scope.RFConfig.Reg) === 69){
                $scope.bFreqRegEQuickSetting = true;
                $scope.bFreqRegJQuickSetting = false;
                $scope.bFreqRegTQuickSetting = false;
                $scope.FreqRegESel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegESel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }else if (parseInt($scope.RFConfig.Reg) === 84){
                $scope.bFreqRegEQuickSetting = false;
                $scope.bFreqRegJQuickSetting = false;
                $scope.bFreqRegTQuickSetting = true;
                $scope.FreqRegTSel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegTSel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }else{
                $scope.bFreqRegEQuickSetting = false;
                $scope.bFreqRegJQuickSetting = true;
                $scope.bFreqRegTQuickSetting = false;
                $scope.FreqRegJSel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegJSel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }
        }else{
            $scope.bFreqRegEQuickSetting = false;
            $scope.bFreqRegJQuickSetting = false;
            $scope.bFreqRegTQuickSetting = false;
        }
    }

    $scope.onClickModeConfig = function(){
        loadModeConfig();
    }

    $scope.onClickRFModuleConfig = function(){
        loadRFSettingList();
    }

    $scope.onClickUpdateInterval = function(){
        //loadRFApUpdateInterval();
        loadDeviceProfile();
    }

    $scope.onClickPositionStatus = function(){
        loadPositionStatus(true);
    }

    $scope.statusEnableDisableDisplay = function(status){
        if (status == 1)
            return "Enable";
        else
            return "Disable";
    }

    $scope.onClickRS485Config = function(){
        loadRS485Setting();
    }

    $scope.isRFTabShow = function(tabId) {
        if (tabId == $scope.activeRFTab)
            return true;
        else
            return false;
    }

     $scope.isConfigShow = function(view){
        if(view == $scope.activeConfigTab)
            return true;
        else
            return false;
    }

    $scope.isLoRaAppEuiShow = function(){
        if(parseInt($scope.RFConfig.Md) === 1)
            return true;
        else if(parseInt($scope.RFConfig.Md) === 2 && parseInt($scope.RFConfig.Sel)===1)
            return true;
        else
            return false;
    }

    $scope.isUpdateItemDisplay = function(item) {
        if(typeof(validUpdateItems[item]) != 'undefined')
            return true;
        else
            return false;
    }

    $scope.onBtnScheduleClick = function(){
        try{
            if(typeof $scope.scheduleInterval === "undefined" || $scope.scheduleInterval < 10 || $scope.scheduleInterval > 86400){
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5>Interval value must be 10~86400</h5>");
                return;
            }

            var requestData = {};
            var url = URL_GENERAL_CONFIG + "/slot_" + $scope.slotId;
            var weekDayMaskArr = [];

            if(parseInt($scope.scheduleMode) === 1){//advanced scheduling mode
                var startTime = $('#configMainForm #tabSchedule #scheduleStartDateTimePicker').find("input").val();
                var endTime = $('#configMainForm #tabSchedule #scheduleEndDateTimePicker').find("input").val();

                var startTimeArr = startTime.split(":").map(function (x) {
                        return parseInt(x, 10);
                    });
                var endTimeArr = endTime.split(":").map(function (x) {
                        return parseInt(x, 10);
                    });
                for(var i = 0; i < $scope.weekDayMask.length; i++){
                    weekDayMaskArr.push(parseInt($scope.weekDayMask[i].val));
                }
                requestData.Ws = Advantech.Utility.convertArrayToMask(weekDayMaskArr);
                requestData.Hs = startTimeArr;
                requestData.He = endTimeArr;
            }
            requestData.Md = parseInt($scope.scheduleMode);
            requestData.Tm = $scope.scheduleInterval;
        }catch(e){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5> Error configuration value</h5>");
            return;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadScheduleConfig();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    };

    $scope.btnWorkingModeClick = function() {
        $("#CommonConfirmModal #confirmModalLabel").text("Change to Modbus/RTU mode");
        $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>The working mode will change from \"Serial Bus Protocol\" to \"Modbus/RTU\". Are you sure keep going?");
        $("#CommonConfirmModal").modal("show");
        $("#CommonConfirmModal #btnCommonConfirm").click(function(){
            var requestData = {};
            var url = URL_GENERAL_CONFIG;// + "/slot_" + $scope.slotId;
            requestData.SLMd = 1;

            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'PATCH',
                url: url,
                data: requestData
            })
            .then(function(response) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                Advantech.Utility.changeModePage();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });

            $("#CommonConfirmModal #btnCommonConfirm").unbind( "click" );
            $("#CommonConfirmModal").modal("hide");
        });
    }

    $scope.onBtnConfigClick = function(){
        var requestData = {};
        var url = URL_LPWAN_CONFIG + "/slot_" + $scope.slotId;
        var i, length;

        if($scope.bFreqRegEQuickSetting){ //region E
            length = $scope.FreqRegESel.length;
            for(i=0; i < length; i++){
                if($scope.FreqRegESel[i].Freq === undefined ||
                    (parseInt($scope.FreqRegESel[i].Freq) !==0 && ($scope.FreqRegESel[i].Freq < 863000 || $scope.FreqRegESel[i].Freq > 870000))){
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5> Frequency must be 863000 ~ 870000 or 0: Disabled</h5>");
                    return;
                }
            }
        }
        if($scope.bFreqRegJQuickSetting){ //region J
            length = $scope.FreqRegJSel.length;
            for(i=0; i < length; i++){
                if($scope.FreqRegJSel[i].Freq === undefined ||
                    (parseInt($scope.FreqRegJSel[i].Freq) !==0 && ($scope.FreqRegJSel[i].Freq < 920000 || $scope.FreqRegJSel[i].Freq > 928000))){
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5> Frequency must be 920000 ~ 928000 or 0: Disabled</h5>");
                    return;
                }
            }
        }
        if($scope.bFreqRegTQuickSetting){ //region T
            length = $scope.FreqRegTSel.length;
            for(i=0; i < length; i++){
                if($scope.FreqRegTSel[i].Freq === undefined ||
                    (parseInt($scope.FreqRegTSel[i].Freq) !==0 && ($scope.FreqRegTSel[i].Freq < 920000 || $scope.FreqRegTSel[i].Freq > 925000))){
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5> Frequency must be 920000 ~ 925000 or 0: Disabled</h5>");
                    return;
                }
            }
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        requestData.Md = parseInt($scope.RFConfig.Md);
        if(requestData.Md === Advantech.Profile.LoRaRfOperationMode.WISE_LINK_V1){
            requestData.Dev = parseInt($scope.RFConfig.Dev);
            requestData.Sel = parseInt($scope.RFConfig.Sel);
            requestData.RT = parseInt($scope.RFConfig.RT);
            requestData.Pw = parseInt($scope.RFConfig.Pw);
            requestData.Fq = parseInt($scope.RFConfig.Fq);
            if(requestData.Sel === 2){//ABP
                requestData.Addr = $scope.RFConfig.Addr;
                requestData.Snl = $scope.RFConfig.Snl;
                requestData.SID = $scope.RFConfig.SID;
            }else{ //OTAA
                requestData.FC = $scope.RFConfig.FC;
            }
            requestData.Id = $scope.RFConfig.Id;
            requestData.P = parseInt($scope.RFConfig.P);
        }else if(requestData.Md === Advantech.Profile.LoRaRfOperationMode.LORA_WAN){
            requestData.Dev = parseInt($scope.RFConfig.Dev);
            requestData.Sel = parseInt($scope.RFConfig.Sel);
            if(requestData.Sel === 2){//ABP
                requestData.Addr = $scope.RFConfig.Addr;
                requestData.Snl = $scope.RFConfig.Snl;
                requestData.SID = $scope.RFConfig.SID;
            }else{ //OTAA
                requestData.Id = $scope.RFConfig.Id;
                requestData.FC = $scope.RFConfig.FC;
            }
            requestData.P = parseInt($scope.RFConfig.P);
            requestData.En = parseInt($scope.RFConfig.En);
            if (typeof $scope.RFConfig.CRT !== 'undefined') {
                requestData.CRT = parseInt($scope.RFConfig.CRT);
            }
            if(typeof requestData.CRT === 'undefined' || requestData.CRT === 0){//if ADR disable, add RT
                requestData.RT = parseInt($scope.RFConfig.RT);
            }
            if($scope.bFreqRegNQuickSetting){ //region N LoRaWan
                requestData.MIs = parseInt($scope.RFConfig.MIs);
                if(requestData.MIs === 0xFF){
                    requestData.Msg = [];
                    for(var item in $scope.FreqRegNSelect){
                        var maskArr = [];
                        var freqMask = 0;
                        length = $scope.FreqRegNSelect[item].length;
                        for(i=0; i < length; i++){
                            maskArr.push(parseInt($scope.FreqRegNSelect[item][i].sel));
                        }
                        freqMask = Advantech.Utility.convertArrayToMask(maskArr);
                        requestData.Msg.push(freqMask);
                    }
                }
            }
            if($scope.bFreqRegEQuickSetting){ //region E LoRaWan
                length = $scope.FreqRegESel.length;
                requestData.Fltr = [];
                for(i=0; i < length; i++){
                    requestData.Fltr.push($scope.FreqRegESel[i].Freq * 1000);
                }
            }
            if($scope.bFreqRegJQuickSetting){ //region J
                length = $scope.FreqRegJSel.length;
                requestData.Fltr = [];
                for(i=0; i < length; i++){
                    requestData.Fltr.push($scope.FreqRegJSel[i].Freq * 1000);
                }
            }
            if($scope.bFreqRegTQuickSetting){ //region T
                length = $scope.FreqRegTSel.length;
                requestData.Fltr = [];
                for(i=0; i < length; i++){
                    requestData.Fltr.push($scope.FreqRegTSel[i].Freq * 1000);
                }
            }
        }else{ //LORA_PROPRIETARY
            requestData.RT = parseInt($scope.RFConfig.RT);
            requestData.Pw = parseInt($scope.RFConfig.Pw);
            requestData.Fq = parseInt($scope.RFConfig.Fq);
        }

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            //loadRFConfig();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            Advantech.Utility.restartPage();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.onRegionNfreqChange = function(){
        if($scope.bFreqRegNQuickSetting){
            $scope.rfFreqRegNQuickSettingDesc = Advantech.Profile.LoRaWanQuickFreqSetDesc[$scope.RFConfig.MIs];
        }
    };

    $scope.btnRS485SettingClick = function(){
        var requestData = {};
        var url = URL_SERIAL_PORT_CONFIG + "/slot_0/com_1";

        requestData.BR = parseInt($scope.rs485Setting.BR);
        requestData.DB = parseInt($scope.rs485Setting.DB);
        requestData.P = parseInt($scope.rs485Setting.P);
        requestData.SB = parseInt($scope.rs485Setting.SB);
        requestData.Id = parseInt($scope.rs485Setting.Id);

        if($scope.rs485Setting.Id === "" || isNaN($scope.rs485Setting.Id) || $scope.rs485Setting.Id > 248 || $scope.rs485Setting.Id < 1){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Modbus server ID must between 1 ~ 248", null);
            return;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadRS485Setting();
            // Advantech.Utility.reConnectPage(); // need power off for enable this setting
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.isInputValid = function(){
        if(typeof($scope.UpdateConfig.PItv) == 'undefined' || $scope.UpdateConfig.PItv == null)
            return true;
        else if(int($scope.UpdateConfig.PItv) > 2592000 || int($scope.UpdateConfig.PItv) < 1)
            return true;
        else if(deviceProfile.AIn > 0){
            /* var bAiCosSet = false;
            for(var i=0; i < $scope.aiUpdateArr.length; i++){
                if($scope.aiUpdateArr[i].AICOS == 1){
                    bAiCosSet = true;
                    break;
                }
            }
            if(!bAiCosSet){
                return false; //pass check
            }else */ if(typeof($scope.UpdateConfig.AIDR) == 'undefined' || $scope.UpdateConfig.AIDR == null)
                return true;
            else if(int($scope.UpdateConfig.AIDR) > 99 || int($scope.UpdateConfig.AIDR) < 1)
                return true;
        }else
            return false;
    }

    $scope.onBtnUpdateIntervalClick = function(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var requestData = {};
        var url = URL_LPWAN_APP + "/slot_" + $scope.slotId;
        requestData = $scope.UpdateConfig;
        var itemList = Object.keys($scope.UpdateConfig);
        var dataArray = [];

        for(var i=0; i < itemList.length; i++){
            if(typeof(validUpdateItems[itemList[i]]) == 'undefined')
                delete requestData[itemList[i]];
			else{
                dataArray = [];
                if(itemList[i] == "DICOS"){
                    for(var j=0; j < $scope.diUpdateArr.length; j++){
                        dataArray.push(Number($scope.diUpdateArr[j].val));
                    }
                }else if(itemList[i] == "DOCOS"){
                    for(var j=0; j < $scope.doUpdateArr.length; j++){
                        dataArray.push(Number($scope.doUpdateArr[j].val));
                    }
                }else if(itemList[i] == "AICOS"){
                    for(var j=0; j < $scope.aiUpdateArr.length; j++){
                        dataArray.push(Number($scope.aiUpdateArr[j].AICOS));
                    }
				}else if(itemList[i] == "HiA"){
                    for(var j=0; j < $scope.aiUpdateArr.length; j++){
                        dataArray.push(Number($scope.aiUpdateArr[j].HiA));
                    }
				}else if(itemList[i] == "LoA"){
                    for(var j=0; j < $scope.aiUpdateArr.length; j++){
                        dataArray.push(Number($scope.aiUpdateArr[j].LoA));
                    }
                }else if(itemList[i] == "COS1"){
                    for(var j=0; j < $scope.com1UpdateArr.length; j++){
                        dataArray.push(Number($scope.com1UpdateArr[j].val));
                    }
                }else if(itemList[i] == "COS2"){
                    for(var j=0; j < $scope.com2UpdateArr.length; j++){
                        dataArray.push(Number($scope.com2UpdateArr[j].val));
                    }
                }else if(itemList[i] == "SCOS" || itemList[i] == "SHiA" || itemList[i] == "SLoA"){
                    for(var j=0; j < $scope.sensorUpdateArr.length; j++){
                        dataArray.push(Number($scope.sensorUpdateArr[j][itemList[i]]));
                    }
                }
                if(itemList[i] != "PItv" && itemList[i] != "AIDR" && itemList[i] != "PE")
                    requestData[itemList[i]] = Advantech.Utility.convertArrayToMask(dataArray);
            }
        }

        if(typeof(validUpdateItems["PE"]) != 'undefined')
            requestData["PE"] = parseInt(requestData["PE"]);

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadRFApUpdateInterval();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.isPositionConfigInvalid = function(){
        if(typeof($scope.positionConfig.Intv) == 'undefined' || $scope.positionConfig.Intv == null)
            return true;
        else if(int($scope.positionConfig.Intv) > 86400 || int($scope.positionConfig.Intv) < 15)
            return true;
        else
            return false;
    }

    $scope.onClickScheduleConfig = function(){
		loadScheduleConfig();
    };

    $scope.changeAllCheckbox = function(isSelectAll) {
        for (var key in $scope.FreqRegNSelect) {
            $scope.FreqRegNSelect[key].map(function(cell) {
                cell.sel = isSelectAll ? 1 : 0;
                return cell;
            });
        }
    }

    $scope.onBaudRateClick = function () {
        if ($scope.rs485SettingClickCount === 0) {
            $scope.rs485SettingClickTimer = setTimeout(function () {
                $scope.rs485SettingClickCount = 0;
            }, 1200);
        }
        $scope.rs485SettingClickCount++;
        if ($scope.rs485SettingClickCount == 5) {
            clearTimeout($scope.rs485SettingClickTimer);
        }
    }

    $scope.onClickUploadConfig = function() {
        var file = document.getElementById("inpGroupConfig").files[0];
        var reader = new FileReader();

        reader.onload = function() {
            try {
                var json = JSON.parse(this.result);
            }
            catch (e) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Configuration file content parsing failed." , null);
                return;
            }

            var slave_id;
            if ($scope.restoreConfig.typeOfRs485IdSetting == "get_value_from_config_file") {
                slave_id = json.Id;
            } else if ($scope.restoreConfig.typeOfRs485IdSetting == "customize_value") {
                slave_id = $scope.rs485Setting.Id;
            }
            if (!slave_id || isNaN(slave_id) || slave_id > 248 || slave_id < 1) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Modbus server ID must between 1 ~ 248", null);
                return;
            }

            var requestData;
            requestData = json.SLCfg.reduce(function(arr, item) {
                var data = $.extend({}, item);
                delete data.Tag;
                delete data.displayCh;
                return arr.concat(data);
            }, []);

            var isValid = true;
            var int_regex = /[^0-9]/;
            var check_message = "Please check config_file.cfg. ";
            for (var i=0; i<requestData.length; i++) {
                if (requestData[i].Ch === "" || int_regex.test(requestData[i].Ch) || requestData[i].Ch > 7 || requestData[i].Ch < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] Ch must between 0 ~ 7 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].En === "" || int_regex.test(requestData[i].En) || requestData[i].En > 1 || requestData[i].En < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] En must between 0 ~ 1 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].Stat === "" || int_regex.test(requestData[i].Stat)) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] Stat must be integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].Md === "" || int_regex.test(requestData[i].Md) || requestData[i].Md > 1 || requestData[i].Md < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] Md must between 0 ~ 1 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].LoA === "" || int_regex.test(requestData[i].LoA) || requestData[i].LoA < 0 || requestData[i].LoA > 83865) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] LoA must between 0 ~ 83865 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].HiA === "" || int_regex.test(requestData[i].HiA) || requestData[i].HiA < 0 || requestData[i].HiA > 83865) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] HiA must between 0 ~ 83865 integer.", null);
                    isValid = false;
                    break;
                }
                if (typeof requestData[i].LEgF !== 'number' || !isFinite(requestData[i].LEgF) || Math.floor(requestData[i].LEgF) !== requestData[i].LEgF) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] LEgF must be integer.", null);
                    isValid = false;
                    break;
                }
                if (!requestData[i].LEgF || requestData[i].LEgF < 2 || requestData[i].LEgF > 50) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] LEgF must between 2 ~ 50.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].CntKp === "" || int_regex.test(requestData[i].CntKp) || requestData[i].CntKp > 1 || requestData[i].CntKp < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] CntKp must between 0 ~ 1 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].Durl === "" || int_regex.test(requestData[i].Durl) || requestData[i].Durl > 1 || requestData[i].Durl < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] Durl must between 0 ~ 1 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].Tm === "" || int_regex.test(requestData[i].Tm) || requestData[i].Tm < 1 || requestData[i].Tm > 5) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] Tm must between 1 ~ 5 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].Fltr === "" || int_regex.test(requestData[i].Fltr) || requestData[i].Fltr > 1 || requestData[i].Fltr < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] Fltr must between 0 ~ 1 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].Nm === "" || int_regex.test(requestData[i].Nm) || requestData[i].Nm > 1 || requestData[i].Nm < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] Nm must between 0 ~ 1 integer.", null);
                    isValid = false;
                    break;
                }
                if (requestData[i].SEn === "" || int_regex.test(requestData[i].SEn) || requestData[i].SEn > 1 || requestData[i].SEn < 0) {
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>" + check_message + "SLCfg[" + i + "] SEn must between 0 ~ 1 integer.", null);
                    isValid = false;
                    break;
                }
            }
            if (!isValid) {
                return ;
            }

            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'PATCH',
                url: URL_SERIAL_PORT_CONFIG + "/slot_0/com_1",
                data: {"Id":slave_id}
            })
            .then(function(response) {
                var counter = 0;
                (function loop(){
                    $http({
                        method: 'PATCH',
                        url: URL_STACKLIGHT_SENSOR_CONFIG + '/slot_' + $scope.slotId + '/ch_' + requestData[counter].Ch,
                        data: requestData[counter]
                    })
                    .then(function(response) {
                        if (++counter < requestData.length) {
                            loop();
                        } else {
                            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                            if ($scope.restoreConfig.changeToModbusMode == 0) {
                                Advantech.Form.MessageForm.getInstance().showMessageBox("Notification", "<h5>Uploaded successfully.</h5>");
                                loadRS485Setting();
                            } else {
                                setTimeout(function() {
                                    $http({
                                        method: 'PATCH',
                                        url: URL_GENERAL_CONFIG,
                                        data: {SLMd:1}
                                    })
                                    .then(function(response) {
                                        Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                                        Advantech.Utility.restoreConfigAndChangeModePage();
                                    }, function(error) {
                                        Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                                        angularShowHttpErrorMessage(error);
                                    });
                                }, 1000);
                            }
                        }
                    }, function(error) {
                        Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                        angularShowHttpErrorMessage(error);
                    })
                })();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        };

        reader.readAsText(file);
    }

    $scope.btnExportConfig = function() {
		var url = [URL_SERIAL_PORT_CONFIG + "/slot_0/com_1", URL_STACKLIGHT_SENSOR_CONFIG + "/slot_" + $scope.slotId];
		var counter = 0;
		var config_obj = {};

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        (function loop(){
            $http({
                method: 'GET',
                url: url[counter],
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $.extend(true, config_obj, response.data);
                counter++;

                if(counter >= url.length){
                    var blob = new Blob([JSON.stringify(config_obj)], { type: "text/json" });
                    var filename= "config_file.json";
                    var link = document.createElement("a");

                    if (navigator.msSaveBlob == null) {
                        link.download = filename;
                        link.href = window.URL.createObjectURL(blob);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    } else {
                        navigator.msSaveBlob(blob, filename);
                    }
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                }else{
                    loop();
                }
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        })();
    }
}]);

wiseApp.filter('toArray', function() { return function(obj) {
    if (!(obj instanceof Object)) return obj;
    return _.map(obj, function(val, key) {
        return Object.defineProperty(val, '$key', {__proto__: null, value: key} );
    });
}});

wiseApp.controller('timeConfigCtrl', ['$scope', '$http', '$q', '$filter', '$timeout',
    function($scope, $http, $q, $filter, $timeout) {

    $scope.dayLightSaving = {};
    var validKeys = {"En":1,"Ds":1, "De":1, "MOs":1, "MOe":1, "Ws":1, "We":1, "Hs":1, "He":1, "MIs":1, "MIe":1, "Tm":1};
    $scope.weekSelectList = Advantech.Profile.WeekDayName;
    $scope.monthSelectList = Advantech.Profile.MonthName;

    $scope.loadDayLighSavingConf = function(){
        var url = URL_NETWROK_APP;

        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.dayLightSaving = response.data;
            $scope.dayLightSaving.En = parseInt($scope.dayLightSaving.En);
            $scope.dayLightSaving.Tm = parseInt($scope.dayLightSaving.Tm);
            $scope.dayLightSaving.Ws = parseInt($scope.dayLightSaving.Ws);
            $scope.dayLightSaving.We = parseInt($scope.dayLightSaving.We);
            $scope.dayLightSaving.Hs = parseInt($scope.dayLightSaving.Hs);
            $scope.dayLightSaving.He = parseInt($scope.dayLightSaving.He);
            $scope.dayLightSaving.MIs = parseInt($scope.dayLightSaving.MIs);
            $scope.dayLightSaving.MIe = parseInt($scope.dayLightSaving.MIe);
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnDayLightSavingClick = function(){
        var patchData = {};
        var keys = Object.keys(validKeys);//array

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        //only send useful items
        for(var i=0; i < keys.length; i++){
            patchData[keys[i]] = parseInt($scope.dayLightSaving[keys[i]]);
        }

        $http({
            method: 'PATCH',
            url: URL_NETWROK_APP,
            data: patchData
        })
        .then(function(response) {
            $scope.loadDayLighSavingConf();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

}]);


wiseApp.controller('pagesCtrl', ['$scope', '$http', '$q', '$filter', '$timeout',
    function($scope, $http, $q, $filter, $timeout) {

    $scope.pageContent = '';
    var targetTab = Advantech.Utility.RecordContextPageIdSingleton.getInstance().getTag();
    $scope.pageContent = targetTab ? targetTab :'fwUpgrade'; //set desired tab

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
        e.form.find('input[name=type]').val(99); // on boot mode firmware download
        multiPartTransfer(URL_FILE_TRANSFER, function(){onFileUpgradeDone(e.type)}, onFileUpgradeFail, onFileUpgradeUpdateProgress, e.file, e.length, e.type, e.form);
    });

    function onFileUpgradeDone(type) {
        fileUpdatePrgressForm.updateProgressForm(100);
        setTimeout(function() {
            fileUpdatePrgressForm.hideProgressForm();
            if(type === 0 || type == 4 || type == 10){
                Advantech.Utility.restartPage();
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

wiseApp.controller('StackLightCtrl', ['$scope', '$http', '$q', '$filter', '$timeout', '$window', function($scope, $http, $q, $filter, $timeout, $window) {
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    var slotId = recordObj.getSlotId();
    $scope.activeTab = 'status';
    $scope.slSensorConfig = [];
    $scope.slSensorValue = [];
    $scope.selectedChannel = 0;
    $scope.channelObj = {};
    $scope.sensorStatus = {
        // 0: 'Low',
        0: 'Dark',
        // 1: 'High',
        1: 'Light',
        2: 'Slow Blink',
        3: 'Fast Blink',
        255: 'Error'
    };
    $scope.slSensorData = [];
    $scope.columnDisplay = {
        light: true,
        dark: true,
        fastBlink: true,
        slowBlink: true
    };
    $scope.initialSensorData = true;
    $scope.initialSensorConfig = true;
    $scope.quickConfigData = [];
    $scope.showImageMap = $window.innerWidth > 1200;

    function loadQuickConfig() {
        $http({
            method: 'GET',
            url: URL_STACKLIGHT_SENSOR_CONFIG + '/slot_' + slotId,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.quickConfigData = response.data.SLCfg;
            $scope.quickConfigData = $scope.quickConfigData.map(function(item) {
                item.displayCh = item.Ch + 1;
                return item;
            });
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadSLSensorConfig() {
        $http({
            method: 'GET',
            url: URL_STACKLIGHT_SENSOR_CONFIG + '/slot_' + slotId,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.slSensorConfig = response.data.SLCfg;
            var firstEnableConfig;
            response.data.SLCfg.some(function (item) {
                if (item.Stat !== 0) {
                    firstEnableConfig = item;
                    return true;
                }
            });
            if ($scope.initialSensorConfig) {
                $scope.selectedChannel = firstEnableConfig.Ch;
                $scope.initialSensorConfig = false;
            }
            $scope.slSensorConfig.push($.extend({}, firstEnableConfig, {Ch: 'All', Tag: ''}));
            $scope.slSensorConfig = $scope.slSensorConfig.map(function(item) {
                item.En    = item.En === 1 ? true : false;
                item.CntKp = item.CntKp === 1 ? true : false;
                item.Durl  = item.Durl === 1 ? true : false;
                item.Fltr  = item.Fltr === 1 ? true : false;
                item.SEn   = item.SEn === 1 ? true : false;
                item.displayCh = item.Ch != 'All' ? item.Ch + 1 : item.Ch;
                return item;
            });
            $scope.onConfigChannelChange();
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadSLSensorValue() {
		Advantech.Utility.TimerDispatchSingleton.getInstance().ClearTimer();
        $http({
            method: 'GET',
            url: URL_STACKLIGHT_SENSOR_VALUE + '/slot_' + slotId,
            params: { 'foobar': new Date().getTime() }
        })
        .then(function(response) {
            $scope.slSensorValue = response.data.SLVal;

            $scope.slSensorValue = $scope.slSensorValue.map(function(item, idx) {
                item.Val = item.Val == 0xFFFFFFFF ? 'Disable' : item.Val;
                // item.Fq = (item.Fq / 100).toFixed(1);
                return item;
            });

            if ($scope.initialSensorData) {
                $scope.slSensorData = $scope.slSensorValue;
                $scope.$digest();
            }

            var parameterMap = {
                HiA: 'lightLatch',
                HVal: 'lightCount',
                HEgF: 'lightTotalTime',
                LoA: 'darkLatch',
                LVal: 'darkCount',
                LEgF: 'darkTotalTime',
                FB: 'fastBlinkLatch',
                FBVal: 'fastBlinkCount',
                FBEgF: 'fastBlinkTotalTime',
                SB: 'slowBlinkLatch',
                SBVal: 'slowBlinkCount',
                SBEgF: 'slowBlinkTotalTime',
                En: '',
                Stat: '',
                Val: '',
                Fq: ''
            };
            if ($scope.initialSensorData) {
                $scope.initialSensorData = false;

                $scope.slSensorValue.forEach(function(item, idx) {
                    if (item.En === 0 || item.Stat == 254) { // channel disable or not exist
                        return;
                    }

                    // initial svg
                    for(var key in parameterMap) {
                        if (parameterMap[key].indexOf('Latch') > -1) {
                            // $('#' + parameterMap[key] + 'Led_' + item.Ch)[0].checked = item[key] == 1 ? true : false;
                        } else if (parameterMap[key].indexOf('Count') > -1) {
                            var svg = d3.select("#" + parameterMap[key] + "Led_" + item.Ch)
                                .append("svg:svg")
                                .attr("margin", "0px auto")
                                .attr("width", "90%")
                                .attr("height", "40px");
                            // var countLedNumHandler = iopctrl.segdisplay()
                            window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'] = iopctrl.segdisplay()
                                .width(150)
                                .digitCount(10)
                                .negative(true);
                            svg.append("g")
                                .attr("class", "segdisplay")
                                .attr("transform", "translate(20, 5)")
                                .call(window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler']);
                            window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'].value(item[key]);
                        } else if (parameterMap[key].indexOf('TotalTime') > -1) {
                            var svg = d3.select("#" + parameterMap[key] + "Led_" + item.Ch)
                                .append("svg:svg")
                                .attr("margin", "0px auto")
                                .attr("width", "90%")
                                .attr("height", "40px");
                            // var totalTimeLedNumHandler = iopctrl.segdisplay()
                            window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'] = iopctrl.segdisplay()
                                .width(150)
                                .digitCount(10)
                                .decimals(1)
                                .negative(true);
                            svg.append("g")
                                .attr("class", "segdisplay")
                                .attr("transform", "translate(20, 5)")
                                .call(window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler']);
                            window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'].value((item[key] / 10).toFixed(1));
                        }
                    }
                });
            } else {
                $scope.slSensorValue.forEach(function(item, idx) {
                    if (item.En === 0 || item.Stat == 254) { // channel disable or not exist
                        $scope.slSensorData[idx].En = item.En;
                        $scope.slSensorData[idx].Stat = item.Stat;
                        return;
                    }

                    for(var key in parameterMap) {
                        if (item[key] != $scope.slSensorData[idx][key]) {
                            $scope.slSensorData[idx][key] = item[key]; // bind data

                            // refresh svg
                            if (parameterMap[key].indexOf('Latch') > -1) {
                                // if ($('#' + parameterMap[key] + 'Led_' + item.Ch).length > 0) {
                                //     $('#' + parameterMap[key] + 'Led_' + item.Ch)[0].checked = item[key] == 1 ? true : false;
                                // }
                            } else if (parameterMap[key].indexOf('Count') > -1) {
                                if ($('#' + parameterMap[key] + 'Led_' + item.Ch).length > 0) {
                                    if ($("#" + parameterMap[key] + "Led_" + item.Ch+ ' svg').length > 0) {
                                        window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'].value(item[key]);
                                    } else {
                                        var svg = d3.select("#" + parameterMap[key] + "Led_" + item.Ch)
                                            .append("svg:svg")
                                            .attr("margin", "0px auto")
                                            .attr("width", "90%")
                                            .attr("height", "40px");
                                        // var countLedNumHandler = iopctrl.segdisplay()
                                        window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'] = iopctrl.segdisplay()
                                            .width(150)
                                            .digitCount(10)
                                            .negative(true);
                                        svg.append("g")
                                            .attr("class", "segdisplay")
                                            .attr("transform", "translate(20, 5)")
                                            .call(window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler']);
                                        window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'].value(item[key]);
                                    }
                                }
                            } else if (parameterMap[key].indexOf('TotalTime') > -1) {
                                if ($('#' + parameterMap[key] + 'Led_' + item.Ch).length > 0) {
                                    if ($("#" + parameterMap[key] + "Led_" + item.Ch+ ' svg').length > 0) {
                                        window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'].value((item[key] / 10).toFixed(1));
                                    } else {
                                        var svg = d3.select("#" + parameterMap[key] + "Led_" + item.Ch)
                                            .append("svg:svg")
                                            .attr("margin", "0px auto")
                                            .attr("width", "90%")
                                            .attr("height", "40px");
                                        // var totalTimeLedNumHandler = iopctrl.segdisplay()
                                        window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'] = iopctrl.segdisplay()
                                            .width(150)
                                            .digitCount(10)
                                            .decimals(1)
                                            .negative(true);
                                        svg.append("g")
                                            .attr("class", "segdisplay")
                                            .attr("transform", "translate(20, 5)")
                                            .call(window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler']);
                                        window["#" + parameterMap[key] + "Led_" + item.Ch + 'handler'].value((item[key] / 10).toFixed(1));
                                    }
                                }
                            }
                        }
                    }
                });

                $scope.$digest();
            }

			if($scope.activeTab == "status"){
				Advantech.Utility.TimerDispatchSingleton.getInstance().EnableTimer(function(){loadSLSensorValue();}, 2000);//create timer
			}
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.switchTabTo = function(tabId) {
        if ($scope.activeTab == tabId) {
            return;
        }
        Advantech.Utility.TimerDispatchSingleton.getInstance().ClearTimer();
        $scope.activeTab = tabId;
        if (tabId == 'status') {
            $scope.initialSensorData = true;
            loadSLSensorValue();
        } else if (tabId == 'config') {
            loadSLSensorConfig();
        } else if (tabId == 'quickConfig') {
            loadQuickConfig();
        }
    }

    $scope.onConfigChannelChange = function() {
        if ($scope.selectedChannel == 'All') {
            $scope.channelObj = $scope.slSensorConfig[$scope.slSensorConfig.length - 1];
        } else {
            $scope.channelObj = $scope.slSensorConfig[$scope.selectedChannel];
        }
    }

    $scope.onQuickConfigSubmit = function() {
        var requestData;
        requestData = $scope.quickConfigData.reduce(function(arr, item) {
            if (item.Stat === 1) {
                var data = $.extend({}, item);
                delete data.Tag;
                delete data.displayCh;
                return arr.concat(data);
            } else {
                return arr;
            }
        }, []);

       Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var counter = 0;
        (function loop(){
            requestData[counter].En = parseInt(requestData[counter].En);
            $http({
                method: 'PATCH',
                url: URL_STACKLIGHT_SENSOR_CONFIG + '/slot_' + slotId + '/ch_' + requestData[counter].Ch,
                data: requestData[counter]
            })
            .then(function(response) {
                if (++counter < requestData.length) {
                    loop();
                } else {
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    loadQuickConfig();
                }
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        })();
    }

    $scope.onConfigSubmit = function() {
        var requestData;
        if ($scope.selectedChannel == 'All') {
            requestData = $scope.slSensorConfig.reduce(function(arr, item) {
                if (item.Ch != 'All' && item.Stat === 1) {
                    var data = $.extend($.extend({}, item), $scope.slSensorConfig[$scope.slSensorConfig.length - 1], {Ch: item.Ch});
                    delete data.Tag;
                    delete data.displayCh;
                    return arr.concat(data);
                } else {
                    return arr;
                }
            }, []);
        } else {
            requestData = [$scope.slSensorConfig[$scope.selectedChannel]];
            delete requestData[0].Tag; // not exist tag name in IO board
            delete requestData[0].displayCh;
        }

        // validate
        var isValid = true;
        for (var i=0; i<requestData.length; i++) {
            if (!requestData[i].Tm || requestData[i].Tm < 1 || requestData[i].Tm > 5) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Delay Time must between 1 ~ 5.", null);
                isValid = false;
                break;
            }
            if (!requestData[i].LoA || requestData[i].LoA < 0 || requestData[i].LoA > 83865) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Low Illumination Limit Value must between 0 ~ 83865.", null);
                isValid = false;
                break;
            }
            if (!requestData[i].HiA || requestData[i].HiA < 0 || requestData[i].HiA > 83865) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>High Illumination Limit Value must between 0 ~ 83865.", null);
                isValid = false;
                break;
            }
            if (typeof requestData[i].LEgF !== 'number' || !isFinite(requestData[i].LEgF) || Math.floor(requestData[i].LEgF) !== requestData[i].LEgF) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Fast Blink Frequency must be integer.", null);
                isValid = false;
                break;
            }
            if (!requestData[i].LEgF || requestData[i].LEgF < 2 || requestData[i].LEgF > 50) {
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Fast Blink Frequency must between 2 ~ 50.", null);
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            return ;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var counter = 0;
        (function loop(){
            requestData[counter].En    = requestData[counter].En ? 1 : 0;
            requestData[counter].CntKp = requestData[counter].CntKp ? 1 : 0;
            requestData[counter].Durl  = requestData[counter].Durl ? 1 : 0;
            requestData[counter].Fltr  = requestData[counter].Fltr ? 1 : 0;
            requestData[counter].SEn   = requestData[counter].SEn ? 1 : 0;
            requestData[counter].Md    = parseInt(requestData[counter].Md);
            requestData[counter].Nm    = parseInt(requestData[counter].Nm);
            $http({
                method: 'PATCH',
                url: URL_STACKLIGHT_SENSOR_CONFIG + '/slot_' + slotId + '/ch_' + requestData[counter].Ch,
                data: requestData[counter]
            })
            .then(function(response) {
                if (++counter < requestData.length) {
                    loop();
                } else {
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    loadSLSensorConfig();
                }
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        })();
    }

    $scope.onLatchClearClick = function(channel, status) {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        var statusMap = {
            light: 'HiA',
            dark: 'LoA',
            fastBlink: 'FB',
            slowBlink: 'SB'
        };

        var requestData = {};
        requestData[statusMap[status]] = 0;

        $http({
            method: 'PATCH',
            url: URL_STACKLIGHT_SENSOR_VALUE + '/slot_' + slotId + '/ch_' + channel,
            data: requestData
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadSLSensorValue();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onResetClick = function(channel, status, type) {
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        var resetMap = {
            time: {
                light: 'HisH',
                dark: 'HisL',
                fastBlink: 'HisFB',
                slowBlink: 'HisSB'
            },
            count: {
                light: 'ClrH',
                dark: 'ClrL',
                fastBlink: 'ClrFB',
                slowBlink: 'ClrSB'
            }
        };

        var requestData = {};
        requestData[resetMap[type][status]] = 1;

        $http({
            method: 'PATCH',
            url: URL_STACKLIGHT_SENSOR_VALUE + '/slot_' + slotId + '/ch_' + channel,
            data: requestData
        })
        .then(function(response) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            $('body') // stacklight sensor modal keep opening
                .addClass('modal-open')
                .css('padding-right', '17px');
            loadSLSensorValue();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            $('body') // stacklight sensor modal keep opening
                .addClass('modal-open')
                .css('padding-right', '17px');
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.changeColumnDisplay = function(column, event) {
        event.stopPropagation();
        $scope.columnDisplay[column] = !$scope.columnDisplay[column];
    }

    $scope.showDetailModal = function(item) {
        $('#detailModal'+item.Ch).modal('show');
    }

    $scope.onImageMapMouseEnter = function(e) {
        $('#marAreaTooltip')
            .attr('data-original-title', e.target.alt)
            .tooltip('show')
            .next()
            .css('left', 10);

        $('#imageMapCanvas')[0].getContext('2d').clearRect(0, 0, 300, 650);
        // var coords = e.target.getAttribute('coords').split(',');
        var context = $('#imageMapCanvas')[0].getContext('2d');
        context.fillStyle = 'rgba(66, 139, 202, 0.5)';
        if (e.target.id == 'area1') {
            context.fillRect(0, 1, 300, 6);
        } else if (e.target.id == 'area2') {
            context.fillRect(0, 16, 300, 6);
        } else if (e.target.id == 'area3') {
            context.fillRect(0, 31, 300, 6);
        } else if (e.target.id == 'area4') {
            context.fillRect(0, 46, 300, 6);
        } else if (e.target.id == 'area5') {
            context.fillRect(0, 61, 300, 6);
        } else if (e.target.id == 'area6') {
            context.fillRect(0, 76, 300, 6);
        } else if (e.target.id == 'area7') {
            context.fillRect(0, 91, 300, 6);
        } else if (e.target.id == 'area8') {
            context.fillRect(0, 106, 300, 6);
        }
    }

    $scope.onImageMapMouseLeave = function(e) {
        $('#imageMapCanvas')[0].getContext('2d').clearRect(0, 0, 300, 650);
        $('#marAreaTooltip').tooltip('hide');
    }

    $scope.channelToggle = function(channel) {
        var currentClickData;
        $scope.quickConfigData.forEach(function(item) {
            if (channel == item.Ch) {
                currentClickData = item;
            }
        });
        if (typeof currentClickData != 'undefined') {
            currentClickData.En = currentClickData.En === 0 ? 1 : 0;
        }
    }

    loadSLSensorValue();

}])
.directive('toggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.toggle == 'tooltip' && element.hasClass('slSensorTooltip')) {
                $(element).tooltip();
            }
        }
    };
});
