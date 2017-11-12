var urlGlobal = sessionStorage.urlGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/m/MessageToast"
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME12", {

       onInit: function(oEvent) {
       },
       
       onNavBack: function(oEvent) {
           this.getRouter().navTo("home");
       },
       
       onPressEnter: function(oEvent) {
           this.getRouter().navTo("me12m");
       },
   });
});