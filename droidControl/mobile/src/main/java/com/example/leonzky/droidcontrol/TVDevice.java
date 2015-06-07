package com.example.leonzky.droidcontrol;
import com.samsung.multiscreen.device.Device;
import com.samsung.multiscreen.application.Application;
/**
 * Created by leonzky on 6/7/2015.
 */
public class TVDevice {
    private Device device;
    private Application application;
    private static String channelId = "com.samsung.multiscreen.droidControl";
    private static TVDevice INSTANCE;

    public void setDevice(Device device) {
        this.device = device;
    }

    public Device getDevice() {
        return device;
    }
    public static synchronized TVDevice getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new TVDevice();
        }
        return INSTANCE;
    }

}
