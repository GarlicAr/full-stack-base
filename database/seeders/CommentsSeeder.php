<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

class CommentsSeeder extends Seeder
{
    public function run(): void
    {
        $postIds = Post::pluck('id')->toArray();
        $userIds = User::pluck('id')->toArray();

        if (empty($postIds) || empty($userIds)) {
            $this->command->warn('No posts or users found. Seed them first.');
            return;
        }

        foreach ($postIds as $postId) {
            Comment::factory()->count(rand(1, 5))->create([
                'post_id' => $postId,
                'user_id' => function() use ($userIds) {
                    return $userIds[array_rand($userIds)];
                },
            ]);
        }
    }
}
