<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Ramsey\Uuid\v1;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weather', function (Blueprint $table) {
            $table->id();
            $table->string('city_name', 50);
            $table->decimal('temp', 3, 2);
            $table->decimal('feels_like', 3, 2);
            $table->decimal('temp_min', 3, 2);
            $table->decimal('temp_max', 3, 2);
            $table->integer('pressure');
            $table->integer('sea_level');
            $table->integer('grnd_level');
            $table->integer('humidity');
            $table->decimal('temp_kf', 3, 2);
            $table->timestamps('dt_txt');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather');
    }
};
