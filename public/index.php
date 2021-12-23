<?php
session_start();

require_once "../vendor/autoload.php";
require_once "../config.php";

use Amaur\EvalTsSass\Controller\UserController;
use Amaur\EvalTsSass\Entity\User;
use Amaur\EvalTsSass\Manager\UserManager;

/*$user = new User(null, "amaury.jocaille@hotmail.com", "Azerty1234?");
$userM = new UserManager();
$userM->searchUser($user);*/

if(isset($_GET['controller'], $_GET['action']) && $_GET['controller'] === "user") {
    $userController = new UserController();

    switch ($_GET['action']) {
        case "disconnected":
            $userController->disconnected();
            break;
        case "login":
            $userController->login();
            break;

        case "create":
            $userController->create();
            break;
    }

}
?>

<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Time Tracker</title>
    <link rel="stylesheet" href="./build/css/front.css">
    <script src="./build/js/front.js" defer></script>
</head>
<body>
<?php
if(isset($_SESSION['id'])) { ?>
    <div id="container"></div> <?php
}
else { ?>
    <div id="form">
        <form action="./index.php?controller=user&action=login" method="post">
            <h3>Se connecter</h3>
            <div>
                <label for="">Votre addresse mail:</label>
                <input type="email" name="mailLog" required>
            </div>
            <div>
                <label for="">Votre mot de passe:</label>
                <input type="password" name="passwordLog" required>
            </div>
            <div>
                <input type="submit">
            </div>
        </form>
        <form action="./index.php?controller=user&action=create" method="post">
            <h3>Créer un compte</h3>
            <div>
                <label for="">Votre addresse mail:</label>
                <input type="email" name="mailCreate" required>
            </div>
            <div>
                <label for="">Votre mot de passe:</label>
                <input type="password" name="passwordCreate" required>
            </div>
            <div>
                <input type="submit">
            </div>
        </form>
    </div>
<?php
}
?>
</body>
</html>
