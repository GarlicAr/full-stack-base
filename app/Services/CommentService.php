<?php

namespace App\Services;

use App\Repositories\CommentRepository;

class CommentService
{
    public function __construct(private CommentRepository $CommentRepository) {}
}