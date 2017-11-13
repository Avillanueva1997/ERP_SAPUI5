sap.ui.define([
   "sap/ui/su01/controller/BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.Mm01", {

       onInit: function(oEvent) {
       },
       
       
       onBack: function(oEvent){
           this.getRouter().navTo("home");
       },
       
       onNew: function(oEvent){
           this.getRouter().navTo("mmC");
       },
       
       onCopy: function(oEvent){
           this.getRouter().navTo("mmC");
       }
   });
});