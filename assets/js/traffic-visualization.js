/** Illustrative four-lane freeway visualization. Not a calibrated simulation. */
(async () => {
  const root = document.getElementById('traffic-demo');
  if (!root) return;
  const viewport = root.querySelector('[data-traffic-viewport]');
  const densityInput = root.querySelector('[data-traffic-density]');
  const speedInput = root.querySelector('[data-traffic-speed]');
  const densityOutput = root.querySelector('[data-density-output]');
  const speedOutput = root.querySelector('[data-speed-output]');
  const pauseButton = root.querySelector('[data-traffic-pause]');
  const status = root.querySelector('[data-traffic-status]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let THREE;
  try {
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
  } catch (error) {
    viewport.innerHTML = '<div class="traffic-demo__fallback">The interactive visualization could not load. Your research content is still available below.</div>';
    status.textContent = 'Unavailable';
    return;
  }
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x122039);
  const camera = new THREE.PerspectiveCamera(37, 1, .1, 250);
  camera.position.set(19, 23, 37);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  viewport.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xc8eaff, 0x233249, 2.3));
  const sunlight = new THREE.DirectionalLight(0xffffff, 2.1);
  sunlight.position.set(6, 20, 9);
  scene.add(sunlight);
  function block(w, h, d, color, x, y, z, parent = scene) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({color, roughness: .78}));
    mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  }
  block(62, .14, 16, 0x29374c, 0, -.18, 0);
  block(62, .1, 12, 0x343f4c, 0, 0, 0);
  for (const z of [-4.5, -1.5, 1.5, 4.5]) {
    for (let x = -29; x < 30; x += 5) block(2.8, .018, .055, 0xb8c7d7, x, .065, z + 1.48);
  }
  for (const z of [-6, 6]) block(62, .25, .12, 0x84a0af, 0, .18, z);
  const detectors = [-18, 0, 18];
  for (const x of detectors) {
    block(.13, .03, 12, 0x3acbd5, x, .07, 0);
    for (const z of [-4.5, -1.5, 1.5, 4.5]) {
      const pad = block(.52, .035, .52, 0x45e1ce, x, .1, z);
      pad.material.emissive = new THREE.Color(0x147f80);
      pad.material.emissiveIntensity = .65;
    }
  }
  const carColors = [0x5ed0ed, 0xf8c66a, 0xdbe8f2, 0xf08088, 0x9de0bb];
  const cars = [];
  for (let i = 0; i < 56; i++) {
    const lane = i % 4;
    const group = new THREE.Group();
    block(1.9, .5, 1.08, carColors[i % carColors.length], 0, .45, 0, group);
    block(.9, .3, .85, 0x91aabd, -.12, .82, 0, group);
    for (const xx of [-.57, .57]) for (const zz of [-.54, .54]) block(.32, .24, .15, 0x101820, xx, .24, zz, group);
    group.position.set(((i * 17.31) % 64) - 32, 0, -4.5 + lane * 3);
    scene.add(group);
    cars.push({group, lane, seed: i, velocity: 3.3 + (i % 7) * .26});
  }
  let density = Number(densityInput.value);
  let speed = Number(speedInput.value);
  let paused = reduceMotion.matches;
  let visible = true;
  let last = 0;
  let frame = 0;
  function sync() {
    density = Number(densityInput.value);
    speed = Number(speedInput.value);
    densityOutput.textContent = density + '%';
    speedOutput.textContent = speed.toFixed(1) + '×';
    const count = Math.round(cars.length * density / 100);
    cars.forEach((car, i) => { car.group.visible = i < count; });
    pauseButton.textContent = paused ? 'Play' : 'Pause';
    pauseButton.setAttribute('aria-pressed', String(paused));
    status.textContent = paused ? 'Paused · illustrative' : 'Running · illustrative';
    renderer.render(scene, camera);
  }
  densityInput.addEventListener('input', sync);
  speedInput.addEventListener('input', sync);
  pauseButton.addEventListener('click', () => { paused = !paused; last = 0; sync(); });
  reduceMotion.addEventListener?.('change', (e) => { if (e.matches) { paused = true; sync(); } });
  function resize() {
    const w = viewport.clientWidth, h = viewport.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.render(scene, camera);
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(viewport);
  const intersectionObserver = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; if (!visible) last = 0; }, {threshold: 0.01});
  intersectionObserver.observe(root);
  document.addEventListener('visibilitychange', () => { last = 0; });
  function animate(t) {
    frame = requestAnimationFrame(animate);
    if (!visible || document.hidden || paused) { last = t; return; }
    const dt = Math.min((t - (last || t)) / 1000, .05);
    last = t;
    for (const car of cars) {
      if (!car.group.visible) continue;
      car.group.position.x += dt * speed * car.velocity;
      if (car.group.position.x > 32) car.group.position.x -= 64;
    }
    renderer.render(scene, camera);
  }
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); resizeObserver.disconnect(); intersectionObserver.disconnect(); renderer.dispose(); }, {once:true});
  sync(); resize(); frame = requestAnimationFrame(animate);
})();
