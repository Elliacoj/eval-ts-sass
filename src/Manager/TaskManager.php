<?php

namespace Amaur\EvalTsSass\Manager;

use Amaur\EvalTsSass\Entity\Task;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

class TaskManager {
    /**
     * Add a task into task table
     * @param Task $task
     * @return bool
     * @throws SQL
     */
    public static function addTask(Task $task): bool {
        $name = $task->getName();
        $time = $task->getTime();
        $projectFk = $task->getProjectFk()->getId();
        $date = $task->getDate();

        if(!in_array('elliatask', R::inspect())){
            $table = R::dispense('elliatask');
            $table->name = $name;
            $table->time = $time;
            $table->projectfk = $projectFk;
            $table->date = $date;

            R::store($table);
            return true;
        }
        else {
            $task = R::findOrCreate('elliatask', ['name' => $name, 'projectfk' => $projectFk]);

            if(is_null($task->time)) {
                $task->name = $name;
                $task->time = $time;
                $task->projectfk = $projectFk;
                $task->date = $date;
                try {
                    R::store($task);
                }
                catch (SQL $e) {}

                return true;
            }
            else {
                return false;
            }
        }
    }
}