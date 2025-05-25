<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;

class PostRepository extends BaseRepository
{
    public function __construct(Post $model)
    {
        parent::__construct($model);
    }

    public function show(Post $post): Model
    {
        return $this->model->query()
            ->with('comments.author')
            ->where('posts.id', $post->id)
            ->firstOrFail();
    }

}
