const outputInput = document.querySelector(".output");
const calc = document.querySelector(".calc");
const delBtn = document.querySelector(".del");
const resetBtn = document.querySelector(".reset");
const resultBtn = document.querySelector(".equal");
const buttons = document.querySelectorAll(".calc button");
const toggleOpts = document.querySelectorAll(".toggle .toggle-opt");

toggleOpts.forEach(toggleOpt => {
  toggleOpt.addEventListener('click', e => {
    localStorage.setItem('theme', e.target.dataset.name);
    document.querySelector('.circle').className = `circle ${e.target.dataset.name}`;
    document.body.className = e.target.dataset.name;
  }); 
})

document.body.className = localStorage.getItem('theme') || 'theme1';
document.querySelector('.circle').className = `circle ${localStorage.getItem('theme') || ''}`;

let output = "";
let preview = "";

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let key = e.target.dataset.value;
    try {
      const filteredValues = (key !== 'reset' && key !== 'del' && key !== 'result');
      output+= filteredValues ? key : '';
      preview+= filteredValues ? e.target.innerHTML : '';
      if(key == 'result') {
        if(!preview) return;
        preview = eval(output);
        output = preview;
      } else if(key == 'reset') {
        preview = '';
        output = '';
      } else if(key == 'del') {
        preview = preview.slice(0, -1);
        output = output.slice(0, -1);
      }
    } catch(err) {
      preview = '';
      output = '';
    }
    console.log(output);
    outputInput.value = preview;
  });
});

