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


      var thes = this; 
      //this.cargarDatosBancarios(thes);

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
                thes.propiedadesInput(thes,response,"mk02m","lfm1");
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
                thes.propiedadesInput(thes,response,"mk02m","lfa1");
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
                thes.propiedadesInput(thes,response,"mk02m","lfbk");
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
          thes.byId("mk02m").setModel(oModel);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

      /*$.ajax({
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
      }); */

    },
    /*cargarDatosBancarios: function(thes){

      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._lifnr = sessionStorage.Lifnr; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarLfbk.php', 
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
      });
    },*/
    
    onBack: function(oEvent) {
      sessionStorage.removeItem('Lifnr');
      sessionStorage.removeItem('Ekorg');
      this.getRouter().navTo("mk02");
      this.clearModel("mk02m");
    },
    onHome: function(oEvent) {
     this.getRouter().navTo("home");
    },

    /*onAdd: function(oEvent){

      var thes = this;

    $.ajax({
            url:   '/erp/model/entidades/lfbk.json', 
            type:  'GET',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var data = thes.byId("tbDatosbanc").getModel().getData();
              if(!data.length){
                var dataTabla = [];
                dataTabla.push(response);
                var oModel = new sap.ui.model.json.JSONModel(dataTabla);  
                thes.byId("tbDatosbanc").setModel(oModel);
              }else{
                data.push(response);
              }
              
              thes.byId("tbDatosbanc").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
          }); 

    var cant = this.byId("tbDatosbanc").getModel().getData().length - 1;

    thes.byId("tbDatosbanc").getItems()[cant].getCells()[0].setEditable(true);
    thes.byId("tbDatosbanc").getItems()[cant].getCells()[1].setEditable(true);
      
    },*/
    
    onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },

   /*onDelete: function(oEvent) {

     var thes = this;     
      var datosTabla = this.byId("tbDatosbanc").getModel().getData();   
      var selectData = this.byId("tbDatosbanc").getSelectedContextPaths()
      var index;

      for (var i = selectData.length - 1;i >= 0; i--) {

        index = selectData[i].substring(1);
        datosTabla.splice(index, 1);

      }

      this.byId("tbDatosbanc").getModel().refresh();   
      this.byId("tbDatosbanc").removeSelections();

   },*/

   onSave: function(oEvent){

    /*var thes = this;

      var datosTabla =  this.byId("tbDatosbanc").getModel().getData();

      var datos = {
      "para":[],
      "data":[],
      "camp":[]
      };


      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._Tabla = 'lfbk';

      datos.para.push(data);
      datos.data.push(datosTabla);
      if(datosTabla.length != 0){
        datos.camp.push(Object.keys(datosTabla[0]));
      }  

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/EliminarDatosTabla.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {  
          thes.cargarCentro(thes);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

      $.ajax({
        data:  datos,
        url:   '/erp/model/SPRO/InsertarDinamico.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) { 
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

      MessageToast.show("Se grabo con exito");
      this.cargarCentro(thes);
*/

   }
 });
 });