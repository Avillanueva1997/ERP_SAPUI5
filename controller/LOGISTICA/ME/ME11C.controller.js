var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast"
 ], function (BaseController, JSONModel, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME11C", {

     onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("me11c").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarGrupoArt(thes);

      $.ajax({
          //data:  parametros,
          url:   '/erp/model/entidades/registroinfo.json', 
          type:  'post',
          async: false,
          success:  function (response) {
            var oModel = new sap.ui.model.json.JSONModel(response); 
            thes.byId("me11c").setModel(oModel);   
            var Proveedor = sessionStorage.Proveedor;
            var Material = sessionStorage.Material;
            var Orgcomp = sessionStorage.Orgcomp;
            var Centro = sessionStorage.Centro;

            thes.byId("iptProveedor").setValue(Proveedor);
            thes.byId("iptMaterial").setValue(Material);
            thes.byId("iptOrgcomp").setValue(Orgcomp); 
            thes.byId("iptCentro").setValue(Centro);  

          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });

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
                          thes.propiedadesInput(thes,response,"me11c","lfm1");
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
                          thes.propiedadesInput(thes,response,"me11c","mara");
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
                          thes.propiedadesInput(thes,response,"me11c","eina");
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
                          thes.propiedadesInput(thes,response,"me11c","eine");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

   }, 
    onBack: function(oEvent) {
     this.getRouter().navTo("me11");
     this.clearModel("me11c");
   },
   onHome: function(oEvent) {
     this.getRouter().navTo("home");
   },
   
   onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },

   onSave: function(oEvent){   
    

    var registroinfo = this.byId("iptReginfo").getValue();

    if (registroinfo == "") {

      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = this.byId("me11c").getModel().getData();
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 

      $.ajax({
        data:  data,
        url: '/erp/model/InsertarRegistroinfo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {     
          data.infnr = response;
          thes.byId("me11c").getModel().refresh();
          sap.m.MessageToast.show("Se creó el registro info: " +  response );
            /*response = JSON.parse(response);   
            response = response[0];
            var oModel = new sap.ui.model.json.JSONModel(response);  
            thes.byId("mmm").setModel(oModel);*/
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }

        });

      this.getRouter().navTo("me11");

    }/*else{
      sap.m.MessageToast.show("El registro info ya está creado");
    }*/

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