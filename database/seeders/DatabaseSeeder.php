<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'email' => 'test@example.com',
        ],[
            'name' => 'Test User',
            'password' => Hash::make('test')
        ]);

        $this->call(UserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(PostsSeeder::class);
        $this->call(CommentsSeeder::class);
    }
}
