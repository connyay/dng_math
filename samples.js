(function() {
var mathml = {
	quadratic: 
'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">\n\
	<mrow>\n\
	  <mi>x</mi>\n\
	  <mo>=</mo>\n\
	  <mfrac>\n\
		<mrow>\n\
		  <mo>&#x2212;</mo>\n\
		  <mi>b</mi>\n\
		  <mo>&#xB1;</mo>\n\
		  <msqrt>\n\
			<mrow>\n\
			  <msup>\n\
				<mi>b</mi>\n\
				<mn>2</mn>\n\
			  </msup>\n\
			  <mo>&#x2212;</mo>\n\
			  <mn>4</mn>\n\
			  <mi>a</mi>\n\
			  <mi>c</mi>\n\
			</mrow>\n\
		  </msqrt>\n\
		</mrow>\n\
		<mrow>\n\
		  <mn>2</mn>\n\
		  <mi>a</mi>\n\
		</mrow>\n\
	  </mfrac>\n\
	</mrow>\n\
</math>',
	cauchys: 
'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">\n\
	<mstyle>\n\
	  <mi>f</mi>\n\
	  <mrow>\n\
		<mo>(</mo>\n\
		<mi>a</mi>\n\
		<mo>)</mo>\n\
	  </mrow>\n\
	  <mo>=</mo>\n\
	  <mfrac>\n\
		<mn>1</mn>\n\
		<mrow>\n\
		  <mn>2</mn>\n\
		  <mi>&#x3C0;</mi>\n\
		  <mi>i</mi>\n\
		</mrow>\n\
	  </mfrac>\n\
	  <msub>\n\
		<mo>&#x222E;</mo>\n\
		<mrow>\n\
		  <mi>&#x3B3;</mi>\n\
		</mrow>\n\
	  </msub>\n\
	  <mfrac>\n\
		<mrow>\n\
		  <mi>f</mi>\n\
		  <mo>(</mo>\n\
		  <mi>z</mi>\n\
		  <mo>)</mo>\n\
		</mrow>\n\
		<mrow>\n\
		  <mi>z</mi>\n\
		  <mo>&#x2212;</mo>\n\
		  <mi>a</mi>\n\
		</mrow>\n\
	  </mfrac>\n\
	  <mi>d</mi>\n\
	  <mi>z</mi>\n\
	</mstyle>\n\
</math>',
	gauss:
'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">\n\
	<mrow>\n\
	  <mrow>\n\
		<msub>\n\
		  <mo>&#x222B;</mo>\n\
		  <mrow>\n\
			<mi>D</mi>\n\
		  </mrow>\n\
		</msub>\n\
		<mrow>\n\
		  <mo>(</mo>\n\
		  <mo>&#x2207;&#x22C5;</mo>\n\
		  <mi>F</mi>\n\
		  <mo>)</mo>\n\
		</mrow>\n\
		<mi>d</mi>\n\
		<mrow>\n\
		  <mi>V</mi>\n\
		</mrow>\n\
	  </mrow>\n\
	  <mo>=</mo>\n\
	  <mrow>\n\
		<msub>\n\
		  <mo>&#x222B;</mo>\n\
		  <mrow>\n\
			<mo>&#x2202;</mo>\n\
			<mi>D</mi>\n\
		  </mrow>\n\
		</msub>\n\
		<mrow>\n\
		  <mtext>&#x2009;</mtext>\n\
		  <mi>F</mi>\n\
		  <mo>&#x22C5;</mo>\n\
		  <mi>n</mi>\n\
		</mrow>\n\
		<mi>d</mi>\n\
		<mi>S</mi>\n\
	  </mrow>\n\
	</mrow>\n\
</math>',
	stdDev:
'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">\n\
	<mrow>\n\
	  <mi>&#x3C3;</mi>\n\
	  <mo>=</mo>\n\
	  <msqrt>\n\
		<mrow>\n\
		  <mfrac>\n\
			<mrow>\n\
			  <mn>1</mn>\n\
			</mrow>\n\
			<mrow>\n\
			  <mi>N</mi>\n\
			</mrow>\n\
		  </mfrac>\n\
		  <mstyle displaystyle="true">\n\
			<mrow>\n\
			  <munderover>\n\
				<mrow>\n\
				  <mo>&#x2211;</mo>\n\
				</mrow>\n\
				<mrow>\n\
				  <mi>i</mi>\n\
				  <mo>=</mo>\n\
				  <mn>1</mn>\n\
				</mrow>\n\
				<mrow>\n\
				  <mi>N</mi>\n\
				</mrow>\n\
			  </munderover>\n\
			  <mrow>\n\
				<msup>\n\
				  <mrow>\n\
					<mo stretchy="false">(</mo>\n\
					<msub>\n\
					  <mrow>\n\
						<mi>x</mi>\n\
					  </mrow>\n\
					  <mrow>\n\
						<mi>i</mi>\n\
					  </mrow>\n\
					</msub>\n\
					<mo>&#x2212;</mo>\n\
					<mi>&#x3BC;</mi>\n\
					<mo stretchy="false">)</mo>\n\
				  </mrow>\n\
				  <mrow>\n\
					<mn>2</mn>\n\
				  </mrow>\n\
				</msup>\n\
			  </mrow>\n\
			</mrow>\n\
		  </mstyle>\n\
		</mrow>\n\
	  </msqrt>\n\
	  <mo>.</mo>\n\
	</mrow>\n\
</math>'
};

var latex = {
	quadratic:
'\\begin{equation}\n\
x = \\frac {-b \\pm \\sqrt {b^2 - 4ac}}{2a}\n\
\\end{equation}',
	lorenz:
'\\begin{aligned}\n\
\\dot{x} & = \\sigma(y-x) \\\\\n\
\\dot{y} & = \\rho x - y - xz \\\\\n\
\\dot{z} & = -\\beta z + xy\n\
\\end{aligned}',
	cauchy: 
'\\begin{equation}\n\
\\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)\n\
\\end{equation}',
	cubic:
'\\begin{equation}\n\
a x^3\\; +\\; b x^2\\; +\\; c x\\; +\\; d\\; =\\; 0\n\
\\end{equation}',
};

var samples = {
	'MathML': mathml,
	'LaTeX': latex
}

function showSample(type, formula) {
	if(formula === "-1") {
		return;
	}
	var mathInput = document.getElementById('MathInput');
	mathInput.value = samples[type][formula];
	mathInput.onkeyup();
}
function clearSelection(id) {
	var select = document.getElementById(id);
	select.selectedIndex = null;
	return true;
};
window.showSample = showSample;
window.clearSelection = clearSelection;
})();
