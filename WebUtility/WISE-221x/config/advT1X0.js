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
                    advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("accessCtrl", "access_ctrl.html", "Access Control"));
                    advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("dataLog", "data_log.html", "Data Logger"));
                    //advancedFunctions.push(new Advantech.Data.AdvancedFunctionPageInfo("diagnostic", "diagnostic.html", "Diagnostician"));
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
        WlanOperationModeEmun: {
            "0": "Infrastructure Mode",
            "1": "Reserved",
            "2": "AP Mode",
        },
		Sub1GRfWorkingModeEmun: {
            "0": "Push Mode",
            "1": "Paring Mode"
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
                var BATTERY_STATUS = {"0": "No Error", "1": "Low Voltage", "2": "Run out of battery", "3": "No battery installed"};
                var POWER_SOURCE_NAME = {"1": "Line Power", "2": "Device Battery"};
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
                    //_$SignalControl = _$Panel.find("#divRssi");
                    handleRefreshed();
                };
                this.setPanel = function(jsonObj) {
                    var powerArray;
                    var powerArrayLen = 2;
                    powerArray = Advantech.Utility.convertMaskToArray(jsonObj.Pw, powerArrayLen);

					if(Advantech.Profile.VCOM_CONNECTION == false){//AP
						_$Panel.find(".BatteryStatus").hide();
                        _$Panel.find(".BatteryLevel").hide();
						_$Panel.find(".PowerType").hide();
						_$Panel.find("#divRtcBat").html(BATTERY_STATUS[jsonObj.LB]);
					}else{//Node
						var powerType = "";
                        if(powerArray[0] == 1){ //line power
                            powerType = "Line Power";
                            _$Panel.find(".BatteryStatus").hide();
                            _$Panel.find(".BatteryLevel").hide();
                        }
                        if(powerArray[1] == 1){ //battery power
							if(powerType != ""){
								powerType += ", Battery";
							}else{
								powerType = "Battery";
							}
                            _$Panel.find("#divMainBat").html(BATTERY_STATUS[jsonObj.BR]);
                            _$Panel.find("#divMainBatLevel").html(jsonObj.Val + " %");
                            _$Panel.find(".BatteryStatus").show();
                            _$Panel.find(".BatteryLevel").show();
                        }
						_$Panel.find("#divPowerType").html(powerType);
						_$Panel.find("#divRtcBat").html(BATTERY_STATUS[jsonObj.LB]);
					}
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

                this.setNetworkConfig = function(jsonObj) {
                    try {
                        $("#" + _Self.getPanelId() + " #inpIP").val(jsonObj.IP);
                        $("#" + _Self.getPanelId() + " #inpMsk").val(jsonObj.Msk);
                        $("#" + _Self.getPanelId() + " #inpGW").val(jsonObj.GW);
                        $("#" + _Self.getPanelId() + " #inpMAC").val(jsonObj.MAC);
                        $("#" + _Self.getPanelId() + " input[value=" + jsonObj.DHCP + "]").prop('checked', true).trigger('click');
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

                this.initialForm = function(advancedFunctions, userTypeObj) {
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

                //Sub Node menu item
                var initialSoltInforamtionListView = function() {
                    var htmlCode = '';
                    htmlCode += '<a href ="#" id="endDevices">';
                    htmlCode += "<i class='fa fa-fw fa-sitemap'></i> End Devices";
                    htmlCode += "</a>";
                    $("#" + _Self.getContainerId() + " #soltInfoListViewItem").append(htmlCode);
                    $("#" + _Self.getContainerId() + ' #soltInfoListViewItem #endDevices').on('click', function(e) {
                        Advantech.Utility.loadAjaxContent(null, "/config/end_device.html", null, null, true);
                    });
                    /*
                    htmlCode = '<a href="#" id="fwUpload">';
                    htmlCode += "<i class='fa fa-fw fa-sitemap'></i> Firmware Upload";
                    htmlCode += "</a>";
                    $("#" + _Self.getContainerId() + " #soltInfoListViewItem").append(htmlCode);
                    $("#" + _Self.getContainerId() + ' #soltInfoListViewItem #fwUpload').on('click', function(e) {
						//Advantech.Utility.loadAjaxContent(null, "/config/pages.html", null, null, true);
                    });*/
                    /*
                    htmlCode = '<a href="#" id="siteSurvey">';
                    htmlCode += "<i class='fa fa-fw fa-gear'></i> Site Survey";
                    htmlCode += "</a>";
                    $("#" + _Self.getContainerId() + " #soltInfoListViewItem").append(htmlCode);
                    $("#" + _Self.getContainerId() + ' #soltInfoListViewItem #siteSurvey').on('click', function(e) {
                        $("#CommonConfirmModal #confirmModalLabel").html("Please Confirm");
                        $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>Module will enter Site Survey mode. Other operation is not allowed.<br/>Do you want to proceed?");
                        $("#CommonConfirmModal").modal("show");
                        $("#CommonConfirmModal #btnCommonConfirm").one("click", function(){
                            httpGetOperation(HTTP_PATCH, URL_SITE_SURVEY_CONFIG + '/slot_0',
                                    function(){
                                        $("#" + _Self.getContainerId() + ' #soltInfoListViewItem #siteSurvey').unbind('click');
                                        $("#CommonConfirmModal").modal("hide");
                                        //hide all other menu
                                        $("#" + _Self.getContainerId() + " #dashboard").hide();
                                        $("#" + _Self.getContainerId() + " #mainMenuConfig").hide();
                                        $("#" + _Self.getContainerId() + " #soltInfoListViewItem #endDevices").hide();
                                        Advantech.Utility.loadAjaxContent(null, "/config/pages.html", "siteSurvey", null, true); //must set siteSurvey tag
                                    },
                                    function(){
                                        Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>Error occurs when enter Site Survery Mode! Please restart module!");
                                    }, JSON.stringify({"En": 1}));
                        });
                    }); */
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
                var mWorkingMode = 0; //private
                var mIoWorkingMode = 0; //private: working mode of io board
				var mRfMode = 0; //private
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
        Advantech.Utility.serverErrorPage("Connection Failed", "Polling failed more than 5 times. Please check network connection or related errors!");
    }
}

wiseApp.controller('SensorCtrl', ['$scope', '$http', '$element', 'filteredListService', '$window', '$filter', '$timeout', '$compile',
    function($scope, $http, $element, filteredListService, $filter, $timeout, $compile) {
    $scope.activeTab = 'status'; //default active tab
    $scope.statusActiveTab = 'status_current'; //default active tab
    //for sensor value
    //$scope.rangeSelectList = Advantech.Profile.SensorRangeEmun;
    $scope.DefalutRngList = Advantech.Profile.DefaultRangeEmun;
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
                            RCD: 0,
                        };
    $scope.channelTableObj = {};
    //for sensor config
    $scope.sensorConfigs;
    $scope.IsTemperature = true;
    //global
    var channelAmount = 0;
    $scope.selectedChannel = {"ch": 0};
    var httpInProgress = false;
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    var slotId = recordObj.getSlotId();
    var WriteStatus = 1;

	if(Advantech.Profile.VCOM_CONNECTION)
		pollingRate = Advantech.Profile.Parameter.VCOM_POLLING_RATE;//larger interval for end device
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
        }/*else if (tabId == "trend") {
            loadDiagnosticData(false);
            gobalTimer.EnableTimer(function(){loadDiagnosticData(true)}, pollingRate);//create timer
        }*/
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
            for(i=0; i< channelAmount;i++){
                if($scope.channelTableObj[i].En == 1)
                    $scope.channelTableObj[i].value = $scope.sensorValues[i].EgF;
                else
                    $scope.channelTableObj[i].value = 'Disabled';
            }
        }else if (tabId == "status_max") {
            $scope.channelObj.value = $scope.channelObj.HEgF;
            for(i=0; i< channelAmount;i++){
                if($scope.channelTableObj[i].En == 1)
                    $scope.channelTableObj[i].value = $scope.sensorValues[i].HEgF;
                else
                    $scope.channelTableObj[i].value = 'Disabled';
                //$scope.channelTableObj[i].value = $scope.sensorValues[i].HEgF;
            }
        }else if (tabId == "status_min") {
            $scope.channelObj.value = $scope.channelObj.LEgF;
            for(i=0; i< channelAmount;i++){
                if($scope.channelTableObj[i].En == 1)
                    $scope.channelTableObj[i].value = $scope.sensorValues[i].LEgF;
                else
                    $scope.channelTableObj[i].value = 'Disabled';
                //$scope.channelTableObj[i].value = $scope.sensorValues[i].LEgF;
            }
        }
//        $scope.channelObj.RangeName = $scope.rangeSelectList[$scope.channelObj.Ch][$scope.channelObj.Rng].name;
//        $scope.channelObj.UnitName = $scope.rangeSelectList[$scope.channelObj.Ch][$scope.channelObj.Rng].unit;
    }

    function loadSensorProfile() {
        $http({
            method: 'GET',
            url: URL_PROFILE + '/slot_' + slotId,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            channelAmount = response.data.Sn;
            //$scope.rangeSelectList = new Array(channelAmount);
            for(var i=0; i < channelAmount; i++)
                $scope.channelSelectList[i] = i;

            //InitInterval();

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
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: URL_SENSOR_CONFIG + '/slot_' + slotId,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.sensorConfigs = response.data.SCfg;
            $scope.channelObj = $scope.sensorConfigs[$scope.selectedChannel.ch];
            if(Number($scope.channelObj.Rng) == 4128)
                $scope.CurrentList = Advantech.Profile.HumidityRangeEmun;
            else
                $scope.CurrentList = Advantech.Profile.TemperatureRangeEmun;

            if(Number($scope.channelObj.RCD) == 4128)
                $scope.CurrentOffsetList = Advantech.Profile.HumidityRangeEmun;
            else
                $scope.CurrentOffsetList = Advantech.Profile.TemperatureRangeEmun;
            //$scope.channelObj.Rng = $scope.channelObj.Rng + "";
            //$scope.channelObj.RCD = $scope.channelObj.RCD + "";
            //$scope.channelObj.OffsetUnitName = $scope.rangeSelectList[$scope.channelObj.RCD].unit;;
            //$scope.channelTableObj = $scope.sensorConfigs;
            for(var i=0; i < channelAmount; i++){
                var range = $scope.sensorConfigs[i].Rng;
                var offsetrange = $scope.sensorConfigs[i].RCD;
                $scope.channelTableObj[i].RangeName = $scope.DefalutRngList[range].name;
                $scope.sensorConfigs[i].UnitName = $scope.DefalutRngList[range].unit;
                $scope.sensorConfigs[i].OffsetUnitName = $scope.DefalutRngList[offsetrange].unit;
                //$scope.sensorConfigs[i].UnitName = $scope.rangeSelectList[range].unit;
                $scope.channelTableObj[i].EventName = Advantech.Profile.SensorChannelEventEmun[$scope.channelTableObj[i].Evt];
            }
            //$scope.SetCurrentRangeList($scope.channelObj.Rng);
            //assignChannelValue();
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }
    function loadSensorValue() {
        gobalTimer.ClearTimer();
        $http({
            method: 'GET',
            url: URL_SENSOR_VALUE + '/slot_' + slotId,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.sensorValues = response.data.SVal;
            $scope.channelObj = $scope.sensorValues[$scope.selectedChannel.ch];
            $scope.channelTableObj = $scope.sensorValues;
            for(var i=0; i< channelAmount; i++){
                var range = $scope.channelTableObj[i].Rng;
                $scope.channelTableObj[i].RangeName = $scope.DefalutRngList[range].name;
				if($scope.channelTableObj[i].En == 1)
					$scope.channelTableObj[i].UnitName = $scope.DefalutRngList[range].unit;
				else
					$scope.channelTableObj[i].UnitName = '';
                //$scope.channelTableObj[i].RangeName = $scope.rangeSelectList[range].name;
                //$scope.channelTableObj[i].UnitName = $scope.rangeSelectList[range].unit;
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
    }
    $scope.onTableRowClick = function(selectedChannel){
        $scope.selectedChannel.ch = selectedChannel;
        $scope.channelObj = $scope.sensorValues[selectedChannel];
        assignChannelValue();
    }

    $scope.onClearLowAlarmClick = function(){
/*        if($scope.channelObj.LoA == 0)
            return;*/
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
    }

    $scope.onClearHighAlarmClick = function(){
        /*if($scope.channelObj.HiA == 0)
            return;*/
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
    }

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
    }

    $scope.onConfigChannelChange = function(selectedChannel){
        $scope.channelObj = $scope.sensorConfigs[selectedChannel];
        if(Number($scope.channelObj.Rng) == 4128)
            $scope.CurrentList = Advantech.Profile.HumidityRangeEmun;
        else
            $scope.CurrentList = Advantech.Profile.TemperatureRangeEmun;
        $scope.channelObj.Rng = $scope.channelObj.Rng + "";

        if(Number($scope.channelObj.RCD) == 4128)
            $scope.CurrentOffsetList = Advantech.Profile.HumidityRangeEmun;
        else
            $scope.CurrentOffsetList = Advantech.Profile.TemperatureRangeEmun;
        $scope.channelObj.RCD = $scope.channelObj.RCD + "";
        //$scope.$apply();
        //$scope.channelObj.UnitName = $scope.rangeSelectList[$scope.channelObj.Rng].unit;
    }

    $scope.CheckHum = function(Range){
        //$scope.$digest();
        if(Number(Range) == 4128)
            return true;
        else
            return false;
        //return (Number(Range) == 4128)? true: false;
    }

    $scope.CheckTmp = function(Range){
        //$scope.$digest();
        if(Number(Range) != 4128)
            return true;
        else
            return false;
        //return (Number(Range) != 4128)? true: false;
    }

    $scope.onRangeChange = function(Range){
        $scope.channelObj.UnitName = $scope.DefalutRngList[Range].unit;
    }

    $scope.onOffsetRangeChange = function(Range){
        $scope.channelObj.OffsetUnitName = $scope.DefalutRngList[Range].unit;
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
        if(isNaN($scope.channelObj.Dev) || $scope.channelObj.Dev < 0 || $scope.channelObj.Dev > 2147483.647){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Deviation Value must between 0 ~ 2147483.647.", null);
            return;
        }
        if(isNaN($scope.channelObj.Val) || $scope.channelObj.Val > 1000 || $scope.channelObj.Val < -1000){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Offset Value must between -1000.000 ~ 1000.000.", null);
            return;
        }
        if(isNaN($scope.channelObj.PItv) || $scope.channelObj.PItv > 8640000 || $scope.channelObj.PItv < 100){
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>One Measurement Interval must between 100 ~ 8640000", null);
            return;
        }

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        //var requestData = $scope.channelObj;
        var requestData  = {};
        requestData.Ch   = Number($scope.channelObj.Ch);
        requestData.En   = Number($scope.channelObj.En);
        requestData.Rng  = Number($scope.channelObj.Rng);
        requestData.Dev  = $scope.channelObj.Dev;
        requestData.Val  = $scope.channelObj.Val;
        requestData.Tag  = $scope.channelObj.Tag;
        requestData.RCD  = Number($scope.channelObj.RCD);
        requestData.Rng  = Number($scope.channelObj.Rng);
        requestData.EnLA = Number($scope.channelObj.EnLA);
        requestData.EnHA = Number($scope.channelObj.EnHA);
        if(requestData.EnLA)
        {
            requestData.LAMd = Number($scope.channelObj.LAMd);
            requestData.LoA  = $scope.channelObj.LoA;
        }
        if(requestData.EnHA)
        {
            requestData.HAMd = Number($scope.channelObj.HAMd);
            requestData.HiA  = $scope.channelObj.HiA;
        }
        requestData.PItv = Number($scope.channelObj.PItv);

        $http({
            method: 'PATCH',
            url: URL_SENSOR_CONFIG + '/slot_' + slotId + "/ch_" + $scope.selectedChannel.ch,
            data: requestData
        })
        .then(function(response) {
            //check write status when AP at Paring mode
            if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                CheckWriteStatus(function(){loadSensorConfig();});
            else
                loadSensorConfig();
                //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
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
        $scope.ruleLengthOccupiedError = [false, false, false, false, false, false, false, false ];
        $scope.ruleChannelOccupiedError = [false, false, false, false, false, false, false, false ];
        $scope.modbusCoilErrorIndicator = false;
        $scope.errorIndicatorSlaveId = [false, false, false, false, false, false, false, false ];
        $scope.errorIndicatorStartAddress = [false, false, false, false, false, false, false, false ];
        $scope.errorIndicatorLength = [false, false, false, false, false, false, false, false ];
        $scope.errorIndicatorScanInterval = [false, false, false, false, false, false, false, false ];
        $scope.errorIndicatorMappingChannel = [false, false, false, false, false, false, false, false ];
        $scope.errorIndicatorDevValue = [false, false, false, false, false, false, false, false ];
        $scope.ruleDisableEdit = [false, false, false, false, false, false, false, false ];
        var currentEditRuleIdx = 0;
        var currentEditRuleField = "";
        var MAX_RULE_NUMBER = 8;
        var MAX_CHANNEL_NUMBER = 32;
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
        var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;

        if(Advantech.Profile.VCOM_CONNECTION)
            pollingRate = Advantech.Profile.Parameter.VCOM_POLLING_RATE;//larger interval for end device
        //dialog
        $scope.responseTimeData = {};
        $scope.responseTimeQueryCount = 0;

        //////////////////Tab Switch
        $scope.switchTabTo = function(tabId) {
            if($scope.activeTab == tabId)
                return;
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
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
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            gobalTimer.ClearTimer();
            $timeout.cancel(queryExapsionDataWriteResultTimer);
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
            gobalTimer.ClearTimer();
            $timeout.cancel(queryExapsionDataWriteResultTimer);
            $scope.statusActiveTab = tabId;
            $scope.isQueryExapsionDataWriteResult = false;
            $scope.queryExapsionDataWriteResultText = "";
            loadStatusTab(tabId);
        }
        function loadStatusTab(tabId){
            if (tabId == "status_bit") {
                $scope.statusQueryCount = 0;
                loadStatusBit(true);
                /*if(!$scope.isStatusEditMode)
                    gobalTimer.EnableTimer(function(){loadStatusBit(true)}, pollingRate);//create timer*/
            } else if (tabId == "status_word") {
                $scope.statusQueryCount = 0;
                loadStatusWord(true);
                /*if(!$scope.isStatusEditMode)
                    gobalTimer.EnableTimer(function(){loadStatusWord(true)}, pollingRate);//create timer*/
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
                params: { 'foo': new Date().getTime() }
            })
            .then(function(response) {
                $scope.comPortSetting = response.data;
                $scope.$digest();
                //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                if(Advantech.Profile.VCOM_CONNECTION)
                    setTimeout(loadModbusCommonSetting, Advantech.Profile.Parameter.VCOM_CONFIG_WAIT_MS);
                else
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
                params: { 'foo': new Date().getTime() }
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
                params: { 'foo': new Date().getTime() }
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

		function performUrlExpansionBit(url, callbackFun){
			var counter = 0;
            var loopAmount = 0;
			var result ={Ext:[]};

            if(url == URL_EXPANSION_BIT || URL_EXPANSION_WORD)
                loopAmount = 4;

            (function loop(){
    			$http({
                    method: 'GET',
                    //url: URL_EXPANSION_BIT + '/slot_' + slotId + '/idx_' + counter,
                    url: url + '/slot_' + slotId + '/idx_' + counter,
                    params: { 'foobar': new Date().getTime() }
                })
                .then(function(response) {
                    var data;
                    var length;// = response.data.ExpBit.length;

                    if(url == URL_EXPANSION_BIT){
                        data = response.data.ExpBit;
                    }else if(url == URL_EXPANSION_WORD){
                        data = response.data.ExpWord;
                    }else{
                        if(typeof(callbackFun) === 'function')
                            callbackFun(null);
                    }

                    length = data.length;
                    for(var i = 0; i < length; i++)//copy element
                        result.Ext.push(data[i]);

    				counter++;

                    if(counter >= loopAmount){
                        if(typeof(callbackFun) === 'function')
                            callbackFun(result);
                    }else{
                        loop();
                    }
    			}, function(error) {
                    if(typeof(callbackFun) === 'function')
                        callbackFun(null);
                });
            })();
		}

        function loadStatusBit(isPeriodical) {
            gobalTimer.ClearTimer();
            $scope.statusQueryCount++;
            if(!isPeriodical)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();

            performUrlExpansionBit(URL_EXPANSION_BIT,
                function(result){
                    if(result != null){
                        $scope.statusQueryData = result.Ext;
                        var length = result.Ext.length;
                        var bit7Mask = 128; //1000-0000
                        var bit0To6Mask = 127; //0111-1111
                        for(var i=0; i< length; i++){
                            $scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] == 1 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                            $scope.statusQueryData[i]["ReadWrite"] = $scope.statusQueryData[i]["Prop"] == 2 ? true : false;
                            $scope.statusQueryData[i]["Evt"] = $scope.statusQueryData[i]["Evt"] & bit0To6Mask;//get bit 0~6
                        }
                        //start to show table data
                        if(isPeriodical)
                            $scope.sortAndShow(null, true);
                        else
                            $scope.sortAndShow();
                        $scope.$digest();

                        /* if(!isPeriodical)
                            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                        else if(!$scope.isStatusEditMode)
                            gobalTimer.EnableTimer(function(){loadStatusBit(true)}, pollingRate);//create timer */
						if(isPeriodical && !$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_bit')
                            gobalTimer.EnableTimer(function(){loadStatusBit(true)}, pollingRate);//create timer
						Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    }else{
                        //if(!isPeriodical)
                            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                        angularShowHttpErrorMessage({statusText: "Data Loading Error"});
                    }
                });
/*
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
                if(isPeriodical)
                    $scope.sortAndShow(null, true);
                else
                    $scope.sortAndShow();
                $scope.$digest();

                if(!isPeriodical)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                if(!isPeriodical)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });*/
        }
        function loadStatusWord(isPeriodical) {
            gobalTimer.ClearTimer();
            $scope.statusQueryCount++;
            if(!isPeriodical)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();

            performUrlExpansionBit(URL_EXPANSION_WORD,
                function(result){
                    if(result != null){
                        $scope.statusQueryData = result.Ext;
                        var length = result.Ext.length;
                        //$scope.statusQueryData = response.data.ExpWord;
                        //var length = response.data.ExpWord.length;
                        var bit7Mask = 128; //1000-0000
                        var bit0To6Mask = 127; //0111-1111
                        for(var i=0; i< length; i++){
                            //$scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] > 0 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                            $scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] == 1 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                            $scope.statusQueryData[i]["ReadWrite"] = $scope.statusQueryData[i]["Prop"] == 2 ? true : false;
                            $scope.statusQueryData[i]["Evt"] = $scope.statusQueryData[i]["Evt"] & bit0To6Mask;//get bit 0~6
                        }
                        //start to show table data
                        if(isPeriodical)
                            $scope.sortAndShow(null, true);
                        else
                            $scope.sortAndShow();
                        $scope.$digest();

                        /* if(!isPeriodical)
                            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                        else if(!$scope.isStatusEditMode)
                            gobalTimer.EnableTimer(function(){loadStatusWord(true)}, pollingRate);//create timer */
                        if(isPeriodical && !$scope.isStatusEditMode && $scope.activeTab =='status' && $scope.statusActiveTab == 'status_word')
                            gobalTimer.EnableTimer(function(){loadStatusWord(true)}, pollingRate);//create timer
						Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    }else{
                        //if(!isPeriodical)
                            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                        angularShowHttpErrorMessage({statusText: "Data Loading Error"});
                    }
                });
/*
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
                    //$scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] > 0 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                    $scope.statusQueryData[i]["writeOnly"] = $scope.statusQueryData[i]["Prop"] == 1 ? true : false;//($scope.statusQueryData[i]["Evt"] & bit7Mask) > 0 ? true : false;//get bit 7
                    $scope.statusQueryData[i]["ReadWrite"] = $scope.statusQueryData[i]["Prop"] == 2 ? true : false;
                    $scope.statusQueryData[i]["Evt"] = $scope.statusQueryData[i]["Evt"] & bit0To6Mask;//get bit 0~6
                }
                //start to show table data
                if(isPeriodical)
                    $scope.sortAndShow(null, true);
                else
                    $scope.sortAndShow();
                $scope.$digest();

                if(!isPeriodical)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            }, function(error) {
                if(!isPeriodical)
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
*/
        }
        function loadDiagnosticData(isPeriodical){
            $scope.responseTimeQueryCount++;
            if(!isPeriodical)
                Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            $http({
                method: 'GET',
                url: URL_MODBUS_SLAVE_STATUS + '/slot_' + slotId + '/com_' + comNumber,
                params: { 'foo': new Date().getTime() }
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
                    params: { 'foo': new Date().getTime() }
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
						//Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
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
                data: {"RRS": Number(comNumber)/*1*/}
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
                    setTimeout(function(){$scope.btnComSettingClick();}, Advantech.Profile.Parameter.VCOM_CONFIG_WAIT_MS);
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
                //requestData[i].LgE = parseInt(requestData[i].LgE);
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
                else{
                    loadModbusRuleSetting();
                    //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                }
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
            $scope.queryExapsionDataWriteResultText = "Waiting for slave response..."

            if(requestType == "status_bit"){
                requestURL = URL_EXPANSION_BIT + '/slot_' + slotId + '/com_' + comNumber + "/ch_" + channel;
            }else{
                requestURL = URL_EXPANSION_WORD + '/slot_' + slotId + '/com_' + comNumber + "/ch_" + channel;
            }
            requestData = {
                //"Ch": channel,
                "Val": parseInt($scope.statusQueryData[channel]["Val"])
            };
            //Advantech.Form.WaitingForm.getInstance().showPleaseWait();

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
                    setTimeout( function(){
                        queryExpansionDataWriteResult(requestType, channel);
                    }, Advantech.Profile.Parameter.VCOM_CONFIG_WAIT_MS);
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
            if(isNaN(ruleObj['Addr']) || ruleObj['Addr'] < 1 || ruleObj['Addr'] > 65535){
                $scope.errorIndicatorStartAddress[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorStartAddress[channelIdx] = false;
            }
            if(isNaN(ruleObj['NOP']) || ruleObj['NOP'] < 1 || ruleObj['NOP'] > 32){
                $scope.errorIndicatorLength[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorLength[channelIdx] = false;
            }
            if(isNaN(ruleObj['SItv']) || ruleObj['SItv'] < 1 || ruleObj['SItv'] > 65535){
                $scope.errorIndicatorScanInterval[channelIdx] = true;
                isValid = false;
            }else{
                $scope.errorIndicatorScanInterval[channelIdx] = false;
            }
            if(isNaN(ruleObj['MCh']) || ruleObj['MCh'] < 0 || ruleObj['MCh'] > 31){
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
        $scope.pageSizeList = [16, 32];
        $scope.reverse = true;
        $scope.ItemsByPage; //data in each page
        $scope.currentPage = 0;
        $scope.filteredList;
        $scope.currentStartRecordNumber = 0;
        $scope.currentEndRecordNumber = 0;
        $scope.currentTotalRecordNumber = 0;
        $scope.columnToOrder; //column to sort
        $scope.isStatusEditMode = false;
        var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;

		if(Advantech.Profile.VCOM_CONNECTION)
			pollingRate = Advantech.Profile.Parameter.VCOM_POLLING_RATE;//larger interval for end device

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
            $scope.sortAndShow(null, true);
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

        $scope.sortAndShow = function(sortBy, isPeriodical){
            //$scope.resetAll();
            if(!sortBy || sortBy == null)
                sortBy = 'Ch';

            $scope.filteredList = $scope.statusQueryData;
            $scope.currentTotalRecordNumber = $scope.filteredList.length;

            if(!isPeriodical){
                $scope.currentPage = 0;
                $scope.currentStartRecordNumber = 1;
                $scope.currentEndRecordNumber = $scope.currentTotalRecordNumber > $scope.pageSize ? $scope.pageSize : $scope.currentTotalRecordNumber;
                $scope.columnToOrder = sortBy;
                $scope.reverse = !$scope.reverse;
            }
            //standard filter service
            $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
            $scope.pagination();
        };
        //////////////////////////////////End of Status Tables

        //load data for default Tabs
        loadStatusBit();//init table sort, not start timer
        gobalTimer.EnableTimer(function(){loadStatusBit(true)}, pollingRate);//start timer
}]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller of AP Sub Node List
///////////////////////////////////////////////////////////////////////////////////////////////////////////
wiseApp.controller('SubNodeListCtrl', ['$scope', '$http', '$element', 'filteredListService', '$filter', '$timeout', '$compile',
    function($scope, $http, $element, filteredListService, $filter, $timeout, $compile) {
    $scope.moduleAmount = 0;
    var moduleSlotArray;
    $scope.moduleList = [];
    $scope.currentModuel = '';

    var rfMode = Advantech.Data.ModuleData.getInstance().getRfMode();

    var bInitialLoading = true;
    //var cacheContent;
    var currentView = 'list'; //list, nodeconfig, device
    $scope.bVcomConnection = Advantech.Profile.VCOM_CONNECTION;
    //////////////////////////////////
    //variables for Status Tables
    $scope.pageSize = 16;
    $scope.pageSizeList = [16, 32];
    $scope.reverse = false;
    $scope.ItemsByPage; //datas in each page
    $scope.currentPage = 0;
    $scope.filteredList;
    $scope.currentStartRecordNumber = 0;
    $scope.currentEndRecordNumber = 0;
    $scope.currentTotalRecordNumber = 0;
    $scope.columnToOrder; //column to sort
    //$scope.isStatusEditMode = false;
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;

	if(Advantech.Profile.VCOM_CONNECTION)
		pollingRate = Advantech.Profile.Parameter.VCOM_POLLING_RATE;//larger interval for end device

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
        $scope.sortAndShow(null, true);
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

    $scope.sortAndShow = function(sortBy, isPeriodical){
        if(!sortBy || sortBy == null)
            $scope.columnToOrder = 'Id';//sortBy = 'Id';

        $scope.filteredList = $scope.moduleList;
        $scope.currentTotalRecordNumber = $scope.filteredList.length;

        if(!isPeriodical){
            $scope.currentPage = 0;
            $scope.currentStartRecordNumber = 1;
            $scope.currentEndRecordNumber = $scope.currentTotalRecordNumber > $scope.pageSize ? $scope.pageSize : $scope.currentTotalRecordNumber;
            $scope.columnToOrder = sortBy;
            $scope.reverse = !$scope.reverse;
        }
        //standard filter service
        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
        $scope.pagination();
    };
    //////////////////////////////////End of Status Tables

    function getModuleDescription(moduleName){
        var moduleId = moduleName;
        if(moduleId.substring(10).slice(0,2) == "AP")
            moduleId = moduleId.substring(0, 12);//ex: WISE-4210-APNA => WISE-4210-AP
        else
            moduleId = moduleId.substring(0, 14);//ex: WISE-4210-S250LNA => WISE-4210-S250

        if(typeof(Advantech.Profile.DeviceEmun[moduleId].description) != 'undefined' &&
            Advantech.Profile.DeviceEmun[moduleId].description !=""){
            return Advantech.Profile.DeviceEmun[moduleId].description;
        }else
            return '';
    }

    function loadModuleList(){
        gobalTimer.ClearTimer();
        /*if(!bInitialLoading)
            return;
        else
            bInitialLoading = false;*/

        if($scope.bVcomConnection){//end device
            $scope.currentModuel = module;
            var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
            recordObj.setSlotId(0);//always use slot 0 for VCOM
            recordObj.SetCurrentModule($scope.currentModuel);

            //cacheContent = angular.element('#subnode-node-config').html();
            currentView = 'nodeconfig';
            Advantech.Utility.loadAjaxContent("subnode-node-config", "/config/node_config.html", null, null, true);
        }else{ //AP
            $http({
                method: 'GET',
                url: URL_LPWAN_LIST,
				params: { 'foo': new Date().getTime() }
            })
            .then(function(response) {
                moduleSlotArray = response.data.Dev;//.Id;
                $scope.moduleAmount = moduleSlotArray.length;

                if(rfMode == 1){//only in RF paring mode, AP have module id
                    for(var i = 0; i < $scope.moduleAmount; i++){
                        moduleSlotArray[i].Desc = getModuleDescription(moduleSlotArray[i].Nm);
                    }
                }
                $scope.moduleList = moduleSlotArray;
                $scope.sortAndShow(null, true);
                $scope.$digest();
                //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                gobalTimer.EnableTimer(function(){loadModuleList()}, pollingRate);
                //loadGwEndDeviceInformation();
            }, function(error) {
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            });
        }
    }
/*
    function loadGwEndDeviceInformation(counter){
        var index, nodeCounter;

        if(typeof(counter) != 'undefined'){
            //for end device
            if(counter < nodeAmount){
                index = moduleSlotArray[counter].SLs;
                nodeCounter = counter;
            }else{
                //callback is finished
                $scope.sortAndShow();
                $scope.$digest();
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                return;
            }
        }else{
            //for gateway
            index = 0;
            nodeCounter = 0;
        }
    }
 */
    /////////////////Buttons
    $scope.btnIoStatusClick = function(slotIndex, module) {
        $scope.currentModuel = module;
        var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
        recordObj.setSlotId(slotIndex);
        recordObj.SetCurrentModule($scope.currentModuel);

        //cacheContent = angular.element('#subnode-io-status').html();

        currentView = 'device';
        Advantech.Utility.loadAjaxContent("subnode-io-status", "/config/io_status.html", null, null, true);
        //Advantech.Utility.loadAjaxContent("ioStatus_0", "/config/io_status.html");
    }

    $scope.btnNodeConfigClick = function(slotIndex, module) {
        gobalTimer.ClearTimer();
        $scope.currentModuel = module;
        var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
        recordObj.setSlotId(slotIndex);
        recordObj.SetCurrentModule($scope.currentModuel);

        //cacheContent = angular.element('#subnode-node-config').html();

        currentView = 'nodeconfig';
        Advantech.Utility.loadAjaxContent("subnode-node-config", "/config/node_config.html", null, null, true);
        //Advantech.Utility.loadAjaxContent("ioStatus_0", "/config/io_status.html");
    }

    $scope.btnBackToNodeList = function() {
        Advantech.Utility.TimerDispatchSingleton.getInstance().ClearTimer();
        currentView = 'list';
        $scope.currentModuel = '';
        loadModuleList();
    }

    $scope.isSectionShow = function(view){
        if($scope.bVcomConnection){//end device
            if(view == "nodeconfig")
                return true;
            else
                return false;
        }

        if(currentView == view)
            return true;
        else
            return false;
    }

    $scope.isShowInRfMode = function(mode){
        if(mode == "push" && rfMode==0)
            return true;
        else
            return false;
    }

    $scope.getBatteryStatus = function(id){
        var status = {
                "0": "No Error",
                "1": "Low battery",
                "2": "Run out of battery",
                "3": "No battery installed",
            };
        if(typeof(status[id]) != 'undefined')
            return status[id];
        else
            return "";
    }

    $scope.getPowerSource = function(pw){
        var desc = "";
        var dataArray = Advantech.Utility.convertMaskToArray(pw, 2);
        var powerSource = {
                "0": "Line power",
                "1": "Device battery"
            };

        if(dataArray[0])
            desc += powerSource[0];
        if(dataArray[1]){
            if(desc == "")
                desc = powerSource[1];
            else
                desc += ", "+powerSource[1];
        }

        if(desc == "")
            desc = "No Data";
        return desc;
    }

    loadModuleList();

}]);

wiseApp.controller('RFConfigCtrl', ['$scope', '$http', '$element', 'filteredListService', '$filter', '$timeout', '$compile',
    function($scope, $http, $element, filteredListService, $filter, $timeout, $compile) {
    var pollingRate = Advantech.Profile.Parameter.VCOM_POLLING_RATE;//larger interval for end device
    //var currentView = 'IO';
    var cacheContent;
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    $scope.slotId = recordObj.getSlotId();
    $scope.Locate = false;
    $scope.SysInfo = {};
    $scope.TimeInfo = {};
    $scope.RFStatus = {};
    $scope.RFConfig = {};
    var rfConfigData = {}; //store $scope.RFConfig
    $scope.activeRFTab = 'config';
    $scope.activeConfigTab = 'Information';
    $scope.currentModuel;

    $scope.modbusApId;
    $scope.modbusIdList = [];

    $scope.rfRegionSelectList = {"0": "Loading"};
    $scope.rfFrequencySelectList = {"0": "Loading"};
    $scope.rfDataRateSelectList = {"0": "Loading"};
    $scope.rfTxPowerSelectList = {"0": "Loading"};

    $scope.rs485Setting = {};

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

    $scope.isSupportExternalFun = Advantech.Utility.checkExternalFunExist();

    //////////////////////////////////////////
    //Group configuration download/upload
    var fileUpgradePanel = new Advantech.Form.SystemForm.FileUpgradePanel("panelFileUpgrade");
    var fileUpdatePrgressForm = new Advantech.Form.ProgressForm.getInstance();
    fileUpgradePanel.initialPanel();
    fileUpgradePanel.onUpgradeSubmitted(function(obj, e) {
        if ((Advantech.Utility.isIE() && Advantech.Utility.isIE() <= 10)
            || Advantech.Utility.isSafari()
            || Advantech.Utility.isIPhone()
            || Advantech.Utility.isIPad()
            || Advantech.Utility.isAndroid()) {
            $('.fileinput').fileinput('reset');
            $('#btnGroupConfig').hide("slow");
            Advantech.Form.MessageForm.getInstance().showMessageBox("Notification", "Upload function not be supported by this browser, browser version or platform. Suggest changing browser(<a href='https://www.google.com/chrome/'>Chrome</a>, <a href='https://mozilla.com/firefox/'>Firefox</a> or <a href='http://windows.microsoft.com/en-us/internet-explorer/download-ie'>Internet Explorer</a>(version 11 or above)) or PC to try again.");
            return;
        }

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
                Advantech.Utility.restartPage(10, function() {
                    if (Advantech.Utility.checkExternalFunExist()) {
                        Advantech.Utility.callExternalFun('control', '');
                    } else {
                        Advantech.Utility.reConnectPage();
                    }
                });
            }
            else if(type === 1){
                Advantech.Utility.switchToTagetHtml("index","/config");
            }else{
                Advantech.Form.MessageForm.getInstance().showMessageBox("Notification", "<h5>Uploaded successfully.</h5>");
            }
        }, 1000);
    }
    var onFileUpgradeFail = function(xhr, thrownError, file, apiErrorCode, apiErrorMsg) {
        var fileName = file.name || "file";
        var returnMsg = "<i class='fa fa-fw fa-exclamation-triangle'></i>The " + fileName + " upload fail. Cause upload has occurred " + thrownError + "<p/>";
        returnMsg += apiErrorCode!==undefined && apiErrorCode!=="" ? "Reason: " + Advantech.Profile.API_ERROR_CODE_NAME[apiErrorCode] : "";
        returnMsg += apiErrorMsg!==undefined && apiErrorMsg!==""? "<p/>(Detail: " + apiErrorMsg + " error, Error number:" +apiErrorCode+")" : "";
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
    }
    /////////////////////////////////////////

    function loadSysInfo(){
        var url = URL_SYS_INFO + "/slot_" + $scope.slotId;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.SysInfo = response.data;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadTimeZone(){
        var url = URL_NETWROK_APP + "/slot_" + $scope.slotId;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.TimeInfo.TZC = response.data.TZC;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadLocalTime(){
        var url = URL_SYS_INFO + "/slot_" + $scope.slotId;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.TimeInfo = response.data;
            //$scope.$digest();
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            loadTimeZone();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadRFStatus(isPeriodical){
        var url = URL_LPWAN_VALUE + "/slot_" + $scope.slotId;

		if(typeof(isPeriodical)!='undefined' && !isPeriodical)
			Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.RFStatus = response.data;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
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

    function loadRFSettingList(type, bIsChangeRegion, defaultListJson){
        var url;
        if(type == 'AP')
            url = URL_LPWAN_SETTING_LIST + "/slot_0";
        else
            url = URL_LPWAN_SETTING_LIST + "/slot_" + $scope.slotId;

        if(!bIsChangeRegion)
            url = url + "/idx_" + rfConfigData.Reg;
        else
            url = url + "/idx_" + defaultListJson.Reg;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            //reset select list to default(one item) to prevent empty selection(value of ng-model not exist in select list)
            $scope.RFConfig.Reg = 0;
            $scope.RFConfig.RT = 0;
            $scope.RFConfig.Fq = 0;
            $scope.RFConfig.Pw = 0;
            $scope.rfFrequencySelectList = {0:"Loading"};
            $scope.rfDataRateSelectList = {0:"Loading"};
            $scope.rfTxPowerSelectList = {0:"Loading"};
            $scope.rfRegionSelectList = {0:"Loading"};
            $scope.$digest();
            $scope.rfFrequencySelectList = response.data.Fq;
            $scope.rfDataRateSelectList = response.data.RT;
            $scope.rfTxPowerSelectList = response.data.Pw;
            $scope.rfRegionSelectList = rfConfigData.Res;
            $scope.$digest();
			//restore original selection
            if(!bIsChangeRegion){
                angular.copy(rfConfigData, $scope.RFConfig)//angular.copy(source, [destination])
                $scope.$digest();
            }else{
                //if rf switch to new region, set default select for new region
                angular.copy(defaultListJson, $scope.RFConfig)//angular.copy(source, [destination])
				$scope.$digest();
			}
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadRFDefaultList(type, regionIndex){
        var url;
        if(type == 'AP')
            url = URL_LPWAN_DEFAULT_LIST + "/slot_0" + '/idx_' + regionIndex;
        else
            url = URL_LPWAN_DEFAULT_LIST + "/slot_" + $scope.slotId + '/idx_' + regionIndex;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            loadRFSettingList(type, true, response.data);
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function loadRFConfig(type){
        var url;
        if(type == 'AP')
            url = URL_LPWAN_CONFIG + "/slot_0";
        else
            url = URL_LPWAN_CONFIG + "/slot_" + $scope.slotId;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            //$scope.RFConfig = response.data;
			//$scope.RFConfig.Pw = parseInt(response.data.Pw);
            //rfConfigData = response.data;
            angular.copy(response.data, rfConfigData);//angular.copy(source, [destination])
            for(var i=0; i< rfConfigData.Res.length; i++){
                rfConfigData.Res[i] = Advantech.Profile.RfSupportedRegion[rfConfigData.Res[i]];
            }
            //$scope.$digest();
            loadRFSettingList('AP', false);
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    //for AP
    $scope.loadApUpdateInterval = function(){
        var url = URL_LPWAN_APP + "/slot_0";

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            $scope.UpdateConfig.PItv = parseInt(response.data.PItv);
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    //for Node
    function loadRFApUpdateInterval(type){
        var url;
        if(type == 'AP')
            url = URL_LPWAN_APP + "/slot_0";
        else
            url = URL_LPWAN_APP + "/slot_" + $scope.slotId;

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
            //if(deviceProfile.AIn>0){
            if(false){//no AI COS for WISE-2210
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
				dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.SCOS, $scope.sensorUpdateArr.length);
				for(var j=0; j < dataArray.length; j++){
					$scope.sensorUpdateArr[j].SCOS = dataArray[j] + '';
                }
                dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.SHiA, $scope.sensorUpdateArr.length);
                for(var j=0; j < dataArray.length; j++){
                    $scope.sensorUpdateArr[j].SHiA = dataArray[j] + '';
                }
                dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.SLoA, $scope.sensorUpdateArr.length);
                for(var j=0; j < dataArray.length; j++){
                    $scope.sensorUpdateArr[j].SLoA = dataArray[j] + '';
                }
            }
            if(deviceProfile.RT>0){
                validUpdateItems["COS"] = true;
                dataArray = Advantech.Utility.convertMaskToArray($scope.UpdateConfig.COS, 8); //8 rules
                for(var j=0; j < dataArray.length; j++){
                    $scope.com1UpdateArr.push({"val": dataArray[j] + ''});
                }
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
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            var i;
            deviceProfile = response.data;
            //create every Sensor channel
            $scope.sensorUpdateArr = [];
            for(i = 0; i < deviceProfile.Sn; i++){
                $scope.sensorUpdateArr.push({"SCOS":0, "SHiA":0,"SLoA":0});
            }
            $scope.$digest();

            loadRFApUpdateInterval();
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onClickRFModuleConfig = function(){
        loadRFConfig('AP');
		//loadRFSettingList('AP');
    }

    $scope.onRfRegionChange = function(){
        //console.log("region: " + $scope.RFConfig.Reg);
        // loadRFSettingList('AP', $scope.RFConfig.Reg, rfConfigData.Reg);
        loadRFDefaultList('AP', $scope.RFConfig.Reg, rfConfigData.Reg);
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

    $scope.isUpdateItemDisplay = function(item) {
        if(typeof(validUpdateItems[item]) != 'undefined')
            return true;
        else
            return false;
    }

    $scope.ShowIOTab = function() {
        gobalTimer.ClearTimer();
        $scope.currentModuel = module;
        var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
        var CurrId = recordObj.getSlotId();
        var CurrModule = recordObj.GetCurrentModule();
        //recordObj.setSlotId(slotIndex);
        //recordObj.SetCurrentModule($scope.currentModuel);

        cacheContent = angular.element('#subnode-io-status').html();
        $scope.activeConfigTab = 'IO';
        Advantech.Utility.loadAjaxContent("subnode-io-status", "/config/io_status.html", null, null, true);
    }

    $scope.switchRFTabTo = function(tabId) {
        if($scope.activeRFTab == tabId)
            return;
        $scope.activeRFTab = tabId;
        gobalTimer.ClearTimer();
        if (tabId == "status") {
            loadRFStatus();
            gobalTimer.EnableTimer(function(){loadRFStatus(true)}, pollingRate);//create timer
        }else if (tabId == "config") {
            gobalTimer.ClearTimer();
            loadRFConfig();
			//loadRFSettingList();
        }
    }

    $scope.ShowInformTab = function() {
        gobalTimer.ClearTimer();
        $scope.activeConfigTab = 'Information';
        loadSysInfo();
    }

    $scope.ShowRFTab = function() {
        gobalTimer.ClearTimer();
        $scope.activeConfigTab = 'RF';
        $scope.activeRFTab = "config";
       if ($scope.activeRFTab == "status") {
            loadRFStatus();
            gobalTimer.EnableTimer(function(){loadRFStatus(true)}, pollingRate);//create timer
        }else if ($scope.activeRFTab == "config") {
            gobalTimer.ClearTimer();
            loadRFConfig();
			//loadRFSettingList();
        }
    }

    $scope.ShowUpdateTab = function() {
        gobalTimer.ClearTimer();
        $scope.activeConfigTab = 'Update';
        loadDeviceProfile();
    }

    $scope.ShowTimeTab = function() {
        gobalTimer.ClearTimer();
        $scope.activeConfigTab = 'Time';
        loadLocalTime();
    }

    $scope.ShowControlTab = function(){
        gobalTimer.ClearTimer();
        $scope.activeConfigTab = "Control";
        //$scope.$digest();
    }

    $scope.ShowFirmwareTab = function(){
        gobalTimer.ClearTimer();
        $scope.activeConfigTab = "FW";
        //$scope.$digest();
    }

    $scope.onSysInfoClick = function(){
        var requestData = $scope.SysInfo;
        var url = URL_SYS_INFO + "/slot_" + $scope.slotId;

        delete requestData.Id;
        delete requestData.Tm;


        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadSysInfo();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.onTimeRefreshClick = function(){
        loadLocalTime();
    }

    function getTimeZoneObj(){
        var obj = {};
        var str = "" + $("#tabTimeConfig  option:selected").text();
        obj.TZC = parseInt($scope.TimeInfo.TZC, 10);
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

    $scope.onTimeZoneClick = function(){
        var requestData = {};
        var url = URL_NETWROK_APP + "/slot_" + $scope.slotId;
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        requestData = getTimeZoneObj();

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadLocalTime();
            //loadTimeZone();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.onTimeCalibrationClick = function(){
        var requestData = {};
        var url = URL_SYS_INFO + "/slot_" + $scope.slotId;

        $("#tabTimeConfig #inpDatetimepicker").collapse(true);
        var timeStr = $("#tabTimeConfig #inpDatetimepicker").val();
        if(timeStr == ""){
            Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Input Error<h4>", "<h5><i class='fa fa-fw fafrown-o'></i>Please select correct time.<h5>");
            return;
        }
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();

        var obj = getTimeZoneObj();

        var toIntToStr = Advantech.Utility.formatNumberLength;
        var date = timeStr;
        //add TimeZone
        if(obj.TZHr > 0) {
            date += "+";
            date += toIntToStr(obj.TZHr, 2);
        }else if(obj.TZHr === 0) {
            date += "-00";
        }else{
            var Hr = -obj.TZHr;
            date += "-" + toIntToStr(Hr, 2);
            //date += toIntToStr(obj.TZHr, 2);
        }
        if(obj.TZMn < 0) {//use TZHr to decide + or -
            obj.TZMn = -obj.TZMn;
        }
        date += ":" + toIntToStr(obj.TZMn, 2);

        requestData.Tm = date;

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            //loadLocalTime();
            $scope.onTimeZoneClick();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.onRfConfigClick = function(){
        var requestData = {};
        var url = URL_LPWAN_CONFIG + "/slot_" + $scope.slotId;

		Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        //requestData.Md = parseInt($scope.RFConfig.Md);
        requestData.RT = parseInt($scope.RFConfig.RT);
        requestData.Fq = parseInt($scope.RFConfig.Fq);
        // requestData.Reg = parseInt($scope.RFConfig.Reg);

        //TX power setting only in Node
        if(Advantech.Profile.VCOM_CONNECTION)
            requestData.Pw = parseInt($scope.RFConfig.Pw);

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
			// if($scope.slotId != '0') //Only Check End Device
            //     gobalTimer.EnableTimer(function(){CheckWriteStatus(loadRFSettingList)}, pollingRate);
            // else{
				Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                Advantech.Utility.restartPage();//Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
			// }
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.btnRS485SettingClick = function(){
        var requestData = {};
        var url = URL_SERIAL_PORT_CONFIG + "/slot_0/com_1";

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        requestData.BR = parseInt($scope.rs485Setting.BR);
        requestData.DB = parseInt($scope.rs485Setting.DB);
        requestData.P = parseInt($scope.rs485Setting.P);
        requestData.SB = parseInt($scope.rs485Setting.SB);
        requestData.Prot = parseInt($scope.rs485Setting.Prot);

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadRS485Setting();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.isUpdateIntervalInvalid = function(){
        if(typeof($scope.UpdateConfig.PItv) == 'undefined' || $scope.UpdateConfig.PItv == null)
            return true;
        else if(int($scope.UpdateConfig.PItv) > 2592000 || int($scope.UpdateConfig.PItv) < 1)
            return true;
        else
            return false;
    }

    //for AP
    $scope.onBtnApUpdateIntervalClick = function(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var requestData = {};
        var url = URL_LPWAN_APP + "/slot_" + $scope.slotId;
        requestData.PItv = $scope.UpdateConfig.PItv;

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            $scope.loadApUpdateInterval();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })

    }

    //for Node
    $scope.onBtnUpdateIntervalClick = function(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var requestData = {};
        var url = URL_LPWAN_APP + "/slot_" + $scope.slotId;
        requestData = $scope.UpdateConfig;
        var itemList = Object.keys($scope.UpdateConfig);
        var dataArray = [];

		/*if(int($scope.UpdateConfig.PItv) > 2592000 || int($scope.UpdateConfig.PItv) < 1){
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "<i class='fa fa-fw fa-exclamation-triangle'></i>Update Interval must be 1 ~ 2592000", null);
            return;
        }*/

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
                }else if(itemList[i] == "COS"){
                    for(var j=0; j < $scope.com1UpdateArr.length; j++){
                        dataArray.push(Number($scope.com1UpdateArr[j].val));
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

    $scope.onClickModbusIdConfig = function(){
        var url = URL_LPWAN_MODBUS;// + "/slot_0";
        $scope.modbusIdList = [];

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            var data = response.data.Dev;
            for(var i=0; i< data.length; i++){
                //skip id of AP
                if(data[i].SLs != "0"){
                    $scope.modbusIdList.push({"SLs": data[i].SLs, "Id": int(data[i].Id)});
                }else{
                    $scope.modbusApId = int(data[i].Id);
                }
            }
            //$scope.modbusIdList = response.data.Dev;
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.onClickModbusIdSubmit = function(){
        var url = URL_LPWAN_MODBUS;
        var requestData = {"Dev":[]};

        //check for AP
        if($scope.modbusApId < 241 || $scope.modbusApId > 248){
            Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Modbus ID Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>The Modbus ID of AP must be 241~248.<h5>");
            return;
        }
        //check for Node
        for(var i=0; i < $scope.modbusIdList.length; i++){
            if($scope.modbusIdList[i].Id < 1 || $scope.modbusIdList[i].Id > 240){
                Advantech.Form.MessageForm.getInstance().showMessageBox("<h4>Modbus ID Error<h4>", "<h5><i class='fa fa-fw fa-exclamation-triangle'></i>The Modbus ID of End Device must be 1~240.<h5>");
                return;
            }
        }

        requestData.Dev = $scope.modbusIdList;
        requestData.Dev.push({"SLs":"0", "Id": $scope.modbusApId});

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PUT',//modify all
            url: url,
            data: requestData
        })
        .then(function(response) {
            $scope.onClickModbusIdConfig();
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.onClickModbusIdDelete = function(slotId){
        var url = URL_LPWAN_MODBUS + "/slot_" + slotId;

        if($scope.modbusIdList.length == 0)
            return;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: url,
            data: {"Del": 1}//delete
        })
        .then(function(response) {
            $scope.onClickModbusIdConfig();
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.onClickModbusIdDeleteAll = function(){
        var url = URL_DEVICE_CONTROL;

        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        $http({
            method: 'PATCH',
            url: url,
            data: {"ClrL": 1}//delete
        })
        .then(function(response) {
            $scope.onClickModbusIdConfig();
            //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    function CheckWriteStatus(callback){
        gobalTimer.ClearTimer();
        $http({
            method: 'GET',
            url: URL_LPWAN_WRITESTATUS,
            params: { 'foo': new Date().getTime() }
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
    $scope.NodeControl = function(Name){
        var requestData = {};
        var API = Name;
        var url = URL_DEVICE_CONTROL + "/slot_" + $scope.slotId;

        //Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        if(Name == 'Rst')
            requestData.Rst = 1;
        else if(Name == 'Lc')
            requestData.Lc = Number(!$scope.Locate);
        else if(Name == 'RFD')
            requestData.RFD = 1;

        $("#CommonConfirmModal #confirmModalLabel").text("Please Confirm");
        if(Name == 'RFD')
            $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>Setting will be erased! Do you want to proceed?");
        else
            $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>Module will restart! Do you want to proceed?");
        $("#CommonConfirmModal").modal("show");
        $("#CommonConfirmModal #btnCommonConfirm").one("click", function(){
            $http({
                method: 'PATCH',
                url: url,
                data: requestData
            })
            .then(function(response) {
                $("#CommonConfirmModal").modal("hide");
                //check write status when AP at Paring mode
                if(Advantech.Data.ModuleData.getInstance().getRfMode()=="1" && Advantech.Profile.VCOM_CONNECTION == false)
                    CheckWriteStatus(null);
                else{
                    Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                    //Advantech.Utility.informationPage();
                    //Advantech.Utility.dotNetUtilityCallBack(ADVANTECH_DEVICE_CONTROL, requestData);
                    window.external.VComWebUtilitySyncCallBackFun(ADVANTECH_DEVICE_CONTROL, '');
                    //Advantech.Utility.restartPage();
                }
            }, function(error) {
                $("#CommonConfirmModal").modal("hide");
                //Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                angularShowHttpErrorMessage(error);
            })
        });
    }

    $scope.btnFwUploadClick = function() {
        $("#CommonConfirmModal #confirmModalLabel").html("Please Confirm");
        $("#CommonConfirmModal #confirmContext").html("<i class='fa fa-fw fa-warning'></i>Module will enter Firmware mode. Only firwmware upload operation is allowed.<br/>Do you want to proceed?");
        $("#CommonConfirmModal").modal("show");
        $("#CommonConfirmModal #btnCommonConfirm").one("click", function(){
            $http({
                method: 'PATCH',
                url: URL_GENERAL_CONFIG,
                data: {"AMd":0}
            })
            .then(function(response) {
                $("#CommonConfirmModal").modal("hide");
                $("#wrapper #dashboard").hide();
                $("#wrapper #mainMenuConfig").hide();
                $("#wrapper #soltInfoListViewItem").html('<a href="#"><i class="fa fa-fw fa-sitemap"></i> Firmware Upload</a>');
                Advantech.Utility.loadAjaxContent(null, "/config/pages.html", "fwUpgrade", null, true); //must set fwUpgrade tag
            }, function(error) {
                $("#CommonConfirmModal").modal("hide");
                angularShowHttpErrorMessage(error);
            });
        });
    }

    $scope.onClickExportConfig = function() {
        var url = "/config_file.cfg";

        $http({
            method: 'GET',
            url: url,
            params: { 'foo': new Date().getTime() }
        })
        .then(function(response) {
            window.location.href = url;
        }, function(error) {
            angularShowHttpErrorMessage(error);
        });
    }

    if(Advantech.Profile.VCOM_CONNECTION)
        loadSysInfo();

    //init dataTimePicker in Local Time Tab
    $("#tabTimeConfig #inpDatetimepicker").datetimepicker({});
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

wiseApp.controller('AiChannelCtrl', ['$scope', '$http', '$element', 'filteredListService', '$filter', '$timeout', '$compile',
    function($scope, $http, $element, filteredListService, $filter, $timeout, $compile) {
    var pollingRate = Advantech.Profile.Parameter.POLLING_RATE;
    //var currentView = 'IO';
    var gobalTimer = Advantech.Utility.TimerDispatchSingleton.getInstance();
    var recordObj = Advantech.Utility.RecordContextPageIdSingleton.getInstance();
    $scope.slotId = recordObj.getSlotId();
    var inValidString = "****";

    $scope.statusRange = "****";
    $scope.statusValue = "****";
    $scope.statusUnit = "";
    var currentAiRange = 0;
    var currentAiTab = "status";
    var currentAiConfigTab = "channel";

    //AI status tab
    $scope.selectedOption = {"Ch":0};
    $scope.channelStatus = {};
    $scope.statusTableData = [];
    //create speed Meter chart
    var speedoMeter = new Advantech.Control.Meter();
    //speedoMeter.createDisplayElement("AIStatusMeterContainer");
    //speedoMeter.createDisplayElement("AIStatusMeter");
    $("#AIStatusMeterContainer").append(speedoMeter.createDisplayElement("AIStatusMeter"));
    speedoMeter.drawElement();
    speedoMeter.changeRange(0, 10);
    speedoMeter.setValue(0);
    //AI common config
    $scope.commonConfig = {"AiT":0};
    $scope.isShowAiBurnout = false; //Advantech.Profile.DeviceEmun[module].isSupportAIBurnout;
    $scope.isShowAiFilter = Advantech.Profile.DeviceEmun[module].aiFilterSupport;
    $scope.selBurnoutDetectMode = Advantech.Profile.AIBurnOutScaleModeEmun;
    $scope.selSamplingRate = Advantech.Profile.DeviceEmun[module].aiSamplingSpeedEmun;
    $scope.selFilterMode = Advantech.Profile.AIIntegrationModeEmun;
    //AI channel config
    $scope.channelConfig = {};
    $scope.selRange = Advantech.Profile.DeviceEmun[module].aiRangeEmun;
    $scope.isSupportCT = Advantech.Profile.DeviceEmun[module].isSupportCT;
    $scope.isShowCalibrationBtn = false;

    function updateSpeedoMeter(aiValue, rangeId){
        if(Advantech.Profile.AIRangeInfoEmun[rangeId]!=undefined){
            //change speedoMeter range only when AI range changes
            if(rangeId != currentAiRange){
                var min = Advantech.Profile.AIRangeInfoEmun[rangeId].min;
                var max = Advantech.Profile.AIRangeInfoEmun[rangeId].max;
                speedoMeter.changeRange(min, max);
            }
            speedoMeter.setValue(aiValue);
        }

        currentAiRange = rangeId;
    }

    function updateStatusTable(){
        $scope.statusTableData = [];
        var length = $scope.channelStatus.length;
        var unit, rangeId, val, PEgF;

        for(var i=0; i<length; i++){
            rangeId = $scope.channelStatus[i].Rng;
            unit = (Advantech.Profile.AIRangeInfoEmun[rangeId]==undefined)? "" : Advantech.Profile.AIRangeInfoEmun[rangeId].unit;
            val = getAiValueWithPrecision($scope.channelStatus[i].Evt, $scope.channelStatus[i].EgF, $scope.channelStatus[i].Rng);
            if($scope.channelStatus[i].PEgF === undefined){
                PEgF = inValidString;
            }else{
                PEgF = ($scope.channelStatus[i].PEgF / 1000).toFixed(3);
            }
            if($scope.channelStatus[i].En == 0 || $scope.channelStatus[i].Evt != 0 || unit==""){
                $scope.statusTableData.push(
                    {
                        'Ch': $scope.channelStatus[i].Ch,
                        'Rng': getAiRangeName($scope.channelStatus[i].Rng),
                        'ValEg': $scope.channelStatus[i].Evt != 0 ? val : inValidString,
                        'ValHex': inValidString,
                        'ValDec': inValidString,
                        'PEgF': inValidString
                    }
                );
            }else{
                $scope.statusTableData.push(
                    {
                        'Ch': $scope.channelStatus[i].Ch,
                        'Rng': getAiRangeName($scope.channelStatus[i].Rng),
                        'ValEg': val,
                        'ValHex': $scope.channelStatus[i].Val.toString("16").toUpperCase(),
                        'ValDec': $scope.channelStatus[i].Val,
                        'PEgF': PEgF
                    }
                );
            }
        }
    }

    function getAiRangeName(rangeId){
        var name = Advantech.Profile.AIRangeEmun[rangeId];
        if(name == undefined)
            return "";
        else
            return name;
    }

    function getAiUnitName(event, rangeId){
        var unit;

        if(event != 0)
            return "";
        else{
            unit = (Advantech.Profile.AIRangeInfoEmun[rangeId]==undefined)? "" : Advantech.Profile.AIRangeInfoEmun[rangeId].unit;
            return unit;
        }
    }

    function getAiValueWithPrecision(event, aiValue, rangeId){
        var precision = Advantech.Profile.DeviceEmun[module].AiStatusEgLimitPrecision;
        var unit = (Advantech.Profile.AIRangeInfoEmun[rangeId]==undefined)? "" : Advantech.Profile.AIRangeInfoEmun[rangeId].unit;
        var val;

        if(event == 0){//normal
            if(rangeId == 480){//UDI
                val = aiValue;
            }else{
                if(unit=="V" || unit=="A"){
                    val = parseFloat(aiValue/1000.0);
                }else{
                    val = parseFloat(aiValue);
                }
                if(typeof(precision) != 'undefined'){
                   val = Advantech.Utility.sprintFlowValue(val, precision);
                }
            }
        }else{
            var errEvtArray = Advantech.Utility.convertMaskToArray(event, 32);
            for(var i = 0; i < 32; ++i){
                if(errEvtArray[i] == 1){
                    var code = Math.pow(2, i);
                    val = ""+Advantech.Profile.AIEventStatusEmun[code]+"\r\n";
                }
            }
        }
        return val;
    }

    function loadAiStatus(isPeriodical){
        if(isPeriodical == undefined){
            Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        }
        gobalTimer.ClearTimer();

        var url = URL_AI_VALUE + "/slot_" + recordObj.getSlotId();

        $http({
            method: 'GET',
            url: url,
            params: { 'parm': new Date().getTime() }
        })
        .then(function(response) {
            $scope.channelStatus = response.data.AIVal;
            var rangeId = $scope.channelStatus[$scope.selectedOption.Ch].Rng;
            $scope.statusRange = getAiRangeName(rangeId);
            var aiValWithPrecision = getAiValueWithPrecision($scope.channelStatus[$scope.selectedOption.Ch].Evt, $scope.channelStatus[$scope.selectedOption.Ch].EgF, rangeId);
            $scope.statusValue = aiValWithPrecision;
            $scope.statusUnit = getAiUnitName($scope.channelStatus[$scope.selectedOption.Ch].Evt, rangeId);//todo
            updateSpeedoMeter(aiValWithPrecision, rangeId);
            //update status table data
            updateStatusTable();
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            if(currentAiTab == "status"){
                gobalTimer.EnableTimer(function(){loadAiStatus(true)}, pollingRate);
            }
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    function loadAiChannelConfig(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        gobalTimer.ClearTimer();

        var url = URL_AI_CONFIG + "/slot_" + recordObj.getSlotId();

        $http({
            method: 'GET',
            url: url,
            params: { 'parm': new Date().getTime() }
        })
        .then(function(response) {
            $scope.channelConfig = response.data.AICfg;
            for(var i=0; i < $scope.channelConfig.length; i++){
                $scope.channelConfig[i].En = $scope.channelConfig[i].En + '';
                $scope.channelConfig[i].RngName = getAiRangeName($scope.channelConfig[i].Rng);
            }

            updateCalibrationBtn();

            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }
    function loadAiCommonConfig(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        gobalTimer.ClearTimer();

        var url = URL_AI_GEN_CONFIG + "/slot_" + recordObj.getSlotId();

        $http({
            method: 'GET',
            url: url,
            params: { 'parm': new Date().getTime() }
        })
        .then(function(response){
            $scope.commonConfig = response.data;

            if(response.data.EnB !== undefined && response.data.BMd !== undefined){
                // $scope.isShowAiBurnout = true;
                $scope.isShowAiBurnout = false; // disable according firmware request
                $scope.commonConfig.EnB = $scope.commonConfig.EnB +'';
            }
            $scope.$digest();
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        });
    }

    $scope.onAiStatusChannelChange = function(){
        //console.log($scope.selectedOption.Ch);
        var rangeId = $scope.channelStatus[$scope.selectedOption.Ch].Rng;
        var min = Advantech.Profile.AIRangeInfoEmun[rangeId].min;
        var max = Advantech.Profile.AIRangeInfoEmun[rangeId].max;

        //change speedoMeter range only when AI range changes
        if(rangeId != currentAiRange){
           speedoMeter.changeRange(min, max);
        }
    }

    $scope.onAiConfigChannelChange = function(){
        updateCalibrationBtn();
    }

    $scope.switchAiTab = function(tabId){
        if(currentAiTab == tabId)
            return;

        if(tabId == "status"){
            currentAiTab = tabId;
            //Advantech.Form.WaitingForm.getInstance().showPleaseWait();
            loadAiStatus();
        }else{
            currentAiTab = tabId;
            loadAiChannelConfig();
        }
    }

    $scope.switchAiConfigTab = function(tabId){
        if(currentAiConfigTab == tabId)
            return;

        if(tabId == "channel"){
            currentAiConfigTab = tabId;
            loadAiChannelConfig();
        }else{
            currentAiConfigTab = tabId;
            loadAiCommonConfig();
        }
    }

    function updateCalibrationBtn(){
        //var rangeVal = $scope.channelConfig[$scope.selectedOption.Ch].Rng;
        //var rangeObj = Advantech.Profile.AIRangeInfoEmun[rangeVal];

        if($scope.selectedOption.Ch == 0) //if($scope.selectedOption.Ch == 0 && (rangeObj.unit == "V" || rangeObj.unit == "mV"))
            $scope.isShowCalibrationBtn = true;
        else
            $scope.isShowCalibrationBtn = false;
    }

    $scope.btnDefaultCalibrationClick = function(){
        var rangeVal = $scope.channelConfig[$scope.selectedOption.Ch].Rng;
        var rangeObj = Advantech.Profile.AIRangeInfoEmun[rangeVal];
        rangeObj.zero = 0;//always 0 for Zero calibration
        rangeObj.span = Advantech.Profile.DeviceEmun[module].spanCalibrationDesc;//Span calibration
        Advantech.Form.CalibrationForm.getInstance().showCalibrationForm(rangeObj);
    }

    $scope.btnCalibrationClick = function(){
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
    }

    $scope.btnCommonConfigClick = function(){
        if(!$scope.isShowAiBurnout){
            return;
        }
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var requestData = $scope.commonConfig;
        var url = URL_AI_GEN_CONFIG + "/slot_" + $scope.slotId;

        requestData.BMd = int(requestData.BMd);
        requestData.EnB = int(requestData.EnB);
        //requestData.Smp = int(requestData.Smp);
        delete requestData.AiT;
        delete requestData.Res;
        delete requestData.Smp;

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadAiCommonConfig();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.btnChannelConfigClick = function(){
        Advantech.Form.WaitingForm.getInstance().showPleaseWait();
        var requestData = $scope.channelConfig;
        var url = URL_AI_CONFIG + "/slot_" + $scope.slotId;

        for(var i=0; i < requestData.length; i++){
            if($scope.isSupportCT && (requestData[i].Prop == null || parseInt(requestData[i].Prop) < 100 ||
                    parseInt(requestData[i].Prop) > 20000)){
                Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
                Advantech.Form.MessageForm.getInstance().showMessageBox("Error", "Turns Ratio must be 100~20000", null);
                return;
            }

        }

        for(var i=0; i < requestData.length; i++){
            requestData[i].Ch = int(requestData[i].Ch);
            requestData[i].En = int(requestData[i].En);
            requestData[i].Rng = int(requestData[i].Rng);
            if($scope.isSupportCT && requestData[i].Prop != null){
                requestData[i].Prop = int(requestData[i].Prop);
            }
            delete requestData[i].RngName;
        }

        requestData = {"AICfg": requestData};

        $http({
            method: 'PATCH',
            url: url,
            data: requestData
        })
        .then(function(response) {
            loadAiChannelConfig();
        }, function(error) {
            Advantech.Form.WaitingForm.getInstance().hidePleaseWait();
            angularShowHttpErrorMessage(error);
        })
    }

    $scope.btnChannelConfigRefreshClick = function(){
        var selectedCH = $scope.selectedOption.Ch;
        loadAiChannelConfig();
        $scope.selectedOption.Ch = selectedCH;
    }

    $scope.onStatusTableClick = function(chId){
        $scope.selectedOption.Ch = chId;
    }

    Advantech.Form.WaitingForm.getInstance().showPleaseWait();
    loadAiStatus();

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
        if ((Advantech.Utility.isIE() && Advantech.Utility.isIE() <= 10)
            || Advantech.Utility.isSafari()
            || Advantech.Utility.isIPhone()
            || Advantech.Utility.isIPad()
            || Advantech.Utility.isAndroid()) {
            $('.fileinput').fileinput('reset');
            $('#btnFirmware').hide("slow");
            Advantech.Form.MessageForm.getInstance().showMessageBox("Notification", "Upload function not be supported by this browser, browser version or platform. Suggest changing browser(<a href='https://www.google.com/chrome/'>Chrome</a>, <a href='https://mozilla.com/firefox/'>Firefox</a> or <a href='http://windows.microsoft.com/en-us/internet-explorer/download-ie'>Internet Explorer</a>(version 11 or above)) or PC to try again.");
            return;
        }

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
                Advantech.Utility.restartPage(10, function() {
                    if (Advantech.Utility.checkExternalFunExist()) {
                        Advantech.Utility.callExternalFun('control', '');
                    } else {
                        Advantech.Utility.reConnectPage();
                    }
                });
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

    // Site Survey
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
        "maxBackoffNumber": 0,
        "avgBackoffNumber": 0,
        "totalNoAck": 0,
        "totalChannelBusy": 0
    };
    $scope.hasTmOrErr = false;
    $scope.sendList = [];
    var totalRssi = 0;
    var totalBackoffNumber = 0;
    var bPendingPacketStop = false;
    var curMaxRssi = -200;
    var curMinRssi = 0;
    var curMaxBackoffNumber = 0;
    $scope.isShowDownload = false;
    $scope.isSupDownloadAttr = ('download' in document.createElement('a'));
    $scope.CSVData = '';

    function sendSiteSurveyPacket(){
        $scope.siteSurvey.currentPacketSend++;
        $http({
            method: 'GET',
            url: URL_SITE_SURVEY_STATUS + '/slot_0',
            params: { 's': new Date().getTime() }
        })
        .then(function(response) {
            if (!$scope.hasTmOrErr && (typeof response.data.Tm != 'undefined' || typeof response.data.Err != 'undefined')) {
                $scope.hasTmOrErr = true;
            }

            if ($scope.hasTmOrErr && typeof response.data.Tm != 'undefined') {
                if (response.data.Tm > curMaxBackoffNumber) {
                    $scope.siteSurvey.maxBackoffNumber = response.data.Tm;
                    curMaxBackoffNumber = response.data.Tm;
                }
                totalBackoffNumber += response.data.Tm;
                $scope.siteSurvey.avgBackoffNumber = Number(totalBackoffNumber/$scope.siteSurvey.currentPacketSend).toFixed(1);
            }

            if(response.data.Stat == 1){
                $scope.siteSurvey.successPacketCount++;
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
            }else{
                $scope.siteSurvey.failedPacketCount++;
                if ($scope.hasTmOrErr) {
                    if (response.data.Err === 0) {
                        $scope.siteSurvey.totalNoAck++;
                    } else if (response.data.Err === 1) {
                        $scope.siteSurvey.totalChannelBusy++;
                    }
                }
            }

            $scope.sendList.push({
                Stat: response.data.Stat,
                Rssi: response.data.Rssi,
                Tm:   typeof response.data.Tm != 'undefined' ? response.data.Tm : 'none',
                Err:  typeof response.data.Err != 'undefined' ? (response.data.Err === 0 ? 'No Ack' : 'Channel Busy') : 'none',
                textColor: response.data.Stat === 1 ? {color:'#428bca'} : {color:'#d9534f'}
            });

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
        if ($scope.hasTmOrErr) {
            _CSVData += 'Result,RSSI,Backoff Number,Fail Status\r\n';
            $scope.sendList.forEach(function(item) {
                _CSVData += item.Stat == 1 ? 'Success' : 'Failed';
                _CSVData += ',';
                _CSVData += item.Rssi;
                _CSVData += ',';
                _CSVData += item.Tm;
                _CSVData += ',';
                _CSVData += item.Err;
                _CSVData += '\r\n';
            });
        } else {
            _CSVData += 'Result,RSSI\r\n';
            $scope.sendList.forEach(function(item) {
                _CSVData += item.Stat == 1 ? 'Success' : 'Failed';
                _CSVData += ',';
                _CSVData += item.Rssi;
                _CSVData += '\r\n';
            });
        }

        if ($scope.isSupDownloadAttr) {
            $scope.CSVData += 'text/csv;charset=utf-8,' + encodeURIComponent(_CSVData);
        } else {
            $scope.CSVData = _CSVData;
        }

        $scope.isShowDownload = true;
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
            $scope.siteSurvey.maxBackoffNumber = 0;
            $scope.siteSurvey.avgBackoffNumber = 0;
            $scope.siteSurvey.totalNoAck = 0;
            $scope.siteSurvey.totalChannelBusy = 0;
            totalRssi = 0;
            totalBackoffNumber = 0;
            $scope.sendList = [];
            curMaxRssi = -200;
            curMinRssi = 0;
            curMaxBackoffNumber = 0;
            $scope.isShowDownload = false;
            $scope.CSVData = '';
            sendSiteSurveyPacket();
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
    // End For Site Survey
    /////////////////////////////////////////////////////////
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
