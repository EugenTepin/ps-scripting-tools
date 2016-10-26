/*
{
    ModuleName : "Utils",
    Version : "1.0.1",
    created ; "11.05.2014"
    author  : "Evgen Tepin",
    email: "4godwork@gmail.com"
}
*/


Modules["utils"] =(function(){
//utils
var Utils = {};
var CSV = Modules["csv"];
 // проверка на файл
Utils.readCSVfile = function (path){
if(typeof path === "string")   {
          var file = new File(path);
          if(file.exists)
            {
                    file.open ("r");
                    var result = CSV.csvToObject(file.read());
                    file.close();
                    return result;
            }
           else
            {
                throw("Can`t find csv-file with the following path : [ " + File.decode (path) + " ]");
            }
    }
}    

Utils.getFilesPresets={};

Utils.getFilesPresets['folders'] = function(f){
        return (f instanceof Folder);
    };

Utils.getFilesPresets['commonImages'] = function(f){
        return (f instanceof File) && (/\.(jpg|jpeg|jpe|jpf|jp2|tif|tiff|psd|psb|bmp)$/).test(f.absoluteURI.toLowerCase());
    };

Utils.getFilesPresets['layeredImages'] = function(f){
        return (f instanceof File) && (/\.(tif|tiff|psd)$/).test(f.absoluteURI.toLowerCase());
    };

Utils.getFilesPresets['csv'] = function(f){
        return (f instanceof File) && (/\.(csv|tsv)$/).test(f.absoluteURI.toLowerCase());
    };

Utils.getFilesPresets['jsx'] = function(f){
        return (f instanceof File) && (/\.(jsx|jsxbin)$/).test(f.absoluteURI.toLowerCase());
    };

Utils.saveAsPresets = {
        "jpeg.Preview" : new JPEGSaveOptions(),
        "jpeg.Print" : new JPEGSaveOptions(),
         "tiff.Print" : new TiffSaveOptions(),
         "tiff.Layers" : new TiffSaveOptions()
   };

Utils.saveAsPresets["jpeg.Preview"].embedColorProfile = true;
Utils.saveAsPresets["jpeg.Preview"].quality = 8;

Utils.saveAsPresets["jpeg.Print"].embedColorProfile = true;
Utils.saveAsPresets["jpeg.Print"].quality = 12;

Utils.saveAsPresets["tiff.Print"].embedColorProfile = true;
Utils.saveAsPresets["tiff.Print"].imageCompression = TIFFEncoding.TIFFLZW;
Utils.saveAsPresets["tiff.Print"].layers = false;

Utils.saveAsPresets["tiff.Layers"].embedColorProfile = true;
Utils.saveAsPresets["tiff.Layers"].imageCompression = TIFFEncoding.TIFFLZW;
Utils.saveAsPresets["tiff.Layers"].layers = true;

Utils.setActiveDocResolution = function(resolution){
// =======================================================
var idImgS = charIDToTypeID( "ImgS" );
    var desc10 = new ActionDescriptor();
    var idRslt = charIDToTypeID( "Rslt" );
    var idRsl = charIDToTypeID( "#Rsl" );
    desc10.putUnitDouble( idRslt, idRsl, resolution );
executeAction( idImgS, desc10, DialogModes.NO );
}

Utils.resizeActiveDoc= function(width, height, constProp, scaleStyles ){
if(constProp === undefined)
    {
        var proportion = true;
    }
else
    {
        var proportion = constProp;
    }

if(scaleStyles === undefined)
    {
        var scaleS = true;
    }
else
    {
        var scaleS = scaleStyles;
    }

if(!proportion)
    {
    var idImgS = charIDToTypeID( "ImgS" );
        var desc13 = new ActionDescriptor();
        var idWdth = charIDToTypeID( "Wdth" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc13.putUnitDouble( idWdth, idPxl, width.as("px") );
        var idHght = charIDToTypeID( "Hght" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc13.putUnitDouble( idHght, idPxl, height.as("px") );
        var idIntr = charIDToTypeID( "Intr" );
        var idIntp = charIDToTypeID( "Intp" );
        var idbicubicAutomatic = stringIDToTypeID( "bicubicAutomatic" );
        desc13.putEnumerated( idIntr, idIntp, idbicubicAutomatic );
    executeAction( idImgS, desc13, DialogModes.NO );
    }
else
    {
        if(height !== undefined)
            {
                var idImgS = charIDToTypeID( "ImgS" );
                    var desc12 = new ActionDescriptor();
                    var idHght = charIDToTypeID( "Hght" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc12.putUnitDouble( idHght, idPxl, height.as("px") );
                    var idscaleStyles = stringIDToTypeID( "scaleStyles" );
                    desc12.putBoolean( idscaleStyles, scaleS );
                    var idCnsP = charIDToTypeID( "CnsP" );
                    desc12.putBoolean( idCnsP, true );
                    var idIntr = charIDToTypeID( "Intr" );
                    var idIntp = charIDToTypeID( "Intp" );
                    var idbicubicAutomatic = stringIDToTypeID( "bicubicAutomatic" );
                    desc12.putEnumerated( idIntr, idIntp, idbicubicAutomatic );
                executeAction( idImgS, desc12, DialogModes.NO );
            }
        
        if(width !== undefined)
            {
                var idImgS = charIDToTypeID( "ImgS" );
                    var desc11 = new ActionDescriptor();
                    var idWdth = charIDToTypeID( "Wdth" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc11.putUnitDouble( idWdth, idPxl, width.as("px") );
                    var idscaleStyles = stringIDToTypeID( "scaleStyles" );
                    desc11.putBoolean( idscaleStyles, scaleS );
                    var idCnsP = charIDToTypeID( "CnsP" );
                    desc11.putBoolean( idCnsP, true );
                    var idIntr = charIDToTypeID( "Intr" );
                    var idIntp = charIDToTypeID( "Intp" );
                    var idbicubicAutomatic = stringIDToTypeID( "bicubicAutomatic" );
                    desc11.putEnumerated( idIntr, idIntp, idbicubicAutomatic );
                executeAction( idImgS, desc11, DialogModes.NO );
            }
    }
}

Utils.alignActiveLayerVertical = function(direction){
    try{
    switch(direction){
    case "top":
        var idAlgn = charIDToTypeID( "Algn" );
            var desc51 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref14 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref14.putEnumerated( idLyr, idOrdn, idTrgt );
            desc51.putReference( idnull, ref14 );
            var idUsng = charIDToTypeID( "Usng" );
            var idADSt = charIDToTypeID( "ADSt" );
            var idAdTp = charIDToTypeID( "AdTp" );
            desc51.putEnumerated( idUsng, idADSt, idAdTp );
        executeAction( idAlgn, desc51, DialogModes.NO );
    break;
    case "center":
        var idAlgn = charIDToTypeID( "Algn" );
            var desc52 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref15 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref15.putEnumerated( idLyr, idOrdn, idTrgt );
            desc52.putReference( idnull, ref15 );
            var idUsng = charIDToTypeID( "Usng" );
            var idADSt = charIDToTypeID( "ADSt" );
            var idAdCV = charIDToTypeID( "AdCV" );
            desc52.putEnumerated( idUsng, idADSt, idAdCV );
        executeAction( idAlgn, desc52, DialogModes.NO );
    break;
    case "bottom":
        var idAlgn = charIDToTypeID( "Algn" );
            var desc53 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref16 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref16.putEnumerated( idLyr, idOrdn, idTrgt );
            desc53.putReference( idnull, ref16 );
            var idUsng = charIDToTypeID( "Usng" );
            var idADSt = charIDToTypeID( "ADSt" );
            var idAdBt = charIDToTypeID( "AdBt" );
            desc53.putEnumerated( idUsng, idADSt, idAdBt );
        executeAction( idAlgn, desc53, DialogModes.NO );
    break;
        }
    }
catch(e){}
}

Utils.alignActiveLayerHorizontal = function(direction){
    try{
    switch(direction){
    case "left":
        var idAlgn = charIDToTypeID( "Algn" );
            var desc59 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref22 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref22.putEnumerated( idLyr, idOrdn, idTrgt );
            desc59.putReference( idnull, ref22 );
            var idUsng = charIDToTypeID( "Usng" );
            var idADSt = charIDToTypeID( "ADSt" );
            var idAdLf = charIDToTypeID( "AdLf" );
            desc59.putEnumerated( idUsng, idADSt, idAdLf );
        executeAction( idAlgn, desc59, DialogModes.NO );
    break;
    case "center":
        var idAlgn = charIDToTypeID( "Algn" );
            var desc60 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref23 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref23.putEnumerated( idLyr, idOrdn, idTrgt );
            desc60.putReference( idnull, ref23 );
            var idUsng = charIDToTypeID( "Usng" );
            var idADSt = charIDToTypeID( "ADSt" );
            var idAdCH = charIDToTypeID( "AdCH" );
            desc60.putEnumerated( idUsng, idADSt, idAdCH );
        executeAction( idAlgn, desc60, DialogModes.NO );
    break;
    case "right":
        var idAlgn = charIDToTypeID( "Algn" );
            var desc61 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref24 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref24.putEnumerated( idLyr, idOrdn, idTrgt );
            desc61.putReference( idnull, ref24 );
            var idUsng = charIDToTypeID( "Usng" );
            var idADSt = charIDToTypeID( "ADSt" );
            var idAdRg = charIDToTypeID( "AdRg" );
            desc61.putEnumerated( idUsng, idADSt, idAdRg );
        executeAction( idAlgn, desc61, DialogModes.NO );
    break;
        }
    }
catch(e){}
}

Utils.activeLayerSetSelectionBy = function(obj){
switch(obj)
    {
    case "mask": 
    var idsetd = charIDToTypeID( "setd" );
        var desc19 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref6 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idfsel = charIDToTypeID( "fsel" );
            ref6.putProperty( idChnl, idfsel );
        desc19.putReference( idnull, ref6 );
        var idT = charIDToTypeID( "T   " );
            var ref7 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idChnl = charIDToTypeID( "Chnl" );
            var idMsk = charIDToTypeID( "Msk " );
            ref7.putEnumerated( idChnl, idChnl, idMsk );
        desc19.putReference( idT, ref7 );
    executeAction( idsetd, desc19, DialogModes.NO );
    break;
    case "layer": 
        var idsetd = charIDToTypeID( "setd" );
            var desc145 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref63 = new ActionReference();
                var idChnl = charIDToTypeID( "Chnl" );
                var idfsel = charIDToTypeID( "fsel" );
                ref63.putProperty( idChnl, idfsel );
            desc145.putReference( idnull, ref63 );
            var idT = charIDToTypeID( "T   " );
                var ref64 = new ActionReference();
                var idChnl = charIDToTypeID( "Chnl" );
                var idChnl = charIDToTypeID( "Chnl" );
                var idTrsp = charIDToTypeID( "Trsp" );
                ref64.putEnumerated( idChnl, idChnl, idTrsp );
            desc145.putReference( idT, ref64 );
        executeAction( idsetd, desc145, DialogModes.NO ); 
    break;
    }    
}

Utils.activeLayerPlaceFile = function(f){
var idPlc = charIDToTypeID( "Plc " );
    var desc141 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    desc141.putPath( idnull, f);
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc141.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );
        var desc142 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc142.putUnitDouble( idHrzn, idPxl, 0.000000 );
        var idVrtc = charIDToTypeID( "Vrtc" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc142.putUnitDouble( idVrtc, idPxl, 0.000000 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc141.putObject( idOfst, idOfst, desc142 );
executeAction( idPlc, desc141, DialogModes.NO );     
    }

Utils.activeLayerCopyLayerStyle = function(){
    try{
        var idCpFX = charIDToTypeID( "CpFX" );
        executeAction( idCpFX, undefined, DialogModes.NO );
        return true;
    }
catch(e){
    return false;    
    }
}

Utils.activeLayerPasteLayerStyle = function(){
    try{
        var idPaFX = charIDToTypeID( "PaFX" );
            var desc22 = new ActionDescriptor();
            var idallowPasteFXOnLayerSet = stringIDToTypeID( "allowPasteFXOnLayerSet" );
            desc22.putBoolean( idallowPasteFXOnLayerSet, true );
        executeAction( idPaFX, desc22, DialogModes.NO );
    }
catch(e){}
}

Utils.activeLayerSetMaskFromSelection = function(){
var idMk = charIDToTypeID( "Mk  " );
    var desc29 = new ActionDescriptor();
    var idNw = charIDToTypeID( "Nw  " );
    var idChnl = charIDToTypeID( "Chnl" );
    desc29.putClass( idNw, idChnl );
    var idAt = charIDToTypeID( "At  " );
        var ref14 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idMsk = charIDToTypeID( "Msk " );
        ref14.putEnumerated( idChnl, idChnl, idMsk );
    desc29.putReference( idAt, ref14 );
    var idUsng = charIDToTypeID( "Usng" );
    var idUsrM = charIDToTypeID( "UsrM" );
    var idRvlS = charIDToTypeID( "RvlS" );
    desc29.putEnumerated( idUsng, idUsrM, idRvlS );
executeAction( idMk, desc29, DialogModes.NO );
}

Utils.activeLayerMaskLinkToggle = function(){
    
    var idsetd = charIDToTypeID( "setd" );
    var desc294 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref171 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref171.putEnumerated( idLyr, idOrdn, idTrgt );
    desc294.putReference( idnull, ref171 );
    var idT = charIDToTypeID( "T   " );
        var desc295 = new ActionDescriptor();
        var idUsrs = charIDToTypeID( "Usrs" );
        desc295.putBoolean( idUsrs, false );
    var idLyr = charIDToTypeID( "Lyr " );
    desc294.putObject( idT, idLyr, desc295 );
executeAction( idsetd, desc294, DialogModes.NO );

    }



return Utils;    
 })();