<?php

namespace App\Repositories;

use App\Models\User;
use App\Services\LoginService;

class LoginRepository extends BaseRepository
{
    public function __construct(User $user){
        parent::__construct($user);
    }
    public function findUserByEmail(string $email): ?User
    {
        return $this->model->where('email', $email)->first();
    }
}
