createButton = (buttonId) => {
    const button = document.createElement('button');
    button.innerHTML = 'Click';
    button.onclick = () => {
        button.parentElement.innerHTML = `You clicked button number ${buttonId}`;
    };

    return button;
}

Array
    .from(document.getElementsByClassName('js-button-container'))
    .forEach(container => container.appendChild(createButton(parseInt(container.getAttribute('data-buttonid')))));