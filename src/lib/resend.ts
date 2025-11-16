// src/lib/resend.ts
// Stub so build doesn't fail. We don't actually send emails anymore.

const resend = {
  emails: {
    async send(options: any) {
      console.log("Resend stub called. Options:", options);
      return { data: { id: "stub-email-id" }, error: null };
    },
  },
};

export default resend;
export { resend };
