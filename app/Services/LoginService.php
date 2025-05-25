<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Repositories\LoginRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginService
{
    public function __construct(private LoginRepository $loginRepository){}

    public function login(array $data): JsonResponse
    {
        $user = $this->loginRepository->findUserByEmail($data['email']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        auth()->login($user);

        return response()->json([
            'message' => 'Login successful',
            'user' => UserResource::make($user),
        ]);

    }
}
