// // src/lib/resend.ts
// import { Resend } from "resend";

// // Create resend instance only if API key is available
// const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// if (!resend) {
//   console.warn("⚠️ RESEND_API_KEY not configured - email sending disabled");
// }

// export default resend;


import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!resend) {
  console.warn("⚠️ RESEND_API_KEY not configured - email sending disabled");
}

export default resend;
