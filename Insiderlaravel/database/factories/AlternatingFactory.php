<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AlternatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'=>$this->faker->name(),
            'lastname'=>$this->faker->lastName(),
            'description'=>$this->faker->sentence($nbWords=40),
            'localization'=>$this->faker->address(),
            'email'=>$this->faker->unique->email(),
            'password'=>$this->faker->password(),
            'minimum_wage'=>$this->faker->numberBetween($int1=600, $int2=800),
            'maximum_wage'=>$this->faker->numberBetween($int1=801, $int2=1400),
            'type_post'=>$this->faker->sentence($nbWords=2, $variableNbWords=false),
            'year_of_study'=>$this->faker->sentence(),
            'alternation_duration'=>$this->faker->sentence(),
            'competences'=>$this->faker->sentence(),
        ];
    }
}
