<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class RegisterService
{
    public function __construct(private UserRepository $userRepository){}

    public function register(array $data): JsonResponse
    {
        if ($this->userRepository->findBy('email', $data['email'])) {
            return response()->json([
                'message' => 'A user with that email already exists.',
            ], Response::HTTP_CONFLICT);
        }

        $data['password'] = Hash::make($data['password']);
        $data['name'] = $data['email'];

        $user = $this->userRepository->store($data);

        return response()->json([
            'message' => 'ok',
            'user' => UserResource::make($user)
        ], Response::HTTP_CREATED);
    }

}
