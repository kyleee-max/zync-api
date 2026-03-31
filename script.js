// Load data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    renderMembersList(data.members);
    renderLeaderboard(data.leaderboard);
    renderProgressBars(data.progress);
  })
  .catch(error => console.error('Error loading data:', error));

function renderMembersList(members) {
  const membersList = document.getElementById('members-list');
  members.forEach(member => {
    const li = document.createElement('li');
    li.textContent = member.name;
    membersList.appendChild(li);
  });
}

function renderLeaderboard(leaderboard) {
  const table = document.getElementById('leaderboard-table');
  leaderboard.forEach(entry => {
    const row = table.insertRow();
    const cellName = row.insertCell(0);
    const cellScore = row.insertCell(1);
    cellName.textContent = entry.name;
    cellScore.textContent = entry.score;
  });
}

function renderProgressBars(progress) {
  progress.forEach(item => {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = `${item.percentage}%`;
    progressBar.textContent = `${item.name}: ${item.percentage}%`;
    document.getElementById('progress-container').appendChild(progressBar);
  });
}
