from django.core.management.base import BaseCommand
from api.models import Category, Service

CATEGORIES_SEED = [
  {
    "id": 1,
    "name": "Government Services",
    "icon": "bi-building",
    "description": "Central & State welfare schemes, subsidies, citizen benefits, and public services.",
    "count": 42
  },
  {
    "id": 2,
    "name": "Education",
    "icon": "bi-mortarboard",
    "description": "Scholarships, fee concessions, student loans, skill training, and educational grants.",
    "count": 28
  },
  {
    "id": 3,
    "name": "Healthcare",
    "icon": "bi-heart-pulse",
    "description": "Health insurance schemes, hospital coverage, medical relief funds, and wellness programs.",
    "count": 19
  },
  {
    "id": 4,
    "name": "Employment",
    "icon": "bi-briefcase",
    "description": "Job matching, apprenticeship programs, unemployment allowance, and vocational training.",
    "count": 24
  },
  {
    "id": 5,
    "name": "Documentation",
    "icon": "bi-file-earmark-text",
    "description": "Aadhaar, Voter ID, Ration Card, Income/Caste certificates, passports, and identity proofs.",
    "count": 35
  },
  {
    "id": 6,
    "name": "Civic Services",
    "icon": "bi-geo-alt",
    "description": "Garbage disposal, sanitation complaints, street lights, road repairs, and water supply issues.",
    "count": 16
  },
  {
    "id": 7,
    "name": "NGO Support",
    "icon": "bi-people",
    "description": "Non-profit assistance, shelter homes, legal aid, food security, and community relief.",
    "count": 12
  },
  {
    "id": 8,
    "name": "Housing",
    "icon": "bi-house-door",
    "description": "Affordable housing schemes, home loan subsidies, slum redevelopment, and rental support.",
    "count": 14
  },
  {
    "id": 9,
    "name": "Agriculture",
    "icon": "bi-flower1",
    "description": "PM-KISAN crop insurance, seed subsidies, tractor loans, and farmer income support.",
    "count": 22
  },
  {
    "id": 10,
    "name": "Business & MSME",
    "icon": "bi-shop",
    "description": "MUDRA micro-loans, startup registration, MSME subsidies, and trade licenses.",
    "count": 18
  }
]

SERVICES_SEED = [
  {
    "id": 1,
    "name": "National Post-Matric Scholarship Scheme",
    "category": "Education",
    "description": "Financial assistance covering tuition fees, maintenance allowance, and academic expenses for eligible post-secondary students.",
    "keywords": ["scholarship", "college", "school", "fees", "tuition", "student", "education", "afford", "financial support", "degree"],
    "why_it_helps": "Provides direct financial grants to students from low-income families so they can pursue higher education without fee burdens.",
    "eligibility": [
      "Enrolled in a recognized college, university, or polytechnic institution",
      "Annual family income from all sources under ₹2,50,000",
      "Passed previous qualifying examination with minimum 50% marks",
      "Not receiving concurrent government scholarships"
    ],
    "documents": [
      "Aadhaar Card (linked with bank account for Direct Benefit Transfer)",
      "Income Certificate issued by Tehsildar / revenue officer for current financial year",
      "Current academic year College ID Card and fee payment receipt",
      "Self-attested mark sheet of previous class or degree",
      "Bank passbook first page showing account number & IFSC"
    ],
    "steps": [
      "Verify eligibility criteria on the official scholarship portal",
      "Gather required identity, income, and academic proof documents",
      "Register on National Scholarship Portal (scholarships.gov.in) using Aadhaar",
      "Fill online application form and course fee breakdown",
      "Upload clear scanned PDF documents",
      "Submit application online and print acknowledgment copy for college nodal officer"
    ],
    "location": "All India",
    "official_url": "https://scholarships.gov.in"
  },
  {
    "id": 2,
    "name": "Swachh Municipal Door-to-Door Waste Collection & Grievance",
    "category": "Civic Services",
    "description": "Report local garbage accumulation, request doorstep waste pickup, or log sanitation complaints with quick municipal dispatch.",
    "keywords": ["garbage", "waste", "trash", "clean", "road", "pothole", "street light", "drain", "sanitation", "dumping", "dirt"],
    "why_it_helps": "Directly connects residents to ward sanitary inspectors for prompt clearing of unattended garbage piles and municipal sanitation issues within 24-48 hours.",
    "eligibility": [
      "Resident of registered Municipal Ward or urban local body area",
      "Location falls within local municipal corporation jurisdiction"
    ],
    "documents": [
      "Location details (Street name, house number, landmark, or geo-tag)",
      "Photograph of sanitation issue or garbage dump (optional but recommended)"
    ],
    "steps": [
      "Identify the exact landmark and ward location of the garbage issue",
      "Capture a photograph of the sanitation site",
      "Access the Swachhata Citizen App or Municipal online portal",
      "Submit complaint under 'Garbage Dumping / Sanitation'",
      "Note down complaint tracking ID for real-time resolution updates",
      "Sanitation inspector dispatches cleaning crew within 24-48 hours"
    ],
    "location": "Urban Local Bodies Nationwide",
    "official_url": "https://swachhbharatmission.gov.in"
  },
  {
    "id": 3,
    "name": "PM Kaushal Vikas Yojana (PMKVY) Free Skill Training & Job Placement",
    "category": "Employment",
    "description": "Free industry-relevant skill certification, stipend support, and job placement assistance for unemployed youth.",
    "keywords": ["job", "employment", "unemployed", "work", "career", "salary", "skill", "training", "earn", "vocational", "placement"],
    "why_it_helps": "Equips unemployed youth with free practical skills in IT, healthcare, retail, electronics, and manufacturing, along with placement support in private companies.",
    "eligibility": [
      "Indian citizen aged between 15 and 45 years",
      "Currently unemployed or seeking job skill enhancement",
      "Possesses valid Aadhaar card and active bank account"
    ],
    "documents": [
      "Aadhaar Card for biometric registration",
      "Educational qualification certificate (Class 8th / 10th / 12th pass mark sheet)",
      "Recent passport-sized photographs",
      "Bank passbook copy for stipend disbursement"
    ],
    "steps": [
      "Explore available skill training courses on Skill India portal",
      "Locate nearest Pradhan Mantri Kaushal Kendra (PMKK) training center",
      "Register online or visit training center in person",
      "Complete 2-3 months of hands-on practical skill classes",
      "Pass assessment by independent Sector Skill Council",
      "Receive government skill certificate and participate in job placement melas"
    ],
    "location": "All Districts across India",
    "official_url": "https://skillindia.gov.in"
  },
  {
    "id": 4,
    "name": "Issue of Official Revenue Income Certificate",
    "category": "Documentation",
    "description": "Official income proof issued by Tehsildar required for government scholarships, subsidies, and fee waivers.",
    "keywords": ["income", "certificate", "document", "aadhaar", "passport", "proof", "tehsildar", "e-district", "caste", "revenue"],
    "why_it_helps": "Certifies family annual household income from all sources, enabling citizens to claim college fee concessions, welfare schemes, and housing subsidies.",
    "eligibility": [
      "Resident of the respective State or Union Territory",
      "Self-declaration of income sources (salary, agriculture, small trade)"
    ],
    "documents": [
      "Identity Proof (Aadhaar Card, Voter ID, or Passport)",
      "Address Proof (Ration Card, Electricity Bill, or Water Bill)",
      "Income Proof (Salary Slip, IT Return, or Panchayat Sarpanch declaration)",
      "Self-Declaration Affidavit on non-judicial stamp paper"
    ],
    "steps": [
      "Collect identity, address, and income proof documents",
      "Log in to State e-District citizen service portal",
      "Fill online application form for Income Certificate",
      "Upload scanned PDF proof documents and pay nominal fee (₹15-₹30)",
      "Revenue Inspector / Talathi verifies details locally",
      "Download digitally signed Income Certificate within 7–14 working days"
    ],
    "location": "State e-District Portals Nationwide",
    "official_url": "https://edistrict.gov.in"
  },
  {
    "id": 5,
    "name": "Ayushman Bharat PM-JAY Free Health Insurance (Up to ₹5 Lakhs)",
    "category": "Healthcare",
    "description": "Cashless health coverage up to ₹5 Lakhs per family per year for secondary and tertiary hospital care.",
    "keywords": ["hospital", "doctor", "medicine", "health", "treatment", "insurance", "medical", "bill", "cashless", "surgery"],
    "why_it_helps": "Protects low-income households from catastrophic medical debts by offering 100% cashless hospitalization and surgeries across empaneled public & private hospitals.",
    "eligibility": [
      "Listed in SECC 2011 database or holding PM-JAY Golden Card",
      "Belongs to targeted socio-economic categories (occupational/deprivation status)"
    ],
    "documents": [
      "Ayushman Golden Card or PM-JAY Letter",
      "Aadhaar Card or Ration Card of beneficiary",
      "Mobile number linked for OTP verification"
    ],
    "steps": [
      "Check eligibility on mera.pmjay.gov.in portal or call 14555 helpline",
      "Visit any empaneled hospital (Public or Private)",
      "Meet Ayushman Mitra desk at hospital reception",
      "Present Aadhaar Card or Ration Card for instant e-KYC",
      "Receive 100% cashless treatment up to ₹5,000,000 per family/year"
    ],
    "location": "Pan-India Empaneled Hospitals",
    "official_url": "https://pmjay.gov.in"
  },
  {
    "id": 6,
    "name": "PM Awas Yojana (PMAY-U / Gramin) Housing Credit Subsidy",
    "category": "Housing",
    "description": "Financial subsidy and interest subvention for construction or purchase of pucca residential houses.",
    "keywords": ["house", "housing", "rent", "home", "loan", "subsidy", "construction", "flat", "pmay", "pukka"],
    "why_it_helps": "Assists homeless families and EWS/LIG households with direct financial grants up to ₹2.67 Lakhs for building or buying a safe permanent home.",
    "eligibility": [
      "Beneficiary family must not own a pucca house anywhere in India",
      "EWS / LIG household income criteria (up to ₹3 Lakh for EWS, ₹6 Lakh for LIG)"
    ],
    "documents": [
      "Aadhaar Card of all family members",
      "Proof of land ownership / plot allotment or property purchase agreement",
      "Bank Account details & Income Certificate"
    ],
    "steps": [
      "Verify PMAY eligibility guidelines on official portal",
      "Apply online via PMAY portal or through local Common Service Centre (CSC)",
      "Submit property papers and Aadhaar linked bank details",
      "Municipal/Panchayat geotagging inspection of construction site",
      "Subsidy amount released directly in installments to bank account"
    ],
    "location": "Urban & Rural All States",
    "official_url": "https://pmaymis.gov.in"
  }
]

class Command(BaseCommand):
    help = 'Seeds database with initial SAHAY Categories and Services'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding categories...")
        cat_map = {}
        for cat_data in CATEGORIES_SEED:
            cat, created = Category.objects.get_or_create(
                name=cat_data["name"],
                defaults={
                    "icon": cat_data["icon"],
                    "description": cat_data["description"],
                    "count": cat_data["count"]
                }
            )
            cat_map[cat_data["name"]] = cat
            status = "Created" if created else "Already Exists"
            self.stdout.write(f"  Category '{cat.name}': {status}")

        self.stdout.write("Seeding services...")
        for s_data in SERVICES_SEED:
            cat_obj = cat_map.get(s_data["category"])
            if not cat_obj:
                cat_obj, _ = Category.objects.get_or_create(name=s_data["category"], defaults={"icon": "bi-grid", "description": f"{s_data['category']} support."})
                cat_map[s_data["category"]] = cat_obj

            service, created = Service.objects.get_or_create(
                name=s_data["name"],
                defaults={
                    "category": cat_obj,
                    "description": s_data["description"],
                    "keywords": s_data.get("keywords", []),
                    "why_it_helps": s_data.get("why_it_helps", ""),
                    "eligibility": s_data.get("eligibility", []),
                    "documents": s_data.get("documents", []),
                    "steps": s_data.get("steps", []),
                    "location": s_data.get("location", "Pan-India"),
                    "official_url": s_data.get("official_url", "")
                }
            )
            status = "Created" if created else "Already Exists"
            self.stdout.write(f"  Service '{service.name}': {status}")

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
