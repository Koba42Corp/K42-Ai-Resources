# Resend

## Overview

Resend is a modern email API for developers that makes it easy to send transactional emails. It provides a simple API, React email templates, and excellent developer experience.

**Type**: Email Service / Transactional Email API  
**License**: Proprietary (Free tier available)  
**Primary Language**: JavaScript/TypeScript  
**Founded**: 2022  
**Website**: [resend.com](https://resend.com)

---

## What is Resend?

Resend is a developer-friendly email service focused on transactional emails. It offers React email templates, simple API, and great deliverability.

### Key Characteristics

- **React Email**: Build emails with React
- **Simple API**: Easy to use
- **Great DX**: Excellent developer experience
- **Good Deliverability**: High inbox rates
- **Webhooks**: Event webhooks
- **Free Tier**: Generous free tier

---

## Optimal Use Cases

### ✅ Best For

1. **Transactional Emails**
   - Welcome emails
   - Password resets
   - Order confirmations
   - Notifications

2. **Developer-Focused Apps**
   - Modern stack
   - React-based
   - TypeScript support
   - Great DX

3. **SaaS Products**
   - User notifications
   - System emails
   - Marketing emails
   - Automated emails

### ❌ Not Ideal For

1. **High Volume Marketing**
   - Focus on transactional
   - Consider SendGrid for marketing

2. **Complex Email Requirements**
   - May need more features
   - Consider alternatives

---

## Comparison with Alternatives

### Resend vs SendGrid

| Feature | Resend | SendGrid |
|---------|--------|----------|
| **Focus** | Transactional | Marketing + Transactional |
| **DX** | Excellent | Good |
| **React Email** | Built-in | Manual |
| **Pricing** | Simple | Complex |

**Choose Resend when**: Building modern apps with React.  
**Choose SendGrid when**: Need marketing email features.

---

## Integration with SaaS Products

### Basic Usage

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'delivered@resend.dev',
  subject: 'Hello World',
  html: '<p>Hello World!</p>',
});
```

### React Email

```typescript
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from './emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'user@example.com',
  subject: 'Welcome!',
  react: WelcomeEmail({ name: 'John' }),
});
```

---

## Getting Started

### Installation

```bash
npm install resend
```

### Basic Setup

```typescript
import { Resend } from 'resend';

const resend = new Resend('re_123456789');
```

---

## When to Choose Resend

### ✅ Choose Resend If:

- Building modern web apps
- Using React
- Need transactional emails
- Want great developer experience
- Building SaaS products

### ❌ Consider Alternatives If:

- Need marketing email features
- Very high volume
- Complex email requirements

---

## Resources

- **Documentation**: [resend.com/docs](https://resend.com/docs)
- **React Email**: [react.email](https://react.email)

---

## Summary

Resend is an excellent choice for modern applications needing transactional emails with great developer experience and React email support.

**Best For**: Transactional emails, React apps, modern web apps, great DX  
**Not Ideal For**: Marketing emails, very high volume

