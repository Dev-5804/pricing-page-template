import { Plan, BillingMode } from '@/lib/pricing-data';
import Badge from './Badge';

interface PlanCardProps {
  plan: Plan;
  billingMode: BillingMode;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PlanCard({ plan, billingMode, isSelected, onSelect }: PlanCardProps) {
  const price = billingMode === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const monthlySavings = billingMode === 'yearly' ? plan.monthlyPrice * 12 - plan.yearlyPrice : 0;

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? 'border-blue-600 bg-blue-50 shadow-md dark:bg-blue-950 dark:border-blue-400'
          : 'border-gray-200 bg-white hover:border-blue-300 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-700'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge variant="primary">Most Popular</Badge>
        </div>
      )}
      
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">${price}</span>
          <span className="text-gray-600 dark:text-gray-400">/{billingMode === 'monthly' ? 'mo' : 'yr'}</span>
        </div>
        {billingMode === 'yearly' && monthlySavings > 0 && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400">
            Save ${monthlySavings}/year
          </p>
        )}
      </div>

      <ul className="space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.included ? (
              <svg
                className="h-5 w-5 shrink-0 text-green-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 shrink-0 text-gray-300 dark:text-gray-600 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span
              className={`text-sm ${
                feature.included
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
