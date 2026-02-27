export const themesColors = {
    default: 'has-background-info-light',
    morning: 'has-background-warning-light',
    afternoon: 'has-background-danger-dark',
    evening: 'has-background-link-dark',
    birthday: 'has-background-danger-light',
    anniversary: 'has-background-link-light',
    holiday: 'has-background-success-light',
    christmas: 'has-background-danger',
    holyweek: 'has-background-grey',
}

function applyTheme(themeKey) {
    const body = document.body;

    body.className = ''; // Clear all classes
    // Add new theme class
    const newThemeClass = themesColors[themeKey] || themesColors['default'];
    body.classList.add(newThemeClass);
}

export default applyTheme;