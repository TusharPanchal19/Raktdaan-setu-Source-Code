/* blood donation eligibility checker */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eligibilityForm');
    const resultBox = document.getElementById('resultBox');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const age = parseInt(document.getElementById('age').value);
        const weight = parseInt(document.getElementById('weight').value);
        const lastDonation = parseInt(document.getElementById('lastDonation').value);
        const health = document.getElementById('health').value;

        if (age >= 18 && age <= 65 && weight >= 50 && lastDonation >= 90 && health === 'yes') {
            resultBox.innerHTML = `<div class="alert alert-success fw-bold">🎉 You are eligible to donate blood!</div>`;
        } else {
            resultBox.innerHTML = `<div class="alert alert-danger fw-bold">⚠️ Sorry, you are not eligible to donate blood.</div>`;
        }
    });
});

  


//   footer


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

