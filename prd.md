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
* One “Continue” button (no actual checkout)
* Small explanation text (“Demo component for portfolio”)

**Out of scope:**

* Real payments
* Auth
* Multi-page flows

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

* Next.js App Router
* TypeScript
* Tailwind CSS

Single page: `/pricing` (or `/`).

---

### Folder Structure (minimal)

```txt
/app
  /pricing
    page.tsx
/components
  PlanToggle.tsx
  PlanCard.tsx
  AddonToggle.tsx
  SummaryPanel.tsx
  Button.tsx
  Badge.tsx
/styles
  globals.css
```

State can live in:

* `usePricingStore` (Zustand), or
* Local component state (if small and clean)

---

### Acceptance Criteria

You should be able to check these as true:

* [ ] Monthly/Yearly toggle correctly changes all plan and add-on prices
* [ ] Only one plan can be selected at a time
* [ ] Add-ons can be toggled independently
* [ ] Summary panel always shows correct total
* [ ] UI is responsive on mobile and desktop
* [ ] No console errors