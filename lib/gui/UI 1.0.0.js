/*
{
    ModuleName : "UI",
    Version : "1.0.0",
    created ; "10.06.2015"
    author  : "Evgen Tepin",
    email: "4godwork@gmail.com"
}
*/

if(Modules === undefined){
var Modules = {};    
    }

Modules["UI 1.0.0"] =(function(){

function UI(dialog){
    this.dialog = dialog;
    this.controls = {};
    }

/*[
{
        name: "str"
        type: "str",
        bounds : mixed,
        text: "string",
        creation_properties: {},
        children : [{},{}]
        
    },
{},
...
]
*/

UI.prototype.addControl = function(uiRes, uiNode){
    var controlsList = this.controls;
    var parent = uiNode || this.dialog;
    var that = this;
     _.each(uiRes,function(obj,index,list)
        {
               switch(obj.type){
                    case "button":
                        var control = parent.add("button", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "checkbox":
                        var control = parent.add("checkbox", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "dropdownlist":
                        var control = parent.add("dropdownlist", obj.bounds, obj.items, obj.creation_properties);
                    break;
                    case "edittext":
                        var control = parent.add("edittext", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "group":
                        var control = parent.add("group", obj.bounds, obj.creation_properties);
                    break;
                    case "iconbutton":
                        var control = parent.add("iconbutton", obj.bounds, obj.icon, obj.creation_properties);
                    break;
                    case "image":
                        var control = parent.add("image", obj.bounds, obj.icon, obj.creation_properties);
                    break;
                    case "item":
                        var control = parent.add("item", obj.text, obj.index);
                    break;
                    case "separator":
                        var control = parent.add("separator", obj.text, obj.index);
                    break;
                    case "listbox":
                        var control = parent.add("listbox", obj.bounds, obj.items, obj.creation_properties);
                    break;
                    case "panel":
                        var control = parent.add("panel", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "progressbar":
                        var control = parent.add("progressbar", obj.bounds, obj.value, obj.minvalue, obj.maxvalue, obj.creation_properties);
                    break;
                    case "radiobutton":
                        var control = parent.add("radiobutton", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "scrollbar":
                        var control = parent.add("scrollbar", obj.bounds, obj.value, obj.stepdelta, obj.jumpdelta, obj.creation_properties);
                    break;
                    case "slider":
                       var control = parent.add("slider", obj.bounds, obj.value, obj.minvalue, obj.maxvalue, obj.creation_properties);
                    break;
                    case "statictext":
                        var control = parent.add("statictext", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "tab":
                        var control = parent.add("tab", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "tabbedpanel":
                        var control = parent.add("tabbedpanel", obj.bounds, obj.text, obj.creation_properties);
                    break;
                    case "treeview":
                        var control = parent.add("treeview", obj.bounds, obj.items, obj.creation_properties);
                    break;
                    case "node":
                        var control = parent.add("node", obj.text, obj.index);
                    break;
                    }
                (1+1);
                controlsList[obj.name] = control;
                if(obj.children !== undefined && obj.children.length > 0)
                    {
                        that.addControl(obj.children, control);
                    }
       }); 
  
  return that;
    }

return UI;
})();

