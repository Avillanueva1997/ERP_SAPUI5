var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.MK.MK02M", {

    onInit: function(oEvent) {

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("mk02m").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {

      var lifnr = sessionStorage.Lifnr;
      var ekorg = sessionStorage.Ekorg;

      var thes = this;

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
          thes.byId("mk02m").setModel(oModel);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

      $.ajax({
        data:  parametros,
        url:   '/erp/model/ListarLfbk.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response);   
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("mk02m").setModel(oModel,"tbBancarios");
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      }); 

    },
    
    onBack: function(oEvent) {
      sessionStorage.removeItem('Lifnr');
      sessionStorage.removeItem('Ekorg');
      this.getRouter().navTo("mk02");
      this.clearModel("mk02m");
    },

    onAdd: function(oEvent){
      
    },
    
    onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },
 });
 });