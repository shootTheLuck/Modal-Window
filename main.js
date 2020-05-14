
import ModalWindow from "./ModalWindow.js";
//import SpinBox from "./SpinBox.js";
//import ColorPicker from "./ColorPicker.js";

var modal = new ModalWindow({title: "Modal Window"});
const markup = `
<label for="object-name-input">Object</label>
<input id="object-name-input" type="text">
<div id="transform-area" class="transform-area">
    <div id="gridSize"> </div>
    <div id="position-vector" class="vector-area">
        <label class="vector-area-label">Position</label>
        <spin-box id="positionXSpinner" label="positionSpinner" decimals="2" value="13" width="20"></spin-box>
    </div>
    <div id="scale-vector" class="vector-area">
        <label class="vector-area-label">Scale</label>
    </div>
</div>
`;
modal.addMarkup(markup);
document.body.appendChild(modal);

modal.open();

var showHideModalButton = document.createElement("button");
showHideModalButton.id = showHideModalButton;
showHideModalButton.innerHTML = "Show/Hide Modal Window";
showHideModalButton.style.fontSize = 12 + "px";
document.body.appendChild(showHideModalButton);

showHideModalButton.onclick = function() {
    if (modal.closed) {
        modal.open();
    } else {
        modal.close();
    }
};

