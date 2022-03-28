<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dashboard extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'id',
        'company',
        'fact_oliq_data1',
        'fact_oliq_data2',
        'fact_ooil_data1',
        'fact_ooil_data2',
        'forecast_oliq_data1',
        'forecast_oliq_data2',
        'forecast_ooil_data1',
        'forecast_ooil_data2',
        'filters_auto_sort',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];*/
}
