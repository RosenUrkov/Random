createButton = function createButton(buttonId) {
    var button = document.createElement('button');
    button.innerHTML = 'Click';
    button.onclick = function () {
        button.parentElement.innerHTML = 'You clicked button number ' + buttonId;
    };

    return button;
};

Array.from(document.getElementsByClassName('js-button-container')).forEach(function (container) {
    return container.appendChild(createButton(parseInt(container.getAttribute('data-buttonid'))));
});