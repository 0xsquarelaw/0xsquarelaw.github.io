const $ = s => document.querySelector(s);
const root = document.documentElement;

// Theme toggle (initial theme is set by the inline script in <head>)
$('#theme').onclick = () => {
  const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = t;
  try { localStorage.theme = t; } catch {}
};

// Footer year
$('#y').textContent = new Date().getFullYear();

// Resume: preview in a dialog on desktop browsers that can show PDFs inline.
// Everywhere else (phones, no PDF viewer, ctrl/cmd-click) the link opens the PDF in a new tab.
const dlg = $('#pdf');
$('#resume').onclick = e => {
  if (!navigator.pdfViewerEnabled || !matchMedia('(min-width:700px)').matches ||
      e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const frame = dlg.querySelector('iframe');
  if (!frame.src) frame.src = e.currentTarget.href + '#view=FitH'; // load PDF only on first open
  dlg.showModal();
};

// Click on the dimmed backdrop closes the dialog (Esc and the X button work natively)
dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
