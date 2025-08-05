export const ErrorMessages = {
    INVALID_UUID_FORMAT: () => 'Invalid UUID format.',
    NOT_FOUND: (type: NotFoundTypes) => `${type} not found.`,
    CPF_OR_EMAIL_ALREADY_IN_USE: () => 'Cpf or Email already in use.',
    DOCUMENT_OR_EMAIL_ALREADY_IN_USE: () => 'Document or Email already in use.',
    INCORRECT_CREDENTIALS: () => 'Invalid credentials.'
}

export const enum NotFoundTypes {
    USER = 'User',
    CLIENT = 'Client',
    CONTACT = 'Contact',
    ADDRESS = 'Address'
}