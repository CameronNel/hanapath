package io.github.cameronnel.hanapath;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class AdCadenceTest {
    private static final long MINUTE = 60L * 1000L;

    @Test
    public void firstAdWaitsFiveMinutesFromSessionStart() {
        long sessionStart = 10L * MINUTE;
        assertFalse(AdCadence.isEligible(sessionStart, 0L, sessionStart + 4L * MINUTE));
        assertTrue(AdCadence.isEligible(sessionStart, 0L, sessionStart + 7L * MINUTE));
    }

    @Test
    public void shownAdResetsTheFiveMinuteWindow() {
        long sessionStart = 0L;
        long shownAtMinuteSeven = 7L * MINUTE;
        assertFalse(AdCadence.isEligible(sessionStart, shownAtMinuteSeven, 11L * MINUTE));
        assertTrue(AdCadence.isEligible(sessionStart, shownAtMinuteSeven, 12L * MINUTE));
    }

    @Test
    public void persistedAdTimestampWinsWhenItIsLaterThanSessionStart() {
        long sessionStart = 20L * MINUTE;
        long lastShown = 22L * MINUTE;
        assertEquals(27L * MINUTE, AdCadence.eligibleAt(sessionStart, lastShown));
        assertEquals(2L * MINUTE, AdCadence.remainingMs(sessionStart, lastShown, 25L * MINUTE));
    }

    @Test
    public void noFillOrShowFailureDoesNotAdvanceTheCooldown() {
        long sessionStart = 0L;
        long unchangedLastShown = 0L;
        assertTrue(AdCadence.isEligible(sessionStart, unchangedLastShown, 7L * MINUTE));
        assertTrue(AdCadence.isEligible(sessionStart, unchangedLastShown, 8L * MINUTE));
    }

    @Test
    public void completionInsideCooldownDoesNotQueueADeferredAd() {
        long sessionStart = 0L;
        long shownAtMinuteSeven = 7L * MINUTE;
        assertFalse(AdCadence.isEligible(sessionStart, shownAtMinuteSeven, 11L * MINUTE));
        assertTrue(AdCadence.isEligible(sessionStart, shownAtMinuteSeven, 12L * MINUTE));
    }
}
