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
           var oModel = new JSONModel("model/Tree.json");
           this.getView().setModel(oModel);
       },
       
       onPress: function(oEvent) {
           this.getRouter().navTo("login");
       },
       
       	handleButtonPress: function(evt) {
            var oList = evt.getSource(),
				oItem = evt.getParameter("listItem"),
				sPath = oItem.getBindingContext().getPath();
            
            switch (sPath)
            {
               case "/0/nodes/0/nodes/0/nodes/0": 
                   this.getRouter().navTo("mk01");
                   break;
                    
               case "/0/nodes/0/nodes/0/nodes/1": 
                   this.getRouter().navTo("mk02");
                   break;
                    
               case "/0/nodes/0/nodes/0/nodes/2": 
                   this.getRouter().navTo("mk03");
                   break;
                    
               case "/0/nodes/0/nodes/2/nodes/0": 
                   this.getRouter().navTo("me11");
                   break;
                    
               case "/0/nodes/0/nodes/2/nodes/1": 
                   this.getRouter().navTo("me12");
                   break;
                    
               case "/0/nodes/0/nodes/2/nodes/2": 
                   this.getRouter().navTo("me13");
                   break;

               case "/0/nodes/0/nodes/1/nodes/0": 
                   this.getRouter().navTo("mm01");
                   break;
                    
               case "/0/nodes/0/nodes/1/nodes/1": 
                   this.getRouter().navTo("mm02");
                   break;
                    
               case "/0/nodes/0/nodes/1/nodes/2": 
                   this.getRouter().navTo("mm03");
                   break;

               case "/0/nodes/1/nodes/0/nodes/0": 
                   this.getRouter().navTo("pfcg01");
                   break;
                    
               case "/0/nodes/1/nodes/0/nodes/1": 
                   this.getRouter().navTo("pfcg02");
                   break;
                    
               case "/0/nodes/1/nodes/0/nodes/2": 
                   this.getRouter().navTo("pfcg03");
                   break;
                    
               case "/0/nodes/1/nodes/1/nodes/0": 
                   this.getRouter().navTo("su01");
                   break;

               default: 
                   break;
            }
            
		},
       
   });
});