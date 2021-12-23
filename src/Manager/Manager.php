<?php

namespace Amaur\EvalTsSass\Manager;

class Manager {
    private static ?Object $manager = null;

    /**
     * Return an instance of Object
     * @return Manager|Object|null
     */
    public static function getManager() {
        if(is_null(self::$manager)) {
            return new self();
        }
        return self::$manager;
    }
}