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

      var thes = this; 
      this.cargarGrupoArt(thes);

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
                          thes.propiedadesInput(thes,response,"me12m","lfm1");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
           
                data._tabla = "mara"; 
                
                $.ajax({
                      data:  data,
                      url:   '/erp/model/long_campo.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {    
                          thes.propiedadesInput(thes,response,"me12m","mara");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
                
                data._tabla = "eina"; 
                
                $.ajax({
                      data:  data,
                      url:   '/erp/model/long_campo.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {    
                          thes.propiedadesInput(thes,response,"me12m","eina");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
                data._tabla = "eine"; 
                
                $.ajax({
                      data:  data,
                      url:   '/erp/model/long_campo.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {    
                          thes.propiedadesInput(thes,response,"me12m","eine");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

      var Infnr = sessionStorage.Infnr;

      var cnx = JSON.parse(ConexionGlobal);

      var parametros = {
        "_Ip" : cnx[0].ip,
        "_Usuario_servidor" : cnx[0].usuario_servidor,
        "_Pass_servidor" : cnx[0].pass_servidor,
        "_Base_datos" : cnx[0].base_datos,
        "_infnr" : Infnr
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
   onHome: function(oEvent) {
     this.getRouter().navTo("home");
   },

   onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },
   cargarGrupoArt:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._matkl = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarGrupo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbGrupoArt");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    }
 });
 });