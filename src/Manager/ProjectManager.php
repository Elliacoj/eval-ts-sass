<?php

namespace Amaur\EvalTsSass\Manager;

use Amaur\EvalTsSass\Entity\Project;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

class ProjectManager extends Manager{

    /**
     * Add a project into project table
     * @param Project $project
     * @return bool
     * @throws SQL
     */
    public static function addProject(Project $project): bool {
        $name = $project->getName();
        $time = $project->getTime();
        $userFk = $project->getUser()->getId();
        $date = $project->getDate();

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

    /**
     * Delete a project into project table
     * @param $id
     */
    public static function deleteProject($id) {
        $id = filter_var($id, FILTER_SANITIZE_NUMBER_INT);

        R::trash("elliaproject", $id);
    }

    /**
     * Return id or null
     * @param $name
     * @return int|null
     */
    public static function searchName($name): ?Project {
        $project = R::findOne('elliaproject', "name = ?", [$name]);

        if(!is_null($project)) {

            return new Project($project->id, $project->name, $project->time, $project->date, UserManager::searchId($project->userfk));
        }
        return null;
    }
}