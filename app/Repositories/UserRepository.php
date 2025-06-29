<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository {

    public function __construct(User $user){
        parent::__construct($user);
    }

    public function index(){
        return $this->all();
    }

    public function create(array $data): User
    {
        return $this->model->store($data);
    }

}
