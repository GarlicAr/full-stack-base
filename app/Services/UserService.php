<?php

namespace App\Services;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
class UserService {
    public function __construct(private UserRepository $userRepository)
    {
    }

    public function index(): Collection
    {
        return $this->userRepository->index();
    }
}
