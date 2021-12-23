<?php

namespace Amaur\EvalTsSass\Entity;

class User {
    private ?int $id;
    private ?string $mail;
    private ?string $password;

    /**
     * @param int|null $id
     * @param string|null $mail
     * @param string|null $password
     */
    public function __construct(int $id = null, string $mail = null, string $password = null) {
        $this->id = $id;
        $this->mail = $mail;
        $this->password = $password;
    }

    /**
     * Return the if of User
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Set the id of User
     * @param int|null $id
     * @return User
     */
    public function setId(?int $id): User
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Return the mail of User
     * @return string|null
     */
    public function getMail(): ?string
    {
        return $this->mail;
    }

    /**
     * Set the mail of User
     * @param string|null $mail
     * @return User
     */
    public function setMail(?string $mail): User
    {
        $this->mail = $mail;
        return $this;
    }

    /**
     * Return the password of User
     * @return string|null
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    /**
     * Set the password of User
     * @param string|null $password
     * @return User
     */
    public function setPassword(?string $password): User
    {
        $this->password = $password;
        return $this;
    }
}