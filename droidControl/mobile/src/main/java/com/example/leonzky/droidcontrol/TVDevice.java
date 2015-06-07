package com.example.leonzky.droidcontrol;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;

import com.samsung.multiscreen.application.Application;
import com.samsung.multiscreen.device.Device;
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

    public String getChannelId() {
        return channelId;
    }


    public String getUserName(Context context) {
        // Get Default Device Name
        String name = android.os.Build.MODEL;

        // Look for account name if exists
        AccountManager accountManager = AccountManager.get(context);
        Account[] accounts = accountManager.getAccountsByType("com.google");
        if (accounts.length > 0) {
            Account account = accounts[0];
            name = account.name;
        }
        return name;
    }
    public void runOnUIThread(Runnable runnable) {
        Handler mainHandler = new Handler(Looper.getMainLooper());
        mainHandler.post(runnable);
    }

}
