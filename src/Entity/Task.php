<?php

namespace Amaur\EvalTsSass\Entity;

class Task {
    private ?int $id;
    private ?string $name;
    private ?int $time;
    private ?string $date;
    private ?Project $projectFk;

    /**
     * @param int|null $id
     * @param string|null $name
     * @param int|null $time
     * @param string|null $date
     */
    public function __construct(int $id = null, string $name = null, int $time = null, string $date = null, Project $projectFk = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->time = $time;
        $this->date = $date;
        $this->projectFk = $projectFk;
    }

    /**
     * Return the id of Task
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Set the id of Task
     * @param int|null $id
     * @return Task
     */
    public function setId(?int $id): Task
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Return the name of Task
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * Set the name of Task
     * @param string|null $name
     * @return Task
     */
    public function setName(?string $name): Task
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Return the time of Task
     * @return int|null
     */
    public function getTime(): ?int
    {
        return $this->time;
    }

    /**
     * Set the time of Task
     * @param int|null $time
     * @return Task
     */
    public function setTime(?int $time): Task
    {
        $this->time = $time;
        return $this;
    }

    /**
     * Return the date of Task
     * @return string|null
     */
    public function getDate(): ?string
    {
        return $this->date;
    }

    /**
     * Set the date of Task
     * @param string|null $date
     * @return Task
     */
    public function setDate(?string $date): Task
    {
        $this->date = $date;
        return $this;
    }

    /**
     * Return the project fk of Task
     * @return Project|null
     */
    public function getProjectFk(): ?Project
    {
        return $this->projectFk;
    }

    /**
     * Set the project fk of Task
     * @param Project|null $projectFk
     * @return Task
     */
    public function setProjectFk(?Project $projectFk): Task
    {
        $this->projectFk = $projectFk;
        return $this;
    }
}