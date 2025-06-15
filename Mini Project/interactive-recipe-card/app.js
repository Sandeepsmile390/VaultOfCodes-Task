document.addEventListener('DOMContentLoaded', () => {
    const PREP_TIME_SECONDS = 45 * 60;

    let timerInterval = null;
    let timeLeft = PREP_TIME_SECONDS;
    let currentStep = -1;

    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start-cooking-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const stepsList = document.getElementById('steps-list');
    const steps = Array.from(stepsList.children);
    const progressBar = document.getElementById('progress-bar');

    const ingredientsBtn = document.getElementById('toggle-ingredients-btn');
    const ingredientsList = document.getElementById('ingredients-list');
    const stepsBtn = document.getElementById('toggle-steps-btn');

    // Toggle Ingredients
    ingredientsBtn.addEventListener('click', () => {
        ingredientsList.classList.toggle('visible');
        ingredientsBtn.textContent = ingredientsList.classList.contains('visible') ? 'Hide Ingredients' : 'Show Ingredients';
    });

    // Toggle Steps
    stepsBtn.addEventListener('click', () => {
        stepsList.classList.toggle('visible');
        stepsBtn.textContent = stepsList.classList.contains('visible') ? 'Hide Steps' : 'Show Steps';
    });

    // Timer Functions
    function formatTime(secs) {
        const m = String(Math.floor(secs / 60)).padStart(2, '0');
        const s = String(secs % 60).padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = `Time left: ${formatTime(timeLeft)}`;
    }

    function startTimer() {
        timeLeft = PREP_TIME_SECONDS;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "Time's up!";
            }
        }, 1000);
    }

    // Cooking Steps Logic
    function highlightStep(idx) {
        steps.forEach((li, i) => {
            li.classList.toggle('active', i === idx);
        });
        // Progress bar
        const percent = ((idx + 1) / steps.length) * 100;
        progressBar.style.width = `${percent}%`;
    }

    function resetSteps() {
        steps.forEach(li => li.classList.remove('active'));
        progressBar.style.width = '0%';
        currentStep = -1;
        nextBtn.disabled = false;
    }

    // Start Cooking
    startBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        startTimer();
        stepsList.classList.add('visible');
        stepsBtn.textContent = 'Hide Steps';
        resetSteps();
        currentStep = 0;
        highlightStep(currentStep);
        nextBtn.disabled = false;
    });

    // Next Step
    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            highlightStep(currentStep);
            if (currentStep === steps.length - 1) {
                nextBtn.disabled = true;
            }
        }
    });

    // Initialize
    updateTimerDisplay();
    resetSteps();
    ingredientsBtn.textContent = 'Show Ingredients';
    stepsBtn.textContent = 'Show Steps';
});