var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.SPRO.provincia", {

    onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("provincia").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;

      this.cargarProvincia(thes);
      this.cargarPais(thes);
      this.cargarDpto(thes); 
      

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 

      data._tabla = "tprovincia"; 
 
      $.ajax({
            data:  data,
            url:   '/erp/model/long_campo.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
                thes.propiedadesInput(thes,response,"provincia","tprovincia");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });


    },

    onSave: function(oEvent){

      var thes = this;       

      var datosTabla =  this.byId("tbProvincias").getModel().getData();

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
      data._Tabla = 'tprovincia';

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

        } else if(datos['data'][0][i]['codProvincia'] == "") {

          result[i] = 0;  
          MessageToast.show("Rellene el campo código provincia");

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
                    datosTabla[i].codDpto == datosTabla[x].codDpto &&
                    datosTabla[i].codProvincia == datosTabla[x].codProvincia) {
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
              thes.cargarProvincia(thes);  
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

          this.cargarProvincia(thes);

          var newTable = this.byId("tbProvincias").getModel().getData();

          for (var i = 0; i <= newTable.length -1; i++) {
            thes.byId("tbProvincias").mAggregations.rows[i].mAggregations.cells[0].setEditable(false);
            thes.byId("tbProvincias").mAggregations.rows[i].mAggregations.cells[1].setEditable(false);
            thes.byId("tbProvincias").mAggregations.rows[i].mAggregations.cells[2].setEditable(false);

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
    cargarProvincia: function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._codPais = ""; 
      data._codDpto = ""; 
      data._codProvincia = "";

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarProvincia.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("tbProvincias").setModel(oModel);

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
          thes.getView().setModel(oModel,"cbDpto");    
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
            url:   '/erp/model/entidades/provincia.json', 
            type:  'GET',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var data = thes.byId("tbProvincias").getModel().getData();
              data.push(response);
              thes.byId("tbProvincias").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
    });

    var cant = this.byId("tbProvincias").getModel().getData().length - 1;

    thes.byId("tbProvincias").mAggregations.rows[cant].mAggregations.cells[0].setEditable(true);
    thes.byId("tbProvincias").mAggregations.rows[cant].mAggregations.cells[1].setEditable(true);
    thes.byId("tbProvincias").mAggregations.rows[cant].mAggregations.cells[2].setEditable(true);
    
    },

    onDelete:function(oEvent){

     var thes = this;           
     var datosTabla = this.byId("tbProvincias").getModel().getData();
     var selectData = this.byId("tbProvincias").getSelectedIndices();
     var index;

     for (var i = selectData.length - 1;i >= 0; i--) {

        index = selectData[i];
        datosTabla.splice(index, 1);

      }

     this.byId("tbProvincias").getModel().refresh();
     this.byId("tbProvincias").removeRow();

    },

    onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   }
 });
 });