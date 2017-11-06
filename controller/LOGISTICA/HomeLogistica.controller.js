var urlGlobal = sessionStorage.urlGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.HomeLogistica", {

       onInit: function(oEvent) {
       },
       
       onNavBack: function(oEvent) {
           this.getRouter().navTo("home");
       },
       
   });
});