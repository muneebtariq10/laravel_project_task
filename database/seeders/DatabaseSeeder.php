<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::factory()->create([
            'name' => 'Muneeb',
            'email' => 'muneeb@nexvistech.com',
            'password' => bcrypt('1qaz2wsx'),
            'email_verified_at' => date('Y-m-d H:i:s'),
        ]);

        Project::factory()->count(30)->hasTasks(30)->create();
    }
}
