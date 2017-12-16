var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.MK.MK03", {

     onInit: function(oEvent) {
     },

     onBack: function(oEvent) {
       this.getRouter().navTo("home");
     },

     onDisplay: function(oEvent){
      var Lifnr = this.byId("inpLifnr").getValue();
      //var Ekorg = this.byId("inpEkorg").getValue();
      var Ekorg = "";

      if (Lifnr != "") {

        var thes = this;
        var cnx = JSON.parse(ConexionGlobal);

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_Lifnr" : Lifnr,            
          "_Ekorg" : Ekorg            
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ValidarProveedor.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {                           
            if (response=="") {
              sap.m.MessageToast.show("El proveedor ingresado no existe");
            }else{
              sessionStorage.Lifnr = Lifnr;
              sessionStorage.Ekorg = Ekorg;        
              thes.getRouter().navTo("mk03v");
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });              
      }else{
        MessageToast.show("Complete todos los campos");
      } 
    }
  });
 });