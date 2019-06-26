var ConexionGlobal = sessionStorage.ConexionGlobal;

sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast",
 "sap/m/Dialog",
 "sap/m/Button",
 "sap/m/Text",
 "sap/m/Label",
 "sap/m/Input",
 'sap/ui/core/Fragment'
 ], function (BaseController, JSONModel,MessageToast,Dialog,Button,Text,Label,Input,Fragment) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.Mm01", {

     onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("mm01").attachPatternMatched(this._onObjectMatched, this);
      
    },
    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarTipo(thes);
      //this.cargarMaterial(thes);


     },
     onBack: function(oEvent){
       this.getRouter().navTo("home");
     },
     onHome: function(oEvent) {
       this.getRouter().navTo("home");
     },

     onNew: function(oEvent){

       var tipoMaterial = this.byId("inpTipoMaterial").getValue();

       if (tipoMaterial == "") {
        
        sap.m.MessageToast.show("Seleccione tipo de material");

       }else{

        sessionStorage.mtart = tipoMaterial;

        this.getRouter().navTo("mmC");

        /*var thes = this;
        var cnx = JSON.parse(ConexionGlobal);

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_Matnr" : Matnr,
          "_Werks": Werks         
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ValidarMaterialSolo.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {                           
            if (response=="") {
              sap.m.MessageToast.show("El material ingresado no existe");
            }else{     
              thes.oPersonalizationDialog = new sap.ui.xmlfragment("sap.ui.su01.view.LOGISTICA.Mm.Vistas", thes);              
              thes.getView().addDependent(thes.oPersonalizationDialog);              
              thes.oPersonalizationDialog.open();
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });              */

      }

    },

    onCopy: function(oEvent){
     this.getRouter().navTo("mmC");
   },

    onSalirVistas: function(oEvent){
      this.oPersonalizationDialog.close();
    },

    onAceptarVistas: function(oEvent){
      var chkCompras = this.byId("chkAlmacenamiento-CbBg").getValue();  
      var chkAlmacenamiento = this.byId("diaVistas--chkAlmacenamiento").getValue();  

      alert("Compras: " + chkCompras);
      alert("Almacenamiento: " + chkAlmacenamiento);

    },
    cargarTipo:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._mtart = "";
      data._spras = "";  

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarTipo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbTipo");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    }/*,
    cargarMaterial:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._matnr = "";
      data._werks = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/ListarMaterial.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbMaterial");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    }*/
 });
 });