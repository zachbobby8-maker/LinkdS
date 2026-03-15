document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  let toastTimeout;

  const showToast = () => {
    toast.classList.remove('-translate-y-24');
    toast.classList.add('translate-y-0');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('translate-y-0');
      toast.classList.add('-translate-y-24');
    }, 3000);
  };

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast();
      } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast();
        } catch (e) {
          console.error('Fallback copy failed', e);
        }
        document.body.removeChild(textarea);
      }
    });
  });
});
