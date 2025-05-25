<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Post;
use App\Repositories\CommentRepository;

class CommentService
{
    public function __construct(private CommentRepository $CommentRepository) {}

    public function store(Post $post, string $body): Comment
    {
        $user = auth()->user();

        $comment = new Comment([
            'body' => $body,
        ]);
        $comment->author()->associate($user);
        $comment->post()->associate($post);
        $comment->save();

        return $comment;
    }
}
