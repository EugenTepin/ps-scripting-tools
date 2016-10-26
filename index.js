var beholder = require('./lib/dataBinding/beholder.js');
var test = require('./lib/appModules/preferences.js');

test();
var logListner = function(propName, oldProp, newProp) {
    $.writeln('==============');
    $.writeln(this.name + ' property ' + propName + ' changed');
    $.writeln('Was ' + oldProp);
    $.writeln('Become ' + newProp);
}

var computedListner = function(propName, oldProp, newProp) {
    this.computed = (propName === "b") ? (newProp + this.q) : (newProp + this.b);
    return newProp;
}



/*var obj1 = {
    name: "obj1",
    a: "string",
    b: 1,
    q: 2,
    c: {
        name: "obj1.c",
        ca: 123,
        cb: "adads"
    },
    d: (Folder.desktop).toSource(),
    computed: 0
};


var obj2 = {
    name: "obj2",
    a: "wrongggg",
    b: 15,
    c: {
        name: "obj2.c",
        ca: 456,
        cb: "yuiiiii"
    },
    d: (Folder.current).toSource()
};

beholder(obj1, {
    a: [logListner],
    b: [computedListner, logListner],
    q: [computedListner, logListner],
    computed: [logListner],
    c: {
        ca: [logListner]
    }
});
beholder(obj2, {
    a: [logListner],
    c: {
        ca: [logListner]
    }
});


obj1.b += 1;
obj1.q += 1;*/
/*store.c.ca += 100;
store.c.cb = "qwerty"; 
store.d = (Folder.current).toSource();
$.writeln(store.toSource());
*/
/*$.writeln(typeof (new File));
$.writeln(typeof (new Folder));
$.writeln(typeof [1,2,3]);
$.writeln(typeof "textttt");
$.writeln(typeof 1);
$.writeln(typeof true);*/

/*$.writeln("===========");
$.writeln((new File).toString ());
$.writeln((new Folder).toString ());
$.writeln([1,2,3].toString ());
$.writeln("textttt");
$.writeln(typeof 1);
$.writeln(typeof true);*/
 
/*var dlg = new Window('dialog', 'Alert Box Builder',[0,0,500,500]);
var input = dlg.add ("edittext" , [25,0,450,20], "0");
var btn = dlg.add ('button', [25,50,450,20], "Увеличить");




dlg.center();



dlg.show();*/