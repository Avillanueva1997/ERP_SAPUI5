var urlGlobal = sessionStorage.urlGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (BaseController, JSONModel,MessageToast) {
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
            var oList = evt.getSource(),
				oItem = evt.getParameter("listItem"),
				sPath = oItem.getBindingContext().getPath();
            
            switch (sPath)
            {
               case "/0/nodes/1": 
                   this.getRouter().navTo("mk01");
                   break;

               default: 
                   break;
            }
            
		},
       
   });
});