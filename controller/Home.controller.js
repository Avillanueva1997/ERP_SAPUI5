var urlGlobal = sessionStorage.urlGlobal;

jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.Home", {

       onInit: function(oEvent) {
           var oModel = new JSONModel("../../model/Tree.json");
           this.getView().setModel(oModel);
       },
       
       onPress: function(oEvent) {
           this.getRouter().navTo("login");
       },
       
       onPressLogistica: function(oEvent){
           this.getRouter().navTo("homelogistica");
       },
       
       	handleButtonPress: function(evt) {
			MessageToast.show("Button pressed");
		},
       
   });
});