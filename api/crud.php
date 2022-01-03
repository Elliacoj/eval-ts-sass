<?php

use Amaur\EvalTsSass\Entity\Project;
use Amaur\EvalTsSass\Entity\Task;
use Amaur\EvalTsSass\Manager\ProjectManager;
use Amaur\EvalTsSass\Manager\TaskManager;
use Amaur\EvalTsSass\Manager\UserManager;

header('Content-Type: application/json');

require '../../vendor/autoload.php';
require_once "../../config.php";

$requestType = $_SERVER['REQUEST_METHOD'];

switch ($requestType) {
    case "POST":
        add(json_decode(file_get_contents("php://input")));
        break;
    case "GET":
        break;
    case "DELETE":
        delete(json_decode(file_get_contents("php://input")));
        break;
    case "PUT":
        break;
}

/**
 * Add a project into project table
 * @param $data
 */
function add($data) {
    if($data->type === "project") {
        $project = new Project();

        $project->setName($data->name)->setTime($data->time)->setDate($data->date)->setUser(UserManager::searchId($_SESSION['id']));
        ProjectManager::addProject($project);
    }
    elseif ($data->type === "task") {
        $task = new Task();

        $task->setName($data->name)->setTime($data->time)->setDate($data->date)->setProjectFk(ProjectManager::searchName($data->nameProject));
        TaskManager::addTask($task);
    }
}

/**
 * Delete a project into project table
 * @param $data
 */
function delete($data) {
    if($data->type === "project") {
        ProjectManager::deleteProject((ProjectManager::searchName($data->name))->getId());
    }
}
