'use client';

import { useState } from 'react';
import { BillingMode, plans, addons } from '@/lib/pricing-data';
import PlanToggle from '@/components/PlanToggle';
import PlanCard from '@/components/PlanCard';
import AddonToggle from '@/components/AddonToggle';
import SummaryPanel from '@/components/SummaryPanel';

export default function Home() {
  const [billingMode, setBillingMode] = useState<BillingMode>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Pricing & Plan Selector
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose the perfect plan for your needs
          </p>
        </div>

        {/* Billing Toggle */}
        <PlanToggle billingMode={billingMode} onChange={setBillingMode} />

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {/* Left Column: Plans and Add-ons */}
          <div className="lg:col-span-2 space-y-8">
            {/* Plan Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  billingMode={billingMode}
                  isSelected={selectedPlanId === plan.id}
                  onSelect={() => setSelectedPlanId(plan.id)}
                />
              ))}
            </div>

            {/* Add-ons Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Optional Add-ons
              </h2>
              <div className="space-y-3">
                {addons.map((addon) => (
                  <AddonToggle
                    key={addon.id}
                    addon={addon}
                    billingMode={billingMode}
                    isSelected={selectedAddonIds.includes(addon.id)}
                    onToggle={() => toggleAddon(addon.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Summary Panel */}
          <div className="lg:col-span-1">
            <SummaryPanel
              selectedPlanId={selectedPlanId}
              billingMode={billingMode}
              selectedAddonIds={selectedAddonIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
