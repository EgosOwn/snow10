var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
	$('#copyFeedback').css('display', 'inherit');
	$('#copyFeedback').css('color', 'green');
	$('#copyFeedback').html('Copied!');
    e.clearSelection();
});

clipboard.on('error', function(e) {
	$('#copyFeedback').css('display', 'inherit');
	$('#copyFeedback').css('color', 'red');
	$('#copyFeedback').html('Failed to copy.');
    e.clearSelection();
});

$('#modalClose').click(function(){
	$('#copyFeedback').css('display', 'none');
});

window.snowMode = 'encrypt';

$('#toggle').click(function(){

	if (window.snowMode == 'encrypt')
	{
		window.snowMode = 'decrypt';
		$('#toggle').html("Decrypt Mode");
		$('#confirmPass').css('display', 'none');
	}
	else
	{
		window.snowMode = 'encrypt';
		$('#toggle').html("Encrypt Mode");
		$('#confirmPass').css('display', 'inline');
	}

});

$('#go').click(function(){

	 document.getElementById("go").disabled = true;

	var password;
	var confirmPass;
	var encrypted;
	var decrypted;
	var encodeChoice;

	var text = $('#text').val();

	if (text == '')
	{
		document.getElementById("go").disabled = false;
		return;
	}

	if (window.snowMode == 'encrypt')
	{
		encodeChoice = '1';

		password = $('#password').val();
		confirmPass = $('#confirmPass').val();

		if (password != confirmPass)
		{
			alert("Passwords must match");
			document.getElementById("go").disabled = false;
			return;
		}
		else
		{
			encrypted = CryptoJS.AES.encrypt(text, password);
			
			$.post( "./snow2.py", { choice: encodeChoice, text: encrypted.toString()} )
			  .done(function( data ) {
			  	document.getElementById("go").disabled = false;

			   	$('#output').val(data);

				$('#outputModal').modal();
			  });
		}
	}
	else
	{
		encodeChoice = '2';

		$.post( "./snow2.py", { choice: encodeChoice, text: text} )
		.done(function( data ) {

			text = data;
			password = $('#password').val();

			decrypted = CryptoJS.AES.decrypt(text, password);
			decrypted = decrypted.toString(CryptoJS.enc.Utf8);
			if (decrypted == '')
			{
				alert('invalid password');
				document.getElementById("go").disabled = false;
			}
			else
			{
			  	document.getElementById("go").disabled = false;
				$('#output').val(decrypted);
				$('#outputModal').modal();
			}

		});
	}

});