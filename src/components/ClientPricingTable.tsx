// "use client";

// import React, { Suspense } from "react";
// import dynamic from "next/dynamic";
// import { Button } from "@/components/ui/button";

// /**
//  * Dynamically import the Clerk PricingTable so it only runs on the client.
//  * If Clerk throws because billing is disabled, the ErrorBoundary below will catch it.
//  */
// const PricingTable = dynamic(
//   () =>
//     import("@clerk/nextjs").then((mod) => {
//       // ensure the export exists
//       if (!mod?.PricingTable) {
//         // cause an error to be thrown and caught by ErrorBoundary
//         throw new Error("PricingTable unavailable");
//       }
//       return mod.PricingTable;
//     }),
//   { ssr: false, loading: () => null }
// );

// // Simple ErrorBoundary to catch runtime errors from PricingTable
// class ErrorBoundary extends React.Component<
//   { fallback: React.ReactNode },
//   { hasError: boolean }
// > {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error: any) {
//     // log it for debugging
//     console.error("PricingTable error:", error);
//   }

//   render() {
//     if (this.state.hasError) {
//       return this.props.fallback;
//     }
//     return this.props.children;
//   }
// }

// export default function ClientPricingTable() {
//   return (
//     <ErrorBoundary
//       fallback={
//         <div className="space-y-4">
//           <p className="text-muted-foreground">
//             Billing is currently disabled for this Clerk instance. You can still upgrade by
//             contacting support or use the alternative checkout below.
//           </p>

//           {/* Fallback CTA — wire this to your own checkout flow */}
//           <div className="flex items-center justify-center gap-4">
//             <Button
//               onClick={() => {
//                 // redirect to your own checkout / upgrade page
//                 window.location.href = "/pro/upgrade";
//               }}
//             >
//               Upgrade to Pro
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() => {
//                 // show pricing modal or fallback flow
//                 window.location.href = "/pricing";
//               }}
//             >
//               View pricing
//             </Button>
//           </div>
//         </div>
//       }
//     >
//       <Suspense fallback={<div>Loading pricing…</div>}>
//         <PricingTable />
//       </Suspense>
//     </ErrorBoundary>
//   );
// }
