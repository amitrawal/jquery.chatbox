(function($) {
  $.fn.chatbox = function(options) {

    var defaults = {
      id: null,
      offset: 0,
      width: 240,
      title: 'Chat Demo',
      messageSent: function (id, sender, message) {        
        // Over ride this callback
      },
      boxClosed: function(boxId) {
        // Over ride this callback
      }
    }, _options;


    var ChatBox = function(el, options) {
      var tpl = '<div title="" class="chatbox"><div title="" class="header"><p>Demo Bot</p><a title="close chat window" class="close_chatbox" href="#">X</a><a title="minimize chat window" class="minimize_chatbox" href="#">_</a><a title="maximize chat window" class="maximize_chatbox" href="#">‾</a></div><div title="Demo Bot" class="chat_area"></div><div class="chat_info"><p></p></div><div title="Type your message here" class="chat_message"><textarea></textarea></div></div>';
      var self = this;
      this.el = el;
      this.$el = $(el);
      this.elHeights = {chat_area: '180px', chat_info: '20px',chat_message: '55px'};
      this.options = options;

      this.init = function() {
        this.$el.html(tpl);
        this.setTitle();
        this.attachEvents();
        this.positionBox();
      };

      this.attachEvents = function() {        
        this.$el.find('.minimize_chatbox').on('click', function(e) {
          self.minimize();
        });

        this.$el.find('.maximize_chatbox').on('click', function(e) {
          self.maximize();
        });

        this.$el.find('.close_chatbox').on('click', function(e) {
          self.closeBox();
        });

        this.$el.find('textarea').on('keyup', function(e) {
          if (e.keyCode == 13) {            
            self.options.messageSent(options.id, 'test', $(this).val());
            $(this).val('');
          }          
        });
      };

      this.positionBox = function(offset) {
        var _offset = typeof(offset) ===  'undefined' ? options.offset : offset;

        self.$el.find('.chatbox').css({'right': _offset});
      };

      this.closeBox = function() {
        self.$el.hide();
        self.options.boxClosed(options.id);
      };

      this.init();
    };

    ChatBox.prototype.setTitle = function() {
      this.$el.find('.header p').html(options.title);
    };

    ChatBox.prototype.minimize = function() {
      this.$el.find('.chat_area, .chat_info, .chat_message').css({'height':0});
      this.$el.find('.minimize_chatbox').hide();
      this.$el.find('.maximize_chatbox').show();
      this.$el.find('.chatbox').css({height: '25px'});
    }

    ChatBox.prototype.maximize = function() {
      this.$el.find('.chat_area').css({height: this.elHeights['chat_area']});
      this.$el.find('.chat_info').css({height: this.elHeights['chat_info']});
      this.$el.find('.chat_message').css({height: this.elHeights['chat_message']});
      this.$el.find('.minimize_chatbox').show();
      this.$el.find('.maximize_chatbox').hide();
      this.$el.find('.chatbox').css({height: '300px'});
    }

    ChatBox.prototype.addMessage = function(from, message) {
      this.$el.find('.chat_area').append('<p><b>' + from + ':&nbsp;</b>' + message + '</p>');
    }

    ChatBox.prototype.showBox = function() {
      this.$el.show();
    }

    var methods = {
      init: function(options) {
        return this.each(function() {
          var $this = $(this);
          $this.data('chatbox', new ChatBox(this, options));
        });
      },
      minimize: function() {
        var $this = $(this),
          chatbox = $this.data('chatbox');
        chatbox.minimize();
      },
      maximize: function() {
        var $this = $(this),
          chatbox = $this.data('chatbox');
        chatbox.maximize();
      },
      addMessage: function(from, msg) {
        var $this = $(this),
          chatbox = $this.data('chatbox');
        chatbox.addMessage(from, msg);
      },
      closeBox: function() {
        var $this = $(this),
          chatbox = $this.data('chatbox');
        chatbox.closeBox();
      },
      showBox: function() {
        var $this = $(this),
          chatbox = $this.data('chatbox');
        chatbox.showBox();
      },
      offset: function(value) {
        var $this = $(this),
          chatbox = $this.data('chatbox');
        chatbox.positionBox(value);
      }
    };

    if(methods[options]) {
      return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ( typeof options === 'object' || !options ) {
      _options = $.extend({}, defaults, options);
      return methods.init.apply(this, [_options]);
    } else {
      $.error( 'Method ' +  options + ' does not exist on jQuery.chatbox' );
    }
  };
})(jQuery);