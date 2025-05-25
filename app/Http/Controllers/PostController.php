<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(private PostService $postService){}

    public function index(): Collection
    {
        return $this->postService->index();
    }

}
