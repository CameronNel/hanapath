package io.github.cameronnel.hanapath;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(HangulRecognitionPlugin.class);
        registerPlugin(GoogleSignInPlugin.class);
        registerPlugin(HanaPathAdsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
