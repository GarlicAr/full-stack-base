<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Models\User;
use App\Services\PostService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private PostService $postService){}

    public function index(): Collection
    {
        return $this->postService->index();
    }

    public function store(StorePostRequest $request): Model
    {
        return $this->postService->store($request->validated());
    }

    public function show(Post $post): Model
    {
        return $this->postService->show($post);
    }

    public function showUserPosts(User $user): Collection
    {
        $this->authorize('view', $user);

        return $this->postService->showUserPosts($user);
    }

}
