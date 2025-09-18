const passwordInput = document.getElementById('password-input');
const toggleVisibilityBtn = document.getElementById('toggle-visibility');
const eyeOpenIcon = document.getElementById('eye-open');
const eyeClosedIcon = document.getElementById('eye-closed');
const strengthText = document.getElementById('strength-text');
const strengthBarFill = document.getElementById('strength-bar-fill');
const criteriaList = document.getElementById('criteria-list');
const lengthCheck = document.getElementById('length-check');
const uppercaseCheck = document.getElementById('uppercase-check');
const lowercaseCheck = document.getElementById('lowercase-check');
const numberCheck = document.getElementById('number-check');
const specialCheck = document.getElementById('special-check');
const hashedOutput = document.getElementById('hashed-output');
const copyButton = document.getElementById('copy-button');
const copyIcon = document.getElementById('copy-icon');
const copyText = document.getElementById('copy-text');

// Strength levels configuration
const strengthLevels = {
    0: { text: "Very Weak", color: "bg-red-600" },
    1: { text: "Very Weak", color: "bg-red-600" },
    2: { text: "Weak", color: "bg-orange-500" },
    3: { text: "Moderate", color: "bg-yellow-500" },
    4: { text: "Strong", color: "bg-lime-500" },
    5: { text: "Very Strong", color: "bg-green-500" },
};

// Icon templates for checklist
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
const crossIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

// --- Event Listeners ---

passwordInput.addEventListener('input', handleInput);

toggleVisibilityBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeOpenIcon.classList.toggle('hidden', isPassword);
    eyeClosedIcon.classList.toggle('hidden', !isPassword);
});

copyButton.addEventListener('click', () => {
    if (hashedOutput.value) {
        // Using modern clipboard API
        navigator.clipboard.writeText(hashedOutput.value).then(() => {
            copyIcon.classList.add('hidden');
            copyText.classList.remove('hidden');
            setTimeout(() => {
                copyIcon.classList.remove('hidden');
                copyText.classList.add('hidden');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            try {
                hashedOutput.select();
                document.execCommand('copy');
                // Visual feedback for fallback
            } catch (e) {
                 console.error('Fallback copy failed: ', e);
            }
        });
    }
});

// --- Core Functions ---

async function handleInput() {
    const password = passwordInput.value;
    
    // If input is empty, reset everything
    if (!password) {
        resetUI();
        return;
    }

    // 1. Check strength
    const strengthResult = checkPasswordStrength(password);
    updateStrengthUI(strengthResult);

    // 2. Hash password
    const hashedPassword = await hashPassword(password);
    hashedOutput.value = hashedPassword;
}

function checkPasswordStrength(password) {
    let score = 0;
    const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[\W_]/.test(password),
    };

    if (criteria.length) score++;
    if (criteria.uppercase) score++;
    if (criteria.lowercase) score++;
    if (criteria.number) score++;
    if (criteria.special) score++;
    
    return { score, criteria };
}

async function hashPassword(password) {
    try {
        // Encode password as UTF-8
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        // Hash the data using SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        // Convert ArrayBuffer to Array of bytes
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        // Convert bytes to hex string
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    } catch (error) {
        console.error('Hashing failed:', error);
        return 'Error hashing password';
    }
}

// --- UI Update Functions ---

function updateStrengthUI({ score, criteria }) {
    // Update bar and text
    const level = strengthLevels[score];
    strengthText.textContent = level.text;
    strengthBarFill.className = `h-2 rounded-full ${level.color}`;
    strengthBarFill.style.width = `${(score / 5) * 100}%`;

    // Update criteria checklist
    updateCriteriaItem(lengthCheck, criteria.length, "At least 8 characters long");
    updateCriteriaItem(uppercaseCheck, criteria.uppercase, "Contains an uppercase letter (A-Z)");
    updateCriteriaItem(lowercaseCheck, criteria.lowercase, "Contains a lowercase letter (a-z)");
    updateCriteriaItem(numberCheck, criteria.number, "Contains a number (0-9)");
    updateCriteriaItem(specialCheck, criteria.special, "Contains a special character (!@#$)");
}

function updateCriteriaItem(element, isMet, text) {
    element.innerHTML = `${isMet ? checkIcon : crossIcon} ${text}`;
    element.className = `flex items-center transition-colors duration-300 ${isMet ? 'text-gray-200' : 'text-gray-400'}`;
}

function resetUI() {
    strengthText.textContent = "";
    strengthBarFill.style.width = '0%';
    strengthBarFill.className = 'h-2 rounded-full';
    hashedOutput.value = "";
    
    updateCriteriaItem(lengthCheck, false, "At least 8 characters long");
    updateCriteriaItem(uppercaseCheck, false, "Contains an uppercase letter (A-Z)");
    updateCriteriaItem(lowercaseCheck, false, "Contains a lowercase letter (a-z)");
    updateCriteriaItem(numberCheck, false, "Contains a number (0-9)");
    updateCriteriaItem(specialCheck, false, "Contains a special character (!@#$)");
}

// Initialize UI on load
document.addEventListener('DOMContentLoaded', resetUI);
