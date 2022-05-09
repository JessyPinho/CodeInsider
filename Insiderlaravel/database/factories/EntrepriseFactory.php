<?php

namespace Database\Factories;

use Faker\Guesser\Name;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EntrepriseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->email(),
            'password' => $this->faker->asciify('********'),
            'localization' => $this->faker->text($maxNbChars = 200),
            'description' => $this->faker->text($maxNbChars = 200),
            'number_employee'=> $this->faker->numberBetween($min = 1, $max = 1000),
        ];
    }

}
