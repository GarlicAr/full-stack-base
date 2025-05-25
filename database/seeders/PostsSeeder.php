<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;

class PostsSeeder extends Seeder
{
    public function run(): void
    {
        $userIds = User::pluck('id')->toArray();
        $categoryIds = Category::pluck('id')->toArray();

        if (empty($userIds) || empty($categoryIds)) {
            $this->command->warn('No users or categories found. Seed them first.');
            return;
        }

        Post::factory()->count(10)->create([
            'user_id' => function() use ($userIds) {
                return $userIds[array_rand($userIds)];
            }
        ])->each(function ($post) use ($categoryIds) {
            $randomCategories = collect($categoryIds)->random(rand(1, min(3, count($categoryIds))));
            $post->categories()->attach($randomCategories);
        });
    }
}
