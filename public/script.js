async function searchUsers() {
  const avail = document.getElementById('availability').value;
  const res = await fetch(`/api/users?availability=${avail}`);
  const users = await res.json();

  const container = document.getElementById('profiles');
  container.innerHTML = '';

  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'profile';
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Skills Offered:</strong> ${user.skillsOffered.join(', ')}</p>
      <p><strong>Skills Wanted:</strong> ${user.skillsWanted.join(', ')}</p>
      <p><strong>Rating:</strong> ${user.rating}/5</p>
      <button onclick="alert('Request sent to ${user.name}')">Request</button>
    `;
    container.appendChild(div);
  });
}
