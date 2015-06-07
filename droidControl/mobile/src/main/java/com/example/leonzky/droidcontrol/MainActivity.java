package com.example.leonzky.droidcontrol;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

import com.samsung.multiscreen.device.Device;
import com.samsung.multiscreen.device.DeviceAsyncResult;
import com.samsung.multiscreen.device.DeviceError;

import java.util.List;

public class MainActivity extends Activity {
    private static final String LOGTAG = "DiscoverActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // something
        //findLocalDevices();
        
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
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

    private void findLocalDevices() {
       Log.d(LOGTAG, "findLocalDevices()");


        Device.search(new DeviceAsyncResult<List<Device>>() {
            @Override
            public void onResult(final List<Device> devices) {
                Log.d(LOGTAG, "findLocalDevices() -> DONE: count: " + devices.size());
            }

            @Override
            public void onError(final DeviceError error) {

            }
        });
    }

    public void sendPincode(View view){
        EditText pcEditText = (EditText)findViewById(R.id.editText);
        String pincode = pcEditText.getText().toString();
        Log.d(LOGTAG, "Send Pincode button is asked " + pincode );
        getCode(pincode);
    }

    private void getCode(String pinCode){
        //final String pinCode = "918853";
        Log.d(LOGTAG, "getting in with code");

        Device.getByCode(pinCode, new DeviceAsyncResult<Device>() {
                // success callback
              public void onResult(final Device device) {
                    Log.d(LOGTAG, "findDeviceByPinCode() onResult() device:\n" + device);
              }
                // error callback
              public void onError(DeviceError error) {
                    Log.d(LOGTAG, "findDeviceByPinCode onError() error: " + error);
              }
        });
    }


}
