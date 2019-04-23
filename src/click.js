function handlclick() {
  const el = document.createElement('div');
  el.innerHTML = _.join(['alo', 'alo', 'alo'], '__');
  document.body.appendChild(el);
}

export default handlclick;
