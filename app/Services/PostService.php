<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use App\Repositories\PostRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Client\Request;

class PostService
{
    public function __construct(private PostRepository $PostRepository){}

    public function index(): Collection
    {
        return $this->PostRepository->all();
    }

    public function store(array $data): Model
    {
        $user = auth()->user();

        $data['user_id'] = $user->id;

        return $this->PostRepository->store($data);
    }

    public function show(Post $post): Model
    {
        return $this->PostRepository->show($post);
    }

    public function showUserPosts(User $user): Collection
    {
        return $this->PostRepository->showUserPosts($user);
    }

}
