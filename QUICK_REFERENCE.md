# DUCC Migration - Quick Reference Card

## 🎨 Color Palette

```css
Primary Purple:   #4B2E83
Dark Purple:      #1A103D
Gold:             #EAB308
Light Purple BG:  #F8F4FF
White:            #FFFFFF
```

## 📦 New Blocks Created

| Block Name | File Location | Purpose |
|------------|---------------|---------|
| QuickAccessBlock | `src/blocks/QuickAccessBlock.ts` | 6-8 icon cards for quick navigation |
| ServiceCardsBlock | `src/blocks/ServiceCardsBlock.ts` | Grid of service cards with hover effects |
| CTABannerBlock | `src/blocks/CTABannerBlock.ts` | Call-to-action banner with gradient |
| DirectorQuoteBlock | `src/blocks/DirectorQuoteBlock.ts` | Quote section with avatar |

## 🔧 Files to Update

### Required Changes
```
✅ src/globals/SiteSettings.ts          → Update default colors
✅ src/app/(frontend)/layout.tsx        → Add Playfair font
✅ src/app/(frontend)/styles.css        → Add custom CSS
✅ src/blocks/index.ts                  → Register new blocks
✅ src/app/(frontend)/components/BlockRenderer.tsx → Add components
```

### Optional Changes
```
⚪ src/app/(frontend)/components/Header.tsx → Top bar + CTA
⚪ src/app/(frontend)/components/Footer.tsx → Dark theme
⚪ src/app/(frontend)/components/blocks/HeroBlock.tsx → Ken Burns
```

## 🏠 Home Page Block Order

```
1. Hero Carousel (existing)
2. Quick Access (NEW) ← -80px margin
3. About Section (flexible row or new)
4. Service Cards (NEW)
5. News Updates (existing)
6. Director Quote (NEW)
7. CTA Banner (NEW)
```

## 🚀 Quick Start Commands

```bash
# 1. Generate types after adding blocks
npm run generate:types

# 2. Start dev server
npm run dev

# 3. Access admin
http://localhost:3666/admin

# 4. View frontend
http://localhost:3666
```

## 📝 Block Registration Template

```typescript
// In src/blocks/index.ts
import { QuickAccessBlock } from './QuickAccessBlock'
import { ServiceCardsBlock } from './ServiceCardsBlock'
import { CTABannerBlock } from './CTABannerBlock'
import { DirectorQuoteBlock } from './DirectorQuoteBlock'

export const blocks = [
  // ... existing blocks
  QuickAccessBlock,
  ServiceCardsBlock,
  CTABannerBlock,
  DirectorQuoteBlock,
]
```

## 🎯 BlockRenderer Template

```typescript
// In src/app/(frontend)/components/BlockRenderer.tsx
import QuickAccessBlock from './blocks/QuickAccessBlock'
import ServiceCardsBlock from './blocks/ServiceCardsBlock'
import CTABannerBlock from './blocks/CTABannerBlock'
import DirectorQuoteBlock from './blocks/DirectorQuoteBlock'

const blockComponents: Record<string, React.ComponentType<any>> = {
  // ... existing blocks
  quickAccess: QuickAccessBlock,
  serviceCards: ServiceCardsBlock,
  ctaBanner: CTABannerBlock,
  directorQuote: DirectorQuoteBlock,
}
```

## 🎨 CSS Classes Reference

```css
.btn-shine          → Button with shine effect on hover
.card-hover         → Card lift + shadow on hover
.float-y            → Floating animation
.fade-in-up         → Fade in from bottom
.ken-burns          → Zoom effect for images
.hero-overlay       → Purple gradient overlay
.radial-glow        → Radial gradient background
.bg-grid            → Grid pattern overlay
```

## 🔍 Icon Names (Lucide)

```
LayoutDashboard, Mail, Wifi, Globe, ShieldCheck, LifeBuoy,
Users, BookOpen, Server, Lock, FileCheck, ShoppingCart,
Headphones, Cloud, Database, Zap, Network, School
```

## 📊 Sample Content

### Quick Access Items
```
1. Samarth DU → LayoutDashboard → https://du.samarth.ac.in
2. Email → Mail → /it-services#email
3. WiFi & VPN → Wifi → /it-services#wifi
4. Web Hosting → Globe → /it-services#webhosting
5. Cyber Security → ShieldCheck → /it-services#security
6. Help Desk → LifeBuoy → /help-and-support
```

### Service Cards
```
1. DU Samarth eGov → Platform → LayoutDashboard
2. Email & Google Workspace → Collaboration → Mail
3. Wi-Fi & VPN Services → Connectivity → Wifi
4. Cyber Security → Security → ShieldCheck
5. Web Hosting Services → Hosting → Globe
6. Plagiarism Detection → Research → FileCheck
7. GeM & e-Procurement → Administration → ShoppingCart
8. IT Service Desk → Support → Headphones
```

## ⚡ Troubleshooting

| Issue | Solution |
|-------|----------|
| Blocks not in admin | Check `blocks/index.ts` exports, restart server |
| Styles not applying | Verify CSS import in layout.tsx |
| TypeScript errors | Run `npm run generate:types` |
| Fonts not loading | Check font import, restart server |
| Components not rendering | Check BlockRenderer.tsx mapping |

## 📚 Documentation Files

```
MIGRATION_SUMMARY.md      → Executive overview
IMPLEMENTATION_GUIDE.md   → Step-by-step instructions
MIGRATION_PLAN.md         → Technical specifications
QUICK_REFERENCE.md        → This file
```

## ✅ Implementation Checklist

```
Phase 1: Design System (30 min)
□ Update theme colors
□ Add Playfair font
□ Add custom CSS
□ Register blocks
□ Update BlockRenderer

Phase 2: Components (1 hour)
□ Update Header
□ Update Footer
□ Test new blocks

Phase 3: Content (1 hour)
□ Configure Home page
□ Add block content
□ Test responsive design

Phase 4: Polish (30 min)
□ Update other pages
□ Test all links
□ Cross-browser test
```

## 🎯 Success Criteria

- ✅ Purple/gold color scheme throughout
- ✅ Playfair Display headings
- ✅ Smooth hover animations
- ✅ Quick Access cards floating
- ✅ Service cards with glow effect
- ✅ Dark footer with CTA
- ✅ Director quote section
- ✅ CTA banner with gradient
- ✅ Responsive on all devices

---

**Time to Complete**: 2-3 hours for core features

**Start Here**: Open `IMPLEMENTATION_GUIDE.md` → Step 1
