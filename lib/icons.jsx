function graphic_to_text (infiles /*array of file objects*/ )
{
    var outfile, s;
    for (var i = 0; i < infiles.length; i++)
    {
        if (infiles[i].exists)
        {
            outfile = File (infiles[i].fullName.replace (/\.(png|idrc)$/, '.jsxinc'));
            outfile.open ('w');
            infiles[i].encoding = 'BINARY';
            infiles[i].open('r');
            s = infiles[i].read();
            outfile.write('var ' + outfile.name.replace ('.jsxinc', ' ') + ' =');
            outfile.write(s.toSource());
            outfile.write('.valueOf();');
            infiles[i].close();
            outfile.close();
        }
    }
}

graphic_to_text ([File("/d/psyduck.png")] );


//~ #include "/d/psyduck.jsxinc"
//~ var w = new Window ("dialog");
//~ w.add ("iconbutton", undefined, psyduck);
//~ w.show();