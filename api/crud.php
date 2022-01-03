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
        echo json_encode(get());
        break;
    case "DELETE":
        delete(json_decode(file_get_contents("php://input")));
        break;
    case "PUT":
        update(json_decode(file_get_contents("php://input")));
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
    elseif($data->type === "task") {
        TaskManager::deleteTask($data->id);
    }
}

/**
 * Return a table of tasks
 * @return array
 */
function get(): array {
    $array = [];

    if(isset($_GET['type']) && $_GET['type'] === "task") {
        $project = ProjectManager::searchName(filter_var($_GET['name'], FILTER_SANITIZE_STRING));
        $allTask = TaskManager::getAll($project->getId());
        foreach ($allTask as $task) {
            $array[] = [ 'id' => $task->getId()];
        }
    }
    if(isset($_GET['type']) && $_GET['type'] === "open") {
        $allProject = ProjectManager::getAll($_SESSION['id']);
        foreach ($allProject as $project) {
            $dataP = ['name' => $project->getName(), "time" => $project->getTime(), "date" => $project->getDate(), "task" => []];
            $allTask = TaskManager::getAll($project->getId());
            foreach ($allTask as $task) {
                $dataP['task'][] = ["name" => $task->getName(), "time" => $task->getTime(), "date" => $task->getDate()];
            }
            $array[] = $dataP;
        }
    }
    return $array;
}

/**
 * Update a task and a project
 * @param $data
 */
function update($data) {
    if($data->type === "chrono") {
        $task = TaskManager::searchId($data->task);
        $project = $task->getProjectFk();

        $task->setTime($data->timeTask)->setDate($data->dateTask);
        $project->setTime($data->timeProject)->setDate($data->dateProject);

        ProjectManager::update($project);
        TaskManager::update($task);
    }
    elseif ($data->type === "rename") {
        $task = TaskManager::searchId($data->id);
        $task->setName($data->name);
        TaskManager::update($task);
    }

}