# “Tricky UI Component” (PRD)

This is a small, fast project to show that I can handle non-trivial UI logic. No need for big layout or pages.

### Objective

Build a single-page “Pricing & Plan Selector” UI demonstrating:

* Complex UI state
* Conditional rendering
* Animations/transitions
* Clean component structure

---

### Scope

**In scope:**

* Pricing plans UI with:

  * Monthly / Yearly toggle
  * 3 plans (Starter / Pro / Team)
  * Feature comparison table or list
* Add-ons selection (checkboxes or toggles)
* Price summary panel recalculating in real time
* Continue button with navigation to checkout
* Checkout page with form validation
* Small explanation text ("Demo component for portfolio")

**Out of scope:**

* Real payment processing (simulated only)
* Auth
* Backend integration

---

### Features / Requirements

1. **Plan Toggle**

   * Switch between “Monthly” and “Yearly”
   * Prices update instantly
   * Highlight savings for Yearly (e.g. “2 months free”)

2. **Plan Cards**

   * 3 cards with:

     * Name (Starter / Pro / Team)
     * Price (based on toggle)
     * List of features
     * “Selected” state (only one active at a time)

3. **Add-ons**

   * 2–3 add-ons, each with:

     * Name
     * Short description
     * Price (monthly/yearly)
   * Select via checkbox or toggle
   * Selected add-ons contribute to final price

4. **Summary Panel**

   * Shows:

     * Selected plan
     * Billing mode (Monthly/Yearly)
     * List of selected add-ons
     * Total price
   * Updates live when:

     * Plan changes
     * Billing mode changes
     * Add-ons change

5. **Animations (minimal but clear)**

   * Smooth transition on toggle
   * Subtle hover/focus states
   * Optional: small motion for card selection

---

### Tech Stack

* Next.js App Router (v16.0.3)
* React 19
* TypeScript (strict mode)
* Tailwind CSS v4

Pages: 
* `/` - Pricing & Plan Selector
* `/checkout` - Checkout Form

---

### Folder Structure (minimal)

```txt
/app
  page.tsx
  /checkout
    page.tsx
  layout.tsx
  globals.css
/components
  PlanToggle.tsx
  PlanCard.tsx
  AddonToggle.tsx
  SummaryPanel.tsx
  CheckoutSummary.tsx
  Button.tsx
  Badge.tsx
  Input.tsx
  Label.tsx
/lib
  pricing-data.ts
```

State management:

* Local component state with `useState` (simple and clean)

---

### Acceptance Criteria

**Pricing Page:**
* [x] Monthly/Yearly toggle correctly changes all plan and add-on prices
* [x] Only one plan can be selected at a time
* [x] Add-ons can be toggled independently
* [x] Summary panel always shows correct total
* [x] Smooth animations on toggle switch and card selection
* [x] "Most Popular" badge displays on Pro plan
* [x] Yearly billing shows savings calculation
* [x] Continue button navigates to checkout with selected data

**Checkout Page:**
* [x] Order summary displays selected plan, billing mode, and add-ons
* [x] Form validation for all required fields (email, name, card, address)
* [x] Card number auto-formats with spaces every 4 digits
* [x] Expiry date auto-formats as MM/YY
* [x] Real-time error messages clear when user starts typing
* [x] Processing state with loading spinner
* [x] Success screen displays after form submission
* [x] Back to pricing navigation works correctly

**General:**
* [x] UI is fully responsive on mobile and desktop
* [x] Dark mode support throughout
* [x] No console errors or TypeScript errors
* [x] Sticky summary panels on desktop view
* [x] Clean component structure with reusable components