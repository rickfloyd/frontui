class SecureChatClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.socket = null;
    this.userId = null;
    this.username = null;
    this.messageCallback = null;
    this.warningCallback = null;
  }

  connect(userId, username) {
    return new Promise((resolve, reject) => {
      this.userId = userId;
      this.username = username;
      this.socket = io(this.serverUrl, {
        auth: {
          userId: this.userId,
          username: this.username,
          token: 'dummy-token' // In a real app, this would be a real JWT
        }
      });

      this.socket.on('connect', () => {
        console.log('Connected to secure chat server');
        resolve();
      });

      this.socket.on('connect_error', (err) => {
        console.error('Connection failed:', err.message);
        reject({ error: err.message });
      });

      this.socket.on('message', (message) => {
        this.displayMessage(message);
        if (this.messageCallback) {
          this.messageCallback(message);
        }
      });

      this.socket.on('warning', (warning) => {
        this.displayWarning(warning);
        if (this.warningCallback) {
          this.warningCallback(warning);
        }
      });

      this.socket.on('typing', ({ username, isTyping }) => {
        this.displayTyping(username, isTyping);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from chat server');
    }
  }

  get connected() {
    return this.socket && this.socket.connected;
  }

  sendMessage(message) {
    if (this.connected) {
      this.socket.emit('message', { room: 'general', message });
    }
  }

  joinRoom(room) {
    if (this.connected) {
      this.socket.emit('join', { room });
    }
  }

  setTyping(isTyping) {
    if (this.connected) {
      this.socket.emit('typing', { room: 'general', isTyping });
    }
  }

  onMessage(callback) {
    this.messageCallback = callback;
  }

  onWarning(callback) {
    this.warningCallback = callback;
  }

  // DOM Manipulation Methods
  displayMessage({ username, message, timestamp }) {
    const messagesDiv = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message-item ${username === this.username ? 'sent' : 'received'}`;
    
    const ts = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    msgDiv.innerHTML = `
      <div class="message-content">
        <div class="message-header">
          <span class="username">${username}</span>
          <span class="timestamp">${ts}</span>
        </div>
        <div class="message-body">${message}</div>
      </div>
    `;
    
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  displayWarning({ reason, message }) {
    const messagesDiv = document.getElementById('chat-messages');
    const warningDiv = document.createElement('div');
    warningDiv.className = 'system-message warning';
    warningDiv.innerHTML = `<span class="icon">⚠️</span><span class="text"><strong>Security Alert:</strong> ${reason}. Message blocked: "${message}"</span>`;
    messagesDiv.appendChild(warningDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  displayTyping(username, isTyping) {
    const typingIndicator = document.getElementById('typing-indicator');
    if (isTyping && username !== this.username) {
      typingIndicator.textContent = `${username} is typing...`;
    } else {
      typingIndicator.textContent = '';
    }
  }
}
