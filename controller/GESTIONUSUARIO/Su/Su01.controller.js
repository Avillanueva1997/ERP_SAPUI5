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
   return BaseController.extend("sap.ui.su01.controller.GESTIONUSUARIO.Su.Su01", {

       onInit: function(oEvent) {
       },
       
       onDisplay: function(oEvent){
           this.getRouter().navTo("su01V");
       },
       
       onBack: function(oEvent){
           this.getRouter().navTo("home");
       },
       
       onEdit: function(oEvent){
           this.getRouter().navTo("su01M");
       },
       
       onNew: function(oEvent){
       	   var Usuario = this.byId("inpUsuario").getValue();

       	   if (Usuario != "") {

       	   	var thes = this;
            var cnx = JSON.parse(ConexionGlobal);

            var parametros = {
              "_Ip" : cnx[0].ip,
              "_Usuario_servidor" : cnx[0].usuario_servidor,
              "_Pass_servidor" : cnx[0].pass_servidor,
              "_Base_datos" : cnx[0].base_datos,
              "_Usuario" : Usuario            
            };

       	   	$.ajax({
                      data:  parametros,
                      url:   '/erp/model/ValidarUsuario.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {   
                      	alert(response);
                      	if (response=="") {
                      		thes.getRouter().navTo("su01C");
                      	}else{
                      		sap.m.MessageToast.show("Ya existe el usuario");
                      	}
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
       	   	
       	   }else{
       	   	sap.m.MessageToast.show("Ingrese el nombre de usuario que desea crear");
       	   }
           
       },
       
       onDelete: function(oEvent){
           var dialog = new Dialog({
				title: 'Confirmación',
				type: 'Message',
				content: new Text({ text: 'Desea eliminar el usuario?' }),
				beginButton: new Button({
					text: 'Confirmar',
					press: function () {
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
       },
       
       onCopy: function(oEvent){
           var that = this;
           var dialog = new Dialog({
				title: 'Confirmación',
				type: 'Message',
				content: new Text({ text: 'Desea copiar el usuario?' }),
				beginButton: new Button({
					text: 'Confirmar',
					press: function () {
						that.getRouter().navTo("su01C");
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancelar',
					press: function () {                        
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
       },
       
       onLock: function(oEvent){
           var dialog = new Dialog({
				title: 'Mensaje',
				type: 'Message',
                state: 'Success',
                content: new Text({
                    text: 'Bloqueado'
                }),
				beginButton: new Button({
					text: 'Cerrar',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
       },
       
       onUnLock: function(oEvent){
           var dialog = new Dialog({
				title: 'Mensaje',
				type: 'Message',
                state: 'Success',
                content: new Text({
                    text: 'Desbloqueado'
                }),
				beginButton: new Button({
					text: 'Cerrar',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
       },
       
       onEditPass: function(oEvent){
           var dialog = new Dialog({
				title: 'Modificar contraseña',
				type: 'Message',
				content: [
                    new Label({text:'Contraseña'}),
                    new Input(),
                    new Label({text:'Repetir Contraseña'}),
                    new Input()
                ],
				beginButton: new Button({
					text: 'Confirmar',
					press: function () {
						dialog.close();
					}
				}),
                endButton: new Button({
                    text: 'Cancelar',
                    press: function () {
                        dialog.close();
                    }
                }),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
       }
       
   });
});