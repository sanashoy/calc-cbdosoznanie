let form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    console.log('валидация')
    if (form.checkValidity()) {
        calculate();
    }
    else {
        form.classList.add('was-validated');
    }
    event.preventDefault();
    event.stopPropagation();
  }, true)


window.onload = () => {
    document.getElementById("age").onkeydown = inputOnlyDigits;
    document.getElementById("age").oninput = validateAge;
    document.getElementById("weight").onkeydown = inputOnlyDigits;
    document.getElementById("weight").oninput = validateWeight;
};

function inputOnlyDigits(event){
    if(isNaN(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
}

function validateAge() {
    let input = document.getElementById("age");
    if (input.value > 200) input.setCustomValidity("None");
    else input.setCustomValidity("");
}

function validateWeight() {
    let input = document.getElementById("weight");
    if (input.value > 500) input.setCustomValidity("None");
    else input.setCustomValidity("");
}

function calculate() {
    let age_input = Number(document.getElementById('age').value);
    let weight_input = Number(document.getElementById('weight').value);
    let issue_input = Number(document.getElementById('issue-input').value);
    let dose_input = Number(document.getElementById('dose-input').value);
    let expirience_input = Number(document.getElementById('expirience').value);

    let age_k, w_k, base, e_k, issue_number, dosing;

    if (issue_input == 0) issue_number = getMaxIssue();
    else issue_number = issue_input;
    if (issue_number >= 23) base = 150;
    else if (issue_number >= 11) base = 62.5;
    else if (issue_number < 11) base = 40;

    if (weight_input < 70) w_k = 0.9;
    else if (70 <= weight_input && weight_input <= 74) w_k = 1;
    else if (75 <= weight_input && weight_input <= 84) w_k = 1.1;
    else if (85 <= weight_input && weight_input <= 94) w_k = 1.2;
    else if (95 <= weight_input && weight_input <= 120) w_k = 1.3;
    else if (weight_input > 120) w_k = 1.5;

    if (age_input < 2) age_k = 0.2;
    else if (2 <= age_input && age_input <= 5) age_k = 0.3;
    else if (6 <= age_input && age_input <= 13) age_k = 0.4;
    else if (14 <= age_input && age_input <= 19) age_k = 0.5;
    else if (20 <= age_input && age_input <= 50) age_k = 0.9;
    else if (age_input > 50) age_k = 1;

    if (expirience_input == 1) e_k = 0.8;
    else if (expirience_input == 2) e_k = 1;
    else if (expirience_input == 3) e_k = 1.5;

    if (dose_input == 1) dosing = 2;
    else if (dose_input == 2) dosing = 4;
    else if (dose_input == 3) dosing = 8;
    else if (dose_input == 4) dosing = 12;
    else if (dose_input == 5) dosing = 16;

    let dose = Math.ceil(base * age_k * w_k * e_k);
    let amount = Math.ceil(dose / dosing);

    let dose_element = document.getElementById('dose');
    dose_element.innerHTML = dose;
    let amount_element = document.getElementById('amount');
    amount_element.innerHTML = amount;

    let result = document.getElementById('result');
    result.removeAttribute('hidden');
    document.getElementById('result').scrollIntoView();
}

function getMaxIssue() {
    let maxValue = 0;
    let all_issues_elements = document.querySelectorAll('input[id^=issue-]:checked').values().toArray();
    all_issues_elements.forEach((element) => {
        if (element.value > maxValue) maxValue = element.value
    });
    return maxValue;
}

function fillIssuesInput() {
    let modalElement = document.getElementById('issues-modal');
    let input = document.getElementById('issue-input');
    let selectedinputs = modalElement.querySelectorAll('.form-check-input:checked');
    if (selectedinputs.length == 0) {
        alert("Выберите хотя бы один недуг");
        return;
    }
    else if (selectedinputs.length == 1) {
        let targetValue = selectedinputs[0].value;
        input.value = targetValue;
    }
    else {
        input.value = "0";
    }

    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}
