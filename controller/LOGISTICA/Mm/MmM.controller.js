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
		return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.MmM", {

			onInit: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("mmM").attachPatternMatched(this._onObjectMatched, this);		       	

			},

			_onObjectMatched: function (oEvent) {

        var thes = this;
        this.cargarUnidad(thes);
        this.cargarGrupo(thes);
        this.cargarCentro(thes);
        this.cargarAlmacen(thes);

        var cnx = JSON.parse(ConexionGlobal);

        if (sessionStorage.matnr != "" &&  sessionStorage.werks == "" && sessionStorage.lgort == "") {

        thes.byId("datosBasicos").setVisible(true);
        thes.byId("compras").setVisible(false);
        thes.byId("almacenamiento").setVisible(false);

        var Matnr = sessionStorage.matnr;

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_matnr" : Matnr
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ListarMaterialSolo.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {     
            response = JSON.parse(response);   
            response = response[0];
            var oModel = new sap.ui.model.json.JSONModel(response);  
            thes.byId("mmm").setModel(oModel);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });

        }else if(sessionStorage.matnr != "" && sessionStorage.werks != "" && sessionStorage.lgort == ""){

        thes.byId("datosBasicos").setVisible(true);
        thes.byId("compras").setVisible(true);
        thes.byId("almacenamiento").setVisible(false);

        var Matnr = sessionStorage.matnr;
        var Werks = sessionStorage.werks;

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_matnr" : Matnr,
          "_werks" : Werks
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ListarMaterial.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {     
            response = JSON.parse(response);   
            response = response[0];
            var oModel = new sap.ui.model.json.JSONModel(response);  
            thes.byId("mmm").setModel(oModel);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });

        } else if(sessionStorage.matnr != "" && sessionStorage.werks != "" && sessionStorage.lgort != ""){

        thes.byId("datosBasicos").setVisible(true);
        thes.byId("compras").setVisible(true);
        thes.byId("almacenamiento").setVisible(true);

        var Matnr = sessionStorage.matnr;
        var Werks = sessionStorage.werks;

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_matnr" : Matnr,
          "_werks" : Werks
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/ListarMaterial.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {     
            response = JSON.parse(response);   
            response = response[0];
            var oModel = new sap.ui.model.json.JSONModel(response);  
            thes.byId("mmm").setModel(oModel);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });

        }

        //thes.byId("iptAlmacen").setValue(sessionStorage.lgort);
            
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
                  thes.propiedadesInput(thes,response,"mmm","mara");
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });
   
        data._tabla = "marc"; 
        
        $.ajax({
              data:  data,
              url:   '/erp/model/long_campo.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {    
                  thes.propiedadesInput(thes,response,"mmm","marc");
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });
        
        data._tabla = "mlan"; 
        
        $.ajax({
              data:  data,
              url:   '/erp/model/long_campo.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {    
                  thes.propiedadesInput(thes,response,"mmm","mlan");
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });

        data._tabla = "mard"; 
        
        $.ajax({
              data:  data,
              url:   '/erp/model/long_campo.php', 
              type:  'post',
              async: false,
              beforeSend: function () {
              },
              success:  function (response) {    
                  thes.propiedadesInput(thes,response,"mmm","mlan");
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
              }
          });
				
			},

			onBack: function(oEvent){
				sessionStorage.removeItem('matnr');
        sessionStorage.removeItem('werks');
        sessionStorage.removeItem('lgort');
				this.getRouter().navTo("mm02");
        this.clearModel("mmm");
			},
      onHome: function(oEvent) {
        sessionStorage.removeItem('matnr');
        sessionStorage.removeItem('werks');
        sessionStorage.removeItem('lgort');
        this.getRouter().navTo("home");
        this.clearModel("mmm");
      },

			onSave: function(oEvent){
				var cnx = JSON.parse(ConexionGlobal);
				var data = this.byId("mmm").getModel().getData();
				data._IP = cnx[0].ip;
				data._Usuario_servidor = cnx[0].usuario_servidor;
				data._Base_datos = cnx[0].base_datos;
				data._Pass_servidor = cnx[0].pass_servidor;


				$.ajax({
					data:  data,
					url:   '/erp/model/ActualizarMaterial.php', 
					type:  'post',
					async: false,
					beforeSend: function () {
					},
					success:  function (response) {     
						sap.m.MessageToast.show("Se guardaron los cambios");
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
          thes.getView().setModel(oModel,"cbAlmacen");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    }
		});
	});