$(function() {
	
	var checkboxClasses = ['a-z', 'A-Z', '0-9', 'spec'];
	var alphabets = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '![]{}()%&*$#^<>~@|\''];
	checkboxClasses.forEach(function (element, index, array) {
		$('#'+ element).click(function(){
			$('.alphabet_' + $(this).attr('id')).toggle();
		})
	});
    $('#generateButton').click(function(){
		var result = $('.result');
		$('.alert').fadeOut('fast');
		var possible = '';
		checkboxClasses.forEach(function (element, index, array) {
			if($('#'+ element).is(':checked')){
				possible += alphabets[index];
			}
		});
		if (possible != '') {
			var cnt = $('#cnt').val();
			var number = $('#numberSymb').val();
			if (cnt > 0 && number > 0) {
				var passwords = [];
				for (var i = 0; i < cnt; i++) {
					var text = '';
					for (var j = 0; j < number; j++) {
						text += possible.charAt(Math.floor(Math.random() * possible.length));
					}
					passwords.push(text);
				}
				var blockPasswords = $('.list-group');
				blockPasswords.empty();
				passwords.forEach(function(element, index, array){
					console.log(element);
					blockPasswords.append('<li class="list-group-item"></button><span class="password">' + escapeHtml(element) + '</span><button type="button" data-toggle="tooltip" title="Копировать" class="btn btn-default copy" aria-label="Left Align"><span class="glyphicon glyphicon glyphicon-copy" aria-hidden="true"></span></li>');
				})
				$('[data-toggle="tooltip"]').tooltip(); 
				$('.copy').click(function(){
					if(copyToClipboard($(this).siblings('.password').text())) {
						$('.copy').removeClass('copied');
						$(this).addClass('copied');
					}
				});
				result.fadeIn('fast');
			} else {
				$('.alert.negative').fadeIn('fast');
			}
		} else {
			$('.alert.empty').fadeIn('fast');
		}
	});
});

// Map for escape symbols, that will be insert in html
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
