import React from 'react'

export default function languageSupport(language) {
    const languageSupports = [
        'pt',
        'en'
    ];
    return languageSupports.includes(language);
}
