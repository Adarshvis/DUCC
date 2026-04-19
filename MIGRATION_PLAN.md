# DUCC Frontend Migration Plan
## Migrating DUCC_2-main Design to Payload CMS

This document outlines the complete strategy to migrate the modern DUCC_2-main frontend design into your Payload CMS-driven website.

---

## 📋 OVERVIEW

**Goal**: Replicate the exact visual design, animations, and user experience from DUCC_2-main while maintaining the Payload CMS backend for content management.

**Approach**: 
1. Update design system (colors, fonts, CSS)
2. Create new Payload blocks matching DUCC_2-main components
3. Update existing components with new styling
4. Migrate page structures
5. Add custom animations and interactions

---

## 🎨 PHASE 1: DESIGN SYSTEM SETUP

### 1.1 Update Theme Colors in Site Settings

**Current Colors** → **New DUCC Colors**:
- Primary: `#1E40AF` → `#4B2E83` (Royal Purple)
- Secondary: `#9333EA` → `#1A103D` (Dark Purple)
- Accent: `#F59E0B` → `#EAB308` (Gold)
- Background: `#FFFFFF` → `#FFFFFF` (White)
- Surface: `#FFFFFF` → `#FFFFFF` (White)
- Muted BG: `#F1F5F9` → `#F8F4FF` (Light Purple)
- Text: `#111827` → `#1A103D` (Dark Purple)

**Action**: Update default values in `src/globals/SiteSettings.ts`

### 1.2 Add Playfair Display Font

**Current**: Inter + JetBrains Mono
**New**: Inter + Playfair Display + JetBrains Mono

**File**: `src/app/(frontend)/layout.tsx`

```typescript
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// Update className
<html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
```

### 1.3 Update Global CSS

**File**: `src/app/(frontend)/styles.css`

Add DUCC-specific styles:

```css
/* Typography */
h1, h2, h3, h4 {
  font-family: var(--font-playfair), serif;
  letter-spacing: -0.01em;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.float-y {
  animation: float 3s ease-in-out infinite;
}

/* Button shine effect */
.btn-shine {
  position: relative;
  overflow: hidden;
}

.btn-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.btn-shine:hover::before {
  left: 100%;
}

/* Card hover effect */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -12px rgba(75, 46, 131, 0.25);
}

/* Hero overlay */
.hero-overlay {
  background: linear-gradient(135deg, rgba(26,16,61,0.85) 0%, rgba(75,46,131,0.75) 100%);
}

/* Radial glow */
.radial-glow {
  background: radial-gradient(circle at 50% 50%, rgba(234,179,8,0.08) 0%, transparent 70%);
}

/* Grid pattern */
.bg-grid {
  background-image: 
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

---

## 🧩 PHASE 2: NEW PAYLOAD BLOCKS

### 2.1 Quick Access Block

**Purpose**: Floating card grid with 6 quick links (Samarth, Email, WiFi, etc.)

**File**: `src/blocks/QuickAccessBlock.ts`

```typescript
import type { Block } from 'payload'

export const QuickAccessBlock: Block = {
  slug: 'quickAccess',
  labels: {
    singular: 'Quick Access',
    plural: 'Quick Access Blocks',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Quick Access Items',
      minRows: 4,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Layout Dashboard', value: 'LayoutDashboard' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Wifi', value: 'Wifi' },
            { label: 'Globe', value: 'Globe' },
            { label: 'Shield Check', value: 'ShieldCheck' },
            { label: 'Life Buoy', value: 'LifeBuoy' },
            { label: 'Users', value: 'Users' },
            { label: 'Book Open', value: 'BookOpen' },
          ],
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'colorIndex',
          type: 'select',
          options: [
            { label: 'Purple 1', value: '0' },
            { label: 'Purple 2', value: '1' },
          ],
          defaultValue: '0',
        },
      ],
    },
    {
      name: 'marginTop',
      type: 'number',
      label: 'Negative Margin Top (px)',
      defaultValue: -80,
      admin: {
        description: 'Negative value to overlap with hero section',
      },
    },
  ],
}
```

**Frontend Component**: `src/app/(frontend)/components/blocks/QuickAccessBlock.tsx`

```tsx
'use client'

import React from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

interface QuickAccessItem {
  label: string
  icon: string
  link: string
  external?: boolean
  colorIndex?: string
}

interface QuickAccessBlockProps {
  items: QuickAccessItem[]
  marginTop?: number
}

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Circle
  return <IconComponent className={className} />
}

export default function QuickAccessBlock({ items, marginTop = -80 }: QuickAccessBlockProps) {
  return (
    <section className="relative z-20 px-6" style={{ marginTop: `${marginTop}px` }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: '#ffffff', border: '1px solid #F8F4FF' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {items.map((item, i) => {
              const Component = item.external ? 'a' : Link
              const props = item.external
                ? { href: item.link, target: '_blank', rel: 'noreferrer' }
                : { href: item.link }

              return (
                <Component
                  key={item.label}
                  {...props}
                  className="group relative flex flex-col items-center justify-center gap-3 py-8 px-4 text-center transition-all hover:bg-[#F8F4FF] border-r border-b last:border-r-0 md:[&:nth-child(3)]:border-r-0 lg:[&:nth-child(3)]:border-r lg:[&:nth-child(6)]:border-r-0"
                  style={{ borderColor: '#F8F4FF' }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: item.colorIndex === '1' ? '#1A103D' : '#4B2E83',
                    }}
                  >
                    <Icon name={item.icon} className="w-6 h-6 text-[#EAB308]" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-[#4B2E83] transition-colors">
                    {item.label}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#EAB308] transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Component>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 2.2 About Section Block

**Purpose**: Two-column layout with text + bullet points on left, stats grid on right

**File**: `src/blocks/AboutSectionBlock.ts`

```typescript
import type { Block } from 'payload'

export const AboutSectionBlock: Block = {
  slug: 'aboutSection',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      defaultValue: 'ABOUT DUCC',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Use **text** for purple highlight',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'bulletPoints',
      type: 'array',
      label: 'Bullet Points',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Read More',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/about',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 4,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Users', value: 'Users' },
            { label: 'Cloud', value: 'Cloud' },
            { label: 'Network', value: 'Network' },
            { label: 'Globe', value: 'Globe' },
            { label: 'Zap', value: 'Zap' },
            { label: 'School', value: 'School' },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Purple', value: 'lightPurple' },
      ],
    },
  ],
}
```

### 2.3 Service Cards Block

**Purpose**: Grid of service cards with icons, tags, and hover effects

**File**: `src/blocks/ServiceCardsBlock.ts`

```typescript
import type { Block } from 'payload'

export const ServiceCardsBlock: Block = {
  slug: 'serviceCards',
  labels: {
    singular: 'Service Cards',
    plural: 'Service Cards Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'WHAT WE DO',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Explore all services',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/it-services',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Layout Dashboard', value: 'LayoutDashboard' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Wifi', value: 'Wifi' },
            { label: 'Shield Check', value: 'ShieldCheck' },
            { label: 'Globe', value: 'Globe' },
            { label: 'File Check', value: 'FileCheck' },
            { label: 'Shopping Cart', value: 'ShoppingCart' },
            { label: 'Headphones', value: 'Headphones' },
          ],
        },
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}
```

### 2.4 Director Quote Block

**Purpose**: Full-width quote section with dark background and avatar

**File**: `src/blocks/DirectorQuoteBlock.ts`

```typescript
import type { Block } from 'payload'

export const DirectorQuoteBlock: Block = {
  slug: 'directorQuote',
  labels: {
    singular: 'Director Quote',
    plural: 'Director Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'initials',
      type: 'text',
      required: true,
      maxLength: 2,
      admin: {
        description: '2-letter initials for avatar',
      },
    },
  ],
}
```

### 2.5 CTA Banner Block

**Purpose**: Call-to-action banner with gradient background

**File**: `src/blocks/CTABannerBlock.ts`

```typescript
import type { Block } from 'payload'

export const CTABannerBlock: Block = {
  slug: 'ctaBanner',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lightPurple',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Purple', value: 'lightPurple' },
      ],
    },
  ],
}
```

---

## 🔄 PHASE 3: UPDATE EXISTING BLOCKS

### 3.1 Update Hero Block

**Changes Needed**:
- Add Ken Burns zoom effect
- Add floating stats card option
- Update styling to match DUCC_2-main
- Add play/pause controls
- Add slide counter

**File**: `src/app/(frontend)/components/blocks/HeroBlock.tsx`

Key additions:
- Ken Burns CSS animation
- Glassmorphism floating card
- Gold accent line at top
- Purple gradient overlay
- Slide counter (01/04 format)

### 3.2 Update Statistics Block

**Changes Needed**:
- Match DUCC card styling
- Update colors to purple/gold
- Add hover effects

### 3.3 Update News/Blog Block

**Changes Needed**:
- Update card styling
- Add category badges (gold background)
- Update hover effects
- Match typography

---

## 🎨 PHASE 4: UPDATE HEADER & FOOTER

### 4.1 Update Header Component

**File**: `src/app/(frontend)/components/Header.tsx`

**Changes**:
1. Add top announcement bar (dark purple)
2. Update logo to circular gradient badge
3. Add "Samarth Login" button (purple with gold hover)
4. Update navigation styling
5. Add search icon
6. Update mobile menu

### 4.2 Update Footer Component

**File**: `src/app/(frontend)/components/Footer.tsx`

**Changes**:
1. Dark purple background (#1A103D)
2. Grid pattern overlay
3. Update link columns
4. Add social icons with hover effects
5. Add "Access Samarth" CTA button
6. Update contact info styling

---

## 📄 PHASE 5: UPDATE HEADER & FOOTER GLOBALS

### 5.1 Update Header Global

**File**: `src/globals/Header.ts`

Add fields for:
- Top bar (enabled, text, background color)
- CTA button (enabled, label, URL)
- Search bar (enabled, placeholder)

### 5.2 Update Footer Global

**File**: `src/globals/Footer.ts`

Add fields for:
- CTA section (heading, description, buttons)
- Contact info (address, email, phone, website)
- Show social links toggle

---

## 🚀 PHASE 6: CREATE PAGE TEMPLATES

### 6.1 Home Page Template

**Structure**:
1. Hero Carousel (existing, updated)
2. Quick Access Block (new)
3. About Section Block (new)
4. Service Cards Block (new)
5. News Updates Block (existing, updated)
6. Director Quote Block (new)
7. CTA Banner Block (new)

### 6.2 About Page Template

**Structure**:
1. Page Header
2. Mission/Vision cards
3. Stats strip
4. Objectives grid
5. Infrastructure section
6. Director quote

### 6.3 IT Services Page Template

**Structure**:
1. Page Header
2. Service grid (quick overview)
3. Detailed service sections (alternating layout)

### 6.4 Help & Support Page Template

**Structure**:
1. Page Header
2. Support channels cards
3. Ticket form + contact info
4. FAQs accordion

---

## 📦 PHASE 7: INSTALL DEPENDENCIES

Add missing packages:

```bash
npm install embla-carousel-react
npm install class-variance-authority
npm install clsx tailwind-merge
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Design System
- [ ] Update theme colors in SiteSettings
- [ ] Add Playfair Display font
- [ ] Add custom CSS animations
- [ ] Update Tailwind config

### New Blocks
- [ ] Create QuickAccessBlock
- [ ] Create AboutSectionBlock
- [ ] Create ServiceCardsBlock
- [ ] Create DirectorQuoteBlock
- [ ] Create CTABannerBlock

### Update Existing Blocks
- [ ] Update HeroBlock with Ken Burns effect
- [ ] Update StatisticsBlock styling
- [ ] Update NewsUpdatesBlock styling
- [ ] Update FAQBlock styling

### Layout Components
- [ ] Update Header with top bar
- [ ] Update Footer with dark theme
- [ ] Add PageHeader component

### Globals
- [ ] Update Header global config
- [ ] Update Footer global config
- [ ] Update SiteSettings defaults

### Pages
- [ ] Migrate Home page structure
- [ ] Migrate About page structure
- [ ] Migrate IT Services page structure
- [ ] Migrate Help & Support page structure

### Testing
- [ ] Test responsive design
- [ ] Test animations
- [ ] Test all links
- [ ] Test form submissions
- [ ] Cross-browser testing

---

## 🎯 PRIORITY ORDER

1. **High Priority** (Core Visual Identity):
   - Update theme colors
   - Add Playfair Display font
   - Update Header & Footer
   - Update Hero block

2. **Medium Priority** (Key Blocks):
   - Create QuickAccessBlock
   - Create ServiceCardsBlock
   - Update NewsUpdatesBlock
   - Create CTABannerBlock

3. **Low Priority** (Polish):
   - Create AboutSectionBlock
   - Create DirectorQuoteBlock
   - Add all animations
   - Fine-tune spacing

---

## 📝 NOTES

- All blocks should be added to `src/blocks/index.ts`
- All frontend components should be added to `src/app/(frontend)/components/blocks/`
- Update `BlockRenderer.tsx` to include new blocks
- Test each block individually before integration
- Use existing block patterns as reference
- Maintain accessibility standards (ARIA labels, keyboard navigation)

---

## 🔗 NEXT STEPS

After completing this migration:
1. Populate content in Payload CMS
2. Configure Header & Footer in admin
3. Create pages using new blocks
4. Test thoroughly
5. Deploy to production

---

**Estimated Time**: 3-5 days for full implementation
**Complexity**: Medium-High
**Impact**: Complete visual transformation
