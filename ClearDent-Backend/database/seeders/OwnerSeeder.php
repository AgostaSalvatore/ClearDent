<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class OwnerSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'agosta.boolean@gmail.com'],
            [
                'name'     => 'Salvatore Agosta',
                'password' => 'cleardent2026',
                'role'     => 'owner',
            ]
        );
    }
}
