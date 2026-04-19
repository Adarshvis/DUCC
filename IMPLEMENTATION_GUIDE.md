# DUCC Frontend Migration - Step-by-Step Implementation Guide

This guide will walk you through implementing the DUCC_2-main design in your Payload CMS website.

---

## 🚀 QUICK START (30 Minutes)

Follow these steps to get the new design up and running quickly:

### Step 1: Update Theme Colors (5 min)

**File**: `src/globals/SiteSettings.ts`

Change the default values:

```typescript
{
  name: 'primaryColor',
  type: 'text',
  defaultValue: '#4B2E83', // Changed from #1E40AF
},
{
  name: 'secondaryColor',
  type: 'text',
  defaultValue: '#1A103D', // Changed from #9333EA
},
{
  name: 'accentColor',
  type: 'text',
  defaultValue: '#EAB308', // Same
},
{
  name: 'mutedBackgroundColor',
  type: 'text',
  defaultValue: '#F8F4FF', // Changed from #F1F5F9
},
{
  name: 'textColor',
  type: 'text',
  defaultValue: '#1A103D', // Changed from #111827
},
```

### Step 2: Add Playfair Display Font (5 min)

**File**: `src/app/(frontend)/layout.tsx`

```typescript
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

// Add this after jetbrainsMono
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// Update the html className
<html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
```

### Step 3: Add Custom CSS (10 min)

**File**: `src/app/(frontend)/styles.css`

Add at the end of the file:

```css
/* DUCC Custom Styles */

/* Typography */
h1, h2, h3, h4 {
  font-family: var(--font-playfair), serif;
  letter-spacing: -0.01em;
}

/* Animations */
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

@keyframes kenBurns {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.float-y {
  animation: float 3s ease-in-out infinite;
}

.ken-burns {
  animation: kenBurns 8s ease-out forwards;
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

### Step 4: Register New Blocks (5 min)

**File**: `src/blocks/index.ts`

Add these imports at the top:

```typescript
import { QuickAccessBlock } from './QuickAccessBlock'
import { ServiceCardsBlock } from './ServiceCardsBlock'
import { CTABannerBlock } from './CTABannerBlock'
import { DirectorQuoteBlock } from './DirectorQuoteBlock'
```

Add to the blocks array:

```typescript
export const blocks = [
  // ... existing blocks
  QuickAccessBlock,
  ServiceCardsBlock,
  CTABannerBlock,
  DirectorQuoteBlock,
]
```

### Step 5: Update BlockRenderer (5 min)

**File**: `src/app/(frontend)/components/BlockRenderer.tsx`

Add these imports:

```typescript
import QuickAccessBlock from './blocks/QuickAccessBlock'
import ServiceCardsBlock from './blocks/ServiceCardsBlock'
import CTABannerBlock from './blocks/CTABannerBlock'
import DirectorQuoteBlock from './blocks/DirectorQuoteBlock'
```

Add to the blockComponents object:

```typescript
const blockComponents: Record<string, React.ComponentType<any>> = {
  // ... existing blocks
  quickAccess: QuickAccessBlock,
  serviceCards: ServiceCardsBlock,
  ctaBanner: CTABannerBlock,
  directorQuote: DirectorQuoteBlock,
}
```

---

## 📦 COMPLETE IMPLEMENTATION (2-3 Hours)

### Phase 1: Update Existing Components

#### 1.1 Update Header Component

**File**: `src/app/(frontend)/components/Header.tsx`

Add top announcement bar before the main nav:

```tsx
{/* Top announcement bar */}
<div className="hidden md:block text-white text-xs py-2" style={{ background: '#1A103D' }}>
  <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <span className="opacity-80">University of Delhi · Established 1956</span>
      <span className="opacity-40">|</span>
      <span className="opacity-80">Central IT Institution</span>
    </div>
    <div className="flex items-center gap-5">
      <a href="mailto:helpdesk@ducc.du.ac.in" className="hover:text-[#EAB308] transition-colors">
        helpdesk@ducc.du.ac.in
      </a>
      <a 
        href="https://du.samarth.ac.in/index.php/site/login" 
        target="_blank" 
        rel="noreferrer" 
        className="flex items-center gap-1 hover:text-[#EAB308] transition-colors"
      >
        Samarth Login <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </div>
</div>
```

Update logo styling to circular gradient badge:

```tsx
<Link to="/" className="flex items-center gap-3 group">
  <div className="relative">
    <div 
      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-105" 
      style={{ background: 'linear-gradient(135deg, #4B2E83 0%, #1A103D 100%)' }}
    >
      <GraduationCap className="w-6 h-6 text-[#EAB308]" />
    </div>
    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full" style={{ background: '#EAB308' }}></div>
  </div>
  <div className="leading-tight">
    <div className="text-2xl font-bold tracking-tight" style={{ color: '#4B2E83' }}>DUCC</div>
    <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">
      Delhi University Computer Centre
    </div>
  </div>
</Link>
```

#### 1.2 Update Footer Component

**File**: `src/app/(frontend)/components/Footer.tsx`

Change background to dark purple:

```tsx
<footer className="relative mt-24 text-white" style={{ background: '#1A103D' }}>
  <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
  {/* ... rest of footer content */}
</footer>
```

Add CTA section at the top:

```tsx
<div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 pb-12 border-b border-white/10">
  <div>
    <div className="flex items-center gap-3 mb-5">
      <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: '#4B2E83' }}>
        <GraduationCap className="w-5 h-5 text-[#EAB308]" />
      </div>
      <div>
        <div className="text-2xl font-bold">DUCC</div>
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">
          Delhi University Computer Centre
        </div>
      </div>
    </div>
    <p className="text-white/75 leading-relaxed max-w-lg">
      Central IT institution for the University of Delhi since 1956 — powering knowledge, 
      connectivity and digital governance for 74,000+ users across the DU ecosystem.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <a 
        href="https://du.samarth.ac.in/index.php/site/login" 
        target="_blank" 
        rel="noreferrer" 
        className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-md transition hover:brightness-110" 
        style={{ background: '#EAB308', color: '#1A103D' }}
      >
        Access Samarth <ArrowUpRight className="w-4 h-4" />
      </a>
      <Link 
        to="/help-and-support" 
        className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-md border border-white/25 hover:bg-white/10 transition"
      >
        Contact Support
      </Link>
    </div>
  </div>
  {/* Contact info on the right */}
</div>
```

### Phase 2: Create Home Page Structure

**In Payload Admin**:

1. Go to Pages → Home
2. Delete existing blocks
3. Add blocks in this order:
   - **Hero Block** (existing, update content)
   - **Quick Access Block** (new)
   - **About Section Block** (use Flexible Row or create new)
   - **Service Cards Block** (new)
   - **News Updates Block** (existing)
   - **Director Quote Block** (new)
   - **CTA Banner Block** (new)

### Phase 3: Configure Content

#### Quick Access Block Content:
```
1. Samarth DU - LayoutDashboard - https://du.samarth.ac.in - External
2. Email - Mail - /it-services#email
3. WiFi & VPN - Wifi - /it-services#wifi
4. Web Hosting - Globe - /it-services#webhosting
5. Cyber Security - ShieldCheck - /it-services#security
6. Help Desk - LifeBuoy - /help-and-support
```

#### Service Cards Block Content:
```
1. DU Samarth eGov - Platform - LayoutDashboard
2. Email & Google Workspace - Collaboration - Mail
3. Wi-Fi & VPN Services - Connectivity - Wifi
4. Cyber Security - Security - ShieldCheck
5. Web Hosting Services - Hosting - Globe
6. Plagiarism Detection - Research - FileCheck
7. GeM & e-Procurement - Administration - ShoppingCart
8. IT Service Desk - Support - Headphones
```

#### Director Quote Block Content:
```
Quote: "DUCC collaborates with University partners to advance teaching, learning, innovation and discovery — enabling a digitally empowered academic ecosystem at the University of Delhi."
Name: Prof. Sanjeev Singh
Role: Director, DUCC
Initials: SS
```

#### CTA Banner Block Content:
```
Heading: "Problem with Samarth, Wi-Fi, Training, Web hosting or Security?"
Description: "Our central IT Service Desk provides front-line user support for all staff and students."
Primary Button: "Get IT Help" → /help-and-support
Secondary Button: "Email Helpdesk" → mailto:helpdesk@ducc.du.ac.in
```

---

## 🎨 OPTIONAL ENHANCEMENTS

### Add About Section Block

Create a new block similar to the existing Flexible Row but with specific styling for the About section with bullet points and stats grid.

### Update Hero Block

Add Ken Burns zoom effect to background images:

```tsx
<div
  className="absolute inset-0 bg-cover bg-center ken-burns"
  style={{ backgroundImage: `url(${slide.image})` }}
/>
```

Add floating stats card on the right side (desktop only).

### Update Statistics Block

Update colors to match DUCC theme (purple/gold).

---

## ✅ TESTING CHECKLIST

- [ ] Theme colors updated in admin
- [ ] Fonts loading correctly
- [ ] Custom CSS animations working
- [ ] New blocks registered and rendering
- [ ] Header top bar visible
- [ ] Footer dark theme applied
- [ ] Quick Access cards displaying
- [ ] Service Cards grid working
- [ ] Director Quote rendering
- [ ] CTA Banner displaying
- [ ] Responsive design on mobile
- [ ] All links working
- [ ] Hover effects functioning
- [ ] Cross-browser compatibility

---

## 🐛 TROUBLESHOOTING

**Blocks not showing in admin:**
- Check `src/blocks/index.ts` exports
- Restart dev server
- Clear browser cache

**Styles not applying:**
- Check CSS file imported in layout
- Verify Tailwind config
- Check for CSS conflicts

**Fonts not loading:**
- Verify Google Fonts import
- Check font variable names
- Restart dev server

**TypeScript errors:**
- Run `npm run generate:types`
- Check interface names match

---

## 📚 NEXT STEPS

1. Implement remaining pages (About, IT Services, Help & Support)
2. Add more content blocks as needed
3. Optimize images
4. Add SEO metadata
5. Test performance
6. Deploy to production

---

**Need Help?** Refer to `MIGRATION_PLAN.md` for detailed technical specifications.
