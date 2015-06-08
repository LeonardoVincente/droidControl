var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();


var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginAPI = new Common.API.Plugin();
var vol = null;
var userMute = null;
var ObjectAudio = null;
var ObjectTVMW = null;
var NNaviPlugin = null;

var Main =
{

};
var App;
var ms;
Main.onLoad = function()
{
	// Enable key event processing
	ms = window.webapis.multiscreen;
    App = {};
	this.enableKeys();
	
	initialize();
	App.init();
	
	pluginAPI.registIMEKey();
	ObjectTVMW = document.getElementById('pluginObjectTVMW');
    ObjectAudio = document.getElementById('pluginAudio');
    NNaviPlugin = document.getElementById('pluginObjectNNavi');
    
    widgetAPI.sendReadyEvent();
    window.onShow = function () {
    		alert('[APPS] : setBannerstate ');
            setTimeout(function(){
                pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
                pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
                pluginAPI.unregistKey(tvKey.KEY_MUTE);
                pluginAPI.unregistKey(tvKey.KEY_PANEL_VOL_UP);
                pluginAPI.unregistKey(tvKey.KEY_PANEL_VOL_DOWN);
                pluginAPI.unregistKey(7); //unregister volume up button
                pluginAPI.unregistKey(11); //unregister volume down button
                pluginAPI.unregistKey(27); //unregister mute button
             
            },100);
            NNaviPlugin.SetBannerState(1); //this is to see the banner Volume
       };
        userMute = ObjectAudio.GetUserMute();
        vol = ObjectAudio.GetVolume();
        alert('-----volume::'+ObjectAudio.GetVolume()+'------mute::'+ObjectAudio.GetUserMute()); //show in console Volume State
};


function printAudioStatus(){
    alert('-----volume::'+ObjectAudio.GetVolume()+'------mute::'+ObjectAudio.GetUserMute()); //show in console Volume State
    console.log('-----volume::'+ObjectAudio.GetVolume()+'------mute::'+ObjectAudio.GetUserMute());
}

function initialize(){
    App.init = function(){
        console.log("App.init()");

        // Variables related to API
        this.channel = null;
        this.channelId = "com.samsung.multiscreen.droidControl";        
        this.localDevice = null;         
        /*
        setInterval(function() {
            App.broadcastVideoState();
        }, 1000);
		*/
        // Get the local Device (SmartTV)
        ms.Device.getCurrent(this.onDeviceRetrieved, function(error) {
            console.log("Device.getCurrent() Error : ", error);
             App.updateConnectionStatus("error: device");             
        });
    };


App.onDeviceRetrieved = function(device){

    console.log("App.onDeviceRetrieved2", arguments);

     App.localDevice = device;
     App.updatePinCode();

     App.connectToChannel();
 };

 App.updatePinCode = function(){
     console.log("App.updatePinCode");
     App.localDevice.getPinCode(App.onPinCodeUpdate, function(error) {
         console.error("device.getPinCode() Error : ", error);
     });
 };
 
 
 App.onPinCodeUpdate = function(pin){
     console.log("App.onPinCodeUpdate", arguments);
     var pinDisplay = document.getElementById("pinEle");
     pinDisplay.innerHTML = pin.code.substr(0,3) + "-" + pin.code.substr(3,3);
     //App.elPIN.html( pin.code.substr(0,3) + "-" + pin.code.substr(3,3)).hide().fadeIn();

     // Update the PIN every time it expires
     //setTimeout(App.updatePinCode, pin.ttl*1000 );
 };
 App.connectToChannel = function() {
	 	console.log("connect to channel");
    
	 App.localDevice.openChannel(App.channelId, {name:"Host" }, App.onConnect, function(error) {
         console.log("device.openChannel() Error : ", error);
         App.updateConnectionStatus("error: channel");            
     });
     
 };
 
 
 App.onConnect = function(channel){        

     App.channel = channel;

     console.log("App.onConnect");

     // Have our UI update the connection status
     App.updateConnectionStatus("connected");

     // Wire up some event handlers
     channel.on("disconnect", function(client){
         //App.onDisconnect(client); 
    	 console.log("on channel disconnect");
     });

     channel.on("clientConnect", function(client){
         //App.onClientConnect(client); 
    	 console.log("On Client connect");
     });

     channel.on("clientDisconnect", function(client){
         //App.onClientDisconnect(client);  
    	 console.log("on client disconnect")
     });

     channel.on("message", function(msg, client){
         //msg = JSON.parse(msg);
         //App.onMessage(msg, client);   
    	 console.log("on client message " + msg)
    	 var last = document.getElementById("lastMessage");
    	 last.innerHTML = msg;
    	 getMessage(msg);
    	 
     });
     
     /*
     var me = channel.clients.me;
     var message = { text:JSON.stringify(ms.getLaunchData()) || "", fromId:me.id, fromName:me.attributes.name, dateTime:new Date()};
     App.updateMessageList(message); 
     */

 };
 
 
 App.updateConnectionStatus = function(status){
     console.log("App.updateConnectionStatus", arguments);
 };
 
}
Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			break;
		case 11:
			
			ObjectAudio.SetVolume(10);
			printAudioStatus();
			break;
		case 7:
			ObjectAudio.SetVolume(10);
			printAudioStatus();
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
