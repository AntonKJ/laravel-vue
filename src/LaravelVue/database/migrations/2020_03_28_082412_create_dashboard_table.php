<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDashboardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dashboard', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('fact_oliq_data1');
            $table->string('fact_oliq_data2');
            $table->string('fact_ooil_data1');
            $table->string('fact_ooil_data2');
            $table->string('forecast_oliq_data1');
            $table->string('forecast_oliq_data2');
            $table->string('forecast_ooil_data1');
            $table->string('forecast_ooil_data2');
            $table->integer('filters_auto_sort');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_types');
    }
}
