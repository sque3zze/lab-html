window.addEventListener('load', function () {
    const passwordInput = document.getElementsByName('password')[0];
    const submitButton = document.getElementById('formSubmitBtn');
    const emailInput = document.getElementById('email');
    const showPasswordBtn = document.getElementById('showPassword');

    function validationStyle(condition, element) {
        if (condition) {
            element.style.borderColor = 'green';
        } else {
            element.style.borderColor = 'red';
        }
    }

    function passwordValidate(password) {
        const regex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;
        validationStyle(regex.test(password.value), password);
        return regex.test(password.value);
    }

    function emailValidate(email) {
        const regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
        validationStyle(regex.test(email.value), email);
        return regex.test(email.value);
    }

    function checkInputs() {
        const isEmailValid = emailValidate(emailInput);
        const isPasswordValid = passwordValidate(passwordInput);

        if (isEmailValid && isPasswordValid) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'true');
        }
    }

    function showPassword() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }

    passwordInput.addEventListener('change', checkInputs);
    emailInput.addEventListener('change', checkInputs);
    showPasswordBtn.addEventListener('click', showPassword);

    submitButton.addEventListener('click', function () {
        window.location.href = 'https://rkn.gov.ru/treatments/ask-question/';
    });
});
