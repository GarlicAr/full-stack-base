<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use App\Repositories\PostRepository;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function view(User $authUser, User $targetUser): bool
    {
        return $authUser->id === $targetUser->id;
    }
}
