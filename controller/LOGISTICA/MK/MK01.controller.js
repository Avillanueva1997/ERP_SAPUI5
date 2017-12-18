var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/m/MessageToast"
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.MK.MK01", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent) {
           this.getRouter().navTo("home");
       },
       
       onNew: function(oEvent){
           
           var lifnr = this.byId("iptLifnr").getValue();
           if (lifnr == "") {
            sap.m.MessageToast.show("Ingrese codigo de acreedor a crear");
          }else{

            var thes = this;
            var cnx = JSON.parse(ConexionGlobal); 
            var data = {};       
            data._Ip = cnx[0].ip;
            data._Usuario_servidor = cnx[0].usuario_servidor;
            data._Base_datos = cnx[0].base_datos;
            data._Pass_servidor = cnx[0].pass_servidor;
            data._Lifnr = lifnr;

            $.ajax({
              data:  data,
              url:   '/erp/model/ValidarProveedor.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {   
              if (response == "") {
                sessionStorage.Lifnr = thes.byId("iptLifnr").getValue();
                thes.getRouter().navTo("mk01c");
              }else{
                sap.m.MessageToast.show("El codigo de acreedor ingresado ya existe");
              }                      
              },
              error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
              }

            });
          }  
           
       },
       
       onCopy: function(oEvent){
           this.getRouter().navTo("mk01c");
       }
   });
});