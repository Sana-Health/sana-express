let nav_menu_icon = document.querySelector('#navbar-menu-btn');

nav_menu_icon.addEventListener('click', () => {
    toggle('#navbar-menu-open-icon', '#navbar-menu-close-icon')
});

function togglePassword(button) {
    const password_input = document.querySelector('#password');
    const password_toggle_icon = document.querySelector('.password-toggle > i');
    if (password_input.type === 'password') {
        password_input.type = 'text';
        password_toggle_icon.classList.remove('fa-eye');
        password_toggle_icon.classList.add('fa-eye-slash');
    } else {
        password_input.type = 'password';
        password_toggle_icon.classList.remove('fa-eye-slash');
        password_toggle_icon.classList.add('fa-eye');
    }
}

function toggle(...selectors) {
    for (const selector of selectors) {
        document.querySelector(selector).classList.toggle('d-none');
    }
}

function activeGroup(selector) {

    let elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
        elem.addEventListener('click', () => {
            elements.forEach(el => el.classList.remove('active'));
            elem.classList.add('active');
        });
    });

}