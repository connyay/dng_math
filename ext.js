var CURRENT_ARTIFACT = {},
    FORMULA_ATTR = 'Formula';

function adjustHeight() {
    gadgets.window.adjustHeight();
}

function setActionButtonDisplay(display) {
    var actionBtns = document.getElementById('actionButtons');
    actionBtns.style.display = display;
    adjustHeight();
}

function showActionButtons() {
    setActionButtonDisplay('');
}

function hideActionButtons() {
    setActionButtonDisplay('none');
}

RM.Event.subscribe(RM.Event.ARTIFACT_OPENED, function(ref) {
    CURRENT_ARTIFACT.ref = ref;
    findFormula(CURRENT_ARTIFACT.ref, function(hasFormula) {
        if (hasFormula) {
            showActionButtons();
        }
    });
});

RM.Event.subscribe(RM.Event.ARTIFACT_CLOSED, function(ref) {
    hideActionButtons();
});


function findFormula(ref, cb) {
    RM.Data.getAttributes(ref, [RM.Data.Attributes.FORMAT, FORMULA_ATTR], function(opResult) {
        if (opResult.code === RM.OperationResult.OPERATION_OK) {
            var attrs = opResult.data[0];
            if (attrs.values[RM.Data.Attributes.FORMAT] === RM.Data.Formats.WRAPPED && attrs.values[FORMULA_ATTR]) {
                CURRENT_ARTIFACT.formula = attrs.values[FORMULA_ATTR];
                cb(true);
            } else {
                cb(false);
            }
        }
    });
}

function loadFormula() {
    if (CURRENT_ARTIFACT.formula) {
        var input = document.getElementById('MathInput');
        input.value = CURRENT_ARTIFACT.formula;
        input.onkeyup();
    }
}

function saveFormula() {
    var formula = document.getElementById('MathInput').value;

    var newFormula = new RM.ArtifactAttributes(CURRENT_ARTIFACT.ref);
    newFormula.values[FORMULA_ATTR] = formula;
    RM.Data.setAttributes(newFormula, function(setResult) {
        if (setResult.code === RM.OperationResult.OPERATION_OK) {
            console.log('Saved Formula');
        }
    });
}

gadgets.util.registerOnLoadHandler(adjustHeight);
