/**
 * SAHAY Platform — Service Matching Engine & Search Functions
 * Basic keyword & category matching algorithm simulating problem-first service discovery.
 */

/**
 * Matches a user's natural language problem statement against service keywords.
 * @param {string} problemText 
 * @returns {Object} { detectedCategory, matchedServices, assistanceMessage, questions }
 */
function matchServicesByProblem(problemText) {
  const text = (problemText || '').toLowerCase().trim();

  // Keyword Categories Dictionary
  const categoryKeywords = {
    "Education": ["scholarship", "college", "school", "fees", "tuition", "student", "education", "afford", "degree", "study", "exam", "masters", "university"],
    "Civic Services": ["garbage", "waste", "trash", "clean", "road", "pothole", "street light", "drain", "sanitation", "dumping", "dirt", "water"],
    "Employment": ["job", "employment", "unemployed", "work", "career", "salary", "skill", "training", "earn", "vocational", "hiring", "resume"],
    "Healthcare": ["hospital", "doctor", "medicine", "health", "treatment", "insurance", "medical", "bill", "cashless", "surgery", "clinic"],
    "Documentation": ["aadhaar", "passport", "certificate", "document", "income", "caste", "birth certificate", "id", "proof", "tehsildar", "e-district"],
    "Agriculture": ["farm", "farmer", "agriculture", "crop", "seed", "land", "kisan", "fertilizer", "harvest"],
    "Business": ["business", "loan", "shop", "micro", "mudra", "vendor", "money", "capital", "enterprise", "start"],
    "Housing": ["house", "housing", "home", "flat", "subsidy", "pmay", "pucca", "rent", "construction"],
    "NGOs": ["legal", "lawyer", "court", "dispute", "ngo", "advice", "rights", "pro-bono"]
  };

  // Calculate scores per category
  let highestScore = 0;
  let matchedCategory = "Government Services";

  for (const [catName, keywords] of Object.entries(categoryKeywords)) {
    let count = 0;
    keywords.forEach(kw => {
      if (text.includes(kw)) count++;
    });
    if (count > highestScore) {
      highestScore = count;
      matchedCategory = catName;
    }
  }

  // Find matching service items
  let matchedServices = SERVICES_DATA.filter(service => {
    // Direct category match or individual keyword overlap
    if (service.category === matchedCategory) return true;
    return service.keywords.some(kw => text.includes(kw));
  });

  // Fallback if no direct match
  if (matchedServices.length === 0) {
    matchedServices = SERVICES_DATA.slice(0, 4);
  }

  // Dynamic Question Set depending on Category
  let questions = [];
  let assistanceMessage = "We can help you find relevant government schemes, certificates, and assistance for your problem.";

  if (matchedCategory === "Education") {
    assistanceMessage = "We can help you look for education-related financial support. Let's understand your situation a little better.";
    questions = [
      {
        id: 'q_edu_student',
        text: 'Are you currently enrolled as a student?',
        subtitle: 'Helps determine active enrollment eligibility.',
        options: [
          { label: 'Yes, currently studying', value: 'yes' },
          { label: 'No, looking for admission', value: 'no' }
        ]
      },
      {
        id: 'q_edu_level',
        text: 'What level of education are you pursuing?',
        subtitle: 'Scholarships vary by school, college, and postgraduate tracks.',
        options: [
          { label: 'School (Class 1 - 12)', value: 'school' },
          { label: 'Undergraduate (BA, BSc, BTech, etc.)', value: 'undergraduate' },
          { label: 'Postgraduate / Higher Research', value: 'postgraduate' },
          { label: 'Other Vocational / Polytechnic', value: 'other' }
        ]
      },
      {
        id: 'q_edu_type',
        text: 'What kind of assistance do you need most?',
        subtitle: 'Select your primary financial requirement.',
        options: [
          { label: 'Tuition Fee Scholarship / Grant', value: 'scholarship' },
          { label: 'Fee Concession / Reimbursement', value: 'fee_waiver' },
          { label: 'Student Education Loan', value: 'loan' }
        ]
      }
    ];
  } else if (matchedCategory === "Civic Services") {
    assistanceMessage = "We can help connect you with local municipal civic resolution services. Let's gather a few details.";
    questions = [
      {
        id: 'q_civic_nature',
        text: 'What is the primary nature of your civic issue?',
        subtitle: 'Select the main sanitation or infrastructure problem.',
        options: [
          { label: 'Garbage Accumulation & Waste Dumping', value: 'garbage' },
          { label: 'Damaged Road & Potholes', value: 'road' },
          { label: 'Street Light Broken / Dark Area', value: 'lighting' }
        ]
      },
      {
        id: 'q_civic_loc',
        text: 'Where is this issue located?',
        subtitle: 'Helps route to the correct municipal ward officer.',
        options: [
          { label: 'Residential Street / Colony', value: 'residential' },
          { label: 'Commercial Market / Public Facility', value: 'commercial' }
        ]
      },
      {
        id: 'q_civic_urgency',
        text: 'How long has this issue been persisting?',
        subtitle: 'Urgent complaints are prioritized by sanitary inspectors.',
        options: [
          { label: '1 to 2 days', value: 'recent' },
          { label: 'More than a week', value: 'persistent' }
        ]
      }
    ];
  } else {
    questions = [
      {
        id: 'q_gen_status',
        text: 'What is your primary requirement?',
        subtitle: 'Select the outcome that would be most helpful right now.',
        options: [
          { label: 'Financial Assistance / Grant', value: 'grant' },
          { label: 'Official Document / Certificate', value: 'certificate' },
          { label: 'Grievance Resolution', value: 'grievance' }
        ]
      },
      {
        id: 'q_gen_urgency',
        text: 'When do you need this service?',
        subtitle: 'Helps prioritize processing deadlines.',
        options: [
          { label: 'Immediately / Urgent', value: 'urgent' },
          { label: 'Within next 30 days', value: 'normal' }
        ]
      }
    ];
  }

  return {
    detectedCategory: matchedCategory,
    matchedServices: matchedServices,
    assistanceMessage: assistanceMessage,
    questions: questions
  };
}

/**
 * Searches services by keyword, category, or title query.
 */
function searchServices(query = '', categoryFilter = 'all') {
  const q = (query || '').toLowerCase().trim();
  
  return SERVICES_DATA.filter(service => {
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesQuery = !q || 
      service.name.toLowerCase().includes(q) ||
      service.shortDescription.toLowerCase().includes(q) ||
      service.category.toLowerCase().includes(q) ||
      service.keywords.some(kw => kw.includes(q));

    return matchesCategory && matchesQuery;
  });
}

function getServiceById(id) {
  const numId = parseInt(id, 10);
  return SERVICES_DATA.find(s => s.id === numId) || SERVICES_DATA[0];
}

/**
 * LocalStorage saved services manager.
 */
function getSavedServices() {
  try {
    const saved = localStorage.getItem('sahay_saved_ids');
    return saved ? JSON.parse(saved) : [1, 5];
  } catch (e) {
    return [1, 5];
  }
}

function toggleSaveService(serviceId) {
  const saved = getSavedServices();
  const numId = parseInt(serviceId, 10);
  let updated;
  if (saved.includes(numId)) {
    updated = saved.filter(id => id !== numId);
  } else {
    updated = [...saved, numId];
  }
  localStorage.setItem('sahay_saved_ids', JSON.stringify(updated));
  
  // Optionally sync with Django Backend if online
  fetch(`${API_BASE_URL}/saved-services/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service_id: numId })
  }).catch(() => {});

  return updated;
}

/**
 * Django REST API Integration Helpers
 */
const API_BASE_URL = 'http://127.0.0.1:8000/api';

async function fetchCategoriesFromBackend() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Django backend offline, using fallback dataset:', e);
  }
  return CATEGORIES_DATA;
}

async function fetchServicesFromBackend(category = '', search = '') {
  try {
    let url = `${API_BASE_URL}/services/?`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Django backend offline, using local filter:', e);
  }
  return filterServices(category, search);
}

async function queryDiagnosticMatcherBackend(problemText) {
  try {
    const res = await fetch(`${API_BASE_URL}/find-help/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: problemText })
    });
    if (res.ok) {
      const data = await res.json();
      return data.results;
    }
  } catch (e) {
    console.warn('Django diagnostic API offline, using client matcher:', e);
  }
  return null;
}
