<?php
$to = "Maryamkeshmiri10@gmail.com";
$from = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

$headers = "From: $from";
$subject = "You have a message from your website";

$fields = array();
$fields["name"] = "Name";
$fields["email"] = "Email";
$fields["phone"] = "Phone";
$fields["message"] = "Message";

$body = "Here is what was sent:\r\n";

foreach ($fields as $a => $b) {
    $body .= "$b: " . htmlspecialchars($_POST[$a], ENT_QUOTES, 'UTF-8') . "\r\n";
}

$send = mail($to, $subject, $body, $headers);

if ($send) {
    echo "Message sent successfully.";
} else {
    echo "Failed to send message. Please try again later.";
}
?>