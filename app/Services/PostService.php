<?php

namespace App\Services;

use App\Repositories\PostRepository;

class PostService
{
    public function __construct(private PostRepository $PostRepository){}

}
