var fs = require('fs');
var gui = new require('nw.gui');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('boofer.json');
const db = low(adapter);
var win = gui.Window.get();
var text = '';
var i = 0;
var per = 1;
list();
topWindow();


db.get('hotkey')
  .remove({ key: 'F1'})
  .write()

setInterval(function(){
		clipboard = gui.Clipboard.get();
		text = clipboard.get('text');
		$(".navbar-brand").text(text);
	}, 10);


function list(){
var arra = db.getState();
arra = arra.hotkey;

	for (var i = 0; i <= arra.length - 1; i++) {
		console.log(arra[i].key);

		//кнопка удаления
		var buttonDel = '<button type="button" class="btn btn-danger" id="'+ arra[i].key +'"> x </button>';		
		$(".hot-list").append("<tr><td>" + arra[i].key + "</td><td>" + arra[i].val + "</td><td>"+ buttonDel +"</td>");

		//кнопка удаления 
		$('.btn-danger').click(function(){
			var keyDel = $(this).attr("id");
			db.get('hotkey').remove({ key: keyDel}).write();
			$(".hot-list").empty();
			list();	
		})

		//назначаем хоткеи
		var option = {
		  key : arra[i].key, 
		  active : function() {
		  	setVal = db.get('hotkey').find({ key: this.key }).value();
		  	clipboard = gui.Clipboard.get();
		  	clipboard.set(setVal.val);
		  }
		};
		
		var shortcut = new gui.Shortcut(option);		
		gui.App.registerGlobalHotKey(shortcut);
	}
};




$("#savekey").click(function(){
	var hotKey = $("#key").val();
	var hotVal = $("#val").val();
	$('#key').val('');
	$('#val').val('');

	db.get('hotkey').push({ key: hotKey,val: hotVal}).write();
	// Increment count
	db.update('count', n => n + 1).write()
	db.set(key, val).write();
	$(".hot-list").empty();
	list();	
})



function topWindow(){
    if(per === 0){
        win.hide();
        per++;
    }
    else{
        win.show();
        win.setAlwaysOnTop (true);
        per--;
    }
}

var option = {
key : "Ctrl+D",
    active: function(){
        topWindow();
    }
};
var shortcut = new gui.Shortcut(option);
gui.App.registerGlobalHotKey(shortcut);


var option = {
key : "Ctrl+R",
    active: function(){
        var win = gui.Window.open ('index.html', {
		  position: 'center',
		  width: 901,
		  height: 127
		});
    }
};
var shortcut = new gui.Shortcut(option);
gui.App.registerGlobalHotKey(shortcut);

