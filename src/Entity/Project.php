<?php

namespace Amaur\EvalTsSass\Entity;

class Project {
    private ?int $id;
    private ?string $name;
    private ?int $time;
    private ?int $date;
    private ?User $user;

    /**
     * @param int|null $id
     * @param string|null $name
     * @param int|null $time
     * @param int|null $date
     */
    public function __construct(int $id = null, string $name = null, int $time = null, int $date = null, User $user = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->time = $time;
        $this->date = $date;
        $this->user = $user;
    }

    /**
     * Return the id of Project
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Set the id of Project
     * @param int|null $id
     * @return Project
     */
    public function setId(?int $id): Project
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Return the name of Project
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * Set the name of Project
     * @param string|null $name
     * @return Project
     */
    public function setName(?string $name): Project
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Return the time of Project
     * @return int|null
     */
    public function getTime(): ?int
    {
        return $this->time;
    }

    /**
     * Set the time of Project
     * @param int|null $time
     * @return Project
     */
    public function setTime(?int $time): Project
    {
        $this->time = $time;
        return $this;
    }

    /**
     * Return the date of Project
     * @return int|null
     */
    public function getDate(): ?int
    {
        return $this->date;
    }

    /**
     * Set the date of Project
     * @param int|null $date
     * @return Project
     */
    public function setDate(?int $date): Project
    {
        $this->date = $date;
        return $this;
    }

    /**
     * Return the user of Project
     * @return User|null
     */
    public function getUser(): ?User
    {
        return $this->user;
    }

    /**
     * Set the user of Project
     * @param User|null $user
     * @return Project
     */
    public function setUser(?User $user): Project
    {
        $this->user = $user;
        return $this;
    }
}