<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;

class UserController extends Controller
{
    public function __construct(private UserService $userService){}

    public function index(): ?Collection
    {
        return $this->userService->index();
    }

    public function getAuthUser(): JsonResponse
    {
        return $this->userService->getAuthUser();
    }
}
