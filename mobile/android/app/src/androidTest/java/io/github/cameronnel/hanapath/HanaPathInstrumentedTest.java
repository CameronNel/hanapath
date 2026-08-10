package io.github.cameronnel.hanapath;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import android.content.Context;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class HanaPathInstrumentedTest {

    @Test
    public void applicationIdentityAndLaunchActivityAreAvailable() {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();

        assertEquals("io.github.cameronnel.hanapath", appContext.getPackageName());
        assertNotNull(appContext.getPackageManager().getLaunchIntentForPackage(appContext.getPackageName()));
    }
}
