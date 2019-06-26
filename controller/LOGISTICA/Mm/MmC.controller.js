var ConexionGlobal = sessionStorage.ConexionGlobal;

sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast",
   "sap/m/Dialog",
   "sap/m/Button",
   "sap/m/Text",
   "sap/m/Label",
   "sap/m/Input"
], function (BaseController, JSONModel,MessageToast,Dialog,Button,Text,Label,Input) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.MmC", {

      onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("mmC").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

       	var thes = this;
        this.cargarUnidad(thes);
        this.cargarGrupo(thes);

        /*var id = "tipoEan";

        this.validar(id);*/

        var mtart = sessionStorage.mtart;

        this.byId("inpTipoMaterial").setValue(mtart);

              $.ajax({
                      //data:  parametros,
                      url:   '/erp/model/entidades/mara.json', 
                      type:  'post',
                      async: false,
                      success:  function (response) {
                          var oModel = new sap.ui.model.json.JSONModel(response); 
                          thes.byId("mmc").setModel(oModel);                               
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
        				data._tabla = "mara";	
           
                $.ajax({
                      data:  data,
                      url:   '/erp/model/long_campo.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {    
                          thes.propiedadesInput(thes,response,"mmc","mara");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
       },
       
       onBack: function(oEvent){
           this.getRouter().navTo("mm01");
           this.clearModel("mmc");
       },
       onHome: function(oEvent) {
         this.getRouter().navTo("home");
       },

       onSave: function(oEvent){

        var Material = this.byId("iptMaterial").getValue();

        if (Material == "") {
        var thes = this;
				var cnx = JSON.parse(ConexionGlobal);
				var data = this.byId("mmc").getModel().getData();
				data._Ip = cnx[0].ip;
				data._Usuario_servidor = cnx[0].usuario_servidor;
				data._Base_datos = cnx[0].base_datos;
				data._Pass_servidor = cnx[0].pass_servidor;
        data._mtart = sessionStorage.mtart;

				$.ajax({
					data:  data,
					url:   '/erp/model/InsertarMara.php', 
					type:  'post',
					async: false,
					beforeSend: function () {
					},
					success:  function (response) {     
            data.matnr = response;
            thes.byId("mmc").getModel().refresh();
						sap.m.MessageToast.show("Se creó el material: " +  response );
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

        this.getRouter().navTo("mm01");
      }

      
		},
    cargarUnidad:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._msehi = ""; 
      data._spras = "";

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarUnidad.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbUnidad");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    cargarGrupo:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._matkl = ""; 
      data._spras = "";

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
          thes.getView().setModel(oModel,"cbGrupo");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    }
       
   });
});