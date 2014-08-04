var CURRENT_ARTIFACT = {};

RM.Event.subscribe(RM.Event.ARTIFACT_OPENED, function(ref) {
    CURRENT_ARTIFACT.ref = ref;
    findFormula(CURRENT_ARTIFACT.ref);
});


function findFormula(ref) {
    RM.Data.getAttributes(ref, [RM.Data.Attributes.FORMAT, 'Formula'], function(opResult) {
        if (opResult.code === RM.OperationResult.OPERATION_OK) {
            var attrs = opResult.data[0];
            if (attrs.values[RM.Data.Attributes.FORMAT] === RM.Data.Formats.WRAPPED) {
                CURRENT_ARTIFACT.formula = attrs.values['Formula'];
            }
        }
    });
}

function loadFormula() {
    if (CURRENT_ARTIFACT.formula) {
        var input = document.getElementById("MathInput");
        input.value = CURRENT_ARTIFACT.formula;
        input.onkeyup();
    }
}

function saveFormula() {
    var formula = document.getElementById("MathInput").value;

    var newFormula = new RM.ArtifactAttributes(CURRENT_ARTIFACT.ref);
    newFormula.values['Formula'] = formula;
    RM.Data.setAttributes(newFormula, function(setResult) {
        if (setResult.code === RM.OperationResult.OPERATION_OK) {
            console.log('Saved Formula');
        }
    });
}