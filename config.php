<?php

use RedBeanPHP\R;

$host = "localhost";
$dbName = "time_tracker";
$userName = "root";
$password = "";

R::setup("mysql:host=$host;dbname=$dbName;charset=utf8", $userName, $password);
R::getDatabaseAdapter()->getDatabase()->stringifyFetches(false);
R::getDatabaseAdapter()->getDatabase()->getPDO()->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);