<?php

namespace Amaur\EvalTsSass\Manager;

use Amaur\EvalTsSass\Entity\Task;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

class TaskManager {
    /**
     * Add a project into project table
     * @param Task $task
     * @return bool
     * @throws SQL
     */
    public static function addProject(Task $task): bool {
        $name = $task->getName();
        $time = $task->getTime();
        $userFk = $task->getProjectFk()->getId();
        $date = $task->getDate();

        if(!in_array('elliaproject', R::inspect())){
            $table = R::dispense('elliaproject');
            $table->name = $name;
            $table->time = $time;
            $table->userfk = $userFk;
            $table->date = $date;

            R::store($table);
            return true;
        }
        else {
            $project = R::findOrCreate('elliaproject', ['name' => $name, 'userfk' => $userFk]);

            if(is_null($project->time)) {
                $project->name = $name;
                $project->time = $time;
                $project->userfk = $userFk;
                $project->date = $date;
                try {
                    R::store($project);
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