/**
 * SAHAY Platform — Service Dataset & Category Definitions
 * Local JavaScript dataset containing 12+ realistic civic, government, educational,
 * healthcare, employment, documentation, agriculture, housing, business, and NGO services.
 */

const CATEGORIES_DATA = [
  {
    id: "Government Services",
    name: "Government Services",
    icon: "bi-building",
    description: "Central & State welfare schemes, subsidies, citizen benefits, and public services.",
    count: 42
  },
  {
    id: "Education",
    name: "Education",
    icon: "bi-mortarboard",
    description: "Scholarships, fee concessions, student loans, skill training, and educational grants.",
    count: 28
  },
  {
    id: "Healthcare",
    name: "Healthcare",
    icon: "bi-heart-pulse",
    description: "Health insurance schemes, hospital coverage, medical relief funds, and wellness programs.",
    count: 19
  },
  {
    id: "Employment",
    name: "Employment",
    icon: "bi-briefcase",
    description: "Job matching, apprenticeship programs, unemployment allowance, and vocational training.",
    count: 24
  },
  {
    id: "Documentation",
    name: "Documentation",
    icon: "bi-file-earmark-text",
    description: "Aadhaar, Voter ID, Ration Card, Income/Caste certificates, passports, and identity proofs.",
    count: 35
  },
  {
    id: "Civic Services",
    name: "Civic Services",
    icon: "bi-geo-alt",
    description: "Garbage disposal, sanitation complaints, street lights, road repairs, and water supply issues.",
    count: 16
  },
  {
    id: "NGOs",
    name: "NGO Support",
    icon: "bi-people",
    description: "Non-profit assistance, shelter homes, legal aid, food security, and community relief.",
    count: 12
  },
  {
    id: "Housing",
    name: "Housing",
    icon: "bi-house-door",
    description: "Affordable housing schemes, home loan subsidies, slum redevelopment, and rental support.",
    count: 14
  },
  {
    id: "Agriculture",
    name: "Agriculture",
    icon: "bi-flower1",
    description: "PM-KISAN crop insurance, seed subsidies, tractor loans, and farmer income support.",
    count: 22
  },
  {
    id: "Business",
    name: "Business & MSME",
    icon: "bi-shop",
    description: "MUDRA micro-loans, startup registration, MSME subsidies, and trade licenses.",
    count: 18
  }
];

const SERVICES_DATA = [
  {
    id: 1,
    name: "National Post-Matric Scholarship Scheme",
    category: "Education",
    description: "Financial assistance covering tuition fees, maintenance allowance, and academic expenses for eligible post-secondary students.",
    keywords: ["scholarship", "college", "school", "fees", "tuition", "student", "education", "afford", "financial support", "degree"],
    whyItHelps: "Provides direct financial grants to students from low-income families so they can pursue higher education without fee burdens.",
    eligibility: [
      "Enrolled in a recognized college, university, or polytechnic institution",
      "Annual family income from all sources under ₹2,50,000",
      "Passed previous qualifying examination with minimum 50% marks",
      "Not receiving concurrent government scholarships"
    ],
    documents: [
      "Aadhaar Card (linked with bank account for Direct Benefit Transfer)",
      "Income Certificate issued by Tehsildar / revenue officer for current financial year",
      "Current academic year College ID Card and fee payment receipt",
      "Self-attested mark sheet of previous class or degree",
      "Bank passbook first page showing account number & IFSC"
    ],
    steps: [
      "Verify eligibility criteria on the official scholarship portal",
      "Gather required identity, income, and academic proof documents",
      "Register on National Scholarship Portal (scholarships.gov.in) using Aadhaar",
      "Fill online application form and course fee breakdown",
      "Upload clear scanned PDF documents",
      "Submit application online and print acknowledgment copy for college nodal officer"
    ],
    location: "All India",
    officialUrl: "https://scholarships.gov.in"
  },
  {
    id: 2,
    name: "Swachh Municipal Door-to-Door Waste Collection & Grievance",
    category: "Civic Services",
    description: "Report local garbage accumulation, request doorstep waste pickup, or log sanitation complaints with quick municipal dispatch.",
    keywords: ["garbage", "waste", "trash", "clean", "road", "pothole", "street light", "drain", "sanitation", "dumping", "dirt"],
    whyItHelps: "Directly connects residents to ward sanitary inspectors for prompt clearing of unattended garbage piles and municipal sanitation issues within 24-48 hours.",
    eligibility: [
      "Resident of registered Municipal Ward or urban local body area",
      "Location falls within local municipal corporation jurisdiction"
    ],
    documents: [
      "Location details (Street name, house number, landmark, or geo-tag)",
      "Photograph of sanitation issue or garbage dump (optional but recommended)"
    ],
    steps: [
      "Identify the exact landmark and ward location of the garbage issue",
      "Capture a photograph of the sanitation site",
      "Access the Swachhata Citizen App or Municipal online portal",
      "Submit complaint under 'Garbage Dumping / Sanitation'",
      "Note down complaint tracking ID for real-time resolution updates",
      "Sanitation inspector dispatches cleaning crew within 24-48 hours"
    ],
    location: "Urban Local Bodies Nationwide",
    officialUrl: "https://swachhbharatmission.gov.in"
  },
  {
    id: 3,
    name: "PM Kaushal Vikas Yojana (PMKVY) Free Skill Training & Job Placement",
    category: "Employment",
    description: "Free industry-relevant skill certification, stipend support, and job placement assistance for unemployed youth.",
    keywords: ["job", "employment", "unemployed", "work", "career", "salary", "skill", "training", "earn", "vocational", "placement"],
    whyItHelps: "Equips unemployed youth with free practical skills in IT, healthcare, retail, electronics, and manufacturing, along with placement support in private companies.",
    eligibility: [
      "Indian citizen aged between 15 and 45 years",
      "Currently unemployed or seeking job skill enhancement",
      "Possesses valid Aadhaar card and active bank account"
    ],
    documents: [
      "Aadhaar Card for biometric registration",
      "Educational qualification certificate (Class 8th / 10th / 12th pass mark sheet)",
      "Recent passport-sized photographs",
      "Bank passbook copy for stipend disbursement"
    ],
    steps: [
      "Explore available skill training courses on Skill India portal",
      "Locate nearest Pradhan Mantri Kaushal Kendra (PMKK) training center",
      "Register online or visit training center in person",
      "Complete 2-3 months of hands-on practical skill classes",
      "Pass assessment by independent Sector Skill Council",
      "Receive government skill certificate and participate in job placement melas"
    ],
    location: "All Districts across India",
    officialUrl: "https://skillindia.gov.in"
  },
  {
    id: 4,
    name: "Issue of Official Revenue Income Certificate",
    category: "Documentation",
    description: "Official income proof issued by Tehsildar required for government scholarships, subsidies, and fee waivers.",
    keywords: ["income", "certificate", "document", "aadhaar", "passport", "proof", "tehsildar", "e-district", "caste", "revenue"],
    whyItHelps: "Certifies family annual household income from all sources, enabling citizens to claim college fee concessions, welfare schemes, and housing subsidies.",
    eligibility: [
      "Resident of the respective State or Union Territory",
      "Self-declaration of income sources (salary, agriculture, small trade)"
    ],
    documents: [
      "Identity Proof (Aadhaar Card, Voter ID, or Passport)",
      "Address Proof (Ration Card, Electricity Bill, or Water Bill)",
      "Income Proof (Salary Slip, IT Return, or Panchayat Sarpanch declaration)",
      "Self-Declaration Affidavit on non-judicial stamp paper"
    ],
    steps: [
      "Collect identity, address, and income proof documents",
      "Log in to State e-District citizen service portal",
      "Fill online application form for Income Certificate",
      "Upload scanned PDF proof documents and pay nominal fee (₹15-₹30)",
      "Revenue Inspector / Talathi verifies details locally",
      "Download digitally signed Income Certificate within 7–14 working days"
    ],
    location: "State e-District Portals Nationwide",
    officialUrl: "https://edistrict.gov.in"
  },
  {
    id: 5,
    name: "Ayushman Bharat PM-JAY Free Health Insurance (Up to ₹5 Lakhs)",
    category: "Healthcare",
    description: "Cashless health coverage up to ₹5 Lakhs per family per year for secondary and tertiary hospital care.",
    keywords: ["hospital", "doctor", "medicine", "health", "treatment", "insurance", "medical", "bill", "cashless", "surgery"],
    whyItHelps: "Eliminates out-of-pocket medical expenses for low-income families by providing cashless treatment at thousands of empaneled government and private hospitals.",
    eligibility: [
      "Families listed under SECC database or holding eligible state ration cards",
      "No restriction on family size, age, or pre-existing diseases"
    ],
    documents: [
      "Aadhaar Card for biometric identity verification",
      "Ration Card or Family ID proving relationship",
      "Active mobile number for OTP confirmation"
    ],
    steps: [
      "Check eligibility online at pmjay.gov.in or call toll-free 14555",
      "Visit Ayushman Mitra helpdesk at any empaneled government/private hospital",
      "Present Aadhaar Card and Ration Card for identity verification",
      "Complete fingerprint or iris scan biometric verification",
      "Receive digital Ayushman Golden Card",
      "Avail cashless hospital admission, treatment, and medicine coverage"
    ],
    location: "Empaneled Hospitals Nationwide",
    officialUrl: "https://pmjay.gov.in"
  },
  {
    id: 6,
    name: "PM-KISAN Farmer Income Support Scheme (₹6,000 / Year)",
    category: "Agriculture",
    description: "Direct annual income transfer of ₹6,000 in three equal installments of ₹2,000 directly into farmer bank accounts.",
    keywords: ["farm", "farmer", "agriculture", "crop", "seed", "land", "kisan", "income", "fertilizer", "tractor"],
    whyItHelps: "Provides timely financial support to landholding farmers to purchase seeds, fertilizers, and agricultural inputs prior to harvesting seasons.",
    eligibility: [
      "Landholding farmer families with cultivable land ownership recorded in land revenue records",
      "Applicant is not an institutional landholder or high-income tax payer"
    ],
    documents: [
      "Land Revenue Record Copy (Khasra / Khatauni / Jamabandi)",
      "Aadhaar Card mandatory linked with bank account",
      "Bank account passbook details with IFSC code"
    ],
    steps: [
      "Ensure cultivable land is registered in applicant name in revenue records",
      "Go to PM-KISAN portal (pmkisan.gov.in) -> 'New Farmer Registration'",
      "Enter Aadhaar number, state, district, and mobile OTP",
      "Fill land survey number, area size, and bank account details",
      "Upload scanned copy of land record paper",
      "Complete Aadhaar e-KYC to activate direct bank transfer installments"
    ],
    location: "All Agricultural Districts",
    officialUrl: "https://pmkisan.gov.in"
  },
  {
    id: 7,
    name: "PM MUDRA Yojana Micro-Business Collateral-Free Loans",
    category: "Business",
    description: "Collateral-free loans up to ₹10 Lakhs for micro-enterprises, small shops, artisans, and street vendors.",
    keywords: ["business", "loan", "shop", "micro", "mudra", "vendor", "money", "capital", "enterprise", "start"],
    whyItHelps: "Facilitates bank credit without demanding collateral security for small shopkeepers, artisans, and individuals starting micro businesses.",
    eligibility: [
      "Non-corporate, non-farm micro or small business enterprise owner",
      "Satisfactory credit track record with no prior bank default"
    ],
    documents: [
      "Identity Proof (Aadhaar Card, Voter ID, or PAN Card)",
      "Address Proof of residence and business establishment",
      "Project Report / Business Plan outlining machinery cost and revenue projection",
      "Last 6 months bank account statement"
    ],
    steps: [
      "Prepare a concise business plan outlining equipment cost and expected profit",
      "Select loan category: Shishu (up to ₹50k), Kishore (₹50k-₹5L), or Tarun (up to ₹10L)",
      "Apply online on Udyami Mitra portal (udyamimitra.in) or visit local bank branch",
      "Submit application form along with business proposal and identity proof",
      "Bank officer conducts credit evaluation without requesting collateral security",
      "Upon sanction, loan amount is disbursed and MUDRA debit card issued"
    ],
    location: "All Commercial & Rural Banks",
    officialUrl: "https://mudra.org.in"
  },
  {
    id: 8,
    name: "PMAY Affordable Housing Credit-Linked Subsidy (PMAY-U)",
    category: "Housing",
    description: "Interest subsidy on home loans and direct financial assistance for constructing or purchasing first pucca house.",
    keywords: ["house", "housing", "home", "flat", "subsidy", "pmay", "pucca", "rent", "loan", "construction"],
    whyItHelps: "Provides interest subsidy up to ₹2.67 Lakhs on housing loans for low and middle-income families buying or building their first home.",
    eligibility: [
      "Beneficiary family must not own a pucca house anywhere in India",
      "Annual family income falls within EWS (<₹3L), LIG (₹3-6L), or MIG (₹6-18L) bands"
    ],
    documents: [
      "Aadhaar Cards of all family members",
      "Income Certificate, Salary Slips, or Form 16",
      "Property Documents, Approved Building Plan, or Allotment Letter",
      "Bank loan sanction letter"
    ],
    steps: [
      "Confirm that no family member owns a permanent pucca house in India",
      "Visit PMAY-U portal (pmaymis.gov.in) -> 'Citizen Assessment'",
      "Provide Aadhaar numbers of head of household and family members",
      "Apply for home loan through participating primary lending institutions",
      "Housing subsidy claim is verified by Central Nodal Agencies (NHB / HUDCO)",
      "Direct interest subsidy is credited into home loan account, reducing monthly EMI"
    ],
    location: "Urban Statutory Towns Nationwide",
    officialUrl: "https://pmaymis.gov.in"
  },
  {
    id: 9,
    name: "Free National Legal Aid & Pro-Bono Citizen Assistance",
    category: "NGOs",
    description: "Free legal representation, lawyer assignment, and dispute consultation for marginalized citizens.",
    keywords: ["legal", "lawyer", "court", "dispute", "ngo", "advice", "help", "rights", "free legal aid", "pro-bono"],
    whyItHelps: "Ensures opportunity for securing justice is not denied to any citizen due to economic or social disabilities.",
    eligibility: [
      "Women, children, SC/ST members, industrial workers, victims of violence",
      "Persons with annual household income under state threshold (approx ₹3 Lakhs)"
    ],
    documents: [
      "Identity Proof (Aadhaar card, Ration card, or Voter ID)",
      "Case related notice, police FIR, agreement, or court summons (if available)"
    ],
    steps: [
      "Summarize the nature of legal concern (civil, tenancy, domestic, labor)",
      "Submit application on NALSA portal (nalsa.gov.in) or visit District Legal Services Authority (DLSA)",
      "Provide applicant details and income background",
      "Legal aid panel evaluates case merit within 48 hours",
      "Pro-bono advocate appointed at zero fee to represent applicant",
      "Advocate handles filings, consultations, and court representation"
    ],
    location: "District Courts & DLSA Clinics Nationwide",
    officialUrl: "https://nalsa.gov.in"
  },
  {
    id: 10,
    name: "Aadhaar Demographic & Address Online Correction Service",
    category: "Documentation",
    description: "Update address, name spelling, or mobile number in your official Aadhaar card online with document proof.",
    keywords: ["aadhaar", "address", "update", "correction", "uidai", "id", "name", "mobile", "identity"],
    whyItHelps: "Allows citizens to update official residence address or demographic details online without waiting in physical center queues.",
    eligibility: [
      "Possesses valid 12-digit Aadhaar number",
      "Mobile number linked with Aadhaar for receiving OTP verification"
    ],
    documents: [
      "Valid Supporting Address Proof (Electricity Bill, Bank Statement, Rent Agreement, Voter ID, or Passport)"
    ],
    steps: [
      "Visit myAadhaar portal (myaadhaar.uidai.gov.in) and log in with Aadhaar & OTP",
      "Select 'Update Aadhaar Online' -> Choose Address field",
      "Type new address details accurately (House number, PIN code, District)",
      "Upload clear scanned PDF/JPEG copy of address proof document",
      "Pay nominal service fee (₹50) via UPI / debit card",
      "Track URN request status and download updated e-Aadhaar within 5-7 days"
    ],
    location: "Online via myAadhaar Portal",
    officialUrl: "https://myaadhaar.uidai.gov.in"
  },
  {
    id: 11,
    name: "National Career Service (NCS) Job Matching & Counseling",
    category: "Employment",
    description: "Government job portal connecting job seekers with verified private sector employers, local job fairs, and career counseling.",
    keywords: ["job", "employment", "career", "interview", "resume", "ncs", "vacancy", "private job", "hiring"],
    whyItHelps: "Free portal listing active job vacancies across sectors with direct employer contacts and district job melas.",
    eligibility: [
      "Any job seeker seeking entry-level, skilled, or professional employment"
    ],
    documents: [
      "Aadhaar Card or PAN Card for profile verification",
      "Educational qualification certificates and resume / CV"
    ],
    steps: [
      "Visit National Career Service portal (ncs.gov.in)",
      "Register as 'Job Seeker' using Aadhaar number",
      "Fill educational background, key skills, and location preferences",
      "Browse active job vacancies filtered by sector and salary",
      "Apply directly to employers or register for upcoming District Job Melas",
      "Receive SMS notifications for interview schedules"
    ],
    location: "All India",
    officialUrl: "https://ncs.gov.in"
  },
  {
    id: 12,
    name: "Central Overseas Scholarship for Higher Studies",
    category: "Education",
    description: "Full financial funding for master's and Ph.D. programs at top international universities for eligible students.",
    keywords: ["scholarship", "abroad", "foreign", "masters", "phd", "university", "education", "degree", "grant"],
    whyItHelps: "Covers international tuition fees, living maintenance allowance, visa charges, and airfare for pursuing higher studies abroad.",
    eligibility: [
      "Admitted to a recognized foreign university in master's or Ph.D. program",
      "Annual family income below prescribed threshold (under ₹8 Lakhs)",
      "Minimum 60% marks in qualifying degree"
    ],
    documents: [
      "Unconditional Admission Letter from foreign university",
      "Income Certificate from competent authority",
      "Degree Mark Sheets and Passport copy",
      "Equivalence certificate and statement of purpose"
    ],
    steps: [
      "Secure admission offer letter from a top foreign university",
      "Check Ministry application notification on official portal",
      "Fill online application form attaching academic transcripts and income proof",
      "Shortlisted candidates called for committee interview",
      "Selection letter issued and fund sanction granted directly to university"
    ],
    location: "Selected Top Foreign Universities",
    officialUrl: "https://nosmsje.gov.in"
  }
];
