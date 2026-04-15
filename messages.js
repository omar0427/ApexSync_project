const conversationsKey = "apexsyncConversations";
const selectedConversationKey = "apexsyncSelectedConversation";

let selectedPerson = null;

function defaultConversations() {
  return [
    {
      name: "Coach Austin",
      role: "Coach",
      status: "Online",
      messages: [
        { sender: "Coach Austin", text: "Nice work this week. Keep your intensity high." },
        { sender: "You", text: "Thanks coach, I’m locked in." }
      ]
    },
    {
      name: "Coach Mike",
      role: "Coach",
      status: "Online",
      messages: [
        { sender: "Coach Mike", text: "Don’t forget your HIIT session tomorrow." }
      ]
    },
    {
      name: "Sarah",
      role: "Member",
      status: "Online",
      messages: [
        { sender: "Sarah", text: "Hey! I’d be down to connect and train together." }
      ]
    },
    {
      name: "Amy",
      role: "Member",
      status: "Offline",
      messages: [
        { sender: "Amy", text: "I’m thinking about joining Yoga Flow this week." }
      ]
    },
    {
      name: "John",
      role: "Member",
      status: "Online",
      messages: [
        { sender: "John", text: "Want to hit weights after class?" }
      ]
    },
    {
      name: "Layla",
      role: "Member",
      status: "Offline",
      messages: [
        { sender: "Layla", text: "I’m trying to stay consistent this month." }
      ]
    }
  ];
}

function getConversations() {
  const saved = JSON.parse(localStorage.getItem(conversationsKey)) || [];
  const defaults = defaultConversations();

  const merged = [...saved];

  defaults.forEach(defaultConvo => {
    const exists = merged.find(c => c.name === defaultConvo.name);
    if (!exists) {
      merged.push(defaultConvo);
    }
  });

  return merged;
}

function saveConversations(conversations) {
  localStorage.setItem(conversationsKey, JSON.stringify(conversations));
}

function renderConversationList() {
  const list = document.getElementById("conversationList");
  const conversations = getConversations();

  if (!conversations.length) {
    list.innerHTML = "<p>No conversations yet.</p>";
    return;
  }

  list.innerHTML = conversations.map(convo => {
  const status = (convo.status || "Offline").toLowerCase();
  const role = convo.role || "Member";

  return `
    <div class="conversation-item" onclick="openConversation('${convo.name.replace(/'/g, "\\'")}')">
      <div class="conversation-top">
        <strong>${convo.name}</strong>
        <span class="status-dot ${status}"></span>
      </div>
      <div class="conversation-role">${role}</div>
      <div class="conversation-preview">
        ${(convo.messages && convo.messages.length) ? convo.messages[convo.messages.length - 1].text : "No messages yet"}
      </div>
    </div>
  `;
}).join(""); 
}

function openConversation(name) {
  selectedPerson = name;
  localStorage.setItem(selectedConversationKey, name);

  const header = document.getElementById("chatHeader");
  const meta = document.getElementById("chatMeta");
  const chatMessages = document.getElementById("chatMessages");
  const conversations = getConversations();

  const convo = conversations.find(c => c.name === name);

  if (!convo) return;

  header.textContent = `Chat with ${name}`;
 meta.innerHTML = `
  <span class="chat-role">${convo.role || "Member"}</span>
  <span class="chat-status">${convo.status || "Offline"}</span>
 `;

  if (!convo.messages || !convo.messages.length) {
    chatMessages.innerHTML = "<p class='empty-chat'>No messages yet.</p>";
    return;
  }

  chatMessages.innerHTML = convo.messages.map(msg => `
    <div class="chat-bubble ${msg.sender === 'You' ? 'my-message' : 'their-message'}">
      <strong>${msg.sender}:</strong> ${msg.text}
    </div>
  `).join("");

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!selectedPerson) {
    alert("Please select a conversation first.");
    return;
  }

  if (!text) return;

  let conversations = getConversations();
  const convoIndex = conversations.findIndex(c => c.name === selectedPerson);

  if (convoIndex === -1) return;

  conversations[convoIndex].messages.push({
    sender: "You",
    text
  });

  const updatedConvo = conversations.splice(convoIndex, 1)[0];
  conversations.unshift(updatedConvo);

  saveConversations(conversations);
  input.value = "";

  renderConversationList();
  openConversation(selectedPerson);
}

function useQuickReply(text) {
  document.getElementById("messageInput").value = text;
}

function initializeMessagesPage() {
  const conversations = getConversations();
  saveConversations(conversations);
  renderConversationList();

  const selected = localStorage.getItem(selectedConversationKey);
  if (selected) {
    openConversation(selected);
  } else if (conversations.length) {
    openConversation(conversations[0].name);
  }
}

initializeMessagesPage();

window.openConversation = openConversation;
window.sendMessage = sendMessage;
window.useQuickReply = useQuickReply; 