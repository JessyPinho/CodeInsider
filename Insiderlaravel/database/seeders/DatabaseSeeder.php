<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Entreprise::factory(10)->create();
        \App\Models\Post::factory(10)->create();
        \App\Models\Alternating::factory(10)->create();

    }
}
