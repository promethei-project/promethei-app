import * as Sentry from "@sentry/browser";
import { PrometheiError } from "@promethei-project/promethei-sdk-js";

export const Errors = {
    report(safe: { error: true, data: PrometheiError }) {
        if (safe.data.code === 502) {
            // Ignore Gateway error 
            return
        }

        Sentry.captureException(safe.data, {
            extra: {
                code: safe.data.code,
                errors: safe.data.errors,
                sourceStack: safe.data.sourceStack,
            },
        });
    }
}