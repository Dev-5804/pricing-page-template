export type BillingMode = 'monthly' | 'yearly';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  popular?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 9,
    yearlyPrice: 90, // 2 months free (10 months)
    features: [
      { text: 'Up to 5 projects', included: true },
      { text: '10 GB storage', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: 'Priority support', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Custom integrations', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and growing teams',
    monthlyPrice: 29,
    yearlyPrice: 290, // 2 months free
    popular: true,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: '100 GB storage', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true },
      { text: 'Custom integrations', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For large teams and enterprises',
    monthlyPrice: 99,
    yearlyPrice: 990, // 2 months free
    features: [
      { text: 'Unlimited projects', included: true },
      { text: '1 TB storage', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
  },
];

export const addons: Addon[] = [
  {
    id: 'extra-storage',
    name: 'Extra Storage',
    description: 'Add 500 GB of additional storage',
    monthlyPrice: 10,
    yearlyPrice: 100,
  },
  {
    id: 'premium-support',
    name: 'Premium Support',
    description: '24/7 support with 1-hour response time',
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
  {
    id: 'white-label',
    name: 'White Label',
    description: 'Remove branding and use your own',
    monthlyPrice: 25,
    yearlyPrice: 250,
  },
];

export function calculateTotal(
  planId: string,
  billingMode: BillingMode,
  selectedAddonIds: string[]
): number {
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return 0;

  const planPrice = billingMode === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

  const addonsPrice = selectedAddonIds.reduce((total, addonId) => {
    const addon = addons.find((a) => a.id === addonId);
    if (!addon) return total;
    return total + (billingMode === 'monthly' ? addon.monthlyPrice : addon.yearlyPrice);
  }, 0);

  return planPrice + addonsPrice;
}
