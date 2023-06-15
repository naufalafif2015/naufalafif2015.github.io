document.addEventListener('DOMContentLoaded', function() {
    var toggleCheckbox1 = document.getElementById('1Senin-toggle');
    var imageElement1 = document.getElementById('1Senin');
    var toggleCheckbox2 = document.getElementById('2Selasa-toggle');
    var imageElement2 = document.getElementById('2Selasa');
    var toggleCheckbox3 = document.getElementById('3Rabu-toggle');
    var imageElement3 = document.getElementById('3Rabu');
    var toggleCheckbox4 = document.getElementById('4Kamis-toggle');
    var imageElement4 = document.getElementById('4Kamis');
    var toggleCheckbox5 = document.getElementById('5Jumat-toggle');
    var imageElement5 = document.getElementById('5Jumat');
    var toggleCheckbox6 = document.getElementById('6Sabtu-toggle');
    var imageElement6 = document.getElementById('6Sabtu');
    var toggleCheckbox7 = document.getElementById('7Minggu-toggle');
    var imageElement7 = document.getElementById('7Minggu');

    toggleCheckbox1.addEventListener('change', function() {
    if (toggleCheckbox1.checked) {
        imageElement1.src = 'static/images/img-online/1Senin.png';
        handleInput(inputElement1, 'inputValue1', true);
    } else {
        imageElement1.src = 'static/images/img-offline/1Senin.png';
        handleInput(inputElement1, 'inputValue1', false);
    }
});
    toggleCheckbox2.addEventListener('change', function() {
        if (toggleCheckbox2.checked) {
            imageElement2.src = 'static/images/img-online/2Selasa.png';
        } else {
            imageElement2.src = 'static/images/img-offline/2Selasa.png';
        }
    });
    toggleCheckbox3.addEventListener('change', function() {
        if (toggleCheckbox3.checked) {
            imageElement3.src = 'static/images/img-online/3Rabu.png';
        } else {
            imageElement3.src = 'static/images/img-offline/3Rabu.png';
        }
    });
    toggleCheckbox4.addEventListener('change', function() {
        if (toggleCheckbox4.checked) {
            imageElement4.src = 'static/images/img-online/4Kamis.png';
        } else {
            imageElement4.src = 'static/images/img-offline/4Kamis.png';
        }
    });
    toggleCheckbox5.addEventListener('change', function() {
        if (toggleCheckbox5.checked) {
            imageElement5.src = 'static/images/img-online/5Jumat.png';
        } else {
            imageElement5.src = 'static/images/img-offline/5Jumat.png';
        }
    });
    toggleCheckbox6.addEventListener('change', function() {
        if (toggleCheckbox6.checked) {
            imageElement6.src = 'static/images/img-online/6Sabtu.png';
        } else {
            imageElement6.src = 'static/images/img-offline/6Sabtu.png';
        }
    });
    toggleCheckbox7.addEventListener('change', function() {
        if (toggleCheckbox7.checked) {
            imageElement7.src = 'static/images/img-online/7Minggu.png';
        } else {
            imageElement7.src = 'static/images/img-offline/7Minggu.png';
        }
    });
});

function handleInput(input, outputId) {
    if (input.value === "") {
        input.classList.add("placeholder-on");
        input.value = "";
        showInputValue(input, outputId);
    } else {
        input.classList.remove("placeholder-on");
        showInputValue(input, outputId);
    }
}
function showInputValue(input, outputId) {
    var inputValue = input.value;
    var outputElement = document.getElementById(outputId);
    outputElement.textContent = inputValue;
}

function getDateTime(number) {
    var datetimeInput = document.getElementById('datetimeInput' + number);
    var datetimeValue = datetimeInput.value;

    var datetime = new Date(datetimeValue);
    var dayOfWeek = datetime.toLocaleDateString('id-ID', { weekday: 'long' }).slice(0, 3);
    var numericDate = datetime.getDate();
    var month = datetime.toLocaleDateString('id-ID', { month: 'long' }).slice(0, 3);
    var time = datetime.toLocaleTimeString('id-ID', { hour: 'numeric', minute: 'numeric' });

    var dayOfWeekTextElement = document.getElementById('dayOfWeekText' + number);
    var dayOfWeekNumberElement = document.getElementById('dayOfWeekNumber' + number);
    var monthElement = document.getElementById('month' + number);
    var timeElement = document.getElementById('time' + number);

    dayOfWeekTextElement.textContent = dayOfWeek;
    dayOfWeekNumberElement.textContent = numericDate;
    monthElement.textContent = month;
    timeElement.textContent = time;
}