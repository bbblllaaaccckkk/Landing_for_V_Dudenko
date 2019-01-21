$(document).ready(function() {

	//E-mail Ajax Send
	$(".form").submit(function() { //Change Указать селектор формы которую надо обрабатывать $("form")
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change  Поставить свой путь к файлу, если все в одной папке то не изменять!
			data: th.serialize()
		}).done(function() {
			alert("Спасибо Вам! Мы свяжемся с Вами в ближайшее время");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});