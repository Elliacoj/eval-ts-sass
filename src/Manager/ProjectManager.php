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

        $user = R::load("elliauser", $userFk);

        if(!in_array('elliaproject', R::inspect())){
            $table = R::dispense('elliaproject');
            $table->name = $name;
            $table->time = $time;
            $table->userfk = $user;
            $table->date = $date;

            R::store($table);
            return true;
        }
        else {
            $project = R::findOrCreate('elliaproject', ['name' => $name, 'userfk' => $user]);

            if(is_null($project->time)) {
                $project->name = $name;
                $project->time = $time;
                $project->userfk = $user;
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
     * @return Project|null
     */
    public static function searchName($name): ?Project {
        $project = R::findOne('elliaproject', "name = ?", [$name]);

        if(!is_null($project)) {
            return new Project($project->id, $project->name, $project->time, $project->date, UserManager::searchId($project->userfk_id));
        }
        return null;
    }

    /**
     * Return id or null
     * @param $id
     * @return Project|null
     */
    public static function searchId($id): ?Project {
        $project = R::findOne('elliaproject', "id = ?", [$id]);

        if(!is_null($project)) {
            return new Project($project->id, $project->name, $project->time, $project->date, UserManager::searchId($project->userfk_id));
        }
        return null;
    }

    /**
     * Update a project into project table
     * @param Project $project
     */
    public static function update(Project $project) {
        $id = $project->getId();
        $time = $project->getTime();
        $date = $project->getDate();
        $project = R::load("elliaproject", $id);
        $project->time = $time;
        $project->date = $date;
        try {
            R::store($project);
        }
        catch (SQL $e) {}
    }

    /**
     * Return an array of all user's project
     * @param $idUser
     * @return array
     */
    public static function getAll($idUser):array {
        $allProject = [];

        $projects = R::find("elliaproject", "userfk_id= ?", [$idUser]);
        if(count($projects) !== 0) {
            foreach ($projects as $project) {
                $allProject[] = new Project($project->id, $project->name, $project->time, $project->date, UserManager::searchId($project->userfk_id));
            }
        }
        return $allProject;
    }
}