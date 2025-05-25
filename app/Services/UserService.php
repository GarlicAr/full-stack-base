<?php

namespace App\Services;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class UserService {
    public function __construct(private UserRepository $userRepository)
    {
    }

    public function index(): Collection
    {
        return $this->userRepository->index();
    }

    public function getAuthUser(): JsonResponse
    {
        $user = auth()->user();

        if (! $user) {
            return response()->json([
                'authenticated' => false,
            ]);
        }

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'authenticated' => true,
        ]);
    }
}
