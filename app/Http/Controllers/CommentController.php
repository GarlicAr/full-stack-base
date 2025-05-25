<?php

namespace App\Http\Controllers;

use App\Models\Comment;
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

    public function destroy(Comment $comment): bool
    {
        $this->authorize('delete', $comment);

        return $this->CommentService->destroy($comment);
    }
}
