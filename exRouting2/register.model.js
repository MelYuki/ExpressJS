const RegisterModel = {
    register: (data) => {
        // destructuring
        const {email, hashedPassword, username, age} = data
        return `User informations:
        ${email},
        ${hashedPassword},
        ${username},
        ${age}`
    }
}

module.exports = RegisterModel
