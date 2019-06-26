var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.SPRO.dpto", {

    onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("dpto").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarDpto(thes); 
      this.cargarPais(thes);

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 

      data._tabla = "tdpto"; 
 
      $.ajax({
            data:  data,
            url:   '/erp/model/long_campo.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
                thes.propiedadesInput(thes,response,"dpto","tdpto");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });


    },

    onSave: function(oEvent){

      var thes = this;       

      var datosTabla =  this.byId("tbDptos").getModel().getData();

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
      data._Tabla = 'tdpto';

      datos.para.push(data);
      datos.data.push(datosTabla);
      if(datosTabla.length != 0){
        datos.camp.push(Object.keys(datosTabla[0]));
      }  


      var ultimo = datos['data'][0].length - 1;

      var result = []; 


      for (var i = 0 ; i <= ultimo; i++) {

        if(datos['data'][0][i]['codPais'] == "") {

          result[i] = 0;  
          MessageToast.show("Rellene el campo código país");

        } else if (datos['data'][0][i]['codDpto'] == ""){

          result[i] = 0;  
          MessageToast.show("Rellene el campo código departamento");

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
                if (datosTabla[i].codPais == datosTabla[x].codPais &&
                  datosTabla[i].codDpto == datosTabla[x].codDpto) {
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
              this.cargarDpto(thes);  
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

          this.cargarDpto(thes);

          var newTable = this.byId("tbDptos").getModel().getData();

          for (var i = 0; i <= newTable.length -1; i++) {
            thes.byId("tbDptos").mAggregations.rows[i].mAggregations.cells[0].setEditable(false);
            thes.byId("tbDptos").mAggregations.rows[i].mAggregations.cells[1].setEditable(false);
          }
          
          MessageToast.show("Se grabo con exito");


            }

       }


    },

    onChangue: function(oEvent){

      // if(!this.changue){
      //   this.changue = [];
      // }

      // this.changue.push(this.byId("tbAlmacenes")._oItemNavigation.iFocusedIndex);


    },
    cargarDpto:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._codDpto = ""; 
      data._codPais = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarDpto.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("tbDptos").setModel(oModel);

        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    cargarPais:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._codPais = "";  

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarPais.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbPais");    
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
            url:   '/erp/model/entidades/dpto.json', 
            type:  'GET',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var data = thes.byId("tbDptos").getModel().getData();
              data.push(response);
              thes.byId("tbDptos").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
    });

    var cant = this.byId("tbDptos").getModel().getData().length - 1;

    thes.byId("tbDptos").mAggregations.rows[cant].mAggregations.cells[0].setEditable(true);
    thes.byId("tbDptos").mAggregations.rows[cant].mAggregations.cells[1].setEditable(true);
    
    },

    onDelete:function(oEvent){

     var thes = this;           
     var datosTabla = this.byId("tbDptos").getModel().getData();
     var selectData = this.byId("tbDptos").getSelectedIndices();
     var index;

     for (var i = selectData.length - 1;i >= 0; i--) {

        index = selectData[i];
        datosTabla.splice(index, 1);

      }

     this.byId("tbDptos").getModel().refresh();
     this.byId("tbDptos").removeRow();

    },

    onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   }
 });
 });