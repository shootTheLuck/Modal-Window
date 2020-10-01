

//makeElementDraggable adapted from https://www.w3schools.com/howto/howto_js_draggable.asp

function makeElementDraggable(element, dragger) {
    var initialOffsetLeft = 0;
    var initialOffsetTop = 0;
    dragger.addEventListener("mousedown", startDrag);

    function startDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        initialOffsetLeft = e.clientX - element.offsetLeft;
        initialOffsetTop = e.clientY - element.offsetTop;
        document.addEventListener("mouseup", endDrag, true);
        document.addEventListener("mousemove", drag, true);
        /* re-append to put this higher in the stacking context */
        element.parent.appendChild(element);
    }

    function drag(e) {
        e.preventDefault();
        e.stopPropagation();
        let top = Math.min(Math.max(e.clientY, 0), window.innerHeight);
        element.style.top = top - initialOffsetTop + "px";
        element.style.left = (e.clientX - initialOffsetLeft) + "px";
    }

    function endDrag() {

        document.removeEventListener("mouseup", endDrag, true);
        document.removeEventListener("mousemove", drag, true);
    }
}

//TODO put make draggable into class?

class ModalWindow extends HTMLElement {

    constructor(opts = {}) {
        super();
        var defaultWidth = "400px";
        this.className = "modalWindow";
        this.style.width = opts.width || defaultWidth;
        this.style.resize = opts.resize || "both"; //"none", "vertical", "horizontal"

        this.topBar = document.createElement("div");
        this.topBar.className = "modalTopBar";
        this.appendChild(this.topBar);

        this.titleText = document.createElement("span");
        this.titleText.className = "modalTitle";
        this.topBar.appendChild(this.titleText);
        this.setTitle(opts.title || "Modal Window");

        this.closeButton = document.createElement("button");
        this.closeButton.className = "closeButton";
        // this.closeButton.addEventListener("mousedown", function(evt) {
            // evt.stopPropagation();
        // });

        this.closeButton.addEventListener("click", this.close.bind(this));

        this.topBar.appendChild(this.closeButton);
        makeElementDraggable(this, this.topBar);

        this.container = document.createElement("div");
        this.container.className = "modalContent";
        this.appendChild(this.container);

        this.closed = true;
        this.parent = null;
    }

    setTitle(text) {
        this.titleText.textContent = text;
    }

    addElement(element) {
        this.container.appendChild(element);
    }

    addMarkup(string) {
        this.container.insertAdjacentHTML("beforeend", string);
    }

    addShadow(element, clone) {
        var contentDiv = document.createElement("div");
        if (clone) {
            contentDiv.attachShadow({mode: "open"}).appendChild(element.cloneNode(true));
        } else {
            contentDiv.attachShadow({mode: "open"}).appendChild(element);
        }
        this.container.appendChild(contentDiv);
    }

    close() {
        if (!this.closed) {
            this.closed = true;
            this.style.opacity = 0;
            var scope = this;
            this.addEventListener("transitionend", function() {
                if (this.closed) {
                    scope.style.visibility = "hidden";
                }
            });
        }
    }

    open() {
        if (this.closed) {
            if (!this.parent) {
                this.parent = this.parentElement;
            }

            /* re-append to put this higher in the stacking context */
            this.parent.appendChild(this);
            this.closed = false;
            this.style.opacity = 1.0;
            this.style.visibility = "visible";
        }
    }
}

customElements.define("modal-window", ModalWindow);

export {ModalWindow};
