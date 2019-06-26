var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast"
 ], function (BaseController, JSONModel, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.MK.MK01C", {

     onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("mk01c").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this; 
      //this.cargarProveedor(thes);

      $.ajax({
          //data:  parametros,
          url:   '/erp/model/entidades/proveedor.json', 
          type:  'post',
          async: false,
          success:  function (response) {
            var oModel = new sap.ui.model.json.JSONModel(response); 
            thes.byId("mk01c").setModel(oModel);     
            var Lifnr = sessionStorage.Lifnr;
            thes.byId("iptAcreedor").setValue(Lifnr);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });

      /*var oModel = new sap.ui.model.json.JSONModel(); 
      thes.byId("tbDatosbanc").setModel(oModel);*/
        /*$.ajax({
            url:   '/erp/model/entidades/lfbk.json', 
            type:  'GET',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var data = thes.byId("tbDatosbanc").getModel().getData();
              data.push(response);
              thes.byId("tbDatosbanc").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
          });  */

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
                thes.propiedadesInput(thes,response,"mk01c","lfm1");
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
                thes.propiedadesInput(thes,response,"mk01c","lfa1");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
      
     /* data._tabla = "lfbk"; 
      
      $.ajax({
            data:  data,
            url:   '/erp/model/long_campo.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
                thes.propiedadesInput(thes,response,"mk01c","lfbk");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
*/
    // },

    // cargarProveedor: function(thes){

    //   var thes = this;

    //   var cnx = JSON.parse(ConexionGlobal);
    //   var data = {};
    //   data._Ip = cnx[0].ip;
    //   data._Usuario_servidor = cnx[0].usuario_servidor;
    //   data._Base_datos = cnx[0].base_datos;
    //   data._Pass_servidor = cnx[0].pass_servidor; 
    //   data._lifnr = ""; 

    //   $.ajax({
    //     data:  data,
    //     url:   '/erp/model/ListarLfbk.php', 
    //     type:  'post',
    //     async: false,
    //     beforeSend: function () {
    //     },
    //     success:  function (response) {    
    //       response = JSON.parse(response); 
    //       var oModel = new sap.ui.model.json.JSONModel(response);  
    //       thes.byId("tbDatosbanc").setModel(oModel);
    //     },
    //     error: function (xhr, ajaxOptions, thrownError) {
    //       alert(xhr.status);
    //       alert(thrownError);
    //     }
    //   });

   },
    onBack: function(oEvent) {
     this.getRouter().navTo("mk01");
     this.clearModel("mk01c");
   },
   onHome: function(oEvent) {
     this.getRouter().navTo("home");
   },

   onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },

   onSave: function(oEvent){

    
    var Acreedor = this.byId("iptAcreedor").getValue();  
    var thes = this;
    var cnx = JSON.parse(ConexionGlobal);
    var data = this.byId("mk01c").getModel().getData();
    data._Ip = cnx[0].ip;
    data._Usuario_servidor = cnx[0].usuario_servidor;
    data._Base_datos = cnx[0].base_datos;
    data._Pass_servidor = cnx[0].pass_servidor;
    //data._Tabla = 'lfbk'; 

    $.ajax({
      data:  data,
      url:   '/erp/model/InsertarProveedor.php', 
      type:  'post',
      async: false,
      beforeSend: function () {
      },
      success:  function (response) {     
        data.lifnr = response;
        thes.byId("mk01c").getModel().refresh();
        sap.m.MessageToast.show("Se creó el proveedor: " +  response );
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

  /*  var datosTabla =  this.byId("tbDatosbanc").getModel().getData();


    var datos = {
      "para":[],
      "data":[],
      "camp":[]
      };
      

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
          //thes.cargarProveedor(thes);
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
      });*/

      MessageToast.show("Se grabo con exito");
      this.getRouter().navTo("mk01");

    
  }/*,

    onAdd: function(oEvent){

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

    }, 
    onDelete:function(oEvent){

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

     // var selectData = thes.byId("tbCentros").getSelectedContextPaths()
     // var dataTable = thes.byId("tbCentros").getModel().getData(); 
     // var index;


     //  for (var i = 0;i < selectData.length; i++) {

     //    index = selectData[i].substring(1);
     //    datos.data.push(dataTable[index]);

     //  }


     //  $.ajax({
     //    data:  datos,
     //    url:   '/erp/model/SPRO/EliminarCentro.php', 
     //    type:  'post',
     //    async: false,
     //    beforeSend: function () {
     //    },
     //    success:  function (response) {  
     //      thes.cargarCentro(thes);  
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

    }*/

});
 });