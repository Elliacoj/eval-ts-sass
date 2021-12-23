<?php

namespace Amaur\EvalTsSass\Entity;

class Task {
    private ?int $id;
    private ?string $name;
    private ?int $time;
    private ?string $date;

    /**
     * @param int|null $id
     * @param string|null $name
     * @param int|null $time
     * @param string|null $date
     */
    public function __construct(int $id = null, string $name = null, int $time = null, string $date = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->time = $time;
        $this->date = $date;
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
     */
    public function setId(?int $id): void
    {
        $this->id = $id;
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
     */
    public function setName(?string $name): void
    {
        $this->name = $name;
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
     */
    public function setTime(?int $time): void
    {
        $this->time = $time;
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
     */
    public function setDate(?string $date): void
    {
        $this->date = $date;
    }
}