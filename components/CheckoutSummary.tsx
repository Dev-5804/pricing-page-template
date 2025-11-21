import { BillingMode, plans, addons, calculateTotal } from '@/lib/pricing-data';
import Badge from './Badge';

interface CheckoutSummaryProps {
  selectedPlanId: string;
  billingMode: BillingMode;
  selectedAddonIds: string[];
}

export default function CheckoutSummary({
  selectedPlanId,
  billingMode,
  selectedAddonIds,
}: CheckoutSummaryProps) {
  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const selectedAddons = addons.filter((a) => selectedAddonIds.includes(a.id));
  const total = calculateTotal(selectedPlanId, billingMode, selectedAddonIds);

  if (!selectedPlan) return null;

  const planPrice = billingMode === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h3>
        <Badge variant="info">{billingMode === 'monthly' ? 'Monthly' : 'Yearly'}</Badge>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedPlan.name} Plan</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {selectedPlan.description}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${planPrice}
            </p>
          </div>
        </div>

        {selectedAddons.length > 0 && (
          <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
            <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Add-ons</p>
            <div className="space-y-2">
              {selectedAddons.map((addon) => {
                const addonPrice = billingMode === 'monthly' ? addon.monthlyPrice : addon.yearlyPrice;
                return (
                  <div key={addon.id} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{addon.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{addon.description}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      +${addonPrice}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Subtotal
            </span>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              ${total}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Billed {billingMode === 'monthly' ? 'monthly' : 'annually'}
          </p>
        </div>

        <div className="border-t-2 border-gray-300 pt-4 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Total Due Today</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
