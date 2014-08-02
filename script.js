var Preview = {
    // delay after keystroke before updating
    delay: 125,

    // filled in by Init below
    preview: null,
    // filled in by Init below
    buffer: null,

    // store setTimout id
    timeout: null,
    // true when MathJax is processing
    jaxRunning: false,
    // used to check if an update is needed
    oldText: null,

    //
    //  Get the preview and buffer DIV's
    //
    Init: function() {
        this.preview = document.getElementById("MathPreview");
        this.buffer = document.getElementById("MathBuffer");
    },

    //
    //  Switch the buffer and preview, and display the right one.
    //  (We use visibility:hidden rather than display:none since
    //  the results of running MathJax are more accurate that way.)
    //
    SwapBuffers: function() {
        var buffer = this.preview,
            preview = this.buffer;
        this.buffer = buffer;
        this.preview = preview;
        buffer.style.visibility = "hidden";
        buffer.style.position = "absolute";
        preview.style.position = "";
        preview.style.visibility = "";
    },

    //
    //  This gets called when a key is pressed in the textarea.
    //  We check if there is already a pending update and clear it if so.
    //  Then set up an update to occur after a small delay (so if more keys
    //    are pressed, the update won't occur until after there has been 
    //    a pause in the typing).
    //  The callback function is set up below, after the Preview object is set up.
    //
    Update: function() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(this.callback, this.delay);
    },

    //
    //  Creates the preview and runs MathJax on it.
    //  If MathJax is already trying to render the code, return
    //  If the text hasn't changed, return
    //  Otherwise, indicate that MathJax is running, and start the
    //    typesetting.  After it is done, call PreviewDone.
    //  
    CreatePreview: function() {
        Preview.timeout = null;
        if (this.jaxRunning) return;
        var text = document.getElementById("MathInput").value;
        if (text === this.oldtext) return;
        this.buffer.innerHTML = this.oldtext = text;
        this.jaxRunning = true;
        MathJax.Hub.Queue(
            ["Typeset", MathJax.Hub, this.buffer], ["PreviewDone", this]
        );
    },

    //  Indicate that MathJax is no longer running,
    //  and swap the buffers to show the results.
    PreviewDone: function() {
        this.jaxRunning = false;
        this.SwapBuffers();
    },

    toString: function() {
        var svgSrcNode = Preview.preview && Preview.preview.querySelector('svg');
        if (!svgSrcNode) {
            return false;
        }
        var svgNode = svgSrcNode.cloneNode(true);
        svgNode.setAttribute('height', svgSrcNode.clientHeight);
        svgNode.setAttribute('width', svgSrcNode.clientWidth);
        svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        var gylphs = document.getElementById('MathJax_SVG_glyphs');
        var defs = gylphs ? gylphs.cloneNode(true) : null;
        if (defs) {
            svgNode.appendChild(defs);
        }
        var serializer = new XMLSerializer();
        return serializer.serializeToString(svgNode);
    }

};

function svg2png() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			window.location.assign('http://svgtopng.herokuapp.com/i/' + xhr.response);
		}
	}
	xhr.open('POST', 'http://svgtopng.herokuapp.com');
	xhr.send(Preview.toString());
}

//  Cache a callback to the CreatePreview action
Preview.callback = MathJax.Callback(["CreatePreview", Preview]);
// make sure it can run more than once
Preview.callback.autoReset = true;

