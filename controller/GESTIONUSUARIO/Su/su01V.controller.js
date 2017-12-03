  var ConexionGlobal = sessionStorage.ConexionGlobal;

  sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
   ], function (BaseController, JSONModel,MessageToast) {
     "use strict";
     return BaseController.extend("sap.ui.su01.controller.GESTIONUSUARIO.Su.Su01V", {

       onInit: function(oEvent) { 


        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("su01V").attachPatternMatched(this._onObjectMatched, this);        
       }, 

       _onObjectMatched: function (oEvent) {
        var Usuario = oEvent.getParameter("arguments").usuario;

        var thes = this;

        var cnx = JSON.parse(ConexionGlobal);

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_empresa" : cnx[0].empresa,
          "_usuario" : Usuario           
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ListarUsuario.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {
            response = JSON.parse(response);   
            //response = response[0];
            var oModel = new sap.ui.model.json.JSONModel(response);  
            thes.byId("su01v").setModel(oModel);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });


       },

       onBack: function(oEvent){
        this.getRouter().navTo("su01");
       },

       onEdit: function(oEvent){
        var Usuario = this.byId("objHusuario").getTitle();
        this.getRouter().navTo("su01M",{usuario:Usuario});
       }

   });
  });