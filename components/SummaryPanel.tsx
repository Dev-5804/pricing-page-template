'use client';

import { useRouter } from 'next/navigation';
import { BillingMode, plans, addons, calculateTotal } from '@/lib/pricing-data';
import Button from './Button';

interface SummaryPanelProps {
  selectedPlanId: string;
  billingMode: BillingMode;
  selectedAddonIds: string[];
}

export default function SummaryPanel({
  selectedPlanId,
  billingMode,
  selectedAddonIds,
}: SummaryPanelProps) {
  const router = useRouter();
  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const selectedAddons = addons.filter((a) => selectedAddonIds.includes(a.id));
  const total = calculateTotal(selectedPlanId, billingMode, selectedAddonIds);

  if (!selectedPlan) return null;

  const planPrice = billingMode === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;

  const handleCheckout = () => {
    const params = new URLSearchParams({
      plan: selectedPlanId,
      billing: billingMode,
      addons: selectedAddonIds.join(','),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Order Summary</h3>

      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedPlan.name} Plan</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {billingMode === 'monthly' ? 'Monthly' : 'Yearly'} billing
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${planPrice}
              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                /{billingMode === 'monthly' ? 'mo' : 'yr'}
              </span>
            </p>
          </div>
        </div>

        {selectedAddons.length > 0 && (
          <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Add-ons</p>
            <div className="space-y-2">
              {selectedAddons.map((addon) => {
                const addonPrice = billingMode === 'monthly' ? addon.monthlyPrice : addon.yearlyPrice;
                return (
                  <div key={addon.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{addon.name}</span>
                    <span className="text-gray-900 dark:text-white">
                      +${addonPrice}
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        /{billingMode === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${total}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                per {billingMode === 'monthly' ? 'month' : 'year'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button variant="primary" size="lg" className="mt-6 w-full" onClick={handleCheckout}>
        Continue to Checkout
      </Button>

      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        Demo component for portfolio
      </p>
    </div>
  );
}
