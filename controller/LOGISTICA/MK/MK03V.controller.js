var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/m/MessageToast"
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.MK.MK03V", {

       onInit: function(oEvent) {

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("mk03v").attachPatternMatched(this._onObjectMatched, this);

           
       },

       _onObjectMatched: function (oEvent) {


        var thes = this; 

        var cnx = JSON.parse(ConexionGlobal);
        var data = {};
        data._Ip = cnx[0].ip;
        data._Usuario_servidor = cnx[0].usuario_servidor;
        data._Base_datos = cnx[0].base_datos;
        data._Pass_servidor = cnx[0].pass_servidor; 

        data._tabla = "lfm1"; 
   
        $.ajax({
              data:  data,
              url:   '/erp/model/long_campo.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {    
                  thes.propiedadesInput(thes,response,"mk03v","lfm1");
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });
   
        data._tabla = "lfa1"; 
        
        $.ajax({
              data:  data,
              url:   '/erp/model/long_campo.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {    
                  thes.propiedadesInput(thes,response,"mk03v","lfa1");
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });
        
        /*data._tabla = "lfbk"; 
        
        $.ajax({
              data:  data,
              url:   '/erp/model/long_campo.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {    
                  thes.propiedadesInput(thes,response,"mk03v","lfbk");
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });*/


             var lifnr = sessionStorage.Lifnr;
             var ekorg = sessionStorage.Ekorg;

             var cnx = JSON.parse(ConexionGlobal);

             var parametros = {
                "_Ip" : cnx[0].ip,
                "_Usuario_servidor" : cnx[0].usuario_servidor,
                "_Pass_servidor" : cnx[0].pass_servidor,
                "_Base_datos" : cnx[0].base_datos,
                "_lifnr" : lifnr,
                "_ekorg" : ekorg            
             };

             $.ajax({
                        data:  parametros,
                        url:   '/erp/model/ListarProveedor.php', 
                        type:  'post',
                        async: false,
                        beforeSend: function () {
                        },
                        success:  function (response) {        
                            response = JSON.parse(response);   
                            response = response[0];
                            var oModel = new sap.ui.model.json.JSONModel(response);  
                            thes.byId("mk03v").setModel(oModel);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            alert(xhr.status);
                            alert(thrownError);
                        }
                    });

             /*  $.ajax({
                        data:  parametros,
                        url:   '/erp/model/ListarLfbk.php', 
                        type:  'post',
                        async: false,
                        beforeSend: function () {
                        },
                        success:  function (response) {
                           response = JSON.parse(response);   
                           var oModel = new sap.ui.model.json.JSONModel(response);  
                           thes.byId("tbDatosbanc").setModel(oModel);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            alert(xhr.status);
                            alert(thrownError);
                        }
                    });*/

       },
       
       onBack: function(oEvent) {
           sessionStorage.removeItem('Lifnr');
           sessionStorage.removeItem('Ekorg');
           this.getRouter().navTo("mk03");
           this.clearModel("mk03v");
       },
       onHome: function(oEvent) {
         this.getRouter().navTo("home");
       },
       
       onPressEnter: function(oEvent) {
           MessageToast.show("Button pressed");
       },
   });
});