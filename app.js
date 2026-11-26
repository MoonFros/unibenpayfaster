const form = document.querySelector('#payment-form');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

function formatNaira(value) {
  const amount = Number(String(value).replace(/[^\d.]/g, ''));
  if (!Number.isFinite(amount)) return '₦0.00';
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function syncPreview() {
  const get = id => document.getElementById(id);
  get('destination-category').textContent = get('category').value;
  get('destination-amount').textContent = formatNaira(get('amount').value);
  get('receipt-name').textContent = get('fullName').value.trim() || 'Sample Student';
  get('receipt-matric').textContent = get('matric').value.trim() || 'Not provided';
  get('receipt-phone').textContent = get('phone').value.trim() || 'Not provided';
  get('receipt-faculty').textContent = get('faculty').value;
  get('receipt-department').textContent = get('department').value;
  get('receipt-description').textContent = get('description').value.trim() || get('category').value;
  get('receipt-amount').textContent = formatNaira(get('amount').value);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  syncPreview();
  document.getElementById('destination').scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('Preview updated — no payment has been made.');
});

['fullName', 'phone', 'matric', 'faculty', 'department', 'category', 'amount', 'description'].forEach(id => {
  document.getElementById(id).addEventListener('input', syncPreview);
  document.getElementById(id).addEventListener('change', syncPreview);
});

document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => document.getElementById(button.dataset.scroll).scrollIntoView({ behavior: 'smooth' }));
});

document.getElementById('copy-account').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('0001234567');
    showToast('Fictional sample number copied. Do not use for a transfer.');
  } catch {
    showToast('Sample account: 000 123 4567 — fictional only.');
  }
});

document.getElementById('print-receipt').addEventListener('click', () => window.print());

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

syncPreview();
