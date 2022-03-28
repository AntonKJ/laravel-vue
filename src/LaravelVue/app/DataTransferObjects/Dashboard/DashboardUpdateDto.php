<?php


namespace App\DataTransferObjects\Dashboard;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Spatie\DataTransferObject\FlexibleDataTransferObject;
use Symfony\Component\HttpFoundation\File\UploadedFile;


final class DashboardUpdateDto extends FlexibleDataTransferObject
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

    public static function fromRequest(Request $request): self
    {

        return new self([
            'id' => $request->id,
            'company' => $request->company,
            'fact_oliq_data1' => $request->fact_oliq_data1,
            'fact_oliq_data2' => $request->fact_oliq_data2,
            'fact_ooil_data1' => $request->fact_ooil_data1,
            'fact_ooil_data2' => $request->fact_ooil_data2,
            'forecast_oliq_data1' => $request->forecast_oliq_data1,
            'forecast_oliq_data2' => $request->forecast_oliq_data2,
            'forecast_ooil_data1' => $request->forecast_ooil_data1,
            'forecast_ooil_data2' => $request->forecast_ooil_data2
        ]);
    }
}
