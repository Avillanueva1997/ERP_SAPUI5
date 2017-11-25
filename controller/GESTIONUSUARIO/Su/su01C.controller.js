jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (BaseController, JSONModel,MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.GESTIONUSUARIO.Su.Su01C", {

       onInit: function(oEvent){
       },
       
       onBack: function(oEvent){
           this.getRouter().navTo("su01");
       },
       
       onSave: function(oEvent){
           var thes = this;
           
           var _Nombre = this.getView().byId('inpNombre').getValue();
           var _Apellido = this.getView().byId('inpApellido').getValue();
           var _Correo = this.getView().byId('inpCorreo').getValue();
           var _Celular = this.getView().byId('inpCelular').getValue();
           var _Contrasena = this.getView().byId('inpContrasena').getValue();
           
           var parametros = {
               "_Nombre" : _Nombre,
               "_Apellido" : _Apellido,
               "_Correo" : _Correo,
               "_Celular" : _Celular,
               "_Contrasena" : _Contrasena
           };
           
           $.ajax({
              data:  parametros,
              url:   '/erp/model/ConsultasBD.php', 
              type:  'post',
              beforeSend: function () {
                  //$("#Ord1").html("Procesando, espere por favor...");
              },
              success:  function (response) {
                  //$("#Ord1").html(response);
                  var hola = response;  
                  //thes.byId('Ord1').setValue(hola);
                  alert(hola);
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });
       }       
   });
});