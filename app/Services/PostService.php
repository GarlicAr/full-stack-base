<?php

namespace App\Services;

use App\Repositories\PostRepository;
use Illuminate\Database\Eloquent\Collection;

class PostService
{
    public function __construct(private PostRepository $PostRepository){}

    public function index(): Collection
    {
        return $this->PostRepository->all();
    }

}
