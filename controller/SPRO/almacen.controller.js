var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.SPRO.almacen", {

    onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("almacen").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarAlmacen(thes); 
      this.cargarCentro(thes);
      this.cargarSociedad(thes);

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 

      data._tabla = "t001l"; 
 
      $.ajax({
            data:  data,
            url:   '/erp/model/long_campo.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
                thes.propiedadesInput(thes,response,"almacen","t001l");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });


    },

    onSave: function(oEvent){

      var thes = this;       

      var datosTabla =  this.byId("tbAlmacenes").getModel().getData();

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
      data._Tabla = 't001l';

      datos.para.push(data);
      datos.data.push(datosTabla);
      if(datosTabla.length != 0){
        datos.camp.push(Object.keys(datosTabla[0]));
      }  


      var ultimo = datos['data'][0].length - 1;

      var result = []; 

      //var expreg = new RegExp(".");


      for (var i = 0 ; i <= ultimo; i++) {

        if (datos['data'][0][i]['bukrs'] == ""){

          result[i] = 0;  
          MessageToast.show("Rellene el campo sociedad");

        } else if(datos['data'][0][i]['werks'] == "") {


          result[i] = 0;  
          MessageToast.show("Rellene el campo centro");

        } else if(datos['data'][0][i]['lgort'] == "") {

          result[i] = 0;  
          MessageToast.show("Rellene el campo almacén");

        } else {

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
                if (datosTabla[i].bukrs == datosTabla[x].bukrs &&
                    datosTabla[i].werks == datosTabla[x].werks &&
                    datosTabla[i].lgort == datosTabla[x].lgort ) {
                  flag = "X";
                } 
              }
            }
          }


      if (flag == "X") { 
            MessageToast.show("Existen Duplicados"); 
      }else{

              $.ajax({
            data:  data,
            url:   '/erp/model/SPRO/EliminarDatosTabla.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {  
              thes.cargarAlmacen(thes);  
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

          this.cargarAlmacen(thes);

          var newTable = this.byId("tbAlmacenes").getModel().getData();

          for (var i = 0; i <= newTable.length -1; i++) {
            thes.byId("tbAlmacenes").mAggregations.rows[i].mAggregations.cells[0].setEditable(false);
            thes.byId("tbAlmacenes").mAggregations.rows[i].mAggregations.cells[1].setEditable(false);
            thes.byId("tbAlmacenes").mAggregations.rows[i].mAggregations.cells[2].setEditable(false);
          }
          
          MessageToast.show("Se grabo con exito");


            }

       }

      


      
      // if(this.changue){
      //   this.changue.sort(this.comparar);
      //   this.changue = this.eliminarduplicados(this.changue);
      //   var data = this.byId("tbAlmacenes").getModel().getData();
      //   var datos = [];

      //   for (var i = 0; i < this.changue.length; i++) { 
      //       datos.push(data[this.changue[i] - 1]);
      //   }

      // }



    },

    onChangue: function(oEvent){

      // if(!this.changue){
      //   this.changue = [];
      // }

      // this.changue.push(this.byId("tbAlmacenes")._oItemNavigation.iFocusedIndex);


    },

    // comparar: function(a, b) {
    //   return a - b;
    // },

    // eliminarduplicados: function(arr){

    //   var i,
    //   len=arr.length,
    //   out=[],
    //   obj={};

    //   for (i=0;i<len;i++) {
    //      obj[arr[i]]=0;
    //   }
    //   for (i in obj) {
    //      out.push(i);
    //   }
    //   return out;

    // },

    cargarAlmacen:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._bukrs = ""; 
      data._werks = ""; 
      data._lgort = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarAlmacen.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("tbAlmacenes").setModel(oModel);

        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    cargarCentro:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._bukrs = ""; 
      data._werks = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarCentro.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbCentro");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    cargarSociedad:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._bukrs = "";  

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarSociedad.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbSociedad");    
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
            url:   '/erp/model/entidades/almacen.json', 
            type:  'GET',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var data = thes.byId("tbAlmacenes").getModel().getData();
              data.push(response);
              thes.byId("tbAlmacenes").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
    });

    var cant = this.byId("tbAlmacenes").getModel().getData().length - 1;

    thes.byId("tbAlmacenes").mAggregations.rows[cant].mAggregations.cells[0].setEditable(true);
    thes.byId("tbAlmacenes").mAggregations.rows[cant].mAggregations.cells[1].setEditable(true);
    thes.byId("tbAlmacenes").mAggregations.rows[cant].mAggregations.cells[2].setEditable(true);


    },

    onDelete:function(oEvent){

     var thes = this;           
     var datosTabla = this.byId("tbAlmacenes").getModel().getData();
     var selectData = this.byId("tbAlmacenes").getSelectedIndices();
     var index;

     for (var i = selectData.length - 1;i >= 0; i--) {

        index = selectData[i];
        datosTabla.splice(index, 1);

      }

     this.byId("tbAlmacenes").getModel().refresh();
     this.byId("tbAlmacenes").removeRow();

     

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

     // var selectData = thes.byId("tbAlmacenes").getSelectedContextPaths()
     // var dataTable = thes.byId("tbAlmacenes").getModel().getData(); 
     // var index;


     //  for (var i = 0;i < selectData.length; i++) {

     //    index = selectData[i].substring(1);
     //    datos.data.push(dataTable[index]);

     //  }


     //  $.ajax({
     //    data:  datos,
     //    url:   '/erp/model/SPRO/EliminarAlmacen.php', 
     //    type:  'post',
     //    async: false,
     //    beforeSend: function () {
     //    },
     //    success:  function (response) {  
     //      thes.cargarAlmacen(thes);  
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