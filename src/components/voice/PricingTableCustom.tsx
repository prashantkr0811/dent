"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface Props {
  hasFree: boolean;
  hasBasic: boolean;
  hasPro: boolean;
}

export default function PricingTableCustom({ hasFree, hasBasic, hasPro }: Props) {
  return (
    <section className="relative py-12 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {!hasFree && (
          <div className="relative bg-linear-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold">Free</h3>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground mb-1">/month</span>
            </div>
            <p className="text-muted-foreground">Essential dental appointment booking</p>
            <div className="mt-6">
              <SignUpButton mode="modal">
                <Button className="w-full">Get Started Free</Button>
              </SignUpButton>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Unlimited appointment booking</span>
              </div>
            </div>
          </div>
        )}

        {!hasBasic && (
          <div className="relative bg-linear-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-primary/30 shadow-xl">
            <h3 className="text-2xl font-bold">AI Basic</h3>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/80">$9</span>
              <span className="text-muted-foreground mb-1">/month</span>
            </div>
            <p className="text-muted-foreground">AI consultations + appointment booking</p>
            <div className="mt-6">
              <SignUpButton mode="modal">
                <Button className="w-full bg-linear-to-r from-primary to-primary/90 text-primary-foreground">Start AI Basic</Button>
              </SignUpButton>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">10 AI voice calls per month</span>
              </div>
            </div>
          </div>
        )}

        {!hasPro && (
          <div className="relative bg-linear-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold">AI Pro</h3>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold">$19</span>
              <span className="text-muted-foreground mb-1">/month</span>
            </div>
            <p className="text-muted-foreground">Unlimited AI consultations</p>
            <div className="mt-6">
              <SignUpButton mode="modal">
                <Button variant="outline" className="w-full">Upgrade to AI Pro</Button>
              </SignUpButton>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Unlimited AI voice calls</span>
              </div>
            </div>
          </div>
        )}

        {/* If all plans are owned, show a small message */}
        {hasFree && hasBasic && hasPro && (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            <p className="text-lg">You already have all plans available.</p>
          </div>
        )}
      </div>
    </section>
  );
}
