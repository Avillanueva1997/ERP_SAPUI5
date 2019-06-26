var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.SPRO.moneda", {

    onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("moneda").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarMoneda(thes);

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 

      data._tabla = "tcurc"; 
 
      $.ajax({
            data:  data,
            url:   '/erp/model/long_campo.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
                thes.propiedadesInput(thes,response,"moneda","tcurc");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    },

    onSave: function(oEvent){

      var thes = this;

      var datosTabla =  this.byId("tbMonedas").getModel().getData();

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
      data._Tabla = 'tcurc';

      datos.para.push(data);
      datos.data.push(datosTabla);
      if(datosTabla.length != 0){
        datos.camp.push(Object.keys(datosTabla[0]));
      }  


      var ultimo = datos['data'][0].length - 1;

      var result = []; 

      var expreg = new RegExp(".");


      for (var i = 0 ; i <= ultimo; i++) {

        if (datos['data'][0][i]['waers'] == ""){

          result[i] = 0;  
          MessageToast.show("Rellene el campo moneda");

        }else {

          result[i] = 1;        


        }

      }


      function isBelowThreshold(currentValue) {
        return currentValue == 1;
      }

       if (result.every(isBelowThreshold)) {


        var flag = "";

          for (var i = 0; i <= datosTabla.length - 1; i++) {
            for (var x = 0; x <= datosTabla.length - 1; x++) {
              if (i != x) {
                if (datosTabla[i].waers == datosTabla[x].waers) {
                  flag = "X";
                } 
              }
            }
          }


      if (flag == "X") { 
            MessageToast.show("Existen Duplicados"); }
      else{

              $.ajax({
            data:  data,
            url:   '/erp/model/SPRO/EliminarDatosTabla.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {  
              thes.cargarMoneda(thes);  
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
          });

          // 

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
          
          this.cargarMoneda(thes);

          var newTable = this.byId("tbMonedas").getModel().getData();

          for (var i = 0; i <= newTable.length -1; i++) {
            thes.byId("tbMonedas").mAggregations.rows[i].mAggregations.cells[0].setEditable(false);
          }


          MessageToast.show("Se grabo con exito");


            }

        


       }


    },

    cargarMoneda: function(thes){

      
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._waers = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarMoneda.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("tbMonedas").setModel(oModel);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },

    onBack: function(oEvent) {

      this.getRouter().navTo("homeSPRO");
     
    },
    onHome: function(oEvent) {
      this.getRouter().navTo("home");      
    },

    onAdd: function(oEvent){

    var thes = this;

    $.ajax({
            url:   '/erp/model/entidades/moneda.json', 
            type:  'GET',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var data = thes.byId("tbMonedas").getModel().getData();
              data.push(response);
              thes.byId("tbMonedas").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
          }); 

    var cant = this.byId("tbMonedas").getModel().getData().length - 1;

    thes.byId("tbMonedas").mAggregations.rows[cant].mAggregations.cells[0].setEditable(true);

    },

    onDelete:function(oEvent){

     var thes = this;           
     var datosTabla = this.byId("tbMonedas").getModel().getData();
     var selectData = this.byId("tbMonedas").getSelectedIndices();
     var index;

     for (var i = selectData.length - 1;i >= 0; i--) {

        index = selectData[i];
        datosTabla.splice(index, 1);

      }

     this.byId("tbMonedas").getModel().refresh();
     this.byId("tbMonedas").removeRow();

     // var keys = new Array();

     // var datos = {
     // "para":[],
     // "data":[]
     // };

     //  var cnx = JSON.parse(ConexionGlobal);
     //  var data = {};
     //  data._Ip = cnx[0].ip;
     //  data._Usuario_servidor = cnx[0].usuario_servidor;
     //  data._Base_datos = cnx[0].base_datos;
     //  data._Pass_servidor = cnx[0].pass_servidor; 
     //  datos.para.push(data);

     // var selectData = thes.byId("tbMonedas").getSelectedContextPaths()
     // var dataTable = thes.byId("tbMonedas").getModel().getData(); 
     // var index;


     //  for (var i = 0;i < selectData.length; i++) {

     //    index = selectData[i].substring(1);
     //    datos.data.push(dataTable[index]);

     //  }


     //  $.ajax({
     //    data:  datos,
     //    url:   '/erp/model/SPRO/EliminarMoneda.php', 
     //    type:  'post',
     //    async: false,
     //    beforeSend: function () {
     //    },
     //    success:  function (response) {  
     //      thes.cargarMoneda(thes);  
     //      // response = JSON.parse(response); 
     //      // var oModel = new sap.ui.model.json.JSONModel(response);  
     //      // thes.byId("tbAlmacenes").setModel(oModel);
     //      // thes.byId("tbAlmacenes").getModel().refresh();
     //    },
     //    error: function (xhr, ajaxOptions, thrownError) {
     //      alert(xhr.status);
     //      alert(thrownError);
     //    }
     //  });

    },
    
    onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   }
 });
 });