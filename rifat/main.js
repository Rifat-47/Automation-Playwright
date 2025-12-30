function showAndHide(){
        const clickButton = document.getElementById('click-btn');
        const hiddenDiv = document.getElementById('hidden-div');

        if (hiddenDiv.style.display === 'none') {
            hiddenDiv.style.display = 'inline-block';
            clickButton.textContent = 'Click to Hide';
        } else {
            hiddenDiv.style.display = 'none';
            clickButton.textContent = 'Click to Show';
        }
}


const hoverButton = document.getElementById('hover-btn');
hoverButton.onmouseenter = function() {
    hoverButton.style.backgroundColor = 'lightblue';
    hoverButton.textContent = 'Hovered!';
}

hoverButton.onmouseleave = function() {
    hoverButton.style.backgroundColor = '';
    hoverButton.textContent = 'Hover Me';
};

const enableButton = document.getElementById('enable-btn');
enableButton.onclick = function() {
    const textInput = document.getElementById('text-input');

    if (textInput.disabled) {
        textInput.disabled = false;
        enableButton.textContent = 'Disable Input';
    } else {
        textInput.disabled = true;
        enableButton.textContent = 'Enable Input';
    }
};