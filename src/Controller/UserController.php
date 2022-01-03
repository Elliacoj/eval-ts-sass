<?php

namespace Amaur\EvalTsSass\Controller;

use Amaur\EvalTsSass\Entity\User;
use Amaur\EvalTsSass\Manager\ProjectManager;
use Amaur\EvalTsSass\Manager\UserManager;
use RedBeanPHP\R;

class UserController {

    /**
     * Delete all session and cookie for disconnected user
     */
    public function disconnected() {
        if(isset($_SESSION['id'])) {
            $_SESSION = array();
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
            session_destroy();

            if(isset($_COOKIE['id'])) {
                setcookie("id", $_SESSION['id'], time() - 64000, "/", $_SERVER['SERVER_NAME'], true, true);
            }

            header("location: ./index.php");
        }
    }

    /**
     * Log a user if information is correct
     */
    public function login() {
        $mail = filter_var($_POST['mailLog'], FILTER_SANITIZE_EMAIL);
        $password = filter_var($_POST['passwordLog'], FILTER_SANITIZE_STRING);

        $user = UserManager::searchUser($mail);
        if(!is_null($user) && password_verify($password, $user->getPassword())) {
            $_SESSION['id'] = $user->getId();
        }
        header("location: ./index.php");
    }

    /**
     * Create a user
     */
    public function create() {
        $mail = filter_var($_POST['mailCreate'], FILTER_SANITIZE_EMAIL);
        $password = filter_var($_POST['passwordCreate'], FILTER_SANITIZE_STRING);

        $user = new User(null, $mail, $password);
        $result = UserManager::addUser($user);

        if($result) {
            $_SESSION['id'] = R::getInsertID();
        }
        header("location: ./index.php");
    }
}