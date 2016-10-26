/*
{
    ModuleName : "Template",
    Version : "1.0.0",
    created ; "20.05.2014"
    author  : "Evgen Tepin",
    email: "4godwork@gmail.com"
}
*/

if(Modules === undefined){
var Modules = {};    
    }

/*if(Modules["include1.jsx"] === undefined){
        #include "../include1/include1.jsx"
    }*/

if(Modules["Utils 1.0.0"] === undefined){
        $.evalFile (includesPath + "/Utils 1.0.0/Utils 1.0.0.jsx");
    }



Modules["Template 1.0.0"] =(function(){

var Utils = Modules["Utils 1.0.0"];

function Template(path){
var file = new File(path);
        if(file.exists)
            {
                var uri = file.absoluteURI;
                var ext =  uri.split('.').pop().toLowerCase();
                if(ext === "psd" || ext === "tif" )
                    {
                        this.file = file;
                        this.doc = undefined;
                        this.errors = "";
                        this.info = {};
                    }
                else
                    {
                        throw("This file [" + File.decode(path) + "] can not be a template file!");
                    }
            }
        else 
            {
                throw("Template file [" + File.decode(path) + "] does not exist!");
            }       
}

Template.prototype.readInfo = function(){
var tmp = this.file.absoluteURI.split('.');
tmp.pop();
var tplPath = tmp.join('.');
var infoFileJSXBIN = new File(tplPath + ".jsxbin");
var infoFileJSX = new File(tplPath + ".jsx");
if(infoFileJSX.exists)
    {
        this.info = $.evalFile(infoFileJSX.absoluteURI);
    }
else
    {
        if(infoFileJSXBIN.exists)
            {
                this.info = $.evalFile(infoFileJSXBIN.absoluteURI);
            }
    }
};

Template.prototype.extend = function(){
var tmp = this.file.absoluteURI.split('.');
tmp.pop();
var tplPath = tmp.join('.');
var infoFileJSXBIN = new File(tplPath + ".jsxbin");
var infoFileJSX = new File(tplPath + ".jsx");
if(infoFileJSX.exists)
    {
        var extFunction = $.evalFile(infoFileJSX.absoluteURI);
        extFunction(this);
    }
else
    {
        if(infoFileJSXBIN.exists)
            {
                var extFunction = $.evalFile(infoFileJSXBIN.absoluteURI);
                extFunction(this);
            }
    }
};

Template.prototype.open = function(){
var doc = app.open(this.file);
this.doc = doc.duplicate();
doc.close(SaveOptions.DONOTSAVECHANGES);
};

Template.prototype.duplicate = function(){
    var template = _.extend(this);
    template.doc = this.doc.duplicate();
    return template;
/*var doc = app.open(this.file);
this.doc = doc.duplicate();
doc.close(SaveOptions.DONOTSAVECHANGES);*/
};

Template.prototype.saveAs = function(path, options){
    if(this.doc != undefined)
    {
        if(typeof options === "string"){
                this.doc.saveAs(new File(path), Utils.saveAsPressets[options], true);
            }
        if(typeof options === "object"){
                this.doc.saveAs(new File(path), options, true);
            }    
    }
};

Template.prototype.close = function(){
     if(this.doc !== undefined)
         {
             this.doc.close(SaveOptions.DONOTSAVECHANGES);
         }
    };

Template.prototype.applyLayerComp = function(name){
if(this.doc !== undefined)
    {
        try{
                var comp = this.doc.layerComps.getByName(name);
                if(comp)
                    {
                        comp.apply();
                    }            
            }
        catch(e){
                this.errors += "Error while trying to apply "+name+" layerComp \n";
                this.errors += "Error data: \n "+e.toSource() +"\n";
            }

    }
};

/// если слоя с таким именем не будет, то получится exeption
Template.prototype.findLayer = function(name){
if(this.doc != undefined)
    {
        app.activeDocument = this.doc;
        try{
            var idslct = charIDToTypeID( "slct" );
            var desc3 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref2 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                ref2.putName( idLyr, name ); //// <=======
            desc3.putReference( idnull, ref2 );
            var idMkVs = charIDToTypeID( "MkVs" );
            desc3.putBoolean( idMkVs, false );
        executeAction( idslct, desc3, DialogModes.NO );
        return app.activeDocument.activeLayer;
            }
        catch(e){
            this.errors += "Error while trying to find layer: "+name+"\n";
            }
    }
}
//принимает 2 объекта, которые соадержат ширину и высоту в пикселах apperture это окно куда вставляется фото, а image само фото
// метод вставки Fill по классификации Adobe variables
/*Template.fillRateError = function(apperture, image){
var result = {};
result.absoluteError = 0;
result.relativeError = 0;
result.scaleAbsoluteError = 0;
result.scaleRelativeError = 0;
apperture.ratio = apperture.width/apperture.height;
image.ratio = image.width/image.height;
result.absoluteError = Math.abs (image.height*image.width - apperture.height*apperture.width);
result.relativeError = result.absoluteError/(apperture.height*apperture.width);
if((image.ratio >= 1 && apperture.ratio >= 1) || (image.ratio < 1 && apperture.ratio >= 1))
    {
        $.writeln("две горизонталки");

        var scaleHeight = apperture.width/image.ratio;
        result.scaleAbsoluteError = Math.abs (scaleHeight - apperture.height)*apperture.width;
        result.scaleRelativeError = result.scaleAbsoluteError/(apperture.height*apperture.width);
     }
if((image.ratio < 1 && apperture.ratio < 1) || (image.ratio >= 1 && apperture.ratio < 1))
    {
        $.writeln("две вертикалки");
        var scaleWidth = apperture.height*image.ratio;
        result.scaleAbsoluteError = Math.abs (scaleWidth - apperture.width)*apperture.height;
        result.scaleRelativeError = result.scaleAbsoluteError/(apperture.height*apperture.width);
     }
 return result;  
 };*/

/*Template.prototype.insertImg = function(name, value, options){
    
if(this.doc != undefined)
    {
var layer = this.findLayer(name);
        try{
if(layer.kind == LayerKind.SMARTOBJECT)
                    {
                        executeAction( stringIDToTypeID( "placedLayerEditContents" ), new ActionDescriptor(), DialogModes.NO );
                        var so = app.activeDocument;
                        var tmp = app.open(new File(value));
                        var img = tmp.duplicate();
                        tmp.close(SaveOptions.DONOTSAVECHANGES);
                        if(so.height > so.width)
                                {
                                    img.resizeImage(undefined, so.height, so.resolution);
                                }
                        else
                                {
                                    img.resizeImage(so.width, undefined, so.resolution);
                                }
                            app.activeDocument = img;                            
                            img.selection.selectAll();
                            img.selection.copy();
                            img.close(SaveOptions.DONOTSAVECHANGES);
                            app.activeDocument = so;
                            so.flatten();                            
                            so.paste();
                            
                            so.close(SaveOptions.SAVECHANGES);
                            app.purge(PurgeTarget.CLIPBOARDCACHE);
                    }    
}
        catch(e){
                this.errors += "Error while trying to insert content into "+name+" layer \n";
                this.errors += "Error data: \n "+e.toSource() +"\n";
            }        
    }
    };*/


// layer layer name or layer reference
//picPath path to Picture or File reference
//
//  options.method "fill" || "fit" || "as is" || "conform"
//  options.horizontalAlign left || center || right
///  options.verticalAlign top || center || bottom
Template.prototype.insertPicture = function(layer, pic, options){
if(this.doc !== undefined)
    {
try{
    
    if(typeof layer === "string")
        {
            var layer = this.findLayer(layer);
        }
    
    if(layer instanceof ArtLayer)
        {
            var layer = layer;
        }
    
    if(typeof pic === "string")
        {
            var picture = new File(pic);
        }
    
    if(pic instanceof File)
        {
            var picture = pic;
        }
    
    if(!picture.exists)
       {
            throw("Picture file [" + File.decode(picture.absoluteURI) + "] does not exists!");
       }
   if(options)
        {
            var method = options.method || "fill";
            var horizontalAlign = options.horizontalAlign || "center";
            var verticalAlign =  options.verticalAlign || "center";
        }
   else
        {
            var method = "fill";
            var horizontalAlign = "center";
            var verticalAlign =  "center";
        }

    
             if(layer.kind === LayerKind.SMARTOBJECT)
                    {
                        executeAction( stringIDToTypeID( "placedLayerEditContents" ), new ActionDescriptor(), DialogModes.NO );
                        var so = app.activeDocument;
                        var tmp = app.open(picture);
                        var img = tmp.duplicate();
                        tmp.close(SaveOptions.DONOTSAVECHANGES);
                        app.activeDocument = img;                            
                        switch(method){
                                case "fill":
                                    var  scale = Math.max(so.width/img.width,so.height/img.height);
                                break;
                                case "fit":
                                    var  scale = Math.min(so.width/img.width,so.height/img.height);
                                break;
                                case "as is":
                                    var scale = 1;
                                break;
                                case "conform":
                                    var scale = -1;
                                break;
                            }
                        
                        if(scale > 0)
                            {
                                Utils.setActiveDocResolution(so.resolution)
                                //Utils.resizeActiveDoc(Math.round(img.width * scale), undefined, true, true);
                                Utils.resizeActiveDoc(img.width * scale, undefined, true, true);
                            }
                        else
                            {
                                Utils.setActiveDocResolution(so.resolution)
                                Utils.resizeActiveDoc(so.width, so.height, false, true);
                            }
                            
                            img.flatten();
                            img.selection.selectAll();
                            img.selection.copy();
                            img.close(SaveOptions.DONOTSAVECHANGES);
                            app.activeDocument = so;
                            so.flatten();                            
                            so.paste();
                            so.selection.selectAll();
                            Utils.alignActiveLayerVertical(verticalAlign);
                            Utils.alignActiveLayerHorizontal(horizontalAlign);
                            so.revealAll();
                            so.close(SaveOptions.SAVECHANGES);
                            app.purge(PurgeTarget.CLIPBOARDCACHE);
                    }
                
             if(layer.kind === LayerKind.NORMAL)
                    {
                        
                        var appertureLayer = app.activeDocument.activeLayer;
                          try
                              {
                                  // пытаемся получить выделение в виде маски слоя
                                 Utils.activeLayerSetSelectionBy("mask");
                              }
                          catch(e){
                                // если маски нет, получаем выделение в виде прямоугольных границ слоя
                                 Utils.activeLayerSetSelectionBy("layer");
                              }
                        var appertureBounds = app.activeDocument.selection.bounds;
                        var appertureWidth = appertureBounds[2] - appertureBounds[0];
                        var appertureHeigth = appertureBounds[3] - appertureBounds[1]; 
                        // вставляем фотографию
                        Utils.activeLayerPlaceFile(picture);
                        // после этого действия активным слоем стала фотография
                        
                        var pic = app.activeDocument.activeLayer;
                        
                        // центруем фотографию относительно выделения
                        Utils.alignActiveLayerVertical(verticalAlign);
                        Utils.alignActiveLayerHorizontal(horizontalAlign);
                        
                        var picBounds = pic.bounds;
                        var picWidth = picBounds[2] - picBounds[0];
                        var picHeigth = picBounds[3] - picBounds[1]; 
                        
                        switch(method){
                                case "fill":
                                    var  scale = Math.max(appertureWidth/picWidth, appertureHeigth/picHeigth);
                                break;
                                case "fit":
                                    var  scale = Math.min(appertureWidth/picWidth, appertureHeigth/picHeigth);
                                break;
                                case "as is":
                                    var scale = 1;
                                break;
                                case "conform":
                                    var scale = -1;
                                break;
                            }
                        
                        if(scale > 0)
                            {
                                pic.resize(Math.round(scale*100), Math.round(scale*100));
                            }
                        else
                            {
                                pic.resize(
                                Math.round((appertureWidth/picWidth)*100), 
                                Math.round((appertureHeigth/picHeigth)*100)
                                );
                            }
                        
                        
                        app.activeDocument.activeLayer = appertureLayer;
                          try
                              {
                                 Utils.activeLayerSetSelectionBy("mask");
                              }
                          catch(e){
                                 Utils.activeLayerSetSelectionBy("layer");
                              }
                          var hasLayerStyle = Utils.activeLayerCopyLayerStyle();
                          
                         app.activeDocument.activeLayer.visible = false;
                          
                          app.activeDocument.activeLayer = pic;
                          if(hasLayerStyle)
                            {
                                Utils.activeLayerPasteLayerStyle();
                            }
                          Utils.activeLayerSetMaskFromSelection();
                          Utils.activeLayerMaskLinkToggle();
  
                    }
                
        }
        catch(e){
                this.errors += "Error while trying to insert content into "+name+" layer \n";
                this.errors += "Error data: \n "+e.toSource() +"\n";
            }        
  }
};

Template.prototype.insertTxt = function(name, value, options){
if(this.doc != undefined)
    {
        var layer = this.findLayer(name);
        if(layer.kind == LayerKind.TEXT)
            {
                layer.textItem.contents = value;
            }    
    }
};

return Template;
})();

