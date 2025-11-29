# Stripe

## Overview

Stripe is a payment processing platform that provides APIs for accepting payments online and in mobile applications. It's the industry standard for payment processing in modern applications.

**Type**: Payment Processing Platform  
**License**: Proprietary (API access)  
**Primary Language**: Multiple (REST API)  
**Founded**: 2010  
**Website**: [stripe.com](https://stripe.com)

---

## What is Stripe?

Stripe provides payment infrastructure for the internet. It handles payment processing, subscriptions, invoicing, and more through simple APIs.

### Key Characteristics

- **Payment Processing**: Credit cards, ACH, etc.
- **Subscriptions**: Recurring billing
- **Invoicing**: Automated invoicing
- **Marketplace**: Multi-party payments
- **Global**: Supports many countries
- **Developer Friendly**: Excellent APIs
- **Compliance**: PCI compliance handled

---

## Optimal Use Cases

### ✅ Best For

1. **SaaS Products**
   - Subscription billing
   - Recurring payments
   - Usage-based billing
   - Team/organization billing

2. **E-commerce**
   - Online stores
   - Product sales
   - One-time payments
   - Shopping carts

3. **Marketplaces**
   - Multi-party payments
   - Split payments
   - Platform fees
   - Seller payouts

4. **Any Payment Needs**
   - Online payments
   - Mobile payments
   - In-app purchases
   - Donations

### ❌ Not Ideal For

1. **Offline Payments**
   - Online-focused
   - Consider alternatives

2. **Very Specific Requirements**
   - May need custom solution
   - Consider alternatives

---

## Core Features

### Payment Methods
- Credit/debit cards
- ACH/bank transfers
- Digital wallets
- Buy now, pay later
- Cryptocurrency

### Products
- Subscriptions
- One-time payments
- Invoicing
- Billing portal

---

## Integration with SaaS Products

### Subscriptions

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: 'cus_123',
  items: [{ price: 'price_123' }],
});
```

### Payment Intents

```typescript
// Create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  customer: 'cus_123',
});
```

### Webhooks

```typescript
// Handle webhook
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  
  if (event.type === 'payment_intent.succeeded') {
    // Handle successful payment
  }
});
```

---

## Getting Started

### Installation

```bash
npm install stripe
```

### Basic Setup

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
```

---

## When to Choose Stripe

### ✅ Choose Stripe If:

- Building SaaS products
- Need payment processing
- Want subscriptions
- Need global payments
- Want excellent APIs

### ❌ Consider Alternatives If:

- Very specific requirements
- Need offline payments
- Budget constraints (consider alternatives)

---

## Resources

- **Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **API Reference**: [stripe.com/docs/api](https://stripe.com/docs/api)

---

## Summary

Stripe is the industry standard for payment processing, ideal for SaaS products and e-commerce applications requiring subscriptions and payment processing.

**Best For**: SaaS products, e-commerce, subscriptions, payment processing  
**Not Ideal For**: Offline payments, very specific requirements

