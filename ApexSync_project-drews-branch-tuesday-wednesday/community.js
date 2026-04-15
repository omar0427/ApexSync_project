const feedKey = "apexsyncCommunityPosts";

const groupsKey = "apexsyncCurrentGroups";


function getPosts() {
  return JSON.parse(localStorage.getItem(feedKey)) || [
    {
      name: "Omar",
      goal: "Build muscle",
      update: "Just finished a strong upper body workout today 💪",
      time: "9 Hours ago"
    },
    {
      name: "Sarah",
      goal: "Consistency",
      update: "Hit my third class this week. Staying locked in!",
      time: "3 days ago"
    },
    {
      name: "Jack",
      goal: " Marthon Training",
      update: " Been training with coach Austin for few months now to prepare for my upcoming Marathon. its been a great journey with him, and I highly recommend to attending his classes every Tuesday and friday at 6:00 pm "
     
    }

    
  ];
}

function savePosts(posts) {
  localStorage.setItem(feedKey, JSON.stringify(posts));
}

function getCurrentGroups() {
  return JSON.parse(localStorage.getItem(groupsKey)) || [];
}

function saveCurrentGroups(groups) {
  localStorage.setItem(groupsKey, JSON.stringify(groups));
}

function renderCommunityFeed() {
  const feed = document.getElementById("communityFeed");
  const posts = getPosts();

  if (!posts.length) {
    feed.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  feed.innerHTML = posts.map(post => `
    <div class="feed-post">
      <h4>${post.name}</h4>
      <p><strong>Goal:</strong> ${post.goal}</p>
      <p>${post.update}</p>
      <small>${post.time}</small>
    </div>
  `).join("");
}

function renderCurrentGroups() {
  const currentGroupsList = document.getElementById("currentGroupsList");
  if (!currentGroupsList) return;

  const groups = getCurrentGroups();

  if (!groups.length) {
    currentGroupsList.innerHTML = `
      <div class="empty-group-message">
        You have not joined any groups yet.
      </div>
    `;
    return;
  }

  currentGroupsList.innerHTML = groups.map(group => `
    <div class="mini-card current-group-card">
      <h4>${group}</h4>
      <p>Active accountability group</p>
    </div>
  `).join("");
}

function addCommunityPost() {
  const name = document.getElementById("communityName").value.trim();
  const goal = document.getElementById("communityGoal").value.trim();
  const update = document.getElementById("communityUpdate").value.trim();

  if (!name || !goal || !update) {
    alert("Please fill in your name, goal, and update.");
    return;
  }

  const posts = getPosts();

  posts.unshift({
    name,
    goal,
    update,
    time: "Just now"
  });

  savePosts(posts);
  renderCommunityFeed();

  document.getElementById("communityName").value = "";
  document.getElementById("communityGoal").value = "";
  document.getElementById("communityUpdate").value = "";

  alert("Your community update has been posted!");
}

function joinGroup(groupName) {
  const groups = getCurrentGroups();

  if (groups.includes(groupName)) {
    alert(`You are already in ${groupName}.`);
    renderCurrentGroups();
    return;
  }

  groups.push(groupName);
  saveCurrentGroups(groups);

  alert(`${groupName} joined successfully! It has been added to My Current Groups.`);
  renderCurrentGroups();
}

function markGoing(eventName) {
  alert(`You marked yourself as going to ${eventName}.`);
}

function connectMember(memberName) {
  alert(`Connection request sent to ${memberName}.`);
}

function joinChallenge() {
  alert("You joined the 7-Day Consistency Challenge!");
}

renderCommunityFeed();
renderCurrentGroups();  