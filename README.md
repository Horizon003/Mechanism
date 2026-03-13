# Anticholinesterase Drug Mechanism Simulator

Interactive, step-by-step simulation of **indirect-acting anticholinesterase drugs** at the synapse.

## Included drug groups

- **Short acting**: Edrophonium
- **Medium acting**: Neostigmine, Physostigmine, Pyridostigmine
- **Indirect acting used for Alzheimer’s disease**: Tacrine (historical), Donepezil, Galantamine, Rivastigmine
- **Indirect acting (irreversible)**: Echothiophate, Organophosphates

## How to view this

### Option 1 (recommended): run local web server

```bash
cd /workspace/Mechanism
python3 -m http.server 8000
```

Then open in browser:

- `http://localhost:8000`

### Option 2: open file directly

Open `index.html` in a browser. (Some browsers may restrict local asset/script behavior; web server is more reliable.)

## How to use the simulation

1. Select a drug from the dropdown list.
2. Use **Next Step** and **Previous Step** buttons to play mechanism stages.
3. Watch the **top bar** for current step details and progress.
4. Use **Reset** to start again from Step 1.

## Simulation flow

1. Drug prepared/released near presynaptic terminal
2. Acetylcholine release into synaptic cleft
3. Drug binds acetylcholinesterase (AChE)
4. ACh accumulation in cleft
5. Increased receptor activation

## Project files

- `index.html` – structure and controls
- `styles.css` – layout, styling, animations
- `script.js` – drug data + step logic
- `assets/*.svg` – visual elements (neuron, cleft, receptor, molecules)
