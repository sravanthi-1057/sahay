# SAHAY — Problem-to-Service Web Platform

> **“Tell us your problem. We'll help you find the way forward.”**

**SAHAY** is a responsive, production-grade service-discovery web application designed to help citizens, students, farmers, job seekers, and families find relevant government schemes, NGO assistance, civic resolution services, educational grants, healthcare insurance, employment opportunities, documentation guidance, housing subsidies, agriculture support, and micro-business loans based on **what is happening in their life** rather than requiring them to know official government department titles.

---

## 🎨 Palette & Brand Identity

SAHAY uses a warm, accessible, trustworthy color system:

| Purpose | Color Name | Hex Code |
| :--- | :--- | :--- |
| **Main Background** | Warm Cream | `#F8F0E0` |
| **Headings & Navbar** | Deep Espresso | `#201808` |
| **Dark Elements** | Near Black Brown | `#181008` |
| **Primary CTA & Icons** | Bright Orange | `#E86020` |
| **Borders & UI Elements**| Soft Beige | `#E8E0D0` |
| **Light Cards & Surfaces**| Light Cream | `#F8F8E8` |
| **Labels & Muted Text** | Muted Taupe | `#806F55` |
| **Decorative Accents** | Pale Gold | `#FFD98A` |
| **Light Buttons & Cards** | White / Cream | `#FFFDF5` |

---

## 📁 Final Page Structure

```text
sahay/
├── frontend/
│   ├── index.html              # Home (Hero, Problem Input, How SAHAY Works, Real-Life Example, Categories Grid)
│   ├── find-help.html          # Find Help (Problem Input, Clarification Questions, Recommended Services Grid)
│   ├── services.html           # Services Directory (Search & 10 Domain Categories overview & list)
│   ├── service-details.html    # Service Details (What is this service, Why it helps, Eligibility, Documents, How to Apply 01-04, Save Service)
│   ├── how-it-works.html       # How SAHAY Works (Complete 5-step breakdown & storytelling flow)
│   ├── about.html              # About (What is SAHAY?, Why SAHAY?, Our Mission, How SAHAY Helps People, Founders)
│   ├── saved-services.html     # Saved Services (Bookmark Manager with useful empty state & remove actions)
│   ├── login.html              # Login (Authentication form with email/password & state persistence)
│   ├── signup.html             # Sign Up (Account creation form with validation & password confirmation)
│   ├── css/
│   │   └── style.css           # Complete CSS system, utility tokens & Bootstrap overrides
│   ├── js/
│   │   ├── data.js             # Datasets (CATEGORIES_DATA & 12 Detailed SERVICES_DATA objects)
│   │   ├── services.js         # Problem matching engine, keyword search & bookmark manager
│   │   ├── auth.js             # User authentication system (Registration, Login, Session state & Navbar rendering)
│   │   └── app.js              # Global DOM helpers, card HTML renderers & navigation actions
│   └── assets/
├── backend/                    # Reserved for future Django REST Framework backend integration
└── README.md                   # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Open Directly in Browser
Double-click `frontend/index.html` or drag it into any web browser.

### Option 2: Run via Local Python Server
To simulate production HTTP serving, navigate to `frontend/` and run:

```bash
python3 -m http.server 8000 -d /Users/sravanthikalavakunta/.gemini/antigravity/scratch/sahay/frontend
```

Open `http://localhost:8000` in your web browser.

---

## 🔐 Authentication & Session Manager (`js/auth.js`)

* **Default Demo Login**:
  * Email: `user@sahay.org`
  * Password: `password123`
* When authenticated, the navbar dynamically replaces `Login` and `Sign Up` buttons with a user profile dropdown containing direct links to **Saved Services** and **Log Out**.

---

## 📄 License & Disclaimer

SAHAY is an open public-benefit citizen guidance platform. Official applications, fee payments, and legal approvals occur on verified government department portals.
