let darkMode = localStorage.getItem('darkMode')
const darkModeToggle = document.querySelector('#dark-mode-toggle')

function enableDarkMode() {
    document.body.classList.add('darkmode')

    localStorage.setItem('darkMode', 'enabled')
};

function disableDarkMode() {
    document.body.classList.remove('darkmode')

    localStorage.setItem('darkMode', 'disabled')
};

if (darkMode === 'enabled') {
    enableDarkMode()
}

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode')
    if (darkMode !== 'enabled') {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})