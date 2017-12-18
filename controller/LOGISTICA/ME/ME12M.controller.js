var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME12M", {

     onInit: function(oEvent) {        
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("me12m").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {

      var Infnr = sessionStorage.Infnr;
      var Ekorg = sessionStorage.Ekorg;
      var Werks = sessionStorage.Werks;
      var Esokz = sessionStorage.Esokz;

      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);

      var parametros = {
        "_Ip" : cnx[0].ip,
        "_Usuario_servidor" : cnx[0].usuario_servidor,
        "_Pass_servidor" : cnx[0].pass_servidor,
        "_Base_datos" : cnx[0].base_datos,
        "_infnr" : Infnr,
        "_ekorg" : Ekorg,
        "_esokz" : Esokz,
        "_werks" : Werks
      };

      $.ajax({
        data:  parametros,
        url:   '/erp/model/ListarRegistroinfo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {        
          response = JSON.parse(response);   
          response = response[0];
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("me12m").setModel(oModel);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },

    onBack: function(oEvent) {
     this.getRouter().navTo("me12");
     this.clearModel("me12m");
   },

   onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },
 });
 });