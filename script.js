const drugData = {
  edrophonium: {
    className: "Short acting",
    duration: "Minutes",
    use: "Diagnostic support in myasthenia gravis and quick reversal checks.",
    mechanism: "Reversible rapid inhibitor of acetylcholinesterase.",
  },
  neostigmine: {
    className: "Medium acting",
    duration: "2–4 hours",
    use: "Myasthenia gravis, postoperative ileus, reversal of nondepolarizing block.",
    mechanism: "Quaternary carbamate inhibitor; mostly peripheral action.",
  },
  physostigmine: {
    className: "Medium acting",
    duration: "0.5–2 hours",
    use: "Anticholinergic toxicity (crosses CNS).",
    mechanism: "Tertiary carbamate inhibitor; reversible and CNS-active.",
  },
  pyridostigmine: {
    className: "Medium acting",
    duration: "3–6 hours",
    use: "Maintenance therapy in myasthenia gravis.",
    mechanism: "Reversible peripheral acetylcholinesterase inhibition.",
  },
  tacrine: {
    className: "Alzheimer’s indirect acting",
    duration: "Moderate",
    use: "Historical Alzheimer’s treatment; now avoided due to ADR profile.",
    mechanism: "Centrally acting reversible inhibitor.",
  },
  donepezil: {
    className: "Alzheimer’s indirect acting",
    duration: "Long",
    use: "Symptomatic cognitive support in Alzheimer’s disease.",
    mechanism: "Selective central acetylcholinesterase inhibition.",
  },
  galantamine: {
    className: "Alzheimer’s indirect acting",
    duration: "Moderate",
    use: "Mild-to-moderate Alzheimer’s disease.",
    mechanism: "Reversible acetylcholinesterase inhibition with nicotinic modulation.",
  },
  rivastigmine: {
    className: "Alzheimer’s indirect acting",
    duration: "Moderate",
    use: "Alzheimer’s and Parkinson’s dementia.",
    mechanism: "Pseudo-irreversible carbamate inhibition of AChE and BuChE.",
  },
  echothiophate: {
    className: "Indirect acting irreversible",
    duration: "Very long",
    use: "Rare topical ophthalmic use.",
    mechanism: "Organophosphate that phosphorylates acetylcholinesterase.",
  },
  organophosphates: {
    className: "Indirect acting irreversible",
    duration: "Very long / toxic",
    use: "Commonly toxic exposures; not therapeutic in most settings.",
    mechanism: "Irreversible phosphorylation with aging of enzyme bond.",
  },
};

const steps = [
  {
    title: "Step 1: Drug selected and prepared for release.",
    text: "Drug molecule is in presynaptic area, acetylcholine is still inside vesicle.",
    apply: () => {
      setPos({ vesicle: ["21%", "190px", 1], ach: ["30%", "210px", 0], enzyme: ["41%", "210px", 1], drug: ["13%", "360px", 1], receptor: ["70%", "345px", 1] });
    },
  },
  {
    title: "Step 2: Neurotransmitter release into synaptic cleft.",
    text: "Nerve impulse causes acetylcholine release. ACh molecule moves into cleft.",
    apply: () => {
      setPos({ vesicle: ["23%", "170px", 1], ach: ["34%", "195px", 1], enzyme: ["41%", "210px", 1], drug: ["19%", "310px", 1], receptor: ["70%", "345px", 1] });
    },
  },
  {
    title: "Step 3: Drug binds acetylcholinesterase.",
    text: "Anticholinesterase drug binds AChE and blocks breakdown of acetylcholine.",
    apply: () => {
      setPos({ vesicle: ["23%", "170px", 0.6], ach: ["42%", "205px", 1], enzyme: ["42%", "207px", 1], drug: ["39%", "255px", 1], receptor: ["70%", "345px", 1] });
    },
  },
  {
    title: "Step 4: Acetylcholine persists and accumulates.",
    text: "Because enzyme is inhibited, more ACh stays in cleft and signal increases.",
    apply: () => {
      setPos({ vesicle: ["23%", "170px", 0.3], ach: ["55%", "250px", 1], enzyme: ["42%", "207px", 1], drug: ["41%", "234px", 1], receptor: ["70%", "345px", 1] });
    },
  },
  {
    title: "Step 5: Enhanced receptor activation.",
    text: "ACh reaches receptor and activates postsynaptic response for longer period.",
    apply: () => {
      setPos({ vesicle: ["23%", "170px", 0.15], ach: ["67%", "318px", 1], enzyme: ["42%", "207px", 0.9], drug: ["43%", "238px", 1], receptor: ["68%", "318px", 1] });
      receptor.classList.add("pulse");
    },
  },
];

const stepTitle = document.getElementById("stepTitle");
const progressBar = document.getElementById("progressBar");
const drugSelector = document.getElementById("drugSelector");
const drugInfo = document.getElementById("drugInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

const vesicle = document.getElementById("vesicle");
const ach = document.getElementById("achMolecule");
const enzyme = document.getElementById("enzyme");
const drug = document.getElementById("drugMolecule");
const receptor = document.getElementById("receptor");

let currentStep = 0;

function setPos(map) {
  receptor.classList.remove("pulse");
  const ref = { vesicle, ach, enzyme, drug, receptor };
  Object.keys(map).forEach((k) => {
    const [left, top, opacity] = map[k];
    ref[k].style.left = left;
    ref[k].style.top = top;
    ref[k].style.opacity = opacity;
  });
}

function renderDrugInfo() {
  const d = drugData[drugSelector.value];
  drugInfo.innerHTML = `
    <strong>${d.className}</strong><br>
    <strong>Drug:</strong> ${drugSelector.options[drugSelector.selectedIndex].text}<br>
    <strong>Duration:</strong> ${d.duration}<br>
    <strong>Use:</strong> ${d.use}<br>
    <strong>Mechanism:</strong> ${d.mechanism}
  `;
}

function renderStep() {
  const step = steps[currentStep];
  stepTitle.textContent = `${step.title} ${step.text}`;
  progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  step.apply();
  prevBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === steps.length - 1;
}

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    renderStep();
  }
});

resetBtn.addEventListener("click", () => {
  currentStep = 0;
  renderStep();
});

drugSelector.addEventListener("change", () => {
  renderDrugInfo();
  currentStep = 0;
  renderStep();
});

renderDrugInfo();
renderStep();
