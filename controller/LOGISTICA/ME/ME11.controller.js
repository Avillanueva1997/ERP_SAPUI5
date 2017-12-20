var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME11", {

     onInit: function(oEvent) {
     },

     onBack: function(oEvent) {
       this.getRouter().navTo("home");
     },

     onNew: function(oEvent){
       var Proveedor = this.byId("iptProveedor").getValue();
       var Material = this.byId("iptMaterial").getValue();
       var Orgcomp = this.byId("iptOrgcomp").getValue();
       var Centro = this.byId("iptCentro").getValue();

       if (Proveedor == "") {
        sap.m.MessageToast.show("Ingrese codigo de proveedor");
        return 0;
      }else{
        var thes = this;
        var error = "";
        var cnx = JSON.parse(ConexionGlobal); 
        var data = {};       
        data._Ip = cnx[0].ip;
        data._Usuario_servidor = cnx[0].usuario_servidor;
        data._Base_datos = cnx[0].base_datos;
        data._Pass_servidor = cnx[0].pass_servidor;
        data._Lifnr = Proveedor;

        $.ajax({
          data:  data,
          url:   '/erp/model/ValidarProveedor.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {   
            if (response == "") {
              sap.m.MessageToast.show("El codigo de proveedor ingresado no existe");
              error = "X";
            }                      
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });            
      }

      if (error == "") {

        if (Material == "") {
          sap.m.MessageToast.show("Ingrese codigo de material");
          return 0;
        }else{
          var thes = this;
          var cnx = JSON.parse(ConexionGlobal); 
          var data = {};       
          data._Ip = cnx[0].ip;
          data._Usuario_servidor = cnx[0].usuario_servidor;
          data._Base_datos = cnx[0].base_datos;
          data._Pass_servidor = cnx[0].pass_servidor;
          data._Matnr = Material;
            //data._Werks = Centro;
          data._Werks = "";

            $.ajax({
              data:  data,
              url:   '/erp/model/ValidarMaterialSolo.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {   
                if (response == "") {
                  sap.m.MessageToast.show("El codigo de material ingresado no existe");
                  error = "X";
                }                     
              },
              error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
              }
            });  
          }
        }

        if (error == "") {
          if (Orgcomp == "") {
            sap.m.MessageToast.show("Ingrese organización de compras");
            return 0;
          }
        }

        if (error == "") {
          if (Centro == "") {
            sap.m.MessageToast.show("Ingrese centro");
            return 0;
          }
        }

        if (error == "") {
          if (error == "") {
           sessionStorage.Proveedor = this.byId("iptProveedor").getValue();
           sessionStorage.Material = this.byId("iptMaterial").getValue();
           sessionStorage.Orgcomp = this.byId("iptOrgcomp").getValue();
           sessionStorage.Centro = this.byId("iptCentro").getValue();

           this.getRouter().navTo("me11c");
         }      
       }     
     },

     onCopy: function(oEvent){
       this.getRouter().navTo("me11C");
     }
   });
 });