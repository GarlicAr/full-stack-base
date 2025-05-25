<?php

namespace App\Http\Controllers;

use App\Services\CommentService;

class CommentController extends Controller
{
    public function __construct(private CommentService $CommentService) {}
}
