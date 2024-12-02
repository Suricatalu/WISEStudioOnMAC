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
                    // advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("diagnostic", "diagnostic.html", "Diagnostician"));
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
                        $("#" + _Self.getPanelId() + " #inpRT").val(jsonObj.SVal == 255 ? 'Waiting for TX' : settingList[jsonObj.SVal]);
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

var wiseApp = angular.module('wiseApp', ['ngSanitize']);
wiseApp.config(['$httpProvider', '$compileProvider',
    function($httpProvider, $compileProvider) {
        //for http PATCH request
        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/json;charset=utf-8'
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
    function($scope, $http, $element, filteredListService, $window, $filter, $timeout, $compile) {
    $scope.activeTab = 'status'; //default active tab
    $scope.statusActiveTab = 'status_current'; //default active tab
    $scope.accelerationPeakGText = 'Acceleration Peak (g)';
    $scope.accelerationPeakMS2Text = 'Acceleration Peak (m/s&sup2;)';
    $scope.accelerationRmsGText = 'Acceleration RMS (g)';
    $scope.accelerationRmsMS2Text = 'Acceleration RMS (m/s&sup2;)';
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
    $scope.commonObj = {Avg: 0};
    $scope.isSupportFeatureAvgMode = false;
    var sensorConfigs = {};
    $scope.isSupportSendAlarmEvent = false;
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
            if ($scope.isSupportFeatureAvgMode) {
                loadSensorCommonConfig();
            }
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
                    if ($scope.sensorValues[i].EgF.length >= 8) { // has Displacement
                        sensorConfigs[i].value = [].concat( // change Displacement element to index 3
                            $scope.sensorValues[i].EgF[0],
                            $scope.sensorValues[i].EgF[1],
                            $scope.sensorValues[i].EgF[2],
                            $scope.sensorValues[i].EgF[7],
                            $scope.sensorValues[i].EgF[3],
                            $scope.sensorValues[i].EgF[4],
                            $scope.sensorValues[i].EgF[5],
                            $scope.sensorValues[i].EgF[6]).toString();
                    } else {
                        //$scope.channelObj.value = $scope.sensorValues[i].EgF.toString();
                        sensorConfigs[i].value = $scope.sensorValues[i].EgF.toString();
                    }
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

            if (typeof response.data.FCS != 'undefined' && response.data.FCS & Advantech.Profile.FCSMask.FeatureAverageMode) {
                $scope.isSupportFeatureAvgMode = true
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
                if (typeof sensorConfigs[i].Cntn != 'undefined') {
                    $scope.isSupportSendAlarmEvent = true;
                }
            }
            //$scope.SetCurrentRangeList($scope.channelObj.Rng);
            //assignChannelValue();
            $scope.$digest();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
    function loadSensorCommonConfig() {
        $http({
            method: 'GET',
            url: URL_SENSOR_MEASURE + '/slot_' + slotId,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.commonObj.Avg = response.data.Avg
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
                if (sensorConfigs[i].EgF.length < 8) {
                    sensorConfigs[i].UnitName = 'mm/s, g, g';
                } else {
                    sensorConfigs[i].UnitName = defaultRngList[range].unit;
                }
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
        requestData.Rng = Number($scope.channelObj.Rng);
        //check value
        if($scope.channelObj.EnHA === 1 &&
            ($scope.channelObj.HiA === "" || isNaN($scope.channelObj.HiA) || $scope.channelObj.HiA > 100000 || $scope.channelObj.HiA < -100000)){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>High Alarm Value must between -99999.999 ~ 99999.999", null);
            return;
        }
        if($scope.isTemperatureSensor($scope.channelObj.Rng)){ //temperature
            if(!$scope.isSupportSendAlarmEvent && ($scope.channelObj.ReA === "" || isNaN($scope.channelObj.ReA) || $scope.channelObj.ReA < -100000 || $scope.channelObj.ReA > 100000)){
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Release Alarm Value must between -99999.999 ~ 99999.999", null);
                return;
            }
            if($scope.channelObj.Val === "" || isNaN($scope.channelObj.Val) || $scope.channelObj.Val > 1000 || $scope.channelObj.Val < -1000){
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Sensor Offset Value must between -1000 ~ 1000", null);
                return;
            }

            requestData.Val = Number($scope.channelObj.Val);
            if ($scope.isSupportSendAlarmEvent) {
                requestData.Cntn = Number($scope.channelObj.Cntn);
            } else {
                requestData.ReA = Number($scope.channelObj.ReA);
            }
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

    $scope.onSensorCommonConfigClick = function(){
        var requestData = {};
        requestData.Avg  = Number($scope.commonObj.Avg);

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'PATCH',
            url: URL_SENSOR_MEASURE + '/slot_' + slotId,
            data: requestData
        })
        .then(function(response) {
            loadSensorCommonConfig();
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
        //MTTA Meter
        $scope.isSupportMTTA = Advantech.Profile.DeviceEmun[module].isSupportMTTA;
        $scope.MttaMeterItemArr = Advantech.Profile.MttaMeterItemArr;
        //////////////////
        var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
        var MAX_RULE_NUMBER = profile.RL ? profile.RL : 8; //if not defined, use default value
        var MAX_CHANNEL_NUMBER = profile.MCh ? profile.MCh : 32; //if not defined, use default value
        $scope.max_rule_amount = MAX_RULE_NUMBER;
        $scope.max_channel_amount = MAX_CHANNEL_NUMBER;
        var jqxhr;
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
        //transparent
        $scope.transparentGenConfig = {};
        var mSelectedProtocolIndex = 0;
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

        ////////////////////convert channels to TATUNG Meter data
        function convert2ByteHexToAscii(hex) {
            var strHex = ("0000" + hex).slice(-4);
            var intHex;
            var str = '';

            for (var i = 0; i < strHex.length; i += 2) {
                intHex = parseInt(strHex.substring(i, i +2), 16);
                if (intHex <= 31 || intHex >= 127) {
                    continue;
                } else {
                    str += String.fromCharCode(intHex);
                }
            }

            return str;
        }
        function convert2ByteHexToDec(hex) {
            var strHex = ("0000" + hex).slice(-4);
            var intHex;
            var arr = [];

            for (var i = 0; i < strHex.length; i += 2) {
                intHex = parseInt(strHex.substring(i, i +2), 16);
                arr.push(("00" + intHex).slice(-2));
            }

            return arr;
        }
        function convertHexToInt16(str) {
            var num = parseInt(str, 16);
            if ((num & 0x8000) > 0) {
                return num - 0x10000;
            }
            return num;
        }
        function convertHexToInt32(str) {
            var num = parseInt(str, 16);
            if ((num & 0x80000000) > 0) {
                return num - 0x100000000;
            }
            return num;
        }
        function converHexToFloat32(str) {
            str = (str + "00000000").slice(0, 8);

            // Split into bits: sign (1), exponent (8), significand (23).
            var hex = parseInt(str, 16);
            var sign = hex >> 31 ? -1 : 1;
            var exponent = (hex >> 23) & 0xFF;
            var significand = hex & 0x7fffff;

            // Classify the floating-point value.
            if (exponent == 0 && significand == 0) {
                return 0;
            } else if (exponent == 0xFF) {
                return significand == 0 ? sign * Number.POSITIVE_INFINITY : Number.NaN;
            }

            return sign * Math.pow(2, (exponent - 127)) * ((significand | 0x800000) * 1.0 / Math.pow(2, 23));
        }
        function converHexToFloat64(str) {
            // Pad the string with zeroes to 16 characters.
            // You can omit this if you control your inputs.
            str = (str + "0000000000000000").slice(0, 16);

            // Split into bits: sign (1), exponent (11), significand (52).
            var sign_and_exponent_bits = parseInt(str.slice(0,3), 16);
            var sign = sign_and_exponent_bits >= 0x800 ? -1 : +1;
            var exponent_bits = sign_and_exponent_bits & ((1<<11) - 1);
            var significand_bits = parseInt(str.slice(3,16), 16);

            // Classify the floating-point value.
            if (exponent_bits == 0x7FF)  // infinity | not a number
              return significand_bits == 0 ? sign * Number.POSITIVE_INFINITY : Number.NaN;
            else if (exponent_bits == 0)  // zero | subnormal number
                return sign * Math.pow(2, 1-1023-52) * significand_bits;
            else  // normal number
                return sign * Math.pow(2, exponent_bits-1023-52) * (Math.pow(2, 52) + significand_bits);
        }
        function fixedDecimalPlaces(num, places) {
            var str = num + "";
            var index = str.indexOf(".");
            var fill0 = "";

            for (var i=0; i<places; i++) {
                fill0 += "0";
            }

            if (index > -1) {
                return (str + fill0).substring(0, index + (places + 1));
            }
            return str;
        }
        function convertChToMetterData(data, metterItem) {
            var result = "";
            var tmp = "";
            var i;
            var time_sign = ["/", "/", " ", ":", ":", ""];
            var count = 0;

            switch (metterItem.type) {
                case 'ascii':
                    for (i = 0; i < data.length; i++) {
                        tmp = convert2ByteHexToAscii(data[i].Val.toString(16));
                        if (tmp == "") {
                            continue;
                        } else {
                            result += tmp;
                        }
                    }
                    break;
                case 'dateTime':
                    for (i = 0; i < data.length; i++) {
                        tmp = convert2ByteHexToDec(data[i].Val.toString(16), metterItem.type);
                        result = result + tmp[0] + time_sign[count] + tmp[1] + time_sign[count+1];
                        count += 2;
                    }
                    break;
                case 'uint16':
                    result = data[0].Val / ((metterItem.unitNum) ? metterItem.unitNum : 1) + "";
                    break;
                case 'int16':
                    result = convertHexToInt16(data[0].Val.toString(16)) / ((metterItem.unitNum) ? metterItem.unitNum : 1) + "";
                    break;
                case 'int32':
                    for (i = 0; i < data.length; i++) {
                        tmp += ("0000" + data[i].Val.toString(16)).slice(-4);
                    }
                    result = convertHexToInt32(tmp) / ((metterItem.unitNum) ? metterItem.unitNum : 1) + "";
                    break;
                case 'float32':
                    for (i = 0; i < data.length; i++) {
                        tmp += ("0000" + data[i].Val.toString(16)).slice(-4);
                    }
                    result = fixedDecimalPlaces(converHexToFloat32(tmp), 8);
                    break;
                case 'float64':
                    for (i = 0; i < data.length; i++) {
                        tmp += ("0000" + data[i].Val.toString(16)).slice(-4);
                    }
                    result = fixedDecimalPlaces(converHexToFloat64(tmp), 8);
                    break;
            }

            return result;
        }

        ////////////////////load Data
        function loadSerialConfig(initialPage) {
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_SERIAL_PORT_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $scope.comPortSetting = response.data;
                $scope.$digest();
                if (initialPage) {
                    mSelectedProtocolIndex = $scope.comPortSetting.Prot;
                    if ($scope.comPortSetting.Prot == "0") {
                        $("#panelModbus").show();
                        $("#panelTransparent").hide();
                    } else {
                        $("#panelModbus").hide();
                        $("#panelTransparent").show();
                    }
                    if ($scope.comPortSetting.Prot == 1) {
                        loadTransparentGenconfig(true);
                    } else {
                        $scope.activeTab = "status";
                        if ($scope.isSupportMTTA) {
                            loadStatusWord(true);
                        } else {
                            $scope.statusActiveTab = 'status_bit';
                            $scope.statusQueryCount = 0;
                            loadStatusBit(true);//initial true
                        }
                    }
                } else {
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                }
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }

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
                url: URL_MODBUS_GEN_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
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
                url: URL_MODBUS_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
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
			var counter = 0;

			$scope.statusQueryData = [];
            gobalTimer.ClearTimer();
            $scope.statusQueryCount++;
            if(isInitial)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();

			(function loop(){
                if ($("[ng-controller=ComPortSettingCtrl]").size() > 0) {
                    jqxhr = $.ajax({
                        url: URL_EXPANSION_BIT + '/slot_' + slotId + '/com_' + comNumber + '/seg_' + counter,
                        type: "GET",
                        data:{foobar: new Date().getTime()},
                        dataType: "json",
                        success: function(response, textStatus, jqXHR) {
                            $scope.statusQueryData = $scope.statusQueryData.concat(response.ExpBit);
                            counter++;

                            if(counter >= $scope.totalChannelGroupNumbers){
                                var length = response.ExpBit.length;
                                var bit7Mask = 128; //1000-0000
                                var bit0To6Mask = 127; //0111-1111
                                for(var i=0; i< length; i++){
                                    $scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] == 1 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                                    $scope.statusQueryData[i]["ReadWrite"] = $scope.statusQueryData[i]["Prop"] == 2 ? true : false;
                                    $scope.statusQueryData[i]["Evt"] = $scope.statusQueryData[i]["Evt"] & bit0To6Mask;//get bit 0~6
                                }
                                //start to show table data
                                $scope.sortAndShow(isInitial);
                                $scope.$digest();

                                if(!$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_bit')
                                    gobalTimer.EnableTimer(function(){loadStatusBit()}, pollingRate);//create timer
                                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                            }else{
                                loop();
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrow) {
                            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                            if (textStatus != "abort") {
                                angularShowHttpErrorMessage({
                                    data: {
                                        Err: jqXHR.status,
                                        Msg: textStatus
                                    }
                                });
                            }
                        }
                    });
                }
            })();
        }
        function loadStatusWord(isInitial) {
			var counter = 0;

			$scope.statusQueryData = [];
            gobalTimer.ClearTimer();
            $scope.statusQueryCount++;
            if(isInitial)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();

            (function loop(){
                if ($("[ng-controller=ComPortSettingCtrl]").size() > 0) {
                    jqxhr = $.ajax({
                        url: URL_EXPANSION_WORD + '/slot_' + slotId + '/com_' + comNumber + '/seg_' + counter,
                        type: "GET",
                        data:{foobar: new Date().getTime()},
                        dataType: "json",
                        success: function(response, textStatus, jqXHR) {
                            $scope.statusQueryData = $scope.statusQueryData.concat(response.ExpWord);
                            counter++;

                            if ($scope.isSupportMTTA) {
                                if(counter >= 3){
                                    for (var i=0; i<$scope.MttaMeterItemArr.length; i++) {
                                        $scope.MttaMeterItemArr[i].value = convertChToMetterData($scope.statusQueryData.slice($scope.MttaMeterItemArr[i].channel[0], $scope.MttaMeterItemArr[i].channel[1] + 1), $scope.MttaMeterItemArr[i]);
                                    }
                                    $scope.$digest();

                                    if($scope.activeTab =='status')
                                        gobalTimer.EnableTimer(function(){loadStatusWord()}, 10000);//create timer
                                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                                } else {
                                    loop();
                                }
                            } else {
                                if(counter >= $scope.totalChannelGroupNumbers){
                                    var length = response.ExpWord.length;
                                    var bit7Mask = 128; //1000-0000
                                    var bit0To6Mask = 127; //0111-1111
                                    for(var i=0; i< length; i++){
                                        $scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] == 1 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                                        $scope.statusQueryData[i]["ReadWrite"] = $scope.statusQueryData[i]["Prop"] == 2 ? true : false;
                                        $scope.statusQueryData[i]["Evt"] = $scope.statusQueryData[i]["Evt"] & bit0To6Mask;//get bit 0~6
                                    }
                                    //start to show table data
                                    $scope.sortAndShow(isInitial);
                                    $scope.$digest();

                                    if(!$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_word')
                                        gobalTimer.EnableTimer(function(){loadStatusWord()}, pollingRate);//create timer
                                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                                } else {
                                    loop();
                                }
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrow) {
                            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                            if (textStatus != "abort") {
                                angularShowHttpErrorMessage({
                                    data: {
                                        Err: jqXHR.status,
                                        Msg: textStatus
                                    }
                                });
                            }
                        }
                    });
                }
            })();
        }
        function loadDiagnosticData(isPeriodical){
            $scope.responseTimeQueryCount++;
            if(!isPeriodical)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_MODBUS_STATUS + '/slot_' + slotId + '/com_' + comNumber,
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

        function loadTransparentGenconfig() {
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_TRANSPARENT_GENCONFIG + '/slot_' + slotId + '/com_' + comNumber,
                params: { 'foobar': new Date().getTime() }
            })
            .then(function(response) {
                $scope.transparentGenConfig = response.data;
                $scope.$digest();
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
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
                url: URL_MODBUS_GEN_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
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
            requestURL = URL_MODBUS_CONFIG + '/slot_' + slotId + '/com_' + comNumber;

            for(var i=0; i< requestData.length; i++){
                requestData[i].FC = parseInt(requestData[i].FC);
                requestData[i].Prop = parseInt(requestData[i].Prop);
                requestData[i].DevE = parseInt(requestData[i].DevE);
                delete requestData[i].valid;
                delete requestData[i].type;
                delete requestData[i].ruleStatus;
                if (requestData[i].DevE != 1) {
                	delete requestData[i].SItv;
                	delete requestData[i].Dev;
				}
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

        $scope.btnTransparentGenConfigClick = function() {
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
                loadSerialConfig();

                $scope.transparentGenConfig.SEn = parseInt($scope.transparentGenConfig.SEn);
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();
                $http({
                    method: 'PATCH',
                    url: URL_TRANSPARENT_GENCONFIG + '/slot_' + slotId + '/com_' + comNumber,
                    data: $scope.transparentGenConfig
                })
                .then(function(response) {
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    loadTransparentGenconfig();
                }, function(error) {
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    angularShowHttpErrorMessage(error);
                });
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }

        $scope.btnProtocolChangeClick = function() {
            var requestData = {};
            requestData.Prot = Number($scope.comPortSetting.Prot);
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            gobalTimer.ClearTimer();
            if (jqxhr) {
                jqxhr.abort();
            }
            $http({
                method: 'PATCH',
                url: URL_SERIAL_PORT_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
                data: requestData
            })
            .then(function(response) {
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                gobalTimer.ClearTimer();
                loadSerialConfig(true);
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                Advantech.Utility.ErrorCounter.getInstance().resetCount();
                angularShowHttpErrorMessage(error);
            });
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
        }

        $scope.onProtocolChange = function(){
            gobalTimer.ClearTimer();
            if ($scope.comPortSetting.Prot == mSelectedProtocolIndex) {
                $("#protocolChangeSubmitButton").hide();
                if ($scope.comPortSetting.Prot == "0") {
                    $("#panelModbus").show();
                    $("#panelTransparent").hide();
                } else {
                    $("#panelModbus").hide();
                    $("#panelTransparent").show();
                }
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();
                $http({
                    method: 'GET',
                    url: URL_SERIAL_PORT_CONFIG + '/slot_' + slotId + '/com_' + comNumber,
                    params: { 'foobar': new Date().getTime() }
                })
                .then(function(response) {
                    $scope.comPortSetting = response.data;
                    $scope.$digest();
                    if ($scope.comPortSetting.Prot == 1) {
                        loadTransparentGenconfig(true);
                    } else {
                        $scope.activeTab = "status";
                        if ($scope.isSupportMTTA) {
                            loadStatusWord(true);
                        } else {
                            $scope.statusActiveTab = 'status_bit';
                            $scope.statusQueryCount = 0;
                            loadStatusBit(true);//initial true
                        }
                    }
                }, function(error) {
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    angularShowHttpErrorMessage(error);
                });
            } else {
                $("#panelModbus, #panelTransparent").hide();
                $("#protocolChangeSubmitButton").show();
            }
        };//end function

        //////////////////////////////////
        //variables for Status Tables
        $scope.pageSize = 16;
        $scope.pageSizeList = [16, 32, 64];
        $scope.reverse = false;
        $scope.ItemsByPage; //data in each page
        $scope.totalChannelGroupNumbers = 4;
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

        $('[data-toggle=tooltip]').tooltip({container: 'body'});//for tool-tip
        //load data for default Tabs
        var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
        if (typeof profile.FCS != 'undefined' && profile.FCS & Advantech.Profile.FCSMask.TransparentMode) {
            $("#protocol").show();
            loadSerialConfig(true);
        } else {
            $("#panelModbus").show();
            if ($scope.isSupportMTTA) {
                loadStatusWord(true);
            } else {
                loadStatusBit(true);//initial true
            }
        }
}]);

wiseApp.controller('RFConfigCtrl', ['$scope', '$http', '$element', 'filteredListService', '$filter', '$timeout', '$compile',
    function($scope, $http, $element, filteredListService, $filter, $timeout, $compile) {
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    var profile = Advantech.Utility.ProfileRecordInstance.getInstance().getProfile();
    $scope.slotId = recordObj.getSlotId();
    $scope.Locate = false;
    $scope.RFStatus = {};
    $scope.RFConfig = {};
    $scope.activeRFTab = ($scope.slotId != '0')? 'status':'config';
    $scope.rfRegionSelectList = Advantech.Profile.LoRaRfRegionEnum;
    $scope.rfRegionIsmBandList = Advantech.Profile.LoRaRfRegionIsmBandEnum;
    $scope.rfFrequencySelectList = {"0": "Loading"};
    $scope.rfDataRateSelectList = {"0": "Loading"};
    $scope.rfTxPowerSelectList = {"0": "Loading"};
    //Region N
    $scope.rfFreqUsQuickSelectList = Advantech.Profile.LoRaWanUsQuickFreqSet;
    $scope.rfFreqAuQuickSelectList = Advantech.Profile.LoRaWanAuQuickFreqSet;
    $scope.rfFreqAsQuickSelectList = Advantech.Profile.LoRaWanAsQuickFreqSet;
    $scope.rfRegionUsFreqSet = Advantech.Profile.LoRaRegionUsFreqSet;
    $scope.rfRegionAuFreqSet = Advantech.Profile.LoRaRegionAuFreqSet;
    $scope.rfRegionKrFreqSel = Advantech.Profile.LoRaWanKrFreqSel;
    $scope.bFreqRegNQuickSetting = false; //Region N for LoRaWan mode
    $scope.bFreqRegZQuickSetting = false; //Region Z for LoRaWan mode
    $scope.bFreqRegEQuickSetting = false; //Region E for LoRaWan mode
    $scope.bFreqRegJQuickSetting = false; //Region J for LoRaWan mode
    $scope.bFreqRegTQuickSetting = false; //Region T for LoRaWan mode
    $scope.bFreqRegRQuickSetting = false; //Region R for LoRaWan mode
    $scope.bFreqRegKQuickSetting = false; //Region K for LoRaWan mode
    $scope.bFreqRegDQuickSetting = false; //Region D for LoRaWan mode
    $scope.FreqRegNSelect; //Region N for LoRaWan mode
    $scope.FreqRegZSelect; //Region Z for LoRaWan mode
    $scope.FreqRegESel = []; //Region E for LoRaWan mode
    $scope.FreqRegJSel = []; //Region J for LoRaWan mode
    $scope.FreqRegTSel = []; //Region T for LoRaWan mode
    $scope.FreqRegRSel = []; //Region R for LoRaWan mode
    $scope.FreqRegKSel = []; //Region K for LoRaWan mode
    $scope.FreqRegDSel = []; //Region D for LoRaWan mode

    var UserDefineFreqRegT = [];

    $scope.rfFreqRegNQuickSettingDesc = "";
    $scope.rfFreqRegZQuickSettingDesc = "";
    $scope.rfFreqRegTQuickSettingDesc = "";

    $scope.activeConfigTab = 'Control';
    $scope.currentModuel;

    $scope.modbusIdList = [];
    $scope.positionStatus = {};
    $scope.positionConfig = {};

    $scope.activePositionTab = 'status';
    $scope.positionSystemSelectList;

    //Data Update
    $scope.isSupportDataUpdate = Advantech.Profile.DeviceEmun[module].isSupportDataUpdate;
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
    $scope.isSupportAppPortSetting = (/2200-M[TNE]A/.test(module));
    $scope.PItv_min = (/2200-M[TNE]A/.test(module)) ? 10 : 1;
    $scope.isSupportMulitcastChannel = (/2200-[MT]\d{2}/.test(module));

    $scope.localeSensitiveComparator = function(v1, v2) {
        if(int(v1) > int(v2))
            return 1;
        else
            return -1;
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
                    dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.COS1, 30); //30 rules
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
        $scope.bFreqRegZQuickSetting = false;
        $scope.bFreqRegEQuickSetting = false;
        $scope.bFreqRegJQuickSetting = false;
        $scope.bFreqRegTQuickSetting = false;
        $scope.bFreqRegRQuickSetting = false;
        $scope.bFreqRegKQuickSetting = false;
        $scope.bFreqRegDQuickSetting = false;

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
        if(parseInt($scope.RFConfig.Md) === Advantech.Profile.LoRaRfOperationMode.LORA_WAN && typeof $scope.RFConfig.MIs !== "undefined" &&
            (parseInt($scope.RFConfig.Reg) === 78 || parseInt($scope.RFConfig.Reg) === 90)){
            var count = 0;
            var maskArr;
            if(parseInt($scope.RFConfig.Reg) === 78){
                $scope.bFreqRegNQuickSetting = true;
                $scope.FreqRegNSelect = {};
                for(var item in $scope.rfRegionUsFreqSet){
                    if (item != '8') {
                        $scope.FreqRegNSelect[count] = [];
                        maskArr = Advantech.Utility.convertMaskToArray($scope.RFConfig.Msg[count], 8);
                        stdMaskArr = Advantech.Utility.convertMaskToArray($scope.RFConfig.Msg['8'], 8);
                        length = $scope.rfRegionUsFreqSet[count]["Freq"].length;
                        for(i = 0; i < length; i++){
                            $scope.FreqRegNSelect[count].push({
                                "sel": maskArr[i],
                                "Freq": $scope.rfRegionUsFreqSet[item].Freq[i],
                                "BW": $scope.rfRegionUsFreqSet[item].BandWidth
                                });
                        }
                        $scope.FreqRegNSelect[count].push({ // channel standard
                            "sel": stdMaskArr[count],
                            "Freq": $scope.rfRegionUsFreqSet['8'].Freq[count],
                            "BW": $scope.rfRegionUsFreqSet['8'].BandWidth
                            });
                        count++;
                    }
                }
            }else if (parseInt($scope.RFConfig.Reg) === 90){
                $scope.bFreqRegZQuickSetting = true;
                $scope.FreqRegZSelect = {};
                for(var item in $scope.rfRegionAuFreqSet){
                    if (item != '8') {
                        $scope.FreqRegZSelect[count] = [];
                        maskArr = Advantech.Utility.convertMaskToArray($scope.RFConfig.Msg[count], 8);
                        stdMaskArr = Advantech.Utility.convertMaskToArray($scope.RFConfig.Msg['8'], 8);
                        length = $scope.rfRegionAuFreqSet[count]["Freq"].length;
                        for(i = 0; i < length; i++){
                            $scope.FreqRegZSelect[count].push({
                                "sel": maskArr[i],
                                "Freq": $scope.rfRegionAuFreqSet[item].Freq[i],
                                "BW": $scope.rfRegionAuFreqSet[item].BandWidth
                                });
                        }
                        $scope.FreqRegZSelect[count].push({ // channel standard
                            "sel": stdMaskArr[count],
                            "Freq": $scope.rfRegionAuFreqSet['8'].Freq[count],
                            "BW": $scope.rfRegionAuFreqSet['8'].BandWidth
                            });
                        count++;
                    }
                }
            }
            $scope.onRegionFreqChange();
        }else{
            $scope.bFreqRegNQuickSetting = false;
            $scope.bFreqRegZQuickSetting = false;
        }

        //LoRaWan mode and Region E or J or T or R or K or D
        if(parseInt($scope.RFConfig.Md) === Advantech.Profile.LoRaRfOperationMode.LORA_WAN && typeof $scope.RFConfig.MIe !== "undefined" &&
            (parseInt($scope.RFConfig.Reg) === 69 ||
            parseInt($scope.RFConfig.Reg) === 74 ||
            parseInt($scope.RFConfig.Reg) === 84 ||
            parseInt($scope.RFConfig.Reg) === 82 ||
            parseInt($scope.RFConfig.Reg) === 75 ||
            parseInt($scope.RFConfig.Reg) === 68)
        ){
            length = $scope.RFConfig.Fltr.length;
            if(parseInt($scope.RFConfig.Reg) === 69){
                $scope.bFreqRegEQuickSetting = true;
                $scope.bFreqRegJQuickSetting = false;
                $scope.bFreqRegTQuickSetting = false;
                $scope.bFreqRegRQuickSetting = false;
                $scope.bFreqRegKQuickSetting = false;
                $scope.bFreqRegDQuickSetting = false;
                $scope.FreqRegESel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegESel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }else if (parseInt($scope.RFConfig.Reg) === 84){
                $scope.bFreqRegEQuickSetting = false;
                $scope.bFreqRegJQuickSetting = false;
                $scope.bFreqRegTQuickSetting = true;
                $scope.bFreqRegRQuickSetting = false;
                $scope.bFreqRegKQuickSetting = false;
                $scope.bFreqRegDQuickSetting = false;
                $scope.FreqRegTSel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegTSel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }

                if (parseInt($scope.RFConfig.Md) === Advantech.Profile.LoRaRfOperationMode.LORA_WAN) {
                    if (isNaN($scope.RFConfig.MIs)) {
                        $scope.RFConfig.MIs = 255; // default: user define
                        for (i = 0; i < length; i++) {
                            UserDefineFreqRegT.push({ "UserFlag": true, "Freq": $scope.RFConfig.Fltr[i] / 1000 }); //convert Hz to
                        }
                    }

                    $scope.onRegionFreqChange();
                }
            }else if (parseInt($scope.RFConfig.Reg) === 74){
                $scope.bFreqRegEQuickSetting = false;
                $scope.bFreqRegJQuickSetting = true;
                $scope.bFreqRegTQuickSetting = false;
                $scope.bFreqRegRQuickSetting = false;
                $scope.bFreqRegKQuickSetting = false;
                $scope.bFreqRegDQuickSetting = false;
                $scope.FreqRegJSel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegJSel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }else if (parseInt($scope.RFConfig.Reg) === 82){
                $scope.bFreqRegEQuickSetting = false;
                $scope.bFreqRegJQuickSetting = false;
                $scope.bFreqRegTQuickSetting = false;
                $scope.bFreqRegRQuickSetting = true;
                $scope.bFreqRegKQuickSetting = false;
                $scope.bFreqRegDQuickSetting = false;
                $scope.FreqRegRSel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegRSel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }else if (parseInt($scope.RFConfig.Reg) === 75){
                $scope.bFreqRegEQuickSetting = false;
                $scope.bFreqRegJQuickSetting = false;
                $scope.bFreqRegTQuickSetting = false;
                $scope.bFreqRegRQuickSetting = false;
                $scope.bFreqRegKQuickSetting = true;
                $scope.bFreqRegDQuickSetting = false;
                $scope.FreqRegKSel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegKSel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }else if (parseInt($scope.RFConfig.Reg) === 68){
                $scope.bFreqRegEQuickSetting = false;
                $scope.bFreqRegJQuickSetting = false;
                $scope.bFreqRegTQuickSetting = false;
                $scope.bFreqRegRQuickSetting = false;
                $scope.bFreqRegKQuickSetting = false;
                $scope.bFreqRegDQuickSetting = true;
                $scope.FreqRegDSel = [];
                mask = Advantech.Utility.convertMaskToArray($scope.RFConfig.MIe, 8);
                for(i = 0; i < length; i++){
                    $scope.FreqRegDSel.push({"sel": mask[i], "Freq": $scope.RFConfig.Fltr[i]/1000 }); //convert Hz to KHz
                }
            }
        }else{
            $scope.bFreqRegEQuickSetting = false;
            $scope.bFreqRegJQuickSetting = false;
            $scope.bFreqRegTQuickSetting = false;
            $scope.bFreqRegRQuickSetting = false;
            $scope.bFreqRegKQuickSetting = false;
            $scope.bFreqRegDQuickSetting = false;
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

    $scope.btnWorkingModeClick = function(){
        var requestData = {};
        var url = URL_GENERAL_CONFIG;// + "/slot_" + $scope.slotId;
        requestData = $scope.workingMode;
        requestData.Md = parseInt(requestData.Md);

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadModeConfig();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
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
        if($scope.bFreqRegRQuickSetting){ //region R
            length = $scope.FreqRegRSel.length;
            for(i=0; i < length; i++){
                if($scope.FreqRegRSel[i].Freq === undefined ||
                    (parseInt($scope.FreqRegRSel[i].Freq) !==0 && ($scope.FreqRegRSel[i].Freq < 864000 || $scope.FreqRegRSel[i].Freq > 870000))){
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5> Frequency must be 864000 ~ 870000 or 0: Disabled</h5>");
                    return;
                }
            }
        }
        if($scope.bFreqRegKQuickSetting){ //region K
            length = $scope.FreqRegKSel.length;
            for(i=0; i < length; i++){
                if($scope.FreqRegKSel[i].Freq === undefined ||
                    (parseInt($scope.FreqRegKSel[i].Freq) !==0 && ($scope.FreqRegKSel[i].Freq < 920900 || $scope.FreqRegKSel[i].Freq > 923300))){
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5> Frequency must be 920900 ~ 923300 or 0: Disabled</h5>");
                    return;
                }
            }
        }
        if($scope.bFreqRegDQuickSetting){ //region D
            length = $scope.FreqRegDSel.length;
            for(i=0; i < length; i++){
                if($scope.FreqRegDSel[i].Freq === undefined ||
                    (parseInt($scope.FreqRegDSel[i].Freq) !==0 && ($scope.FreqRegDSel[i].Freq < 865000 || $scope.FreqRegDSel[i].Freq > 867000))){
                    Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<h5> Frequency must be 865000 ~ 867000 or 0: Disabled</h5>");
                    return;
                }
            }
        }

        if (confirm("Please make sure that the LoRa radio frequency list match with that of LoRaWAN Gateway.") == false) {
            return;
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
            if ($scope.isSupportMulitcastChannel) {
                requestData.MAC = $scope.RFConfig.MAC;
                requestData.MOs = $scope.RFConfig.MOs;
                requestData.MOe = $scope.RFConfig.MOe;
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
            if ($scope.isSupportMulitcastChannel) {
                requestData.MAC = $scope.RFConfig.MAC;
                requestData.MOs = $scope.RFConfig.MOs;
                requestData.MOe = $scope.RFConfig.MOe;
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
                    stdMaskArr = [];
                    stdMask = 0;
                    for(var item in $scope.FreqRegNSelect){
                        var maskArr = [];
                        var freqMask = 0;
                        length = $scope.FreqRegNSelect[item].length;
                        for(i=0; i < length; i++){
                            if (i == 8) { // channel standard
                                stdMaskArr.push(parseInt($scope.FreqRegNSelect[item][i].sel));
                            } else {
                                maskArr.push(parseInt($scope.FreqRegNSelect[item][i].sel));
                            }
                        }
                        freqMask = Advantech.Utility.convertArrayToMask(maskArr);
                        requestData.Msg.push(freqMask);
                    }
                    stdMask = Advantech.Utility.convertArrayToMask(stdMaskArr);
                    requestData.Msg.push(stdMask);
                }
            }
            if($scope.bFreqRegZQuickSetting){ //region Z
                requestData.MIs = parseInt($scope.RFConfig.MIs);
                if(requestData.MIs === 0xFF){
                    requestData.Msg = [];
                    stdMaskArr = [];
                    stdMask = 0;
                    for(var item in $scope.FreqRegZSelect){
                        var maskArr = [];
                        var freqMask = 0;
                        length = $scope.FreqRegZSelect[item].length;
                        for(i=0; i < length; i++){
                            if (i == 8) { // channel standard
                                stdMaskArr.push(parseInt($scope.FreqRegZSelect[item][i].sel));
                            } else {
                                maskArr.push(parseInt($scope.FreqRegZSelect[item][i].sel));
                            }
                        }
                        freqMask = Advantech.Utility.convertArrayToMask(maskArr);
                        requestData.Msg.push(freqMask);
                    }
                    stdMask = Advantech.Utility.convertArrayToMask(stdMaskArr);
                    requestData.Msg.push(stdMask);
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
            if($scope.bFreqRegRQuickSetting){ //region R
                length = $scope.FreqRegRSel.length;
                requestData.Fltr = [];
                for(i=0; i < length; i++){
                    requestData.Fltr.push($scope.FreqRegRSel[i].Freq * 1000);
                }
            }
            if($scope.bFreqRegKQuickSetting){ //region K
                length = $scope.FreqRegKSel.length;
                requestData.Fltr = [];
                for(i=0; i < length; i++){
                    requestData.Fltr.push($scope.FreqRegKSel[i].Freq * 1000);
                }
            }
            if($scope.bFreqRegDQuickSetting){ //region D
                length = $scope.FreqRegDSel.length;
                requestData.Fltr = [];
                for(i=0; i < length; i++){
                    requestData.Fltr.push($scope.FreqRegDSel[i].Freq * 1000);
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

    $scope.onRegionFreqChange = function(){
        if($scope.bFreqRegNQuickSetting){
            $scope.rfFreqRegNQuickSettingDesc = Advantech.Profile.LoRaWanUsQuickFreqSetDesc[$scope.RFConfig.MIs];
        }
        if($scope.bFreqRegZQuickSetting){
            $scope.rfFreqRegZQuickSettingDesc = Advantech.Profile.LoRaWanAuQuickFreqSetDesc[$scope.RFConfig.MIs];
        }
        if ($scope.bFreqRegTQuickSetting) {
            $scope.rfFreqRegTQuickSettingDesc = Advantech.Profile.LoRaWanAsQuickFreqSetDesc[$scope.RFConfig.MIs];
            length = 8; //$scope.FreqRegTSel.length;

            switch (int($scope.RFConfig.MIs)) {
                case 0:
                case 1:
                    for (i = 0; i < length; i++) {
                        if (UserDefineFreqRegT[i].UserFlag) {
                            UserDefineFreqRegT[i].Freq = $scope.FreqRegTSel[i].Freq;
                            UserDefineFreqRegT[i].UserFlag = false;
                        }
                        $scope.FreqRegTSel[i].Freq = $scope.rfFreqAsQuickSelectList[$scope.RFConfig.MIs].FreqVal[i];
                    }
                    break;
                case 255:
                    for (i = 0; i < length; i++) {
                        $scope.FreqRegTSel[i].Freq = UserDefineFreqRegT[i].Freq;
                        UserDefineFreqRegT[i].UserFlag = true;
                    }

                    break;
                default:
                    break;
            }
        }
    };

    $scope.isInputValid = function(){
        if(typeof($scope.UpdateConfig.PItv) == 'undefined' || $scope.UpdateConfig.PItv == null)
            return true;
        else if(int($scope.UpdateConfig.PItv) > 2592000 || int($scope.UpdateConfig.PItv) < $scope.PItv_min)
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

    $scope.changeAllCheckbox = function(isSelectAll, region) {
        if (region == 'US') {
            for (var key in $scope.FreqRegNSelect) {
                $scope.FreqRegNSelect[key].map(function(cell) {
                    cell.sel = isSelectAll ? 1 : 0;
                    return cell;
                });
            }
        } else if (region == 'AU') {
            for (var key in $scope.FreqRegZSelect) {
                $scope.FreqRegZSelect[key].map(function(cell) {
                    cell.sel = isSelectAll ? 1 : 0;
                    return cell;
                });
            }
        }
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

    $scope.inputValidate = function (event, name) {
        var data = $scope.dayLightSaving[name];
        var valid = false;
        switch (name) {
            case 'Tm':
                valid = !(typeof data == 'undefined' || data < 1 || data > 1440);
                break;
            case 'Ws':
            case 'We':
                valid = !(typeof data == 'undefined' || data < 1 || data > 6);
                break;
            case 'Hs':
            case 'He':
                valid = !(typeof data == 'undefined' || data < 0 || data > 23);
                break;
            case 'MIs':
            case 'MIe':
                valid = !(typeof data == 'undefined' || data < 0 || data > 59);
                break;
        }

        if (valid) {
            $(event.target)
                .next()
                .hide()
                .parent()
                .parent()
                .removeClass('has-error');
        } else {
            $(event.target)
                .next()
                .show()
                .parent()
                .parent()
                .addClass('has-error');
        }
    }

    $scope.formValidate = function () {
        $timeout(function() {
            $('#daylightSavingContext input[type=number]').trigger('keyup');
        }, 0);
    }

}]);

wiseApp.controller('pagesCtrl', ['$scope', '$compile', '$http', '$q', '$filter', '$timeout',
    function($scope, $compile, $http, $q, $filter, $timeout) {
    //Node: site Survey
    $scope.siteSurvey = {
        "surveyPacketAmount": 100,
        "surveyStatus": 'stop',
        "currentPacketSend": 0,
        "successPacketCount": 0,
        "failedPacketCount": 0,
        "bBtnClicked": false,
        "packetErrorRate": 0,
        "maxRssi": 0,
        "minRssi": 0,
        "avgRssi": 0,
        // "maxBackoffNumber": 0,
        // "minBackoffNumber": 0,
        // "avgBackoffNumber": 0,
        "totalNoAck": 0,
        "totalChannelBusy": 0,
        "LoRaStatus": 3,
        "LoRaStatusMap": {
            1: 'OTAA Connection Fail',
            2: 'LoRa Module Error',
            3: 'Module Is Not Ready, Please Wait...'
        },
        "numberOfRetries": 0,
        "defaultNumberOfRetries": 3,
        "maxSnr": 0,
        "minSnr": 0,
        "avgSnr": 0,
        "totalSegmentPacket": 0,
        "totalSuccessSegmentPacket": 0,
    };
    // $scope.hasTmOrErr = false;
    var totalRssi = 0;
    var totalSnr = 0;
    // var totalBackoffNumber = 0;
    var bPendingPacketStop = false;
    var curMaxRssi = -200;
    var curMinRssi = 0;
    var curMaxSnr = -128;
    var curMinSnr = 128;
    $scope.sendList = [];
    $scope.isShowDownload = false;
    $scope.isSupDownloadAttr = ('download' in document.createElement('a'));
    $scope.CSVData = '';
    $scope.failStatusEnum = {
        '0'    : 'No ACK',
        '-1000': 'LoRaWAN Busy',
        '-1001': 'LoRaWAN would block',
        '-1002': 'Service unknown',
        '-1003': 'Invalid parameter',
        '-1004': 'Invalid frequency',
        '-1005': 'Invalid data rate',
        '-1006': 'Invalid frequency and data rate',
        '-1009': 'The device is not in a LoRaWAN',
        '-1010': 'Payload length error',
        '-1011': 'The device is switched off',
        '-1012': 'Stack not initialized',
        '-1013': 'Service not supported',
        '-1014': 'Crypto failure',
        '-1015': 'Invalid port',
        '-1016': 'Connection in progress',
        '-1017': 'No active session',
        '-1018': 'Idle at the moment',
        '-1019': 'Cannot perform requested operation',
        '-1020': 'Transmission will continue after duty cycle back-off',
        '-1021': 'None of the channels is enabled at the moment',
        '-1022': 'None of the enabled channels is ready for another TX (duty cycle limited)',
        '-1023': 'Meta-data after an RX or TX is stale',
        '-1024': 'The device has already joined a network'
    };
    ///////////////
    //AP: packet status
    var globalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;
    $scope.moduleList = [];
    /////////////
    $scope.pageContent = 'survey';
    var targetContent = Advantech.Utility.RecordContextPageIdSingleton.getInstance().getTag();//get target content

    if(targetContent != null && typeof(targetContent) != 'undefined'){
        $scope.pageContent = targetContent;
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
            if ((typeof response.data.BR != 'undefined' && response.data.BR === 1) || response.data.Stat === 2) { // The site survey is in processing, poll the result again
                $scope.siteSurvey.currentPacketSend--;
                return sendSiteSurveyPacket();
            }
            // if (!$scope.hasTmOrErr && (typeof response.data.Tm != 'undefined' || typeof response.data.Err != 'undefined')) {
            //     $scope.hasTmOrErr = true;
            // }

            if(response.data.Stat == 1){
                $scope.siteSurvey.successPacketCount++;
                if (typeof response.data.Rssi != 'undefined') {
                    if(response.data.Rssi < curMinRssi){
                        $scope.siteSurvey.minRssi = response.data.Rssi;
                        curMinRssi = response.data.Rssi;
                    }
                    if(response.data.Rssi > curMaxRssi){
                        $scope.siteSurvey.maxRssi = response.data.Rssi;
                        curMaxRssi = response.data.Rssi;
                    }
                    totalRssi = totalRssi + response.data.Rssi;
                    $scope.siteSurvey.avgRssi = Number(totalRssi/$scope.siteSurvey.successPacketCount).toFixed(1);
                }
                if (typeof response.data.Sn != 'undefined') {
                    if(response.data.Sn < curMinSnr){
                        $scope.siteSurvey.minSnr = response.data.Sn;
                        curMinSnr = response.data.Sn;
                    }
                    if(response.data.Sn > curMaxSnr){
                        $scope.siteSurvey.maxSnr = response.data.Sn;
                        curMaxSnr = response.data.Sn;
                    }
                    totalSnr = totalSnr + response.data.Sn;
                    $scope.siteSurvey.avgSnr = Number(totalSnr/$scope.siteSurvey.successPacketCount).toFixed(1);
                }

                // if ($scope.hasTmOrErr) {
                //     if(response.data.Tm < $scope.siteSurvey.minBackoffNumber){
                //         $scope.siteSurvey.minBackoffNumber = response.data.Tm;
                //     }
                //     if (response.data.Tm > $scope.siteSurvey.maxBackoffNumber) {
                //         $scope.siteSurvey.maxBackoffNumber = response.data.Tm;
                //     }
                //     totalBackoffNumber += response.data.Tm;
                    // $scope.siteSurvey.avgBackoffNumber = Number(totalBackoffNumber/$scope.siteSurvey.successPacketCount).toFixed(1);
                // }
            }else{
                $scope.siteSurvey.failedPacketCount++;
                // if ($scope.hasTmOrErr) {
                    if (response.data.Err === 0) {
                        $scope.siteSurvey.totalNoAck++;
                    } else /*if (response.data.Err === 1)*/ {
                        $scope.siteSurvey.totalChannelBusy++;
                    }
                // }
            }

            if (typeof response.data.Total != 'undefined' && typeof response.data.Nm != 'undefined') {
                $scope.siteSurvey.totalSegmentPacket = $scope.siteSurvey.totalSegmentPacket + response.data.Total
                $scope.siteSurvey.totalSuccessSegmentPacket = $scope.siteSurvey.totalSuccessSegmentPacket + response.data.Nm

                $scope.sendList.unshift({
                    Stat:  response.data.Stat === 1 ? 'Success' : 'Failed',
                    Err:   response.data.Stat === 1 ? 'none' : $scope.failStatusEnum[response.data.Err],
                    Total: response.data.Total,
                    Nm:    response.data.Nm,
                    Rssi:  response.data.Rssi,
                    Sn:    response.data.Sn,
                    SEn:   $scope.siteSurvey.currentPacketSend,
                    data:  response.data,
                    textColor: response.data.Stat === 1 ? {color:'#428bca'} : {color:'#d9534f'}
                });
                if ($scope.siteSurvey.currentPacketSend == $scope.siteSurvey.surveyPacketAmount) {
                    $scope.sendList.unshift({
                        Stat:  '',
                        Err:   '',
                        Total: $scope.siteSurvey.totalSegmentPacket,
                        Nm:    $scope.siteSurvey.totalSuccessSegmentPacket,
                        Rssi:  '',
                        Sn:    '',
                        SEn:   'Total',
                        textColor: {color:'#31708f'}
                    });
                }
            }

            $scope.$digest();

            if(bPendingPacketStop==false && $scope.siteSurvey.surveyStatus == 'start' && $scope.siteSurvey.currentPacketSend < $scope.siteSurvey.surveyPacketAmount)
                sendSiteSurveyPacket();
            else{
                $scope.siteSurvey.surveyStatus = 'stop';
                bPendingPacketStop = false;
                //calculate result
                $scope.siteSurvey.packetErrorRate = Number(($scope.siteSurvey.failedPacketCount/$scope.siteSurvey.currentPacketSend) * 100).toFixed(1) + " %";
                if ($scope.siteSurvey.failedPacketCount == $scope.siteSurvey.surveyPacketAmount) {
                    $scope.siteSurvey.minRssi = 'none';
                    $scope.siteSurvey.maxRssi = 'none';
                    $scope.siteSurvey.avgRssi = 'none';
                    $scope.siteSurvey.minSnr = 'none';
                    $scope.siteSurvey.maxSnr = 'none';
                    $scope.siteSurvey.avgSnr = 'none';
                }
                genCSVData();
                $scope.$digest();
            }
        }, function(error) {
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            $scope.siteSurvey.surveyStatus = 'stop';
            bPendingPacketStop = false;
            angularShowHttpErrorMessage(error);
        });
    }

    function genCSVData() {
        var _CSVData = '';
        _CSVData += 'Sequence,Result,Total Segmental Packets,Success Segmental Packets,RSSI,SNR,Fail Status\r\n';
        $scope.sendList.forEach(function(item) {
            _CSVData += item.SEn;
            _CSVData += ',';
            _CSVData += item.Stat;
            _CSVData += ',';
            _CSVData += item.Total;
            _CSVData += ',';
            _CSVData += item.Nm;
            _CSVData += ',';
            _CSVData += item.Rssi;
            _CSVData += ',';
            _CSVData += item.Sn;
            _CSVData += ',';
            _CSVData += typeof item.data == 'undefined' ? '' : item.data.Err;
            _CSVData += '\r\n';
        });

        if ($scope.isSupDownloadAttr) {
            $scope.CSVData += 'text/csv;charset=utf-8,' + encodeURIComponent(_CSVData);
        } else {
            $scope.CSVData = _CSVData;
        }

        $scope.isShowDownload = true;
    }

    function getApPacketStatus(bInitial){
        globalTimer.ClearTimer();
		if(bInitial){
			Advantech.Form.WaitingForm.getInstance().showPleaseWait();
		}

        $http({
            method: 'GET',
            url: URL_LPWAN_DIAGNOSIS + '/slot_0',
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            $scope.moduleList = response.data.Dev;
            $scope.moduleList = $filter('orderBy')($scope.moduleList, "SLs", false);//angular sort by SLs : (list, columnToOrder, reverse)
			if(bInitial){
				Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
			}
            $scope.$digest();
			if(Advantech.Utility.RecordContextPageIdSingleton.getInstance().getTag() === "apPacketStatus"){
				globalTimer.EnableTimer(function(){getApPacketStatus()}, pollingRate);
			}
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function getLoRaStatus() {
        // try {
        //     // call c# function for derestrict timeout setting
        //     window.external.VComWebUtilitySyncCallBackFun('start_site_survy_sub1G', '');
        // } catch(e) {

        // }
        Advantech.Utility.callExternalFun('start_site_survy_sub1G', '');

        Advantech.Utility.TimerDispatchSingleton.getInstance().ClearTimer();
        $http({
            method: 'GET',
            url: URL_SITE_SURVEY_CONFIG + '/slot_0',
            params: {s: new Date().getTime()}
        })
        .then(function(response) {
            $scope.siteSurvey.LoRaStatus = response.data.Stat;
            $scope.siteSurvey.numberOfRetries = response.data.Cntn;
            if (typeof response.data.Des != 'undefined') {
                $scope.siteSurvey.defaultNumberOfRetries = response.data.Des;
            }
            if (typeof response.data.Nm != 'undefined') {
                $scope.siteSurvey.SizeOfPacket = response.data.Nm;
            }
            $scope.$digest();
            if (response.data.Stat === 3) {
                Advantech.Utility.TimerDispatchSingleton.getInstance().EnableTimer(function(){getLoRaStatus();}, Advantech.Profile.Parameter.POLLING_RATE);//create timer
            }
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnSiteSurveyClick = function(enable){
        $scope.siteSurvey.bBtnClicked = true;

        if(enable == 1){
            $scope.siteSurvey.surveyStatus = 'start';
            $scope.siteSurvey.currentPacketSend = 0;
            $scope.siteSurvey.successPacketCount = 0;
            $scope.siteSurvey.failedPacketCount = 0;
            $scope.siteSurvey.packetErrorRate = 'Please Wait...';
            $scope.siteSurvey.maxRssi = 0;
            $scope.siteSurvey.minRssi = 0;
            $scope.siteSurvey.avgRssi = 0;
            $scope.siteSurvey.maxSnr = 0;
            $scope.siteSurvey.minSnr = 0;
            $scope.siteSurvey.avgSnr = 0;
            // $scope.siteSurvey.maxBackoffNumber = 0;
            // $scope.siteSurvey.minBackoffNumber = 0;
            // $scope.siteSurvey.avgBackoffNumber = 0;
            $scope.siteSurvey.totalNoAck = 0;
            $scope.siteSurvey.totalChannelBusy = 0;
            $scope.siteSurvey.totalSegmentPacket = 0;
            $scope.siteSurvey.totalSuccessSegmentPacket = 0;
            totalRssi = 0;
            totalSnr = 0;
            // totalBackoffNumber = 0;
            curMaxRssi = -200;
            curMinRssi = 0;
            curMaxSnr = -128;
            curMinSnr = 128;
            $scope.sendList = [];
            $scope.isShowDownload = false;
            $scope.CSVData = '';
            var requestData = {};
            requestData.Cntn = parseInt($scope.siteSurvey.numberOfRetries);
            if (typeof $scope.siteSurvey.SizeOfPacket != 'undefined') {
                requestData.Nm = parseInt($scope.siteSurvey.SizeOfPacket, 10);
            }
            $http({
                method: 'PATCH',
                url: URL_SITE_SURVEY_CONFIG + '/slot_0',
                data: requestData
            })
            .then(function(response) {
                sendSiteSurveyPacket();
            }, function(error) {
                angularShowHttpErrorMessage(error);
            });
        }else{
            bPendingPacketStop = true;
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
            //     window.external.VComWebUtilitySyncCallBackFun('end_site_survy_sub1G', '');
            // } catch(e) {

            // }
            Advantech.Utility.callExternalFun('end_site_survy_sub1G', '');

            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            Advantech.Utility.switchToTagetHtml("index",ABSOLUTE_PATH+"/index.html");
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.btnSaveDataClick = function() {
        window.navigator.msSaveOrOpenBlob(new Blob([$scope.CSVData], {type: 'text/csv'}), 'data.csv');
    }

    if($scope.pageContent == "apPacketStatus"){
        getApPacketStatus(true);
    }

    if ($scope.pageContent == 'survey') {
        getLoRaStatus();
    }
}])
.directive('toggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.toggle == 'tooltip' && element.hasClass('siteSurveyTooltip')) {
                $(element).tooltip();
            }
        }
    };
});

wiseApp.controller('MeterCtrl', ['$scope', '$compile', '$http', '$q', '$filter', '$timeout',
    function($scope, $compile, $http, $q, $filter, $timeout) {

    var meterConfigs = {};
    var channelAmount = 0;
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var pollingRate = 5000;//larger interval for Sub-1G
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    var slotId = recordObj.getSlotId();
    $scope.activeTab = 'status'; //default active tab
    $scope.ObjMeterStatus = {
        '0': 'No error',
        '1': 'Data is not ready (It don’t poll the value yet)',
        '2': 'Timeout',
        '3': 'Invalid Meter'
    };
    $scope.ObjMeterType = {
        '0': 'Water meter (IZAR)',
        '1': 'Electric Meter (EBA-43)',
        '2': 'Electric Meter with Card Reader (EBI-21)',
        '3': 'Air Conditioner Data'
    };
    $scope.meterValueList = {
        1: [
            {name: 'A 相電壓Vrms_A (0.01V)'},
            {name: 'B 相電壓Vrms_B (0.01V)'},
            {name: 'C 相電壓Vrms_C (0.01V)'},
            {name: 'A 相電流Irms_A (0.01A)'},
            {name: 'B 相電流Irms_B (0.01A)'},
            {name: 'C 相電流Irms_C (0.01A)'},
            {name: '瞬時實功率(正,負) Inst. W (W)'},
            {name: '總累積瓦時值 (Whi) (import)'},
            {name: 'Inst. Power Factor (0.01)'},
            {name: 'Date/Time'}
        ],
        2: [
            {name: 'A 相電壓Vrms_A (0.01V)'},
            {name: 'B 相電壓Vrms_B (0.01V)'},
            {name: 'A 相電流Irms_A (0.01A)'},
            {name: 'B 相電流Irms_B (0.01A)'},
            {name: '總實功率(正,負)(W)'},
            {name: '總累積瓦時值 (Whi)(Wh)'},
            {name: 'CRM Balance (0.1元)'},
            {name: 'cardAlarmValue (0.01元)'},
            {name: '卡片序號 SN'},
            {name: 'Card Type/Status'},
            {name: 'Relay Status'},
            {name: 'CRM Status 讀卡機狀態'},
            {name: 'Date/Time'},
            {name: 'RelayOffDelayTime (10ms)'},
            {name: 'Billing Mode'},
            {name: '卡片每單位電量收費(Wh)'},
            {name: '卡片每單位電量收費(0.001元)'},
            {name: '電表每單位電量收費(0.1kWh)'},
            {name: '電表每單位電量收費(0.01元)'}
        ],
        3: [
            {name: '電源開關'},
            {name: '運轉模式'},
            {name: '風速設定'},
            {name: '設定溫度'},
            {name: '室內溫度'},
            {name: '濾網清洗通知'},
            {name: '室內溼度顯示功能'},
            {name: '節能運轉'},
            {name: '有線控制器、無線遙控器禁止'},
            {name: '室外溫度'},
            {name: '室外機即時功率'},
            {name: '錯誤訊息顯示'}
        ],
    }
    $scope.channelSelectList = {};
    $scope.meterValues;
    $scope.channelObj = {};
    $scope.selectedChannel = {"ch": 0};

    $scope.switchTabTo = function(tabId) {
        if($scope.activeTab == tabId)
            return;
        $scope.activeTab = tabId;
        gobalTimer.ClearTimer();
        if (tabId == "status") {
            loadMeterValue();
        }else if (tabId == "config") {
            loadMeterConfig();
        }
    };

    $scope.isTabShow = function(tabId) {
        if (tabId == $scope.activeTab)
            return true;
        else
            return false;
    };

    $scope.showMeterValue = function(index){
        if(Array.isArray($scope.channelObj.Val)){
            if ($scope.channelObj.UID === 1 && index === 9) { // Date/Time
                return dateConvert($scope.channelObj.Val[index]);
            }
            if ($scope.channelObj.UID === 2) {
                var value = '';
                switch (index) {
                    case 9: // Card Type/Status
                        switch ($scope.channelObj.Val[index] & 0xFF) { // byte 0
                            case 16:
                                value += '計費卡，';
                                break;
                            case 17:
                                value += '免費卡，';
                                break;
                            case 18:
                                value += '強制卡，';
                                break;
                            case 255:
                                value += '未插卡，';
                                break;
                        }
                        value += $scope.channelObj.Val[index] >> 8 === 0 ? '正常' : '黑名單卡'; // byte 1
                        break;
                    case 11: // CRM Status
                        var mskArray = Advantech.Utility.convertMaskToArray($scope.channelObj.Val[index], 3);
                        value += mskArray[0] === 0 ? '電表不接讀卡機<br>' : '電表要接讀卡機<br>';
                        value += mskArray[1] === 0 ? '卡片正常<br>' : '卡片屬黑名單<br>';
                        value += mskArray[2] === 0 ? '讀卡機連線正常' : '讀卡機連線斷線';
                        break;
                    case 12: // Date/Time
                        value = dateConvert($scope.channelObj.Val[index]);
                        break;
                    default:
                        value = $scope.channelObj.Val[index];
                }
                return value;
            }
            return $scope.channelObj.Val[index];
        }else{
            return "-";
        }
    };

    function dateConvert (dateHex) {
        if (typeof dateHex != 'string' || dateHex.length != 12) {
            return '-';
        }

        // dateHex: 15090F0A251C = year: 0x15 + 2000, month: 0x09, day: 0x0F, hour: 0x0A, minute: 0x25, second: 0x1C
        var year = parseInt(dateHex.substring(0, 2), 16) + 2000;
        var month = ('00' + parseInt(dateHex.substring(2, 4), 16)).slice(-2);
        var day = ('00' + parseInt(dateHex.substring(4, 6), 16)).slice(-2);
        var hour = ('00' + parseInt(dateHex.substring(6, 8), 16)).slice(-2);
        var minute = ('00' + parseInt(dateHex.substring(8, 10), 16)).slice(-2);
        var second = ('00' + parseInt(dateHex.substring(10, 12), 16)).slice(-2);

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    function assignChannelValue(){
        var i;
        if(Array.isArray($scope.channelObj.Val)){
            $scope.channelObj.value = $scope.channelObj.Val;
        }
        for(i=0; i < channelAmount; i++){
            if(Array.isArray($scope.meterValues[i].Val)){
                meterConfigs[i].value = $scope.meterValues[i].Val.toString();
            }else{
                meterConfigs[i].value = $scope.meterValues[i].Val;
            }
        }
    }

    function convertMeterValueMaskToArray(mask){
        var i;
        var destArr = [];
        var arr = Advantech.Utility.convertMaskToArray(mask, $scope.meterValueList.length);
        for(i=0; i < arr.length; i++){
            destArr.push({val: arr[i]});
        }
        return destArr;
    }

    function convertMeterValueArrayToMask(hashArr){
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

    function loadMeterProfile() {
        $http({
            method: 'GET',
            url: URL_PROFILE + '/slot_' + slotId,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            channelAmount = response.data.Mn;
            // for(var i=0; i < channelAmount; i++)
            //     $scope.channelSelectList[i] = i;
            // $scope.channelSelectList = Object.keys($scope.channelSelectList).sort(function(a, b) {
            //     return Number($scope.channelSelectList[a]) > Number($scope.channelSelectList[b]);
            // });
            if($scope.activeTab === "status") {
                loadMeterValue();
            }else if($scope.activeTab === "config") {
                loadMeterConfig();
            }
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    function loadMeterConfig() {
        // $http({
        //     method: 'GET',
        //     url: URL_METER_CONFIG + '/slot_' + slotId,
        //     params: { 's': new Date().getTime() }
        // })
        // .then(function(response) {
        //     meterConfigs = response.data.MCfg;
        //     $scope.channelObj = meterConfigs[$scope.selectedChannel.ch];
        //     $scope.channelObj.arrMeterValue = convertMeterValueMaskToArray($scope.channelObj.SLgD);
        //     $scope.$digest();
        // }, function(error) {
        //     angularShowHttpErrorMessage(error);
        // });
    }

    function loadMeterValue() {
        gobalTimer.ClearTimer();
        $http({
            method: 'GET',
            url: URL_METER_VALUE + '/slot_' + slotId,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            // $scope.meterValues = response.data.MVal;
            // $scope.channelObj = $scope.meterValues[$scope.selectedChannel.ch];
            // meterConfigs = $scope.meterValues;
            $scope.channelObj = response.data;
            // assignChannelValue();
            $scope.$digest();
            if($scope.activeTab == "status"){
                gobalTimer.EnableTimer(function(){loadMeterValue()}, pollingRate);//create timer
            }
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    /////Event Handler////////////////////////////////////////////
    $scope.onValueChannelChange = function(selectedChannel){
        $scope.channelObj = $scope.meterValues[selectedChannel];
        assignChannelValue();
    };
    $scope.onTableRowClick = function(selectedChannel){
        $scope.selectedChannel.ch = selectedChannel;
        $scope.channelObj = $scope.meterValues[selectedChannel];
        assignChannelValue();
    };

    $scope.onConfigChannelChange = function(selectedChannel){
        $scope.channelObj = meterConfigs[selectedChannel];
        $scope.channelObj.arrMeterValue = convertMeterValueMaskToArray($scope.channelObj.SLgD);
    };

    $scope.onMeterConfigClick = function(){
        var requestData = {};
        requestData.Ch  = Number($scope.channelObj.Idx);
        requestData.En  = Number($scope.channelObj.En);
        requestData.UID = Number($scope.channelObj.UID);
        requestData.Id = Number($scope.channelObj.Id);
        requestData.SLgD = convertMeterValueArrayToMask($scope.channelObj.arrMeterValue);

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: URL_METER_CONFIG + '/slot_' + slotId + "/ch_" + $scope.selectedChannel.ch,
            data: requestData
        })
        .then(function(response) {
            loadMeterConfig();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            httpInProgress = false;
            angularShowHttpErrorMessage(error);
        });
    };

    loadMeterProfile();
}])
.directive('toggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.toggle == 'tooltip' && element.hasClass('meterValueTooltip')) {
                $(element).tooltip();
            }
        }
    };
});
