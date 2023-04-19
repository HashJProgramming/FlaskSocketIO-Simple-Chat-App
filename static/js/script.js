const socket = io.connect("/");
// Simple Chat App - HASH-X
var $messages = $('.messages-content'),
    d, h, m = 0;
var messageInput = '';
$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    SendMessage(msg);
    messageInput = msg;
  }, 100 + (Math.random() * 20) * 100);
}

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

socket.on("message", (data) => {
  if (messageInput != data.message)
    RecieveMessage(data.message);
});

function SendMessage(message) {
  fetch(`/send/${encodeURIComponent(message)}`)
      .then(response => {
      })
      .catch(error => {
          console.error('Error sending message:', error);
      });
}

function RecieveMessage(msg) {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://phcorner.net/data/assets/logo/icon-96x96.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://phcorner.net/data/assets/logo/icon-96x96.png" /></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}