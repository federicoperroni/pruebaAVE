function isMinimumLengthValid(password) {
    return password.length >= 16;
}

function hasLowerAndUpperCaseChars(password) {
    return /[a-z]/.test(password) && /[A-Z]/.test(password);
}

function hasNoConsecutiveRepeatedChars(password) {
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1] && /[a-zA-Z]/.test(password[i])) {
            return false;
        }
    }
    return true;
}

function hasMinimumNumbers(password) {
    return (password.match(/[0-9]/g) || []).length >= 4;
}

function hasNoConsecutiveRepeatedNumbers(password) {
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1] && /[0-9]/.test(password[i])) {
            return false;
        }
    }
    return true;
}

function hasSpecialChars(password) {
    const specialChars = '!@#$%^&*-_+=?';
    let count = 0;

    for (let char of password) {
        if (specialChars.includes(char)) {
            count++;
        }
    }

    return count >= 2 && !hasConsecutiveRepeatedChars(password, specialChars);
}

function hasNoZero(password) {
    return !password.includes('0');
}

function hasNoSpaces(password) {
    return !password.includes(' ');
}

function hasConsecutiveRepeatedChars(password, charSet) {
    for (let i = 0; i < password.length - 1; i++) {
        if (charSet.includes(password[i]) && charSet.includes(password[i + 1])) {
            return true;
        }
    }
    return false;
}

function isSecurePassword(password) {
    return (
        isMinimumLengthValid(password) &&
        hasLowerAndUpperCaseChars(password) &&
        hasNoConsecutiveRepeatedChars(password) &&
        hasMinimumNumbers(password) &&
        hasNoConsecutiveRepeatedNumbers(password) &&
        hasSpecialChars(password) &&
        hasNoZero(password) &&
        hasNoSpaces(password)
    );
}

function generateRandomPassword(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_+=?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

console.log('Generando 10 contraseñas random')
for (let index = 0; index < 10; index++) {
    let password = generateRandomPassword(16);
    console.log(password, ' es contraseña válida? ', isSecurePassword(password));
}