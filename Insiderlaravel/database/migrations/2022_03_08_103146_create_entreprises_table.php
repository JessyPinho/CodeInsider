<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntreprisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entreprises', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("email")->unique();
            $table->string("localization");
            $table->string("description");
            $table->string("number_employee");
            $table->string("password");
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('business');
    }
}
