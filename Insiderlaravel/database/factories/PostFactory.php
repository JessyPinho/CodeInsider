<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Entreprise;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'entreprise_id'=> Entreprise::all()->random()->id,
            'title' => $this->faker->name(),
            'type_post' => $this->faker->text($maxNbChars= 20),
            'duration' => $this->faker->text($maxNbChars= 20),
            'competences' => $this->faker->address(),
            'description' => $this->faker->text($maxNbChars = 200),

        ];
    }
}
