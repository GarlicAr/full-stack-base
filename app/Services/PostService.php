<?php

namespace App\Services;

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

}
