import { BillingMode } from '@/lib/pricing-data';
import Badge from './Badge';

interface PlanToggleProps {
  billingMode: BillingMode;
  onChange: (mode: BillingMode) => void;
}

export default function PlanToggle({ billingMode, onChange }: PlanToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <button
        onClick={() => onChange('monthly')}
        className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
          billingMode === 'monthly'
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
      >
        Monthly
      </button>
      
      <div className="relative inline-flex items-center">
        <button
          onClick={() => onChange(billingMode === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            billingMode === 'yearly' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
              billingMode === 'yearly' ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange('yearly')}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
            billingMode === 'yearly'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Yearly
        </button>
        <Badge variant="success">Save 2 months</Badge>
      </div>
    </div>
  );
}
