(function () {

    const ErrorForm = window.ErrorForm;

    class RegistrationForm {
        constructor(formEl) {
            this.loginForm = formEl.querySelector('.loginLabel .loginInput');
            this.passwordForm = formEl.querySelector('.passwordLabel .password');
            this.emailForm = formEl.querySelector('.emailLabel .email');

            this.validateLoginBind = this.validateLogin.bind(this);
            this.validatePasswordBind =  this.validatePassword.bind(this);
            this.validateEmailBind = this.validateEmail.bind(this);

            this.loginForm.addEventListener('keyup', this.validateLoginBind);
            this.passwordForm.addEventListener('keyup', this.validatePasswordBind);
            this.emailForm.addEventListener('keyup', this.validateEmailBind);

            this.login = false;
            this.password = false;
            this.email = false;
        }

        validateEmail(evt) {
            if (!isEmail(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'This is not email');
                this.email = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.email = true;
            }
            if (!evt.currentTarget.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.email = false;
            }
        }

        validateLogin(evt) {
            if (validateLength(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'Login must contain at list 4 symbols');
                this.login = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.login = true;
            }
            if (!evt.currentTarget.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.login = false;
            }
        }

        validatePassword(evt) {
            if (validateLength(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'Password must contain at list 4 symbols');
                this.password = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.password = true;
            }
            if (!evt.target.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.password = false;
            }
        }

        getError() {
            return !this.password || !this.login || !this.email;
        }


        prepare() {
            return this.getError() ? false : {'login': this.loginForm.value, 'email': this.emailForm.value, 'password': this.passwordForm.value};
        }

        removeListeners() {
            ErrorForm.removeError(this.passwordForm);
            ErrorForm.removeError(this.emailForm);
            ErrorForm.removeError(this.loginForm);
            this.loginForm.removeEventListener('keyup', this.validateLoginBind);
            this.passwordForm.removeEventListener('keyup', this.validatePasswordBind);
            this.emailForm.removeEventListener('keyup', this.validateEmailBind);
        }
    }
    window.RegistrationForm = RegistrationForm;
})();