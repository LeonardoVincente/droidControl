package com.example.leonzky.droidcontrol;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

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
        findLocalDevices();
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


}
