'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BillingMode } from '@/lib/pricing-data';
import CheckoutSummary from '@/components/CheckoutSummary';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';

interface FormData {
  email: string;
  fullName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get pricing data from URL params
  const selectedPlanId = searchParams.get('plan') || 'pro';
  const billingMode = (searchParams.get('billing') as BillingMode) || 'monthly';
  const selectedAddonIds = searchParams.get('addons')?.split(',').filter(Boolean) || [];

  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if no plan selected
  useEffect(() => {
    if (!searchParams.get('plan')) {
      router.push('/');
    }
  }, [searchParams, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format: MM/YY';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: '' }));
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
    if (errors.expiryDate) {
      setErrors((prev) => ({ ...prev, expiryDate: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Reset after success message
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Your subscription has been activated.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Redirecting you back to home...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Pricing
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Complete Your Purchase
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your payment details to activate your subscription
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" required>
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullName" required>
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" required>
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" required>
                        Expiry Date
                      </Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        value={formData.expiryDate}
                        onChange={handleExpiryDateChange}
                        error={errors.expiryDate}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" required>
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        error={errors.cvv}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Billing Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="billingAddress" required>
                      Street Address
                    </Label>
                    <Input
                      id="billingAddress"
                      name="billingAddress"
                      type="text"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      error={errors.billingAddress}
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" required>
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" required>
                        ZIP Code
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        error={errors.zipCode}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country" required>
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      error={errors.country}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Complete Purchase'
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                🔒 Your payment information is secure and encrypted
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CheckoutSummary
                selectedPlanId={selectedPlanId}
                billingMode={billingMode}
                selectedAddonIds={selectedAddonIds}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
