sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (BaseController, JSONModel,MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.Su01", {

       onInit: function(oEvent) {
       },
       
       onDisplay: function(oEvent){
           this.getRouter().navTo("su01v");
       }
       
   });
});