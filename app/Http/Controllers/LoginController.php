<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\LoginService;
use Illuminate\Http\JsonResponse;

class LoginController
{
    public function __construct(private LoginService $loginService){}

    public function login(LoginRequest $request): JsonResponse
    {
        return $this->loginService->login($request->validated());
    }

}
