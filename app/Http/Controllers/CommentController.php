<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\CommentService;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct(private CommentService $CommentService) {}

    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'max:500'],
        ]);

        $comment = $this->CommentService->store($post, $validated['body']);

        return response()->json($comment->load('author'), 201);
    }
}
