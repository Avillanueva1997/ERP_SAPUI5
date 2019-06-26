sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (BaseController, JSONModel,MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.GESTIONUSUARIO.Pfcg.Pfcg03", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent){
           this.byId("ipRol").setValue("");
           this.getRouter().navTo("home");
       },
       onHome: function(oEvent) {
         this.getRouter().navTo("home");
       },
       onDisplay: function(oEvent){
           if(this.byId("ipRol").getValue() === ""){
            MessageToast.show("Ingresar Rol");
            return;
           }
           this.getRouter().navTo("pfcgV");
       }
       
   });
});