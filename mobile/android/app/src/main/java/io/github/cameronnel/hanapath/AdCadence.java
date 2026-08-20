package io.github.cameronnel.hanapath;

final class AdCadence {
    static final long COOLDOWN_MS = 5L * 60L * 1000L;

    private AdCadence() {}

    static long baseline(long sessionStartedAt, long lastShownAt) {
        return Math.max(sessionStartedAt, lastShownAt);
    }

    static long eligibleAt(long sessionStartedAt, long lastShownAt) {
        return baseline(sessionStartedAt, lastShownAt) + COOLDOWN_MS;
    }

    static boolean isEligible(long sessionStartedAt, long lastShownAt, long now) {
        return now >= eligibleAt(sessionStartedAt, lastShownAt);
    }

    static long remainingMs(long sessionStartedAt, long lastShownAt, long now) {
        return Math.max(0L, eligibleAt(sessionStartedAt, lastShownAt) - now);
    }
}
