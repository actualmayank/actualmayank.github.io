
const toggleBtn = document.querySelector('.toggle-btn');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
}
