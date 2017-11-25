var urlGlobal = sessionStorage.urlGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/m/MessageToast"
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME11C", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent) {
           this.getRouter().navTo("me11");
       },
       
       onPressEnter: function(oEvent) {
           MessageToast.show("Button pressed");
       },
   });
});