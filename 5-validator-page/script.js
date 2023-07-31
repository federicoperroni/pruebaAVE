const passwordInput = document.getElementById("password")

function validatePassword() {
    const password = passwordInput.value
    const conditions = {
        length: isMinimumLengthValid(password),
        letters: hasLowerAndUpperCaseChars(password),
        repeatLetters: hasNoConsecutiveRepeatedChars(password),
        numbers: hasMinimumNumbers(password),
        repeatNumbers: hasNoConsecutiveRepeatedNumbers(password),
        specialChars: hasSpecialChars(password),
        zero: hasNoZero(password),
        spaces: hasNoSpaces(password),
    }

    const conditionsList = Object.keys(conditions)

    if (password.length > 0) {
        conditionsList.forEach((condition) => {
            const conditionElement = document.getElementById(condition)
            if (conditions[condition]) {
                conditionElement.style.color = "green"
            } else {
                conditionElement.style.color = "red"
            }
        });
    }
    else {
        conditionsList.forEach((condition) => {
            const conditionElement = document.getElementById(condition)
            conditionElement.style.color = ""
        })
    }

    passwordInput.addEventListener('input', validatePassword)

}

function isMinimumLengthValid(password) {
    return password.length >= 16
}

function hasLowerAndUpperCaseChars(password) {
    return /[a-z]/.test(password) && /[A-Z]/.test(password)
}

function hasNoConsecutiveRepeatedChars(password) {
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1] && /[a-zA-Z]/.test(password[i])) {
            return false
        }
    }
    return true
}

function hasMinimumNumbers(password) {
    return (password.match(/[0-9]/g) || []).length >= 4
}

function hasNoConsecutiveRepeatedNumbers(password) {
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1] && /[0-9]/.test(password[i])) {
            return false
        }
    }
    return true
}

function hasSpecialChars(password) {
    const specialChars = '!@#$%^&*-_+=?'
    let count = 0

    for (let char of password) {
        if (specialChars.includes(char)) {
            count++
        }
    }

    return count >= 2
}

function uniqueSpecialChars(password) {
    return /^(?:(?!(\!|\@|\#|\$|\%|\ˆ|\&|\*|\-|\_|\+|\=|\?)).)*$/.test(password)
}

function hasNoZero(password) {
    return !password.includes('0')
}

function hasNoSpaces(password) {
    return !password.includes(' ')
}

function hasConsecutiveRepeatedChars(password, charSet) {
    for (let i = 0; i < password.length - 1; i++) {
        if (charSet.includes(password[i]) && charSet.includes(password[i + 1])) {
            return true
        }
    }
    return false
}