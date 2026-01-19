# Frontend Design Document: Crypto Wallet with Offramp

## 1. Overview

### Purpose
This document outlines the frontend architecture, component structure, state management, and implementation details for a Next.js-based crypto wallet application with integrated offramp functionality.

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Web3**: viem, wagmi
- **Coinbase**: @coinbase/waas-sdk-web, @coinbase/onchainkit
- **State Management**: React Context + Zustand (for complex state)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

---

## 2. Architecture

### 2.1 Project Structure

```
crypto-wallet/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── verify/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── wallet/
│   │   │   └── page.tsx
│   │   ├── sell/
│   │   │   └── page.tsx
│   │   ├── send/
│   │   │   └── page.tsx
│   │   ├── receive/
│   │   │   └── page.tsx
│   │   ├── history/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── wallet/
│   │   │   ├── balance/route.ts
│   │   │   └── transactions/route.ts
│   │   └── offramp/
│   │       └── create/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── EmailForm.tsx
│   │   ├── OTPForm.tsx
│   │   └── AuthProvider.tsx
│   ├── wallet/
│   │   ├── BalanceCard.tsx
│   │   ├── TokenList.tsx
│   │   ├── TokenRow.tsx
│   │   ├── TransactionHistory.tsx
│   │   ├── TransactionRow.tsx
│   │   ├── WalletAddress.tsx
│   │   ├── PortfolioChart.tsx
│   │   └── ImportWallet.tsx
│   ├── offramp/
│   │   ├── SellForm.tsx
│   │   ├── WithdrawalMethodSelector.tsx
│   │   ├── SellPreview.tsx
│   │   └── KYCPrompt.tsx
│   ├── transactions/
│   │   ├── SendForm.tsx
│   │   ├── ReceiveDialog.tsx
│   │   └── GasFeeEstimate.tsx
│   ├── ui/ (shadcn components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   └── ... (other shadcn components)
│   └── layout/
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── lib/
│   ├── coinbase/
│   │   ├── config.ts
│   │   ├── embeddedWallet.ts
│   │   └── offramp.ts
│   ├── hooks/
│   │   ├── useWallet.ts
│   │   ├── useBalance.ts
│   │   ├── useTransactions.ts
│   │   └── useOfframp.ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   ├── store/
│   │   └── walletStore.ts
│   └── types/
│       ├── wallet.ts
│       ├── transaction.ts
│       └── user.ts
├── public/
│   ├── images/
│   └── icons/
└── styles/
    └── globals.css
```

### 2.2 Routing Strategy

**App Router Layout Groups**

- `(auth)`: Unauthenticated pages (login, signup)
- `(dashboard)`: Authenticated pages with sidebar/navbar layout

**Route Protection**
- Middleware checks authentication status
- Redirect to `/login` if unauthenticated
- Redirect to `/wallet` if authenticated and accessing auth pages

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
App
├── AuthProvider
│   ├── (auth) Layout
│   │   ├── EmailForm
│   │   └── OTPForm
│   └── (dashboard) Layout
│       ├── Navbar
│       ├── Sidebar
│       └── Page Content
│           ├── Wallet Dashboard
│           │   ├── BalanceCard
│           │   ├── PortfolioChart
│           │   ├── TokenList
│           │   └── TransactionHistory
│           ├── Sell Page
│           │   ├── SellForm
│           │   ├── WithdrawalMethodSelector
│           │   └── SellPreview
│           ├── Send Page
│           │   ├── SendForm
│           │   └── GasFeeEstimate
│           └── Receive Page
│               └── ReceiveDialog
```

### 3.2 Key Components Specification

#### 3.2.1 AuthProvider

**Purpose**: Manage authentication state and wallet connection

**Props**: 
```typescript
interface AuthProviderProps {
  children: React.ReactNode;
}
```

**State**:
```typescript
interface AuthState {
  user: User | null;
  wallet: WalletData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

**Methods**:
- `requestOTP(email)`
- `verifyOTP(email, code)`
- `logout()`
- `initializeWallet()`
- `importWallet(privateKey | seedPhrase)`
- `resendOTP(email)`

#### 3.2.2 BalanceCard

**Purpose**: Display total portfolio value and 24h change

**Props**:
```typescript
interface BalanceCardProps {
  totalValue: number;
  change24h: number;
  isLoading?: boolean;
}
```

**UI Elements**:
- Total balance (large, prominent)
- USD equivalent
- 24h change percentage (green/red)
- Mini chart (optional)

#### 3.2.3 TokenList

**Purpose**: Display all token balances

**Props**:
```typescript
interface TokenListProps {
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
}
```

**Features**:
- Sortable columns (balance, value, change)
- Token icons
- USD values
- 24h price change
- Click to view details

#### 3.2.4 SellForm

**Purpose**: Handle crypto-to-fiat conversion flow

**Props**:
```typescript
interface SellFormProps {
  onSuccess?: (transaction: Transaction) => void;
  onError?: (error: Error) => void;
}
```

**Form Fields**:
- Crypto selector (ETH, USDC, etc.)
- Amount input
- Fiat currency selector (USD, EUR, etc.)
- Withdrawal method selector
- Preview section (exchange rate, fees, total)

**Validation**:
- Minimum sell amount
- Maximum based on limits and balance
- Valid withdrawal method
- KYC status check

#### 3.2.5 SendForm

**Purpose**: Send tokens to address

**Props**:
```typescript
interface SendFormProps {
  preselectedToken?: Token;
  onSuccess?: (hash: string) => void;
}
```

**Form Fields**:
- Recipient address (with ENS support)
- Token selector
- Amount input
- Max button
- Gas fee display

**Features**:
- QR code scanner
- Address validation
- Balance check
- Gas estimation

#### 3.2.6 EmailForm

**Purpose**: Collect user email for authentication

**Props**:
```typescript
interface EmailFormProps {
  onSuccess?: (email: string) => void;
  onError?: (error: Error) => void;
}
```

**Form Fields**:
- Email input
- Submit button

**Validation**:
- Valid email format
- Rate limiting check

**Features**:
- Auto-focus on mount
- Loading state during submission
- Clear error messages

#### 3.2.7 OTPForm

**Purpose**: Verify OTP code sent to email

**Props**:
```typescript
interface OTPFormProps {
  email: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onResend?: () => void;
}
```

**Form Fields**:
- 6-digit OTP input (auto-tab between digits)
- Resend button (with cooldown timer)

**Validation**:
- 6 digits required
- No spaces or special characters

**Features**:
- Auto-submit when 6 digits entered
- Countdown timer for resend (60 seconds)
- Auto-focus on first digit
- Paste support (full 6-digit code)
- Clear error messages for invalid/expired codes

#### 3.2.8 ImportWallet

**Purpose**: Import existing wallet

**Props**:
```typescript
interface ImportWalletProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}
```

**Form Fields**:
- Import method selector (Private Key / Seed Phrase)
- Secure input field
- Password for encryption
- Terms acceptance

**Features**:
- Input validation
- Secure handling
- Clear warnings about security

---

## 4. State Management

### 4.1 Global State (Zustand Store)

```typescript
// lib/store/walletStore.ts
interface WalletStore {
  // State
  balance: BalanceData | null;
  tokens: Token[];
  transactions: Transaction[];
  selectedChain: Chain;
  
  // Actions
  setBalance: (balance: BalanceData) => void;
  setTokens: (tokens: Token[]) => void;
  addTransaction: (tx: Transaction) => void;
  setSelectedChain: (chain: Chain) => void;
  
  // Async actions
  fetchBalance: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
}
```

### 4.2 React Context

**AuthContext**: User authentication state
**WalletContext**: Wallet connection and data
**ThemeContext**: Dark/light mode (optional)

### 4.3 Local Component State

- Form inputs (React Hook Form)
- UI states (modals, dropdowns)
- Loading states
- Error states

---

## 5. Data Flow

### 5.1 Authentication Flow

```
User enters email
  → EmailForm submits email
    → API sends OTP to email
      → User redirected to /verify
        → OTPForm displayed
          → User enters 6-digit code
            → API validates OTP
              → CDP Embedded Wallet initialized
                → AuthContext updated
                  → Redirect to /wallet
                    → Fetch wallet data
```

### 5.2 Sell Crypto Flow

```
User selects crypto & enters amount
  → Select fiat currency & withdrawal method
    → Preview shows fees & total
      → User confirms
        → API creates offramp session
          → CDP Offramp widget opens
            → User completes verification
              → Webhook receives confirmation
                → Balance updated
                  → Success notification
```

### 5.3 Send Transaction Flow

```
User enters recipient & amount
  → Gas estimation requested
    → Preview shown
      → User confirms
        → Transaction signed (CDP)
          → Broadcast to network
            → Pending state shown
              → Transaction confirmed
                → Balance updated
                  → Success notification
```

### 5.4 Wallet Import Flow

```
User selects import method
  → Enters private key or seed phrase
    → Validation performed
      → Wallet derived
        → Encrypted and stored
          → Wallet initialized
            → Redirect to dashboard
```

---

## 6. Styling & Design System

### 6.1 Color Palette

```css
/* Primary Colors */
--primary-50: #f0f9ff;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Semantic Colors */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
--info: #3b82f6;

/* Neutral */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;

/* Background */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--bg-tertiary: #f3f4f6;
```

### 6.2 Typography

```css
/* Font Family */
font-family: 'Inter', system-ui, sans-serif;

/* Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 6.3 Spacing System

```
Tailwind's default scale:
0, 1 (0.25rem), 2 (0.5rem), 3 (0.75rem), 4 (1rem),
6 (1.5rem), 8 (2rem), 12 (3rem), 16 (4rem), 20 (5rem), 24 (6rem)
```

### 6.4 Component Patterns

**Card Pattern**:
```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
  {/* content */}
</div>
```

**Button Variants**:
- Primary: Solid blue background
- Secondary: Outlined blue
- Danger: Solid red background
- Ghost: Transparent with hover

**Input Pattern**:
```tsx
<input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
```

---

## 7. Responsive Design

### 7.1 Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large */
```

### 7.2 Layout Adaptations

**Mobile (< 768px)**:
- Stack all content vertically
- Bottom navigation bar
- Full-width cards
- Simplified charts

**Tablet (768px - 1024px)**:
- 2-column grid for tokens
- Persistent top navbar
- Sidebar hidden by default

**Desktop (> 1024px)**:
- Persistent sidebar navigation
- 3-column layouts where appropriate
- Enhanced charts and visualizations
- Multi-panel views

---

## 8. Performance Optimization

### 8.1 Code Splitting

- Route-based splitting (automatic with Next.js)
- Dynamic imports for heavy components:
  - Charts (Recharts)
  - QR code scanner
  - Offramp widgets

### 8.2 Data Fetching

**Server Components** (default):
- Initial page loads
- Static content
- SEO-critical pages

**Client Components**:
- Interactive components
- Real-time data
- Web3 integrations

**Strategies**:
- SWR for client-side data fetching
- React Query (optional alternative)
- Optimistic updates
- Stale-while-revalidate

### 8.3 Image Optimization

- Next.js Image component
- WebP format with fallbacks
- Lazy loading
- Responsive image sizes

### 8.4 Bundle Size

- Tree shaking
- Remove unused dependencies
- Analyze with `@next/bundle-analyzer`
- Target < 200KB initial JS bundle

---

## 9. Error Handling

### 9.1 Error Boundaries

```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### 9.2 API Error Handling

```typescript
try {
  const response = await fetch('/api/wallet/balance');
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
} catch (error) {
  // Log to error tracking service
  console.error(error);
  // Show user-friendly message
  toast.error('Failed to load balance. Please try again.');
}
```

### 9.3 Form Validation Errors

- Inline validation messages
- Field-level errors (React Hook Form)
- Schema validation (Zod)
- Clear, actionable error text

### 9.4 Network Errors

- Retry logic with exponential backoff
- Offline detection
- Queue transactions when offline
- Clear status indicators

---

## 10. Accessibility

### 10.1 WCAG 2.1 AA Compliance

**Color Contrast**:
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Test with contrast checkers

**Keyboard Navigation**:
- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Skip links for navigation

**Screen Readers**:
- Semantic HTML
- ARIA labels where needed
- Alt text for images
- Clear heading hierarchy

**Forms**:
- Associated labels
- Error announcements
- Required field indicators
- Help text

### 10.2 Component Accessibility

```tsx
// Button with proper ARIA
<button
  type="button"
  aria-label="Send tokens"
  aria-disabled={isLoading}
  disabled={isLoading}
>
  Send
</button>

// Input with label
<label htmlFor="amount" className="block text-sm font-medium">
  Amount
</label>
<input
  id="amount"
  type="number"
  aria-describedby="amount-error"
  aria-invalid={!!errors.amount}
/>
{errors.amount && (
  <p id="amount-error" role="alert" className="text-red-500 text-sm">
    {errors.amount.message}
  </p>
)}
```

---

## 11. Testing Strategy

### 11.1 Unit Tests (Jest + React Testing Library)

```typescript
// components/__tests__/BalanceCard.test.tsx
import { render, screen } from '@testing-library/react';
import BalanceCard from '../BalanceCard';

describe('BalanceCard', () => {
  it('displays total value correctly', () => {
    render(<BalanceCard totalValue={1000.50} change24h={5.2} />);
    expect(screen.getByText('$1,000.50')).toBeInTheDocument();
  });
  
  it('shows positive change in green', () => {
    render(<BalanceCard totalValue={1000} change24h={5.2} />);
    const change = screen.getByText('+5.2%');
    expect(change).toHaveClass('text-green-500');
  });
});
```

### 11.2 Integration Tests

- Test full user flows
- Mock CDP API responses
- Test form submissions
- Test navigation

### 11.3 E2E Tests (Playwright/Cypress)

```typescript
// e2e/sell-crypto.spec.ts
test('complete sell crypto flow', async ({ page }) => {
  await page.goto('/sell');
  await page.selectOption('[name="crypto"]', 'ETH');
  await page.fill('[name="amount"]', '0.5');
  await page.selectOption('[name="currency"]', 'USD');
  await page.click('button:has-text("Preview Sale")');
  await expect(page.locator('.preview')).toBeVisible();
  // Continue with sale...
});
```

### 11.4 Visual Regression Testing

- Chromatic or Percy
- Test key screens
- Mobile/desktop variants
- Dark mode (if implemented)

---

## 12. Security Considerations

### 12.1 Frontend Security

**Input Sanitization**:
- Validate all user inputs
- Sanitize before display
- Use Zod for schema validation

**XSS Prevention**:
- React's built-in escaping
- Avoid `dangerouslySetInnerHTML`
- Content Security Policy headers

**CSRF Protection**:
- NextAuth.js CSRF tokens
- SameSite cookies

**Sensitive Data**:
- Never log private keys or secrets
- Clear sensitive data from memory
- Secure localStorage usage (minimal)
- Encrypt imported wallet data

### 12.2 Web3 Security

**Transaction Signing**:
- Always show preview before signing
- Verify contract addresses
- Display decoded transaction data

**Address Validation**:
- Checksum validation
- ENS resolution
- Warn on suspicious addresses

**Wallet Import**:
- Secure input handling
- Clear warnings about risks
- Encryption of imported keys
- Audit trail for imports

**Smart Contract Interaction**:
- Use verified contracts only
- Implement spending limits
- Token approval management

---

## 13. Analytics & Monitoring

### 13.1 User Analytics

**Events to Track**:
- Page views
- User signup/login
- Wallet creation
- Wallet import
- Offramp initiated/completed
- Transaction sent/received
- Errors encountered

**Tools**:
- Google Analytics 4
- Mixpanel or Amplitude
- Custom event tracking

### 13.2 Performance Monitoring

**Metrics**:
- Core Web Vitals (LCP, FID, CLS)
- Time to Interactive
- API response times
- Error rates

**Tools**:
- Vercel Analytics
- Sentry for error tracking
- Web Vitals library

### 13.3 Implementation

```typescript
// lib/analytics.ts
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    window.gtag?.('event', eventName, properties);
    
    // Custom analytics
    window.analytics?.track(eventName, properties);
  }
};

// Usage
trackEvent('offramp_initiated', {
  amount: 0.5,
  crypto: 'ETH',
  currency: 'USD',
});
```

---

## 14. Developer Experience

### 14.1 Code Standards

**ESLint Configuration**:
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

**Prettier Configuration**:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

### 14.2 Git Workflow

- Feature branches
- Conventional commits
- PR templates
- Code review requirements

### 14.3 Documentation

**Component Documentation**:
- JSDoc comments
- Storybook (optional)
- README for complex components

**Code Comments**:
- Explain "why" not "what"
- Document complex logic
- Link to relevant docs/issues

---

## 15. Deployment

### 15.1 Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Production preview
npm run start
```

### 15.2 Environment Variables

```env
# .env.local
NEXT_PUBLIC_CDP_PROJECT_ID=
NEXT_PUBLIC_CDP_API_KEY=
NEXT_PUBLIC_CHAIN_ID=8453 # Base
NEXT_PUBLIC_ALCHEMY_API_KEY=
COINBASE_CLIENT_SECRET= # Server-side only
DATABASE_URL=
```

### 15.3 CI/CD Pipeline

**GitHub Actions**:
1. Lint & type check
2. Run tests
3. Build application
4. Deploy to Vercel (preview/production)

### 15.4 Hosting

**Vercel** (Recommended):
- Automatic deployments
- Preview deployments
- Edge functions
- Built-in analytics

**Alternatives**:
- AWS Amplify
- Netlify
- Self-hosted (Docker)

---

## 16. Future Enhancements

### Phase 2 Features
- Dark mode toggle
- Multi-language support (i18n)
- Advanced charts and analytics
- Portfolio tracking
- Price alerts

### Phase 3 Features
- NFT gallery view
- Token swaps
- DeFi integrations
- Mobile app (React Native)
- Desktop app (Electron)

---

## 17. Appendix

### 17.1 Useful Commands

```bash
# Create new component
mkdir -p components/wallet && touch components/wallet/NewComponent.tsx

# Add shadcn component
npx shadcn-ui@latest add button

# Type check
npm run type-check

# Bundle analysis
ANALYZE=true npm run build
```

### 17.2 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Coinbase CDP Docs](https://docs.cdp.coinbase.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [viem Documentation](https://viem.sh/)
- [wagmi Documentation](https://wagmi.sh/)

### 17.3 Component Library Inventory

**shadcn/ui Components to Install**:
- Button
- Card
- Dialog
- Input
- Select
- Toast
- Tabs
- Dropdown Menu
- Avatar
- Badge
- Skeleton
- Alert
- Form
- Label
- Separator