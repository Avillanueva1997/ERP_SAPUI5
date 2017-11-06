/*var urlGlobal = 'http://cstisrvides.csticorp.biz:8800/sap/bc/zsw_su01?sap-client=800';
sessionStorage.urlGlobal = urlGlobal;*/

jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.define([
   "sap/ui/su01/controller/BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.Login", {

       onInit: function(oEvent) {           
                     
       },               
              
       onPressAcceder: function(oEvent){       
           /*var lv_empresa = this.getView().byId("txtEmpresa");
           var lv_usuario = this.getView().byId("txtUsuario");
           var lv_password = this.getView().byId("txtPassword");
           
           if(lv_password.getValue() === ""){
               sap.m.MessageToast.show("Ingresar Password");
               lv_password.setValueState(sap.ui.core.ValueState.Error);
               return false;
           }else{
               lv_password.setValueState(sap.ui.core.ValueState.None);
           }
           if(lv_usuario.getValue() === ""){
               sap.m.MessageToast.show("Ingresar Usuario");
               lv_usuario.setValueState(sap.ui.core.ValueState.Error);
               return false;
           }else{
               lv_usuario.setValueState(sap.ui.core.ValueState.None);
           }
           if(lv_empresa.getValue() === ""){
               sap.m.MessageToast.show("Ingresar Empresa");
               lv_empresa.setValueState(sap.ui.core.ValueState.Error);
               return false;
           }else{
               lv_empresa.setValueState(sap.ui.core.ValueState.None);
           }*/           
           this.getRouter().navTo("home");
       },
       
       onPressLimpiar: function(oEvent) {
           
           var lv_empresa = this.getView().byId("txtEmpresa");
           var lv_usuario = this.getView().byId("txtUsuario");
           var lv_password = this.getView().byId("txtPassword");
           
           lv_empresa.setValue("");
           lv_usuario.setValue("");
           lv_password.setValue("");
           
           sap.m.MessageToast.show("Se limpió");
           
       },      

   });
});