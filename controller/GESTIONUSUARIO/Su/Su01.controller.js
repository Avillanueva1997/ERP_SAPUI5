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
           this.getRouter().navTo("su01C");
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