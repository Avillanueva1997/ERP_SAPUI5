var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/m/MessageToast"
 ], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.SPRO.dinamicProcess", {

    onInit: function(oEvent) {

var oModel = new sap.ui.model.json.JSONModel({
    "KEY": [
      {
        "SYSTEM_ID": "BHD",
        "TCODE": "SM66",
        "SHIFT_ID": "A",
        "SHIFT_DATE": "20141121",
        "USER_ID": "NISHANT_T",
        "PARA_VAL": "3",
        "INFO_CHARNUM": "TEST",
        "INFO_UNIT": "",
        "INFO_DATE": "20141121",
        "INFO_TIME": "142345",
        "ATTACH_ID": [
          {
            "ID": "A"
          },
          {
            "ID": "B"
          },
          {
            "ID": "C"
          }
        ],
        "NOTES": "DOC",
        "MESSAGE": ""
      }
    ]
  });


  var oTable = new sap.m.Table({

  columns:[

          new sap.m.Column({

          header:[

                  new sap.m.Label({

                  text:"1"

                  })

                  ]

          }),new sap.m.Column({

          header:[

                  new sap.m.Label({

                  text:"2"

                  })

                  ]

          }),new sap.m.Column({

          header:[

                  new sap.m.Label({

                  text:"3"

                  })

                  ]

          }),new sap.m.Column({

          header:[

                  new sap.m.Label({

                  text:"4"

                  })

                  ]

          }),new sap.m.Column({

          header:[

                  new sap.m.Label({

                  text:"5"

                  })

                  ]

          })

          ],

  items:[

        new sap.m.ColumnListItem({

        cells:[

               new sap.m.Text({

               text:"1"

               }),

               new sap.m.Text({

               text:"1"

               }),

               new sap.m.Text({

               text:"1"

               }),

               new sap.m.Text({

               text:"1"

               }),

               new sap.m.Text({

               text:"1"

               })

               ]

        })

      ]

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
      this.cargarAlmacen(thes);

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
    
    onBack: function(oEvent) {
      this.getRouter().navTo("homeSPRO");      
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

    thes.byId("tbAlmacenes").getItems()[cant].getCells()[0].setEditable(true);
    thes.byId("tbAlmacenes").getItems()[cant].getCells()[1].setEditable(true);
    thes.byId("tbAlmacenes").getItems()[cant].getCells()[2].setEditable(true);

    },

    onDelete:function(oEvent){

     var thes = this;           
     var datosTabla = this.byId("tbAlmacenes").getModel().getData();
     var selectData = this.byId("tbAlmacenes").getSelectedContextPaths()
     var index;

     for (var i = selectData.length - 1;i >= 0; i--) {

        index = selectData[i].substring(1);
        datosTabla.splice(index, 1);

      }

     this.byId("tbAlmacenes").getModel().refresh();
     this.byId("tbAlmacenes").removeSelections();

     

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
   },
 });
 });