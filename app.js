const STORAGE_KEY = "quiet-hands-state-v5";
const DAILY_KEY = new Date().toISOString().slice(0, 10);
const FT_PER_YARD = 3;
const INCHES_PER_FOOT = 12;
const GRAVITY_FTPS2 = 32.174;
const ROUND_LIMIT = 3;
const CLICK_MOA = 0.25;
const WINDAGE_LIMIT_MOA = 4.5;
const ELEVATION_TRIM_LIMIT_MOA = 4;
const ZOOM_LEVELS = [1.15, 1.55, 2.0];
const WIND_COUPLING = 0.1;

const rifle = {
  name: "MOA-style 6.5 PRC",
  load: "143gr Hornady ELD-X",
  bcG1: 0.625,
  muzzleVelocityFps: 2960,
  zeroRangeYards: 200,
  barrel: '24”',
  twist: '1:8',
  weightGrains: 143
};

const scenarios = [
  {
    id: "deschutes-glass",
    name: "Stage 1 — Deschutes Glass",
    location: "South rim above the Deschutes",
    light: "Apricot dusk / quartering right push",
    image: "./assets/scene-1.png",
    distanceYards: 640,
    slopeDeg: -3,
    densityAltitudeFt: 4200,
    objectiveTitle: "Pick the ram plate and make a disciplined first correction.",
    objectiveCopy: "Three animal steels. The correct plate is the ram on the exposed shelf. Dial from your base dope, then respect the harder push at the river seam.",
    mirage: "Looks lazy near you. It leans harder once the bullet gets over the river bend.",
    flags: "Near flag is sleepy. Far hanger wakes up in pulses.",
    terrain: "Sheltered firing point, exposed target lane.",
    windZonesMph: [4.2, 7.1, 8.6],
    gustMph: 2.1,
    thermalBiasMoa: 0.08,
    targetAnimal: "Bighorn ram",
    missionTargetId: "ram",
    targets: [
      { id: "ram", animal: "Bighorn ram", plate: "0.8 MOA", x: 0.77, y: 0.57, scale: 0.92 },
      { id: "coyote", animal: "Coyote", plate: "1.0 MOA", x: 0.67, y: 0.61, scale: 0.78 },
      { id: "pronghorn", animal: "Pronghorn", plate: "0.9 MOA", x: 0.87, y: 0.54, scale: 0.82 }
    ]
  },
  {
    id: "juniper-window",
    name: "Stage 2 — Juniper Window",
    location: "Juniper saddle over dry grass benches",
    light: "Late sun / left push opens late",
    image: "./assets/scene-2.png",
    distanceYards: 890,
    slopeDeg: 4,
    densityAltitudeFt: 6100,
    objectiveTitle: "Choose the deer plate in the window and dial for the late left push.",
    objectiveCopy: "The deer is the plate sitting in the open window, not the nearer coyote. The lane hides most of the wind until the bullet clears the junipers.",
    mirage: "Flat left close. Noticeably faster once the lane opens.",
    flags: "Low brush twitches first. The hanger tells the truth late.",
    terrain: "Protected start, open middle, committed finish.",
    windZonesMph: [-2.8, -5.6, -7.4],
    gustMph: 3.2,
    thermalBiasMoa: -0.05,
    targetAnimal: "Mule deer",
    missionTargetId: "deer",
    targets: [
      { id: "coyote", animal: "Coyote", plate: "0.9 MOA", x: 0.68, y: 0.6, scale: 0.8 },
      { id: "deer", animal: "Mule deer", plate: "0.65 MOA", x: 0.82, y: 0.56, scale: 0.92 },
      { id: "ram", animal: "Bighorn ram", plate: "0.8 MOA", x: 0.9, y: 0.52, scale: 0.8 }
    ]
  },
  {
    id: "sage-brass",
    name: "Stage 3 — Sage Brass",
    location: "Open draw east of the road cut",
    light: "Hot amber / long right-to-left funnel",
    image: "./assets/scene-3.png",
    distanceYards: 1210,
    slopeDeg: 6,
    densityAltitudeFt: 5400,
    objectiveTitle: "Find the pronghorn plate and stay disciplined in the long funnel.",
    objectiveCopy: "This is the farthest shot. The pronghorn is small and easy to over-confirm. The lane is simple ballistically and ugly in wind.",
    mirage: "Fast and consistent enough to fool you into overconfidence.",
    flags: "Far vegetation stays committed even when the near grass eases.",
    terrain: "A long draw gathers and tightens the flow.",
    windZonesMph: [6.3, 9.4, 11.2],
    gustMph: 1.9,
    thermalBiasMoa: 0.14,
    targetAnimal: "Pronghorn",
    missionTargetId: "pronghorn",
    targets: [
      { id: "deer", animal: "Mule deer", plate: "0.85 MOA", x: 0.76, y: 0.58, scale: 0.82 },
      { id: "pronghorn", animal: "Pronghorn", plate: "0.55 MOA", x: 0.88, y: 0.56, scale: 0.7 },
      { id: "coyote", animal: "Coyote", plate: "0.75 MOA", x: 0.83, y: 0.61, scale: 0.66 }
    ]
  },
  {
    id: "rimrock-blue",
    name: "Stage 4 — Rimrock Blue",
    location: "Shaded wall under the basalt rim",
    light: "Blue hour / deceptive left bursts",
    image: "./assets/scene-4.png",
    distanceYards: 1040,
    slopeDeg: -1,
    densityAltitudeFt: 7800,
    objectiveTitle: "Take the coyote plate without letting the lull talk you into a lazy dial.",
    objectiveCopy: "Still where you lie, moving where the bullet finishes. The coyote plate is the one low in the cool shade, not the taller ram on the rim.",
    mirage: "Faint. You get more truth from edge flicker than full boil.",
    flags: "Short left bursts, then a lull that tempts a bad send.",
    terrain: "Cool foreground, bright target lane.",
    windZonesMph: [-3.2, -7.6, -9.2],
    gustMph: 2.6,
    thermalBiasMoa: -0.1,
    targetAnimal: "Coyote",
    missionTargetId: "coyote",
    targets: [
      { id: "ram", animal: "Bighorn ram", plate: "0.8 MOA", x: 0.76, y: 0.54, scale: 0.84 },
      { id: "coyote", animal: "Coyote", plate: "0.7 MOA", x: 0.84, y: 0.6, scale: 0.72 },
      { id: "deer", animal: "Mule deer", plate: "0.9 MOA", x: 0.91, y: 0.55, scale: 0.76 }
    ]
  }
];

const els = {
  stageName: document.getElementById("stageName"),
  scenarioDistance: document.getElementById("scenarioDistance"),
  shotsRemainingValue: document.getElementById("shotsRemainingValue"),
  courseProgressValue: document.getElementById("courseProgressValue"),
  scenarioName: document.getElementById("scenarioName"),
  missionTag: document.getElementById("missionTag"),
  gradePill: document.getElementById("gradePill"),
  sceneImage: document.getElementById("sceneImage"),
  scopeCanvas: document.getElementById("scopeCanvas"),
  locationTag: document.getElementById("locationTag"),
  conditionsTag: document.getElementById("conditionsTag"),
  missionStatusTag: document.getElementById("missionStatusTag"),
  windCallReadout: document.getElementById("windCallReadout"),
  elevationReadout: document.getElementById("elevationReadout"),
  impactReadout: document.getElementById("impactReadout"),
  scopeTip: document.getElementById("scopeTip"),
  objectiveTitle: document.getElementById("objectiveTitle"),
  objectiveCopy: document.getElementById("objectiveCopy"),
  targetAnimalValue: document.getElementById("targetAnimalValue"),
  targetPlateValue: document.getElementById("targetPlateValue"),
  densityAltitudeValue: document.getElementById("densityAltitudeValue"),
  slopeValue: document.getElementById("slopeValue"),
  mirageHint: document.getElementById("mirageHint"),
  flagsHint: document.getElementById("flagsHint"),
  terrainHint: document.getElementById("terrainHint"),
  nextScenarioBtn: document.getElementById("nextScenarioBtn"),
  rifleName: document.getElementById("rifleName"),
  rifleLoad: document.getElementById("rifleLoad"),
  zeroValue: document.getElementById("zeroValue"),
  muzzleVelocityValue: document.getElementById("muzzleVelocityValue"),
  bcValue: document.getElementById("bcValue"),
  baseDopeValue: document.getElementById("baseDopeValue"),
  windUnitValue: document.getElementById("windUnitValue"),
  tofValue: document.getElementById("tofValue"),
  impactVelocityValue: document.getElementById("impactVelocityValue"),
  impactEnergyValue: document.getElementById("impactEnergyValue"),
  selectedTargetValue: document.getElementById("selectedTargetValue"),
  hoverTargetValue: document.getElementById("hoverTargetValue"),
  stepLabel: document.getElementById("stepLabel"),
  windDialValue: document.getElementById("windDialValue"),
  elevationDialValue: document.getElementById("elevationDialValue"),
  windLabel: document.getElementById("windLabel"),
  elevationLabel: document.getElementById("elevationLabel"),
  tutorialStatus: document.getElementById("tutorialStatus"),
  breathIndicator: document.getElementById("breathIndicator"),
  breathReadout: document.getElementById("breathReadout"),
  fireBtn: document.getElementById("fireBtn"),
  scoreValue: document.getElementById("scoreValue"),
  bestGroupValue: document.getElementById("bestGroupValue"),
  stageResultValue: document.getElementById("stageResultValue"),
  actualWindValue: document.getElementById("actualWindValue"),
  windErrorValue: document.getElementById("windErrorValue"),
  verticalErrorValue: document.getElementById("verticalErrorValue"),
  impactValue: document.getElementById("impactValue"),
  replayNarrative: document.getElementById("replayNarrative"),
  shotLog: document.getElementById("shotLog"),
  zoomButtons: [...document.querySelectorAll(".zoom-btn")]
};

const ctx = els.scopeCanvas.getContext("2d");
const state = loadState();
let scenarioIndex = state.scenarioIndex || 0;
let score = state.score || 0;
let bestGroup = state.bestGroup || null;
let shotLog = state.shotLog || [];
let lastShot = state.lastShot || null;
let stage = state.stage || freshStageState();
let selectedTargetId = stage.selectedTargetId || null;
let windageMoa = stage.windageMoa || 0;
let elevationTrimMoa = stage.elevationTrimMoa || 0;
let zoomIndex = stage.zoomIndex || 0;
let breathActive = false;
let holdStart = 0;
let currentBreathValue = 0.5;
let breathPhase = 0;
let replayPhase = 0;
let scopeTime = 0;
let desiredAim = { x: 0.5, y: 0.56 };
let smoothAim = { x: 0.5, y: 0.56 };
let hoverTargetId = null;
let viewAim = { x: 0.5, y: 0.56 };
let impactFlash = 0;

function freshStageState() {
  return { shotsRemaining: ROUND_LIMIT, clearedIds: [], currentCleared: false, selectedTargetId: null, windageMoa: 0, elevationTrimMoa: 0, zoomIndex: 0 };
}

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

function persist() {
  stage.selectedTargetId = selectedTargetId;
  stage.windageMoa = windageMoa;
  stage.elevationTrimMoa = elevationTrimMoa;
  stage.zoomIndex = zoomIndex;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ scenarioIndex, score, bestGroup, shotLog, lastShot, stage, daily: state.daily }));
}

function getScenario() { return scenarios[scenarioIndex % scenarios.length]; }
function getSelectedTarget() { return getScenario().targets.find((t) => t.id === selectedTargetId) || null; }
function getHoverTarget() { return getScenario().targets.find((t) => t.id === hoverTargetId) || null; }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function formatSigned(value, digits = 2) { return `${value >= 0 ? "+" : ""}${value.toFixed(digits)}`; }
function zoomAimBounds(zoom = ZOOM_LEVELS[zoomIndex]) {
  return {
    minX: 0.5 / zoom,
    maxX: 1 - 0.5 / zoom,
    minY: 0.5 / zoom,
    maxY: 1 - 0.5 / zoom
  };
}
function clampAim(aim, zoom = ZOOM_LEVELS[zoomIndex]) {
  const bounds = zoomAimBounds(zoom);
  return {
    x: clamp(aim.x, bounds.minX, bounds.maxX),
    y: clamp(aim.y, bounds.minY, bounds.maxY)
  };
}

function dragLengthFtForDA(densityAltitudeFt) {
  return rifle.bcG1 * 11000 * (1 + (densityAltitudeFt - 5000) / 22000);
}
function timeOfFlightSec(rangeYards, densityAltitudeFt, slopeDeg = 0) {
  const horizontalFt = rangeYards * Math.cos(Math.abs(slopeDeg) * Math.PI / 180) * FT_PER_YARD;
  const dragLengthFt = dragLengthFtForDA(densityAltitudeFt);
  return (dragLengthFt / rifle.muzzleVelocityFps) * (Math.exp(horizontalFt / dragLengthFt) - 1);
}
function gravityDropIn(rangeYards, densityAltitudeFt, slopeDeg = 0) {
  const t = timeOfFlightSec(rangeYards, densityAltitudeFt, slopeDeg);
  return 0.5 * GRAVITY_FTPS2 * t * t * INCHES_PER_FOOT;
}
function elevationSolutionMoa(rangeYards, densityAltitudeFt, slopeDeg = 0) {
  const zeroDropIn = gravityDropIn(rifle.zeroRangeYards, densityAltitudeFt, 0);
  const zeroSlopeInPerFt = zeroDropIn / (rifle.zeroRangeYards * FT_PER_YARD);
  const rangeDropIn = gravityDropIn(rangeYards, densityAltitudeFt, slopeDeg);
  return (rangeDropIn - zeroSlopeInPerFt * rangeYards * FT_PER_YARD) / (1.047 * (rangeYards / 100));
}
function impactVelocityFps(rangeYards, densityAltitudeFt, slopeDeg = 0) {
  const horizontalFt = rangeYards * Math.cos(Math.abs(slopeDeg) * Math.PI / 180) * FT_PER_YARD;
  return rifle.muzzleVelocityFps * Math.exp(-horizontalFt / dragLengthFtForDA(densityAltitudeFt));
}
function impactEnergyFtLb(velocityFps) {
  return (rifle.weightGrains * velocityFps * velocityFps) / 450240;
}
function windDriftMoa(windMph, rangeYards, densityAltitudeFt, slopeDeg = 0) {
  const tof = timeOfFlightSec(rangeYards, densityAltitudeFt, slopeDeg);
  const windFps = windMph * 1.46667;
  const driftIn = windFps * tof * INCHES_PER_FOOT * WIND_COUPLING;
  return driftIn / (1.047 * (rangeYards / 100));
}
function moaToInches(moa, yards) { return moa * 1.047 * (yards / 100); }
function baselineDope(scenario) { return elevationSolutionMoa(scenario.distanceYards, scenario.densityAltitudeFt, 0); }
function actualDope(scenario, atmosphere) { return elevationSolutionMoa(scenario.distanceYards, scenario.densityAltitudeFt, scenario.slopeDeg) + atmosphere.thermal; }

function seedFromScenario(scenario) {
  return scenario.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) + Number(DAILY_KEY.replaceAll("-", ""));
}
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function seededAtmosphere(scenario) {
  const rng = mulberry32(seedFromScenario(scenario));
  const gust = (rng() - 0.5) * scenario.gustMph * 2;
  const zoneWinds = scenario.windZonesMph.map((zone) => zone + gust * (0.5 + rng() * 0.7));
  return {
    zoneWinds,
    actualWind: zoneWinds[0] * 0.2 + zoneWinds[1] * 0.35 + zoneWinds[2] * 0.45,
    thermal: (rng() - 0.5) * 0.18 + scenario.thermalBiasMoa,
    lullBias: 0.9 + rng() * 0.18
  };
}

function projectTarget(target, aimX = viewAim.x, aimY = viewAim.y, zoom = ZOOM_LEVELS[zoomIndex]) {
  const width = els.scopeCanvas.width;
  const height = els.scopeCanvas.height;
  return {
    x: width / 2 + (target.x - aimX) * width * zoom,
    y: height / 2 + (target.y - aimY) * height * zoom,
    radius: (36 + target.scale * 22) * zoom * 0.72
  };
}

function updateSceneTransform() {
  const zoom = ZOOM_LEVELS[zoomIndex];
  const width = els.scopeCanvas.clientWidth || els.scopeCanvas.width;
  const height = els.scopeCanvas.clientHeight || els.scopeCanvas.height;
  const tx = width * zoom * (0.5 - viewAim.x);
  const ty = height * zoom * (0.5 - viewAim.y);
  els.sceneImage.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
}

function updateScenarioUI() {
  const scenario = getScenario();
  const missionTarget = scenario.targets.find((t) => t.id === scenario.missionTargetId);
  const baseDope = baselineDope(scenario);
  const tof = timeOfFlightSec(scenario.distanceYards, scenario.densityAltitudeFt, scenario.slopeDeg);
  const impactVelocity = impactVelocityFps(scenario.distanceYards, scenario.densityAltitudeFt, scenario.slopeDeg);

  els.stageName.textContent = `#${scenarioIndex + 1}`;
  els.scenarioDistance.textContent = `${scenario.distanceYards} yd`;
  els.shotsRemainingValue.textContent = String(stage.shotsRemaining);
  els.courseProgressValue.textContent = `${stage.clearedIds.length} / ${scenarios.length}`;
  els.scenarioName.textContent = scenario.name;
  els.missionTag.textContent = `Target: ${scenario.targetAnimal}`;
  els.sceneImage.src = scenario.image;
  els.locationTag.textContent = scenario.location;
  els.conditionsTag.textContent = scenario.light;
  els.objectiveTitle.textContent = scenario.objectiveTitle;
  els.objectiveCopy.textContent = scenario.objectiveCopy;
  els.targetAnimalValue.textContent = scenario.targetAnimal;
  els.targetPlateValue.textContent = missionTarget?.plate || "—";
  els.densityAltitudeValue.textContent = `${scenario.densityAltitudeFt.toLocaleString()} ft`;
  els.slopeValue.textContent = `${scenario.slopeDeg > 0 ? "+" : ""}${scenario.slopeDeg}°`;
  els.mirageHint.textContent = scenario.mirage;
  els.flagsHint.textContent = scenario.flags;
  els.terrainHint.textContent = scenario.terrain;
  els.rifleName.textContent = `${rifle.name} / ${rifle.barrel}`;
  els.rifleLoad.textContent = rifle.load;
  els.zeroValue.textContent = `${rifle.zeroRangeYards} yd`;
  els.muzzleVelocityValue.textContent = `${rifle.muzzleVelocityFps} fps`;
  els.bcValue.textContent = `G1 ${rifle.bcG1.toFixed(3)}`;
  els.baseDopeValue.textContent = `${baseDope.toFixed(1)} MOA`;
  els.windUnitValue.textContent = `${windDriftMoa(1, scenario.distanceYards, scenario.densityAltitudeFt, scenario.slopeDeg).toFixed(2)} MOA`;
  els.tofValue.textContent = `${tof.toFixed(2)} s`;
  els.impactVelocityValue.textContent = `${impactVelocity.toFixed(0)} fps`;
  els.impactEnergyValue.textContent = `${impactEnergyFtLb(impactVelocity).toFixed(0)} ft-lb`;

  desiredAim = clampAim({ x: missionTarget.x, y: missionTarget.y });
  smoothAim = { ...desiredAim };
  viewAim = { ...desiredAim };
  updateZoomButtons();
  updateDialReadouts();
  updateStatusLabels();
  renderShotReport();
  updateSceneTransform();
}

function updateZoomButtons() {
  els.zoomButtons.forEach((button, index) => button.classList.toggle("active", index === zoomIndex));
}

function updateDialReadouts() {
  const scenario = getScenario();
  const baseDope = baselineDope(scenario);
  const selectedTarget = getSelectedTarget();
  const hoverTarget = getHoverTarget();
  const totalElevation = baseDope + elevationTrimMoa;

  els.windDialValue.textContent = `${Math.abs(windageMoa).toFixed(2)} MOA`;
  els.windLabel.textContent = windageMoa === 0 ? "Center" : `${windageMoa > 0 ? "Right" : "Left"} ${Math.abs(windageMoa).toFixed(2)} MOA`;
  els.elevationDialValue.textContent = `${totalElevation.toFixed(2)} MOA`;
  els.elevationLabel.textContent = `${formatSigned(elevationTrimMoa)} MOA trim`;
  els.windCallReadout.textContent = `${windageMoa >= 0 ? "R" : "L"} ${Math.abs(windageMoa).toFixed(2)} MOA`;
  els.elevationReadout.textContent = `${totalElevation.toFixed(2)} MOA total`;
  els.selectedTargetValue.textContent = selectedTarget ? selectedTarget.animal : "None";
  els.hoverTargetValue.textContent = hoverTarget ? hoverTarget.animal : "None";
}

function updateStatusLabels() {
  const scenario = getScenario();
  const selectedTarget = getSelectedTarget();
  const hoverTarget = getHoverTarget();

  els.stageResultValue.textContent = stage.currentCleared ? "Cleared" : stage.shotsRemaining === 0 ? "Retry" : "Live";

  if (stage.currentCleared) {
    els.missionStatusTag.textContent = "Stage cleared";
    els.stepLabel.textContent = "Advance to next lane";
    els.scopeTip.textContent = "Good shot. Move to the next stage.";
    els.nextScenarioBtn.textContent = scenarioIndex === scenarios.length - 1 ? "Run course again" : "Next stage";
  } else if (stage.shotsRemaining === 0) {
    els.missionStatusTag.textContent = "Retry stage";
    els.stepLabel.textContent = "Review and rerun";
    els.scopeTip.textContent = "No rounds left. Review the miss and retry.";
    els.nextScenarioBtn.textContent = "Retry stage";
  } else if (breathActive) {
    els.missionStatusTag.textContent = "Send it clean";
    els.stepLabel.textContent = "Release in the green band";
    els.scopeTip.textContent = selectedTarget ? `Hold on the ${selectedTarget.animal.toLowerCase()} and let the reticle settle.` : "No locked target yet. You can still fire, but it probably deserves the miss.";
    els.nextScenarioBtn.textContent = "Stage live";
  } else if (!selectedTarget) {
    els.missionStatusTag.textContent = hoverTarget ? "Target under reticle" : "Search lane";
    els.stepLabel.textContent = "Find → Click → Dial → Fire";
    els.scopeTip.textContent = hoverTarget ? `Reticle is on ${hoverTarget.animal.toLowerCase()}. Click to lock it.` : `Move the scope onto the ${scenario.targetAnimal.toLowerCase()} and click to lock.`;
    els.nextScenarioBtn.textContent = "Stage live";
  } else {
    els.missionStatusTag.textContent = "Dial and fire";
    els.stepLabel.textContent = "Dial → Hold → Fire";
    els.scopeTip.textContent = `Locked target: ${selectedTarget.animal}. Fine-tune the turrets and break the shot.`;
    els.nextScenarioBtn.textContent = "Stage live";
  }

  if (!lastShot || lastShot.scenarioId !== scenario.id) {
    els.gradePill.textContent = stage.currentCleared ? "Cleared" : "Waiting";
    els.impactReadout.textContent = "Awaiting shot";
  }
}

function scoreShot(distanceInches, targetCorrect) {
  if (!targetCorrect) return { score: 0, grade: "wrong plate" };
  if (distanceInches < 2) return { score: 10, grade: "center-punch" };
  if (distanceInches < 5) return { score: 8, grade: "clean hit" };
  if (distanceInches < 9) return { score: 5, grade: "edge hit" };
  return { score: 0, grade: "miss" };
}

function buildNarrative({ scenario, selectedTarget, targetCorrect, windErrorMoa, elevationErrorMoa, executionErrorMoa, result, atmosphere }) {
  if (!selectedTarget) return "No locked plate. In a real class, that would get you a look from the instructor before the trigger break.";
  if (!targetCorrect) return `You locked the ${selectedTarget.animal.toLowerCase()}, but the mission steel was the ${scenario.targetAnimal.toLowerCase()}. The shot process failed before the trigger.`;
  const spotterCall = result.score >= 8
    ? "Spotter: impact good — send another exactly like that if needed."
    : Math.abs(windErrorMoa) > Math.abs(elevationErrorMoa + executionErrorMoa)
      ? `Spotter: ${Math.abs(windErrorMoa).toFixed(1)} MOA ${windErrorMoa > 0 ? "more right" : "more left"}.`
      : `Spotter: ${Math.abs(elevationErrorMoa + executionErrorMoa).toFixed(1)} MOA ${elevationErrorMoa + executionErrorMoa > 0 ? "more up" : "more down"}.`;
  const lines = [`The lane averaged ${atmosphere.actualWind.toFixed(1)} mph effective wind across the three zones.`];
  lines.push(spotterCall);
  lines.push(Math.abs(windErrorMoa) > 0.18 ? `Windage was ${formatSigned(windErrorMoa)} MOA off.` : "Windage was close enough to win.");
  lines.push(Math.abs(elevationErrorMoa) > 0.2 ? `Elevation was ${formatSigned(elevationErrorMoa)} MOA off the needed dope.` : "Elevation was basically there.");
  if (Math.abs(executionErrorMoa) > 0.16) lines.push("The release added a little vertical spread.");
  lines.push(result.score >= 8 ? "That feels like real school steel work." : `At ${scenario.distanceYards} yards, small misses compound fast.`);
  return lines.join(" ");
}

function fireShot() {
  if (stage.currentCleared || stage.shotsRemaining <= 0) return;
  const scenario = getScenario();
  const selectedTarget = getSelectedTarget();
  const atmosphere = seededAtmosphere(scenario);
  const holdSeconds = (performance.now() - holdStart) / 1000;
  const settleBonus = Math.min(1, holdSeconds / 1.6);
  const breathError = Math.abs(currentBreathValue - 0.55) * 1.6;
  const reticleOffsetX = (viewAim.x - desiredAim.x) * 6.5;
  const reticleOffsetY = (viewAim.y - desiredAim.y) * 6.5;
  const executionErrorMoa = breathError * 0.3 - settleBonus * 0.11 + reticleOffsetY * 0.08;
  const targetCorrect = selectedTarget && selectedTarget.id === scenario.missionTargetId;

  const actualWindMoa = windDriftMoa(atmosphere.actualWind * atmosphere.lullBias, scenario.distanceYards, scenario.densityAltitudeFt, scenario.slopeDeg);
  const windErrorMoa = actualWindMoa - windageMoa + reticleOffsetX * 0.08;
  const calledElevation = baselineDope(scenario) + elevationTrimMoa;
  const neededElevation = actualDope(scenario, atmosphere);
  const elevationErrorMoa = neededElevation - calledElevation;
  const totalVerticalMoa = elevationErrorMoa + executionErrorMoa;

  const impactX = moaToInches(windErrorMoa, scenario.distanceYards);
  const impactY = moaToInches(totalVerticalMoa, scenario.distanceYards);
  const distance = Math.hypot(impactX, impactY);
  const result = scoreShot(distance, Boolean(targetCorrect));

  lastShot = {
    scenarioId: scenario.id,
    selectedTargetId,
    targetCorrect,
    actualWindMph: atmosphere.actualWind,
    windErrorMoa,
    elevationErrorMoa,
    executionErrorMoa,
    impactX,
    impactY,
    distance,
    result,
    atmosphere,
    narrative: buildNarrative({ scenario, selectedTarget, targetCorrect, windErrorMoa, elevationErrorMoa, executionErrorMoa, result, atmosphere })
  };

  stage.shotsRemaining -= 1;
  if (result.score >= 8 && targetCorrect) {
    stage.currentCleared = true;
    if (!stage.clearedIds.includes(scenario.id)) stage.clearedIds.push(scenario.id);
  }

  score += result.score;
  bestGroup = bestGroup === null ? distance : Math.min(bestGroup, distance);
  state.daily = { key: DAILY_KEY, lastPlayed: DAILY_KEY, best: Math.max(state.daily?.best || 0, result.score), streak: 1 };
  shotLog = [{ label: `${scenario.name}: ${result.grade}`, detail: `${selectedTarget ? selectedTarget.animal : "No lock"} / ${impactX.toFixed(1)}\" horiz / ${impactY.toFixed(1)}\" vert` }, ...shotLog].slice(0, 10);

  replayPhase = 0;
  impactFlash = 1;
  renderShotReport();
  updateStatusLabels();
  persist();
  els.tutorialStatus.textContent = stage.currentCleared ? "Cleared. That one feels like real steel." : stage.shotsRemaining > 0 ? "Make the correction and send your next round." : "Out of rounds. Reset the lane and run it again.";
}

function renderShotReport() {
  els.scoreValue.textContent = String(score);
  els.bestGroupValue.textContent = bestGroup === null ? "—" : `${bestGroup.toFixed(1)}\"`;
  els.shotLog.innerHTML = shotLog.map((entry) => `<li><strong>${entry.label}</strong><br/>${entry.detail}</li>`).join("");
  if (!lastShot || lastShot.scenarioId !== getScenario().id) {
    els.actualWindValue.textContent = "—";
    els.windErrorValue.textContent = "—";
    els.verticalErrorValue.textContent = "—";
    els.impactValue.textContent = "—";
    els.replayNarrative.textContent = "The scope stays up. The writing just tells you what mattered.";
    return;
  }
  els.actualWindValue.textContent = `${lastShot.actualWindMph.toFixed(1)} mph`;
  els.windErrorValue.textContent = `${formatSigned(lastShot.windErrorMoa)} MOA`;
  els.verticalErrorValue.textContent = `${formatSigned(lastShot.elevationErrorMoa + lastShot.executionErrorMoa)} MOA`;
  els.impactValue.textContent = `${lastShot.distance.toFixed(1)}\" off`;
  els.replayNarrative.textContent = lastShot.narrative;
  els.gradePill.textContent = lastShot.result.grade;
  els.impactReadout.textContent = lastShot.result.grade;
}

function adjustTurret(kind, deltaClicks) {
  if (stage.currentCleared || stage.shotsRemaining <= 0) return;
  if (kind === "wind") windageMoa = clamp(windageMoa + deltaClicks * CLICK_MOA, -WINDAGE_LIMIT_MOA, WINDAGE_LIMIT_MOA);
  else elevationTrimMoa = clamp(elevationTrimMoa + deltaClicks * CLICK_MOA, -ELEVATION_TRIM_LIMIT_MOA, ELEVATION_TRIM_LIMIT_MOA);
  updateDialReadouts();
  updateStatusLabels();
  persist();
}

function setZoom(nextIndex) {
  zoomIndex = clamp(nextIndex, 0, ZOOM_LEVELS.length - 1);
  desiredAim = clampAim(desiredAim);
  smoothAim = clampAim(smoothAim);
  viewAim = clampAim(viewAim);
  updateZoomButtons();
  updateSceneTransform();
  persist();
}

function resetStage() {
  stage.shotsRemaining = ROUND_LIMIT;
  stage.currentCleared = false;
  selectedTargetId = null;
  windageMoa = 0;
  elevationTrimMoa = 0;
  zoomIndex = 0;
  lastShot = null;
  replayPhase = 0;
  els.tutorialStatus.textContent = "Move the rifle onto the right animal, click to lock, then dial your correction.";
  updateScenarioUI();
  persist();
}

function advanceOrRetry() {
  if (stage.currentCleared) scenarioIndex = (scenarioIndex + 1) % scenarios.length;
  resetStage();
}

function armShot() {
  if (stage.currentCleared || stage.shotsRemaining <= 0) return;
  breathActive = true;
  holdStart = performance.now();
  els.fireBtn.classList.add("armed");
  updateStatusLabels();
}
function releaseShot() {
  if (!breathActive) return;
  breathActive = false;
  els.fireBtn.classList.remove("armed");
  fireShot();
}

function animateBreath() {
  breathPhase += 0.022;
  currentBreathValue = 0.5 + Math.sin(breathPhase) * 0.42;
  els.breathIndicator.style.top = `${currentBreathValue * 100}%`;
  const inZone = currentBreathValue > 0.46 && currentBreathValue < 0.64;
  els.breathReadout.textContent = inZone ? "calm band" : currentBreathValue <= 0.46 ? "emptying" : "rising";
  requestAnimationFrame(animateBreath);
}

function canvasPoint(event) {
  const rect = els.scopeCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * els.scopeCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * els.scopeCanvas.height,
    nx: (event.clientX - rect.left) / rect.width,
    ny: (event.clientY - rect.top) / rect.height
  };
}

function updateDesiredAim(event) {
  const point = canvasPoint(event);
  const dx = point.nx - 0.5;
  const dy = point.ny - 0.5;
  if (Math.hypot(dx, dy) > 0.46) return;
  const range = 0.22 / ZOOM_LEVELS[zoomIndex];
  desiredAim = clampAim({
    x: viewAim.x + dx * range * 2.2,
    y: viewAim.y + dy * range * 2.2
  });
}

function lockHoverTarget() {
  if (stage.currentCleared || stage.shotsRemaining <= 0) return;
  if (hoverTargetId) {
    selectedTargetId = hoverTargetId;
    updateDialReadouts();
    updateStatusLabels();
    persist();
  }
}

function updateAimModel() {
  scopeTime += 0.016;
  smoothAim.x = lerp(smoothAim.x, desiredAim.x, 0.08);
  smoothAim.y = lerp(smoothAim.y, desiredAim.y, 0.08);

  const holdSeconds = breathActive ? (performance.now() - holdStart) / 1000 : 0;
  const settle = breathActive ? Math.min(1, holdSeconds / 1.5) : 0;
  const swayAmp = breathActive ? 0.008 - settle * 0.005 : 0.012;
  const swayX = Math.sin(scopeTime * 1.8) * swayAmp + Math.sin(scopeTime * 3.9) * swayAmp * 0.35;
  const swayY = Math.cos(scopeTime * 1.4) * swayAmp * 0.9 + Math.sin(scopeTime * 2.8) * swayAmp * 0.28;

  const bounds = zoomAimBounds();
  viewAim.x = clamp(smoothAim.x + swayX, bounds.minX, bounds.maxX);
  viewAim.y = clamp(smoothAim.y + swayY, bounds.minY, bounds.maxY);
  updateSceneTransform();

  const centerX = els.scopeCanvas.width / 2;
  const centerY = els.scopeCanvas.height / 2;
  const scenario = getScenario();
  let best = null;
  let bestDist = Infinity;
  for (const target of scenario.targets) {
    const projected = projectTarget(target);
    const dist = Math.hypot(projected.x - centerX, projected.y - centerY);
    if (dist < projected.radius && dist < bestDist) {
      best = target.id;
      bestDist = dist;
    }
  }
  hoverTargetId = best;
  updateDialReadouts();
  updateStatusLabels();
}

function drawReticle(width, height, radius) {
  const cx = width / 2;
  const cy = height / 2;
  ctx.strokeStyle = "rgba(245, 240, 229, 0.88)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - radius, cy);
  ctx.lineTo(cx + radius, cy);
  ctx.moveTo(cx, cy - radius);
  ctx.lineTo(cx, cy + radius);
  ctx.stroke();

  ctx.lineWidth = 1.2;
  for (let i = 1; i <= 8; i++) {
    const step = radius * 0.08 * i;
    const tick = i % 2 === 0 ? 18 : 9;
    [[cx - step, cy], [cx + step, cy]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.moveTo(x, y - tick); ctx.lineTo(x, y + tick); ctx.stroke();
    });
    [[cx, cy - step], [cx, cy + step]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.moveTo(x - tick, y); ctx.lineTo(x + tick, y); ctx.stroke();
    });
    if (i <= 4) {
      ctx.fillStyle = "rgba(245, 240, 229, 0.78)";
      ctx.font = "500 12px IBM Plex Mono";
      ctx.fillText(String(i), cx + step + 6, cy - 8);
      ctx.fillText(String(i), cx + 6, cy + step - 4);
    }
  }

  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    const drop = radius * 0.1 * i;
    const spread = 10 + i * 6;
    ctx.beginPath();
    ctx.moveTo(cx - spread, cy + drop);
    ctx.lineTo(cx + spread, cy + drop);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(245, 240, 229, 0.96)";
  ctx.beginPath();
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, Math.PI * 2);
  ctx.stroke();
}

function drawAnimal(target, selected, mission) {
  const { x, y, radius } = projectTarget(target);
  const s = target.scale * 34 * ZOOM_LEVELS[zoomIndex];
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = mission ? "rgba(246, 211, 161, 0.98)" : "rgba(26, 22, 19, 0.8)";
  ctx.lineWidth = 2.5;
  const platePath = new Path2D();
  if (target.id === "ram") {
    platePath.moveTo(-0.7 * s, 0.28 * s); platePath.lineTo(-0.36 * s, -0.14 * s); platePath.lineTo(0.16 * s, -0.14 * s);
    platePath.arc(0.46 * s, -0.34 * s, 0.24 * s, Math.PI * 0.12, Math.PI * 1.86, true);
    platePath.lineTo(0.3 * s, -0.02 * s); platePath.lineTo(0.52 * s, 0.3 * s); platePath.lineTo(0.14 * s, 0.34 * s); platePath.lineTo(-0.16 * s, 0.5 * s); platePath.lineTo(-0.4 * s, 0.48 * s); platePath.closePath();
  } else if (target.id === "deer") {
    platePath.moveTo(-0.76 * s, 0.22 * s); platePath.lineTo(-0.44 * s, -0.12 * s); platePath.lineTo(0.28 * s, -0.12 * s); platePath.lineTo(0.52 * s, -0.34 * s); platePath.lineTo(0.66 * s, -0.34 * s); platePath.lineTo(0.48 * s, -0.06 * s); platePath.lineTo(0.68 * s, 0.08 * s); platePath.lineTo(0.4 * s, 0.24 * s); platePath.lineTo(0.12 * s, 0.46 * s); platePath.lineTo(-0.4 * s, 0.46 * s); platePath.closePath();
    platePath.moveTo(0.54 * s, -0.34 * s); platePath.lineTo(0.68 * s, -0.64 * s); platePath.moveTo(0.5 * s, -0.28 * s); platePath.lineTo(0.86 * s, -0.56 * s);
  } else if (target.id === "pronghorn") {
    platePath.moveTo(-0.72 * s, 0.24 * s); platePath.lineTo(-0.42 * s, -0.08 * s); platePath.lineTo(0.22 * s, -0.08 * s); platePath.lineTo(0.5 * s, -0.24 * s); platePath.lineTo(0.72 * s, 0.04 * s); platePath.lineTo(0.5 * s, 0.24 * s); platePath.lineTo(0.18 * s, 0.46 * s); platePath.lineTo(-0.36 * s, 0.46 * s); platePath.closePath();
    platePath.moveTo(0.54 * s, -0.22 * s); platePath.lineTo(0.62 * s, -0.56 * s); platePath.moveTo(0.5 * s, -0.2 * s); platePath.lineTo(0.84 * s, -0.48 * s);
  } else {
    platePath.moveTo(-0.78 * s, 0.24 * s); platePath.lineTo(-0.42 * s, -0.06 * s); platePath.lineTo(0.24 * s, -0.06 * s); platePath.lineTo(0.62 * s, 0.08 * s); platePath.lineTo(0.34 * s, 0.26 * s); platePath.lineTo(0.18 * s, 0.44 * s); platePath.lineTo(-0.42 * s, 0.44 * s); platePath.closePath();
  }

  ctx.strokeStyle = "rgba(20, 17, 15, 0.55)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-0.22 * s, -0.54 * s);
  ctx.lineTo(-0.08 * s, -0.16 * s);
  ctx.moveTo(0.18 * s, -0.56 * s);
  ctx.lineTo(0.08 * s, -0.18 * s);
  ctx.stroke();
  ctx.fillStyle = "rgba(18, 14, 12, 0.26)";
  ctx.beginPath();
  ctx.ellipse(0, 0.58 * s, 0.85 * s, 0.22 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  const steel = ctx.createLinearGradient(-0.8 * s, -0.5 * s, 0.8 * s, 0.6 * s);
  steel.addColorStop(0, selected ? "rgba(248, 238, 224, 0.98)" : "rgba(218, 223, 228, 0.96)");
  steel.addColorStop(0.45, selected ? "rgba(222, 208, 184, 0.96)" : "rgba(171, 177, 182, 0.96)");
  steel.addColorStop(1, selected ? "rgba(185, 166, 144, 0.96)" : "rgba(116, 123, 129, 0.96)");
  ctx.fillStyle = steel;
  ctx.fill(platePath);
  ctx.strokeStyle = mission ? "rgba(246, 211, 161, 0.98)" : "rgba(26, 22, 19, 0.8)";
  ctx.lineWidth = 2.5;
  ctx.stroke(platePath);
  ctx.save();
  ctx.clip(platePath);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(-0.7 * s, -0.5 * s, 0.2 * s, 1.1 * s);
  ctx.restore();

  if (selected) {
    ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.strokeStyle = "rgba(136, 184, 214, 0.98)"; ctx.lineWidth = 3; ctx.stroke();
  }
  ctx.restore();
}

function drawScope() {
  const { width, height } = els.scopeCanvas;
  ctx.clearRect(0, 0, width, height);
  updateAimModel();

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.44;

  ctx.fillStyle = "rgba(0,0,0,0.62)";
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  const vignette = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.1);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = vignette;
  ctx.beginPath(); ctx.arc(cx, cy, radius * 1.01, 0, Math.PI * 2); ctx.fill();

  ctx.strokeStyle = "rgba(255,244,225,0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();

  if (impactFlash > 0.01) {
    ctx.fillStyle = `rgba(255, 248, 214, ${impactFlash * 0.09})`;
    ctx.beginPath(); ctx.arc(cx, cy, radius * 0.98, 0, Math.PI * 2); ctx.fill();
    impactFlash *= 0.92;
  }

  getScenario().targets.forEach((target) => drawAnimal(target, target.id === selectedTargetId, target.id === getScenario().missionTargetId && stage.currentCleared));
  drawReticle(width, height, radius);

  if (hoverTargetId && !selectedTargetId) {
    const projected = projectTarget(getHoverTarget());
    ctx.strokeStyle = "rgba(246, 211, 161, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(projected.x, projected.y, projected.radius + 8, 0, Math.PI * 2); ctx.stroke();
  }

  if (lastShot && lastShot.scenarioId === getScenario().id && lastShot.selectedTargetId) {
    const target = getScenario().targets.find((entry) => entry.id === lastShot.selectedTargetId);
    if (target) {
      const projected = projectTarget(target);
      const impactX = projected.x + lastShot.impactX * 2.8;
      const impactY = projected.y - lastShot.impactY * 2.8;
      replayPhase = Math.min(1, replayPhase + 0.03);
      const traceX = cx + (impactX - cx) * replayPhase;
      const traceY = cy + (impactY - cy) * replayPhase;
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = "rgba(161, 212, 241, 0.96)";
      ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(traceX, traceY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255, 228, 188, 0.96)";
      ctx.beginPath(); ctx.arc(impactX, impactY, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath(); ctx.arc(impactX, impactY, 16, 0, Math.PI * 2); ctx.stroke();
    }
  }

  ctx.fillStyle = "rgba(15, 13, 11, 0.76)";
  ctx.fillRect(22, height - 56, 346, 34);
  ctx.fillStyle = "rgba(255, 241, 222, 0.96)";
  ctx.font = "600 18px IBM Plex Mono";
  ctx.fillText(`${getScenario().distanceYards} yd / ${ZOOM_LEVELS[zoomIndex].toFixed(2)}x scene zoom`, 34, height - 33);
  requestAnimationFrame(drawScope);
}

function bindTurrets() {
  document.querySelectorAll(".turret-btn").forEach((button) => button.addEventListener("click", () => adjustTurret(button.dataset.turret, Number(button.dataset.delta))));
}
function bindZoom() {
  els.zoomButtons.forEach((button, index) => button.addEventListener("click", () => setZoom(index)));
}

function playtestShot({ scenario = scenarioIndex, targetId, wind = 0, elevation = 0, zoom = 2, settleSeconds = 1.9 } = {}) {
  scenarioIndex = clamp(scenario, 0, scenarios.length - 1);
  resetStage();
  setZoom(zoom);
  selectedTargetId = targetId || getScenario().missionTargetId;
  desiredAim = clampAim({ x: getScenario().targets.find((t) => t.id === selectedTargetId).x, y: getScenario().targets.find((t) => t.id === selectedTargetId).y });
  smoothAim = { ...desiredAim };
  viewAim = { ...desiredAim };
  windageMoa = wind;
  elevationTrimMoa = elevation;
  currentBreathValue = 0.55;
  holdStart = performance.now() - settleSeconds * 1000;
  breathActive = false;
  updateDialReadouts();
  fireShot();
  return {
    scenario: getScenario().name,
    target: selectedTargetId,
    grade: lastShot?.result?.grade,
    score: lastShot?.result?.score,
    distanceInches: lastShot?.distance,
    windErrorMoa: lastShot?.windErrorMoa,
    verticalErrorMoa: lastShot ? lastShot.elevationErrorMoa + lastShot.executionErrorMoa : null
  };
}

window.quietHandsTest = {
  playtestShot,
  getState: () => ({
    scenario: getScenario().name,
    selectedTargetId,
    hoverTargetId,
    windageMoa,
    elevationTrimMoa,
    zoomIndex,
    lastShot,
    stage: { ...stage }
  })
};

els.scopeCanvas.addEventListener("mousemove", updateDesiredAim);
els.scopeCanvas.addEventListener("click", lockHoverTarget);
els.nextScenarioBtn.addEventListener("click", advanceOrRetry);
els.fireBtn.addEventListener("pointerdown", armShot);
els.fireBtn.addEventListener("pointerup", releaseShot);
els.fireBtn.addEventListener("pointerleave", () => { if (breathActive) releaseShot(); });

bindTurrets();
bindZoom();
updateScenarioUI();
animateBreath();
drawScope();
persist();
