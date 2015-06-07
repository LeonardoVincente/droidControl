package com.example.leonzky.droidcontrol;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.samsung.multiscreen.channel.Channel;
import com.samsung.multiscreen.channel.ChannelClient;
import com.samsung.multiscreen.device.Device;
import com.samsung.multiscreen.device.DeviceAsyncResult;
import com.samsung.multiscreen.device.DeviceError;
import com.samsung.multiscreen.channel.IChannelListener;

import java.util.HashMap;
import java.util.Map;

public class mainControl extends Activity  implements IChannelListener{
    private static final String LOGTAG = "mainControl";
    private Channel channel;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_control);
        connectToChannel();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main_control, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    protected void onResume() {
        Log.d(LOGTAG, "onResume()");
        connectToChannel();
        super.onResume();
    }
    private void connectToChannel() {
        final Device device = TVDevice.getInstance().getDevice();
        if( device == null ){
            Toast toast = Toast.makeText(getApplicationContext(), "No device selected", Toast.LENGTH_SHORT);
            toast.show();
            finish();
            Log.d(LOGTAG,"error device null");

            return ;
        }
        disconnectChannel();
        final String channelId = TVDevice.getInstance().getChannelId();
        final String userName = TVDevice.getInstance().getUserName(this);
        Log.d(LOGTAG, "connectToChannel() userName: " + userName + " channelID " + channelId);

        Map<String, String> clientAttributes = new HashMap<String, String>();
        clientAttributes.put("name", userName);

        device.connectToChannel(channelId, clientAttributes, new DeviceAsyncResult<Channel>() {

            public void onResult(final Channel channel) {
                TVDevice.getInstance().runOnUIThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast toast = Toast.makeText(getApplicationContext(), "Connected to device channel", Toast.LENGTH_SHORT);
                        toast.show();
                        Log.d(LOGTAG, "SUCEESS");
                        mainControl.this.channel = channel;
                        channel.setListener(mainControl.this);
                        channel.sendToAll("Send to all");
                    }
                });

            }
            public void onError(final DeviceError error) {

                TVDevice.getInstance().runOnUIThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast toast = Toast.makeText(getApplicationContext(), "FAIL!!!!! connect to device channel", Toast.LENGTH_SHORT);
                        toast.show();
                        Log.d(LOGTAG, "Fail");
                    }
                });
            }
        });

    }

    private void disconnectChannel() {
        if (channel != null) {
            channel.setListener(null);
            channel.disconnect();
            channel = null;
        }
    }

    @Override
    public void onConnect() {
        Log.d(LOGTAG, "Connected to channel");
        //channel.broadcast("Hello my friends");
        channel.sendToAll("Even ME");
    }

    @Override
    public void onDisconnect() {

    }

    @Override
    public void onClientConnected(ChannelClient channelClient) {
        Log.d(LOGTAG, "onClienConected");
        //channel.broadcast("Hello my friends");
        channel.sendToAll("On client conected Even ME");
    }

    @Override
    public void onClientDisconnected(ChannelClient channelClient) {

    }

    @Override
    public void onClientMessage(ChannelClient channelClient, String s) {
        Log.d(LOGTAG, "onClientMessage() " + s);
    }
}
