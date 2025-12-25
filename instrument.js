// import * as Sentry from '@sentry/node';
// import { nodeProfilingIntegration } from '@sentry/profiling-node';
// import { Integrations } from '@sentry/tracing';
// import 'dotenv/config';

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [
//     new Integrations.Mongo() // ✅ official way to trace MongoDB
//   ],
//   tracesSampleRate: 1.0,
// });
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,  // your DSN here
  tracesSampleRate: 1.0,
  environment: "production"     // ✅ add this line
});
