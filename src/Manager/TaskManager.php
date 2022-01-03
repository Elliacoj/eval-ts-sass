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

        $project = R::load("elliaproject", $projectFk);

        if(!in_array('elliatask', R::inspect())){
            $table = R::dispense('elliatask');
            $table->name = $name;
            $table->time = $time;
            $table->projectfk = $project;
            $table->date = $date;

            R::store($table);
            return true;
        }
        else {
            $task = R::findOrCreate('elliatask', ['name' => $name, 'projectfk' => $project]);

            if(is_null($task->time)) {
                $task->name = $name;
                $task->time = $time;
                $task->projectfk = $project;
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

    /**
     * Return an array of all project's task
     * @param $idProject
     * @return array
     */
    public static function getAll($idProject):array {
        $allTask = [];

        $tasks = R::find("elliatask", "projectfk_id= ?", [$idProject]);
        if(count($tasks) !== 0) {
            foreach ($tasks as $task) {
                $allTask[] = new Task($task->id, $task->name, $task->time, $task->date, ProjectManager::searchId($task->projectfk_id));
            }
        }
        return $allTask;
    }

    /**
     * Delete a task into task table
     * @param $id
     */
    public static function deleteTask($id) {
        $id = filter_var($id, FILTER_SANITIZE_NUMBER_INT);

        R::trash("elliatask", $id);
    }

    /**
     * Return a task or null
     * @param $id
     * @return Task|null
     */
    public static function searchId($id): ?Task {
        $task = R::findOne('elliatask', "id = ?", [$id]);

        if(!is_null($task)) {
            return new Task($task->id, $task->name, $task->time, $task->date, ProjectManager::searchId($task->projectfk_id));
        }
        return null;
    }

    /**
     * Update a task into task table
     * @param Task $task
     */
    public static function update(Task $task) {
        $id = $task->getId();
        $name = $task->getName();
        $time = $task->getTime();
        $date = $task->getDate();
        $task = R::load("elliatask", $id);
        $task->time = $time;
        $task->date = $date;
        $task->name = $name;
        try {
            R::store($task);
        }
        catch (SQL $e) {}
    }
}