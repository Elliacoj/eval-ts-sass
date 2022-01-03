<?php

namespace Amaur\EvalTsSass\Manager;


use Amaur\EvalTsSass\Entity\User;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

class UserManager extends Manager {

    /**
     * Add a user if is not exist
     */
    public static function addUser(User $user): bool {
        $mail = $user->getMail();
        $password = $user->getPassword();

        if(!in_array('elliauser', R::inspect())){
            $table = R::dispense('elliauser');
            $table->mail = $mail;
            $table->password = password_hash($password, PASSWORD_BCRYPT);
            R::store($table);
            return true;
        }
        else {
            $user = R::findOrCreate('elliauser', ['mail' => $mail]);

            if(is_null($user->password)) {
                $user->mail = $mail;
                $user->password = password_hash($password, PASSWORD_BCRYPT);
                try {
                    R::store($user);
                }
                catch (SQL $e) {}

                return true;
            }
            else {
                return false;
            }
        }
    }

    /**
     * Search a user by mail
     */
    public static function searchUser($mail): ?User {
        $user = R::findOne('elliauser', "mail = ?", [$mail]);

        if(!is_null($user)) {
            return new User($user->id, $user->mail,$user->password);
        }
        return null;
    }

    /**
     * Search a user by id
     */
    public static function searchId($id): ?User {
        $user = R::load('elliauser', $id);

        if(!is_null($user)) {
            return new User($user->id, $user->mail, $user->password);
        }
        return null;
    }
}