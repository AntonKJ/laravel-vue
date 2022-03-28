<?php


namespace App\DataTransferObjects\Dashboard;

use App\DataTransferObjects\Media\MediaDataDto;
use App\Models\Dashboard;
use Illuminate\Database\Eloquent\Collection;
use Spatie\DataTransferObject\FlexibleDataTransferObject;


final class DashboardDataDto extends FlexibleDataTransferObject
{
    public int $id;
    public string $company;
    public string $fact_oliq_data1;
    public string $fact_oliq_data2;
    public string $fact_ooil_data1;
    public string $fact_ooil_data2;
    public string $forecast_oliq_data1;
    public string $forecast_oliq_data2;
    public string $forecast_ooil_data1;
    public string $forecast_ooil_data2;

    public static function fromModel(Dashboard $dashboard): self
    {

        return new self([
            'id' => $dashboard->id,
            'company' => $dashboard->company,
            'fact_oliq_data1' => $dashboard->fact_oliq_data1,
            'fact_oliq_data2' => $dashboard->fact_oliq_data2,
            'fact_ooil_data1' => $dashboard->fact_ooil_data1,
            'fact_ooil_data2' => $dashboard->fact_ooil_data2,
            'forecast_oliq_data1' => $dashboard->forecast_oliq_data1,
            'forecast_oliq_data2' => $dashboard->forecast_oliq_data2,
            'forecast_ooil_data1' => $dashboard->forecast_ooil_data1,
            'forecast_ooil_data2' => $dashboard->forecast_ooil_data2
        ]);
    }
}
