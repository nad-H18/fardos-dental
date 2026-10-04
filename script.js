const products = [
  {n:"Digital dental chair unit", c:"chairs", i:"🪑", d:"Ergonomic chair with integrated light, delivery system and memory positions."},
  {n:"Portable treatment unit", c:"chairs", i:"🧰", d:"Compact unit for mobile clinics and school programs."},
  {n:"Intraoral X-ray sensor", c:"imaging", i:"🩻", d:"High-resolution digital sensor with fast image capture."},
  {n:"Panoramic X-ray system", c:"imaging", i:"📷", d:"Full-arch panoramic imaging with low-dose settings."},
  {n:"Class B autoclave", c:"sterilization", i:"♨️", d:"Vacuum steam sterilizer for wrapped and hollow instruments."},
  {n:"Ultrasonic cleaner", c:"sterilization", i:"🫧", d:"Removes debris from instruments before sterilization."},
  {n:"High-speed handpiece", c:"instruments", i:"🦷", d:"Fiber-optic turbine with anti-retraction valve."},
  {n:"LED curing light", c:"instruments", i:"💡", d:"Cordless light for fast, even composite curing."}
];

const grid = document.getElementById("grid");
function render(filter){
  grid.innerHTML = "";
  products.filter(p => filter === "all" || p.c === filter).forEach(p => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `<div class="icon" aria-hidden="true">${p.i}</div><h3>${p.n}</h3><p>${p.d}</p><a href="#contact" data-item="${p.n}">Ask for a price</a>`;
    grid.appendChild(el);
  });
}
render("all");

document.querySelectorAll(".chip").forEach(btn => btn.addEventListener("click", () => {
  document.querySelector(".chip.active").classList.remove("active");
  btn.classList.add("active");
  render(btn.dataset.filter);
}));

grid.addEventListener("click", e => {
  const item = e.target.dataset && e.target.dataset.item;
  if(item){ document.querySelector("textarea[name=msg]").value = `I would like a price for: ${item}.`; }
});

const menuBtn = document.querySelector(".menu-btn"), menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", () => { menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); });

document.getElementById("quote").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, s = document.getElementById("status");
  if(!f.name.value.trim() || !/^\S+@\S+\.\S+$/.test(f.email.value) || !f.msg.value.trim()){
    s.className = "err"; s.textContent = "Enter your name, a valid email, and your request."; return;
  }
  s.className = "ok"; s.textContent = "Request sent. We will reply within one working day.";
  f.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
