/**
 * SAHAY Platform — UI Event Handlers & Page Controller
 * Controls problem input, multi-step diagnostic questions, search filters,
 * service details, action plans, and local storage state.
 */

// Helper to sanitize HTML text
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Global UI Navigation Helpers
function populateProblemInput(text) {
  const input = document.getElementById('problemInputArea') || document.getElementById('homeProblemTextarea') || document.getElementById('findHelpTextarea');
  if (input) {
    input.value = text;
    input.focus();
    window.scrollTo({ top: input.offsetTop - 100, behavior: 'smooth' });
  } else {
    sessionStorage.setItem('sahay_problem_input', text);
    window.location.href = 'find-help.html';
  }
}

function handleProblemSubmit(event) {
  event.preventDefault();
  const inputArea = document.getElementById('problemInputArea') || document.getElementById('homeProblemTextarea') || document.getElementById('findHelpTextarea');
  const text = inputArea ? inputArea.value.trim() : '';

  if (!text) {
    alert('Please describe your problem or select an example statement.');
    return;
  }

  sessionStorage.setItem('sahay_problem_input', text);
  window.location.href = 'find-help.html';
}

// Render Service Card HTML
function renderServiceCardHTML(service) {
  const savedIds = getSavedServices();
  const isSaved = savedIds.includes(service.id);

  return `
    <div class="col-md-6 col-lg-4 d-flex">
      <div class="sahay-card sahay-card-interactive w-100 d-flex flex-column justify-content-between">
        <div>
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="badge-sahay-orange">${escapeHtml(service.category)}</span>
            <span class="badge-sahay-gold d-flex align-items-center gap-1">
              <i class="bi bi-check-circle-fill text-warning"></i> You may be eligible
            </span>
          </div>

          <h3 class="h5 font-weight-bold mb-2">
            <a href="service-details.html?id=${service.id}" class="text-decoration-none text-dark">${escapeHtml(service.name)}</a>
          </h3>

          <p class="small text-muted font-weight-bold mb-3 d-flex align-items-center gap-1">
            <i class="bi bi-geo-alt text-warning"></i> ${escapeHtml(service.location)}
          </p>

          <p class="small text-dark opacity-75 mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
            ${escapeHtml(service.description)}
          </p>

          <div class="p-2 rounded bg-light border mb-3 small text-muted font-weight-semibold">
            <strong class="text-dark">Why it may help:</strong> ${escapeHtml(service.whyItHelps)}
          </div>
        </div>

        <div>
          <div class="d-flex gap-2 pt-2 border-top">
            <a href="service-details.html?id=${service.id}" class="btn btn-sahay-primary btn-sm flex-fill font-weight-bold text-center">
              View Details <i class="bi bi-arrow-right"></i>
            </a>
            <button onclick="event.preventDefault(); toggleSaveService(${service.id}); location.reload();" class="btn btn-sahay-outline btn-sm font-weight-bold" title="${isSaved ? 'Saved' : 'Save Service'}">
              <i class="bi bi-bookmark${isSaved ? '-fill text-warning' : ''}"></i> ${isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Category Card HTML
function renderCategoryCardHTML(cat) {
  return `
    <div class="col-6 col-md-4 col-lg-2-4 d-flex">
      <div onclick="window.location.href='services.html?category=${encodeURIComponent(cat.name)}';" class="sahay-card sahay-card-interactive w-100 d-flex flex-column justify-content-between text-center p-3">
        <div>
          <div class="mx-auto mb-3 rounded-3 border d-flex align-items-center justify-content-center" style="width: 3.25rem; height: 3.25rem; color: var(--brand-primary); background-color: #F8F0E0;">
            <i class="bi ${cat.icon} fs-4"></i>
          </div>
          <h4 class="h5 fw-bolder text-dark mb-1" style="font-weight: 800 !important;">${escapeHtml(cat.name)}</h4>
          <p class="small text-muted mb-0" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.75rem;">
            ${escapeHtml(cat.description)}
          </p>
        </div>
        <div class="mt-3 pt-2 border-top text-orange font-weight-bold small d-flex align-items-center justify-content-between">
          <span>${cat.count}+ services</span>
          <i class="bi bi-arrow-right"></i>
        </div>
      </div>
    </div>
  `;
}
