var bond = {
	AppContainer : "#app",
	_templates : {},
	_getTemplate : function(name,source){
			var template = null,
					templates = bond._templates;
			if(templates[name] != undefined){
			  template = templates[name];
			}
			else{
				template = Handlebars.compile(source);
				templates[name]=template;
			}
			return template;
	},
	bind : function(model){
		var handler = {
    		set: function(target, prop, value, receiver) {
				console.log("change " + prop + " = " + value);
           		model.handleModelChange(prop,value);
    			return true;
    		}
		};

		return new Proxy(model,handler);
	},
	Create : function(cb){
		return bond.bind(new bond.Model(cb));
	},
	Model : function(cb){
	function is($elem,type){return $elem.is(type);}
		function isDiv($elem){return is($elem,"div");}
function isInput($elem){return is($elem,"input");}		
		function processDiv($elem,name,value){if($elem.children().length > 0 ){	var source = $elem.html(),template = bond._getTemplate(name,source);var html = template(value);$elem.html(html);}else{$elem.text(value);}}
			function handleModelChange(name,value){if(isDiv($("#" + name))){processDiv($("#" + name),name,value);}else if(isInput($elem)){$("#" + name).val(value);}

		cb();
		
     	 $(bond.AppContainer).fadeIn();
    
    	}

		/*function handleModelChange(name,value){
			var $elem = $("#" + name);

			if(isDiv($elem)){
				processDiv($elem,name,value);
			}
			else if(isInput($elem)){
				$elem.val(value);
			}

			if(cb!=undefined)
				cb();
		
     	 $(bond.AppContainer).fadeIn();
    
    	}*/

  		this.handleModelChange = handleModelChange;

	}
};