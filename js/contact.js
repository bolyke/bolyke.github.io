document.addEventListener('DOMContentLoaded', function () {


    const validation = new window.JustValidate('#contact-form', {
        errorFieldCssClass: 'field-error',
        successFieldCssClass: 'field-success',
        lockForm: false,
        focusInvalidField: false,
        validateBeforeSubmitting: true,
    });

    let codeRules = [
        {
            rule: 'required',
        },
        {
            rule: 'number',
        },
        {
            rule: 'minNumber',
            value: 0,
        },
        {
            rule: 'maxNumber',
            value: 9,
        }
    ];

    validation
        .addField('#email', [
            {
                rule: 'required',
            },
            {
                rule: 'email',
            }
        ])
        .addField('#name', [
            {
                rule: 'required',
            },
            {
                rule: 'maxLength',
                value: 150,
            }
        ])
        .addField('#telegram', [
            {
                rule: 'maxLength',
                value: 150,
            }
        ])
        .addField('#message', [
            {
                rule: 'maxLength',
                value: 500,
            }
        ])
        .onValidate((e) => {
            if (e.fields['#email'].isValid && e.fields['#email'].touched) {
                showConfirmationCode();
            } else if (!e.fields['#email'].isValid) {
                hideConfirmationCode();
            }
        })
    // .onFail((fields) => {

    // })
    // .onSuccess((event) => {

    // })

    // Form steps
    let stepButtons = document.querySelectorAll('.btn-next-step');

    stepButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            let stepItem = button.closest('.form-step.current-step');
            // document.querySelector('#submit-funnel-btn').click();
            const promises = [];
            stepItem.querySelectorAll('input').forEach((field) => {
                let promise = validation.revalidateField(`#${field.id}`)
                promises.push(promise);
            });
            
            Promise.all(promises).then(() => {
                if (!stepItem.querySelector('.just-validate-error-label')) {
                    stepItem.classList.remove('current-step');
                    stepItem.nextElementSibling.classList.add('current-step');
                }
            });
        })
    })

    let skipButton = document.querySelectorAll('.btn-skip-step');
    skipButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            let stepItem = button.closest('.form-step.current-step');
            stepItem.classList.remove('current-step');
            stepItem.nextElementSibling.classList.add('current-step');

            let fields = stepItem.querySelectorAll('input');
            fields.forEach((field) => {
                validation.removeField(`#${field.id}`);
            })
            stepItem.remove();
        })
    })

    // Show/hide Confirmation code element
    function showConfirmationCode() {
        document.querySelector('.btn-send-code').classList.remove('d-none');
        document.querySelector('.btn-send-code').addEventListener('click', (e) => {
            // document.querySelector('#email').setAttribute('disabled', true);
            e.target.previousElementSibling.classList.remove('d-none');
            e.target.classList.add('d-none');
        })
    }

    function hideConfirmationCode() {
        document.querySelector('.btn-send-code').classList.add('d-none');
        document.querySelector('.code-group-wrap').classList.add('d-none');
    }

    // Confirmation code fields
    const codeGroup = document.querySelector('.code-group')
    const codeInputs = codeGroup.querySelectorAll('input')
    const KEYBOARDS = {
        backspace: 8,
        arrowLeft: 37,
        arrowRight: 39,
    }

    function handleInput(e) {
        const input = e.target
        const nextInput = input.nextElementSibling
        if (nextInput && input.value) {
            nextInput.focus()
            if (nextInput.value) {
                nextInput.select()
            }
        }
    }

    function handlePaste(e) {
        e.preventDefault()
        const paste = e.clipboardData.getData('text')
        codeInputs.forEach((input, i) => {
            input.value = paste[i] || ''
        })
    }

    function handleBackspace(e) {
        const input = e.target
        if (input.value) {
            input.value = ''
            return
        }

        input.previousElementSibling.focus()
    }

    function handleArrowLeft(e) {
        const previousInput = e.target.previousElementSibling
        if (!previousInput) return
        previousInput.focus()
    }

    function handleArrowRight(e) {
        const nextInput = e.target.nextElementSibling
        if (!nextInput) return
        nextInput.focus()
    }

    codeGroup.addEventListener('input', handleInput)
    codeInputs[0].addEventListener('paste', handlePaste)

    codeInputs.forEach(input => {
        input.addEventListener('focus', e => {
            setTimeout(() => {
                e.target.select()
            }, 0)
        })

        input.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case KEYBOARDS.backspace:
                    handleBackspace(e)
                    break
                case KEYBOARDS.arrowLeft:
                    handleArrowLeft(e)
                    break
                case KEYBOARDS.arrowRight:
                    handleArrowRight(e)
                    break
                default:
            }
        })
    })

    // Show file name
    let fileInputs = document.querySelectorAll(".file-field input");

    fileInputs.forEach((item) => {
        item.addEventListener("change", function (event) {
            if (this.value) {
                this.nextElementSibling.innerHTML = '<span class="file"><span class="file-name"><i class="ta ta-check"></i><span class="ellipsis">' + this.value.split('.').shift() + '</span>.' + this.value.split('.').pop() + '</span><span class="file-remove"></span></span>';
            } else {
                this.nextElementSibling.innerHTML = '<div class="d-flex align-center justify-center"><i class="ta ta-upload"></i>Upload File</div>';
            }
        })
    });

    // Toggle social media fields
    document.querySelector('.toggle-social-fields').addEventListener('click', () => {
        document.querySelector('.form-social-media').classList.add('show-fields')
    })

});