<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\RegisterService;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    public function __construct(private RegisterService $registerService){}
    public function register(RegisterRequest $request): JsonResponse
    {
        return $this->registerService->register($request->validated());
    }
}
