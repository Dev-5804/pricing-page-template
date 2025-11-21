import { Addon, BillingMode } from '@/lib/pricing-data';

interface AddonToggleProps {
  addon: Addon;
  billingMode: BillingMode;
  isSelected: boolean;
  onToggle: () => void;
}

export default function AddonToggle({ addon, billingMode, isSelected, onToggle }: AddonToggleProps) {
  const price = billingMode === 'monthly' ? addon.monthlyPrice : addon.yearlyPrice;

  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-sm dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-700">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
      
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{addon.name}</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{addon.description}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900 dark:text-white">
              +${price}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              /{billingMode === 'monthly' ? 'mo' : 'yr'}
            </p>
          </div>
        </div>
      </div>
    </label>
  );
}
