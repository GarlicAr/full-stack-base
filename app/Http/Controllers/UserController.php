<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Database\Eloquent\Collection;

class UserController extends Controller
{
    public function __construct(private UserService $userService){}

    public function index(): ?Collection
    {
        return $this->userService->index();
    }
}
