var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast",
 "sap/m/Dialog"
 ], function (BaseController, JSONModel, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.GS.MM60", {

    onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("mm60").attachPatternMatched(this._onObjectMatched, this);
      
    },
    _onObjectMatched: function(oEvent) {

    },
    onSave: function(oEvent){

    },
    onAdd: function(oEvent){

    },
    onDelete: function(oEvent){

    },
    onBack: function(oEvent){
      var thes = this;
      thes.getRouter().navTo("home");

    },
    onHome: function(oEvent){
      var thes = this;
      thes.getRouter().navTo("home");

    }/*,
    onReset: function(oEvent) {
    jQuery.sap.require("sap.m.MessageToast");
    // var params = oEvent.getParameters();
    var sMessage = "onReset trigered";
    sap.m.MessageToast.show(sMessage);
    },
    onSearch: function(oEvent) {
    jQuery.sap.require("sap.m.MessageToast");
    // var params = oEvent.getParameters();
    var sMessage = "onSearch trigered";
    sap.m.MessageToast.show(sMessage);
  }*/

    });
 });