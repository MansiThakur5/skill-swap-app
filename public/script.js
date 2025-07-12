
document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const user = {
    name: document.getElementById('name').value,
    skillsOffered: document.getElementById('skillsOffered').value.split(',').map(s => s.trim()),
    skillsWanted: document.getElementById('skillsWanted').value.split(',').map(s => s.trim()),
    availability: document.getElementById('availability').value,
    rating: parseFloat(document.getElementById('rating').value)
  };

  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(() => {
    searchUsers();
    document.getElementById('userForm').reset();
  });
});

function searchUsers() {
  const avail = document.getElementById('availabilitySearch').value.toLowerCase();
  fetch(`/api/users?availability=${avail}`)
    .then(res => res.json())
    .then(renderUsers)
    .catch(console.error);
}

function renderUsers(users) {
  const container = document.getElementById('profiles');
  container.innerHTML = '';
  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'profile';
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Skills Offered:</strong> ${user.skillsOffered.join(', ')}</p>
      <p><strong>Skills Wanted:</strong> ${user.skillsWanted.join(', ')}</p>
      <p><strong>Availability:</strong> ${user.availability}</p>
      <p><strong>Rating:</strong> ${user.rating}/5</p>
      <button onclick="alert('Request sent to ${user.name}')">Request</button>
    `;
    container.appendChild(div);
  });
}
