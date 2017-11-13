sap.ui.define([
   "sap/ui/su01/controller/BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.Mm03", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent){
           this.getRouter().navTo("home");
       },
       
       onDisplay: function(oEvent){
           this.getRouter().navTo("mmV");
       }
       
   });
});