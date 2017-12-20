var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/m/MessageToast"
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME13", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent) {
           this.getRouter().navTo("home");
       },
       
       onDisplay: function(oEvent){
        var Infnr = this.byId("iptReginfo").getValue();
        
        if (Infnr != "") {

        var thes = this;
        var cnx = JSON.parse(ConexionGlobal);

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_Infnr" : Infnr           
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ValidarRegistroinfo.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {                           
            if (response=="") {
              sap.m.MessageToast.show("El registro info ingresado no existe");
            }else{
              sessionStorage.Infnr = Infnr;       
              thes.getRouter().navTo("me13v");
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