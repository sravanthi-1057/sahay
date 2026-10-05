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
      <div class="sahaya-card sahay-card-interactive w-100 d-flex flex-column justify-content-between p-4" style="background-color: var(--bg-card); border: 1px solid var(--border-subtle);">
        <div>
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="badge badge-sahaya-gold" style="font-size: 0.75rem;">${escapeHtml(service.category)}</span>
          </div>

          <h3 class="h5 font-weight-bold mb-2" style="font-weight: 800 !important;">
            <a href="service-details.html?id=${service.id}" class="text-decoration-none text-dark">${escapeHtml(service.name)}</a>
          </h3>

          <p class="small text-muted font-weight-bold mb-3 d-flex align-items-center gap-1" style="font-size: 0.8rem;">
            <i class="bi bi-geo-alt text-orange"></i> ${escapeHtml(service.location)}
          </p>

          <p class="small text-dark mb-3" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5; color: #3A2D1D !important; font-size: 0.88rem;">
            ${escapeHtml(service.description)}
          </p>
        </div>

        <div>
          <div class="d-flex gap-2 pt-3 border-top" style="border-color: var(--border-subtle) !important;">
            <a href="service-details.html?id=${service.id}" class="btn btn-sahaya-primary btn-sm flex-fill font-weight-bold text-center">
              View Details <i class="bi bi-arrow-right ms-1"></i>
            </a>
            <button onclick="event.preventDefault(); toggleSaveService(${service.id}); location.reload();" class="btn btn-sahaya-outline btn-sm font-weight-bold" title="${isSaved ? 'Saved' : 'Save Service'}">
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
