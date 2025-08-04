const users = [];
let currentUser = null;
const flashcards = {};

function registerUser() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (!name || !email || !password) return alert("Please fill in all fields");

  if (users.some(user => user.email === email)) return alert("User already exists");

  users.push({ name, email, password, cards: [] });
  alert("Registration successful! Now login.");
}

function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return alert("Invalid login credentials");

  currentUser = user;
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("main-app").style.display = "block";
  renderFlashcards();
}

function logoutUser() {
  currentUser = null;
  document.getElementById("auth-section").style.display = "flex";
  document.getElementById("main-app").style.display = "none";
}

function addFlashcard() {
  const front = document.getElementById("front").value;
  const back = document.getElementById("back").value;

  if (!front || !back) return;

  currentUser.cards.push({ front, back });
  renderFlashcards();
  document.getElementById("front").value = '';
  document.getElementById("back").value = '';
}

function renderFlashcards() {
  const container = document.getElementById("flashcards");
  container.innerHTML = '';

  if (!currentUser) return;

  currentUser.cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card.front;

    div.addEventListener("click", () => {
      if (div.classList.contains("flipped")) {
        div.textContent = card.front;
        div.classList.remove("flipped");
      } else {
        div.textContent = card.back;
        div.classList.add("flipped");
      }
    });

    container.appendChild(div);
  });
}

function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return alert("Invalid login credentials");

  currentUser = user;
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("main-app").style.display = "block";
  updateProfile(); // Show profile
  renderFlashcards();
}

function updateProfile() {
  document.getElementById("profile").style.display = "block";
  document.getElementById("profile-name").textContent = currentUser.name;
  document.getElementById("profile-email").textContent = currentUser.email;
  document.getElementById("profile-card-count").textContent = currentUser.cards.length;
}

function renderFlashcards() {
  const container = document.getElementById("flashcards");
  container.innerHTML = '';

  if (!currentUser) return;

  currentUser.cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card.front;

    div.addEventListener("click", () => {
      if (div.classList.contains("flipped")) {
        div.textContent = card.front;
        div.classList.remove("flipped");
      } else {
        div.textContent = card.back;
        div.classList.add("flipped");
      }
    });

    container.appendChild(div);
  });

  // Update profile card count on change
  document.getElementById("profile-card-count").textContent = currentUser.cards.length;
}
