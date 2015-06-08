var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

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
    /*
    ms.Device.getCurrent(function(device){
        var channelId = "myChannelId";
        var clientAttributes = {name:"Alan"};

        device.openChannel(channelId, clientAttributes, function(channel) {

            // Save a reference to the channel
            // Add event listeners to channel

            // Notify the TV that your application is "ready"
            var widgetAPI = new Common.API.Widget();
            widgetAPI.sendReadyEvent();
            console.log("inside open channel");
        });
    });
    */
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	
	
	initialize();

	App.init();
};

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
		default:
			alert("Unhandled key");
			break;
	}
};
