<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Services\PostService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(private PostService $postService){}

    public function index(): Collection
    {
        return $this->postService->index();
    }

    public function store(StorePostRequest $request): Model
    {
        return $this->postService->store($request->validated());
    }

}
