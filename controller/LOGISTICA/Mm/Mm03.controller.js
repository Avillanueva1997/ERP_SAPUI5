var ConexionGlobal = sessionStorage.ConexionGlobal;

sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast",
 "sap/m/Dialog",
 "sap/m/Button",
 "sap/m/Text",
 "sap/m/Label",
 "sap/m/Input"
 ], function (BaseController, JSONModel,MessageToast,Dialog,Button,Text,Label,Input) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.Mm03", {

     onInit: function(oEvent) {
     },

     onBack: function(oEvent){
       this.getRouter().navTo("home");
     },

     onDisplay: function(oEvent){        

      var Matnr = this.byId("inpMatnr").getValue();
      //var Werks = this.byId("inpWerks").getValue();
      var Werks = "";

      if (Matnr != "") {

        var thes = this;
        var cnx = JSON.parse(ConexionGlobal);

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_Matnr" : Matnr,
          "_Werks" : Werks            
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ValidarMaterial.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {                           
            if (response=="") {
              sap.m.MessageToast.show("El material ingresado no existe");
            }else{          
              sessionStorage.Matnr = Matnr;
              sessionStorage.Werks = Werks;      
              thes.getRouter().navTo("mmV");
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });              
      }else{
        sap.m.MessageToast.show("Ingrese todos los campos");
      }
    }

  });
 });